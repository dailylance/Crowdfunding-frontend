"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	Search,
	Database,
	Eye,
	ChevronRight,
	Calendar,
	BarChart3,
	Loader2,
	CheckCircle,
	Globe,
} from "lucide-react";
import { EnhancedScrapingResultsModal } from "./enhanced-scraping-results-modal";

interface SearchHistoryItem {
	id: string;
	searchId: string;
	platform: string;
	keyword: string;
	category?: string;
	totalResults: number;
	searchDate: string;
	status: "completed" | "processing" | "failed";
}

// Import ScrapingResult and ScrapedProject from a shared types file
// If "@/types/scraping" does not exist, define the types locally here:
export interface ScrapedProject {
	id: string;
	title: string;
	description: string;
	url: string;
	image?: string;
	amount_raised?: number;
	goal?: number;
	backers?: number;
	currency?: string;
	country?: string;
	category?: string;
	platform?: string;
	crowdfund_start_date?: string;
	crowdfund_end_date?: string;
	days_left?: number;
	ocr_text?: string;
	nlp_tags?: string[];
	createdAt?: string;
	updatedAt?: string;
	[key: string]: unknown;
}

export interface ScrapingResult {
	success: boolean;
	platform: string;
	keyword: string;
	category?: string;
	count: number;
	results: ScrapedProject[];
	searchId?: string;
	isFromHistory?: boolean;
}

// Remove the local ScrapingResult interface

