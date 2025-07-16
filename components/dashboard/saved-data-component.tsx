"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Database,
	Search,
	Download,
	Eye,
	Trash2,
	Calendar,
	ExternalLink,
	Filter,
	Globe,
	DollarSign,
	Users,
	Target,
	Star,
	CheckCircle,
	Clock,
	XCircle,
	TrendingUp,
	Archive,
} from "lucide-react";

interface ProjectData {
	amount: string;
	support_amount: string;
	supporters: string;
	achievement_rate: string;
	status: string;
	project_owner?: string;
	contact_info?: string;
	url?: string;
}

interface SavedDataItem {
	id: string;
	title: string;
	platform: string;
	data: ProjectData;
	spreadsheetUrl?: string;
	createdAt: string;
}

export function SavedDataComponent() {
	const [savedData, setSavedData] = useState<SavedDataItem[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [platformFilter, setPlatformFilter] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [selectedItem, setSelectedItem] = useState<SavedDataItem | null>(null);
	const [showDetailModal, setShowDetailModal] = useState(false);

	useEffect(() => {
		fetchSavedData();
	}, []);

	const fetchSavedData = async () => {
		try {
			setIsLoading(true);
			// Simulate API call - replace with actual endpoint
			const mockData: SavedDataItem[] = [
				{
					id: "1",
					title: "Smart Fitness Tracker with AI Health Insights",
					platform: "Indiegogo",
					data: {
						amount: "$125,430",
						support_amount: "$50,000",
						supporters: "1,247",
						achievement_rate: "251%",
						status: "Live",
						project_owner: "TechHealth Inc.",
						contact_info: "contact@techhealth.com",
						url: "https://example.com/project1",
					},
					spreadsheetUrl: "https://docs.google.com/spreadsheets/d/example1",
					createdAt: "2024-01-15T10:30:00Z",
				},
				{
					id: "2",
					title: "Eco-Friendly Smart Water Bottle",
					platform: "Kickstarter",
					data: {
						amount: "$89,320",
						support_amount: "$75,000",
						supporters: "892",
						achievement_rate: "119%",
						status: "Funded",
						project_owner: "GreenTech Solutions",
						contact_info: "hello@greentech.com",
						url: "https://example.com/project2",
					},
					spreadsheetUrl: "https://docs.google.com/spreadsheets/d/example2",
					createdAt: "2024-01-14T15:45:00Z",
				},
				{
					id: "3",
					title: "Revolutionary Solar Panel Design",
					platform: "Makuake",
					data: {
						amount: "$200,150",
						support_amount: "$150,000",
						supporters: "2,453",
						achievement_rate: "133%",
						status: "Funded",
						project_owner: "Solar Innovations Ltd.",
						contact_info: "info@solarinnovations.com",
						url: "https://example.com/project3",
					},
					spreadsheetUrl: "https://docs.google.com/spreadsheets/d/example3",
					createdAt: "2024-01-13T09:20:00Z",
				},
			];
			await new Promise(resolve => setTimeout(resolve, 1000));
			setSavedData(mockData);
		} catch (error) {
			console.error("Error fetching saved data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const filteredData = savedData.filter(item => {
		const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.platform.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesPlatform = platformFilter === "" || item.platform === platformFilter;
		return matchesSearch && matchesPlatform;
	});

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this saved project?")) {
			setSavedData(savedData.filter(item => item.id !== id));
		}
	};

	const handleExport = async (item: SavedDataItem) => {
		// Simulate export functionality
		console.log("Exporting:", item.title);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case 'live': return <Clock className="h-4 w-4 text-blue-500" />;
			case 'funded': return <CheckCircle className="h-4 w-4 text-green-500" />;
			case 'ended': return <XCircle className="h-4 w-4 text-red-500" />;
			default: return <Clock className="h-4 w-4 text-gray-500" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'live': return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'funded': return 'bg-green-100 text-green-800 border-green-200';
			case 'ended': return 'bg-red-100 text-red-800 border-red-200';
			default: return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const getPlatformIcon = (platform: string) => {
		const icons: { [key: string]: string } = {
			indiegogo: "🚀",
			kickstarter: "💡",
			makuake: "🎌",
			wadiz: "🇰🇷",
			campfire: "🔥",
			flyingv: "✈️",
		};
		return icons[platform.toLowerCase()] || "🌟";
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="text-center space-y-4">
					<div className="relative">
						<div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
						<Database className="h-6 w-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Loading Saved Data</h3>
						<p className="text-gray-600">Retrieving your saved projects...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Enhanced Header */}
			<div className="text-center space-y-4">
				<div className="flex items-center justify-center gap-3">
					<div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
						<Archive className="h-8 w-8 text-white" />
					</div>
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
							Saved Projects
						</h1>
						<p className="text-lg text-gray-600 mt-2">
							Manage and explore your saved crowdfunding projects
						</p>
					</div>
				</div>
			</div>

			{/* Enhanced Filters */}
			<Card className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
				<CardHeader className="pb-4">
					<CardTitle className="flex items-center gap-2 text-xl">
						<Filter className="h-5 w-5 text-blue-600" />
						Search & Filter
					</CardTitle>
					<CardDescription>
						Find specific projects from your saved collection
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1">
							<label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
								<Search className="h-4 w-4" />
								Search Projects
							</label>
							<Input
								type="text"
								placeholder="Search by title or platform..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
							/>
						</div>
						<div className="sm:w-64">
							<label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
								<Globe className="h-4 w-4" />
								Platform Filter
							</label>
							<select
								value={platformFilter}
								onChange={(e) => setPlatformFilter(e.target.value)}
								className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
							>
								<option value="">🌟 All Platforms</option>
								<option value="Indiegogo">🚀 Indiegogo</option>
								<option value="Kickstarter">💡 Kickstarter</option>
								<option value="Makuake">🎌 Makuake</option>
								<option value="Wadiz">🇰🇷 Wadiz</option>
								<option value="Campfire">🔥 Campfire</option>
								<option value="FlyingV">✈️ FlyingV</option>
							</select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-purple-500 rounded-xl">
								<Database className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm font-medium text-purple-700">Total Saved</p>
								<p className="text-3xl font-bold text-purple-900">{savedData.length}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				
				<Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-green-500 rounded-xl">
								<TrendingUp className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm font-medium text-green-700">Success Rate</p>
								<p className="text-3xl font-bold text-green-900">
									{Math.round((savedData.filter(item => item.data.status === 'Funded').length / savedData.length) * 100)}%
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				
				<Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-500 rounded-xl">
								<Star className="h-6 w-6 text-white" />
							</div>
							<div>
								<p className="text-sm font-medium text-blue-700">Avg. Funding</p>
								<p className="text-3xl font-bold text-blue-900">$138K</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Enhanced Projects Grid */}
			{filteredData.length === 0 ? (
				<Card className="shadow-lg border-0">
					<CardContent className="text-center py-12">
						<div className="space-y-4">
							<div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
								<Database className="h-12 w-12 text-gray-400" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900">No Projects Found</h3>
								<p className="text-gray-600 mt-2">
									{searchTerm || platformFilter 
										? "Try adjusting your search or filter criteria"
										: "Start searching for projects to build your collection"
									}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6">
					{filteredData.map((item) => (
						<Card 
							key={item.id} 
							className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-all duration-200"
						>
							<CardContent className="p-6">
								<div className="flex justify-between items-start mb-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="text-2xl">{getPlatformIcon(item.platform)}</span>
											<h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
										</div>
										<div className="flex items-center gap-4 text-sm text-gray-600">
											<span className="flex items-center gap-1">
												<Globe className="h-4 w-4" />
												{item.platform}
											</span>
											<span className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												{formatDate(item.createdAt)}
											</span>
											<span className="flex items-center gap-1">
												<Users className="h-4 w-4" />
												{item.data.supporters} supporters
											</span>
										</div>
									</div>
									<div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(item.data.status)}`}>
										{getStatusIcon(item.data.status)}
										{item.data.status}
									</div>
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
									<div className="text-center p-4 bg-green-50 rounded-xl">
										<div className="text-2xl font-bold text-green-600">{item.data.amount}</div>
										<div className="text-xs text-green-500 mt-1">Raised</div>
									</div>
									<div className="text-center p-4 bg-blue-50 rounded-xl">
										<div className="text-2xl font-bold text-blue-600">{item.data.support_amount}</div>
										<div className="text-xs text-blue-500 mt-1">Goal</div>
									</div>
									<div className="text-center p-4 bg-purple-50 rounded-xl">
										<div className="text-2xl font-bold text-purple-600">{item.data.supporters}</div>
										<div className="text-xs text-purple-500 mt-1">Backers</div>
									</div>
									<div className="text-center p-4 bg-orange-50 rounded-xl">
										<div className="text-2xl font-bold text-orange-600">{item.data.achievement_rate}</div>
										<div className="text-xs text-orange-500 mt-1">Progress</div>
									</div>
								</div>

								<div className="flex flex-wrap gap-3">
									<Button
										onClick={() => {
											setSelectedItem(item);
											setShowDetailModal(true);
										}}
										variant="outline"
										className="flex-1 min-w-[120px] border-gray-300 hover:border-blue-500 hover:text-blue-600"
									>
										<Eye className="h-4 w-4 mr-2" />
										View Details
									</Button>
									<Button
										onClick={() => handleExport(item)}
										variant="outline"
										className="flex-1 min-w-[120px] border-gray-300 hover:border-green-500 hover:text-green-600"
									>
										<Download className="h-4 w-4 mr-2" />
										Export
									</Button>
									{item.data.url && (
										<Button
											onClick={() => window.open(item.data.url, '_blank')}
											variant="outline"
											className="flex-1 min-w-[120px] border-gray-300 hover:border-purple-500 hover:text-purple-600"
										>
											<ExternalLink className="h-4 w-4 mr-2" />
											Visit Project
										</Button>
									)}
									<Button
										onClick={() => handleDelete(item.id)}
										variant="outline"
										className="border-red-300 text-red-600 hover:border-red-500 hover:bg-red-50"
									>
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Enhanced Detail Modal */}
			{showDetailModal && selectedItem && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
							<div className="flex justify-between items-start">
								<div className="flex items-center gap-3">
									<span className="text-3xl">{getPlatformIcon(selectedItem.platform)}</span>
									<div>
										<h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
										<p className="text-gray-600 mt-1">Detailed project information</p>
									</div>
								</div>
								<Button
									onClick={() => setShowDetailModal(false)}
									variant="ghost"
									className="text-gray-500 hover:text-gray-700"
								>
									<XCircle className="h-6 w-6" />
								</Button>
							</div>
						</div>
						
						<div className="p-6 space-y-6">
							{/* Project Metrics */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
									<DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
									<div className="text-2xl font-bold text-green-600">{selectedItem.data.amount}</div>
									<div className="text-sm text-green-500">Amount Raised</div>
								</div>
								<div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
									<Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
									<div className="text-2xl font-bold text-blue-600">{selectedItem.data.support_amount}</div>
									<div className="text-sm text-blue-500">Funding Goal</div>
								</div>
								<div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
									<Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
									<div className="text-2xl font-bold text-purple-600">{selectedItem.data.supporters}</div>
									<div className="text-sm text-purple-500">Supporters</div>
								</div>
								<div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
									<Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
									<div className="text-2xl font-bold text-orange-600">{selectedItem.data.achievement_rate}</div>
									<div className="text-sm text-orange-500">Achievement</div>
								</div>
							</div>

							{/* Project Details */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div className="p-4 bg-gray-50 rounded-xl">
										<label className="text-sm font-medium text-gray-500">Platform</label>
										<p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
											<Globe className="h-5 w-5" />
											{selectedItem.platform}
										</p>
									</div>
									<div className="p-4 bg-gray-50 rounded-xl">
										<label className="text-sm font-medium text-gray-500">Status</label>
										<div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedItem.data.status)}`}>
											{getStatusIcon(selectedItem.data.status)}
											<span className="ml-1">{selectedItem.data.status}</span>
										</div>
									</div>
									<div className="p-4 bg-gray-50 rounded-xl">
										<label className="text-sm font-medium text-gray-500">Saved Date</label>
										<p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
											<Calendar className="h-5 w-5" />
											{formatDate(selectedItem.createdAt)}
										</p>
									</div>
								</div>
								
								<div className="space-y-4">
									{selectedItem.data.project_owner && (
										<div className="p-4 bg-gray-50 rounded-xl">
											<label className="text-sm font-medium text-gray-500">Project Owner</label>
											<p className="text-lg font-semibold text-gray-900">{selectedItem.data.project_owner}</p>
										</div>
									)}
									{selectedItem.data.contact_info && (
										<div className="p-4 bg-gray-50 rounded-xl">
											<label className="text-sm font-medium text-gray-500">Contact Information</label>
											<p className="text-lg font-semibold text-gray-900">{selectedItem.data.contact_info}</p>
										</div>
									)}
									{selectedItem.spreadsheetUrl && (
										<div className="p-4 bg-gray-50 rounded-xl">
											<label className="text-sm font-medium text-gray-500">Google Sheets</label>
											<a 
												href={selectedItem.spreadsheetUrl} 
												target="_blank" 
												rel="noopener noreferrer"
												className="text-lg font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2"
											>
												<ExternalLink className="h-5 w-5" />
												View Spreadsheet
											</a>
										</div>
									)}
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-4 pt-4 border-t border-gray-200">
								<Button
									onClick={() => handleExport(selectedItem)}
									className="flex-1 bg-green-600 hover:bg-green-700"
								>
									<Download className="h-4 w-4 mr-2" />
									Export to Sheets
								</Button>
								{selectedItem.data.url && (
									<Button
										onClick={() => window.open(selectedItem.data.url, '_blank')}
										className="flex-1 bg-blue-600 hover:bg-blue-700"
									>
										<ExternalLink className="h-4 w-4 mr-2" />
										Visit Project
									</Button>
								)}
								<Button
									onClick={() => handleDelete(selectedItem.id)}
									variant="outline"
									className="border-red-300 text-red-600 hover:border-red-500 hover:bg-red-50"
								>
									<Trash2 className="h-4 w-4 mr-2" />
									Delete
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
