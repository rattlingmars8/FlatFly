import connectToDB from '../../lib/db';
import Listing from "../../../models/Listing";

const buildQuery = (params) => ({
  ...( (params.minPrice || params.maxPrice) && {
    price: {
      ...(params.minPrice && { $gte: parseFloat(params.minPrice) }),
      ...(params.maxPrice && { $lte: parseFloat(params.maxPrice) }),
    },
  }),
  ...( (params.minArea || params.maxArea) && {
    flat_area: {
      ...(params.minArea && { $gte: parseFloat(params.minArea) }),
      ...(params.maxArea && { $lte: parseFloat(params.maxArea) }),
    },
  }),
  ...( params.disposition && {
    $or: params.disposition
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .map(val => ({
        $expr: { $gt: [{ $indexOfCP: ["$name", val] }, -1] },
      })),
  }),
});

export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const page = parseInt(params.page || "1", 10) || 1;
    const limit = 30;

    const query = buildQuery(params);

    const totalMatches = await Listing.countDocuments(query);
    const totalPages = Math.ceil(totalMatches / limit);

    const listings = await Listing.find(query)
      .sort({ first_seen_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const responseData = {
      totalMatches,
      totalPages,
      currentPage: page,
      listings,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
