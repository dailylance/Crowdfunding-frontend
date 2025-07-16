"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Eye, EyeOff } from "lucide-react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid credentials");
			} else {
				router.push("/dashboard");
			}
		} catch {
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		await signIn("google", { callbackUrl: "/dashboard" });
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				{/* Logo */}
				<div className='text-center mb-8'>
					<Link href='/' className='inline-flex items-center space-x-2'>
						<div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
							<TrendingUp className='w-6 h-6 text-white' />
						</div>
						<span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
							CrowdFund Pro
						</span>
					</Link>
				</div>

				<Card className='border-2 border-white/50 backdrop-blur-sm bg-white/80'>
					<CardHeader className='text-center'>
						<CardTitle className='text-2xl'>Welcome Back</CardTitle>
						<CardDescription>
							Sign in to your account to continue
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						{/* Google Sign In */}
						<Button
							variant='outline'
							className='w-full h-12 text-base'
							onClick={handleGoogleSignIn}
							disabled={isLoading}>
							<svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
								/>
								<path
									fill='currentColor'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
								/>
								<path
									fill='currentColor'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
								/>
								<path
									fill='currentColor'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
								/>
							</svg>
							Continue with Google
						</Button>

						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-white px-2 text-muted-foreground'>
									Or continue with email
								</span>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
								{error}
							</div>
						)}

						{/* Email/Password Form */}
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700 mb-1'>
									Email
								</label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Enter your email'
									required
									className='h-12'
								/>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700 mb-1'>
									Password
								</label>
								<div className='relative'>
									<Input
										id='password'
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='Enter your password'
										required
										className='h-12 pr-10'
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 pr-3 flex items-center'
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<EyeOff className='h-4 w-4 text-gray-400' />
										) : (
											<Eye className='h-4 w-4 text-gray-400' />
										)}
									</button>
								</div>
							</div>

							<Button
								type='submit'
								className='w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
								disabled={isLoading}>
								{isLoading ? "Signing In..." : "Sign In"}
							</Button>
						</form>

						<div className='text-center text-sm'>
							<span className='text-gray-600'>
								Don&apos;t have an account?{" "}
							</span>
							<Link
								href='/auth/signup'
								className='text-blue-600 hover:text-blue-500 font-medium'>
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>

				<div className='text-center mt-6 text-sm text-gray-500'>
					<Link href='/' className='hover:text-gray-700'>
						← Back to home
					</Link>
				</div>
			</div>
		</div>
	);
}
