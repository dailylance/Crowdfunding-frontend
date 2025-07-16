"use client";

import { Button } from "@/components/ui/button";

export default function GoogleTest() {
	const testGoogleOAuth = () => {
		const clientId =
			"948783504128-391cehla5sgdu064odm16ig83irfpu4k.apps.googleusercontent.com";
		const redirectUri = "http://localhost:3000/api/auth/callback/google";
		const scope = "openid profile email";

		const googleAuthUrl =
			`https://accounts.google.com/o/oauth2/v2/auth?` +
			`client_id=${clientId}&` +
			`redirect_uri=${encodeURIComponent(redirectUri)}&` +
			`response_type=code&` +
			`scope=${encodeURIComponent(scope)}&` +
			`state=test`;

		window.open(googleAuthUrl, "_blank");
	};

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-4'>Direct Google OAuth Test</h1>
			<p className='mb-4'>
				This will test Google OAuth directly without NextAuth:
			</p>
			<Button onClick={testGoogleOAuth}>Test Google OAuth Directly</Button>

			<div className='mt-6 p-4 bg-gray-100 rounded'>
				<h3 className='font-semibold'>Instructions:</h3>
				<ol className='list-decimal list-inside space-y-1 text-sm'>
					<li>Click the button above</li>
					<li>If Google OAuth popup opens, the credentials are correct</li>
					<li>
						If you see &quot;invalid_client&quot;, check OAuth Consent Screen
					</li>
					<li>Make sure your email is added as a test user</li>
				</ol>
			</div>
		</div>
	);
}
