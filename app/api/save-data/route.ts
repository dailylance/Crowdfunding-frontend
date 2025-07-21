import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const savedData = await prisma.savedData.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: "desc" },
			include: { scrapedData: true },
		});

		return NextResponse.json({
			success: true,
			savedData,
		});
	} catch (error) {
		console.error("Get saved data error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { title, platform, data } = await request.json();

		if (!title || !platform || !data) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		// Save data
		const savedData = await prisma.savedData.create({
			data: {
				userId: user.id,
				title,
				platform,
				data: JSON.stringify(data),
			},
		});

		return NextResponse.json({
			message: "Data saved successfully",
			id: savedData.id,
		});
	} catch (error) {
		console.error("Save data error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
