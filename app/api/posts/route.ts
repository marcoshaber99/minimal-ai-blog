import { NextResponse } from "next/server";
import { postSchema } from "@/lib/validations";
import { createPost } from "@/lib/db";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    // Step 1: Parse the incoming JSON request
    const json = await request.json();

    // Step 2: Validate the data against our schema
    const result = postSchema.parse(json);

    // Step 3: Save the validated data to the database
    const post = await createPost(result);

    // Step 4: Return the created post with 201 status
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    // Handle any unexpected errors
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
