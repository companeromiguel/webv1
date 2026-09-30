# TMCWD Website Documentation

## For Reporting to the Division Head and General Manager

**Organization:** Trece Martires City Water District (TMCWD)  
**Document type:** Website overview and management report  
**Prepared:** September 21, 2026  
**Website:** https://tmcwd.gov.ph

## 1. Executive Summary

The TMCWD website is the District's official public information and service platform. It gives customers, residents, partner agencies and other stakeholders access to essential water-service information, public announcements, transparency records, procurement information, events, contact channels and selected district activities.

The website is designed to support the District's commitment to accessible public service, transparency, timely communication and reliable access to official information. It is implemented as a static website, which allows the published site to be hosted efficiently without a continuously running application server.

## 2. Website Objectives

The website supports the following objectives:

1. Provide the public with a reliable official source of TMCWD information.
2. Explain customer services, requirements and service procedures in an organized manner.
3. Publish announcements, advisories and relevant District updates.
4. Provide access to transparency, Freedom of Information, Citizen's Charter, bidding and procurement materials.
5. Display contact information and channels for customer assistance.
6. Present the District's programs, events and historical gallery materials.
7. Improve access through responsive design, keyboard navigation and accessibility controls.

## 3. Primary Stakeholders and Users

| Stakeholder | Website use |
| --- | --- |
| Water consumers | Review services, billing information, requirements, advisories and contact details |
| Residents of Trece Martires City | Access announcements, water-quality information and public notices |
| TMCWD management and employees | Publish and maintain official information and documents |
| Division Head and General Manager | Monitor the public information platform and approve official content |
| Government oversight offices | Review transparency, procurement and public disclosure materials |
| Suppliers and prospective bidders | Access bidding and procurement information |
| Media and community organizations | Verify official announcements and District information |

## 4. Main Website Sections

### 4.1 Home

The homepage provides the primary public entry point. It includes:

- the TMCWD service message and main calls to action;
- water advisories and announcements;
- an overview of the District;
- quick access to payment, transparency, Citizen's Charter and senior citizen discount information;
- links to other public service areas.

### 4.2 Services

The Services section presents customer-facing procedures and information, including:

- new water application;
- meter reading and statement information;
- payment of water bills;
- change of ball valve;
- leak repair requests;
- water supply operations;
- temporary disconnection and reconnection;
- change of name or address;
- change meter requests;
- senior citizen discount;
- feedback and complaints.

Each service page is intended to present the applicable requirements, procedure, service expectations and related information in a consistent format.

### 4.3 Transparency and Public Disclosure

The Transparency section provides access to:

- Transparency Seal documents;
- Freedom of Information materials;
- Citizen's Charter documents;
- bidding and procurement information;
- budgets and financial or operational records;
- rankings, certifications and related public documents.

PDF files can be opened or downloaded. The document library uses a manifest and content hashes so that approved descriptions are not accidentally retained when a source PDF is replaced.

### 4.4 Announcements and Events

The Announcements section is used for official notices and updates. The Events section provides information about District activities, while the Gallery preserves selected images from TMCWD programs, training, milestones and community activities.

### 4.5 Water Quality

The Water Quality section provides a dedicated public location for water-quality information and related public communication.

### 4.6 Board Meetings and Contact

The Board Meetings section provides a public location for board-related information. The Contact section and website footer provide the District address, telephone numbers, email address, social media channel and office hours.

## 5. Public Contact Information Displayed

The website currently displays the following contact information in the footer:

- **Address:** 2nd Floor, TMCWD Building, Governor's Drive, Barangay San Agustin, Trece Martires City, Cavite 4109
- **Telephone:** (046) 419-2664 and (046) 419-0054
- **Fax:** (046) 419-0378
- **Email:** tmcwd@yahoo.com
- **Facebook:** facebook.com/tmcwdCMUHelpDesk
- **Office hours:** Monday to Friday, 8:00 AM to 5:00 PM

This information should be verified periodically by the responsible office before each formal website review or major publication.

## 6. Accessibility and User Experience Features

The website includes the following user-facing features:

- responsive layouts for desktop and mobile devices;
- a skip link to help keyboard users reach the main content;
- visible focus states for interactive controls;
- an accessibility widget;
- a data privacy modal;
- a back-to-top control on long pages;
- semantic headings and page landmarks;
- PDF preview and download options;
- optimized image and document loading behavior.

Accessibility should be checked whenever new pages, documents, images or interactive controls are added.

## 7. Technology and Hosting Overview

The website is built using:

