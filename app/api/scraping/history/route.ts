import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const limit = parseInt(searchParams.get("limit") || "10");

		const history = await ScrapingService.getUserSearchHistory(
			session.user.id,
			limit
		);

		// Transform the data to include all necessary fields
		const formattedHistory = history.map((item: Record<string, unknown>) => ({
			id: item.id || item.searchId,
			searchId: item.searchId || item.id,
			platform: item.platform,
			keyword: item.keyword,
			category: item.category || null,
			totalResults: item.totalResults || item.resultCount || 0, // Use the actual count from database
			searchDate: item.searchDate || item.createdAt || item.created_at,
			status: item.status || "completed",
		}));

		return NextResponse.json({
			success: true,
			history: formattedHistory,
			total: formattedHistory.length,
		});
	} catch (error) {
		console.error("Error getting search history:", error);
		return NextResponse.json(
			{ message: "Failed to get search history" },
			{ status: 500 }
		);
	}
}
