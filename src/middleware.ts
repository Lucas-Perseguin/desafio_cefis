import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // if user sends request to "/api/login or /api/register", it has no token. so let the request pass
  if (pathname.includes("/api/login") || pathname.includes("/api/register")) {
    return NextResponse.next();
  }

  function logout() {
    req.cookies.delete("token");
    req.cookies.delete("name");
    req.cookies.delete("role");
    return NextResponse.redirect("/login");
  }

  const token = req ? req.cookies.get("token")?.value : null;
  if (token) {
    try {
      // this is how we sign= jwt.sign(object,secretKey)
      // now use the same secretKey to decode the token
      const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
      return NextResponse.next();
    } catch (error) {
      logout();
    }
  } else {
    logout();
  }
}
