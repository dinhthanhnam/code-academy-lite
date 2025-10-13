import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get("codeacademy_session");
    const xsrfToken = req.cookies.get("XSRF-TOKEN");
    const { pathname } = req.nextUrl;
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (!sessionCookie || !xsrfToken) {
        if (!isAuthPage) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    const laravelResponse = await fetch(`http://proxy/auth/check`, {
        headers: {
            Cookie: `codeacademy_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfToken.value}`,
            "X-XSRF-HEADER": xsrfToken.value,
        },
        credentials: "include",
    });

    if (!laravelResponse.ok) {
        if (!isAuthPage) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/social/:path*",
        "/project/:path*",
        "/exercises/:path*",
        "/hall-of-fame/:path*",
        "/pending-exercises/:path*",
        "/archived-exercises/:path*",
        "/admin/:path*",
        "/lecturer/:path*"
    ],
};