import { NextResponse } from "next/server";
import { getHomeFeed } from "@/lib/feed";

export const revalidate = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  try {
    const homeFeed = await getHomeFeed();
    return NextResponse.json(homeFeed);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
