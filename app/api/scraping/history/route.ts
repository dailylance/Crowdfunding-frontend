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

		return NextResponse.json({
			success: true,
			history,
		});
	} catch (error) {
		console.error("Error getting search history:", error);
		return NextResponse.json(
			{ message: "Failed to get search history" },
			{ status: 500 }
		);
	}
}
