import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { prisma } from "@/lib/db";

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

		// Get user's access token for Google Sheets
		const accessToken = session.user.accessToken;

		if (!accessToken) {
			return NextResponse.json(
				{ 
					success: false,
					message: "Google access token not found. Please sign in with Google again to export to Google Sheets." 
				},
				{ status: 400 }
			);
		}

		// Get the scraped data from database
		const scrapedData = await prisma.scrapedData.findMany({
			where: {
				id: { in: scrapedDataIds },
				userId: session.user.id,
			},
		});

		if (scrapedData.length === 0) {
			return NextResponse.json(
				{ message: "No scraped data found for the provided IDs" },
				{ status: 404 }
			);
		}

		// Initialize Google Sheets API with user's access token
		const auth = new google.auth.OAuth2();
		auth.setCredentials({ access_token: accessToken });

		const sheets = google.sheets({ version: "v4", auth });

		// Create a new spreadsheet
		const spreadsheetTitle = `Scraped Data Export - ${new Date().toLocaleDateString()}`;
		
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

		const rows = scrapedData.map((item) => {
			const data = item.data as any;
			return [
				data.title || data.original_title || "Unknown",
				data.project_owner || "Unknown",
				data.platform || "Unknown",
				data.status || "Unknown",
				data.amount || data.funded_amount || "$0",
				data.support_amount || data.goal_amount || "$0",
				data.supporters || data.backers_count || "0",
				data.achievement_rate || (data.percentage_funded ? `${data.percentage_funded}%` : "0%"),
				data.location || data.owner_country || "Unknown",
				data.url || "",
				data.description || "",
				data.crowdfund_start_date || "",
				data.crowdfund_end_date || "",
				data.days_left || "",
			];
		});

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

		// Update saved data with spreadsheet URL
		await prisma.savedData.updateMany({
			where: { 
				scrapedDataId: { in: scrapedDataIds },
				userId: session.user.id,
			},
			data: {
				spreadsheetUrl: spreadsheetUrl,
				exportedAt: new Date(),
			},
		});

		console.log("✅ Google Sheets export successful");

		return NextResponse.json({
			success: true,
			spreadsheetUrl: spreadsheetUrl,
			message: "Successfully exported to Google Sheets",
		});
	} catch (error) {
		console.error("Error exporting to Google Sheets:", error);
		
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
