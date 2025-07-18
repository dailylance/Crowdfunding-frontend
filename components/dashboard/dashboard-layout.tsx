"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	TrendingUp,
	Search,
	Database,
	BarChart3,
	Settings,
	User,
	LogOut,
	Menu,
	X,
	Home,
	Users,
} from "lucide-react";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const { data: session } = useSession();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();

	const navigation = [
		{ name: "Dashboard", href: "/dashboard", icon: Home },
		{ name: "Search", href: "/dashboard/search", icon: Search },
		{ name: "Saved Data", href: "/dashboard/saved", icon: Database },
		{ name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
		{ name: "User Stats", href: "/admin/user-stats", icon: Users },
		{ name: "Settings", href: "/dashboard/settings", icon: Settings },
	];

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<div className='flex h-screen bg-gray-50 overflow-x-hidden'>
			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-100
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
				<div className='flex items-center justify-between h-20 px-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700'>
					<Link href='/dashboard' className='flex items-center space-x-3'>
						<div className='w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg'>
							<TrendingUp className='w-6 h-6 text-white' />
						</div>
						<span className='text-xl font-bold text-white'>
							CrowdFund<span className='text-blue-200'>Pro</span>
						</span>
					</Link>
					<button
						onClick={() => setSidebarOpen(false)}
						className='lg:hidden p-2 rounded-lg hover:bg-white/20 text-white'>
						<X className='w-5 h-5' />
					</button>
				</div>

				<nav className='flex-1 px-6 py-8 space-y-2'>
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`
                  flex items-center px-4 py-4 text-sm font-semibold rounded-xl transition-all duration-200
                  ${
										isActive
											? "bg-blue-50 text-blue-700 shadow-md border border-blue-100"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
									}
                `}
								onClick={() => setSidebarOpen(false)}>
								<item.icon
									className={`w-5 h-5 mr-4 ${isActive ? "text-blue-600" : ""}`}
								/>
								{item.name}
							</Link>
						);
					})}
				</nav>

				{/* User section */}
				<div className='border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-blue-50/30'>
					<div className='flex items-center space-x-4 mb-4'>
						<div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg'>
							<User className='w-6 h-6 text-white' />
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-bold text-gray-900 truncate'>
								{session?.user?.name || "User"}
							</p>
							<p className='text-xs text-gray-500 truncate'>
								{session?.user?.email}
							</p>
						</div>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='w-full justify-start border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200'
						onClick={handleSignOut}>
						<LogOut className='w-4 h-4 mr-2' />
						Sign Out
					</Button>
				</div>
			</div>

			{/* Main content */}
			<div className='flex-1 flex flex-col overflow-hidden min-w-0'>
				{/* Top bar */}
				<header className='bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 h-20 flex items-center justify-between px-8'>
					<button
						onClick={() => setSidebarOpen(true)}
						className='lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors'>
						<Menu className='w-6 h-6' />
					</button>

					<div className='flex items-center space-x-6'>
						<div className='text-lg font-medium text-gray-700'>
							Welcome back,{" "}
							<span className='text-blue-600 font-bold'>
								{session?.user?.name?.split(" ")[0] || "User"}
							</span>
							!
						</div>
					</div>
				</header>

				{/* Page content */}
				<main className='flex-1 overflow-auto bg-gray-50 p-8'>
					<div className='max-w-7xl mx-auto w-full'>{children}</div>
				</main>
			</div>
		</div>
	);
}
