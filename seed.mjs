import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Listing from "@/models/Listing.js";

const uri = process.env.MONGODB_URI;

async function seed() {
  try {
    console.log(uri);
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, "public/data/sample.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    if (!fileContents) {
      console.error("File is empty:", filePath);
      return;
    }

    let rawData;
    try {
      rawData = JSON.parse(fileContents);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return;
    }

    const listings = Object.values(rawData).map((item) => ({
      price_m2: item.price_m2,
      locality: item.locality,
      name: item.name,
      price: item.price,
      description: item.description,
      url: item.url,
      listing_snapshot_id: item.listing_snapshot_id,
      listing_id: item.listing_id,
      first_seen_at: new Date(item.first_seen_at),
      last_seen_at: new Date(item.last_seen_at),
      has_elevator:
        item.has_elevator === null ? null : item.has_elevator === "true",
      has_basement:
        item.has_basement === null ? null : item.has_basement === "true",
      floor_raw: item.floor_raw,
      latitude: item.latitude,
      longitude: item.longitude,
      real_estate_server_id: item.real_estate_server_id,
      real_estate_agent_id:
        item.real_estate_agent_id === null
          ? null
          : Number(item.real_estate_agent_id),
      sale_type_id: item.sale_type_id,
      listing_server_id: item.listing_server_id,
      flat_area: item.flat_area,
      parcel_area: item.parcel_area,
      house_area: item.house_area,
      h3_hex_id: item.h3_hex_id,
    }));

    await Listing.insertMany(listings);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
