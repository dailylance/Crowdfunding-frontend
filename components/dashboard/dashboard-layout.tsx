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
	Clock,
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
		{ name: "Search History", href: "/dashboard/search-history", icon: Clock },
		{ name: "Saved Data", href: "/dashboard/saved", icon: Database },
		{ name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
		{ name: "User Stats", href: "/admin/user-stats", icon: Users },
		{ name: "Settings", href: "/dashboard/settings", icon: Settings },
	];

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<div className='flex h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50/30 overflow-x-hidden'>
			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden'
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-200/50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
				<div className='flex items-center justify-between h-20 px-6 border-b border-slate-200/50 bg-gradient-to-r from-blue-600 to-blue-700'>
					<Link href='/dashboard' className='flex items-center space-x-3 group'>
						<div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/30 transition-all duration-300'>
							<TrendingUp className='w-7 h-7 text-white' />
						</div>
						<span className='text-xl font-bold text-white group-hover:text-white/90 transition-colors'>
							CrowdFund<span className='text-blue-200'>Pro</span>
						</span>
					</Link>
					<button
						onClick={() => setSidebarOpen(false)}
						className='lg:hidden p-2 rounded-xl hover:bg-white/20 text-white transition-colors'>
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
                  flex items-center px-4 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 group
                  ${
										isActive
											? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 shadow-lg border border-blue-200/50"
											: "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:shadow-md"
									}
                `}
								onClick={() => setSidebarOpen(false)}>
								<item.icon
									className={`w-5 h-5 mr-4 transition-colors ${
										isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-700"
									}`}
								/>
								{item.name}
								{isActive && (
									<div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse" />
								)}
							</Link>
						);
					})}
				</nav>

				{/* User section */}
				<div className='border-t border-slate-200/50 p-6 bg-gradient-to-r from-slate-50/50 to-blue-50/30'>
					<div className='flex items-center space-x-4 mb-4'>
						<div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg'>
							<User className='w-6 h-6 text-white' />
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-bold text-slate-900 truncate'>
								{session?.user?.name || "User"}
							</p>
							<p className='text-xs text-slate-500 truncate'>
								{session?.user?.email}
							</p>
						</div>
					</div>
					<Button
						variant='outline'
						size='sm'
						className='w-full justify-start border-2 border-slate-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-xl'
						onClick={handleSignOut}>
						<LogOut className='w-4 h-4 mr-2' />
						Sign Out
					</Button>
				</div>
			</div>

			{/* Main content */}
			<div className='flex-1 flex flex-col overflow-hidden min-w-0'>
				{/* Top bar */}
				<header className='bg-white/90 backdrop-blur-xl shadow-soft border-b border-slate-200/50 h-20 flex items-center justify-between px-8'>
					<button
						onClick={() => setSidebarOpen(true)}
						className='lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors'>
						<Menu className='w-6 h-6 text-slate-600' />
					</button>

					<div className='flex items-center space-x-6'>
						<div className='text-lg font-medium text-slate-700'>
							Welcome back,{" "}
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 font-bold'>
								{session?.user?.name?.split(" ")[0] || "User"}
							</span>
							!
						</div>
					</div>
				</header>

				{/* Page content */}
				<main className='flex-1 overflow-auto bg-transparent p-8'>
					<div className='max-w-7xl mx-auto w-full'>{children}</div>
				</main>
			</div>
		</div>
	);
}
