"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SearchHistory } from "@/components/dashboard/search-history";

export default function SearchHistoryPage() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
			</div>
		);
	}

	if (!session) {
		redirect("/auth/signin");
	}

	return (
		<DashboardLayout>
			<div className='space-y-6'>
				{/* Page Header */}
				<div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-4xl font-bold mb-2'>Search History</h1>
							<p className='text-blue-100 text-lg'>
								View and manage all your previous crowdfunding searches
							</p>
						</div>
						<div className='hidden md:block'>
							<div className='w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center'>
								<svg
									className='w-12 h-12 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Search History Component */}
				<SearchHistory />
			</div>
		</DashboardLayout>
	);
}
