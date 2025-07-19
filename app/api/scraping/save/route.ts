import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

export async function POST(request: NextRequest) {
	try {
		console.log("💾 Save to database API called");
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { searchId, results, scrapedDataIds } = await request.json();

		// Handle both new format (direct results) and old format (scrapedDataIds)
		if (results && Array.isArray(results)) {
			// New format: Save scraped results directly to database
			console.log(
				`💾 Saving ${results.length} projects for user ${session.user.id}`
			);

			// Note: The scraper backend should have already saved these to the database
			// This endpoint is for additional processing if needed
			return NextResponse.json({
				success: true,
				message: `Data is already saved to database via scraper backend. Found ${results.length} projects.`,
				savedCount: results.length,
			});
		} else if (scrapedDataIds && Array.isArray(scrapedDataIds)) {
			// Old format: Use ScrapingService
			const savedData = await ScrapingService.saveData(
				session.user.id,
				scrapedDataIds
			);

			return NextResponse.json({
				success: true,
				saved: savedData,
				message: `Successfully saved ${savedData.length} items`,
			});
		} else {
			return NextResponse.json(
				{ message: "Either 'results' or 'scrapedDataIds' array is required" },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("Error saving data:", error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : "Failed to save data",
			},
			{ status: 500 }
		);
	}
}
