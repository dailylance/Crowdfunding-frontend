import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

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

		// Get user's email and access token for Google Sheets
		const userEmail = session.user.email;
		const accessToken = session.user.accessToken;

		if (!userEmail) {
			return NextResponse.json(
				{ message: "User email not found in session" },
				{ status: 400 }
			);
		}

		if (!accessToken) {
			return NextResponse.json(
				{ 
					success: false,
					message: "Google access token not found. Please sign in with Google again to export to Google Sheets." 
				},
				{ status: 400 }
			);
		}

		console.log(
			`📊 Exporting ${results.length} projects to Google Sheets for user ${userEmail}`
		);

		// Initialize Google Sheets API with user's access token
		const auth = new google.auth.OAuth2();
		auth.setCredentials({ access_token: accessToken });

		const sheets = google.sheets({ version: "v4", auth });

		// Create a new spreadsheet
		const spreadsheetTitle = `${platform} - ${keyword || "Search"} - ${new Date().toLocaleDateString()}`;
		
		console.log("📝 Creating new Google Sheet:", spreadsheetTitle);
		
		const createResponse = await sheets.spreadsheets.create({
			requestBody: {
				properties: {
					title: spreadsheetTitle,
				},
			},
		});

		const spreadsheetId = createResponse.data.spreadsheetId;
		const spreadsheetUrl = createResponse.data.spreadsheetUrl;

		if (!spreadsheetId) {
			throw new Error("Failed to create Google Sheet");
		}

		console.log("✅ Google Sheet created:", spreadsheetId);

		// Prepare data for Google Sheets
		const headers = [
			"Project Title",
			"Owner", 
			"Platform",
			"Status",
			"Raised",
			"Goal",
			"Backers",
			"Progress",
			"Location",
			"URL",
			"Description",
			"Start Date",
			"End Date",
			"Days Left"
		];

		const rows = results.map((item) => [
			item.title || item.original_title || "Unknown",
			item.project_owner || "Unknown",
			platform,
			item.status || "Unknown",
			item.amount || item.funded_amount || "$0",
			item.support_amount || item.goal_amount || "$0",
			item.supporters || item.backers_count || "0",
			item.achievement_rate || (item.percentage_funded ? `${item.percentage_funded}%` : "0%"),
			item.location || item.owner_country || "Unknown",
			item.url || "",
			item.description || "",
			item.crowdfund_start_date || "",
			item.crowdfund_end_date || "",
			item.days_left || "",
		]);

		const values = [headers, ...rows];

		// Write data to the sheet
		console.log("📊 Writing data to Google Sheet...");
		
		await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: "Sheet1!A1",
			valueInputOption: "RAW",
			requestBody: { values },
		});

		// Format the header row
		await sheets.spreadsheets.batchUpdate({
			spreadsheetId,
			requestBody: {
				requests: [
					{
						repeatCell: {
							range: {
								sheetId: 0,
								startRowIndex: 0,
								endRowIndex: 1,
							},
							cell: {
								userEnteredFormat: {
									backgroundColor: {
										red: 0.2,
										green: 0.6,
										blue: 1.0,
									},
									textFormat: {
										bold: true,
										foregroundColor: {
											red: 1.0,
											green: 1.0,
											blue: 1.0,
										},
									},
								},
							},
							fields: "userEnteredFormat(backgroundColor,textFormat)",
						},
					},
					{
						autoResizeDimensions: {
							dimensions: {
								sheetId: 0,
								dimension: "COLUMNS",
								startIndex: 0,
								endIndex: headers.length,
							},
						},
					},
				],
			},
		});

		console.log("✅ Google Sheets export successful");

		return NextResponse.json({
			success: true,
			message: `Successfully exported ${results.length} projects to Google Sheets`,
			sheetUrl: spreadsheetUrl,
			sheetId: spreadsheetId,
			spreadsheet: {
				id: spreadsheetId,
				url: spreadsheetUrl,
				title: spreadsheetTitle,
			},
		});
	} catch (error) {
		console.error("❌ Error exporting to Google Sheets:", error);

		// Handle specific error cases
		const errorMessage = error instanceof Error ? error.message : "Unknown error";

		if (errorMessage.includes("invalid_grant") || errorMessage.includes("access_token")) {
			return NextResponse.json(
				{
					success: false,
					message: "Google access token has expired. Please sign in with Google again to export to Google Sheets.",
				},
				{ status: 401 }
			);
		}

		if (errorMessage.includes("insufficient_permissions") || errorMessage.includes("permission")) {
			return NextResponse.json(
				{
					success: false,
					message: "Insufficient permissions to create Google Sheets. Please ensure you've granted the necessary permissions.",
				},
				{ status: 403 }
			);
		}

		if (errorMessage.includes("quota_exceeded")) {
			return NextResponse.json(
				{
					success: false,
					message: "Google Sheets API quota exceeded. Please try again later.",
				},
				{ status: 429 }
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
