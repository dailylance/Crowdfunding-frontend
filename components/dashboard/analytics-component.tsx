"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BarChart3,
	Calendar,
	Target,
	Award,
	DollarSign,
	Activity,
	Zap,
	Globe,
	Star,
	ArrowUp,
	Sparkles,
} from "lucide-react";

interface AnalyticsData {
	totalSearches: number;
	totalSaved: number;
	successfulProjects: number;
	averageFunding: string;
	platformStats: { platform: string; count: number; percentage: number }[];
	weeklySearches: { date: string; count: number }[];
	categoryStats: { category: string; count: number; success_rate: number }[];
}

export function AnalyticsComponent() {
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
		totalSearches: 0,
		totalSaved: 0,
		successfulProjects: 0,
		averageFunding: "$0",
		platformStats: [],
		weeklySearches: [],
		categoryStats: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [selectedTimeframe, setSelectedTimeframe] = useState("7days");

	useEffect(() => {
		fetchAnalyticsData();
	}, [selectedTimeframe]);

	const fetchAnalyticsData = async () => {
		try {
			setIsLoading(true);
			// Simulate API call with mock data
			const mockData: AnalyticsData = {
				totalSearches: 47,
				totalSaved: 12,
				successfulProjects: 8,
				averageFunding: "$85,420",
				platformStats: [
					{ platform: "Indiegogo", count: 18, percentage: 38.3 },
					{ platform: "Kickstarter", count: 15, percentage: 31.9 },
					{ platform: "Makuake", count: 8, percentage: 17.0 },
					{ platform: "Wadiz", count: 4, percentage: 8.5 },
					{ platform: "Others", count: 2, percentage: 4.3 },
				],
				weeklySearches: [
					{ date: "Jan 8", count: 3 },
					{ date: "Jan 9", count: 7 },
					{ date: "Jan 10", count: 5 },
					{ date: "Jan 11", count: 8 },
					{ date: "Jan 12", count: 6 },
					{ date: "Jan 13", count: 9 },
					{ date: "Jan 14", count: 4 },
				],
				categoryStats: [
					{ category: "Technology", count: 15, success_rate: 73.3 },
					{ category: "Design", count: 12, success_rate: 66.7 },
					{ category: "Innovation", count: 8, success_rate: 87.5 },
					{ category: "Games", count: 6, success_rate: 50.0 },
					{ category: "Fashion", count: 4, success_rate: 75.0 },
					{ category: "Health", count: 2, success_rate: 100.0 },
				],
			};
			await new Promise(resolve => setTimeout(resolve, 1000));
			setAnalyticsData(mockData);
		} catch (error) {
			console.error("Error fetching analytics data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="text-center space-y-4">
					<div className="relative">
						<div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
						<Sparkles className="h-6 w-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Loading Analytics</h3>
						<p className="text-gray-600">Gathering your performance data...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="text-center space-y-4">
				<div className="flex items-center justify-center gap-3">
					<div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
						<BarChart3 className="h-8 w-8 text-white" />
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Analytics Dashboard
						</h1>
						<p className="text-lg text-gray-600 mt-2">
							Comprehensive insights and performance metrics
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center gap-4">
					<Calendar className="h-5 w-5 text-gray-500" />
					<select
						value={selectedTimeframe}
						onChange={(e) => setSelectedTimeframe(e.target.value)}
						className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-gradient-to-r from-white to-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
					>
						<option value="7days">📅 Last 7 Days</option>
						<option value="30days">📊 Last 30 Days</option>
						<option value="90days">📈 Last 90 Days</option>
					</select>
				</div>
			</div>

			{/* Enhanced Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-200">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="p-2 bg-blue-500 rounded-lg">
								<BarChart3 className="h-5 w-5 text-white" />
							</div>
							<div className="flex items-center text-green-600 text-sm font-medium">
								<ArrowUp className="h-4 w-4 mr-1" />
								+12%
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-sm font-medium text-blue-700">Total Searches</p>
							<p className="text-3xl font-bold text-blue-900">{analyticsData.totalSearches}</p>
							<p className="text-xs text-blue-600">Across all platforms</p>
						</div>
					</CardContent>
				</Card>

				<Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-200">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="p-2 bg-green-500 rounded-lg">
								<DollarSign className="h-5 w-5 text-white" />
							</div>
							<div className="flex items-center text-green-600 text-sm font-medium">
								<ArrowUp className="h-4 w-4 mr-1" />
								+8%
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-sm font-medium text-green-700">Average Funding</p>
							<p className="text-3xl font-bold text-green-900">{analyticsData.averageFunding}</p>
							<p className="text-xs text-green-600">Per successful project</p>
						</div>
					</CardContent>
				</Card>

				<Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-200">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="p-2 bg-purple-500 rounded-lg">
								<Target className="h-5 w-5 text-white" />
							</div>
							<div className="flex items-center text-green-600 text-sm font-medium">
								<ArrowUp className="h-4 w-4 mr-1" />
								+15%
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-sm font-medium text-purple-700">Saved Projects</p>
							<p className="text-3xl font-bold text-purple-900">{analyticsData.totalSaved}</p>
							<p className="text-xs text-purple-600">In your database</p>
						</div>
					</CardContent>
				</Card>

				<Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-200">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="p-2 bg-orange-500 rounded-lg">
								<Award className="h-5 w-5 text-white" />
							</div>
							<div className="flex items-center text-green-600 text-sm font-medium">
								<ArrowUp className="h-4 w-4 mr-1" />
								+5%
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-sm font-medium text-orange-700">Success Rate</p>
							<p className="text-3xl font-bold text-orange-900">
								{Math.round((analyticsData.successfulProjects / analyticsData.totalSaved) * 100)}%
							</p>
							<p className="text-xs text-orange-600">Projects funded</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Weekly Search Trends */}
				<Card className="shadow-lg border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl">
							<Activity className="h-5 w-5 text-blue-600" />
							Weekly Search Activity
						</CardTitle>
						<CardDescription>
							Your search patterns over the last 7 days
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{analyticsData.weeklySearches.map((day, index) => {
								const maxCount = Math.max(...analyticsData.weeklySearches.map(d => d.count));
								const percentage = (day.count / maxCount) * 100;
								
								return (
									<div key={index} className="flex items-center gap-4">
										<div className="w-16 text-sm font-medium text-gray-600">{day.date}</div>
										<div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
												style={{ width: `${percentage}%` }}
											/>
										</div>
										<div className="w-8 text-sm font-bold text-gray-900">{day.count}</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>

				{/* Platform Distribution */}
				<Card className="shadow-lg border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl">
							<Globe className="h-5 w-5 text-green-600" />
							Platform Distribution
						</CardTitle>
						<CardDescription>
							Search distribution across crowdfunding platforms
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{analyticsData.platformStats.map((platform, index) => {
								const colors = [
									'from-blue-500 to-blue-600',
									'from-green-500 to-green-600',
									'from-purple-500 to-purple-600',
									'from-orange-500 to-orange-600',
									'from-pink-500 to-pink-600',
								];
								
								return (
									<div key={index} className="flex items-center gap-4">
										<div className="w-20 text-sm font-medium text-gray-900">{platform.platform}</div>
										<div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
											<div
												className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full transition-all duration-300`}
												style={{ width: `${platform.percentage}%` }}
											/>
										</div>
										<div className="w-12 text-sm font-bold text-gray-900">{platform.count}</div>
										<div className="w-12 text-xs text-gray-600">{platform.percentage.toFixed(1)}%</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Category Performance */}
			<Card className="shadow-lg border-0">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-xl">
						<Star className="h-5 w-5 text-yellow-500" />
						Category Performance
					</CardTitle>
					<CardDescription>
						Success rates and search volume by category
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{analyticsData.categoryStats.map((category, index) => {
							const getSuccessColor = (rate: number) => {
								if (rate >= 80) return 'from-green-500 to-green-600';
								if (rate >= 60) return 'from-yellow-500 to-yellow-600';
								return 'from-red-500 to-red-600';
							};

							const getSuccessTextColor = (rate: number) => {
								if (rate >= 80) return 'text-green-700';
								if (rate >= 60) return 'text-yellow-700';
								return 'text-red-700';
							};

							return (
								<div 
									key={index} 
									className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
								>
									<div className="flex justify-between items-start mb-3">
										<h3 className="font-semibold text-gray-900">{category.category}</h3>
										<span className="text-2xl">
											{category.category === 'Technology' && '💻'}
											{category.category === 'Design' && '🎨'}
											{category.category === 'Innovation' && '⚡'}
											{category.category === 'Games' && '🎮'}
											{category.category === 'Fashion' && '👗'}
											{category.category === 'Health' && '💪'}
										</span>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">Searches</span>
											<span className="font-bold text-gray-900">{category.count}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">Success Rate</span>
											<span className={`font-bold ${getSuccessTextColor(category.success_rate)}`}>
												{category.success_rate}%
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className={`h-full bg-gradient-to-r ${getSuccessColor(category.success_rate)} rounded-full transition-all duration-300`}
												style={{ width: `${category.success_rate}%` }}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Recent Activity */}
			<Card className="shadow-lg border-0">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-xl">
						<Zap className="h-5 w-5 text-purple-600" />
						Recent Activity
					</CardTitle>
					<CardDescription>
						Latest search activities and achievements
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[
							{ action: "Searched for 'smart home devices' on Kickstarter", time: "2 hours ago", type: "search" },
							{ action: "Saved project 'Eco-Friendly Water Bottle'", time: "4 hours ago", type: "save" },
							{ action: "Exported data to Google Sheets", time: "6 hours ago", type: "export" },
							{ action: "Discovered trending project in Technology", time: "1 day ago", type: "discovery" },
						].map((activity, index) => (
							<div 
								key={index} 
								className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100"
							>
								<div className={`p-2 rounded-lg ${
									activity.type === 'search' ? 'bg-blue-100' :
									activity.type === 'save' ? 'bg-green-100' :
									activity.type === 'export' ? 'bg-purple-100' :
									'bg-orange-100'
								}`}>
									{activity.type === 'search' && <BarChart3 className="h-4 w-4 text-blue-600" />}
									{activity.type === 'save' && <Target className="h-4 w-4 text-green-600" />}
									{activity.type === 'export' && <DollarSign className="h-4 w-4 text-purple-600" />}
									{activity.type === 'discovery' && <Star className="h-4 w-4 text-orange-600" />}
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium text-gray-900">{activity.action}</p>
									<p className="text-xs text-gray-500">{activity.time}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
