"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import EventsModal from "../eventsScreen/EventsModal";
import DeleteEventModal from "./DeleteEventModal";

const EventsPrincipalScreen: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isConfirmOpen, setIsConfirmOpen] = React.useState<boolean>(false);

  const handleNewEvent = () => {
    console.log("Nuevo evento creado.");
    openModal();
  };

  const handleConfirmDelete = () => {
    console.log("Evento eliminado.");
    setIsConfirmOpen(false);
  };

  const handleDeleteEvent = () => {
    setIsConfirmOpen(true);
    console.log("Evento eliminado.");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-4 mb-4">
        <button
          className="font-bold py-2 px-4 rounded-full shadow hover:border-2 transition"
          onClick={handleNewEvent}
        >
          Crear evento
        </button>
        <button
          className="font-bold bg-gray-300 px-4 py-2 rounded-full cursor-not-allowed opacity-50"
          onClick={handleDeleteEvent}
          disabled
        >
          Eliminar evento
        </button>
      </div>

      <EventsModal isOpen={isOpen} closeModal={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Crear nuevo evento</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Cerrar
          </button>
        </div>
      </EventsModal>

      <DeleteEventModal
        isOpen={isConfirmOpen}
        closeModal={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
};

export default EventsPrincipalScreen;
