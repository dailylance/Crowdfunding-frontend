# CrowdFund Pro - Advanced Crowdfunding Analytics Platform

A comprehensive SAAS-style frontend for crowdfunding platform analytics with OCR, AI-powered insights, and automated data export capabilities.

## 🚀 Features

### Public Routes

- **Landing Page** - Professional SAAS-style landing page with features overview
- **Authentication** - Sign-in and sign-up pages with Google OAuth and manual registration
- **Email Verification** - Built-in email verification system (configurable)

### Protected Dashboard Routes

- **Dashboard Home** - Overview of recent activity, stats, and quick actions
- **Advanced Search** - Multi-platform search with OCR enhancement
- **Saved Data Management** - Review, save, and export project data
- **Analytics Dashboard** - Comprehensive insights and performance metrics
- **Real-time Logs** - Live activity monitoring during searches

### Key Capabilities

- **Multi-Platform Support** - Indiegogo, Kickstarter, Makuake, Wadiz, and more
- **OCR Enhancement** - AI-powered image text extraction for better data accuracy
- **Google Sheets Export** - One-click export to personalized spreadsheets
- **Data Review Modal** - Detailed project information before saving
- **Search History** - Track all past searches and results
- **Performance Analytics** - Platform distribution, success rates, trends

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: NextAuth.js with Google OAuth + credentials
- **Database**: Prisma ORM with SQLite (easily switchable)
- **State Management**: React hooks
- **Icons**: Lucide React
- **Development**: Turbopack for fast development

## 📦 Installation & Setup

### 1. Clone and Install

```bash
cd crowdfunding-frontend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Backend Services
NEXT_PUBLIC_SCRAPER_API_URL="http://localhost:3001"
NEXT_PUBLIC_OCR_API_URL="http://localhost:5000"
NEXT_PUBLIC_SHEETS_API_URL="http://localhost:3002"
```

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`
