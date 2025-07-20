import { SessionProvider } from "@/components/providers/session-provider";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<div className="min-h-screen bg-slate-50">
				{children}
			</div>
		</SessionProvider>
	);
} 