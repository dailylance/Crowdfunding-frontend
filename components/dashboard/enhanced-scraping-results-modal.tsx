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
				// Show success notification with better UI
				const notification = document.createElement("div");
				notification.innerHTML = `
					<div style="
						position: fixed; 
						top: 20px; 
						right: 20px; 
						background: linear-gradient(135deg, #10B981, #059669); 
						color: white; 
						padding: 16px 24px; 
						border-radius: 12px; 
						box-shadow: 0 10px 25px rgba(0,0,0,0.15);
						z-index: 10000;
						font-family: system-ui;
						max-width: 400px;
					">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
							<span style="font-size: 20px;">✅</span>
							<strong>Google Sheets Export Successful!</strong>
						</div>
						<div style="font-size: 14px; opacity: 0.9;">
							📊 ${results.count} projects exported to: ${
					data.spreadsheet?.title || "Google Sheets"
				}<br>
							🔗 Opening spreadsheet in new tab...
						</div>
					</div>
				`;
				document.body.appendChild(notification);

				if (data.sheetUrl) {
					window.open(data.sheetUrl, "_blank");
				}

				// Remove notification after 5 seconds
				setTimeout(() => {
					if (notification.parentNode) {
						notification.parentNode.removeChild(notification);
					}
				}, 5000);
			} else {
				// Show specific error message with better styling
				const errorMessage = data.message || "Google Sheets export failed";
				const notification = document.createElement("div");
				notification.innerHTML = `
					<div style="
						position: fixed; 
						top: 20px; 
						right: 20px; 
						background: linear-gradient(135deg, #F59E0B, #D97706); 
						color: white; 
						padding: 16px 24px; 
						border-radius: 12px; 
						box-shadow: 0 10px 25px rgba(0,0,0,0.15);
						z-index: 10000;
						font-family: system-ui;
						max-width: 400px;
					">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
							<span style="font-size: 20px;">⚠️</span>
							<strong>Google Sheets Export Failed</strong>
						</div>
						<div style="font-size: 14px; opacity: 0.9;">
							${errorMessage}<br><br>
							📥 Downloading as CSV file instead...
						</div>
					</div>
				`;
				document.body.appendChild(notification);

				console.log("Google Sheets export failed, falling back to CSV");

				// Remove notification after 6 seconds
				setTimeout(() => {
					if (notification.parentNode) {
						notification.parentNode.removeChild(notification);
					}
				}, 6000);
				await handleCsvExport();
			}
		} catch (error) {
			console.error("Export error:", error);

			// Show network error notification
			const notification = document.createElement("div");
			notification.innerHTML = `
				<div style="
					position: fixed; 
					top: 20px; 
					right: 20px; 
					background: linear-gradient(135deg, #EF4444, #DC2626); 
					color: white; 
					padding: 16px 24px; 
					border-radius: 12px; 
					box-shadow: 0 10px 25px rgba(0,0,0,0.15);
					z-index: 10000;
					font-family: system-ui;
					max-width: 400px;
				">
					<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
						<span style="font-size: 20px;">❌</span>
						<strong>Export Connection Error</strong>
					</div>
					<div style="font-size: 14px; opacity: 0.9;">
						Unable to connect to export service.<br><br>
						📥 Downloading as CSV file instead...
					</div>
				</div>
			`;
			document.body.appendChild(notification);

			// Remove notification after 6 seconds
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification);
				}
			}, 6000);

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

				// Show success notification for CSV download
				const notification = document.createElement("div");
				notification.innerHTML = `
					<div style="
						position: fixed; 
						top: 20px; 
						right: 20px; 
						background: linear-gradient(135deg, #6366F1, #4F46E5); 
						color: white; 
						padding: 16px 24px; 
						border-radius: 12px; 
						box-shadow: 0 10px 25px rgba(0,0,0,0.15);
						z-index: 10000;
						font-family: system-ui;
						max-width: 400px;
					">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
							<span style="font-size: 20px;">📁</span>
							<strong>CSV Downloaded Successfully!</strong>
						</div>
						<div style="font-size: 14px; opacity: 0.9;">
							${results.count} projects exported as CSV file.<br>
							💡 You can import it to Google Sheets manually.
						</div>
					</div>
				`;
				document.body.appendChild(notification);

				// Remove notification after 5 seconds
				setTimeout(() => {
					if (notification.parentNode) {
						notification.parentNode.removeChild(notification);
					}
				}, 5000);
			} else {
				throw new Error("CSV export failed");
			}
		} catch (error) {
			console.error("CSV export error:", error);

			// Show error notification for CSV export
			const notification = document.createElement("div");
			notification.innerHTML = `
				<div style="
					position: fixed; 
					top: 20px; 
					right: 20px; 
					background: linear-gradient(135deg, #EF4444, #DC2626); 
					color: white; 
					padding: 16px 24px; 
					border-radius: 12px; 
					box-shadow: 0 10px 25px rgba(0,0,0,0.15);
					z-index: 10000;
					font-family: system-ui;
					max-width: 400px;
				">
					<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
						<span style="font-size: 20px;">❌</span>
						<strong>Export Failed</strong>
					</div>
					<div style="font-size: 14px; opacity: 0.9;">
						Unable to export data. Please try again later.
					</div>
				</div>
			`;
			document.body.appendChild(notification);

			// Remove notification after 5 seconds
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification);
				}
			}, 5000);
		}
	};

	if (!results) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-7xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-2xl'>
				<DialogHeader className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg -m-6 mb-6 p-6'>
					<DialogTitle className='flex items-center space-x-3 text-xl'>
						<Database className='h-6 w-6' />
						<span>Scraped Results - {results.platform}</span>
					</DialogTitle>
					<DialogDescription className='text-blue-100 text-base'>
						Found {results.count} projects for &ldquo;{results.keyword}&rdquo;
						on {results.platform}
					</DialogDescription>
				</DialogHeader>

				{/* Summary Cards */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-6'>
					<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
						<CardContent className='p-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-3 bg-blue-100 rounded-lg'>
									<Database className='h-6 w-6 text-blue-600' />
								</div>
								<div>
									<p className='text-sm text-gray-600 font-medium'>
										Total Projects
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{results.count}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
						<CardContent className='p-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-3 bg-green-100 rounded-lg'>
									<DollarSign className='h-6 w-6 text-green-600' />
								</div>
								<div>
									<p className='text-sm text-gray-600 font-medium'>Platform</p>
									<p className='text-2xl font-bold capitalize text-gray-900'>
										{results.platform}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
						<CardContent className='p-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-3 bg-purple-100 rounded-lg'>
									<Users className='h-6 w-6 text-purple-600' />
								</div>
								<div>
									<p className='text-sm text-gray-600 font-medium'>
										Search Term
									</p>
									<p className='text-lg font-semibold text-gray-900'>
										{results.keyword}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
						<CardContent className='p-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-3 bg-orange-100 rounded-lg'>
									<CheckCircle className='h-6 w-6 text-orange-600' />
								</div>
								<div>
									<p className='text-sm text-gray-600 font-medium'>Search ID</p>
									<p className='text-sm font-mono text-gray-900'>
										{results.searchId?.slice(-8)}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Action Buttons */}
				<div className='flex space-x-4 mb-6'>
					<Button
						onClick={handleSaveToDatabase}
						disabled={isSaving || isSaved}
						className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
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
						className='flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300'>
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
						className='flex items-center space-x-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300'>
						<Download className='h-4 w-4' />
						<span>Download CSV</span>
					</Button>
				</div>

				{/* Data Table */}
				<div className='flex-1 overflow-auto border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg'>
					<Table>
						<TableHeader>
							<TableRow className='bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
								<TableHead className='w-[300px] text-gray-800 font-semibold'>
									Project Title
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Owner
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Status
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Raised
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Goal
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Backers
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Progress
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Location
								</TableHead>
								<TableHead className='text-gray-800 font-semibold'>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{results.results.map((project, index) => (
								<TableRow
									key={project.id || index}
									className='border-b border-gray-100 hover:bg-gray-50/50 transition-colors'>
									<TableCell className='font-medium'>
										<div className='max-w-[280px]'>
											<p className='font-semibold text-sm leading-tight text-gray-900'>
												{project.title ||
													project.original_title ||
													"Unknown Project"}
											</p>
											{project.project_owner && (
												<p className='text-xs text-gray-600 mt-1'>
													by {project.project_owner}
												</p>
											)}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900'>
											{project.project_owner || "Unknown"}
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												project.status === "live" ? "default" : "secondary"
											}
											className={
												project.status === "successful"
													? "bg-green-100 text-green-800 border-green-300"
													: project.status === "live"
													? "bg-blue-100 text-blue-800 border-blue-300"
													: "bg-gray-100 text-gray-800 border-gray-300"
											}>
											{project.status || "Unknown"}
										</Badge>
									</TableCell>
									<TableCell>
										<div className='font-medium text-green-600'>
											{project.amount || project.funded_amount || "$0"}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900'>
											{project.support_amount || project.goal_amount || "$0"}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-gray-900'>
											{project.supporters || project.backers_count || "0"}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-sm font-medium text-purple-600'>
											{project.achievement_rate ||
												(project.percentage_funded
													? `${project.percentage_funded}%`
													: "0%")}
										</div>
									</TableCell>
									<TableCell>
										<div className='text-xs text-gray-700'>
											{project.location || project.owner_country || "Unknown"}
										</div>
									</TableCell>
									<TableCell>
										{project.url && (
											<Button
												variant='ghost'
												size='sm'
												onClick={() => window.open(project.url, "_blank")}
												className='text-blue-600 hover:text-blue-700 hover:bg-blue-50'>
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
				<div className='flex justify-between items-center pt-6 border-t border-gray-200 bg-white/50'>
					<p className='text-sm text-gray-600 font-medium'>
						Showing {results.results.length} of {results.count} projects
					</p>
					<Button
						variant='outline'
						onClick={onClose}
						className='border-gray-200 text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300'>
						Close
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
