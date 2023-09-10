import {NextResponse} from "next/server";
import {headers} from "next/headers";

export async function GET(req, res) {
  // find user Identity by checking headers

  const head = headers();
 let username = head.get("username");
  return NextResponse.json({msg: "Porfile GET", username});
}
