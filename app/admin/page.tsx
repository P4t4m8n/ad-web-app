import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/utils/session.server";

export default async function SignInPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-950">
            Admin sign in
          </h1>
          <p className="text-sm text-zinc-500">
            Sign in with the authorized Google account to manage the CMS.
          </p>
        </div>

        <div className="mt-6">
          <a
            href="/api/auth/google"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            <GoogleIcon />
            Continue with Google
          </a>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v2.98h3.93c2.3-2.12 3.63-5.24 3.63-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.93-2.98c-1.09.73-2.49 1.16-4 1.16-3.08 0-5.68-2.08-6.61-4.88H1.34v3.07C3.31 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.39 14.38A7.19 7.19 0 0 1 5 12c0-.83.14-1.63.39-2.38V6.55H1.34A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.34 5.45l4.05-3.07Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.31 2.7 1.34 6.55l4.05 3.07C6.32 6.85 8.92 4.77 12 4.77Z"
      />
    </svg>
  );
}

