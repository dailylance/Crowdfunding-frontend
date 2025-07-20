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
import { Loader2, Search, Database, Download, Upload } from "lucide-react";
import { EnhancedScrapingResultsModal } from "./enhanced-scraping-results-modal";
import type { ScrapedProject } from "./enhanced-scraping-results-modal";
// If you see "Module ... declares 'ScrapedProject' locally, but it is not exported."
// You need to export ScrapedProject from enhanced-scraping-results-modal.tsx:
// Add: export type ScrapedProject = { ... } at the top of that file.

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
	const [stats, setStats] = useState<ScrapingStats | null>(null);
	// Use the correct ScrapingResult type as expected by EnhancedScrapingResultsModal
	// Import the type from the correct location or define it here if not exported
	// import type { ScrapingResult } from "./enhanced-scraping-results-modal";

	// If ScrapingResult is not exported, define it here:
	// Import ScrapedProject type from the correct location
	// Fix: Import ScrapedProject from the correct location or export it from enhanced-scraping-results-modal
	// If ScrapedProject is only declared locally in enhanced-scraping-results-modal, you need to export it there:
	// export type ScrapedProject = { ... }

	interface ScrapingResult {
		success: boolean;
		platform: string;
		count: number;
		results: ScrapedProject[];
	}

	const [scrapingResults, setScrapingResults] = useState<ScrapingResult | null>(
		null
	);
	const [showResultsModal, setShowResultsModal] = useState<boolean>(false);

	// Get available categories for selected platform
	const selectedPlatformData = platforms.find(
		(p) => p.name === selectedPlatform
	);
	const availableCategories = Array.isArray(selectedPlatformData?.categories)
		? selectedPlatformData.categories
		: [];

	// Load platforms on component mount
	useEffect(() => {
		const loadPlatforms = async () => {
			try {
				setLoadingPlatforms(true);
				const response = await fetch("/api/scraping/platforms");
				if (response.ok) {
					const data = await response.json();
					console.log("Platforms data:", data); // Debug log
					setPlatforms(data.platforms || []);
				} else {
					console.error("Failed to load platforms:", response.status);
				}
			} catch (error) {
				console.error("Error loading platforms:", error);
			} finally {
				setLoadingPlatforms(false);
			}
		};

		loadPlatforms();
	}, []);

	// Load statistics
	useEffect(() => {
		const loadStats = async () => {
			try {
				const response = await fetch("/api/scraping/stats");
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Error loading stats:", error);
			}
		};

		if (session) {
			loadStats();
		}
	}, [session]);

	const handleSearch = async () => {
		if (!selectedPlatform) return;

		setIsLoading(true);
		try {
			const response = await fetch("/api/scraping/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					platform: selectedPlatform,
					category: selectedCategory || null,
					keyword,
					language,
					enableOCR,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Search response:", data); // Debug log
				setScrapingResults(data); // Set the entire response object
				setShowResultsModal(true);
			} else {
				console.error("Search failed:", response.status);
			}
		} catch (error) {
			console.error("Error during search:", error);
		}
	};

	return (
		<div className='py-10 px-4 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white'>
			<div className='space-y-10'>
				{/* Main Scraping Interface */}
				<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl max-w-4xl mx-auto'>
					<CardHeader className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg'>
						<CardTitle className='flex items-center space-x-3'>
							<Search className='h-6 w-6' />
							<span className='text-xl'>Crowdfunding Data Scraper</span>
						</CardTitle>
						<CardDescription className='text-blue-100'>
							Search and scrape crowdfunding platforms with OCR and NLP
							enhancement
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6 p-6'>
						{loadingPlatforms ? (
							<div className='flex items-center justify-center py-12'>
								<Loader2 className='h-8 w-8 animate-spin text-blue-600' />
								<span className='ml-3 text-gray-700 text-lg'>
									Loading platforms...
								</span>
							</div>
						) : (
							<>
								{/* Platform Selection */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-3'>
										<Label
											htmlFor='platform'
											className='text-gray-800 font-semibold text-sm'>
											Platform
										</Label>
										<Select
											value={selectedPlatform}
											onValueChange={setSelectedPlatform}>
											<SelectTrigger className='h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500'>
												<SelectValue placeholder='Select a platform' />
											</SelectTrigger>
											<SelectContent>
												{platforms.map((platform) => (
													<SelectItem key={platform.name} value={platform.name}>
														{platform.displayName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className='space-y-3'>
										<Label
											htmlFor='category'
											className='text-gray-800 font-semibold text-sm'>
											Category (Optional)
										</Label>
										<Select
											value={selectedCategory}
											onValueChange={setSelectedCategory}>
											<SelectTrigger
												className='h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500'
												disabled={!selectedPlatform}>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value=''>All Categories</SelectItem>
												{availableCategories.map((category) => (
													<SelectItem key={category} value={category}>
														{category}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								{/* Search Options */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-3'>
										<Label
											htmlFor='keyword'
											className='text-gray-800 font-semibold text-sm'>
											Keyword
										</Label>
										<Input
											id='keyword'
											placeholder='Enter search keyword'
											value={keyword}
											onChange={(e) => setKeyword(e.target.value)}
											className='h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500'
										/>
									</div>

									<div className='space-y-3'>
										<Label
											htmlFor='language'
											className='text-gray-800 font-semibold text-sm'>
											Language
										</Label>
										<Select value={language} onValueChange={setLanguage}>
											<SelectTrigger className='h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500'>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='en'>English</SelectItem>
												<SelectItem value='ko'>Korean</SelectItem>
												<SelectItem value='ja'>Japanese</SelectItem>
												<SelectItem value='zh'>Chinese</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								{/* OCR Option */}
								<div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
									<div className='flex items-center space-x-3'>
										<input
											type='checkbox'
											id='enableOCR'
											checked={enableOCR}
											onChange={(e) => setEnableOCR(e.target.checked)}
											className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
										/>
										<Label
											htmlFor='enableOCR'
											className='text-gray-800 font-medium'>
											Enable OCR and NLP Enhancement
										</Label>
										<Badge className='bg-green-100 text-green-800 border-green-300'>
											Recommended
										</Badge>
									</div>
								</div>

								{/* Search Button */}
								<Button
									onClick={handleSearch}
									disabled={isLoading || !selectedPlatform}
									className='w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl'
									size='lg'>
									{isLoading ? (
										<>
											<Loader2 className='mr-3 h-5 w-5 animate-spin' />
											Searching...
										</>
									) : (
										<>
											<Search className='mr-3 h-5 w-5' />
											Start Scraping
										</>
									)}
								</Button>
							</>
						)}
					</CardContent>
				</Card>

				{/* Recent Searches */}
				{stats?.recentSearches && stats.recentSearches.length > 0 && (
					<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg max-w-4xl mx-auto'>
						<CardHeader>
							<CardTitle className='text-gray-800 flex items-center space-x-2'>
								<Database className='h-5 w-5 text-gray-600' />
								<span>Recent Searches</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								{stats.recentSearches.map((search, index) => (
									<div
										key={index}
										className='flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors'>
										<div>
											<span className='font-semibold text-gray-800'>
												{search.platform}
											</span>
											{search.keyword && (
												<span className='ml-2 text-sm text-gray-600'>
													&ldquo;{search.keyword}&rdquo;
												</span>
											)}
										</div>
										<div className='flex items-center space-x-3'>
											<Badge className='bg-blue-100 text-blue-800 border-blue-300'>
												{search.resultCount} results
											</Badge>
											<span className='text-sm text-gray-500'>
												{new Date(search.createdAt).toLocaleDateString()}
											</span>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
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
