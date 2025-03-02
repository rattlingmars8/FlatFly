import connectToDB from "../../../lib/db";
import Listing from "../../../../models/Listing";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ error: "No listing ID provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDB();

    const listing = await Listing.findById(id).lean();

    if (!listing) {
      return new Response(JSON.stringify({ error: "Listing not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(listing), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
