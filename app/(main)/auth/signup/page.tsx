"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
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
import { TrendingUp, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			if (response.ok) {
				setSuccess(true);
				// Auto sign in after successful registration using credentials provider
				setTimeout(async () => {
					await signIn("credentials", {
						email,
						password,
						action: "signin", // Indicate this is a signin after signup
						callbackUrl: "/dashboard",
					});
				}, 2000);
			} else {
				const data = await response.json();
				setError(data.message || "An error occurred");
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

	if (success) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
				<Card className='w-full max-w-md border-2 border-white/50 backdrop-blur-sm bg-white/80'>
					<CardContent className='text-center py-12'>
						<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
							<CheckCircle className='w-8 h-8 text-green-600' />
						</div>
						<h2 className='text-2xl font-bold mb-4'>
							Account Created Successfully!
						</h2>
						<p className='text-gray-600 mb-6'>
							Welcome to CrowdFund Pro! You&apos;re being redirected to your
							dashboard...
						</p>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
					</CardContent>
				</Card>
			</div>
		);
	}

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
						<CardTitle className='text-2xl'>Create Your Account</CardTitle>
						<CardDescription>
							Get started with your free trial today
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
									Or sign up with email
								</span>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
								{error}
							</div>
						)}

						{/* Sign Up Form */}
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-gray-700 mb-1'>
									Full Name
								</label>
								<Input
									id='name'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder='Enter your full name'
									required
									className='h-12'
								/>
							</div>

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
										placeholder='Create a password'
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

							<div>
								<label
									htmlFor='confirmPassword'
									className='block text-sm font-medium text-gray-700 mb-1'>
									Confirm Password
								</label>
								<div className='relative'>
									<Input
										id='confirmPassword'
										type={showConfirmPassword ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder='Confirm your password'
										required
										className='h-12 pr-10'
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 pr-3 flex items-center'
										onClick={() =>
											setShowConfirmPassword(!showConfirmPassword)
										}>
										{showConfirmPassword ? (
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
								{isLoading ? "Creating Account..." : "Create Account"}
							</Button>
						</form>

						<div className='text-center text-sm'>
							<span className='text-gray-600'>Already have an account? </span>
							<Link
								href='/auth/signin'
								className='text-blue-600 hover:text-blue-500 font-medium'>
								Sign in
							</Link>
						</div>

						<div className='text-xs text-gray-500 text-center'>
							By creating an account, you agree to our{" "}
							<Link href='/terms' className='underline hover:text-gray-700'>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href='/privacy' className='underline hover:text-gray-700'>
								Privacy Policy
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