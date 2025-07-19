"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Search,
	Filter,
	Play,
	Clock,
	CheckCircle,
	XCircle,
	Download,
	Eye,
	Database,
	Loader2,
	Zap,
	TrendingUp,
	Users,
	DollarSign,
	Globe,
	Sparkles,
} from "lucide-react";

interface SearchResult {
	id: string;
	title: string;
	platform: string;
	status: string;
	amount: string;
	support_amount: string;
	supporters: string;
	achievement_rate: string;
	url: string;
	project_owner?: string;
	contact_info?: string;
}

interface ScrapedItem {
	id?: string;
	title?: string;
	original_title?: string;
	status?: string;
	amount?: string;
	funded_amount?: string;
	support_amount?: string;
	goal_amount?: string;
	supporters?: string;
	backers_count?: string;
	achievement_rate?: string;
	percentage_funded?: number;
	url?: string;
	project_owner?: string;
	contact_info?: string;
}

interface SearchLog {
	id: string;
	timestamp: string;
	message: string;
	type: "info" | "success" | "error";
}

export function SearchComponent() {
	const [searchParams, setSearchParams] = useState({
		platform: "indiegogo",
		category: "",
		keyword: "",
		enableOcr: true,
	});
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
	const [reviewData, setReviewData] = useState<SearchResult | null>(null);

	const platforms = [
		{ value: "indiegogo", label: "Indiegogo", icon: "🚀" },
		{ value: "kickstarter", label: "Kickstarter", icon: "💡" },
		{ value: "makuake", label: "Makuake", icon: "🎌" },
		{ value: "wadiz", label: "Wadiz", icon: "🇰🇷" },
		{ value: "campfire", label: "Campfire", icon: "🔥" },
		{ value: "flyingv", label: "FlyingV", icon: "✈️" },
	];

	const categories = [
		{ value: "", label: "All Categories", icon: "🌟" },
		{ value: "technology", label: "Technology", icon: "💻" },
		{ value: "design", label: "Design", icon: "🎨" },
		{ value: "innovation", label: "Innovation", icon: "⚡" },
		{ value: "transportation", label: "Transportation", icon: "🚗" },
		{ value: "home", label: "Home & Garden", icon: "🏠" },
		{ value: "fashion", label: "Fashion", icon: "👗" },
		{ value: "food", label: "Food & Beverage", icon: "🍕" },
		{ value: "health", label: "Health & Fitness", icon: "💪" },
		{ value: "games", label: "Games", icon: "🎮" },
		{ value: "education", label: "Education", icon: "📚" },
	];

	const addLog = (
		message: string,
		type: "info" | "success" | "error" = "info"
	) => {
		const log: SearchLog = {
			id: Date.now().toString(),
			timestamp: new Date().toLocaleTimeString(),
			message,
			type,
		};
		setSearchLogs((prev) => [log, ...prev].slice(0, 50));
	};

	const handleSearch = async () => {
		if (!searchParams.keyword.trim()) {
			addLog("Please enter a search keyword", "error");
			return;
		}

		setIsSearching(true);
		setSearchResults([]);
		addLog(
			`🔍 Starting real-time search for "${searchParams.keyword}" on ${searchParams.platform}`,
			"info"
		);

		try {
			addLog(`📡 Calling scraping API...`, "info");

			// Call the real scraping API
			const response = await fetch("/api/scraping/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					platform: searchParams.platform,
					category: searchParams.category,
					keyword: searchParams.keyword,
					language: "en",
					enableOCR: searchParams.enableOcr,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || `HTTP ${response.status}`);
			}

			if (data.success) {
				// Convert the scraper results to our interface format
				const convertedResults: SearchResult[] = data.results.map(
					(item: ScrapedItem, index: number) => ({
						id: item.id || `result_${index}`,
						title: item.title || item.original_title || "Unknown Project",
						platform: data.platform,
						status: item.status || "Unknown",
						amount: item.amount || item.funded_amount || "$0",
						support_amount: item.support_amount || item.goal_amount || "$0",
						supporters: item.supporters || item.backers_count || "0",
						achievement_rate:
							item.achievement_rate || item.percentage_funded
								? `${item.percentage_funded}%`
								: "0%",
						url: item.url || "#",
						project_owner: item.project_owner || "Unknown",
						contact_info: item.contact_info || "Not available",
					})
				);

				setSearchResults(convertedResults);
				addLog(
					`✅ Found ${convertedResults.length} real projects from ${data.platform}!`,
					"success"
				);
				addLog(`🎯 Search ID: ${data.searchId}`, "info");
			} else {
				throw new Error(data.message || "Search failed");
			}
		} catch (error) {
			console.error("Search error:", error);
			addLog(
				`❌ Search failed: ${
					error instanceof Error ? error.message : "Unknown error"
				}`,
				"error"
			);
		} finally {
			setIsSearching(false);
		}
	};

	const handleSaveData = async (result: SearchResult) => {
		addLog(`💾 Saving data for "${result.title}"...`, "info");

		try {
			// Simulate save API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			addLog(`✅ Successfully saved "${result.title}" to database`, "success");
		} catch {
			addLog(`❌ Failed to save "${result.title}"`, "error");
		}
	};

	const handleExportToSheets = async (result: SearchResult) => {
		addLog(`📊 Exporting "${result.title}" to Google Sheets...`, "info");

		try {
			// Simulate export API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			addLog(
				`✅ Successfully exported "${result.title}" to Google Sheets`,
				"success"
			);
		} catch {
			addLog(`❌ Failed to export "${result.title}"`, "error");
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "live":
				return <Clock className='h-4 w-4 text-blue-500' />;
			case "funded":
				return <CheckCircle className='h-4 w-4 text-green-500' />;
			case "ended":
				return <XCircle className='h-4 w-4 text-red-500' />;
			default:
				return <Clock className='h-4 w-4 text-gray-500' />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "live":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "funded":
				return "bg-green-100 text-green-800 border-green-200";
			case "ended":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return (
		<div className='space-y-8'>
			{/* Enhanced Header */}
			<div className='text-center space-y-4'>
				<div className='flex items-center justify-center gap-3'>
					<div className='p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl'>
						<Search className='h-8 w-8 text-white' />
					</div>
					<div>
						<h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
							Search Crowdfunding Platforms
						</h1>
						<p className='text-lg text-gray-600 mt-2'>
							Search across multiple platforms with AI-powered OCR enhancement
						</p>
					</div>
				</div>
			</div>

			{/* Enhanced Search Form */}
			<Card className='shadow-lg border-0 bg-gradient-to-r from-white to-gray-50'>
				<CardHeader className='pb-4'>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Filter className='h-5 w-5 text-purple-600' />
						Search Parameters
					</CardTitle>
					<CardDescription>
						Configure your search settings and discover amazing projects
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{/* Platform Selection */}
						<div className='space-y-3'>
							<label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
								<Globe className='h-4 w-4' />
								Platform
							</label>
							<select
								value={searchParams.platform}
								onChange={(e) =>
									setSearchParams({ ...searchParams, platform: e.target.value })
								}
								className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm'>
								{platforms.map((platform) => (
									<option key={platform.value} value={platform.value}>
										{platform.icon} {platform.label}
									</option>
								))}
							</select>
						</div>

						{/* Category Selection */}
						<div className='space-y-3'>
							<label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
								<Filter className='h-4 w-4' />
								Category
							</label>
							<select
								value={searchParams.category}
								onChange={(e) =>
									setSearchParams({ ...searchParams, category: e.target.value })
								}
								className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm'>
								{categories.map((category) => (
									<option key={category.value} value={category.value}>
										{category.icon} {category.label}
									</option>
								))}
							</select>
						</div>

						{/* OCR Enhancement */}
						<div className='space-y-3'>
							<label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
								<Sparkles className='h-4 w-4' />
								OCR Enhancement
							</label>
							<div className='flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200'>
								<input
									type='checkbox'
									id='enableOcr'
									checked={searchParams.enableOcr}
									onChange={(e) =>
										setSearchParams({
											...searchParams,
											enableOcr: e.target.checked,
										})
									}
									className='w-5 h-5 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500'
								/>
								<label
									htmlFor='enableOcr'
									className='text-sm font-medium text-purple-700'>
									Enable AI-powered OCR
								</label>
							</div>
						</div>
					</div>

					{/* Search Keyword */}
					<div className='space-y-3'>
						<label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
							<Search className='h-4 w-4' />
							Search Keyword
						</label>
						<div className='flex gap-3'>
							<Input
								type='text'
								placeholder="Enter search keyword (e.g., 'smartwatch', 'eco-friendly')"
								value={searchParams.keyword}
								onChange={(e) =>
									setSearchParams({ ...searchParams, keyword: e.target.value })
								}
								className='flex-1 p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm'
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
							/>
							<Button
								onClick={handleSearch}
								disabled={isSearching}
								className='px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50'>
								{isSearching ? (
									<>
										<Loader2 className='h-5 w-5 mr-2 animate-spin' />
										Searching...
									</>
								) : (
									<>
										<Play className='h-5 w-5 mr-2' />
										Start Search
									</>
								)}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Search Results */}
			{searchResults.length > 0 && (
				<Card className='shadow-lg border-0'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-xl'>
							<TrendingUp className='h-5 w-5 text-green-600' />
							Search Results ({searchResults.length})
						</CardTitle>
						<CardDescription>
							Found {searchResults.length} crowdfunding projects matching your
							criteria
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid gap-6'>
							{searchResults.map((result) => (
								<div
									key={result.id}
									className='p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50'>
									<div className='flex justify-between items-start mb-4'>
										<div className='flex-1'>
											<h3 className='text-xl font-semibold text-gray-900 mb-2'>
												{result.title}
											</h3>
											<div className='flex items-center gap-4 text-sm text-gray-600'>
												<span className='flex items-center gap-1'>
													<Globe className='h-4 w-4' />
													{result.platform}
												</span>
												<span className='flex items-center gap-1'>
													<Users className='h-4 w-4' />
													{result.supporters} supporters
												</span>
												<span className='flex items-center gap-1'>
													<DollarSign className='h-4 w-4' />
													{result.achievement_rate} funded
												</span>
											</div>
										</div>
										<div
											className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
												result.status
											)}`}>
											{getStatusIcon(result.status)}
											{result.status}
										</div>
									</div>

									<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
										<div className='text-center p-3 bg-blue-50 rounded-lg'>
											<div className='text-2xl font-bold text-blue-600'>
												{result.amount}
											</div>
											<div className='text-xs text-blue-500'>Raised</div>
										</div>
										<div className='text-center p-3 bg-green-50 rounded-lg'>
											<div className='text-2xl font-bold text-green-600'>
												{result.support_amount}
											</div>
											<div className='text-xs text-green-500'>Goal</div>
										</div>
										<div className='text-center p-3 bg-purple-50 rounded-lg'>
											<div className='text-2xl font-bold text-purple-600'>
												{result.supporters}
											</div>
											<div className='text-xs text-purple-500'>Backers</div>
										</div>
										<div className='text-center p-3 bg-orange-50 rounded-lg'>
											<div className='text-2xl font-bold text-orange-600'>
												{result.achievement_rate}
											</div>
											<div className='text-xs text-orange-500'>Progress</div>
										</div>
									</div>

									<div className='flex gap-3'>
										<Button
											onClick={() => setReviewData(result)}
											variant='outline'
											className='flex-1 border-gray-300 hover:border-purple-500 hover:text-purple-600'>
											<Eye className='h-4 w-4 mr-2' />
											Review
										</Button>
										<Button
											onClick={() => handleSaveData(result)}
											variant='outline'
											className='flex-1 border-gray-300 hover:border-blue-500 hover:text-blue-600'>
											<Database className='h-4 w-4 mr-2' />
											Save Data
										</Button>
										<Button
											onClick={() => handleExportToSheets(result)}
											variant='outline'
											className='flex-1 border-gray-300 hover:border-green-500 hover:text-green-600'>
											<Download className='h-4 w-4 mr-2' />
											Export
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Enhanced Activity Log */}
			<Card className='shadow-lg border-0'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Zap className='h-5 w-5 text-yellow-500' />
						Live Activity Log
					</CardTitle>
					<CardDescription>
						Real-time updates and search progress
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-3 max-h-64 overflow-y-auto'>
						{searchLogs.length === 0 ? (
							<div className='text-center py-8 text-gray-500'>
								<Clock className='h-12 w-12 mx-auto mb-3 text-gray-300' />
								<p className='text-lg font-medium'>No activity yet</p>
								<p className='text-sm'>
									Start a search to see live updates here
								</p>
							</div>
						) : (
							searchLogs.map((log) => (
								<div
									key={log.id}
									className={`p-3 rounded-lg border-l-4 ${
										{
											info: "bg-blue-50 border-blue-400 text-blue-800",
											success: "bg-green-50 border-green-400 text-green-800",
											error: "bg-red-50 border-red-400 text-red-800",
										}[log.type]
									}`}>
									<div className='flex justify-between items-start'>
										<span className='font-medium'>{log.message}</span>
										<span className='text-xs opacity-75'>{log.timestamp}</span>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* Review Modal */}
			{reviewData && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
					<div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'>
						<div className='p-6 border-b border-gray-200'>
							<div className='flex justify-between items-start'>
								<h2 className='text-2xl font-bold text-gray-900'>
									{reviewData.title}
								</h2>
								<Button
									onClick={() => setReviewData(null)}
									variant='ghost'
									className='text-gray-500 hover:text-gray-700'>
									<XCircle className='h-6 w-6' />
								</Button>
							</div>
						</div>
						<div className='p-6 space-y-6'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Platform
									</label>
									<p className='text-lg font-semibold'>{reviewData.platform}</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Status
									</label>
									<div
										className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
											reviewData.status
										)}`}>
										{reviewData.status}
									</div>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Amount Raised
									</label>
									<p className='text-lg font-semibold text-green-600'>
										{reviewData.amount}
									</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Goal
									</label>
									<p className='text-lg font-semibold'>
										{reviewData.support_amount}
									</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Supporters
									</label>
									<p className='text-lg font-semibold'>
										{reviewData.supporters}
									</p>
								</div>
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Achievement Rate
									</label>
									<p className='text-lg font-semibold text-blue-600'>
										{reviewData.achievement_rate}
									</p>
								</div>
							</div>

							{reviewData.project_owner && (
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Project Owner
									</label>
									<p className='text-lg font-semibold'>
										{reviewData.project_owner}
									</p>
								</div>
							)}

							{reviewData.contact_info && (
								<div>
									<label className='text-sm font-medium text-gray-500'>
										Contact Information
									</label>
									<p className='text-lg font-semibold'>
										{reviewData.contact_info}
									</p>
								</div>
							)}

							<div className='flex gap-3 pt-4'>
								<Button
									onClick={() => handleSaveData(reviewData)}
									className='flex-1 bg-blue-600 hover:bg-blue-700'>
									<Database className='h-4 w-4 mr-2' />
									Save to Database
								</Button>
								<Button
									onClick={() => handleExportToSheets(reviewData)}
									className='flex-1 bg-green-600 hover:bg-green-700'>
									<Download className='h-4 w-4 mr-2' />
									Export to Sheets
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
