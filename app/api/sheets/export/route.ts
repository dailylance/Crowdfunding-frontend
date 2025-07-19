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

		// Get user's email for Google Sheets sharing
		const userEmail = session.user.email;
		if (!userEmail) {
			return NextResponse.json(
				{ message: "User email not found in session" },
				{ status: 400 }
			);
		}

		console.log(
			`📊 Exporting ${results.length} projects to Google Sheets for user ${userEmail}`
		);

		// Call the Google Sheets service (crowdfunding-sheets module)
		const sheetsResponse = await fetch("http://localhost:3002/api/export", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userEmail: userEmail,
				jsonData: {
					success: true,
					platform: platform,
					keyword: keyword,
					count: results.length,
					searchId: searchId,
					results: results.map((item) => ({
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
				},
				title: `${platform} - ${
					keyword || "Search"
				} - ${new Date().toLocaleDateString()}`,
			}),
		});

		if (!sheetsResponse.ok) {
			const errorData = await sheetsResponse.json().catch(() => ({}));
			throw new Error(
				errorData.message || `Google Sheets API error: ${sheetsResponse.status}`
			);
		}

		const sheetsData = await sheetsResponse.json();

		if (!sheetsData.success) {
			// Handle Google Sheets service errors
			throw new Error(sheetsData.error || "Google Sheets export failed");
		}

		console.log("✅ Google Sheets export successful");

		return NextResponse.json({
			success: true,
			message: `Successfully exported ${results.length} projects to Google Sheets`,
			sheetUrl: sheetsData.spreadsheet?.url,
			sheetId: sheetsData.spreadsheet?.id,
			spreadsheet: sheetsData.spreadsheet,
		});
	} catch (error) {
		console.error("❌ Error exporting to Google Sheets:", error);

		// Handle specific error cases
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";

		if (
			errorMessage.includes("ECONNREFUSED") ||
			errorMessage.includes("fetch")
		) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Google Sheets service is not available. Please ensure the sheets service is running on port 3002.",
				},
				{ status: 503 }
			);
		}

		if (
			errorMessage.includes("permission") ||
			errorMessage.includes("Permission")
		) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Google Sheets export is not properly configured. Please contact support for setup assistance.",
				},
				{ status: 503 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: `Failed to export to Google Sheets: ${errorMessage}`,
			},
			{ status: 500 }
		);
	}
}
