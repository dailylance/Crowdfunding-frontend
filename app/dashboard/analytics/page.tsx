"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AnalyticsComponent } from "@/components/dashboard/analytics-component";

export default function AnalyticsPage() {
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
			<AnalyticsComponent />
		</DashboardLayout>
	);
}
