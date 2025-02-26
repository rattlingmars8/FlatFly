# FlatFly - Interactive Real Estate Dashboard

FlatFly is an interactive real estate dashboard that allows users to explore property listings through a dynamic map interface with filters and H3 hexagonal region overlays.

## Features

- **Interactive Map Interface**
    - Displays property listings as markers.
    - Overlays [H3 hexagonal](https://h3geo.org/) regions.
    - Enables interaction with both property markers and hex regions.
    - Provides historical analytics when an H3 region is selected.

- **Filtering System**
    - Users can refine property searches based on various criteria.
    - Filters affect both the map and the listings section.

- **Property Listings Section**
    - Updates dynamically based on the current map view, selected filters, and selected H3 region.
    - Displays essential property details: price, area, price per m², and location.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React, Tailwind CSS
- **State Management & Data Fetching:** SWR
- **Mapping Libraries:** React-Leaflet, Leaflet, H3-js
- **Animation:** Framer Motion
- **Icons & UI Components:** React Icons, Heroicons
- **Database:** MongoDB (via Mongoose)

## Installation & Setup

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Clone the Repository
```bash
  git clone https://github.com/yourusername/flatfly.git
  cd flatfly
```

### Install Dependencies
```bash
  npm install
```

## Project Structure
```
.
├── README.md - Project overview and setup instructions.
├── app
│   ├── api
│   │   ├── listings
│   │   │   └── route.js - API endpoint handling property listings.
│   │   └── stats
│   │       └── route.js - API endpoint providing H3 region statistics.
│   ├── components
│   │   ├── Analytics
│   │   │   └── AnalyticsPanel.jsx - Displays detailed analytics when a map hex is selected.
│   │   ├── Cards
│   │   │   ├── ListingCard.jsx - Card component for summarizing a property listing.
│   │   │   └── PropertyCard.jsx - Detailed card component for individual properties.
│   │   ├── Filter
│   │   │   ├── CheckIcon.jsx - Icon component used within filter controls.
│   │   │   └── FilterSection.jsx - Renders the filtering options for property searches.
│   │   ├── Home.jsx - Main landing page component.
│   │   ├── Listings
│   │   │   ├── AppliedFilters.jsx - Displays currently applied filters.
│   │   │   ├── Modal.jsx - Modal dialog for additional listing details.
│   │   │   ├── Pagination.jsx - Controls for navigating through pages of listings.
│   │   │   └── PropertyListings.jsx - Renders the list of property listings.
│   │   ├── Map
│   │   │   └── MapComponent.jsx - Interactive map displaying property locations and stats.
│   │   └── NoDataMessage.jsx - Shown when there is no data available.
│   ├── globals.css - Global stylesheet for consistent styling across the app.
│   ├── hooks
│   │   └── useListings.js - Custom hook for fetching and managing property listings.
│   ├── layout.js - Defines the overall application layout for Next.js.
│   ├── lib
│   │   └── db.js - Handles database connections and related utilities.
│   └── page.js - Main page route for the application.
├── assignment.md - Contains project assignment details.
├── eslint.config.mjs - ESLint configuration for code quality.
├── jsconfig.json - JavaScript configuration including path aliases.
├── models
│   └── Listing.js - Mongoose schema and model for property listings.
├── next.config.mjs - Configuration settings for Next.js.
├── package-lock.json - Auto-generated lock file for npm dependencies.
├── package.json - Project metadata and dependency definitions.
├── postcss.config.mjs - Configuration for PostCSS.
├── public
│   ├── data
│   │   ├── sample.json - Seed data for property listings (to be uploaded to the remote database).
│   │   └── stats.json - Local statistics for H3 regions (fetched from the local machine or deployment server).
│   └── map-pointer.svg - SVG asset used as the map marker.
├── seed.js - Database seeding script; run via `node seed.js` to import `sample.json` data.
├── tailwind.config.mjs - Tailwind CSS configuration for custom styling.
└── utils
    └── dataUtils.js - Utility functions for processing and transforming data.


```

## Data Handling

Before launching the project, ensure that all necessary environment variables (e.g., `MONGODB_URI`) are properly configured in your `.env` file. For free cloud hosting, you can utilize services like MongoDB Atlas.

- **Seed Script:**  
  Execute the seed script using the command `node seed.js`. This script imports the property listings from the `sample.json` file into the MongoDB database that you will provide in `.env` (database name: provide such in `.env`).

- **Local Data Handling:**  
  The project also relies on `stats.json` for H3 region statistics. Unlike the property listings, data from `stats.json` is not imported into the database; it is hosted locally and accessed directly from the file system (or from the deployment server).


### Run Development Server
```bash
  npm run dev
```
This will start the application at `http://localhost:3000`.

### Build for Production
```bash
  npm run build
  npm run start
```

---
### Notes
- Ensure your `.env` file contains ALL necessary variables: `MONGODB_URI, DB_NAME`

