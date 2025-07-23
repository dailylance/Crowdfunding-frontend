"use client";

import Link from "next/link";
import { TrendingUp, Mail, Phone, MapPin, Twitter, Linkedin, Github, Globe, Shield, Zap, Database } from "lucide-react";
import en from "@/locales/main/landing/en";
import ja from "@/locales/main/landing/ja";
import { useLang } from "@/components/providers/lang-provider";

export function Footer() {
	const { lang } = useLang();
	const t = lang === "ja" ? ja : en;
	return (
		<footer className="bg-white border-t border-slate-200">
			{/* Main Footer Content */}
			<div className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-6">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
								<TrendingUp className="w-6 h-6 text-white" />
							</div>
							<span className="text-xl font-bold text-slate-900">
								CrowdFund<span className="text-blue-600">Pro</span>
							</span>
						</div>
						<p className="text-slate-600 leading-relaxed">
							{t.footer.companyDesc}
						</p>
						<div className="flex space-x-4">
							<Link href="#" className="w-10 h-10 bg-slate-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
								<Twitter className="w-5 h-5 text-slate-600 hover:text-blue-600" />
							</Link>
							<Link href="#" className="w-10 h-10 bg-slate-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
								<Linkedin className="w-5 h-5 text-slate-600 hover:text-blue-600" />
							</Link>
							<Link href="#" className="w-10 h-10 bg-slate-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
								<Github className="w-5 h-5 text-slate-600 hover:text-blue-600" />
							</Link>
						</div>
					</div>

					{/* Platform Features */}
					<div className="space-y-6">
						<h3 className="text-lg font-semibold text-slate-900">{t.footer.featuresTitle}</h3>
						<div className="space-y-4">
							{t.footer.features.map((feature, i) => (
								<div key={i} className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors">
									{/* You can map icons if needed */}
									<span>{feature}</span>
								</div>
							))}
						</div>
					</div>

					{/* Supported Platforms */}
					<div className="space-y-6">
						<h3 className="text-lg font-semibold text-slate-900">{t.footer.platformsTitle}</h3>
						<div className="space-y-3">
							<div className="text-slate-600">{t.footer.globalPlatforms}</div>
							<div className="space-y-2 text-sm text-slate-500">
								{t.footer.platforms.slice(0,2).map((p, i) => <div key={i}>• {p}</div>)}
							</div>
							<div className="text-slate-600 mt-4">{t.footer.asianPlatforms}</div>
							<div className="space-y-2 text-sm text-slate-500">
								{t.footer.platforms.slice(2).map((p, i) => <div key={i}>• {p}</div>)}
							</div>
						</div>
					</div>

					{/* Contact & Company */}
					<div className="space-y-6">
						<h3 className="text-lg font-semibold text-slate-900">{t.footer.contactTitle}</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3 text-slate-600">
								<Mail className="w-4 h-4" />
								<span>{t.footer.email}</span>
							</div>
							<div className="flex items-center space-x-3 text-slate-600">
								<Phone className="w-4 h-4" />
								<span>{t.footer.phone}</span>
							</div>
							<div className="flex items-center space-x-3 text-slate-600">
								<MapPin className="w-4 h-4" />
								<span>{t.footer.address}</span>
							</div>
						</div>
						<div className="space-y-3">
							<Link href="/auth/signup" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
								{t.footer.startTrial}
							</Link>
							<Link href="/auth/signin" className="block w-full border border-slate-300 text-slate-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
								{t.footer.signIn}
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Footer */}
			<div className="border-t border-slate-200 bg-slate-50">
				<div className="container mx-auto px-6 py-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-slate-600 text-sm">
							{t.footer.copyright}
						</div>
						<div className="flex space-x-6 text-sm">
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								{t.footer.privacy}
							</Link>
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								{t.footer.terms}
							</Link>
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								{t.footer.cookie}
							</Link>
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								{t.footer.contact}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
} 