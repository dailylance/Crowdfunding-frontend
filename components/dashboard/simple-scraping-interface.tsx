"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface ProjectResult {
	title?: string;
	amount?: string;
	status?: string;
}

interface ScrapingResult {
	success: boolean;
	platform: string;
	count: number;
	results: ProjectResult[];
	searchId?: string;
}

export function SimpleScrapingInterface() {
	const { data: session } = useSession();
	const [selectedPlatform, setSelectedPlatform] = useState("kickstarter");
	const [keyword, setKeyword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState<ScrapingResult | null>(null);

	const platforms = [
		{ value: "kickstarter", label: "Kickstarter" },
		{ value: "indiegogo", label: "Indiegogo" },
		{ value: "makuake", label: "Makuake (マクアケ)" },
		{ value: "wadiz", label: "Wadiz (와디즈)" },
		{ value: "campfire", label: "CAMPFIRE" },
	];

	const handleSearch = async () => {
		if (!keyword.trim()) {
			alert("Please enter a search keyword");
			return;
		}

		setIsLoading(true);
		setResults(null);

		try {
			console.log("Starting search...");
			const response = await fetch("/api/scraping/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					platform: selectedPlatform,
					keyword: keyword.trim(),
					language: "en",
					enableOCR: true,
				}),
			});

			console.log("Response status:", response.status);
			const data = await response.json();
			console.log("Response data:", data);

			if (response.ok && data.success) {
				setResults(data);
				alert(`✅ Found ${data.count} results!`);
			} else {
				alert(`❌ Error: ${data.message || "Search failed"}`);
			}
		} catch (error) {
			console.error("Search error:", error);
			alert(
				`❌ Network error: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (!session) {
		return (
			<div
				style={{
					padding: "2rem",
					backgroundColor: "#f8f9fa",
					border: "2px solid #dee2e6",
					borderRadius: "8px",
					margin: "2rem auto",
					maxWidth: "600px",
				}}>
				<h2 style={{ color: "#dc3545", marginBottom: "1rem" }}>
					⚠️ Authentication Required
				</h2>
				<p style={{ color: "#6c757d" }}>
					Please sign in to access the scraping functionality.
				</p>
			</div>
		);
	}

	return (
		<div
			style={{
				padding: "2rem",
				backgroundColor: "#ffffff",
				border: "2px solid #007bff",
				borderRadius: "12px",
				margin: "2rem auto",
				maxWidth: "800px",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			}}>
			<h1
				style={{
					color: "#007bff",
					marginBottom: "2rem",
					fontSize: "2rem",
					fontWeight: "bold",
					textAlign: "center",
				}}>
				🔍 Real-Time Crowdfunding Scraper
			</h1>

			<div style={{ marginBottom: "2rem" }}>
				<h3 style={{ color: "#333", marginBottom: "1rem" }}>
					Select Platform:
				</h3>
				<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
					{platforms.map((platform) => (
						<button
							key={platform.value}
							onClick={() => setSelectedPlatform(platform.value)}
							style={{
								padding: "0.75rem 1.5rem",
								backgroundColor:
									selectedPlatform === platform.value ? "#007bff" : "#f8f9fa",
								color: selectedPlatform === platform.value ? "white" : "#333",
								border: "2px solid #007bff",
								borderRadius: "6px",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: "14px",
							}}>
							{platform.label}
						</button>
					))}
				</div>
			</div>

			<div style={{ marginBottom: "2rem" }}>
				<h3 style={{ color: "#333", marginBottom: "1rem" }}>Search Keyword:</h3>
				<input
					type='text'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="Enter search keyword (e.g., 'smartwatch', 'game', 'tech')"
					style={{
						width: "100%",
						padding: "1rem",
						fontSize: "16px",
						border: "2px solid #007bff",
						borderRadius: "6px",
						outline: "none",
					}}
					onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSearch()}
				/>
			</div>

			<div style={{ textAlign: "center", marginBottom: "2rem" }}>
				<button
					onClick={handleSearch}
					disabled={isLoading}
					style={{
						padding: "1rem 2rem",
						fontSize: "18px",
						fontWeight: "bold",
						backgroundColor: isLoading ? "#6c757d" : "#28a745",
						color: "white",
						border: "none",
						borderRadius: "8px",
						cursor: isLoading ? "not-allowed" : "pointer",
						minWidth: "200px",
					}}>
					{isLoading ? "🔄 Scraping..." : "🚀 Start Scraping"}
				</button>
			</div>

			{isLoading && (
				<div
					style={{
						textAlign: "center",
						padding: "2rem",
						backgroundColor: "#e3f2fd",
						borderRadius: "8px",
						border: "2px solid #2196f3",
					}}>
					<p style={{ color: "#1976d2", fontSize: "18px", fontWeight: "bold" }}>
						⏳ Scraping {selectedPlatform} for &quot;{keyword}&quot;...
					</p>
					<p style={{ color: "#666", marginTop: "0.5rem" }}>
						This may take a few moments as we gather real-time data
					</p>
				</div>
			)}

			{results && (
				<div
					style={{
						marginTop: "2rem",
						padding: "2rem",
						backgroundColor: "#d4edda",
						border: "2px solid #28a745",
						borderRadius: "8px",
					}}>
					<h3 style={{ color: "#155724", marginBottom: "1rem" }}>
						✅ Search Results
					</h3>
					<div style={{ color: "#155724" }}>
						<p>
							<strong>Platform:</strong> {results.platform}
						</p>
						<p>
							<strong>Results Found:</strong> {results.count}
						</p>
						<p>
							<strong>Search ID:</strong> {results.searchId}
						</p>

						{results.results && results.results.length > 0 && (
							<div style={{ marginTop: "1rem" }}>
								<h4 style={{ marginBottom: "0.5rem" }}>Sample Results:</h4>
								<div style={{ maxHeight: "200px", overflow: "auto" }}>
									{results.results.slice(0, 3).map((item, index) => (
										<div
											key={index}
											style={{
												padding: "0.5rem",
												backgroundColor: "white",
												border: "1px solid #28a745",
												borderRadius: "4px",
												marginBottom: "0.5rem",
											}}>
											<p>
												<strong>{item.title || "Unknown Project"}</strong>
											</p>
											<p>
												Amount: {item.amount || "N/A"} | Status:{" "}
												{item.status || "N/A"}
											</p>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			<div
				style={{
					marginTop: "2rem",
					padding: "1rem",
					backgroundColor: "#fff3cd",
					border: "1px solid #ffeaa7",
					borderRadius: "6px",
					textAlign: "center",
				}}>
				<p style={{ color: "#856404", margin: 0 }}>
					💡 This scraper fetches real-time data from crowdfunding platforms and
					stores it in your database
				</p>
			</div>
		</div>
	);
}
