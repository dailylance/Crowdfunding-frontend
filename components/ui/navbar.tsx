"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export function Navbar() {
	return (
		<header className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 z-50 shadow-soft">
			<div className="container mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
						<TrendingUp className="w-7 h-7 text-white" />
					</div>
					<span className="text-2xl font-bold text-slate-900">
						CrowdFund
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
							Pro
						</span>
					</span>
				</div>
				<nav className="hidden md:flex items-center space-x-8">
					<Link href="/">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Home
						</span>
					</Link>
					<Link href="/#features">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Features
						</span>
					</Link>
					<Link href="/#platforms">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Platforms
						</span>
					</Link>
					<Link href="/#data-extraction">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Data Extraction
						</span>
					</Link>
					<Link href="/#stats">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Analytics
						</span>
					</Link>
					<Link href="/#pricing">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Pricing
						</span>
					</Link>
					<Link href="/#testimonials">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							Testimonials
						</span>
					</Link>
				</nav>
				<div className="flex items-center space-x-4">
					<Link href="/auth/signin">
						<Button
							variant="ghost"
							className="text-slate-700 hover:text-slate-900 font-semibold"
						>
							Sign In
						</Button>
					</Link>
					<Link href="/auth/signup">
						<Button
							variant="gradient"
							size="lg"
							className="font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
} 