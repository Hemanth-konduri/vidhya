import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const pathname = req.nextUrl.pathname;

  // Public routes
  if (pathname.startsWith("/login")) {
    return res;
  }

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔑 FIXED role fetch
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const role = profile.role;

  // Role-based protection
 // ADMIN
if (
  pathname.startsWith("/dashboards/admin") &&
  role !== "admin"
) {
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

// TEACHER
if (
  pathname.startsWith("/dashboards/teacher") &&
  role !== "teacher"
) {
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

// STUDENT
if (
  pathname.startsWith("/dashboards/student") &&
  role !== "student"
) {
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*"],
};