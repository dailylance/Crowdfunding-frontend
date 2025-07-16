import { NextResponse } from "next/server";

export async function GET() {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

	// Test if we can verify the client ID with Google
	try {
		const response = {
			client_check: {
				GOOGLE_CLIENT_ID: clientId ? `✓ Set: ${clientId}` : "✗ Missing",
				GOOGLE_CLIENT_SECRET: clientSecret ? "✓ Set" : "✗ Missing",
				callback_url: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
			},
			instructions: {
				step1: "Go to https://console.cloud.google.com/apis/credentials",
				step2: "Find your OAuth 2.0 Client ID",
				step3:
					"Add authorized redirect URI: http://localhost:3000/api/auth/callback/google",
				step4: "Add authorized JavaScript origin: http://localhost:3000",
				step5: "Make sure the OAuth client is enabled",
			},
			possible_issues: [
				"Client ID doesn't exist or was deleted",
				"Wrong Google Cloud Project selected",
				"OAuth consent screen not configured",
				"Redirect URI not matching exactly",
				"Client ID credentials copied incorrectly",
			],
		};

		return NextResponse.json(response);
	} catch {
		return NextResponse.json({ error: "Failed to check credentials" });
	}
}
