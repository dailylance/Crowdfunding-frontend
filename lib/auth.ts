import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import { UserService } from "./services/user-service";

// Debug environment and database connection
console.log("🔧 NextAuth Configuration Loading...");
console.log("Environment check:", {
	NODE_ENV: process.env.NODE_ENV,
	hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
	hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
	hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
	hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
	hasDatabaseUrl: !!process.env.DATABASE_URL,
	databaseUrlPreview: process.env.DATABASE_URL?.substring(0, 50) + "...",
});

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			signupMethod?: string;
		};
	}

	interface User {
		id: string;
		email: string;
		name?: string | null;
		image?: string | null;
		signupMethod?: string;
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
				name: { label: "Name", type: "text" },
				action: { label: "Action", type: "hidden" },
			},
			async authorize(credentials) {
				if (!credentials?.email) {
					return null;
				}

				const action = credentials.action || "signin";

				if (action === "signup") {
					// Handle manual signup
					if (!credentials.password || !credentials.name) {
						throw new Error("Missing required fields for signup");
					}

					// Check if user already exists
					const existingUser = await UserService.findUserByEmail(
						credentials.email
					);
					if (existingUser) {
						throw new Error("User already exists with this email");
					}

					// Create new user
					const newUser = await UserService.createUser({
						email: credentials.email,
						name: credentials.name,
						password: credentials.password,
						signupMethod: "manual",
					});

					return {
						id: newUser.id,
						email: newUser.email,
						name: newUser.name,
						image: newUser.image,
						signupMethod: "manual",
					};
				} else {
					// Handle signin
					if (!credentials.password) {
						return null;
					}

					const user = await UserService.findUserByEmail(credentials.email);
					if (!user || !user.password) {
						return null;
					}

					const isValidPassword = await UserService.verifyPassword(
						credentials.password,
						user.password
					);

					if (!isValidPassword) {
						return null;
					}

					// Update last login
					await UserService.updateLastLogin(user.id);

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
						signupMethod: user.signupMethod || "manual",
					};
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/signin",
		newUser: "/auth/signup",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			console.log("SignIn callback:", {
				userId: user?.id,
				email: user?.email,
				provider: account?.provider,
				profile: profile?.email,
			});
			// For Google OAuth, we let the adapter handle user creation
			// We'll update the signup method after the user is created
			return true;
		},
		async jwt({ token, user, account }) {
			console.log("JWT callback:", {
				tokenEmail: token?.email,
				userId: user?.id,
				userEmail: user?.email,
				provider: account?.provider,
			});

			if (user) {
				token.id = user.id;
				token.signupMethod = user.signupMethod;
			}

			// For Google OAuth, set signup method and update user
			if (account?.provider === "google" && token.email) {
				try {
					console.log("Updating Google user signup method for:", token.email);
					const dbUser = await prisma.user.findUnique({
						where: { email: token.email },
					});

					if (dbUser) {
						// Update signup method if not set
						if (!dbUser.signupMethod || dbUser.signupMethod === "manual") {
							await prisma.user.update({
								where: { id: dbUser.id },
								data: {
									signupMethod: "google",
									lastLoginAt: new Date(),
								},
							});
							token.signupMethod = "google";
							console.log(
								"Updated signup method to google for user:",
								dbUser.id
							);
						} else {
							token.signupMethod = dbUser.signupMethod;
						}
					}
				} catch (error) {
					console.error("Error updating user signup method:", error);
				}
			}

			// Fetch fresh user data to get signup method
			if (token.email && !token.signupMethod) {
				try {
					const dbUser = await prisma.user.findUnique({
						where: { email: token.email },
						select: { signupMethod: true },
					});
					if (dbUser) {
						token.signupMethod = dbUser.signupMethod;
					}
				} catch (error) {
					console.error("Error fetching user data in JWT callback:", error);
				}
			}

			return token;
		},
		async session({ session, token }) {
			console.log("Session callback:", {
				sessionEmail: session?.user?.email,
				tokenId: token?.id,
				tokenSignupMethod: token?.signupMethod,
			});

			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.signupMethod = token.signupMethod as string;
			}
			return session;
		},
	},
	events: {
		async createUser({ user }) {
			console.log(
				"🔥 CreateUser event - User created via NextAuth:",
				user.email,
				"ID:",
				user.id
			);

			// IMMEDIATE database verification after user creation
			try {
				console.log("🔍 Verifying user exists in database immediately...");
				const dbUser = await prisma.user.findUnique({
					where: { id: user.id },
				});

				if (dbUser) {
					console.log(
						"✅ VERIFICATION SUCCESS: User found in database immediately after creation"
					);
					console.log("User details:", {
						id: dbUser.id,
						email: dbUser.email,
						signupMethod: dbUser.signupMethod,
					});
				} else {
					console.log(
						"❌ VERIFICATION FAILED: User NOT found in database immediately after creation!"
					);

					// Try finding by email as well
					const dbUserByEmail = await prisma.user.findUnique({
						where: { email: user.email },
					});
					console.log(
						"Email search result:",
						dbUserByEmail ? "Found by email" : "Not found by email either"
					);
				}

				// Also check total user count
				const totalUsers = await prisma.user.count();
				console.log(`📊 Total users in database: ${totalUsers}`);

				// Update the user to set Google signup method
				await prisma.user.update({
					where: { id: user.id },
					data: {
						signupMethod: "google",
						lastLoginAt: new Date(),
					},
				});
				console.log(
					"✅ Successfully updated signup method to google for user:",
					user.id
				);
			} catch (error) {
				console.error("❌ Error in createUser event verification:", error);
			}
		},
		async signIn({ user, account, isNewUser }) {
			console.log(
				"SignIn event - User signed in:",
				user.email,
				"via",
				account?.provider,
				"New user:",
				isNewUser,
				"User ID:",
				user.id
			);

			// Update last login for existing users
			if (!isNewUser && account?.provider === "google") {
				try {
					await prisma.user.update({
						where: { id: user.id },
						data: { lastLoginAt: new Date() },
					});
					console.log("Updated last login for existing user:", user.id);
				} catch (error) {
					console.error("Error updating last login:", error);
				}
			}
		},
	},
	debug: true,
	logger: {
		error(code, metadata) {
			console.error("NextAuth Error:", code, metadata);
		},
		warn(code) {
			console.warn("NextAuth Warning:", code);
		},
		debug(code, metadata) {
			console.log("NextAuth Debug:", code, metadata);
		},
	},
};
