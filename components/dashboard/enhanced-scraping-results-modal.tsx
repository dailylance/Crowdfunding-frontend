"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Database,
	Download,
	ExternalLink,
	DollarSign,
	Users,
	CheckCircle,
	Loader2,
} from "lucide-react";

interface ScrapedProject {
	id?: string;
	title?: string;
	original_title?: string;
	project_owner?: string;
	url?: string;
	amount?: string;
	funded_amount?: string;
	support_amount?: string;
	goal_amount?: string;
	supporters?: string;
	backers_count?: string;
	percentage_funded?: number;
	achievement_rate?: string;
	status?: string;
	days_left?: number;
	location?: string;
	owner_country?: string;
	description?: string;
	crowdfund_start_date?: string;
	crowdfund_end_date?: string;
	image?: string;
	[key: string]: unknown;
}

interface ScrapingResult {
	success: boolean;
	platform: string;
	category?: string;
	keyword?: string;
	count: number;
	results: ScrapedProject[];
	searchId?: string;
}

interface EnhancedScrapingResultsModalProps {
	isOpen: boolean;
	onClose: () => void;
	results: ScrapingResult | null;
}

export function EnhancedScrapingResultsModal({
	isOpen,
	onClose,
	results,
}: EnhancedScrapingResultsModalProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [isExporting, setIsExporting] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const handleSaveToDatabase = async () => {
		if (!results) return;

		setIsSaving(true);
		try {
			const response = await fetch("/api/scraping/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					searchId: results.searchId,
					results: results.results,
				}),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				setIsSaved(true);
				alert(`✅ Successfully saved ${results.count} projects to database!`);
			} else {
				alert(`❌ Failed to save: ${data.message || "Unknown error"}`);
			}
		} catch (error) {
			console.error("Save error:", error);
			alert("❌ Failed to save to database");
		} finally {
			setIsSaving(false);
		}
	};

	const handleExportToSheets = async () => {
		if (!results) return;

		setIsExporting(true);
		try {
			// First try Google Sheets export
			const response = await fetch("/api/sheets/export", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					searchId: results.searchId,
					platform: results.platform,
					keyword: results.keyword,
					results: results.results,
				}),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				alert(
					`✅ Successfully exported to Google Sheets! Sheet URL: ${data.sheetUrl}`
				);
				if (data.sheetUrl) {
					window.open(data.sheetUrl, "_blank");
				}
			} else {
				// Fallback to CSV download if Google Sheets fails
				console.log("Google Sheets export failed, falling back to CSV");
				await handleCsvExport();
			}
		} catch (error) {
			console.error("Export error:", error);
			// Fallback to CSV download
			await handleCsvExport();
		} finally {
			setIsExporting(false);
		}
	};

	const handleCsvExport = async () => {
		if (!results) return;

		try {
			const response = await fetch("/api/sheets/csv", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					searchId: results.searchId,
					platform: results.platform,
					keyword: results.keyword,
					results: results.results,
				}),
			});

			if (response.ok) {
				// Create download link
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `crowdfunding_${results.platform}_${
					results.keyword
				}_${Date.now()}.csv`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);

				alert(
					"📁 CSV file downloaded! You can import it to Google Sheets manually."
				);
			} else {
				throw new Error("CSV export failed");
			}
		} catch (error) {
			console.error("CSV export error:", error);
			alert("❌ Failed to export data");
		}
	};

	if (!results) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-7xl max-h-[90vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle className='flex items-center space-x-2'>
						<Database className='h-5 w-5' />
						<span>Scraped Results - {results.platform}</span>
					</DialogTitle>
					<DialogDescription>
						Found {results.count} projects for &ldquo;{results.keyword}&rdquo;
						on {results.platform}
					</DialogDescription>
				</DialogHeader>

				{/* Summary Cards */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
					<Card>
						<CardContent className='p-4'>
							<div className='flex items-center space-x-2'>
								<Database className='h-4 w-4 text-blue-500' />
								<div>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Total Projects
									</p>
									<p className='text-xl font-bold text-gray-900 dark:text-white'>
										{results.count}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='p-4'>
							<div className='flex items-center space-x-2'>
								<DollarSign className='h-4 w-4 text-green-500' />
								<div>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Platform
									</p>
									<p className='text-xl font-bold capitalize text-gray-900 dark:text-white'>
										{results.platform}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='p-4'>
							<div className='flex items-center space-x-2'>
								<Users className='h-4 w-4 text-purple-500' />
								<div>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Search Term
									</p>
									<p className='text-lg font-semibold text-gray-900 dark:text-white'>
										{results.keyword}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='p-4'>
							<div className='flex items-center space-x-2'>
								<CheckCircle className='h-4 w-4 text-orange-500' />
								<div>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Search ID
									</p>
									<p className='text-sm font-mono text-gray-900 dark:text-white'>
										{results.searchId?.slice(-8)}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Action Buttons */}
				<div className='flex space-x-4 mb-4'>
					<Button
						onClick={handleSaveToDatabase}
						disabled={isSaving || isSaved}
						className='flex items-center space-x-2'>
						{isSaving ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							<Database className='h-4 w-4' />
						)}
						<span>
							{isSaving
								? "Saving..."
								: isSaved
								? "✅ Saved"
								: "Save to Database"}
						</span>
					</Button>

					<Button
						onClick={handleExportToSheets}
						disabled={isExporting}
						variant='outline'
						className='flex items-center space-x-2'>
						{isExporting ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							<Download className='h-4 w-4' />
						)}
						<span>
							{isExporting ? "Exporting..." : "Export to Google Sheets"}
						</span>
					</Button>

					<Button
						onClick={handleCsvExport}
						disabled={isExporting}
						variant='secondary'
						className='flex items-center space-x-2'>
						<Download className='h-4 w-4' />
						<span>Download CSV</span>
					</Button>
				</div>

				{/* Data Table */}
				<div className='flex-1 overflow-auto border rounded-lg'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-[300px]'>Project Title</TableHead>
								<TableHead>Owner</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Raised</TableHead>
								<TableHead>Goal</TableHead>
								<TableHead>Backers</TableHead>
								<TableHead>Progress</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{results.results.map((project, index) => (
								<TableRow key={project.id || index}>
									<TableCell className='font-medium'>
										<div className='max-w-[280px]'>
											<p className='font-semibold text-sm leading-tight text-gray-900 dark:text-white'>
												{project.title ||
													project.original_title ||
													"Unknown Project"}
											</p>
											{project.project_owner && (
												<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
													by {project.project_owner}
												</p>
											)}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900 dark:text-white'>
											{project.project_owner || "Unknown"}
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												project.status === "live" ? "default" : "secondary"
											}>
											{project.status || "Unknown"}
										</Badge>
									</TableCell>
									<TableCell>
										<div className='font-medium'>
											{project.amount || project.funded_amount || "$0"}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900 dark:text-white'>
											{project.support_amount || project.goal_amount || "$0"}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900 dark:text-white'>
											{project.supporters || project.backers_count || "0"}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900 dark:text-white'>
											{project.achievement_rate ||
												(project.percentage_funded
													? `${project.percentage_funded}%`
													: "0%")}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-xs text-gray-900 dark:text-white'>
											{project.location || project.owner_country || "Unknown"}
										</div>
									</TableCell>
									<TableCell>
										{project.url && (
											<Button
												variant='ghost'
												size='sm'
												onClick={() => window.open(project.url, "_blank")}>
												<ExternalLink className='h-3 w-3' />
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{/* Footer */}
				<div className='flex justify-between items-center pt-4 border-t'>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Showing {results.results.length} of {results.count} projects
					</p>
					<Button variant='outline' onClick={onClose}>
						Close
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
