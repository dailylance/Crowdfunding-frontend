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
				action: "signin",
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
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50/30 flex items-center justify-center p-4 relative overflow-hidden'>
			{/* Background decoration */}
			<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E2E8F0" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>
			
			{/* Floating elements */}
			<div className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-xl animate-enhanced-float'></div>
			<div className='absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-blue-500/20 rounded-full blur-xl animate-enhanced-float' style={{animationDelay: '1s'}}></div>
			
			<div className='w-full max-w-md relative z-10'>
				{/* Logo */}
				<div className='text-center mb-8'>
					<Link href='/' className='inline-flex items-center space-x-3 group'>
						<div className='w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300'>
							<TrendingUp className='w-8 h-8 text-white' />
						</div>
						<span className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700'>
							CrowdFund Pro
						</span>
					</Link>
				</div>

				<Card className='bg-white/95 backdrop-blur-sm border border-slate-200 shadow-strong'>
					<CardHeader className='text-center'>
						<CardTitle className='text-3xl font-bold text-slate-900'>Welcome Back</CardTitle>
						<CardDescription className='text-slate-600 text-lg'>
							Sign in to your account to continue
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						{/* Google Sign In */}
						<Button
							variant='outline'
							className='w-full h-14 text-base border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 rounded-xl'
							onClick={handleGoogleSignIn}
							disabled={isLoading}>
							<svg className='w-6 h-6 mr-3' viewBox='0 0 24 24'>
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
								<span className='w-full border-t border-slate-200' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-white px-4 text-slate-500 font-medium'>
									Or continue with email
								</span>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className='p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl'>
								{error}
							</div>
						)}

						{/* Email/Password Form */}
						<form onSubmit={handleSubmit} className='space-y-5'>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-semibold text-slate-700 mb-2'>
									Email
								</label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Enter your email'
									required
									className='h-14 text-base border-2 border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 transition-all duration-300 rounded-xl'
								/>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-semibold text-slate-700 mb-2'>
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
										className='h-14 text-base border-2 border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 transition-all duration-300 rounded-xl pr-12'
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors'
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<EyeOff className='h-5 w-5' />
										) : (
											<Eye className='h-5 w-5' />
										)}
									</button>
								</div>
							</div>

							<Button
								type='submit'
								variant="gradient"
								className='w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
								disabled={isLoading}>
								{isLoading ? "Signing In..." : "Sign In"}
							</Button>
						</form>

						<div className='text-center text-sm'>
							<span className='text-slate-600'>
								Don&apos;t have an account?{" "}
							</span>
							<Link
								href='/auth/signup'
								className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300'>
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>

				<div className='text-center mt-8 text-sm text-slate-500'>
					<Link href='/' className='hover:text-slate-700 transition-colors font-medium'>
						← Back to home
					</Link>
				</div>
			</div>
		</div>
	);
} 