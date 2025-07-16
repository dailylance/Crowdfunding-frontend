"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Search,
	Database,
	FileDown,
	Bot,
	TrendingUp,
	Shield,
	Zap,
	Users,
	Eye,
	CheckCircle,
	Star,
	Globe,
	Sparkles,
	Play,
} from "lucide-react";

export function LandingPage() {
	return (
		<div className='min-h-screen bg-white'>
			{/* Header */}
			<header className='bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm'>
				<div className='container mx-auto px-6 py-4 flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg'>
							<TrendingUp className='w-6 h-6 text-white' />
						</div>
						<span className='text-2xl font-bold text-gray-900'>
							CrowdFund<span className='text-blue-600'>Pro</span>
						</span>
					</div>
					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='#features'
							className='text-gray-600 hover:text-gray-900 font-medium transition-colors'>
							Features
						</Link>
						<Link
							href='#platforms'
							className='text-gray-600 hover:text-gray-900 font-medium transition-colors'>
							Platforms
						</Link>
						<Link
							href='#pricing'
							className='text-gray-600 hover:text-gray-900 font-medium transition-colors'>
							Pricing
						</Link>
					</nav>
					<div className='flex items-center space-x-4'>
						<Link href='/auth/signin'>
							<Button
								variant='ghost'
								className='text-gray-700 hover:text-gray-900 font-semibold'>
								Sign In
							</Button>
						</Link>
						<Link href='/auth/signup'>
							<Button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'>
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 pt-20 pb-32'>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E5E7EB" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40'></div>
				<div className='container mx-auto px-6 relative z-10'>
					<div className='text-center max-w-5xl mx-auto'>
						<div className='inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8'>
							<Sparkles className='w-4 h-4' />
							Professional Crowdfunding Analytics Platform
						</div>
						<h1 className='text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-900 leading-tight'>
							Premium <span className='text-blue-600'>Crowdfunding</span>
							<br />
							<span className='bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent'>
								Analytics That Deliver
							</span>
						</h1>
						<p className='text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light'>
							At CrowdFund Pro, we deliver more than just analytics — we provide
							top-rated insights, data, and research tools for crowdfunding
							campaigns, combining accuracy, intelligence, and automation that
							professionals trust.
						</p>
						<div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
							<Link href='/auth/signup'>
								<Button
									size='lg'
									className='text-lg px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
									<Globe className='w-5 h-5 mr-2' />
									Start Analytics
								</Button>
							</Link>
							<Button
								variant='outline'
								size='lg'
								className='text-lg px-10 py-4 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200'>
								<Play className='w-5 h-5 mr-2' />
								Watch Demo
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='py-24 bg-white'>
				<div className='container mx-auto px-6'>
					<div className='text-center mb-20'>
						<div className='inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6'>
							<Zap className='w-4 h-4' />
							Powerful Features
						</div>
						<h2 className='text-5xl md:text-6xl font-bold mb-6 text-gray-900'>
							Professional Solutions
							<br />
							<span className='text-blue-600'>That Impress and Deliver</span>
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Everything you need to analyze crowdfunding campaigns with
							enterprise-grade precision and intelligence
						</p>
					</div>

					<div className='grid lg:grid-cols-3 gap-8 mb-16'>
						<Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30'>
							<CardHeader className='pb-4'>
								<div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
									<Search className='w-8 h-8 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-900 mb-3'>
									Smart Search & Discovery
								</CardTitle>
								<CardDescription className='text-gray-600 text-lg leading-relaxed'>
									Search across multiple crowdfunding platforms with advanced
									filtering by category, keyword, and success metrics.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/30'>
							<CardHeader className='pb-4'>
								<div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
									<Bot className='w-8 h-8 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-900 mb-3'>
									OCR & AI Analysis
								</CardTitle>
								<CardDescription className='text-gray-600 text-lg leading-relaxed'>
									Advanced OCR technology extracts data from images and
									screenshots, enhanced with AI for accurate crowdfunding
									metrics.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/30'>
							<CardHeader className='pb-4'>
								<div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
									<Database className='w-8 h-8 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-900 mb-3'>
									Data Management
								</CardTitle>
								<CardDescription className='text-gray-600 text-lg leading-relaxed'>
									Store, organize, and manage your research data with our secure
									cloud database and intelligent categorization.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50/30'>
							<CardHeader className='pb-4'>
								<div className='w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
									<FileDown className='w-8 h-8 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-900 mb-3'>
									Google Sheets Export
								</CardTitle>
								<CardDescription className='text-gray-600 text-lg leading-relaxed'>
									Seamlessly export your analysis to Google Sheets with
									automatic formatting and real-time synchronization.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50/30'>
							<CardHeader className='pb-4'>
								<div className='w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
									<Eye className='w-8 h-8 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-900 mb-3'>
									Real-time Monitoring
								</CardTitle>
								<CardDescription className='text-gray-600 text-lg leading-relaxed'>
									Track campaign performance, funding progress, and market
									trends with live monitoring and alerts.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-pink-50/30'>
							<CardHeader className='pb-4'>
								<div className='w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
									<TrendingUp className='w-8 h-8 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-900 mb-3'>
									Analytics Dashboard
								</CardTitle>
								<CardDescription className='text-gray-600 text-lg leading-relaxed'>
									Comprehensive dashboard with charts, insights, and performance
									metrics to make data-driven decisions.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Platform Support */}
			<section
				id='platforms'
				className='py-24 bg-gradient-to-br from-gray-50 to-blue-50/30'>
				<div className='container mx-auto px-6'>
					<div className='text-center mb-20'>
						<div className='inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6'>
							<Globe className='w-4 h-4' />
							Platform Coverage
						</div>
						<h2 className='text-5xl md:text-6xl font-bold mb-6 text-gray-900'>
							Multi-Platform
							<br />
							<span className='text-blue-600'>Analytics Support</span>
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Analyze campaigns from the world&apos;s leading crowdfunding
							platforms with unified insights and reporting
						</p>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto'>
						<div className='text-center group cursor-pointer'>
							<div className='w-20 h-20 bg-white border-2 border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:border-green-400 transition-all duration-300'>
								<span className='text-3xl font-bold text-green-600'>K</span>
							</div>
							<h3 className='font-bold text-lg text-gray-900'>Kickstarter</h3>
							<p className='text-gray-600 text-sm mt-1'>Creative Projects</p>
						</div>
						<div className='text-center group cursor-pointer'>
							<div className='w-20 h-20 bg-white border-2 border-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:border-purple-400 transition-all duration-300'>
								<span className='text-3xl font-bold text-purple-600'>I</span>
							</div>
							<h3 className='font-bold text-lg text-gray-900'>Indiegogo</h3>
							<p className='text-gray-600 text-sm mt-1'>Innovation Hub</p>
						</div>
						<div className='text-center group cursor-pointer'>
							<div className='w-20 h-20 bg-white border-2 border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:border-blue-400 transition-all duration-300'>
								<span className='text-3xl font-bold text-blue-600'>M</span>
							</div>
							<h3 className='font-bold text-lg text-gray-900'>Makuake</h3>
							<p className='text-gray-600 text-sm mt-1'>Japanese Market</p>
						</div>
						<div className='text-center group cursor-pointer'>
							<div className='w-20 h-20 bg-white border-2 border-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:border-orange-400 transition-all duration-300'>
								<span className='text-3xl font-bold text-orange-600'>+</span>
							</div>
							<h3 className='font-bold text-lg text-gray-900'>
								More Platforms
							</h3>
							<p className='text-gray-600 text-sm mt-1'>Growing Network</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-24 bg-white'>
				<div className='container mx-auto px-6'>
					<div className='text-center mb-20'>
						<div className='inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6'>
							<CheckCircle className='w-4 h-4' />
							Why Choose Us
						</div>
						<h2 className='text-5xl md:text-6xl font-bold mb-6 text-gray-900'>
							Why Choose
							<br />
							<span className='text-blue-600'>CrowdFund Pro?</span>
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Experience the advantages of professional-grade analytics
						</p>
					</div>

					<div className='grid lg:grid-cols-2 gap-16 items-center'>
						<div>
							<div className='space-y-8'>
								<div className='flex items-start space-x-6'>
									<div className='flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
										<CheckCircle className='w-6 h-6 text-green-600' />
									</div>
									<div>
										<h3 className='text-2xl font-bold mb-3 text-gray-900'>
											Save 10+ Hours Weekly
										</h3>
										<p className='text-gray-600 text-lg leading-relaxed'>
											Automate data collection and analysis that would take
											hours manually with our intelligent automation systems
										</p>
									</div>
								</div>
								<div className='flex items-start space-x-6'>
									<div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
										<Shield className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<h3 className='text-2xl font-bold mb-3 text-gray-900'>
											99% Data Accuracy
										</h3>
										<p className='text-gray-600 text-lg leading-relaxed'>
											AI-powered OCR and validation ensures reliable, accurate
											data extraction across all platforms
										</p>
									</div>
								</div>
								<div className='flex items-start space-x-6'>
									<div className='flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
										<Shield className='w-6 h-6 text-purple-600' />
									</div>
									<div>
										<h3 className='text-2xl font-bold mb-3 text-gray-900'>
											Enterprise Security
										</h3>
										<p className='text-gray-600 text-lg leading-relaxed'>
											Bank-level security with encrypted data storage and secure
											API access for your sensitive research data
										</p>
									</div>
								</div>
								<div className='flex items-start space-x-6'>
									<div className='flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center'>
										<Zap className='w-6 h-6 text-orange-600' />
									</div>
									<div>
										<h3 className='text-2xl font-bold mb-3 text-gray-900'>
											Real-time Updates
										</h3>
										<p className='text-gray-600 text-lg leading-relaxed'>
											Live data synchronization and instant notifications for
											campaign changes and market opportunities
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='relative'>
							<div className='bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl'>
								<div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
								<div className='absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12'></div>
								<div className='relative z-10'>
									<h3 className='text-3xl font-bold mb-6'>
										Ready to Get Started?
									</h3>
									<p className='mb-8 opacity-90 text-lg leading-relaxed'>
										Join thousands of professionals who trust CrowdFund Pro for
										their market research and competitive analysis
									</p>
									<div className='flex items-center space-x-6 mb-8'>
										<div className='flex -space-x-3'>
											<div className='w-12 h-12 bg-white/20 rounded-full border-3 border-white backdrop-blur-sm'></div>
											<div className='w-12 h-12 bg-white/20 rounded-full border-3 border-white backdrop-blur-sm'></div>
											<div className='w-12 h-12 bg-white/20 rounded-full border-3 border-white backdrop-blur-sm'></div>
											<div className='w-12 h-12 bg-white/30 rounded-full border-3 border-white flex items-center justify-center text-sm font-bold'>
												+500
											</div>
										</div>
										<div>
											<div className='flex items-center space-x-1 mb-1'>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className='w-5 h-5 fill-yellow-400 text-yellow-400'
													/>
												))}
											</div>
											<p className='text-sm opacity-90 font-medium'>
												5.0 rating from 500+ professionals
											</p>
										</div>
									</div>
									<Link href='/auth/signup'>
										<Button
											size='lg'
											variant='secondary'
											className='w-full text-lg py-4 bg-white text-blue-600 hover:bg-gray-50 font-bold rounded-xl shadow-lg'>
											Start Your Free Trial Today
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-20'>
				<div className='container mx-auto px-6'>
					<div className='grid md:grid-cols-4 gap-12'>
						<div className='md:col-span-2'>
							<div className='flex items-center space-x-3 mb-6'>
								<div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg'>
									<TrendingUp className='w-6 h-6 text-white' />
								</div>
								<span className='text-2xl font-bold'>
									CrowdFund<span className='text-blue-400'>Pro</span>
								</span>
							</div>
							<p className='text-gray-400 text-lg leading-relaxed mb-6 max-w-md'>
								Professional crowdfunding analytics platform for modern market
								research. Trusted by thousands of professionals worldwide.
							</p>
							<div className='flex space-x-4'>
								<div className='w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors'>
									<Users className='w-5 h-5' />
								</div>
								<div className='w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors'>
									<Globe className='w-5 h-5' />
								</div>
								<div className='w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors'>
									<TrendingUp className='w-5 h-5' />
								</div>
							</div>
						</div>
						<div>
							<h4 className='font-bold mb-6 text-lg'>Product</h4>
							<ul className='space-y-3 text-gray-400'>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Features
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Pricing
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									API Documentation
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Integrations
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Security
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-bold mb-6 text-lg'>Support</h4>
							<ul className='space-y-3 text-gray-400'>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Help Center
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Community
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Live Chat
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Contact Us
								</li>
								<li className='hover:text-white cursor-pointer transition-colors'>
									Status Page
								</li>
							</ul>
						</div>
					</div>
					<div className='border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center'>
						<p className='text-gray-400 mb-4 md:mb-0'>
							&copy; 2024 CrowdFund Pro. All rights reserved.
						</p>
						<div className='flex space-x-6 text-gray-400 text-sm'>
							<span className='hover:text-white cursor-pointer transition-colors'>
								Privacy Policy
							</span>
							<span className='hover:text-white cursor-pointer transition-colors'>
								Terms of Service
							</span>
							<span className='hover:text-white cursor-pointer transition-colors'>
								Cookie Policy
							</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
