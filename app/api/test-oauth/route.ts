import { NextResponse } from "next/server";

export async function GET() {
	// Test if Google OAuth credentials are working
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	const nextauthUrl = process.env.NEXTAUTH_URL;
	const nextauthSecret = process.env.NEXTAUTH_SECRET;

	const response = {
		status: "Environment Check",
		results: {
			GOOGLE_CLIENT_ID: clientId
				? `✓ Set (${clientId.substring(0, 10)}...)`
				: "✗ Missing",
			GOOGLE_CLIENT_SECRET: clientSecret
				? `✓ Set (${clientSecret.substring(0, 10)}...)`
				: "✗ Missing",
			NEXTAUTH_URL: nextauthUrl || "✗ Missing",
			NEXTAUTH_SECRET: nextauthSecret ? "✓ Set" : "✗ Missing",
			callback_url: `${nextauthUrl}/api/auth/callback/google`,
			NODE_ENV: process.env.NODE_ENV,
		},
		google_oauth_test_url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
			nextauthUrl + "/api/auth/callback/google"
		)}&response_type=code&scope=openid%20profile%20email`,
	};

	return NextResponse.json(response, {
		headers: { "Content-Type": "application/json" },
	});
}
