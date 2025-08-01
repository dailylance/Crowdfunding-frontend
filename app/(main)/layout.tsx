import { MainLayout } from "@/components/layouts/main-layout";

export default function MainPagesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MainLayout>{children}</MainLayout>;
} 