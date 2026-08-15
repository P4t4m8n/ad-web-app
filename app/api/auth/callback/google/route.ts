import { AppError } from "@/utils/AppError.server";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/utils/session.server";
import { NextResponse, NextRequest } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

function getRedirectUri(req: NextRequest) {
  return `${req.nextUrl.origin}/api/auth/callback/google`;
}

export async function GET(req: NextRequest) {
  const adminUrl = new URL("/admin", req.url);
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const savedState = req.cookies.get("oauth_state")?.value;

  // Reject if the code is missing or the state doesn't match the cookie we set (CSRF check).
  if (!code || !state || !savedState || state !== savedState) {
    return failureRedirect(adminUrl, "Invalid or expired sign-in request");
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: getRedirectUri(req),
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw AppError.create("Failed to fetch access token", 502, true);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user information
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw AppError.create("Failed to fetch user information", 502, true);
    }

    const userInfo = await userInfoResponse.json();

    // Only one pre-approved Google account is allowed to reach the CMS.
    if (
      !userInfo.verified_email ||
      typeof userInfo.email !== "string" ||
      userInfo.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
    ) {
      throw AppError.create("This Google account is not authorized", 403, true);
    }

    const sessionToken = await createSessionToken({
      email: userInfo.email,
      name: `${userInfo.given_name ?? ""} ${userInfo.family_name ?? ""}`.trim(),
      picture: userInfo.picture,
    });

    const response = NextResponse.redirect(adminUrl);
    response.cookies.delete("oauth_state");
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return response;
  } catch (error) {
    const message =
      error instanceof AppError ? error.message : "Sign-in failed";
    return failureRedirect(adminUrl, message);
  }
}

function failureRedirect(adminUrl: URL, message: string) {
  const response = NextResponse.redirect(adminUrl);
  response.cookies.delete("oauth_state");
  response.cookies.set("errorMessage", message, {
    path: "/",
    maxAge: 60,
  });
  return response;
}
