import {NextResponse} from "next/server";
import nodemailer from "nodemailer";
export async function GET(req, res) {
  const {searchParams} = new URL(req.url);
  let ToEmail = searchParams.get("email");
  // Transporter
  let Transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 587,
    secure: false,
    auth: {
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },

    tls: {rejectUnauthorized: false},
  });
  //   prepare Email
  let myEmail = {
    from: "Test Email From Next js Application<info@teamrabbil.com>",
    to: ToEmail,
    subject: "Test Email From Next js Application",
    text: "Test Email From Next js Application",
  };
  try {
    const result = await Transporter.sendMail(myEmail);

    return NextResponse.json({msg: "susses", data: result});
  } catch (error) {
    return NextResponse.json({msg: "Fail", error: error.message});
  }
}
