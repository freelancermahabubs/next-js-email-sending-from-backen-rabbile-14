import {SignJWT, jwtVerify} from "jose";
import {NextResponse} from "next/server";
export async function GET(req, res) {
  const Key = new TextEncoder().encode(process.env.JWT_KEY);
  const payload = {email: "abc@abc.com", user_id: "ABC123"};
  let token = await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setIssuer("localhost:3000/")
    .setExpirationTime("2h")
    .sign(Key);
  return NextResponse.json({token: token});
}

export async function POST(req, res) {
  const JsonBody = await req.json();
  const Token = JsonBody["token"];
  const Key = new TextEncoder().encode(process.env.JWT_KEY);
  const decoded = await  jwtVerify(Token, Key)
  return NextResponse.json(decoded)

}
