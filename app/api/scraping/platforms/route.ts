import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ScrapingService } from "@/lib/services/scraping-service";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const platforms = await ScrapingService.getPlatforms();

		return NextResponse.json({
			success: true,
			platforms,
		});
	} catch (error) {
		console.error("Error getting platforms:", error);
		return NextResponse.json(
			{ message: "Failed to get platforms" },
			{ status: 500 }
		);
	}
}