export function SearchHistory() {
	const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
	const [selectedResults, setSelectedResults] = useState<ScrapingResult | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [viewingResults, setViewingResults] = useState<string | null>(null);

	// Notification function

	// Load search history on component mount
	useEffect(() => {
		loadSearchHistory();
	}, []);

	const loadSearchHistory = async () => {
		try {
			setLoading(true);
			console.log("🔍 Loading search history...");

			const response = await fetch("/api/scraping/history", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // Include session cookies
			});

			console.log("📊 Response status:", response.status);
			console.log("📊 Response ok:", response.ok);

			const data = await response.json();
			console.log("📊 Response data:", data);

			if (response.ok && data.success) {
				setSearchHistory(data.history || []);
				console.log(
					"✅ Search history loaded successfully:",
					data.history?.length || 0,
					"items"
				);
			} else {
				console.error("❌ Failed to load search history:", data.message);
				showNotification(
					"❌ Failed to load search history",
					data.message || "Unknown error",
					"error"
				);
			}
		} catch (error) {
			console.error("❌ Error loading search history:", error);
			showNotification(
				"❌ Connection Error",
				"Unable to connect to server",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	const viewStoredResults = async (historyItem: SearchHistoryItem) => {
		try {
			setViewingResults(historyItem.searchId);

			const response = await fetch(
				`/api/scraping/stored-results?searchId=${historyItem.searchId}`
			);
			const data = await response.json();

			if (response.ok && data.success) {
				// Format the data to match the modal's expected structure
				const formattedResults: ScrapingResult = {
					success: true,
					platform: historyItem.platform,
					keyword: historyItem.keyword,
					category: historyItem.category,
					count: data.results.length,
					results: data.results as ScrapedProject[],
					searchId: historyItem.searchId,
					isFromHistory: true, // Flag to indicate this is from history
				};
				setSelectedResults(formattedResults);
				setIsModalOpen(true);
			}
		} catch (error) {
			console.error("Error viewing stored results:", error);
			showNotification(
				"❌ Connection Error",
				"Unable to load stored results",
				"error"
			);
		} finally {
			setViewingResults(null);
		}
	};

	const showNotification = (
		title: string,
		message: string,
		type: "success" | "error" | "info"
	) => {
		const colors = {
			success: "from-green-500 to-emerald-600",
			error: "from-red-500 to-red-600",
			info: "from-blue-500 to-blue-600",
		};

		const notification = document.createElement("div");
		notification.innerHTML = `
			<div style="
				position: fixed; 
				top: 20px; 
				right: 20px; 
				background: linear-gradient(135deg, ${colors[type]
					.split(" ")[0]
					.replace("from-", "")}, ${colors[type]
			.split(" ")[1]
			.replace("to-", "")}); 
				color: white; 
				padding: 16px 24px; 
				border-radius: 12px; 
				box-shadow: 0 10px 25px rgba(0,0,0,0.15);
				z-index: 10000;
				font-family: system-ui;
				max-width: 400px;
			">
				<div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
				<div style="font-size: 14px; opacity: 0.9;">${message}</div>
			</div>
		`;
		document.body.appendChild(notification);

		setTimeout(() => {
			if (notification.parentNode) {
				notification.parentNode.removeChild(notification);
			}
		}, 5000);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getPlatformColor = (platform: string) => {
		const colors: { [key: string]: string } = {
			kickstarter: "bg-green-100 text-green-700 border-green-200",
			indiegogo: "bg-pink-100 text-pink-700 border-pink-200",
			gofundme: "bg-blue-100 text-blue-700 border-blue-200",
			fundrazr: "bg-purple-100 text-purple-700 border-purple-200",
		};
		return (
			colors[platform.toLowerCase()] ||
			"bg-gray-100 text-gray-700 border-gray-200"
		);
	};

	if (loading) {
		return (
			<Card className='w-full'>
				<CardContent className='p-8'>
					<div className='flex items-center justify-center space-x-3'>
						<Loader2 className='h-6 w-6 animate-spin text-blue-600' />
						<span className='text-gray-600'>Loading search history...</span>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<div className='space-y-8'>
				{/* Statistics Cards */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
					<Card className='bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-blue-600 text-sm font-medium uppercase tracking-wide'>
										Total Searches
									</p>
									<p className='text-3xl font-bold text-blue-900 mt-1'>
										{searchHistory.length}
									</p>
								</div>
								<Search className='h-10 w-10 text-blue-500' />
							</div>
						</CardContent>
					</Card>

					<Card className='bg-gradient-to-br from-green-50 to-green-100 border-green-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-green-600 text-sm font-medium uppercase tracking-wide'>
										Completed
									</p>
									<p className='text-3xl font-bold text-green-900 mt-1'>
										{
											searchHistory.filter(
												(item) => item.status === "completed"
											).length
										}
									</p>
								</div>
								<CheckCircle className='h-10 w-10 text-green-500' />
							</div>
						</CardContent>
					</Card>

					<Card className='bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-purple-600 text-sm font-medium uppercase tracking-wide'>
										Total Results
									</p>
									<p className='text-3xl font-bold text-purple-900 mt-1'>
										{searchHistory.reduce(
											(sum, item) => sum + item.totalResults,
											0
										)}
									</p>
								</div>
								<Database className='h-10 w-10 text-purple-500' />
							</div>
						</CardContent>
					</Card>

					<Card className='bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-amber-600 text-sm font-medium uppercase tracking-wide'>
										Platforms
									</p>
									<p className='text-3xl font-bold text-amber-900 mt-1'>
										{new Set(searchHistory.map((item) => item.platform)).size}
									</p>
								</div>
								<Globe className='h-10 w-10 text-amber-500' />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Search History Card */}
				<Card className='shadow-2xl border-0 bg-white'>
					<CardHeader className='bg-gradient-to-r from-slate-50 to-gray-50 border-b'>
						<CardTitle className='flex items-center space-x-3 text-2xl font-bold text-gray-900'>
							<Clock className='h-7 w-7 text-blue-600' />
							<span className='text-gray-900'>Your Search History</span>
							<Badge
								variant='secondary'
								className='ml-auto text-lg px-4 py-2 bg-blue-100 text-blue-700 border-blue-200'>
								{searchHistory.length} searches
							</Badge>
						</CardTitle>
					</CardHeader>

					<CardContent className='p-0'>
						{searchHistory.length === 0 ? (
							<div className='p-12 text-center'>
								<div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
									<Search className='h-12 w-12 text-gray-400' />
								</div>
								<h3 className='text-2xl font-semibold text-gray-600 mb-3'>
									No search history yet
								</h3>
								<p className='text-gray-500 text-lg mb-8 max-w-md mx-auto'>
									Start searching for crowdfunding projects to see your history
									here. All your searches will be saved for easy access.
								</p>
								<Link href='/dashboard/search'>
									<Button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg'>
										<Search className='h-5 w-5 mr-2' />
										Start Your First Search
									</Button>
								</Link>
							</div>
						) : (
							<div className='divide-y divide-gray-100'>
								{searchHistory.map((item) => (
									<div
										key={item.id}
										className='p-8 hover:bg-gray-50 transition-all duration-200 group'>
										<div className='flex items-center justify-between'>
											<div className='flex-1'>
												<div className='flex items-center space-x-2 mb-4'>
													<Button
														variant='outline'
														size='sm'
														className='bg-white text-blue-700 border-blue-200 font-semibold shadow-sm hover:bg-blue-50'>
														All
													</Button>
													<Button
														variant='outline'
														size='sm'
														className='bg-white text-green-700 border-green-200 font-semibold shadow-sm hover:bg-green-50'>
														Completed
													</Button>
													<Badge className={getPlatformColor(item.platform)}>
														{item.platform.toUpperCase()}
													</Badge>
												</div>
												<h3 className='text-2xl font-bold text-gray-800'>
													&ldquo;{item.keyword}&rdquo;
												</h3>
												{item.category && (
													<Badge
														variant='outline'
														className='text-sm bg-gray-100'>
														{item.category}
													</Badge>
												)}
												<Badge
													variant={
														item.status === "completed"
															? "default"
															: "secondary"
													}
													className='text-sm'>
													{item.status.charAt(0).toUpperCase() +
														item.status.slice(1)}
												</Badge>
												<div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 mt-4'>
													<div className='flex items-center space-x-2'>
														<Calendar className='h-5 w-5 text-blue-500' />
														<div>
															<p className='text-sm font-medium text-gray-500'>
																Search Date
															</p>
															<p className='font-semibold'>
																{formatDate(item.searchDate)}
															</p>
														</div>
													</div>
													<div className='flex items-center space-x-2'>
														<Database className='h-5 w-5 text-green-500' />
														<div>
															<p className='text-sm font-medium text-gray-500'>
																Results Found
															</p>
															<p className='font-semibold'>
																{item.totalResults} projects
															</p>
														</div>
													</div>
													<div className='flex items-center space-x-2'>
														<BarChart3 className='h-5 w-5 text-purple-500' />
														<div>
															<p className='text-sm font-medium text-gray-500'>
																Status
															</p>
															<p className='font-semibold'>{item.status}</p>
														</div>
													</div>
												</div>
											</div>
											<div className='flex items-center space-x-3 ml-8'>
												<Button
													onClick={() => viewStoredResults(item)}
													disabled={
														viewingResults === item.searchId ||
														item.status !== "completed"
													}
													size='lg'
													className='flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 group-hover:shadow-lg transition-all duration-200'>
													{viewingResults === item.searchId ? (
														<>
															<Loader2 className='h-5 w-5 animate-spin' />
															<span>Loading...</span>
														</>
													) : (
														<>
															<Eye className='h-5 w-5' />
															<span>View Results</span>
															<ChevronRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
														</>
													)}
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Results Modal */}
			<EnhancedScrapingResultsModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedResults(null);
				}}
				results={selectedResults}
			/>
		</>
	);
}
