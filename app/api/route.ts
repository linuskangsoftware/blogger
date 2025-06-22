import { NextResponse } from "next/server"
const env = process.env

export async function GET() {
    return NextResponse.json({
        version: env.VERSION,
        name: env.BLOG_NAME,
        description: env.BLOG_DESCRIPTION,
    })
}