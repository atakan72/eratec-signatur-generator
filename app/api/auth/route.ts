import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  const authPassword = process.env.AUTH_PASSWORD ?? "eratec2024";
  const authSecret =
    process.env.AUTH_SECRET ?? "change-this-to-a-long-random-secret";

  if (password !== authPassword) {
    return NextResponse.json(
      { success: false, error: "Falsches Passwort" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("auth-token", authSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
