import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const EventsModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-[99]  top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white p-10 rounded-lg relative max-w-[80%] w-[600px] max-h-[80%] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default EventsModal;
