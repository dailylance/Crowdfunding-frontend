import { prisma } from "@/lib/db";

export interface ScrapingRequest {
	platform: string;
	category?: string;
	keyword?: string;
	language?: string;
	enableOCR?: boolean;
}

export interface ScrapedProject {
	title: string;
	description?: string;
	url?: string;
	imageUrl?: string;
	raised?: string;
	goal?: string;
	backers?: string;
	daysLeft?: string;
	startDate?: string;
	endDate?: string;
	originalData?: Record<string, unknown>;
	ocrData?: Record<string, unknown>;
	nlpData?: Record<string, unknown>;
	isRelevant?: boolean;
}

export interface ScrapingResponse {
	success: boolean;
	platform: string;
	category?: string;
	keyword?: string;
	count: number;
	results: ScrapedProject[];
	searchId?: string;
	error?: string;
}

export class ScrapingService {
	private static readonly SCRAPING_API_BASE = "http://localhost:3001/api";

	// Get available platforms and categories
	static async getPlatforms() {
		try {
			const response = await fetch(`${this.SCRAPING_API_BASE}/platforms`);
			const data = await response.json();

			if (!data.success) {
				throw new Error(data.error || "Failed to get platforms");
			}

			return data.platforms;
		} catch (error) {
			console.error("Error getting platforms:", error);
			// Return fallback platforms if external API is not available
			console.log("🔄 Using fallback platform data (updated)");
			return [
				{
					name: "kickstarter",
					displayName: "Kickstarter",
					categories: [
						"Technology",
						"Design",
						"Games",
						"Film",
						"Music",
						"Art",
						"Publishing",
						"Fashion",
						"Food",
						"Crafts",
					],
				},
				{
					name: "indiegogo",
					displayName: "Indiegogo",
					categories: [
						"Technology",
						"Creative",
						"Community",
						"Health",
						"Travel",
						"Education",
						"Environment",
						"Sports",
					],
				},
				{
					name: "gofundme",
					displayName: "GoFundMe",
					categories: [
						"Medical",
						"Emergency",
						"Memorial",
						"Education",
						"Sports",
						"Community",
						"Animals",
						"Business",
					],
				},
				{
					name: "patreon",
					displayName: "Patreon",
					categories: [
						"Creative",
						"Video",
						"Music",
						"Writing",
						"Podcasts",
						"Art",
						"Photography",
						"Gaming",
					],
				},
			];
		}
	}

