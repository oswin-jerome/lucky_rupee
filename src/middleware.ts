import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSessionClient } from "./actions/appwrite";
import { redirect } from "next/navigation";

const openRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  if (!openRoutes.includes(request.nextUrl.pathname)) {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      if (!user) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
