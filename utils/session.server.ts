import { SignJWT, jwtVerify } from "jose";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not set");
}
const secretKey = new TextEncoder().encode(SESSION_SECRET);

export const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION = "8h";

export type SessionPayload = {
  email: string;
  name: string;
  picture: string;
};

export const createSessionToken = (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secretKey);
};

// Returns null for a missing/expired/tampered token instead of throwing.
export const verifySessionToken = async (
  token: string,
): Promise<SessionPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as SessionPayload;
  } catch {
    return null;
  }
};
