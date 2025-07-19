"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Search,
	Database,
	Download,
	Upload,
	Globe,
	Filter,
	TrendingUp,
	BarChart3,
	Sparkles,
	Target,
	Zap,
} from "lucide-react";
import { EnhancedScrapingResultsModal } from "./enhanced-scraping-results-modal";
// import { toast } from "sonner";

interface Platform {
	name: string;
	displayName: string;
	categories: string[];
}

interface ScrapingStats {
	totalSearches: number;
	totalScrapedItems: number;
	totalSaved: number;
	recentSearches: Array<{
		platform: string;
		keyword: string;
		resultCount: number;
		createdAt: string;
	}>;
}

export function ScrapingInterface() {
	const { data: session } = useSession();
	const [platforms, setPlatforms] = useState<Platform[]>([]);
	const [selectedPlatform, setSelectedPlatform] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [keyword, setKeyword] = useState<string>("");
	const [language, setLanguage] = useState<string>("en");
	const [enableOCR, setEnableOCR] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loadingPlatforms, setLoadingPlatforms] = useState<boolean>(true);
	const [scrapingResults, setScrapingResults] = useState<{
		success: boolean;
		platform: string;
		category?: string;
		keyword?: string;
		count: number;
		results: Record<string, unknown>[];
		searchId?: string;
	} | null>(null);
	const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
	const [stats, setStats] = useState<ScrapingStats | null>(null);

	// Load platforms on component mount
	useEffect(() => {
		loadPlatforms();
		loadStats();
	}, []);

	const loadPlatforms = async () => {
		try {
			setLoadingPlatforms(true);
			const response = await fetch("/api/scraping/platforms");
			const data = await response.json();

			if (data.success) {
				setPlatforms(data.platforms);
			} else {
				alert("Failed to load platforms");
			}
		} catch (error) {
			console.error("Error loading platforms:", error);
			alert("Failed to load platforms");
		} finally {
			setLoadingPlatforms(false);
		}
	};

	const loadStats = async () => {
		try {
			const response = await fetch("/api/scraping/stats");
			const data = await response.json();

			if (data.success) {
				setStats(data.stats);
			}
		} catch (error) {
			console.error("Error loading stats:", error);
		}
	};

	const handleSearch = async () => {
		if (!selectedPlatform) {
			alert("Please select a platform");
			return;
		}

		if (!keyword && !selectedCategory) {
			alert("Please enter a keyword or select a category");
			return;
		}

		try {
			setIsLoading(true);
			const response = await fetch("/api/scraping/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					platform: selectedPlatform,
					category: selectedCategory,
					keyword,
					language,
					enableOCR,
				}),
			});

			const result = await response.json();

			if (result.success) {
				setScrapingResults(result);
				setShowResultsModal(true);
				alert(`Found ${result.count} results!`);
				// Reload stats after successful search
				loadStats();
			} else {
				alert(result.message || "Search failed");
			}
		} catch (error) {
			console.error("Error performing search:", error);
			alert("Search failed");
		} finally {
			setIsLoading(false);
		}
	};

	const selectedPlatformData = platforms.find(
		(p) => p.name === selectedPlatform
	);

	// Ensure categories is always an array with robust validation
	const availableCategories = React.useMemo(() => {
		if (!selectedPlatformData) return [];
		if (!selectedPlatformData.categories) return [];
		if (!Array.isArray(selectedPlatformData.categories)) {
			console.warn(
				"Categories is not an array:",
				selectedPlatformData.categories
			);
			return [];
		}
		return selectedPlatformData.categories;
	}, [selectedPlatformData]);

	if (!session) {
		return (
			<Card className='max-w-2xl mx-auto'>
				<CardHeader>
					<CardTitle>Authentication Required</CardTitle>
					<CardDescription>
						Please sign in to access the scraping functionality.
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			<div className='container mx-auto px-4 py-8 space-y-8'>
				{/* Header Section */}
				<div className='text-center space-y-4'>
					<div className='inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg'>
						<Search className='h-8 w-8 text-white' />
					</div>
					<h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						Crowdfunding Intelligence Platform
					</h1>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Discover, analyze, and extract insights from global crowdfunding
						platforms with AI-powered OCR and NLP enhancement
					</p>
				</div>

				{/* Stats Dashboard */}
				{stats && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<Card className='border border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-200'>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between'>
									<div className='space-y-2'>
										<p className='text-blue-700 text-sm font-medium'>
											Total Searches
										</p>
										<p className='text-2xl font-bold text-blue-800'>
											{stats.totalSearches}
										</p>
									</div>
									<div className='p-3 bg-blue-100 rounded-full'>
										<Search className='h-6 w-6 text-blue-600' />
									</div>
								</div>
								<div className='mt-4 flex items-center text-blue-600 text-sm'>
									<TrendingUp className='h-4 w-4 mr-1' />
									<span>Active searches</span>
								</div>
							</CardContent>
						</Card>

						<Card className='border border-emerald-200 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-all duration-200'>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between'>
									<div className='space-y-2'>
										<p className='text-emerald-700 text-sm font-medium'>
											Items Discovered
										</p>
										<p className='text-2xl font-bold text-emerald-800'>
											{stats.totalScrapedItems}
										</p>
									</div>
									<div className='p-3 bg-emerald-100 rounded-full'>
										<Database className='h-6 w-6 text-emerald-600' />
									</div>
								</div>
								<div className='mt-4 flex items-center text-emerald-600 text-sm'>
									<Target className='h-4 w-4 mr-1' />
									<span>Data points collected</span>
								</div>
							</CardContent>
						</Card>

						<Card className='border border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-200'>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between'>
									<div className='space-y-2'>
										<p className='text-purple-700 text-sm font-medium'>
											Saved Projects
										</p>
										<p className='text-2xl font-bold text-purple-800'>
											{stats.totalSaved}
										</p>
									</div>
									<div className='p-3 bg-purple-100 rounded-full'>
										<Upload className='h-6 w-6 text-purple-600' />
									</div>
								</div>
								<div className='mt-4 flex items-center text-purple-600 text-sm'>
									<BarChart3 className='h-4 w-4 mr-1' />
									<span>Ready for analysis</span>
								</div>
							</CardContent>
						</Card>

						<Card className='border border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-200'>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between'>
									<div className='space-y-2'>
										<p className='text-orange-700 text-sm font-medium'>
											Recent Activity
										</p>
										<p className='text-2xl font-bold text-orange-800'>
											{stats.recentSearches.length}
										</p>
									</div>
									<div className='p-3 bg-orange-100 rounded-full'>
										<Download className='h-6 w-6 text-orange-600' />
									</div>
								</div>
								<div className='mt-4 flex items-center text-orange-600 text-sm'>
									<Zap className='h-4 w-4 mr-1' />
									<span>This week</span>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Main Search Interface */}
				<div className='max-w-4xl mx-auto'>
					<Card className='border border-gray-200 shadow-2xl bg-white backdrop-blur-sm'>
						<CardHeader className='text-center pb-8'>
							<div className='flex items-center justify-center space-x-3 mb-4'>
								<div className='p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg'>
									<Globe className='h-6 w-6 text-white' />
								</div>
								<CardTitle className='text-2xl font-bold text-gray-800'>
									Advanced Search Console
								</CardTitle>
							</div>
							<CardDescription className='text-gray-600 text-lg'>
								Configure your search parameters and discover crowdfunding
								opportunities across multiple platforms
							</CardDescription>
						</CardHeader>

						<CardContent className='space-y-8 p-8'>
							{loadingPlatforms ? (
								<div className='flex items-center justify-center py-12'>
									<div className='text-center space-y-4'>
										<div className='relative'>
											<div className='w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto'></div>
											<div className='absolute inset-0 flex items-center justify-center'>
												<Globe className='h-6 w-6 text-blue-500' />
											</div>
										</div>
										<p className='text-gray-600 font-medium'>
											Loading global platforms...
										</p>
									</div>
								</div>
							) : (
								<div className='space-y-8'>
									{/* Platform & Category Selection */}
									<div className='space-y-6'>
										<div className='flex items-center space-x-2 mb-4'>
											<Filter className='h-5 w-5 text-blue-500' />
											<h3 className='text-lg font-semibold text-gray-800'>
												Platform Selection
											</h3>
										</div>

										<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
											<div className='space-y-3'>
												<Label className='text-gray-700 font-medium flex items-center space-x-2'>
													<Globe className='h-4 w-4 text-blue-500' />
													<span>Target Platform</span>
												</Label>
												<Select
													value={selectedPlatform}
													onValueChange={setSelectedPlatform}>
													<SelectTrigger className='h-12 bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500'>
														<SelectValue placeholder='Choose your platform' />
													</SelectTrigger>
													<SelectContent>
														{platforms.map((platform) => (
															<SelectItem
																key={platform.name}
																value={platform.name}>
																<div className='flex items-center space-x-3'>
																	<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
																	<span>{platform.displayName}</span>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-3'>
												<Label className='text-gray-700 font-medium flex items-center space-x-2'>
													<Filter className='h-4 w-4 text-purple-500' />
													<span>Category Focus</span>
													<Badge variant='secondary' className='text-xs'>
														Optional
													</Badge>
												</Label>
												<Select
													value={selectedCategory}
													onValueChange={setSelectedCategory}>
													<SelectTrigger
														disabled={!selectedPlatform}
														className='h-12 bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-purple-500'>
														<SelectValue placeholder='All categories' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value=''>
															<div className='flex items-center space-x-3'>
																<div className='w-2 h-2 bg-gray-400 rounded-full'></div>
																<span>All Categories</span>
															</div>
														</SelectItem>
														{availableCategories.map((category) => (
															<SelectItem key={category} value={category}>
																<div className='flex items-center space-x-3'>
																	<div className='w-2 h-2 bg-purple-500 rounded-full'></div>
																	<span>{category}</span>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>

									<Separator className='bg-gray-200' />

									{/* Search Parameters */}
									<div className='space-y-6'>
										<div className='flex items-center space-x-2 mb-4'>
											<Target className='h-5 w-5 text-emerald-500' />
											<h3 className='text-lg font-semibold text-gray-800'>
												Search Parameters
											</h3>
										</div>

										<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
											<div className='space-y-3'>
												<Label className='text-gray-700 font-medium flex items-center space-x-2'>
													<Search className='h-4 w-4 text-emerald-500' />
													<span>Search Keywords</span>
												</Label>
												<Input
													placeholder='Enter keywords to discover projects...'
													value={keyword}
													onChange={(e) => setKeyword(e.target.value)}
													className='h-12 bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400'
												/>
											</div>

											<div className='space-y-3'>
												<Label className='text-gray-700 font-medium flex items-center space-x-2'>
													<Globe className='h-4 w-4 text-indigo-500' />
													<span>Language</span>
												</Label>
												<Select value={language} onValueChange={setLanguage}>
													<SelectTrigger className='h-12 bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-indigo-500'>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='en'>🇺🇸 English</SelectItem>
														<SelectItem value='ko'>🇰🇷 Korean</SelectItem>
														<SelectItem value='ja'>🇯🇵 Japanese</SelectItem>
														<SelectItem value='zh'>🇨🇳 Chinese</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>

									<Separator className='bg-gray-200' />

									{/* AI Enhancement Options */}
									<div className='space-y-6'>
										<div className='flex items-center space-x-2 mb-4'>
											<Sparkles className='h-5 w-5 text-yellow-500' />
											<h3 className='text-lg font-semibold text-gray-800'>
												AI Enhancement
											</h3>
										</div>

										<div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200'>
											<div className='flex items-start space-x-4'>
												<div className='flex-shrink-0'>
													<div className='w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
														<Sparkles className='h-5 w-5 text-white' />
													</div>
												</div>
												<div className='flex-1 space-y-3'>
													<div className='flex items-center space-x-3'>
														<input
															type='checkbox'
															id='enableOCR'
															checked={enableOCR}
															onChange={(e) => setEnableOCR(e.target.checked)}
															className='w-5 h-5 text-yellow-500 border-yellow-300 rounded focus:ring-yellow-400'
														/>
														<Label
															htmlFor='enableOCR'
															className='text-gray-800 font-medium'>
															Enable AI-Powered OCR & NLP Analysis
														</Label>
														<Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0'>
															Premium
														</Badge>
													</div>
													<p className='text-sm text-gray-600'>
														Extract text from images, analyze sentiment, and
														enhance data quality with advanced AI processing
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* Search Action */}
									<div className='pt-6'>
										<Button
											onClick={handleSearch}
											disabled={isLoading || !selectedPlatform}
											className='w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
											size='lg'>
											{isLoading ? (
												<div className='flex items-center space-x-3'>
													<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
													<span>Analyzing Global Platforms...</span>
												</div>
											) : (
												<div className='flex items-center space-x-3'>
													<Search className='h-5 w-5' />
													<span>Start Intelligence Gathering</span>
													<Zap className='h-5 w-5' />
												</div>
											)}
										</Button>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Recent Activity */}
				{stats?.recentSearches && stats.recentSearches.length > 0 && (
					<div className='max-w-4xl mx-auto'>
						<Card className='border border-gray-200 shadow-lg bg-white backdrop-blur-sm'>
							<CardHeader>
								<div className='flex items-center space-x-3'>
									<div className='p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg'>
										<BarChart3 className='h-5 w-5 text-white' />
									</div>
									<CardTitle className='text-xl font-bold text-gray-800'>
										Recent Search Activity
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent className='space-y-4'>
								{stats.recentSearches.map((search, index) => (
									<div
										key={index}
										className='flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200'>
										<div className='flex items-center space-x-4'>
											<div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
												<Search className='h-5 w-5 text-white' />
											</div>
											<div>
												<div className='flex items-center space-x-3'>
													<span className='font-semibold text-gray-800'>
														{search.platform}
													</span>
													{search.keyword && (
														<Badge variant='outline' className='text-xs'>
															&ldquo;{search.keyword}&rdquo;
														</Badge>
													)}
												</div>
												<p className='text-sm text-gray-500'>
													{new Date(search.createdAt).toLocaleDateString(
														"en-US",
														{
															weekday: "short",
															year: "numeric",
															month: "short",
															day: "numeric",
														}
													)}
												</p>
											</div>
										</div>
										<div className='flex items-center space-x-3'>
											<Badge className='bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0'>
												{search.resultCount} results
											</Badge>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				)}

				{/* Enhanced Results Modal */}
				<EnhancedScrapingResultsModal
					isOpen={showResultsModal}
					onClose={() => setShowResultsModal(false)}
					results={scrapingResults}
				/>
			</div>
		</div>
	);
}
