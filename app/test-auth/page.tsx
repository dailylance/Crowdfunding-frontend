"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function TestAuth() {
	const { data: session, status } = useSession();
	const [error, setError] = useState<string | null>(null);

	const handleGoogleSignIn = async () => {
		try {
			setError(null);
			const result = await signIn("google", {
				redirect: false,
				callbackUrl: "/dashboard",
			});

			if (result?.error) {
				setError(`Sign in error: ${result.error}`);
				console.error("SignIn Error:", result);
			}
		} catch (err) {
			setError(`Exception: ${err}`);
			console.error("Exception during sign in:", err);
		}
	};

	if (status === "loading") {
		return <div className='p-8'>Loading...</div>;
	}

	return (
		<div className='p-8 max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Auth Test Page</h1>

			{error && (
				<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
					<strong>Error:</strong> {error}
				</div>
			)}

			{session ? (
				<div className='space-y-4'>
					<p>Signed in as: {session.user?.email}</p>
					<p>Name: {session.user?.name}</p>
					{session.user?.image && (
						<Image
							src={session.user.image}
							alt='Profile'
							width={64}
							height={64}
							className='w-16 h-16 rounded-full'
						/>
					)}
					<Button onClick={() => signOut()}>Sign Out</Button>
				</div>
			) : (
				<div className='space-y-4'>
					<p>Not signed in</p>
					<div className='space-y-2'>
						<Button onClick={handleGoogleSignIn} className='w-full'>
							Sign in with Google (Debug)
						</Button>
						<Button
							onClick={() => signIn("credentials")}
							variant='outline'
							className='w-full'>
							Sign in with Credentials
						</Button>
					</div>
				</div>
			)}

			<div className='mt-6 p-4 bg-gray-100 rounded'>
				<h3 className='font-semibold'>Debug Info:</h3>
				<p>Status: {status}</p>
				<p>
					Current URL:{" "}
					{typeof window !== "undefined" ? window.location.href : "server"}
				</p>
				<p>Google OAuth URL: http://localhost:3000/api/auth/callback/google</p>
			</div>
		</div>
	);
}