	// Perform scraping and save to database
	static async performSearch(
		userId: string,
		request: ScrapingRequest
	): Promise<ScrapingResponse> {
		try {
			console.log("🌐 ScrapingService.performSearch called");
			console.log("📡 API Base:", this.SCRAPING_API_BASE);
			console.log("👤 User ID:", userId);
			console.log("🔍 Search Request:", request);

			const url = `${this.SCRAPING_API_BASE}/search`;
			const payload = {
				...request,
				userId, // Pass userId to scraper backend
			};

			console.log("📤 Making request to:", url);
			console.log("📋 Payload:", JSON.stringify(payload, null, 2));

			// Test if the scraper backend is reachable
			console.log("🔗 Testing scraper backend connectivity...");

			// Call the scraping API with userId and timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout

			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
					signal: controller.signal,
				});
				clearTimeout(timeoutId);
				return await this.handleScrapingResponse(response, request);
			} catch (error) {
				clearTimeout(timeoutId);
				if (error.name === "AbortError") {
					throw new Error(
						"Scraping request timed out after 2 minutes. Please try with a smaller search or different keywords."
					);
				}
				throw error;
			}
		} catch (error) {
			console.error("❌ ScrapingService error details:");
			if (error instanceof Error) {
				console.error("❌ Error name:", error.name);
				console.error("❌ Error message:", error.message);
				console.error("❌ Error stack:", error.stack);
				if ("cause" in error) {
					console.error("❌ Error cause:", error.cause);
				}
			} else {
				console.error("❌ Unknown error:", error);
			}
			throw new Error(error instanceof Error ? error.message : "Search failed");
		}
	}

	// Handle scraping response
	private static async handleScrapingResponse(
		response: Response,
		request: ScrapingRequest
	): Promise<ScrapingResponse> {
		try {
			console.log("📨 Response received!");
			console.log("📨 Response status:", response.status);
			console.log("📨 Response ok:", response.ok);
			console.log(
				"📨 Response headers:",
				Object.fromEntries(response.headers.entries())
			);

			if (!response.ok) {
				console.error(
					"❌ Response not ok:",
					response.status,
					response.statusText
				);
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			const scrapingResult = await response.json();
			console.log("📊 Scraping result received:", scrapingResult);

			if (!scrapingResult.success) {
				console.error("❌ Scraping result not successful:", scrapingResult);
				throw new Error(scrapingResult.error || "Scraping failed");
			}

			// Return the result (scraper backend already saved to database)
			const result = {
				success: true,
				platform: request.platform,
				category: request.category,
				keyword: request.keyword,
				count: scrapingResult.count || 0,
				results: scrapingResult.results || [],
				searchId: scrapingResult.searchId, // Get searchId from scraper response
			};

			console.log("✅ Returning successful result:", {
				success: result.success,
				count: result.count,
			});
			return result;
		} catch (error) {
			console.error("❌ Response processing error:", error);
			throw error;
		}
	}

	// Get user's search history
	static async getUserSearchHistory(userId: string, limit = 10) {
		try {
			const searches = await prisma.search.findMany({
				where: { userId },
				orderBy: { createdAt: "desc" },
				take: limit,
				include: {
					_count: {
						select: {
							scrapedData: true, // Count all scraped data for this search
						},
					},
					scrapedData: {
						take: 5, // Preview of scraped data
						orderBy: { createdAt: "desc" },
					},
				},
			});

			// Transform to include the actual results count
			const searchesWithCount = searches.map((search) => ({
				...search,
				totalResults: search._count.scrapedData, // Use the actual count from database
				resultCount: search._count.scrapedData, // Also set resultCount for compatibility
			}));

			return searchesWithCount;
		} catch (error) {
			console.error("Error getting search history:", error);
			throw new Error("Failed to get search history");
		}
	}

	// Get scraped data for a specific search
	static async getScrapedData(userId: string, searchId: string) {
		try {
			const scrapedData = await prisma.scrapedData.findMany({
				where: {
					userId,
					searchId,
				},
				orderBy: { createdAt: "desc" },
				include: {
					savedData: true,
				},
			});

			// Transform the database data to match the expected format for the modal
			const transformedData = scrapedData.map((item) => {
				// Parse original data if it exists
				let originalData = {};
				try {
					if (item.originalData) {
						originalData = JSON.parse(item.originalData);
					}
				} catch (parseError) {
					console.warn(
						"Failed to parse originalData for item:",
						item.id,
						parseError.message
					);
				}

				// Transform to expected format
				return {
					id: item.id,
					title:
						item.title ||
						originalData.title ||
						originalData.original_title ||
						"Unknown Project",
					original_title: originalData.original_title || item.title,
					project_owner:
						originalData.project_owner || originalData.owner || "Unknown",
					url: item.url || originalData.url,
					amount:
						item.raised ||
						originalData.amount ||
						originalData.funded_amount ||
						"$0",
					funded_amount: item.raised || originalData.funded_amount || "$0",
					support_amount: originalData.support_amount || "$0",
					goal_amount:
						item.goal || originalData.goal_amount || originalData.goal || "$0",
					supporters:
						item.backers ||
						originalData.supporters ||
						originalData.backers_count ||
						"0",
					backers_count: item.backers || originalData.backers_count || "0",
					percentage_funded: originalData.percentage_funded || 0,
					achievement_rate: originalData.achievement_rate || "0%",
					status: originalData.status || "Unknown",
					days_left: item.daysLeft || originalData.days_left || 0,
					location:
						originalData.location || originalData.owner_country || "Unknown",
					owner_country: originalData.owner_country || "Unknown",
					description: item.description || originalData.description,
					crowdfund_start_date:
						item.startDate || originalData.crowdfund_start_date,
					crowdfund_end_date: item.endDate || originalData.crowdfund_end_date,
					image: item.imageUrl || originalData.image,
					// Include any additional fields from originalData
					...originalData,
					// Ensure the transformed fields take precedence
					title:
						item.title ||
						originalData.title ||
						originalData.original_title ||
						"Unknown Project",
					project_owner:
						originalData.project_owner || originalData.owner || "Unknown",
					amount:
						item.raised ||
						originalData.amount ||
						originalData.funded_amount ||
						"$0",
					goal_amount:
						item.goal || originalData.goal_amount || originalData.goal || "$0",
					supporters:
						item.backers ||
						originalData.supporters ||
						originalData.backers_count ||
						"0",
				};
			});

			return transformedData;
		} catch (error) {
			console.error("Error getting scraped data:", error);
			throw new Error("Failed to get scraped data");
		}
	}

	// Save selected data to user's saved collection
	static async saveData(userId: string, scrapedDataIds: string[]) {
		try {
			const savedRecords = [];

			for (const scrapedDataId of scrapedDataIds) {
				const scrapedData = await prisma.scrapedData.findFirst({
					where: {
						id: scrapedDataId,
						userId,
					},
				});

				if (!scrapedData) {
					continue;
				}

				// Check if already saved
				const existingSaved = await prisma.savedData.findFirst({
					where: { scrapedDataId },
				});

				if (!existingSaved) {
					const savedData = await prisma.savedData.create({
						data: {
							userId,
							scrapedDataId,
							title: scrapedData.title,
							platform: scrapedData.platform,
							data: scrapedData.originalData,
						},
					});
					savedRecords.push(savedData);
				}
			}

			return savedRecords;
		} catch (error) {
			console.error("Error saving data:", error);
			throw new Error("Failed to save data");
		}
	}

	// Export data to Excel (client-side download)
	static async exportToExcel(
		data: Record<string, unknown>[],
		filename: string
	) {
		try {
			// Convert data to CSV format for Excel compatibility
			const csvContent = this.convertToCSV(data);
			const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

			const link = document.createElement("a");
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", `${filename}.csv`);
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			return true;
		} catch (error) {
			console.error("Error exporting to Excel:", error);
			throw new Error("Failed to export data");
		}
	}

	// Export to Google Sheets
	static async exportToGoogleSheets(userId: string, scrapedDataIds: string[]) {
		try {
			// This would integrate with your existing Google Sheets service
			// For now, we'll call the sheets API
			const response = await fetch("http://localhost:3002/api/export", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					scrapedDataIds,
				}),
			});

			const result = await response.json();

			if (!result.success) {
				throw new Error(result.error || "Export to Google Sheets failed");
			}

			// Update saved data with spreadsheet URL
			for (const scrapedDataId of scrapedDataIds) {
				await prisma.savedData.updateMany({
					where: { scrapedDataId },
					data: {
						spreadsheetUrl: result.spreadsheetUrl,
						exportedAt: new Date(),
					},
				});
			}

			return result;
		} catch (error) {
			console.error("Error exporting to Google Sheets:", error);
			throw new Error("Failed to export to Google Sheets");
		}
	}

	// Convert data to CSV format
	private static convertToCSV(data: Record<string, unknown>[]): string {
		if (!data || data.length === 0) return "";

		const headers = Object.keys(data[0]);
		const csvHeaders = headers.join(",");

		const csvRows = data.map((row) =>
			headers
				.map((header) => {
					const value = row[header];
					// Escape commas and quotes in CSV
					if (
						typeof value === "string" &&
						(value.includes(",") || value.includes('"'))
					) {
						return `"${value.replace(/"/g, '""')}"`;
					}
					return value || "";
				})
				.join(",")
		);

		return [csvHeaders, ...csvRows].join("\n");
	}

	// Get user's saved data
	static async getUserSavedData(userId: string, limit = 50) {
		try {
			const savedData = await prisma.savedData.findMany({
				where: { userId },
				orderBy: { createdAt: "desc" },
				take: limit,
				include: {
					scrapedData: true,
				},
			});

			return savedData;
		} catch (error) {
			console.error("Error getting saved data:", error);
			throw new Error("Failed to get saved data");
		}
	}

	// Get user's scraping statistics
	static async getUserStats(userId: string) {
		try {
			// Try to get stats from database, but handle missing tables gracefully
			let totalSearches = 0;
			let totalScrapedItems = 0;
			let totalSaved = 0;
			let recentSearches: Array<{
				platform: string;
				keyword: string;
				resultCount: number | null;
				createdAt: Date;
			}> = [];

			try {
				totalSearches = await prisma.search.count({ where: { userId } });
			} catch (error) {
				console.warn("Search table not available:", error);
			}

			try {
				totalScrapedItems = await prisma.scrapedData.count({
					where: { userId },
				});
			} catch (error) {
				console.warn("ScrapedData table not available:", error);
			}

			try {
				totalSaved = await prisma.savedData.count({ where: { userId } });
			} catch (error) {
				console.warn("SavedData table not available:", error);
			}

			try {
				recentSearches = await prisma.search.findMany({
					where: { userId },
					orderBy: { createdAt: "desc" },
					take: 5,
					select: {
						platform: true,
						keyword: true,
						resultCount: true,
						createdAt: true,
					},
				});
			} catch (error) {
				console.warn("Could not fetch recent searches:", error);
				recentSearches = [];
			}

			return {
				totalSearches,
				totalScrapedItems,
				totalSaved,
				recentSearches,
			};
		} catch (error) {
			console.error("Error getting user stats:", error);
			// Return default stats instead of throwing error
			return {
				totalSearches: 0,
				totalScrapedItems: 0,
				totalSaved: 0,
				recentSearches: [],
			};
		}
	}
}
