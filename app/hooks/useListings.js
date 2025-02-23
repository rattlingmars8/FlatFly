import useSWR from "swr";


export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorInfo = await res.json();
    const error = new Error("An error occurred while fetching the data");
    error.info = errorInfo;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export function useListings(queryString) {
  const { data: responseData, error: listingsError } = useSWR(
    `/api/listings${queryString ? `?${queryString}` : ""}`,
    fetcher
  );

  const loading = !responseData && !listingsError;
  const listings = responseData?.listings || [];
  const totalMatches = responseData?.totalMatches || 0;
  const totalPages = responseData?.totalPages || 0;
  const currentPage = responseData?.currentPage || 1;

  return { listings, totalMatches, totalPages, currentPage, listingsError, loading };
}

