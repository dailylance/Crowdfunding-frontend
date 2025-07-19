"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Save,
	Download,
	ExternalLink,
	Loader2,
	CheckCircle,
	Eye,
	EyeOff,
} from "lucide-react";
// import { toast } from "react-hot-toast";

interface ScrapedProject {
	id?: string;
	title: string;
	description?: string;
	url?: string;
	imageUrl?: string;
	raised?: string;
	goal?: string;
	backers?: string;
	daysLeft?: string;
	startDate?: string;
	endDate?: string;
	originalData?: Record<string, unknown>;
	ocrData?: Record<string, unknown>;
	nlpData?: Record<string, unknown>;
	isRelevant?: boolean;
}

interface ScrapingResults {
	success: boolean;
	platform: string;
	category?: string;
	keyword?: string;
	count: number;
	results: Record<string, unknown>[];
	searchId?: string;
}

interface ScrapingResultsModalProps {
	isOpen: boolean;
	onClose: () => void;
	results: ScrapingResults | null;
	onDataSaved?: () => void;
}

export function ScrapingResultsModal({
	isOpen,
	onClose,
	results,
	onDataSaved,
}: ScrapingResultsModalProps) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [scrapedData, setScrapedData] = useState<ScrapedProject[]>([]);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [exporting, setExporting] = useState(false);
	const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

	const loadScrapedData = useCallback(async () => {
		if (!results?.searchId) return;

		try {
			setLoading(true);
			const response = await fetch(`/api/scraping/data/${results.searchId}`);
			const data = await response.json();

			if (data.success) {
				setScrapedData(data.data);
			} else {
				console.error("Failed to load detailed data");
			}
		} catch (error) {
			console.error("Error loading scraped data:", error);
		} finally {
			setLoading(false);
		}
	}, [results?.searchId]);

	// Load detailed scraped data when modal opens
	useEffect(() => {
		if (isOpen && results?.searchId) {
			loadScrapedData();
		}
	}, [isOpen, results?.searchId, loadScrapedData]);

	// Reset state when modal closes
	useEffect(() => {
		if (!isOpen) {
			setSelectedItems([]);
			setScrapedData([]);
			setShowDetails({});
		}
	}, [isOpen]);

	const handleSelectAll = () => {
		if (selectedItems.length === scrapedData.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(scrapedData.map((_, index) => index.toString()));
		}
	};

	const handleSelectItem = (index: string) => {
		setSelectedItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const handleSaveToDatabase = async () => {
		if (selectedItems.length === 0) {
			alert("Please select items to save");
			return;
		}

		try {
			setSaving(true);
			const selectedData = selectedItems.map(
				(index) => scrapedData[parseInt(index)]
			);

			const scrapedDataIds = selectedData
				.map((item) => item.id)
				.filter((id) => id !== undefined);

			const response = await fetch("/api/scraping/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					scrapedDataIds,
				}),
			});

			const result = await response.json();

			if (result.success) {
				alert(`Successfully saved ${selectedItems.length} items`);
				onDataSaved?.();
			} else {
				alert(result.message || "Failed to save data");
			}
		} catch (error) {
			console.error("Error saving data:", error);
			alert("Failed to save data");
		} finally {
			setSaving(false);
		}
	};

	const handleExportToExcel = async () => {
		if (selectedItems.length === 0) {
			alert("Please select items to export");
			return;
		}

		try {
			const selectedData = selectedItems.map(
				(index) => scrapedData[parseInt(index)]
			);

			// Prepare data for export
			const exportData = selectedData.map((item) => ({
				Title: item.title,
				Description: item.description || "",
				Platform: results?.platform || "",
				Category: results?.category || "",
				Keyword: results?.keyword || "",
				URL: item.url || "",
				Raised: item.raised || "",
				Goal: item.goal || "",
				Backers: item.backers || "",
				"Days Left": item.daysLeft || "",
				"Start Date": item.startDate || "",
				"End Date": item.endDate || "",
			}));

			// Convert to CSV and download
			const csvContent = convertToCSV(exportData);
			const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

			const link = document.createElement("a");
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", `crowdfunding_data_${Date.now()}.csv`);
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			alert("Data exported successfully");
		} catch (error) {
			console.error("Error exporting data:", error);
			alert("Failed to export data");
		}
	};

	const handleExportToGoogleSheets = async () => {
		if (selectedItems.length === 0) {
			alert("Please select items to export");
			return;
		}

		try {
			setExporting(true);
			const selectedData = selectedItems.map(
				(index) => scrapedData[parseInt(index)]
			);

			const scrapedDataIds = selectedData
				.map((item) => item.id)
				.filter((id) => id !== undefined);

			const response = await fetch("/api/scraping/export/sheets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					scrapedDataIds,
				}),
			});

			const result = await response.json();

			if (result.success) {
				alert("Successfully exported to Google Sheets");
				if (result.spreadsheetUrl) {
					window.open(result.spreadsheetUrl, "_blank");
				}
			} else {
				alert(result.message || "Failed to export to Google Sheets");
			}
		} catch (error) {
			console.error("Error exporting to Google Sheets:", error);
			alert("Failed to export to Google Sheets");
		} finally {
			setExporting(false);
		}
	};

	const convertToCSV = (data: Record<string, unknown>[]): string => {
		if (!data || data.length === 0) return "";

		const headers = Object.keys(data[0]);
		const csvHeaders = headers.join(",");

		const csvRows = data.map((row) =>
			headers
				.map((header) => {
					const value = row[header];
					if (
						typeof value === "string" &&
						(value.includes(",") || value.includes('"'))
					) {
						return `"${value.replace(/"/g, '""')}"`;
					}
					return value || "";
				})
				.join(",")
		);

		return [csvHeaders, ...csvRows].join("\n");
	};

	const toggleDetails = (index: string) => {
		setShowDetails((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	if (!results) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-6xl max-h-[90vh]'>
				<DialogHeader>
					<DialogTitle className='flex items-center space-x-2'>
						<CheckCircle className='h-5 w-5 text-green-500' />
						<span>Scraping Results</span>
					</DialogTitle>
					<DialogDescription>
						Found {results.count} results from {results.platform}
						{results.keyword && ` for "${results.keyword}"`}
						{results.category && ` in ${results.category}`}
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					{/* Summary */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<Badge variant='outline'>{results.platform}</Badge>
							{results.category && (
								<Badge variant='secondary'>{results.category}</Badge>
							)}
							<span className='text-sm text-gray-600'>
								{selectedItems.length} of {scrapedData.length} selected
							</span>
						</div>

						<Button variant='outline' size='sm' onClick={handleSelectAll}>
							{selectedItems.length === scrapedData.length
								? "Deselect All"
								: "Select All"}
						</Button>
					</div>

					{/* Data Table */}
					<ScrollArea className='h-[500px] border rounded-md'>
						{loading ? (
							<div className='flex items-center justify-center py-8'>
								<Loader2 className='h-6 w-6 animate-spin' />
								<span className='ml-2'>Loading detailed data...</span>
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-12'>Select</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>Platform</TableHead>
										<TableHead>Raised</TableHead>
										<TableHead>Goal</TableHead>
										<TableHead>Backers</TableHead>
										<TableHead>Days Left</TableHead>
										<TableHead className='w-12'>Details</TableHead>
										<TableHead className='w-12'>Link</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{scrapedData.map((item, index) => (
										<React.Fragment key={index}>
											<TableRow>
												<TableCell>
													<Checkbox
														checked={selectedItems.includes(index.toString())}
														onCheckedChange={() =>
															handleSelectItem(index.toString())
														}
													/>
												</TableCell>
												<TableCell className='font-medium'>
													<div className='max-w-xs truncate' title={item.title}>
														{item.title}
													</div>
												</TableCell>
												<TableCell>{results.platform}</TableCell>
												<TableCell>{item.raised || "N/A"}</TableCell>
												<TableCell>{item.goal || "N/A"}</TableCell>
												<TableCell>{item.backers || "N/A"}</TableCell>
												<TableCell>
													{item.daysLeft ? (
														<Badge
															variant={
																parseInt(item.daysLeft) > 0
																	? "default"
																	: "destructive"
															}>
															{item.daysLeft} days
														</Badge>
													) : (
														"N/A"
													)}
												</TableCell>
												<TableCell>
													<Button
														variant='ghost'
														size='sm'
														onClick={() => toggleDetails(index.toString())}>
														{showDetails[index.toString()] ? (
															<EyeOff className='h-4 w-4' />
														) : (
															<Eye className='h-4 w-4' />
														)}
													</Button>
												</TableCell>
												<TableCell>
													{item.url && (
														<Button
															variant='ghost'
															size='sm'
															onClick={() => window.open(item.url, "_blank")}>
															<ExternalLink className='h-4 w-4' />
														</Button>
													)}
												</TableCell>
											</TableRow>
											{showDetails[index.toString()] && (
												<TableRow>
													<TableCell
														colSpan={9}
														className='bg-gray-50 dark:bg-gray-800'>
														<div className='p-4 space-y-2'>
															{item.description && (
																<div>
																	<strong>Description:</strong>{" "}
																	{item.description}
																</div>
															)}
															{item.imageUrl && (
																<div>
																	<strong>Image:</strong>{" "}
																	<a
																		href={item.imageUrl}
																		target='_blank'
																		rel='noopener noreferrer'
																		className='text-blue-500 hover:underline'>
																		View Image
																	</a>
																</div>
															)}
															{(item.startDate || item.endDate) && (
																<div>
																	<strong>Duration:</strong>{" "}
																	{item.startDate && `From ${item.startDate}`}
																	{item.startDate && item.endDate && " "}
																	{item.endDate && `To ${item.endDate}`}
																</div>
															)}
															{item.ocrData && (
																<div>
																	<Badge variant='outline'>OCR Enhanced</Badge>
																</div>
															)}
															{item.nlpData && (
																<div>
																	<Badge variant='outline'>NLP Processed</Badge>
																</div>
															)}
														</div>
													</TableCell>
												</TableRow>
											)}
										</React.Fragment>
									))}
								</TableBody>
							</Table>
						)}
					</ScrollArea>
				</div>

				<DialogFooter className='flex justify-between'>
					<div className='flex space-x-2'>
						<Button
							variant='outline'
							onClick={handleExportToExcel}
							disabled={selectedItems.length === 0}>
							<Download className='mr-2 h-4 w-4' />
							Export to Excel
						</Button>
						<Button
							variant='outline'
							onClick={handleExportToGoogleSheets}
							disabled={selectedItems.length === 0 || exporting}>
							{exporting ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<ExternalLink className='mr-2 h-4 w-4' />
							)}
							Export to Sheets
						</Button>
					</div>

					<div className='flex space-x-2'>
						<Button variant='outline' onClick={onClose}>
							Close
						</Button>
						<Button
							onClick={handleSaveToDatabase}
							disabled={selectedItems.length === 0 || saving}>
							{saving ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<Save className='mr-2 h-4 w-4' />
							)}
							Save to Database
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
