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
		const searchId = searchParams.get("searchId");

		if (!searchId) {
			return NextResponse.json(
				{ message: "searchId parameter is required" },
				{ status: 400 }
			);
		}

		// Get stored results for the specific search ID
		const results = await ScrapingService.getScrapedData(
			session.user.id,
			searchId
		);

		if (!results || results.length === 0) {
			return NextResponse.json({
				success: false,
				message: "No stored results found for this search",
				results: [],
			});
		}

		return NextResponse.json({
			success: true,
			results,
			count: results.length,
			searchId,
		});
	} catch (error) {
		console.error("Error getting stored results:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Failed to get stored results",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
