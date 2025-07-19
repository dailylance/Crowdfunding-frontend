# User-Specific Crowdfunding Data Scraping System

This comprehensive implementation provides a complete user-specific data scraping system for crowdfunding platforms with the following features:

## 🚀 Features Implemented

### 1. **User-Specific Data Storage**

- All scraped data is now linked to individual users
- Users can only see their own scraping results
- Data isolation between different users
- Proper database relationships with foreign keys

### 2. **Enhanced Database Schema**

- `Search` model: Tracks each user's search queries
- `ScrapedData` model: Stores individual scraped items with user relations
- `SavedData` model: Users can save selected items for later access
- Full audit trail of user activities

### 3. **Integrated Scraping Interface**

- **Tabbed Dashboard**: Overview, Data Scraping, and Analytics tabs
- **Real-time Platform Selection**: Dynamically loads available platforms and categories
- **Advanced Search Options**: Keyword search, category filtering, language selection
- **OCR/NLP Toggle**: Enable/disable AI enhancement features

### 4. **Interactive Results Modal**

- **Excel-like Table View**: Displays scraped data in a familiar format
- **Selective Data Management**: Check/uncheck items to save or export
- **Detailed Item View**: Expandable rows showing OCR and NLP enhanced data
- **Real-time Statistics**: Shows total searches, items found, and saved data

### 5. **Dual Export Functionality**

- **Excel Export**: Direct CSV download for offline analysis
- **Google Sheets Export**: Integration with existing sheets service
- **Selective Export**: Export only selected items
- **Auto-save URLs**: Tracks spreadsheet URLs for future reference

### 6. **Complete API Integration**

- `/api/scraping/platforms` - Get available platforms
- `/api/scraping/search` - Perform user-specific scraping
- `/api/scraping/data/[searchId]` - Get detailed scraped data
- `/api/scraping/save` - Save selected items to database
- `/api/scraping/export/sheets` - Export to Google Sheets
- `/api/scraping/stats` - User statistics and analytics

## 🏗️ Architecture Overview

```
Frontend (Next.js)
├── Dashboard with Tabs
│   ├── Overview Tab (existing)
│   ├── Data Scraping Tab (NEW)
│   └── Analytics Tab (placeholder)
├── Scraping Interface Component
├── Results Modal Component
└── API Routes

Backend Services
├── Scraping API (Port 3001)
│   ├── Platform Management
│   ├── OCR Integration
│   └── NLP Processing
├── Sheets API (Port 3002)
│   └── Google Sheets Export
└── Database (PostgreSQL)
    ├── User-specific data
    ├── Search history
    └── Saved items
```

## 📊 Database Models

### Search Model

```prisma
model Search {
  id        String   @id @default(cuid())
  userId    String
  platform  String
  category  String?
  keyword   String
  results   String   // JSON of scraped results
  status    String   @default("completed")
  resultCount Int?   @default(0)
  enabledOCR Boolean @default(true)
  language  String  @default("en")
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  scrapedData ScrapedData[]
}
```

### ScrapedData Model

```prisma
model ScrapedData {
  id             String   @id @default(cuid())
  searchId       String
  userId         String
  title          String
  description    String?
  platform       String
  url            String?
  raised         String?
  goal           String?
  backers        String?
  daysLeft       String?
  originalData   String   // Original scraped JSON
  ocrData        String?  // OCR enhanced JSON
  nlpData        String?  // NLP processed JSON
  isRelevant     Boolean  @default(true)
  createdAt      DateTime @default(now())
  search         Search   @relation(fields: [searchId], references: [id])
  user           User     @relation(fields: [userId], references: [id])
  savedData      SavedData?
}
```

## 🎯 User Workflow

1. **Login**: User authenticates via Google or manual signup
2. **Dashboard**: Navigate to "Data Scraping" tab
3. **Search Setup**:
   - Select platform (Kickstarter, Indiegogo, etc.)
   - Choose category (optional)
   - Enter keyword (optional)
   - Set language and OCR preferences
