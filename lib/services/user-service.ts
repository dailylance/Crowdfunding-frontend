import { prisma } from "@/lib/db";
import bcryptjs from "bcryptjs";

export interface CreateUserData {
	email: string;
	name?: string;
	password?: string;
	image?: string;
	signupMethod: "google" | "manual";
	emailVerified?: Date;
}

export interface UpdateUserData {
	name?: string;
	image?: string;
	lastLoginAt?: Date;
	isActive?: boolean;
}

export class UserService {
	// Create a new user
	static async createUser(data: CreateUserData) {
		try {
			const hashedPassword = data.password
				? await bcryptjs.hash(data.password, 12)
				: null;

			const user = await prisma.user.create({
				data: {
					email: data.email,
					name: data.name,
					password: hashedPassword,
					image: data.image,
					signupMethod: data.signupMethod,
					emailVerified: data.emailVerified,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});

			return user;
		} catch (error) {
			console.error("Error creating user:", error);
			throw new Error("Failed to create user");
		}
	}

	// Find user by email (for authentication)
	static async findUserByEmail(email: string) {
		try {
			const user = await prisma.user.findUnique({
				where: { email },
				select: {
					id: true,
					email: true,
					name: true,
					image: true,
					password: true,
					signupMethod: true,
					emailVerified: true,
					isActive: true,
					lastLoginAt: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			return user;
		} catch (error) {
			console.error("Error finding user by email:", error);
			throw new Error("Failed to find user");
		}
	}

	// Find user by ID
	static async findUserById(id: string) {
		try {
			const user = await prisma.user.findUnique({
				where: { id },
				include: {
					accounts: true,
					sessions: true,
					searches: {
						orderBy: { createdAt: "desc" },
						take: 10,
					},
					savedData: {
						orderBy: { createdAt: "desc" },
						take: 10,
					},
				},
			});

			return user;
		} catch (error) {
			console.error("Error finding user by ID:", error);
			throw new Error("Failed to find user");
		}
	}

	// Update user information
	static async updateUser(id: string, data: UpdateUserData) {
		try {
			const user = await prisma.user.update({
				where: { id },
				data: {
					...data,
					updatedAt: new Date(),
				},
			});

			return user;
		} catch (error) {
			console.error("Error updating user:", error);
			throw new Error("Failed to update user");
		}
	}

	// Update last login time
	static async updateLastLogin(id: string) {
		try {
			const user = await prisma.user.update({
				where: { id },
				data: {
					lastLoginAt: new Date(),
					updatedAt: new Date(),
				},
			});

			return user;
		} catch (error) {
			console.error("Error updating last login:", error);
			throw new Error("Failed to update last login");
		}
	}

	// Verify password for manual login users
	static async verifyPassword(password: string, hashedPassword: string) {
		try {
			return await bcryptjs.compare(password, hashedPassword);
		} catch (error) {
			console.error("Error verifying password:", error);
			return false;
		}
	}

	// Get user statistics
	static async getUserStats(userId: string) {
		try {
			const [totalSearches, totalSaved, thisWeekSearches] = await Promise.all([
				prisma.search.count({
					where: { userId },
				}),
				prisma.savedData.count({
					where: { userId },
				}),
				prisma.search.count({
					where: {
						userId,
						createdAt: {
							gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
						},
					},
				}),
			]);

			return {
				totalSearches,
				totalSaved,
				thisWeek: thisWeekSearches,
				totalExports: totalSaved, // Assuming saved data can be exported
			};
		} catch (error) {
			console.error("Error getting user stats:", error);
			throw new Error("Failed to get user statistics");
		}
	}

	// Get admin statistics about all users
	static async getAdminUserStats(recentUsersLimit = 10) {
		try {
			const [totalUsers, googleUsers, manualUsers, recentUsers] =
				await Promise.all([
					prisma.user.count(),
					prisma.user.count({
						where: { signupMethod: "google" },
					}),
					prisma.user.count({
						where: { signupMethod: "manual" },
					}),
					prisma.user.findMany({
						take: recentUsersLimit,
						orderBy: { createdAt: "desc" },
						select: {
							id: true,
							name: true,
							email: true,
							signupMethod: true,
							createdAt: true,
							lastLoginAt: true,
						},
					}),
				]);

			return {
				totalUsers,
				googleUsers,
				manualUsers,
				recentUsers,
			};
		} catch (error) {
			console.error("Error getting admin user stats:", error);
			throw new Error("Failed to get admin user statistics");
		}
	}

	// Get all users with signup method info (admin function)
	static async getAllUsersWithSignupInfo(page = 1, limit = 50) {
		try {
			const skip = (page - 1) * limit;

			const [users, total] = await Promise.all([
				prisma.user.findMany({
					skip,
					take: limit,
					orderBy: { createdAt: "desc" },
					select: {
						id: true,
						name: true,
						email: true,
						signupMethod: true,
						isActive: true,
						lastLoginAt: true,
						createdAt: true,
						emailVerified: true,
						image: true,
						_count: {
							select: {
								searches: true,
								savedData: true,
							},
						},
					},
				}),
				prisma.user.count(),
			]);

			return {
				users,
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			};
		} catch (error) {
			console.error("Error getting all users:", error);
			throw new Error("Failed to get users");
		}
	}
}
