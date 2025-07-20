"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
	Users, 
	Search, 
	Database, 
	FileDown, 
	TrendingUp, 
	Target,
	BarChart3,
	Zap
} from "lucide-react";

interface Stats {
	totalUsers: number;
	totalSearches: number;
	totalScrapedData: number;
	totalSavedData: number;
	recentSearches: number;
	recentUsers: number;
	successRate: number;
	averageFunding: number;
	platforms: Array<{ name: string; count: number }>;
	categories: Array<{ name: string; count: number }>;
}

export function StatsSection() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch('/api/stats');
				const data = await response.json();
				if (data.success) {
					setStats(data.stats);
				}
			} catch (error) {
				console.error('Error fetching stats:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toLocaleString();
	};

	const formatCurrency = (amount: number) => {
		if (amount >= 1000000) {
			return '$' + (amount / 1000000).toFixed(1) + 'M';
		} else if (amount >= 1000) {
			return '$' + (amount / 1000).toFixed(1) + 'K';
		}
		return '$' + amount.toLocaleString();
	};

	if (loading) {
		return (
			<section className='py-24 bg-white/80 backdrop-blur-sm'>
				<div className='container mx-auto px-6'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold mb-6 text-slate-900'>
							Platform <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700'>Statistics</span>
						</h2>
						<p className='text-xl text-slate-600 max-w-3xl mx-auto'>
							Loading real-time statistics from our database...
						</p>
					</div>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
						{[1, 2, 3, 4].map((i) => (
							<Card key={i} className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft'>
								<CardContent className='p-6 text-center'>
									<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
										<div className='w-6 h-6 bg-white/20 rounded animate-pulse'></div>
									</div>
									<div className='h-8 bg-slate-200 rounded animate-pulse mb-2'></div>
									<div className='h-4 bg-slate-100 rounded animate-pulse'></div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (!stats) {
		return null;
	}

	return (
		<section className='py-24 bg-white/80 backdrop-blur-sm'>
			<div className='container mx-auto px-6'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6 text-slate-900'>
						Platform <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700'>Statistics</span>
					</h2>
					<p className='text-xl text-slate-600 max-w-3xl mx-auto'>
						Real-time data from our comprehensive crowdfunding analytics platform
					</p>
				</div>

				{/* Main Stats Grid */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'>
					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1'>
						<CardContent className='p-6 text-center'>
							<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
								<Users className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-slate-900 mb-2'>
								{formatNumber(stats.totalUsers)}
							</div>
							<div className='text-sm text-slate-600'>Active Users</div>
						</CardContent>
					</Card>

					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1'>
						<CardContent className='p-6 text-center'>
							<div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
								<Search className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-slate-900 mb-2'>
								{formatNumber(stats.totalSearches)}
							</div>
							<div className='text-sm text-slate-600'>Total Searches</div>
						</CardContent>
					</Card>

					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1'>
						<CardContent className='p-6 text-center'>
							<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
								<Database className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-slate-900 mb-2'>
								{formatNumber(stats.totalScrapedData)}
							</div>
							<div className='text-sm text-slate-600'>Projects Analyzed</div>
						</CardContent>
					</Card>

					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1'>
						<CardContent className='p-6 text-center'>
							<div className='w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
								<FileDown className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-slate-900 mb-2'>
								{formatNumber(stats.totalSavedData)}
							</div>
							<div className='text-sm text-slate-600'>Data Exports</div>
						</CardContent>
					</Card>
				</div>

				{/* Performance Metrics */}
				<div className='grid md:grid-cols-2 gap-8 mb-16'>
					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft'>
						<CardContent className='p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4'>
									<TrendingUp className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-2xl font-bold text-slate-900'>Success Rate</h3>
									<p className='text-slate-600'>Average project success</p>
								</div>
							</div>
							<div className='text-4xl font-bold text-blue-600 mb-2'>
								{stats.successRate}%
							</div>
							<div className='w-full bg-slate-200 rounded-full h-3 mb-4'>
								<div 
									className='bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000'
									style={{ width: `${stats.successRate}%` }}
								></div>
							</div>
							<p className='text-sm text-slate-600'>
								Based on {formatNumber(stats.totalScrapedData)} analyzed projects
							</p>
						</CardContent>
					</Card>

					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft'>
						<CardContent className='p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4'>
									<Target className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-2xl font-bold text-slate-900'>Average Funding</h3>
									<p className='text-slate-600'>Per successful project</p>
								</div>
							</div>
							<div className='text-4xl font-bold text-emerald-600 mb-2'>
								{formatCurrency(stats.averageFunding)}
							</div>
							<div className='flex items-center text-sm text-slate-600'>
								<Zap className='w-4 h-4 mr-2 text-amber-500' />
								Calculated from successful campaigns
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Platform & Category Distribution */}
				<div className='grid md:grid-cols-2 gap-8'>
					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft'>
						<CardContent className='p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4'>
									<BarChart3 className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-2xl font-bold text-slate-900'>Top Platforms</h3>
									<p className='text-slate-600'>Most analyzed platforms</p>
								</div>
							</div>
							<div className='space-y-4'>
								{stats.platforms.map((platform, index) => {
									const percentage = (platform.count / stats.totalScrapedData) * 100;
									return (
										<div key={platform.name} className='flex items-center justify-between'>
											<div className='flex items-center'>
												<span className='w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3'>
													{index + 1}
												</span>
												<span className='font-medium text-slate-900'>{platform.name}</span>
											</div>
											<div className='flex items-center'>
												<div className='w-24 bg-slate-200 rounded-full h-2 mr-3'>
													<div 
														className='bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000'
														style={{ width: `${percentage}%` }}
													></div>
												</div>
												<span className='text-sm font-medium text-slate-600 w-16 text-right'>
													{formatNumber(platform.count)}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>

					<Card className='bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft'>
						<CardContent className='p-8'>
							<div className='flex items-center mb-6'>
								<div className='w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mr-4'>
									<BarChart3 className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-2xl font-bold text-slate-900'>Top Categories</h3>
									<p className='text-slate-600'>Most popular categories</p>
								</div>
							</div>
							<div className='space-y-4'>
								{stats.categories.map((category, index) => {
									const percentage = (category.count / stats.totalScrapedData) * 100;
									return (
										<div key={category.name} className='flex items-center justify-between'>
											<div className='flex items-center'>
												<span className='w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3'>
													{index + 1}
												</span>
												<span className='font-medium text-slate-900'>{category.name}</span>
											</div>
											<div className='flex items-center'>
												<div className='w-24 bg-slate-200 rounded-full h-2 mr-3'>
													<div 
														className='bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000'
														style={{ width: `${percentage}%` }}
													></div>
												</div>
												<span className='text-sm font-medium text-slate-600 w-16 text-right'>
													{formatNumber(category.count)}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Recent Activity */}
				<div className='mt-16 text-center'>
					<Card className='bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-soft'>
						<CardContent className='p-8'>
							<h3 className='text-2xl font-bold text-slate-900 mb-4'>Recent Activity</h3>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
								<div className='text-center'>
									<div className='text-2xl font-bold text-blue-600 mb-1'>
										{formatNumber(stats.recentSearches)}
									</div>
									<div className='text-sm text-slate-600'>Searches This Week</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-emerald-600 mb-1'>
										{formatNumber(stats.recentUsers)}
									</div>
									<div className='text-sm text-slate-600'>New Users This Week</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-purple-600 mb-1'>
										{formatNumber(stats.totalScrapedData)}
									</div>
									<div className='text-sm text-slate-600'>Total Projects</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-amber-600 mb-1'>
										{formatNumber(stats.totalSavedData)}
									</div>
									<div className='text-sm text-slate-600'>Data Exports</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
} 