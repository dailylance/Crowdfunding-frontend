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
		<div className='space-y-8'>
			{/* Enhanced Welcome Header */}
			<div className='text-center space-y-6'>
				<div className='flex items-center justify-center gap-4'>
					<div className='p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl'>
						<Sparkles className='h-10 w-10 text-white' />
					</div>
					<div>
						<h1 className='text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
							Welcome Back
							{session?.user?.name
								? `, ${session.user.name.split(" ")[0]}`
								: ""}
							!
						</h1>
						<p className='text-xl text-gray-600 mt-2'>
							Ready to discover amazing crowdfunding opportunities?
						</p>
					</div>
				</div>

				{/* Enhanced Quick Actions */}
				<div className='flex justify-center gap-4'>
					<Link href='/dashboard/search'>
						<Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200'>
							<Search className='h-5 w-5 mr-2' />
							Start New Search
						</Button>
					</Link>
					<Link href='/dashboard/analytics'>
						<Button
							variant='outline'
							className='border-2 border-purple-300 text-purple-600 hover:border-purple-500 hover:bg-purple-50 font-semibold px-8 py-3 rounded-xl'>
							<BarChart3 className='h-5 w-5 mr-2' />
							View Analytics
						</Button>
					</Link>
				</div>
			</div>

			{/* Enhanced Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<Card className='shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-200'>
					<CardContent className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='p-3 bg-blue-500 rounded-xl'>
								<Search className='h-6 w-6 text-white' />
							</div>
							<div>
								<p className='text-sm font-medium text-blue-700'>
									Total Searches
								</p>
								<p className='text-3xl font-bold text-blue-900'>
									{stats.totalSearches}
								</p>
								<p className='text-xs text-blue-600'>All platforms</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-200'>
					<CardContent className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='p-3 bg-green-500 rounded-xl'>
								<Database className='h-6 w-6 text-white' />
							</div>
							<div>
								<p className='text-sm font-medium text-green-700'>
									Saved Projects
								</p>
								<p className='text-3xl font-bold text-green-900'>
									{stats.totalSaved}
								</p>
								<p className='text-xs text-green-600'>In database</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-200'>
					<CardContent className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='p-3 bg-purple-500 rounded-xl'>
								<TrendingUp className='h-6 w-6 text-white' />
							</div>
							<div>
								<p className='text-sm font-medium text-purple-700'>This Week</p>
								<p className='text-3xl font-bold text-purple-900'>
									{stats.thisWeek}
								</p>
								<p className='text-xs text-purple-600'>New searches</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-200'>
					<CardContent className='p-6'>
						<div className='flex items-center gap-4'>
							<div className='p-3 bg-orange-500 rounded-xl'>
								<FileDown className='h-6 w-6 text-white' />
							</div>
							<div>
								<p className='text-sm font-medium text-orange-700'>
									Total Exports
								</p>
								<p className='text-3xl font-bold text-orange-900'>
									{stats.totalExports}
								</p>
								<p className='text-xs text-orange-600'>To Google Sheets</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Recent Activity Section */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Recent Searches */}
				<Card className='shadow-lg border-0'>
					<CardHeader className='pb-4'>
						<CardTitle className='flex items-center gap-2 text-xl'>
							<Activity className='h-5 w-5 text-blue-600' />
							Recent Searches
						</CardTitle>
						<CardDescription>
							Your latest search activities across platforms
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{recentSearches.length === 0 ? (
								<div className='text-center py-8 text-gray-500'>
									<Search className='h-12 w-12 mx-auto mb-3 text-gray-300' />
									<p className='text-lg font-medium'>No searches yet</p>
									<p className='text-sm'>
										Start your first search to see activity here
									</p>
								</div>
							) : (
								recentSearches.map((search) => (
									<div
										key={search.id}
										className='flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200'>
										<div className='text-2xl'>
											{getPlatformIcon(search.platform)}
										</div>
										<div className='flex-1'>
											<div className='flex items-center gap-2'>
												<h4 className='font-semibold text-gray-900'>
													&ldquo;{search.keyword}&rdquo;
												</h4>
												<span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full'>
													{search.platform}
												</span>
											</div>
											<div className='flex items-center gap-4 text-sm text-gray-600 mt-1'>
												<span className='flex items-center gap-1'>
													<Target className='h-3 w-3' />
													{search.results} results
												</span>
												<span className='flex items-center gap-1'>
													<Clock className='h-3 w-3' />
													{formatDate(search.createdAt)}
												</span>
											</div>
										</div>
									</div>
								))
							)}
						</div>

						{recentSearches.length > 0 && (
							<div className='mt-6'>
								<Link href='/dashboard/search'>
									<Button
										variant='outline'
										className='w-full border-2 border-blue-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50'>
										<Plus className='h-4 w-4 mr-2' />
										Start New Search
									</Button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Saved Data */}
				<Card className='shadow-lg border-0'>
					<CardHeader className='pb-4'>
						<CardTitle className='flex items-center gap-2 text-xl'>
							<Database className='h-5 w-5 text-green-600' />
							Saved Projects
						</CardTitle>
						<CardDescription>
							Your collection of saved crowdfunding data
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{savedData.length === 0 ? (
								<div className='text-center py-8 text-gray-500'>
									<Database className='h-12 w-12 mx-auto mb-3 text-gray-300' />
									<p className='text-lg font-medium'>No saved projects</p>
									<p className='text-sm'>
										Save interesting projects from your searches
									</p>
								</div>
							) : (
								savedData.map((data) => (
									<div
										key={data.id}
										className='flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200'>
										<div className='text-2xl'>
											{getPlatformIcon(data.platform)}
										</div>
										<div className='flex-1'>
											<h4 className='font-semibold text-gray-900'>
												{data.title}
											</h4>
											<div className='flex items-center gap-4 text-sm text-gray-600 mt-1'>
												<span className='flex items-center gap-1'>
													<Globe className='h-3 w-3' />
													{data.platform}
												</span>
												<span className='flex items-center gap-1'>
													<Calendar className='h-3 w-3' />
													{formatDate(data.createdAt)}
												</span>
											</div>
										</div>
										<ArrowRight className='h-5 w-5 text-gray-400' />
									</div>
								))
							)}
						</div>

						{savedData.length > 0 && (
							<div className='mt-6'>
								<Link href='/dashboard/saved-data'>
									<Button
										variant='outline'
										className='w-full border-2 border-green-300 text-green-600 hover:border-green-500 hover:bg-green-50'>
										<Database className='h-4 w-4 mr-2' />
										View All Saved Data
									</Button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Quick Actions Grid */}
			<Card className='shadow-lg border-0 bg-gradient-to-r from-white to-gray-50'>
				<CardHeader className='pb-4'>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Zap className='h-5 w-5 text-purple-600' />
						Quick Actions
					</CardTitle>
					<CardDescription>
						Get started with these powerful features
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Link href='/dashboard/search'>
							<div className='p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer group'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors'>
										<Search className='h-6 w-6 text-white' />
									</div>
									<h3 className='text-lg font-semibold text-blue-900'>
										Advanced Search
									</h3>
								</div>
								<p className='text-blue-700 text-sm mb-4'>
									Search across multiple crowdfunding platforms with AI-powered
									OCR enhancement
								</p>
								<div className='flex items-center text-blue-600 font-medium'>
									<span>Start Searching</span>
									<ArrowRight className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform' />
								</div>
							</div>
						</Link>

						<Link href='/dashboard/analytics'>
							<div className='p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200 cursor-pointer group'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='p-3 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors'>
										<BarChart3 className='h-6 w-6 text-white' />
									</div>
									<h3 className='text-lg font-semibold text-green-900'>
										Analytics Dashboard
									</h3>
								</div>
								<p className='text-green-700 text-sm mb-4'>
									View detailed insights and performance metrics of your
									research activities
								</p>
								<div className='flex items-center text-green-600 font-medium'>
									<span>View Analytics</span>
									<ArrowRight className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform' />
								</div>
							</div>
						</Link>

						<Link href='/dashboard/saved-data'>
							<div className='p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-200 cursor-pointer group'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='p-3 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors'>
										<Database className='h-6 w-6 text-white' />
									</div>
									<h3 className='text-lg font-semibold text-purple-900'>
										Manage Data
									</h3>
								</div>
								<p className='text-purple-700 text-sm mb-4'>
									Review, export, and manage your collection of saved
									crowdfunding projects
								</p>
								<div className='flex items-center text-purple-600 font-medium'>
									<span>Manage Projects</span>
									<ArrowRight className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform' />
								</div>
							</div>
						</Link>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Tips & Features */}
			<Card className='shadow-lg border-0 bg-gradient-to-r from-amber-50 to-orange-50'>
				<CardHeader className='pb-4'>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Star className='h-5 w-5 text-amber-600' />
						Pro Tips & Features
					</CardTitle>
					<CardDescription>
						Make the most of your crowdfunding research
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='flex items-start gap-4'>
							<div className='p-2 bg-amber-100 rounded-lg'>
								<Zap className='h-5 w-5 text-amber-600' />
							</div>
							<div>
								<h4 className='font-semibold text-amber-900 mb-1'>
									OCR Enhancement
								</h4>
								<p className='text-amber-700 text-sm'>
									Enable OCR to extract text from images and get more
									comprehensive search results
								</p>
							</div>
						</div>

						<div className='flex items-start gap-4'>
							<div className='p-2 bg-amber-100 rounded-lg'>
								<Target className='h-5 w-5 text-amber-600' />
							</div>
							<div>
								<h4 className='font-semibold text-amber-900 mb-1'>
									Smart Filtering
								</h4>
								<p className='text-amber-700 text-sm'>
									Use category filters and platform selection to narrow down
									your search results
								</p>
							</div>
						</div>

						<div className='flex items-start gap-4'>
							<div className='p-2 bg-amber-100 rounded-lg'>
								<CheckCircle className='h-5 w-5 text-amber-600' />
							</div>
							<div>
								<h4 className='font-semibold text-amber-900 mb-1'>
									Export to Sheets
								</h4>
								<p className='text-amber-700 text-sm'>
									Seamlessly export your findings to Google Sheets for further
									analysis and sharing
								</p>
							</div>
						</div>

						<div className='flex items-start gap-4'>
							<div className='p-2 bg-amber-100 rounded-lg'>
								<Award className='h-5 w-5 text-amber-600' />
							</div>
							<div>
								<h4 className='font-semibold text-amber-900 mb-1'>
									Success Tracking
								</h4>
								<p className='text-amber-700 text-sm'>
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
