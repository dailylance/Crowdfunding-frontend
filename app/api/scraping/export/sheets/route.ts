import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { scrapedDataIds } = await request.json();

		if (
			!scrapedDataIds ||
			!Array.isArray(scrapedDataIds) ||
			scrapedDataIds.length === 0
		) {
			return NextResponse.json(
				{ message: "Valid scrapedDataIds array is required" },
				{ status: 400 }
			);
		}

		const result = await ScrapingService.exportToGoogleSheets(
			session.user.id,
			scrapedDataIds
		);

		return NextResponse.json({
			success: true,
			spreadsheetUrl: result.spreadsheetUrl,
			message: "Successfully exported to Google Sheets",
		});
	} catch (error) {
		console.error("Error exporting to Google Sheets:", error);
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to export to Google Sheets",
			},
			{ status: 500 }
		);
	}
}
