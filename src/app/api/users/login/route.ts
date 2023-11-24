import prisma from "../../../../../prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/app/validationSchemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Os dados estão com formato errado" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { name: body.name } });
  if (!user) {
    return NextResponse.json(
      { message: "Nome de usuário e/ou senha incorretos!" },
      { status: 404 }
    );
  }

  const passwordMatches = bcrypt.compareSync(body.password, user.password);
  if (!passwordMatches) {
    return NextResponse.json(
      { message: "Nome de usuário e/ou senha incorretos!" },
      { status: 404 }
    );
  }

  const privateKey = process.env.JWT_SECRET as String;
  const token = jwt.sign({ name: body.name }, `${privateKey}`, {
    expiresIn: "7d",
  });

  return NextResponse.json({ token }, { status: 201 });
}
