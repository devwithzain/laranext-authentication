import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
   const token = request.cookies.get("authToken")?.value;
   const isAuth = !!token;

   const isAccessingDashboard = request.nextUrl.pathname.startsWith("/user-dashboard");
   const isAccessingAdminDashboard = request.nextUrl.pathname.startsWith("/admin-dashboard");
   const isAccessingLogin = request.nextUrl.pathname === "/";

   if (isAccessingLogin) {
      return NextResponse.next(); // allow login page without auth check
   }

   if (!isAuth && (isAccessingDashboard || isAccessingAdminDashboard)) {
      return NextResponse.redirect(new URL("/", request.url)); // redirect to login
   }

   let role = "";
   if (isAuth) {
      const response = await fetch("http://127.0.0.1:8000/api/profile", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      const userData = await response.json();
      role = userData.data.role;
   }

   if (isAuth && role === "admin" && isAccessingDashboard) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
   }

   if (isAuth && role !== "admin" && isAccessingAdminDashboard) {
      return NextResponse.redirect(new URL("/user-dashboard", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/", "/user-dashboard/:path*", "/admin-dashboard/:path*"],
};