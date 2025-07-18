import { Adapter, AdapterUser } from "next-auth/adapters";
import { prisma } from "./db";

// Additional interfaces for linkAccount
interface LinkAccountData {
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refresh_token?: string | null;
	access_token?: string | null;
	expires_at?: number | null;
	token_type?: string | null;
	scope?: string | null;
	id_token?: string | null;
	session_state?: string | null;
}

interface LinkAccountResult {
	id: string;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refresh_token?: string | null;
	access_token?: string | null;
	expires_at?: number | null;
	token_type?: string | null;
	scope?: string | null;
	id_token?: string | null;
	session_state?: string | null;
}

export function CustomPrismaAdapter(): Adapter {
	return {
		async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
			console.log("🔥 CustomAdapter: Creating user:", user);
			try {
				const result = await prisma.user.create({
					data: {
						email: user.email,
						name: user.name,
						image: user.image,
						emailVerified: user.emailVerified,
						signupMethod: "google",
					},
				});
				console.log("✅ CustomAdapter: User created successfully:", result.id);

				// Immediately verify the user exists
				const verification = await prisma.user.findUnique({
					where: { id: result.id },
				});
				console.log(
					"🔍 CustomAdapter: Verification check:",
					verification ? "User found" : "User NOT found"
				);

				return result;
			} catch (error) {
				console.error("❌ CustomAdapter: Error creating user:", error);
				throw error;
			}
		},

		async getUser(id) {
			console.log("🔥 CustomAdapter: Getting user by ID:", id);
			try {
				const user = await prisma.user.findUnique({
					where: { id },
				});
				console.log(
					"✅ CustomAdapter: Found user:",
					user?.email || "not found"
				);
				return user;
			} catch (error) {
				console.error("❌ CustomAdapter: Error getting user:", error);
				return null;
			}
		},

		async getUserByEmail(email) {
			console.log("🔥 CustomAdapter: Getting user by email:", email);
			try {
				const user = await prisma.user.findUnique({
					where: { email },
				});
				console.log(
					"✅ CustomAdapter: Found user by email:",
					user?.id || "not found"
				);
				return user;
			} catch (error) {
				console.error("❌ CustomAdapter: Error getting user by email:", error);
				return null;
			}
		},

		async getUserByAccount({ providerAccountId, provider }) {
			console.log("🔥 CustomAdapter: Getting user by account:", {
				provider,
				providerAccountId,
			});
			try {
				const account = await prisma.account.findUnique({
					where: {
						provider_providerAccountId: {
							provider,
							providerAccountId,
						},
					},
					include: { user: true },
				});
				console.log(
					"✅ CustomAdapter: Found user by account:",
					account?.user?.email || "not found"
				);
				return account?.user ?? null;
			} catch (error) {
				console.error(
					"❌ CustomAdapter: Error getting user by account:",
					error
				);
				return null;
			}
		},

		async linkAccount(account: LinkAccountData): Promise<void> {
			console.log("🔥 CustomAdapter: Linking account:", {
				provider: account.provider,
				userId: account.userId,
				providerAccountId: account.providerAccountId,
			});
			try {
				const result: LinkAccountResult = await prisma.account.create({
					data: account,
				});
				console.log(
					"✅ CustomAdapter: Account linked successfully:",
					result.id
				);

				// Immediately verify the account exists
				const verification: LinkAccountResult | null = await prisma.account.findUnique({
					where: { id: result.id },
				});
				console.log(
					"🔍 CustomAdapter: Account verification check:",
					verification ? "Account found" : "Account NOT found"
				);

				return undefined;
			} catch (error) {
				console.error("❌ CustomAdapter: Error linking account:", error);
				throw error;
			}
		},

		async unlinkAccount({ providerAccountId, provider }) {
			console.log("🔥 CustomAdapter: Unlinking account:", {
				provider,
				providerAccountId,
			});
			try {
				const account = await prisma.account.delete({
					where: {
						provider_providerAccountId: {
							provider,
							providerAccountId,
						},
					},
				});
				console.log(
					"✅ CustomAdapter: Account unlinked successfully:",
					account.id
				);
				return;
			} catch (error) {
				console.error("❌ CustomAdapter: Error unlinking account:", error);
				throw error;
			}
		},

		async createSession({ sessionToken, userId, expires }) {
			console.log("🔥 CustomAdapter: Creating session:", {
				userId,
				sessionToken: sessionToken.substring(0, 10) + "...",
			});
			try {
				const session = await prisma.session.create({
					data: {
						sessionToken,
						userId,
						expires,
					},
				});
				console.log(
					"✅ CustomAdapter: Session created successfully:",
					session.id
				);
				return session;
			} catch (error) {
				console.error("❌ CustomAdapter: Error creating session:", error);
				throw error;
			}
		},

		async getSessionAndUser(sessionToken) {
			console.log(
				"🔥 CustomAdapter: Getting session and user:",
				sessionToken.substring(0, 10) + "..."
			);
			try {
				const userAndSession = await prisma.session.findUnique({
					where: { sessionToken },
					include: { user: true },
				});
				if (!userAndSession) {
					console.log("❌ CustomAdapter: Session not found");
					return null;
				}
				console.log(
					"✅ CustomAdapter: Found session and user:",
					userAndSession.user.email
				);
				return {
					session: userAndSession,
					user: userAndSession.user,
				};
			} catch (error) {
				console.error(
					"❌ CustomAdapter: Error getting session and user:",
					error
				);
				return null;
			}
		},

		async updateSession({ sessionToken, ...data }) {
			console.log(
				"🔥 CustomAdapter: Updating session:",
				sessionToken.substring(0, 10) + "...",
				data
			);
			try {
				const session = await prisma.session.update({
					where: { sessionToken },
					data,
				});
				console.log(
					"✅ CustomAdapter: Session updated successfully:",
					session.id
				);
				return session;
			} catch (error) {
				console.error("❌ CustomAdapter: Error updating session:", error);
				throw error;
			}
		},

		async deleteSession(sessionToken) {
			console.log(
				"🔥 CustomAdapter: Deleting session:",
				sessionToken.substring(0, 10) + "..."
			);
			try {
				const session = await prisma.session.delete({
					where: { sessionToken },
				});
				console.log(
					"✅ CustomAdapter: Session deleted successfully:",
					session.id
				);
				return session;
			} catch (error) {
				console.error("❌ CustomAdapter: Error deleting session:", error);
				throw error;
			}
		},

		async createVerificationToken({ identifier, expires, token }) {
			console.log("🔥 CustomAdapter: Creating verification token:", identifier);
			try {
				const verificationToken = await prisma.verificationToken.create({
					data: {
						identifier,
						expires,
						token,
					},
				});
				console.log(
					"✅ CustomAdapter: Verification token created successfully"
				);
				return verificationToken;
			} catch (error) {
				console.error(
					"❌ CustomAdapter: Error creating verification token:",
					error
				);
				throw error;
			}
		},

		async useVerificationToken({ identifier, token }) {
			console.log("🔥 CustomAdapter: Using verification token:", identifier);
			try {
				const verificationToken = await prisma.verificationToken.delete({
					where: {
						identifier_token: {
							identifier,
							token,
						},
					},
				});
				console.log("✅ CustomAdapter: Verification token used successfully");
				return verificationToken;
			} catch (error) {
				console.error(
					"❌ CustomAdapter: Error using verification token:",
					error
				);
				return null;
			}
		},
	};
}

