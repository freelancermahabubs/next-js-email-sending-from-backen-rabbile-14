import {SignJWT} from "jose";
import {NextResponse} from "next/server";

export async function POST(req, res) {
  const JSONBody = await req.json();
  let username = JSONBody["user"];
  let passwrod = JSONBody["passwrod"];

  // database check
  if (username === "ABC" && passwrod === "123") {
    // Token
    const payload = {username: username};
    const Key = new TextEncoder().encode(process.env.JWT_KEY);
    let token = await new SignJWT(payload)
      .setProtectedHeader({alg: "HS256"})
      .setIssuedAt()
      .setIssuer("localhost:3000/")
      .setExpirationTime("2h")
      .sign(Key);
    return NextResponse.json(
      {status: "succes", messgage: "Login Success", token},
      {status: 200}
    );
  } else {
    return NextResponse.json(
      {status: "fail", messgage: "Invalid User"},
      {status: 401}
    );
  }
}
