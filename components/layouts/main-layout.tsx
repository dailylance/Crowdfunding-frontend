import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				{children}
			</main>
			<Footer />
		</>
	);
} 