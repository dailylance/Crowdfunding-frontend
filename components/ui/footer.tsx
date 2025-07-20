"use client";

import Link from "next/link";
import { TrendingUp, Mail, Phone, MapPin, Twitter, Linkedin, Github, Globe, Shield, Zap, Database } from "lucide-react";

export function Footer() {
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
							Advanced crowdfunding analytics platform with AI-powered OCR/NLP enhancement. 
							Extract comprehensive data from 9+ global platforms with automated exports.
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
						<h3 className="text-lg font-semibold text-slate-900">Platform Features</h3>
						<div className="space-y-4">
							<Link href="/#features" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors">
								<Zap className="w-4 h-4" />
								<span>AI OCR Enhancement</span>
							</Link>
							<Link href="/#features" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors">
								<Database className="w-4 h-4" />
								<span>Multi-Platform Scraping</span>
							</Link>
							<Link href="/#features" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors">
								<Globe className="w-4 h-4" />
								<span>Automated Exports</span>
							</Link>
							<Link href="/#features" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors">
								<Shield className="w-4 h-4" />
								<span>Data Security</span>
							</Link>
						</div>
					</div>

					{/* Supported Platforms */}
					<div className="space-y-6">
						<h3 className="text-lg font-semibold text-slate-900">Supported Platforms</h3>
						<div className="space-y-3">
							<div className="text-slate-600">Global Platforms</div>
							<div className="space-y-2 text-sm text-slate-500">
								<div>• Kickstarter</div>
								<div>• Indiegogo</div>
							</div>
							<div className="text-slate-600 mt-4">Asian Platforms</div>
							<div className="space-y-2 text-sm text-slate-500">
								<div>• Makuake (Japan)</div>
								<div>• Wadiz (Korea)</div>
								<div>• Campfire (Japan)</div>
								<div>• FlyingV (Taiwan)</div>
								<div>• GreenFunding (Japan)</div>
								<div>• ZecZec (Taiwan)</div>
								<div>• Machi-ya (Japan)</div>
							</div>
						</div>
					</div>

					{/* Contact & Company */}
					<div className="space-y-6">
						<h3 className="text-lg font-semibold text-slate-900">Contact & Company</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3 text-slate-600">
								<Mail className="w-4 h-4" />
								<span>support@crowdfundpro.com</span>
							</div>
							<div className="flex items-center space-x-3 text-slate-600">
								<Phone className="w-4 h-4" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-3 text-slate-600">
								<MapPin className="w-4 h-4" />
								<span>San Francisco, CA</span>
							</div>
						</div>
						<div className="space-y-3">
							<Link href="/auth/signup" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
								Start Free Trial
							</Link>
							<Link href="/auth/signin" className="block w-full border border-slate-300 text-slate-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
								Sign In
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
							© 2024 CrowdFund Pro. All rights reserved.
						</div>
						<div className="flex space-x-6 text-sm">
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								Privacy Policy
							</Link>
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								Terms of Service
							</Link>
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								Cookie Policy
							</Link>
							<Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
								Contact
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
} 