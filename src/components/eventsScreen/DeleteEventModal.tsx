import React from 'react';

interface ModalConfirmProps {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}

const DeleteEventModal: React.FC<ModalConfirmProps> = ({ isOpen, closeModal, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white p-8 rounded-lg relative max-w-[80%] w-[400px] max-h-[80%] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">¿Estás seguro de que quieres eliminar este evento?</h3>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 transition"
          >
            Eliminar
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
