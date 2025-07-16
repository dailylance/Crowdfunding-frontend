"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Search,
	Database,
	TrendingUp,
	Calendar,
	FileDown,
	Plus,
	Activity,
	BarChart3,
	Zap,
	Target,
	Globe,
	Star,
	ArrowRight,
	Sparkles,
	Clock,
	CheckCircle,
	Award,
} from "lucide-react";

interface RecentSearch {
	id: string;
	platform: string;
	keyword: string;
	category?: string;
	results: number;
	createdAt: string;
}

interface SavedData {
	id: string;
	title: string;
	platform: string;
	createdAt: string;
}

export function DashboardHome() {
	const { data: session } = useSession();
	const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
	const [savedData, setSavedData] = useState<SavedData[]>([]);
	const [stats, setStats] = useState({
		totalSearches: 0,
		totalSaved: 0,
		thisWeek: 0,
		totalExports: 0,
	});

	useEffect(() => {
		// Fetch dashboard data
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		try {
			// Simulate API calls - replace with actual API endpoints
			const mockRecentSearches: RecentSearch[] = [
				{
					id: "1",
					platform: "Indiegogo",
					keyword: "smartwatch",
					category: "Technology",
					results: 25,
					createdAt: "2024-01-15T10:30:00Z",
				},
				{
					id: "2",
					platform: "Kickstarter",
					keyword: "gaming",
					category: "Games",
					results: 18,
					createdAt: "2024-01-14T15:45:00Z",
				},
				{
					id: "3",
					platform: "Makuake",
					keyword: "eco-friendly",
					results: 12,
					createdAt: "2024-01-13T09:20:00Z",
				},
			];

			const mockSavedData: SavedData[] = [
				{
					id: "1",
					title: "Gaming Controllers - Kickstarter Analysis",
					platform: "Kickstarter",
					createdAt: "2024-01-15T14:22:00Z",
				},
				{
					id: "2",
					title: "Smart Home Devices - Indiegogo Research",
					platform: "Indiegogo",
					createdAt: "2024-01-14T11:35:00Z",
				},
			];

			setRecentSearches(mockRecentSearches);
			setSavedData(mockSavedData);
			setStats({
				totalSearches: 47,
				totalSaved: 12,
				thisWeek: 8,
				totalExports: 23,
			});
		} catch (error) {
			console.error("Error fetching dashboard data:", error);
		}
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
				return "Invalid date";
			}
			return date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		} catch (error) {
			console.error("Error formatting date:", error);
			return "Invalid date";
		}
	};

	const getPlatformIcon = (platform: string) => {
		const icons: { [key: string]: string } = {
			indiegogo: "🚀",
			kickstarter: "💡",
			makuake: "🎌",
			wadiz: "🇰🇷",
			campfire: "🔥",
			flyingv: "✈️",
		};
		return icons[platform.toLowerCase()] || "🌟";
	};

	return (
		<div className='space-y-10 w-full max-w-none'>
			{/* Enhanced Welcome Header */}
			<div className='text-center space-y-8 py-8'>
				<div className='flex items-center justify-center gap-6'>
					<div className='p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl'>
						<Sparkles className='h-12 w-12 text-white' />
					</div>
					<div>
						<h1 className='text-6xl md:text-7xl font-bold text-gray-900 leading-tight'>
							Welcome Back
							{session?.user?.name
								? `, ${session.user.name.split(" ")[0]}`
								: ""}
							!
						</h1>
						<p className='text-2xl text-gray-600 mt-4 font-light'>
							Ready to discover amazing crowdfunding opportunities?
						</p>
					</div>
				</div>

				{/* Enhanced Quick Actions */}
				<div className='flex justify-center gap-6'>
					<Link href='/dashboard/search'>
						<Button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-lg'>
							<Search className='h-6 w-6 mr-3' />
							Start New Search
						</Button>
					</Link>
					<Link href='/dashboard/analytics'>
						<Button
							variant='outline'
							className='border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-semibold px-10 py-4 rounded-xl transition-all duration-200 text-lg'>
							<BarChart3 className='h-6 w-6 mr-3' />
							View Analytics
						</Button>
					</Link>
				</div>
			</div>

			{/* Enhanced Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
				<Card className='shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
					<CardContent className='p-8'>
						<div className='flex items-center gap-6'>
							<div className='p-4 bg-blue-600 rounded-2xl shadow-lg'>
								<Search className='h-8 w-8 text-white' />
							</div>
							<div>
								<p className='text-sm font-bold text-blue-700 uppercase tracking-wide'>
									Total Searches
								</p>
								<p className='text-4xl font-bold text-blue-900 mt-2'>
									{stats.totalSearches}
								</p>
								<p className='text-sm text-blue-600 mt-1'>All platforms</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
					<CardContent className='p-8'>
						<div className='flex items-center gap-6'>
							<div className='p-4 bg-green-600 rounded-2xl shadow-lg'>
								<Database className='h-8 w-8 text-white' />
							</div>
							<div>
								<p className='text-sm font-bold text-green-700 uppercase tracking-wide'>
									Saved Projects
								</p>
								<p className='text-4xl font-bold text-green-900 mt-2'>
									{stats.totalSaved}
								</p>
								<p className='text-sm text-green-600 mt-1'>In database</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
					<CardContent className='p-8'>
						<div className='flex items-center gap-6'>
							<div className='p-4 bg-purple-600 rounded-2xl shadow-lg'>
								<TrendingUp className='h-8 w-8 text-white' />
							</div>
							<div>
								<p className='text-sm font-bold text-purple-700 uppercase tracking-wide'>
									This Week
								</p>
								<p className='text-4xl font-bold text-purple-900 mt-2'>
									{stats.thisWeek}
								</p>
								<p className='text-sm text-purple-600 mt-1'>New searches</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
					<CardContent className='p-8'>
						<div className='flex items-center gap-6'>
							<div className='p-4 bg-orange-600 rounded-2xl shadow-lg'>
								<FileDown className='h-8 w-8 text-white' />
							</div>
							<div>
								<p className='text-sm font-bold text-orange-700 uppercase tracking-wide'>
									Total Exports
								</p>
								<p className='text-4xl font-bold text-orange-900 mt-2'>
									{stats.totalExports}
								</p>
								<p className='text-sm text-orange-600 mt-1'>To Google Sheets</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Recent Activity Section */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
				{/* Recent Searches */}
				<Card className='shadow-xl border-0 bg-white'>
					<CardHeader className='pb-6'>
						<CardTitle className='flex items-center gap-3 text-2xl font-bold text-gray-900'>
							<Activity className='h-6 w-6 text-blue-600' />
							Recent Searches
						</CardTitle>
						<CardDescription className='text-lg text-gray-600'>
							Your latest search activities across platforms
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-6'>
							{recentSearches.length === 0 ? (
								<div className='text-center py-12 text-gray-500'>
									<Search className='h-16 w-16 mx-auto mb-4 text-gray-300' />
									<p className='text-xl font-semibold'>No searches yet</p>
									<p className='text-base'>
										Start your first search to see activity here
									</p>
								</div>
							) : (
								recentSearches.map((search) => (
									<div
										key={search.id}
										className='flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200 hover:bg-white'>
										<div className='text-3xl'>
											{getPlatformIcon(search.platform)}
										</div>
										<div className='flex-1'>
											<div className='flex items-center gap-3'>
												<h4 className='font-bold text-gray-900 text-lg'>
													&ldquo;{search.keyword}&rdquo;
												</h4>
												<span className='text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium'>
													{search.platform}
												</span>
											</div>
											<div className='flex items-center gap-6 text-gray-600 mt-2'>
												<span className='flex items-center gap-2'>
													<Target className='h-4 w-4' />
													{search.results} results
												</span>
												<span className='flex items-center gap-2'>
													<Clock className='h-4 w-4' />
													{formatDate(search.createdAt)}
												</span>
											</div>
										</div>
									</div>
								))
							)}
						</div>

						{recentSearches.length > 0 && (
							<div className='mt-8'>
								<Link href='/dashboard/search'>
									<Button
										variant='outline'
										className='w-full border-2 border-blue-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50 py-3 text-lg font-semibold'>
										<Plus className='h-5 w-5 mr-2' />
										Start New Search
									</Button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Saved Data */}
				<Card className='shadow-xl border-0 bg-white'>
					<CardHeader className='pb-6'>
						<CardTitle className='flex items-center gap-3 text-2xl font-bold text-gray-900'>
							<Database className='h-6 w-6 text-green-600' />
							Saved Projects
						</CardTitle>
						<CardDescription className='text-lg text-gray-600'>
							Your collection of saved crowdfunding data
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-6'>
							{savedData.length === 0 ? (
								<div className='text-center py-12 text-gray-500'>
									<Database className='h-16 w-16 mx-auto mb-4 text-gray-300' />
									<p className='text-xl font-semibold'>No saved projects</p>
									<p className='text-base'>
										Save interesting projects from your searches
									</p>
								</div>
							) : (
								savedData.map((data) => (
									<div
										key={data.id}
										className='flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200 hover:bg-white cursor-pointer'>
										<div className='text-3xl'>
											{getPlatformIcon(data.platform)}
										</div>
										<div className='flex-1'>
											<h4 className='font-bold text-gray-900 text-lg'>
												{data.title}
											</h4>
											<div className='flex items-center gap-6 text-gray-600 mt-2'>
												<span className='flex items-center gap-2'>
													<Globe className='h-4 w-4' />
													{data.platform}
												</span>
												<span className='flex items-center gap-2'>
													<Calendar className='h-4 w-4' />
													{formatDate(data.createdAt)}
												</span>
											</div>
										</div>
										<ArrowRight className='h-6 w-6 text-gray-400' />
									</div>
								))
							)}
						</div>

						{savedData.length > 0 && (
							<div className='mt-8'>
								<Link href='/dashboard/saved-data'>
									<Button
										variant='outline'
										className='w-full border-2 border-green-300 text-green-600 hover:border-green-500 hover:bg-green-50 py-3 text-lg font-semibold'>
										<Database className='h-5 w-5 mr-2' />
										View All Saved Data
									</Button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Quick Actions Grid */}
			<Card className='shadow-xl border-0 bg-white'>
				<CardHeader className='pb-6'>
					<CardTitle className='flex items-center gap-3 text-2xl font-bold text-gray-900'>
						<Zap className='h-6 w-6 text-purple-600' />
						Quick Actions
					</CardTitle>
					<CardDescription className='text-lg text-gray-600'>
						Get started with these powerful features
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Link href='/dashboard/search'>
							<div className='p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2'>
								<div className='flex items-center gap-4 mb-6'>
									<div className='p-4 bg-blue-600 rounded-2xl group-hover:bg-blue-700 transition-colors shadow-lg'>
										<Search className='h-8 w-8 text-white' />
									</div>
									<h3 className='text-2xl font-bold text-blue-900'>
										Advanced Search
									</h3>
								</div>
								<p className='text-blue-700 text-lg mb-6 leading-relaxed'>
									Search across multiple crowdfunding platforms with AI-powered
									OCR enhancement
								</p>
								<div className='flex items-center text-blue-600 font-bold text-lg'>
									<span>Start Searching</span>
									<ArrowRight className='h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform' />
								</div>
							</div>
						</Link>

						<Link href='/dashboard/analytics'>
							<div className='p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2'>
								<div className='flex items-center gap-4 mb-6'>
									<div className='p-4 bg-green-600 rounded-2xl group-hover:bg-green-700 transition-colors shadow-lg'>
										<BarChart3 className='h-8 w-8 text-white' />
									</div>
									<h3 className='text-2xl font-bold text-green-900'>
										Analytics Dashboard
									</h3>
								</div>
								<p className='text-green-700 text-lg mb-6 leading-relaxed'>
									View detailed insights and performance metrics of your
									research activities
								</p>
								<div className='flex items-center text-green-600 font-bold text-lg'>
									<span>View Analytics</span>
									<ArrowRight className='h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform' />
								</div>
							</div>
						</Link>

						<Link href='/dashboard/saved-data'>
							<div className='p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2'>
								<div className='flex items-center gap-4 mb-6'>
									<div className='p-4 bg-purple-600 rounded-2xl group-hover:bg-purple-700 transition-colors shadow-lg'>
										<Database className='h-8 w-8 text-white' />
									</div>
									<h3 className='text-2xl font-bold text-purple-900'>
										Manage Data
									</h3>
								</div>
								<p className='text-purple-700 text-lg mb-6 leading-relaxed'>
									Review, export, and manage your collection of saved
									crowdfunding projects
								</p>
								<div className='flex items-center text-purple-600 font-bold text-lg'>
									<span>Manage Projects</span>
									<ArrowRight className='h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform' />
								</div>
							</div>
						</Link>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Tips & Features */}
			<Card className='shadow-xl border-0 bg-gradient-to-br from-amber-50 to-orange-50'>
				<CardHeader className='pb-6'>
					<CardTitle className='flex items-center gap-3 text-2xl font-bold text-gray-900'>
						<Star className='h-6 w-6 text-amber-600' />
						Pro Tips & Features
					</CardTitle>
					<CardDescription className='text-lg text-gray-600'>
						Make the most of your crowdfunding research
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='flex items-start gap-6'>
							<div className='p-3 bg-amber-100 rounded-2xl'>
								<Zap className='h-6 w-6 text-amber-600' />
							</div>
							<div>
								<h4 className='font-bold text-amber-900 mb-2 text-lg'>
									OCR Enhancement
								</h4>
								<p className='text-amber-700 text-base leading-relaxed'>
									Enable OCR to extract text from images and get more
									comprehensive search results
								</p>
							</div>
						</div>

						<div className='flex items-start gap-6'>
							<div className='p-3 bg-amber-100 rounded-2xl'>
								<Target className='h-6 w-6 text-amber-600' />
							</div>
							<div>
								<h4 className='font-bold text-amber-900 mb-2 text-lg'>
									Smart Filtering
								</h4>
								<p className='text-amber-700 text-base leading-relaxed'>
									Use category filters and platform selection to narrow down
									your search results
								</p>
							</div>
						</div>

						<div className='flex items-start gap-6'>
							<div className='p-3 bg-amber-100 rounded-2xl'>
								<CheckCircle className='h-6 w-6 text-amber-600' />
							</div>
							<div>
								<h4 className='font-bold text-amber-900 mb-2 text-lg'>
									Export to Sheets
								</h4>
								<p className='text-amber-700 text-base leading-relaxed'>
									Seamlessly export your findings to Google Sheets for further
									analysis and sharing
								</p>
							</div>
						</div>

						<div className='flex items-start gap-6'>
							<div className='p-3 bg-amber-100 rounded-2xl'>
								<Award className='h-6 w-6 text-amber-600' />
							</div>
							<div>
								<h4 className='font-bold text-amber-900 mb-2 text-lg'>
									Success Tracking
								</h4>
								<p className='text-amber-700 text-base leading-relaxed'>
									Monitor project success rates and funding patterns to identify
									trending opportunities
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
