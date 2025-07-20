import { NextRequest, NextResponse } from "next/server";

// In-memory storage for tracking search status
// In production, you'd use Redis or a database
const searchStatus = new Map<
	string,
	{
		status: "processing" | "completed" | "failed";
		results?: any;
		error?: string;
		timestamp: number;
	}
>();

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const platform = searchParams.get("platform");
		const keyword = searchParams.get("keyword");

		if (!platform || !keyword) {
			return NextResponse.json(
				{ error: "Platform and keyword are required" },
				{ status: 400 }
			);
		}

		// Create a unique key for this search (use URL-safe encoding)
		const searchKey = `${platform}__${encodeURIComponent(keyword)}`;
		const status = searchStatus.get(searchKey);

		if (!status) {
			// No status found - search might not have been initiated or already cleaned up
			return NextResponse.json({
				status: "not_found",
				message:
					"Search status not found. The search may have completed or expired.",
			});
		}

		// Clean up old statuses (older than 10 minutes)
		const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
		if (status.timestamp < tenMinutesAgo) {
			searchStatus.delete(searchKey);
			return NextResponse.json({
				status: "expired",
				message: "Search status has expired.",
			});
		}

		return NextResponse.json(status);
	} catch (error) {
		console.error("Error checking search status:", error);
		return NextResponse.json(
			{ error: "Failed to check search status" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { platform, keyword, status, results, error } = body;

		if (!platform || !keyword || !status) {
			return NextResponse.json(
				{ error: "Platform, keyword, and status are required" },
				{ status: 400 }
			);
		}

		const searchKey = `${platform}__${encodeURIComponent(keyword)}`;

		searchStatus.set(searchKey, {
			status,
			results,
			error,
			timestamp: Date.now(),
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating search status:", error);
		return NextResponse.json(
			{ error: "Failed to update search status" },
			{ status: 500 }
		);
	}
}
