import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await db.delete(products);
  return NextResponse.json({ res: "api is working" });
}
