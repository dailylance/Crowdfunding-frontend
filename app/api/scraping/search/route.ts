import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

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

		console.log(
			"🚀 Calling ScrapingService.performSearch with user:",
			session.user.id
		);
		const result = await ScrapingService.performSearch(
			session.user.id,
			searchRequest
		);

		console.log(
			"✅ ScrapingService result:",
			result.success ? "Success" : "Failed"
		);
		return NextResponse.json(result);
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
