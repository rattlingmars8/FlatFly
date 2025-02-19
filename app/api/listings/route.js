import fs from "fs";
import path from "path";
import { convertSampleData, filterListings } from "@/utils/dataUtils";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minArea = searchParams.get("minArea");
    const maxArea = searchParams.get("maxArea");
    const disposition = searchParams.get("disposition");

    const filePath = path.join(process.cwd(), "public/data/sample.json");
    const fileContents = fs.readFileSync(filePath, "utf8");

    if (!fileContents) {
      console.error("File is empty:", filePath);
      return new Response(JSON.stringify({ error: "File is empty" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let rawData;
    try {
      rawData = JSON.parse(fileContents);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return new Response(JSON.stringify({ error: "Failed to parse JSON" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const listings = convertSampleData(rawData);
    const filters = {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minArea: minArea ? parseFloat(minArea) : undefined,
      maxArea: maxArea ? parseFloat(maxArea) : undefined,
      disposition: disposition ? disposition.split(",") : [],
    };

    const filteredListings = filterListings(listings, filters);

    return new Response(JSON.stringify(filteredListings), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
