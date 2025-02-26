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
├── README.md
├── app
│   ├── api
│   │   ├── listings
│   │   │   └── route.js
│   │   └── stats
│   │       └── route.js
│   ├── components
│   │   ├── AnalyticsPanel.jsx
│   │   ├── AppliedFilters.jsx
│   │   ├── CheckIcon.jsx
│   │   ├── FilterSection.jsx
│   │   ├── Home.jsx
│   │   ├── ListingCard.jsx
│   │   ├── MapComponent.jsx
│   │   ├── Modal.jsx
│   │   ├── NoDataMessage.jsx
│   │   ├── Pagination.jsx
│   │   └── PropertyListings.jsx
│   ├── fonts
│   │   └── Quicksand
│   │       ├── Quicksand-VariableFont_wght.ttf
│   │       └── static
│   │           ├── Quicksand-Bold.ttf
│   │           ├── Quicksand-Light.ttf
│   │           ├── Quicksand-Medium.ttf
│   │           ├── Quicksand-Regular.ttf
│   │           └── Quicksand-SemiBold.ttf
│   ├── globals.css
│   ├── hooks
│   │   └── useListings.js
│   ├── layout.js
│   ├── lib
│   │   └── db.js
│   └── page.js
├── assignment.md
├── eslint.config.mjs
├── jsconfig.json
├── models
│   └── Listing.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── data
│   │   ├── sample.json
│   │   └── stats.json
│   └── map-pointer.svg
├── seed.js
├── tailwind.config.mjs
└── utils
    └── dataUtils.js

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

