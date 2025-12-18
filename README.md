# Disbursement Authorization PDF Generator

A simple web application for generating Disbursement Authorization forms (Exhibit D) as PDFs. Built with Next.js, React, and @react-pdf/renderer.

## Features

- ✅ Create, edit, and manage disbursement authorizations
- ✅ Clone existing authorizations to save time
- ✅ Upload signature image for reuse
- ✅ Generate professional PDF documents matching standard format
- ✅ Local storage persistence (browser-based)
- ✅ Download PDFs with proper formatting
- ✅ Title/name authorizations for easy tracking

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### First Time Setup

1. Click **Settings** (⚙️) in the top right
2. Upload your signature image
3. Set default contractor name and project name (optional)
4. Click **Save Settings**

### Creating a Disbursement Authorization

1. Click **+ New Authorization** on the dashboard
2. Enter a title (e.g., "John Doe - January 2025")
3. Fill in the required fields
4. Click **Save** or **Save & View PDF**

### Managing Authorizations

From the dashboard, you can:
- **View** (👁️) - Preview and download PDF
- **Edit** (✏️) - Modify existing authorization
- **Clone** (📋) - Duplicate to create similar authorization
- **Delete** (🗑️) - Remove authorization

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

The app will automatically build and deploy. No environment variables needed.

### Build Locally

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: @react-pdf/renderer
- **Storage**: localStorage (browser-based)

## Project Structure

```
├── app/
│   ├── page.tsx              # Dashboard
│   ├── new/page.tsx          # New authorization form
│   ├── edit/[id]/page.tsx    # Edit authorization
│   ├── view/[id]/page.tsx    # PDF viewer
│   └── settings/page.tsx     # Settings page
├── components/
│   ├── DisbursementForm.tsx  # Form component
│   └── DisbursementPDF.tsx   # PDF document template
└── lib/
    ├── types.ts              # TypeScript types
    └── storage.ts            # localStorage utilities
```

## Notes

- Data is stored in browser localStorage (not synced across devices)
- Signature image is stored as base64 in localStorage
- For production use with multiple users, consider adding a backend database

## License

MIT
