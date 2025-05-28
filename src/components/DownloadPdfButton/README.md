# DownloadPdfButton Component

A React component that displays a button to download a PDF file after collecting user information through a form.

## Features

- Customizable button text and style
- Form validation for required fields
- Form data submission to Notion database
- Success confirmation and PDF download

## Usage

```jsx
import DownloadPdfButton from '@site/src/components/DownloadPdfButton';

// Basic usage
<DownloadPdfButton 
  pdfUrl="https://example.com/your-pdf-file.pdf" 
/>

// With custom button text and style
<DownloadPdfButton 
  pdfUrl="https://example.com/your-pdf-file.pdf"
  buttonText="Get PDF Report" 
  buttonStyle={{
    backgroundColor: '#4a90e2',
    fontSize: '1.2rem'
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pdfUrl` | string | | **Required**. URL to the PDF file to download |
| `buttonText` | string | "Download Full PDF Report" | Text to display on the button |
| `buttonStyle` | object | {} | Custom styles to apply to the button |

## Form Fields

The form collects the following information from users:

- First Name (required)
- Last Name (required)
- Email Address (required)
- Company (required)
- Website (required)
- Country (required)

## Setup Requirements

1. Make sure you have a Notion database set up with the appropriate fields
2. Set the `PDF_FORM_DATABASE_ID` environment variable in `.env.local`
3. Ensure the API endpoint `/api/pdf-form-submit` is correctly configured

## API Integration

The component submits form data to `/api/pdf-form-submit`, which stores the information in a Notion database. The API endpoint requires the following environment variable:

```
PDF_FORM_DATABASE_ID=your-notion-database-id
```

The Notion database should have the following properties:
- First Name (title)
- Last Name (rich text)
- Email (email)
- Company (rich text)
- Website (url)
- Country (rich text)
- PDF URL (url)
- Timestamp (date)
- User Agent (rich text)
- Referrer (rich text) 