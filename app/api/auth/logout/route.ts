export const dynamic = "force-dynamic";

import { SESSION_COOKIE_NAME } from "@/utils/session.server";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
