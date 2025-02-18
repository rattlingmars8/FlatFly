# Frontend Developer Assignment: FlatFly

Create an interactive real estate dashboard page that helps users explore property listings through a map interface and explicit filters.

## The Page Should Include:

A map interface that displays property listings as markers and includes [H3 hexagonal](https://h3geo.org/#hex=881e3541c5fffff) regions overlay. Users should be able to interact with both the markers and the hexagonal regions. When a hex region is selected, display historical analytics for that area.

A filtering section allowing users to refine property searches based on criteria of your choice. These filters should affect both the map display and the listings shown.

A property listings section that updates based on the current map view, selected filters, and any selected H3 region. Show relevant property information in a way that you think would be most useful to users.

## Data

- `sample.json` - json file with real estate listings. Most important informations are the geolocation, price, price per m2, area, and disposition. Feel free to convert it to any other format, load it directly into the react app, or create a serving API.

- `stats.json` - randomly generated statistics for given set of H3 hexes. Contains price changes over time, distribution of different flat distributions (3+1, 3+kk, etc..), and number of active listings in that hex. 

## Technical Considerations:

We prefer React (Next.js meta framework) together with Tailwind css, but if you prefer different setup, choose technologies and frameworks you're comfortable with. Consider performance, especially when handling map interactions and filtering the dataset.

Feel free to implement the UI/UX in a way you think would provide the best user experience. There are no strict requirements for specific frameworks, libraries, or design patterns.

## Evaluation Criteria:

Your solution will be evaluated based on:
- Overall user experience and interface design
- Code quality and organization
- Performance and handling of data updates
- Technical decisions and their justification

## Submission:

Provide a GitHub repository with your solution and a README explaining your approach, technical decisions, and any assumptions made.
