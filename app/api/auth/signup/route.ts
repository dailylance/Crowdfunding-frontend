import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/lib/services/user-service";

export async function POST(request: NextRequest) {
	try {
		const { name, email, password } = await request.json();

		// Validate input
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ message: "Password must be at least 6 characters" },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await UserService.findUserByEmail(email);

		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists with this email" },
				{ status: 400 }
			);
		}

		// Create user with manual signup method
		const user = await UserService.createUser({
			name,
			email,
			password,
			signupMethod: "manual",
		});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					signupMethod: "manual",
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
