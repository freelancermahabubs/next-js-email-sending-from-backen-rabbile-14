import {jwtVerify} from "jose";
import {NextResponse} from "next/server";

export async function middleware(req, res, next) {
  if (req.nextUrl.pathname.startsWith("/api/profile")) {
    // Token Verify
    try {
      const reqHeaders = new Headers(req.headers);
      const Token = reqHeaders.get("Token");
      // Token Verify 
      const Key = new TextEncoder().encode(process.env.JWT_KEY);
      const decodedString = jwtVerify(Token, Key);
      // add with next Request Header 
      const username = decodedString['payload']['username'] 
      reqHeaders.set('username', username)
      
      // Next Step with Manupulated Header 
      return NextResponse.next({
        request: {headers: reqHeaders}
      })
    } catch (error) {
      return NextResponse.json(
        {status: "fail", messgage: "Unauthorized"},
        {status: 401}
      );
    }
  }
}
