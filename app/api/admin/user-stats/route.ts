import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserService } from "@/lib/services/user-service";

export async function GET() {
	try {
		// Check if user is authenticated
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Get user statistics
		const stats = await UserService.getAdminUserStats(10); // Get top 10 recent users

		return NextResponse.json(stats, { status: 200 });
	} catch (error) {
		console.error("Error fetching user stats:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