4. **Execute Search**: Click "Start Scraping" to begin
5. **Review Results**: Modal displays scraped data in table format
6. **Select Items**: Check boxes for items to save/export
7. **Save/Export**:
   - Save to database for later access
   - Export to Excel for immediate download
   - Export to Google Sheets with sharing capabilities

## 🔧 Technical Implementation

### Frontend Components

- `ScrapingInterface`: Main search interface with form controls
- `ScrapingResultsModal`: Interactive results table with selection
- `dashboard-home`: Enhanced with tabbed navigation

### Backend Services

- `ScrapingService`: Handles all scraping operations and data management
- API routes for platform management, searching, and data operations
- Database integration with user-specific data isolation

### Data Flow

1. User initiates search → Frontend validates and calls API
2. API calls scraping backend (port 3001) → Returns raw data
3. Data stored in database with user association → Returns search ID
4. Frontend loads detailed data → Displays in modal
5. User selects items → Save/export operations update database

## 🚀 Setup Instructions

### 1. Database Migration

```bash
cd crowdfunding-frontend
npx prisma db push
npx prisma generate
```

### 2. Start Scraping Backend

```bash
cd crowdfunding-testing
npm install
npm start  # Runs on port 3001
```

### 3. Start Sheets Backend (if using Google Sheets export)

```bash
cd crowdfunding-sheets
npm install
npm start  # Runs on port 3002
```

### 4. Start Frontend

```bash
cd crowdfunding-frontend
npm run dev  # Runs on port 3000
```

## 🎨 UI Features

### Dashboard Integration

- Seamless tab switching between Overview and Data Scraping
- Real-time statistics showing user's scraping activity
- Quick action buttons to start new searches

### Scraping Interface

- **Platform Cards**: Visual selection of scraping platforms
- **Form Validation**: Real-time validation of search parameters
- **Progress Indicators**: Loading states during scraping operations
- **Error Handling**: User-friendly error messages and recovery

### Results Modal

- **Sortable Table**: Click headers to sort by different columns
- **Expandable Rows**: View detailed OCR/NLP data
- **Bulk Selection**: Select all/none functionality
- **Live Preview**: See selected item count and estimated export size

## 📈 Analytics & Tracking

### User Statistics

- Total searches performed
- Total items scraped
- Items saved to database
- Recent search history
- Platform usage patterns

### Performance Metrics

- Search execution time
- OCR processing time
- Success/failure rates
- User engagement metrics

## 🔒 Security & Privacy

### Data Isolation

- All data operations include user ID validation
- Database queries filtered by user ownership
- Session-based authentication required for all operations

### API Security

- Server-side session validation
- Input sanitization and validation
- Rate limiting on scraping operations

## 🚀 Future Enhancements

### Planned Features

1. **Advanced Analytics Tab**: Charts and graphs of scraping patterns
2. **Scheduled Scraping**: Automated recurring searches
3. **Data Sharing**: Share scraped data with team members
4. **API Key Management**: Personal API keys for external integrations
5. **Export Templates**: Custom export formats and templates

### Technical Improvements

1. **Real-time Updates**: WebSocket integration for live scraping progress
2. **Caching Layer**: Redis integration for performance optimization
3. **Queue System**: Background job processing for large scraping operations
4. **Notification System**: Email/SMS alerts for completed searches

## 📞 Support

For issues or questions regarding the scraping system:

1. Check the browser console for error messages
2. Verify all backend services are running
3. Ensure database connection is established
4. Check user authentication status

## 🎉 Success!

Your user-specific crowdfunding data scraping system is now fully implemented and ready for use! Users can now:

✅ **Search** platforms with their own isolated data  
✅ **View** results in an interactive Excel-like interface  
✅ **Save** selected items to their personal database  
✅ **Export** data to Excel or Google Sheets  
✅ **Track** their scraping history and statistics

The system provides a complete end-to-end solution for personalized crowdfunding data collection and analysis.
