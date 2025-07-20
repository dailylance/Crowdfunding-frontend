import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

// Helper function to update search status
async function updateSearchStatus(
	platform: string,
	keyword: string,
	status: string,
	results?: unknown,
	error?: string
) {
	try {
		await fetch(
			`${
				process.env.NEXTAUTH_URL || "http://localhost:3000"
			}/api/scraping/status`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					platform,
					keyword,
					status,
					results,
					error,
				}),
			}
		);
	} catch (err) {
		console.error("Failed to update search status:", err);
	}
}

export async function POST(request: NextRequest) {
	try {
		console.log("🔍 Scraping search API called");
		const session = await getServerSession(authOptions);
		console.log(
			"👤 Session:",
			session ? `User ID: ${session.user?.id}` : "No session"
		);

		if (!session?.user?.id) {
			console.log("❌ No session or user ID");
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { platform, category, keyword, language, enableOCR } =
			await request.json();

		console.log("📊 Search request:", {
			platform,
			category,
			keyword,
			language,
			enableOCR,
		});

		// Validate input
		if (!platform) {
			return NextResponse.json(
				{ message: "Platform is required" },
				{ status: 400 }
			);
		}

		if (!keyword && !category) {
			return NextResponse.json(
				{ message: "Either keyword or category is required" },
				{ status: 400 }
			);
		}

		const searchRequest = {
			platform,
			category,
			keyword,
			language: language || "en",
			enableOCR: enableOCR !== false, // Default to true
		};

		// Set initial status as processing
		await updateSearchStatus(platform, keyword, "processing");

		console.log(
			"🚀 Calling ScrapingService.performSearch with user:",
			session.user.id
		);

		try {
			const result = await ScrapingService.performSearch(
				session.user.id,
				searchRequest
			);

			console.log(
				"✅ ScrapingService result:",
				result.success ? "Success" : "Failed"
			);

			// Update status based on result
			if (result.success) {
				await updateSearchStatus(platform, keyword, "completed", result);
			} else {
				await updateSearchStatus(
					platform,
					keyword,
					"failed",
					undefined,
					"Search failed"
				);
			}

			return NextResponse.json(result);
		} catch (searchError) {
			// Update status as failed
			await updateSearchStatus(
				platform,
				keyword,
				"failed",
				undefined,
				searchError instanceof Error ? searchError.message : "Search failed"
			);
			throw searchError;
		}
	} catch (error) {
		console.error("❌ Error performing search:", error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : "Search failed",
			},
			{ status: 500 }
		);
	}
}
