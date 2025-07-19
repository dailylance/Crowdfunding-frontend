import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

export async function GET(
	request: NextRequest,
	{ params }: { params: { searchId: string } }
) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const scrapedData = await ScrapingService.getScrapedData(
			session.user.id,
			params.searchId
		);

		return NextResponse.json({
			success: true,
			data: scrapedData,
		});
	} catch (error) {
		console.error("Error getting scraped data:", error);
		return NextResponse.json(
			{ message: "Failed to get scraped data" },
			{ status: 500 }
		);
	}
}
