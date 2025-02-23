import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    price_m2: { type: Number, required: true },
    locality: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    listing_snapshot_id: { type: Number, required: true },
    listing_id: { type: Number, required: true },
    first_seen_at: { type: Date, required: true },
    last_seen_at: { type: Date, required: true },
    has_elevator: { type: Boolean, default: null },
    has_basement: { type: Boolean, default: null },
    floor_raw: { type: String, default: null },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    real_estate_server_id: { type: Number, required: true },
    real_estate_agent_id: { type: Number, default: null },
    sale_type_id: { type: Number, required: true },
    listing_server_id: { type: String, required: true },
    flat_area: { type: Number, required: true },
    parcel_area: { type: Number, required: true },
    house_area: { type: Number, required: true },
    h3_hex_id: { type: String, required: true },
  },
  { collection: "listings" },
);

const Listing = mongoose.model("listing", listingSchema);

export default Listing;
