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
import en from "@/locales/main/landing/en";
import ja from "@/locales/main/landing/ja";
import { useLang } from "@/components/providers/lang-provider";

export function LandingPage() {
  const { lang } = useLang();
  const t = lang === "ja" ? ja : en;
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
                {t.hero.badge}
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-slate-900 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/auth/signup">
                  <Button
                    variant="gradient"
                    size="xl"
                    className="text-lg cursor-pointer px-12 py-5 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Globe className="w-6 h-6 mr-3" />
                    Start Scraping
                  </Button>
                </Link>
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
                {t.features.badge}
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                {t.features.title}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t.features.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {t.features.cards.map((card, i) => (
                <Card key={i} className="card-hover border-0 shadow-soft hover:shadow-medium bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    {/* Icon logic can remain as is, or you can map icons if needed */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      {/* ...icon... */}
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-lg leading-relaxed">
                      {card.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Platform Support */}
            <div id="platforms" className="text-center mb-16 scroll-mt-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">
                {t.platforms.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {t.platforms.platforms.map((platform) => (
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
                {t.dataExtraction.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    {t.dataExtraction.basicTitle}
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    {t.dataExtraction.basicList.map((item, i) => (
                      <li className="flex items-center" key={i}>
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    {t.dataExtraction.aiTitle}
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    {t.dataExtraction.aiList.map((item, i) => (
                      <li className="flex items-center" key={i}>
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        {item}
                      </li>
                    ))}
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

        {/* Pricing Section
        <section
          id="pricing"
          className="py-24 bg-white/80 backdrop-blur-sm scroll-mt-24"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                {t.pricing.title}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t.pricing.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {t.pricing.plans.map((plan, i) => (
                <Card
                  key={i}
                  className={
                    `bg-white/90 backdrop-blur-sm border border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2` +
                    (plan.popular ? ' bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-medium hover:shadow-strong relative' : '')
                  }
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {plan.popular}
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      {plan.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {plan.price}
                      <span className="text-lg text-slate-600">{plan.period}</span>
                    </div>
                    <CardDescription className="text-slate-600">
                      {plan.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <div className="flex items-center" key={j}>
                        <Check className="w-5 h-5 text-emerald-500 mr-3" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                    <Button variant={i === 1 ? "gradient" : "outline"} className="w-full mt-6">
                      {plan.button}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
          {/* Background decoration */}
          <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40'></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t.cta.title}
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {t.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="text-lg px-12 py-5 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Star className="w-6 h-6 mr-3" />
                    {t.cta.startTrial}
                  </Button>
                </Link>
                {/* <Button
                  variant="glass"
                  size="xl"
                  className="text-lg px-12 py-5 font-semibold rounded-2xl transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  {t.cta.contactSales}
                </Button> */}
              </div>
            </div>
          </div>
        </section>

      </div>
  );
}
