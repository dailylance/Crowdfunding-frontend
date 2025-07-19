import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
	try {
		console.log("📊 Google Sheets export API called");
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

		console.log(
			`📊 Exporting ${results.length} projects to Google Sheets for user ${session.user.id}`
		);

		// Call the Google Sheets service (crowdfunding-sheets module)
		const sheetsResponse = await fetch(
			"http://localhost:8080/api/export-crowdfunding",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: session.user.id,
					searchId: searchId,
					platform: platform,
					keyword: keyword,
					data: results.map((item) => ({
						title: item.title || item.original_title || "Unknown",
						owner: item.project_owner || "Unknown",
						platform: platform,
						status: item.status || "Unknown",
						raised: item.amount || item.funded_amount || "$0",
						goal: item.support_amount || item.goal_amount || "$0",
						backers: item.supporters || item.backers_count || "0",
						progress:
							item.achievement_rate ||
							(item.percentage_funded ? `${item.percentage_funded}%` : "0%"),
						location: item.location || item.owner_country || "Unknown",
						url: item.url || "",
						description: item.description || "",
						start_date: item.crowdfund_start_date || "",
						end_date: item.crowdfund_end_date || "",
						days_left: item.days_left || "",
					})),
				}),
			}
		);

		if (!sheetsResponse.ok) {
			const errorData = await sheetsResponse.json().catch(() => ({}));
			throw new Error(
				errorData.message || `Google Sheets API error: ${sheetsResponse.status}`
			);
		}

		const sheetsData = await sheetsResponse.json();

		console.log("✅ Google Sheets export successful");

		return NextResponse.json({
			success: true,
			message: `Successfully exported ${results.length} projects to Google Sheets`,
			sheetUrl: sheetsData.sheetUrl,
			sheetId: sheetsData.sheetId,
		});
	} catch (error) {
		console.error("❌ Error exporting to Google Sheets:", error);

		// If sheets service is not available, provide alternative
		if (
			error instanceof Error &&
			(error.message?.includes("ECONNREFUSED") ||
				error.message?.includes("fetch"))
		) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Google Sheets service is not available. Please ensure the sheets service is running on port 8080.",
				},
				{ status: 503 }
			);
		}

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
