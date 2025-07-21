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
  Search as SearchIcon,
  Download,
  Eye,
  Trash2,
  Calendar,
  ExternalLink,
  Filter,
  Globe,
  Users,
  Target,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Archive,
} from "lucide-react";

interface SavedDataItem {
  id: string;
  title: string;
  platform: string;
  spreadsheetUrl?: string;
  exportedAt?: string;
  createdAt: string;
  // Optionally, you can add more fields if your API provides them
  amount?: string;
  support_amount?: string;
  supporters?: string;
  achievement_rate?: string;
  status?: string;
  project_owner?: string;
  contact_info?: string;
  url?: string;
}

export function SavedDataComponent() {
  const [savedData, setSavedData] = useState<SavedDataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<SavedDataItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedData();
  }, []);

  const fetchSavedData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/save-data");
      const json = await res.json();
      setSavedData(Array.isArray(json.savedData) ? json.savedData : []);
    } catch (error) {
      console.error("Error fetching saved data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this export?")) return;
    setSavedData((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/save-data/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredData = savedData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform =
      platformFilter === "" || item.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getStatusIcon = (status?: string) => {
    switch ((status || "").toLowerCase()) {
      case "live":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "funded":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "ended":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch ((status || "").toLowerCase()) {
      case "live":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "funded":
        return "bg-green-100 text-green-800 border-green-200";
      case "ended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
                <SearchIcon className="h-4 w-4" />
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
                <option value="kickstarter">💡 Kickstarter</option>
                <option value="indiegogo">🚀 Indiegogo</option>
                <option value="makuake">🎌 Makuake</option>
                <option value="wadiz">🇰🇷 Wadiz</option>
                <option value="campfire">🔥 Campfire</option>
                <option value="flyingv">✈️ FlyingV</option>
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
                  {savedData.length > 0 ? Math.round((savedData.filter((item) => (item.status || item.achievement_rate || "").toLowerCase() === "funded").length / savedData.length) * 100) : 0}%
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
                <p className="text-3xl font-bold text-blue-900">
                  {/* Optionally, calculate average funding if you have the data */}
                  —
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Projects Grid */}
      {isLoading ? (
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
      ) : filteredData.length === 0 ? (
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
                    : "Start searching for projects to build your collection"}
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
                      {item.supporters && (
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {item.supporters} supporters
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(item.status)}`}
                  >
                    {getStatusIcon(item.status)}
                    {item.status || "—"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {item.spreadsheetUrl && (
                    <Button
                      onClick={() => window.open(item.spreadsheetUrl, "_blank")}
                      variant="outline"
                      className="flex-1 min-w-[120px] border-blue-300 hover:border-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Sheet
                    </Button>
                  )}
                  {item.spreadsheetUrl && (
                    <Button
                      onClick={() => handleCopy(item.spreadsheetUrl!, item.id)}
                      variant={copiedId === item.id ? "success" : "outline"}
                      className={`flex-1 min-w-[120px] ${copiedId === item.id ? "border-green-300 text-green-700" : "border-gray-300 hover:border-green-500 hover:text-green-600"}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {copiedId === item.id ? "Copied" : "Copy Link"}
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDetailModal(true);
                    }}
                    variant="outline"
                    className="flex-1 min-w-[120px] border-gray-300 hover:border-purple-500 hover:text-purple-600"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
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
                  <div className="text-2xl font-bold text-green-600">
                    {selectedItem.amount || "—"}
                  </div>
                  <div className="text-xs text-green-500 mt-1">Raised</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedItem.support_amount || "—"}
                  </div>
                  <div className="text-xs text-blue-500 mt-1">Goal</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedItem.supporters || "—"}
                  </div>
                  <div className="text-xs text-purple-500 mt-1">Backers</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">
                    {selectedItem.achievement_rate || "—"}
                  </div>
                  <div className="text-xs text-orange-500 mt-1">Progress</div>
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
                    <div
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedItem.status)}`}
                    >
                      {getStatusIcon(selectedItem.status)}
                      <span className="ml-1">{selectedItem.status || "—"}</span>
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
                  {selectedItem.project_owner && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <label className="text-sm font-medium text-gray-500">Project Owner</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedItem.project_owner}</p>
                    </div>
                  )}
                  {selectedItem.contact_info && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <label className="text-sm font-medium text-gray-500">Contact Information</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedItem.contact_info}</p>
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
                {selectedItem.spreadsheetUrl && (
                  <Button
                    onClick={() => handleCopy(selectedItem.spreadsheetUrl!, selectedItem.id)}
                    variant={copiedId === selectedItem.id ? "success" : "outline"}
                    className={`flex-1 min-w-[120px] ${copiedId === selectedItem.id ? "border-green-300 text-green-700" : "border-gray-300 hover:border-green-500 hover:text-green-600"}`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {copiedId === selectedItem.id ? "Copied" : "Copy Link"}
                  </Button>
                )}
                {selectedItem.url && (
                  <Button
                    onClick={() => window.open(selectedItem.url, "_blank")}
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
