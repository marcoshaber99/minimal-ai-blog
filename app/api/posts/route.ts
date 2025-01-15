import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = postSchema.parse(json);

    const post = await prisma.post.create({
      data: body,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
