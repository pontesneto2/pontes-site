import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export function GET() {
  return NextResponse.json({
    pt: getAllPosts("pt").slice(0, 3),
    en: getAllPosts("en").slice(0, 3),
  });
}
