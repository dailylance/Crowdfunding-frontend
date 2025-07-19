import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
	try {
		console.log("📊 CSV export API called");
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { searchId, platform, keyword, results } = await request.json();

		if (!results || !Array.isArray(results)) {
			return NextResponse.json(
				{ message: "Results data is required" },
				{ status: 400 }
			);
		}

		console.log(`📊 Creating CSV for ${results.length} projects`);

		// Convert results to CSV format
		const headers = [
			"Title",
			"Owner",
			"Platform",
			"Status",
			"Amount Raised",
			"Goal Amount",
			"Backers",
			"Progress %",
			"Location",
			"URL",
			"Description",
			"Start Date",
			"End Date",
			"Days Left",
		];

		const csvRows = [
			headers.join(","), // Header row
			...results.map((item) =>
				[
					`"${(item.title || item.original_title || "Unknown").replace(
						/"/g,
						'""'
					)}"`,
					`"${(item.project_owner || "Unknown").replace(/"/g, '""')}"`,
					`"${platform}"`,
					`"${(item.status || "Unknown").replace(/"/g, '""')}"`,
					`"${(item.amount || item.funded_amount || "$0").replace(
						/"/g,
						'""'
					)}"`,
					`"${(item.support_amount || item.goal_amount || "$0").replace(
						/"/g,
						'""'
					)}"`,
					`"${(item.supporters || item.backers_count || "0").replace(
						/"/g,
						'""'
					)}"`,
					`"${(
						item.achievement_rate ||
						(item.percentage_funded ? `${item.percentage_funded}%` : "0%")
					).replace(/"/g, '""')}"`,
					`"${(item.location || item.owner_country || "Unknown").replace(
						/"/g,
						'""'
					)}"`,
					`"${(item.url || "").replace(/"/g, '""')}"`,
					`"${(item.description || "").replace(/"/g, '""').substring(0, 200)}"`,
					`"${(item.crowdfund_start_date || "").replace(/"/g, '""')}"`,
					`"${(item.crowdfund_end_date || "").replace(/"/g, '""')}"`,
					`"${(item.days_left || "").replace(/"/g, '""')}"`,
				].join(",")
			),
		];

		const csvContent = csvRows.join("\n");
		const fileName = `crowdfunding_${platform}_${keyword}_${
			searchId?.slice(-8) || Date.now()
		}.csv`;

		console.log("✅ CSV generated successfully");

		// Return CSV content as downloadable file
		return new NextResponse(csvContent, {
			status: 200,
			headers: {
				"Content-Type": "text/csv",
				"Content-Disposition": `attachment; filename="${fileName}"`,
				"Content-Length": csvContent.length.toString(),
			},
		});
	} catch (error) {
		console.error("❌ Error creating CSV:", error);
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error ? error.message : "Failed to create CSV",
			},
			{ status: 500 }
		);
	}
}
