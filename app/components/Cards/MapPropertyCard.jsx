import useSWR from "swr";
import PropertyCard from "@/app/components/Cards/PropertyCard.jsx";
import Skeleton from "react-loading-skeleton";
import { fetcher } from "@/app/hooks/useListings.js";

const MapPropertyCard = ({ id }) => {
  const { data, error } = useSWR(id ? `/api/listings/${id}` : null, fetcher);

  if (error) return <div>Error loading property details</div>;
  if (!data) return <Skeleton height={100} width="100%" />;

  return (
    <div className="w-full">
      <PropertyCard listing={data} />
    </div>
  );
};

export default MapPropertyCard;
