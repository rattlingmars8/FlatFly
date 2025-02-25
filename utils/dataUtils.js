export function convertSampleData(data) {
  return Object.values(data).map((item) => ({
    id: item.listing_snapshot_id,
    priceM2: item.price_m2,
    locality: item.locality,
    name: item.name,
    price: item.price,
    description: item.description,
    url: item.url,
    area: item.flat_area,
    latitude: item.latitude,
    longitude: item.longitude,
    h3HexId: item.h3_hex_id,
  }));
}

export function convertStatsData(data) {
  return Object.fromEntries(
    Object.entries(data).map(([hexId, stats]) => [
      hexId,
      {
        avgPriceChange: calculateAvgPriceChange(stats.price_per_m2),
        dispositionDistribution: stats.dispositions,
        activeListings: stats.active_listings,
      },
    ]),
  );
}

function calculateAvgPriceChange(pricePerM2Array) {
  if (!pricePerM2Array || pricePerM2Array.length < 2) return 0;
  const first = pricePerM2Array[0];
  const last = pricePerM2Array[pricePerM2Array.length - 1];
  return ((last - first) / first) * 100;
}

export function filterListings(listings, filters) {
  return listings.filter((listing) => {
    const { minPrice, maxPrice, minArea, maxArea, disposition } = filters;
    return (
      (!minPrice || listing.price >= parseFloat(minPrice)) &&
      (!maxPrice || listing.price <= parseFloat(maxPrice)) &&
      (!minArea || listing.area >= parseFloat(minArea)) &&
      (!maxArea || listing.area <= parseFloat(maxArea)) &&
      (disposition.length === 0 ||
        disposition.some((disp) =>
          listing.name.toLowerCase().includes(disp.toLowerCase()),
        ))
    );
  });
}

export const flatType = [
  "Room",
  "1+kk",
  "1+1",
  "2+kk",
  "2+1",
  "3+kk",
  "3+1",
  "4+kk",
  "4+1",
  "5+kk",
  "5+1",
  "6 and more",
  "Atypical",
];

export const formatNumber = (value) => {
  return value ? new Intl.NumberFormat("en-US").format(value) : "";
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};
