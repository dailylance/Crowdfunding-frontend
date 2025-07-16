import { NextResponse } from "next/server";

export async function GET() {
	// Debug endpoint to check environment variables (remove in production)
	const debugInfo = {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "✓ Set" : "✗ Missing",
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
			? "✓ Set"
			: "✗ Missing",
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✓ Set" : "✗ Missing",
		NODE_ENV: process.env.NODE_ENV,
	};

	return NextResponse.json(debugInfo);
}
