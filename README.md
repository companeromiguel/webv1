# Trece Martires City Water District website

The official public website of the Trece Martires City Water District (TMCWD). It provides district information, water services, announcements, events, gallery albums, water-quality information, board documents and transparency records.

The site is built with Next.js 16, React 19 and TypeScript. It is configured for a static export, so the production output can be hosted by a static web server without a Node.js runtime.

## Requirements

- Node.js compatible with the installed Next.js version
- npm

Install dependencies from the project directory:

```powershell
npm install
```

## Local development

Start the development server:

```powershell
npm run dev
```

Open `http://localhost:3000`. The `predev` script prepares the matching PDF.js worker and supporting assets before Next.js starts.

Useful commands:

```powershell
npm run lint    # Run ESLint
npm run build   # Prepare PDF.js assets and create a production static export
npm run start   # Serve a built application locally
```

The development server also accepts the configured LAN origin `192.168.1.189` through `next.config.ts`.

## Site structure

### Public pages

| Area | Route | Source |
| --- | --- | --- |
| Home | `/` | `app/page.tsx` |
| About | `/about/` | `app/about/page.tsx` |
| Services | `/services/` and `/services/[slug]/` | `app/services/` |
| Announcements | `/news/` | `app/news/page.tsx` |
| Events | `/events/` | `app/events/` |
| Gallery | `/gallery/` | `app/gallery/` |
| Board meetings | `/board-meetings/` | `app/board-meetings/page.tsx` |
| Water quality | `/water-quality/` | `app/water-quality/page.tsx` |
| Contact | `/contact/` | `app/contact/page.tsx` |
| Transparency | `/transparency/` and `/transparency/[slug]/` | `app/transparency/` |
| Bidding | `/transparency/bidding/` | `app/transparency/bidding/` |

The shared shell is defined in `app/layout.tsx`. It renders the header, alert banner, privacy modal, accessibility controls, back-to-top control and footer around every page.

Navigation labels and service/transparency submenu links are maintained in `lib/nav.ts`.

## Where to update content

- Site-wide metadata, language and fonts: `app/layout.tsx`
- Global colors, typography and layout styles: `app/globals.css`
- Header, footer and shared notices: `components/layout/`
- Service page content: `app/services/[slug]/` and `lib/service-charter.ts`
- Events and gallery summaries: `lib/events.ts` and `app/gallery/`
- Transparency document records: `lib/transparency-documents.json`
- Approved transparency titles and summaries: `lib/transparency-approved-copy.json`
- Bidding document records: `lib/bidding-documents.json`
- Published PDFs and other media: `public/`

Keep editorial copy separate from document metadata where the existing structure does so. Do not manually edit generated PDF manifest fields when the source documents are being replaced; use the import workflow below.

## Transparency documents

The transparency pages use a manifest in `lib/transparency-documents.json` and published PDFs in `public/documents/transparency/`. To replace or import source PDFs, run:

```powershell
node scripts/import-transparency.mjs "D:/path/to/source-public-directory"
npm run build
```

The source directory must contain the folders expected by the import script, including `CITIZEN CHARTER`, `arta`, `budget`, `financial statements`, `FOI`, `procurement` and `ranking` where applicable.

After importing:

1. Review the manifest changes in `lib/transparency-documents.json`.
2. Review the pending wording decisions in `docs/transparency-wording-review.md`.
3. Add or update approved copy only in `lib/transparency-approved-copy.json`.
4. Run the production build and inspect the document links and previews.
5. Redeploy the generated static output.

The importer hashes every PDF, records page counts and deduplicates identical files. Approved titles and summaries are only applied when their stored SHA-256 matches the current PDF. This prevents editorial copy from silently carrying over to a replacement document.

For details about preview behavior and document maintenance, see [docs/transparency-maintenance.md](docs/transparency-maintenance.md).

## Static deployment

`next.config.ts` sets:

- `output: "export"` for static generation
- `trailingSlash: true` for directory-style page URLs
- `images.unoptimized: true` because there is no Next.js image optimization server

Run `npm run build` before publishing. The generated static site is written to the Next.js export output directory. Publish that output, together with the contents of `public/`, using the hosting provider's static-site deployment process.

The build also runs `scripts/prepare-pdfjs.mjs`. It copies the PDF.js worker, fonts, character maps, WASM files and ICC profiles for the installed `pdfjs-dist` version into `public/pdfjs/`. These generated assets are ignored and should not be edited by hand.

## Verification checklist

Before publishing a content or code change:

```powershell
npm run lint
npm run build
```

Then check the affected route in a browser, including:

- desktop and mobile layouts;
- header navigation and submenu links;
- document open, preview and download actions;
- images and gallery albums;
- contact information and external links;
- keyboard navigation, focus visibility and accessibility controls.

The build and import scripts do not commit or deploy changes. Review the Git diff before handing the generated site to the deployment process.
