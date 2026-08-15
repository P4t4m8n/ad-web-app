import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;

function getRedirectUri(req: NextRequest) {
  return `${req.nextUrl.origin}/api/auth/callback/google`;
}

export async function GET(req: NextRequest) {
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: getRedirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );

  // Short-lived cookie used to verify the callback's state param (CSRF protection).
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
