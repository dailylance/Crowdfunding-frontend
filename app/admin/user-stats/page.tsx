"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";

interface UserStats {
	totalUsers: number;
	googleUsers: number;
	manualUsers: number;
	recentUsers: Array<{
		id: string;
		name: string | null;
		email: string;
		signupMethod: string;
		createdAt: string;
		lastLoginAt: string | null;
	}>;
}

export default function UserStatsPage() {
	const { data: session, status } = useSession();
	const [stats, setStats] = useState<UserStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (status === "authenticated") {
			fetchUserStats();
		}
	}, [status]);

	const fetchUserStats = async () => {
		try {
			const response = await fetch("/api/admin/user-stats");
			if (response.ok) {
				const data = await response.json();
				setStats(data);
			} else {
				setError("Failed to fetch user statistics");
			}
		} catch {
			setError("Error loading statistics");
		} finally {
			setLoading(false);
		}
	};

	if (status === "loading" || loading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		);
	}

	if (status === "unauthenticated") {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<Card className='w-full max-w-md'>
					<CardContent className='text-center py-12'>
						<h2 className='text-2xl font-bold mb-4'>Access Denied</h2>
						<p className='text-gray-600'>
							You need to be logged in to view this page.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<Card className='w-full max-w-md'>
					<CardContent className='text-center py-12'>
						<h2 className='text-2xl font-bold mb-4 text-red-600'>Error</h2>
						<p className='text-gray-600'>{error}</p>
						<Button onClick={fetchUserStats} className='mt-4'>
							Try Again
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 p-4'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>
						User Statistics Dashboard
					</h1>
					<p className='text-gray-600 mt-2'>
						Overview of user signup methods and activity
					</p>
				</div>

				{stats && (
					<>
						{/* Stats Overview Cards */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Total Users
									</CardTitle>
									<Users className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>{stats.totalUsers}</div>
									<p className='text-xs text-muted-foreground'>
										All registered users
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Google Signups
									</CardTitle>
									<TrendingUp className='h-4 w-4 text-blue-600' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold text-blue-600'>
										{stats.googleUsers}
									</div>
									<p className='text-xs text-muted-foreground'>
										{stats.totalUsers > 0
											? Math.round((stats.googleUsers / stats.totalUsers) * 100)
											: 0}
										% of total
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Manual Signups
									</CardTitle>
									<UserCheck className='h-4 w-4 text-green-600' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold text-green-600'>
										{stats.manualUsers}
									</div>
									<p className='text-xs text-muted-foreground'>
										{stats.totalUsers > 0
											? Math.round((stats.manualUsers / stats.totalUsers) * 100)
											: 0}
										% of total
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Current User
									</CardTitle>
									<Calendar className='h-4 w-4 text-purple-600' />
								</CardHeader>
								<CardContent>
									<div className='text-sm font-bold text-purple-600'>
										{session?.user?.signupMethod === "google"
											? "Google User"
											: "Manual User"}
									</div>
									<p className='text-xs text-muted-foreground'>
										Your signup method
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Recent Users Table */}
						<Card>
							<CardHeader>
								<CardTitle>Recent Users</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='overflow-x-auto'>
									<table className='w-full table-auto'>
										<thead>
											<tr className='border-b'>
												<th className='text-left py-2 px-4'>Name</th>
												<th className='text-left py-2 px-4'>Email</th>
												<th className='text-left py-2 px-4'>Signup Method</th>
												<th className='text-left py-2 px-4'>Joined</th>
												<th className='text-left py-2 px-4'>Last Login</th>
											</tr>
										</thead>
										<tbody>
											{stats.recentUsers.map((user) => (
												<tr key={user.id} className='border-b hover:bg-gray-50'>
													<td className='py-2 px-4'>{user.name || "N/A"}</td>
													<td className='py-2 px-4'>{user.email}</td>
													<td className='py-2 px-4'>
														<span
															className={`px-2 py-1 rounded-full text-xs font-medium ${
																user.signupMethod === "google"
																	? "bg-blue-100 text-blue-800"
																	: "bg-green-100 text-green-800"
															}`}>
															{user.signupMethod === "google"
																? "Google"
																: "Manual"}
														</span>
													</td>
													<td className='py-2 px-4 text-sm text-gray-600'>
														{new Date(user.createdAt).toLocaleDateString()}
													</td>
													<td className='py-2 px-4 text-sm text-gray-600'>
														{user.lastLoginAt
															? new Date(user.lastLoginAt).toLocaleDateString()
															: "Never"}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					</>
				)}
			</div>
		</div>
	);
}
