"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Search,
  Database,
  FileDown,
  Bot,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Eye,
  CheckCircle,
  Star,
  Globe,
  Sparkles,
  Play,
  BarChart3,
  ArrowRight,
  Check,
  Languages,
  Image,
  Brain,
  Target,
  BarChart,
  Download,
  Upload,
  Filter,
  History,
  Bookmark,
  Share2,
  Settings,
  Lock,
  Clock,
  RefreshCw,
} from "lucide-react";
import { StatsSection } from "./stats-section";
import { TestimonialsSection } from "./testimonials-section";

export function LandingPage() {
	return (
		<div className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50/30">
        {/* Hero Section */}
        <section
          id="home"
          className="relative pt-20 pb-32 overflow-hidden scroll-mt-24"
        >
          {/* Background decoration */}
          <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E2E8F0" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-xl animate-enhanced-float"></div>
          <div
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-blue-500/20 rounded-full blur-xl animate-enhanced-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-xl animate-enhanced-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-soft">
                <Sparkles className="w-4 h-4" />
                AI-Powered Crowdfunding Analytics Platform
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-slate-900 leading-tight">
                Extract{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Real Data
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                  From 9+ Crowdfunding Platforms
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                Advanced web scraping with OCR/NLP enhancement. Extract
                comprehensive data from Kickstarter, Indiegogo, Makuake, Wadiz,
                and more with AI-powered accuracy and automated exports.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/auth/signup">
                  <Button
                    variant="gradient"
                    size="xl"
                    className="text-lg px-12 py-5 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Globe className="w-6 h-6 mr-3" />
                    Start Scraping
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="xl"
                  className="text-lg px-12 py-5 border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 font-semibold rounded-2xl transition-all duration-300"
                >
                  <Play className="w-6 h-6 mr-3" />
                  View Demo
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    9+
                  </div>
                  <div className="text-sm text-slate-600">
                    Platforms Supported
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    AI
                  </div>
                  <div className="text-sm text-slate-600">
                    OCR + NLP Enhancement
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-slate-600">Data Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600 mb-1">
                    Auto
                  </div>
                  <div className="text-sm text-slate-600">Export to Sheets</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-white/80 backdrop-blur-sm scroll-mt-24"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-soft">
                <Zap className="w-4 h-4" />
                Real Platform Capabilities
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                What We Actually
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Provide
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive crowdfunding data extraction with AI enhancement
                and automated workflows
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <Card className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    Multi-Platform Scraping
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    Extract data from 9+ platforms: Kickstarter, Indiegogo,
                    Makuake, Wadiz, Campfire, FlyingV, GreenFunding, ZecZec, and
                    Machiya with category-based filtering.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    AI OCR + NLP Enhancement
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    Advanced OCR extracts missing data from project images. NLP
                    processes text to extract creator info, funding details,
                    dates, and contact information.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Languages className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    Multi-Language Support
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    Automatic translation for Japanese, Korean, Chinese, and
                    English. OCR supports multiple Asian languages with
                    specialized preprocessing.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    Automated Export
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    One-click export to Google Sheets with automatic formatting.
                    CSV downloads and selective data export with saved
                    spreadsheet URLs.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    Real-Time Analytics
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    Track success rates, funding averages, platform
                    distribution, and category trends with interactive charts
                    and performance metrics.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    User-Specific Data
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    Secure user isolation with individual data storage. Search
                    history, saved projects, and personal analytics with full
                    audit trails.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Platform Support */}
            <div id="platforms" className="text-center mb-16 scroll-mt-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">
                Supported{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Platforms
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
                {[
                  { name: "Kickstarter", region: "Global" },
                  { name: "Indiegogo", region: "Global" },
                  { name: "Makuake", region: "Japan" },
                  { name: "Wadiz", region: "Korea" },
                  { name: "Campfire", region: "Japan" },
                  { name: "FlyingV", region: "Taiwan" },
                  { name: "GreenFunding", region: "Japan" },
                  { name: "ZecZec", region: "Taiwan" },
                  { name: "Machi-ya", region: "Japan" },
                ].map((platform) => (
                  <div
                    key={platform.name}
                    className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-lg font-semibold text-slate-900">
                      {platform.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {platform.region}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Extraction Details */}
            <div
              id="data-extraction"
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 mb-16 scroll-mt-24"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Comprehensive Data Extraction
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    Basic Scraping Data
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Project title and description
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Funding amounts and goals
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Backer counts and achievement rates
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Project URLs and images
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Category and platform information
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    AI-Enhanced Data (OCR/NLP)
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Creator/owner information
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Contact details and websites
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Social media links
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Campaign start/end dates
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Confidence scores for accuracy
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <div id="stats" className="scroll-mt-24">
          <StatsSection />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="scroll-mt-24">
          <TestimonialsSection />
        </div>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-24 bg-white/80 backdrop-blur-sm scroll-mt-24"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                Simple{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Pricing
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose the plan that fits your research needs. All plans include
                our core scraping and AI enhancement features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    Starter
                  </CardTitle>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    $29<span className="text-lg text-slate-600">/month</span>
                  </div>
                  <CardDescription className="text-slate-600">
                    Perfect for individual researchers and small teams
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      1,000 searches per month
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      All 9+ platforms supported
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      Basic OCR enhancement
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">Google Sheets export</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      Search history tracking
                    </span>
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    Professional
                  </CardTitle>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    $99<span className="text-lg text-slate-600">/month</span>
                  </div>
                  <CardDescription className="text-slate-600">
                    Ideal for growing businesses and research teams
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      10,000 searches per month
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      Advanced AI NLP processing
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      Multi-language OCR support
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      Advanced analytics dashboard
                    </span>
                  </div>
                  <Button variant="gradient" className="w-full mt-6">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    Enterprise
                  </CardTitle>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    Custom
                  </div>
                  <CardDescription className="text-slate-600">
                    For large organizations with custom requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">Unlimited searches</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">
                      Custom platform integration
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">Dedicated support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">SLA guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-slate-700">API access</span>
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
          {/* Background decoration */}
          <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40'></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Extract Real
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Crowdfunding Data?
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join researchers and businesses who trust our AI-powered
                platform for comprehensive crowdfunding analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="text-lg px-12 py-5 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Star className="w-6 h-6 mr-3" />
                    Start Free Trial
                  </Button>
                </Link>
                <Button
                  variant="glass"
                  size="xl"
                  className="text-lg px-12 py-5 font-semibold rounded-2xl transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
  );
}
