import { NextResponse, } from "next/server"
const env = process.env

export async function GET(request: NextResponse) {
    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (token !== process.env.API_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
        version: env.VERSION,
        name: env.BLOG_NAME,
        description: env.BLOG_DESCRIPTION,
    })
}