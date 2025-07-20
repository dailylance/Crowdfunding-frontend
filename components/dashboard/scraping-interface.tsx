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
import { ScrapingLoadingAnimation } from "./scraping-loading-animation";

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [scrapingResults, setScrapingResults] = useState<any>(null);
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
		let shouldKeepLoading = false; // Local flag to track if we should keep loading

		// Create an AbortController for request timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minutes timeout

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
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (response.ok) {
				const data = await response.json();
				console.log("Search response:", data); // Debug log
				setScrapingResults(data); // Set the entire response object
				setShowResultsModal(true);
			} else {
				console.log(`⚠️ Response not ok. Status: ${response.status}`); // Debug log
				const errorData = await response.json().catch(() => null);
				const errorMessage =
					errorData?.error || `Search failed with status ${response.status}`;

				// Check if it's a 500 error (backend might still be processing)
				if (response.status === 500) {
					console.log(
						"🔄 500 error detected - backend likely still processing. Starting polling..."
					); // Debug log
					// Show a different message for 500 errors - backend might still be working
					showNotification({
						type: "warning",
						title: "Processing Continues",
						message:
							"Backend is still processing your request. This may take a few more minutes. You can check back later or wait for results.",
					});

					// Set polling state AND flag to keep loading
					setIsPolling(true);
					shouldKeepLoading = true;
					// Keep loading animation but add polling to check for results
					startResultPolling();
					return; // Don't set isLoading to false yet
				} else {
					// Only log error for non-500 status codes
					console.error("Search failed:", response.status, errorMessage);
					// For other errors, show error notification
					showNotification({
						type: "error",
						title: "Search Failed",
						message: errorMessage.includes("timed out")
							? "⏱️ Search timed out. Try with more specific keywords or a different platform."
							: errorMessage,
					});
				}
			}
		} catch (error: unknown) {
			clearTimeout(timeoutId);
			console.error("Search error:", error);

			if (error instanceof Error && error.name === "AbortError") {
				// Request was aborted due to timeout
				showNotification({
					type: "warning",
					title: "Request Timeout",
					message:
						"The search is taking longer than expected. Backend may still be processing. Check back in a few minutes.",
				});
				setIsPolling(true);
				shouldKeepLoading = true;
				startResultPolling();
				return; // Keep loading animation active
			} else {
				showNotification({
					type: "error",
					title: "Connection Error",
					message:
						"Unable to connect to the server. Please check your connection and try again.",
				});
			}
		} finally {
			// Only set loading to false if we're not starting polling
			if (!shouldKeepLoading) {
				setIsLoading(false);
			}
		}
	};

	// Add polling state
	const [isPolling, setIsPolling] = useState(false);
	const [pollCount, setPollCount] = useState(0);

	// Function to poll for results when backend is still processing
	const startResultPolling = () => {
		setPollCount(0);

		const pollInterval = setInterval(async () => {
			try {
				// Poll the backend to check if results are ready
				const response = await fetch(
					`/api/scraping/status?platform=${selectedPlatform}&keyword=${encodeURIComponent(
						keyword
					)}`
				);

				if (response.ok) {
					const statusData = await response.json();
					if (statusData.status === "completed" && statusData.results) {
						// Results are ready!
						clearInterval(pollInterval);
						setScrapingResults(statusData.results);
						setShowResultsModal(true);
						setIsLoading(false);
						setIsPolling(false);

						showNotification({
							type: "success",
							title: "Results Ready!",
							message:
								"Your search results have been processed and are now available.",
						});
						return;
					}
				}

				// Increment poll count and stop after 10 attempts (5 minutes)
				setPollCount((prev) => {
					const newCount = prev + 1;
					if (newCount >= 10) {
						clearInterval(pollInterval);
						setIsLoading(false);
						setIsPolling(false);
						showNotification({
							type: "info",
							title: "Still Processing",
							message:
								"The search is taking longer than expected. Please try again later or contact support.",
						});
					}
					return newCount;
				});
			} catch (error) {
				console.error("Polling error:", error);
			}
		}, 30000); // Poll every 30 seconds
	};

	// Notification helper function
	const showNotification = ({
		type,
		title,
		message,
	}: {
		type: "success" | "error" | "warning" | "info";
		title: string;
		message: string;
	}) => {
		const colors = {
			success: "linear-gradient(135deg, #10B981, #059669)",
			error: "linear-gradient(135deg, #EF4444, #DC2626)",
			warning: "linear-gradient(135deg, #F59E0B, #D97706)",
			info: "linear-gradient(135deg, #3B82F6, #2563EB)",
		};

		const icons = {
			success: "✅",
			error: "❌",
			warning: "⚠️",
			info: "ℹ️",
		};

		const notification = document.createElement("div");
		notification.innerHTML = `
			<div style="
				position: fixed; 
				top: 20px; 
				right: 20px; 
				background: ${colors[type]}; 
				color: white; 
				padding: 16px 24px; 
				border-radius: 12px; 
				box-shadow: 0 10px 25px rgba(0,0,0,0.15);
				z-index: 10000;
				font-family: system-ui;
				max-width: 400px;
				animation: slideIn 0.3s ease-out;
			">
				<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
					<span style="font-size: 20px;">${icons[type]}</span>
					<strong>${title}</strong>
				</div>
				<div style="font-size: 14px; opacity: 0.9;">
					${message}
				</div>
			</div>
		`;

		// Add animation styles
		if (!document.getElementById("notification-styles")) {
			const styles = document.createElement("style");
			styles.id = "notification-styles";
			styles.textContent = `
				@keyframes slideIn {
					from { transform: translateX(100%); opacity: 0; }
					to { transform: translateX(0); opacity: 1; }
				}
				@keyframes slideOut {
					from { transform: translateX(0); opacity: 1; }
					to { transform: translateX(100%); opacity: 0; }
				}
			`;
			document.head.appendChild(styles);
		}

		document.body.appendChild(notification);

		// Remove notification after 8 seconds with animation
		setTimeout(() => {
			const notifDiv = notification.querySelector("div") as HTMLElement;
			if (notifDiv) {
				notifDiv.style.animation = "slideOut 0.3s ease-in";
				setTimeout(() => {
					if (notification.parentNode) {
						notification.parentNode.removeChild(notification);
					}
				}, 300);
			}
		}, 8000);
	};

	return (
		<>
			{/* Show loading animation when scraping is in progress */}
			{isLoading && (
				<ScrapingLoadingAnimation
					platform={selectedPlatform}
					keyword={keyword}
					isPolling={isPolling}
					pollCount={pollCount}
				/>
			)}

			<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
				<div className='container mx-auto px-4 py-8 space-y-8'>
					{/* Header with Stats */}
					{stats && (
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
							<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
								<CardContent className='p-6'>
									<div className='flex items-center space-x-3'>
										<div className='p-3 bg-blue-100 rounded-lg'>
											<Search className='h-6 w-6 text-blue-600' />
										</div>
										<div>
											<p className='text-2xl font-bold text-gray-900'>
												{stats.totalSearches}
											</p>
											<p className='text-sm text-gray-600'>Total Searches</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
								<CardContent className='p-6'>
									<div className='flex items-center space-x-3'>
										<div className='p-3 bg-green-100 rounded-lg'>
											<Database className='h-6 w-6 text-green-600' />
										</div>
										<div>
											<p className='text-2xl font-bold text-gray-900'>
												{stats.totalScrapedItems}
											</p>
											<p className='text-sm text-gray-600'>Items Scraped</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
								<CardContent className='p-6'>
									<div className='flex items-center space-x-3'>
										<div className='p-3 bg-purple-100 rounded-lg'>
											<Download className='h-6 w-6 text-purple-600' />
										</div>
										<div>
											<p className='text-2xl font-bold text-gray-900'>
												{stats.totalSaved}
											</p>
											<p className='text-sm text-gray-600'>Items Saved</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
								<CardContent className='p-6'>
									<div className='flex items-center space-x-3'>
										<div className='p-3 bg-orange-100 rounded-lg'>
											<Upload className='h-6 w-6 text-orange-600' />
										</div>
										<div>
											<p className='text-2xl font-bold text-gray-900'>
												{stats.recentSearches?.length || 0}
											</p>
											<p className='text-sm text-gray-600'>Recent Searches</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

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
														<SelectItem
															key={platform.name}
															value={platform.name}>
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
		</>
	);
}
