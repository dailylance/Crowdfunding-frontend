"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
	{
		name: "Sarah Chen",
		role: "Product Manager",
		company: "TechStart Inc.",
		avatar: "SC",
		rating: 5,
		content: "CrowdFund Pro has revolutionized our market research. The OCR technology is incredibly accurate, and the data export features save us hours of manual work.",
		platform: "Kickstarter"
	},
	{
		name: "Marcus Rodriguez",
		role: "Investment Analyst",
		company: "Venture Capital Partners",
		avatar: "MR",
		rating: 5,
		content: "The analytics and success rate predictions have been spot-on. We've made better investment decisions thanks to the comprehensive data insights.",
		platform: "Indiegogo"
	},
	{
		name: "Yuki Tanaka",
		role: "Marketing Director",
		company: "Global Innovations",
		avatar: "YT",
		rating: 5,
		content: "The multi-platform support is fantastic. We can analyze campaigns across different regions and platforms seamlessly. Highly recommended!",
		platform: "Makuake"
	},
	{
		name: "Alex Johnson",
		role: "Research Lead",
		company: "Market Insights Co.",
		avatar: "AJ",
		rating: 5,
		content: "The Google Sheets integration is a game-changer. Our team can now collaborate on data analysis in real-time. Excellent platform!",
		platform: "Campfire"
	},
	{
		name: "Elena Petrov",
		role: "Strategy Consultant",
		company: "Digital Strategy Group",
		avatar: "EP",
		rating: 5,
		content: "The category analysis and trend insights have helped our clients launch more successful campaigns. The data quality is exceptional.",
		platform: "Wadiz"
	},
	{
		name: "David Kim",
		role: "Data Scientist",
		company: "Analytics Pro",
		avatar: "DK",
		rating: 5,
		content: "As a data scientist, I appreciate the clean, structured data format. The API integration and export capabilities are top-notch.",
		platform: "Zeczec"
	}
];

export function TestimonialsSection() {
	return (
		<section className='py-24 bg-gradient-to-br from-slate-50 to-blue-50/30'>
			<div className='container mx-auto px-6'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-slate-900'>
						Trusted by <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700'>Professionals</span>
					</h2>
					<p className='text-xl text-slate-600 max-w-3xl mx-auto'>
						Join thousands of professionals who rely on CrowdFund Pro for their crowdfunding research and analytics needs
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{testimonials.map((testimonial, index) => (
						<Card 
							key={index} 
							className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 group'
						>
							<CardContent className='p-8'>
								{/* Quote Icon */}
								<div className='flex justify-between items-start mb-6'>
									<Quote className='w-8 h-8 text-blue-500/30 group-hover:text-blue-500 transition-colors' />
									<div className='flex items-center space-x-1'>
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
										))}
									</div>
								</div>

								{/* Content */}
								<p className='text-slate-700 mb-6 leading-relaxed italic'>
									"{testimonial.content}"
								</p>

								{/* Platform Badge */}
								<div className='inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold rounded-full mb-6'>
									{testimonial.platform}
								</div>

								{/* Author */}
								<div className='flex items-center'>
									<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4'>
										{testimonial.avatar}
									</div>
									<div>
										<div className='font-semibold text-slate-900'>{testimonial.name}</div>
										<div className='text-sm text-slate-600'>{testimonial.role}</div>
										<div className='text-xs text-slate-500'>{testimonial.company}</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Trust Indicators */}
				<div className='mt-16 text-center'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center'>
						<div className='text-center'>
							<div className='text-3xl font-bold text-blue-600 mb-2'>98%</div>
							<div className='text-sm text-slate-600'>Customer Satisfaction</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-emerald-600 mb-2'>24/7</div>
							<div className='text-sm text-slate-600'>Platform Uptime</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-purple-600 mb-2'>99.9%</div>
							<div className='text-sm text-slate-600'>Data Accuracy</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-amber-600 mb-2'>50+</div>
							<div className='text-sm text-slate-600'>Countries Supported</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
} 