- Next.js 16;
- React 19;
- TypeScript;
- Tailwind CSS and project-specific CSS modules;
- PDF.js for document previews;
- static export configuration for deployment.

The production configuration uses static generation with directory-style URLs. A production build generates the files that are published by the hosting provider. The site does not require a continuously running Node.js application server for normal public delivery.

## 8. Website Content Management Responsibilities

Website information should be reviewed and approved according to the following responsibilities:

| Responsibility | Recommended accountable role |
| --- | --- |
| Confirm accuracy of official announcements and advisories | Concerned Division or originating office |
| Confirm service requirements and procedures | Customer service or responsible operating Division |
| Approve public wording and publication timing | Authorized management representative |
| Review transparency and procurement records | Records, procurement or designated transparency personnel |
| Verify contact information | Administration or designated communications personnel |
| Upload and technically publish approved changes | Website administrator or technical support |
| Perform final public-site inspection | Website administrator with the originating office |

The Division Head and General Manager should remain the approving authorities for material changes that affect public service commitments, official statements, compliance disclosures or management-level announcements.

## 9. Recommended Content Publication Workflow

1. The originating office prepares the announcement, service update or document.
2. The originating office checks dates, names, contact details, attachments and applicable approvals.
3. The responsible Division Head reviews the content for operational accuracy.
4. Management approval is obtained when the content is a formal policy, public advisory, compliance disclosure or management announcement.
5. The website administrator publishes the approved content in the appropriate section.
6. The website administrator checks the published page on desktop and mobile views.
7. The originating office confirms that the public version is accurate and readable.
8. The publication date, source office and review date are recorded for internal monitoring.

## 10. Transparency Document Controls

Transparency documents are maintained through a document manifest and an import script. The import process:

- reads PDFs from the approved source folders;
- calculates a SHA-256 hash for each PDF;
- records page count and file size;
- identifies identical documents and avoids duplicate publication;
- copies approved documents into the public document directory;
- adds a content-hash query to document links for cache refresh purposes.

Before replacing a transparency document, the responsible office should confirm that:

- the file is the final approved version;
- the filename and document category are correct;
- the document is readable and complete;
- the applicable title and summary have been reviewed;
- outdated or superseded public files have been assessed;
- the updated page has been checked after publication.

The detailed technical procedure is documented in [docs/transparency-maintenance.md](transparency-maintenance.md). Pending wording and document decisions are recorded in [docs/transparency-wording-review.md](transparency-wording-review.md).

## 11. Quality Assurance and Monitoring

Before a major publication or deployment, the following checks are recommended:

- confirm that the homepage loads correctly;
- test the main navigation and submenu links;
- verify announcement, service, transparency and contact pages;
- open and download a sample of newly published PDFs;
- inspect the website on a mobile device and desktop browser;
- check spelling, dates, names, office titles and telephone numbers;
- confirm that external government links open correctly;
- test keyboard navigation and focus visibility;
- run the project lint check and production build;
- retain the approved source files and publication record.

For routine governance, a monthly content review and a quarterly full website review are recommended. A full review should include contact information, service procedures, public documents, advisories, links, accessibility behavior and mobile presentation.

## 12. Risks and Controls

| Risk | Control |
| --- | --- |
| Outdated service or contact information | Assign an accountable office and conduct scheduled reviews |
| Incorrect or unapproved public statement | Require originating-office and management approval before publication |
| Wrong or incomplete transparency file | Use the controlled import process and inspect the published PDF |
| Broken links or missing media | Perform post-publication link and browser checks |
| Accessibility barriers | Use semantic content, keyboard checks and the accessibility widget |
| Browser cache showing an old document | Use the document hash versioning process and rebuild the static site |
| Unrecorded website changes | Keep approved source material and a publication/change log |

## 13. Current Maintenance References

The project contains the following supporting references:

- [README.md](../README.md): developer setup, project structure and deployment commands;
- [transparency-maintenance.md](transparency-maintenance.md): transparency document maintenance and PDF preview behavior;
- [transparency-wording-review.md](transparency-wording-review.md): document wording decisions and editorial review notes.

## 14. Management Review and Approval

This document may be used as the accompanying technical and operational overview for management reporting. The following items should be completed during formal review:

- confirm the current website URL and hosting status;
- confirm the displayed contact information;
- identify the responsible website administrator;
- identify the responsible content owners for each major section;
- confirm the review schedule;
- record approved changes and management instructions.

**Reviewed by:** ____________________________________  
**Position:** _______________________________________  
**Date:** ___________________________________________  

**Approved by:** ___________________________________  
**Position:** General Manager  
**Date:** ___________________________________________
