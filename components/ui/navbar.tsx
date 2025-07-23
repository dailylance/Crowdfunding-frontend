"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useLang } from "@/components/providers/lang-provider";
import en from "@/locales/main/navbar/en";
import ja from "@/locales/main/navbar/ja";

export function Navbar() {
	const { lang, setLang } = useLang();
	const t = lang === "ja" ? ja : en;
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
							{t.home}
						</span>
					</Link>
					<Link href="/#features">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							{t.features}
						</span>
					</Link>
					<Link href="/#platforms">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							{t.platforms}
						</span>
					</Link>
					<Link href="/#data-extraction">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							{t.dataExtraction}
						</span>
					</Link>
					<Link href="/#stats">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							{t.analytics}
						</span>
					</Link>
					<Link href="/#pricing">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							{t.pricing}
						</span>
					</Link>
					<Link href="/#testimonials">
						<span className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
							{t.testimonials}
						</span>
					</Link>
				</nav>
				<div className="flex items-center space-x-4">
					<select
						value={lang}
						onChange={e => setLang(e.target.value as "en" | "ja")}
						className="px-3 py-2 rounded border border-gray-300 bg-white text-sm mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						aria-label="Select language"
					>
						<option value="en">English</option>
						<option value="ja">日本語</option>
					</select>
					<Link href="/auth/signin">
						<Button
							variant="ghost"
							className="text-slate-700 hover:text-slate-900 font-semibold"
						>
							{t.signIn}
						</Button>
					</Link>
					<Link href="/auth/signup">
						<Button
							variant="gradient"
							size="lg"
							className="font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							{t.getStarted}
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
} 