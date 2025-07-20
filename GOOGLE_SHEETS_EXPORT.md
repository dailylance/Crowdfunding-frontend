# Google Sheets Export Implementation

## Overview

The Google Sheets export functionality has been moved from an external service to the Next.js backend, allowing direct integration with Google Sheets API using the user's OAuth token.

## Changes Made

### 1. Dependencies Added
- `googleapis` package installed for Google Sheets API integration

### 2. NextAuth Configuration Updated
- Added Google Sheets scope: `https://www.googleapis.com/auth/spreadsheets`
- Access token is now stored in the session for API calls

### 3. API Routes Updated

#### `/api/sheets/export` (Main Export Route)
- **Purpose**: Export scraped results directly to Google Sheets
- **Input**: `searchId`, `platform`, `keyword`, `results`
- **Output**: Google Sheet URL and metadata
- **Features**:
  - Creates a new Google Sheet in user's Google Drive
  - Formats data with headers and styling
  - Auto-resizes columns
  - Returns spreadsheet URL for opening

#### `/api/scraping/export/sheets` (Saved Data Export)
- **Purpose**: Export saved scraped data to Google Sheets
- **Input**: `scrapedDataIds` array
- **Output**: Google Sheet URL
- **Features**:
  - Retrieves data from database
  - Creates formatted Google Sheet
  - Updates saved data records with spreadsheet URL

### 4. Error Handling
- **Token Expired**: Prompts user to sign in again
- **Insufficient Permissions**: Clear error message about permissions
- **Quota Exceeded**: Handles API rate limits
- **Network Errors**: Comprehensive error messages

## How It Works

1. **User Authentication**: User signs in with Google OAuth
2. **Token Storage**: Google access token stored in NextAuth session
3. **Export Request**: Frontend calls `/api/sheets/export` with scraped data
4. **Sheet Creation**: Backend creates new Google Sheet using user's token
5. **Data Writing**: Scraped data formatted and written to sheet
6. **Formatting**: Headers styled, columns auto-resized
7. **Response**: Sheet URL returned to frontend for opening

## Required Environment Variables

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Google Cloud Console Setup

1. **Enable Google Sheets API** in Google Cloud Console
2. **Create OAuth 2.0 credentials** with these scopes:
   - `openid`
   - `email`
   - `profile`
   - `https://www.googleapis.com/auth/spreadsheets`
3. **Configure authorized redirect URIs** for your domain

## Usage

### From Scraping Results Modal
```javascript
const response = await fetch("/api/sheets/export", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    searchId: results.searchId,
    platform: results.platform,
    keyword: results.keyword,
    results: results.results,
  }),
});
```

### From Saved Data
```javascript
const response = await fetch("/api/scraping/export/sheets", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    scrapedDataIds: selectedIds,
  }),
});
```

## Benefits

1. **No External Dependencies**: No need for separate Google Sheets service
2. **User-Specific**: Sheets created in user's own Google Drive
3. **Better Security**: Uses user's OAuth token directly
4. **Improved Performance**: Direct API calls, no service-to-service communication
5. **Better Error Handling**: Specific error messages for different scenarios
6. **Automatic Formatting**: Professional-looking sheets with headers and styling

## Troubleshooting

### Common Issues

1. **"Google access token not found"**
   - Solution: User needs to sign in with Google again
   - Check NextAuth configuration

2. **"Insufficient permissions"**
   - Solution: Ensure Google Sheets API is enabled
   - Check OAuth scopes include `https://www.googleapis.com/auth/spreadsheets`

3. **"Quota exceeded"**
   - Solution: Wait and try again later
   - Consider implementing rate limiting

4. **Build Errors**
   - Solution: Ensure `googleapis` package is installed
   - Check TypeScript types are correct

## Migration Notes

- Old external Google Sheets service (port 3002) is no longer needed
- ScrapingService.exportToGoogleSheets() method is deprecated
- All Google Sheets operations now happen directly in Next.js API routes 