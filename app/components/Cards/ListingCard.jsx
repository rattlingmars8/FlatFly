import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../Listings/Modal.jsx";
import PropertyCard from "@/app/components/Cards/PropertyCard.jsx";

const ListingCard = ({ listing }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <>
        <motion.div
          key={listing._id}
          layoutId={`card-container-${listing._id}`}
          onClick={openModal}
          className="p-6 bg-purpleShades/15 rounded-xl shadow-md shadow-purpleShades hover:shadow-xl hover:shadow-purpleShades transition-transform duration-300 border border-gray-100 transform hover:scale-105"
        >
          <PropertyCard listing={listing} />

          <p className="text-xs text-center text-gray-600 italic">
            (Click anywhere on the card for more details)
          </p>
        </motion.div>
      </>

      <Modal isOpen={modalOpen} onClose={closeModal} listing={listing} />
    </>
  );
};

export default ListingCard;
