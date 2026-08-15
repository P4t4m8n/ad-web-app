import { cookies } from "next/headers";
import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
  SessionPayload,
} from "@/utils/session.server";
import { AppError } from "@/utils/AppError.server";

// Guard for Server Actions/Route Handlers - Proxy only covers page navigations,
// not Server Function calls, so every mutation must re-check the session itself.
export const requireAdminSession = async (): Promise<SessionPayload> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    throw AppError.create("Not authenticated", 401, true);
  }

  return session;
};
