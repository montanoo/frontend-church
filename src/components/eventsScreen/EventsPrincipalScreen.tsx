"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventService from "@/requests/Events";

const EventsPrincipalScreen: React.FC = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    EventService.get()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const CreateEventsModal = useModal();
  const DeleteEventsModal = useModal();

  const handleNewEvent = () => {
    console.log("Nuevo evento creado.");
    CreateEventsModal.openModal();
  };

  const createEvent = () => {
    // add logic to request here, then...
    CreateEventsModal.closeModal();
  };

  const handleEventClick = () => {
    DeleteEventsModal.openModal();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-4 mb-4">
        <button
          className="font-bold py-2 px-4 rounded-full shadow hover:py-4 hover:px-6 transition-all duration-500"
          onClick={handleNewEvent}
        >
          Crear evento
        </button>
      </div>

      <CreateEventsModal.Modal
        isOpen={CreateEventsModal.isOpen}
        closeModal={CreateEventsModal.closeModal}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Crear nuevo evento
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={createEvent}
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Crear
          </button>
        </div>
      </CreateEventsModal.Modal>

      <DeleteEventsModal.Modal
        isOpen={DeleteEventsModal.isOpen}
        closeModal={DeleteEventsModal.closeModal}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Detalles de evento
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={CreateEventsModal.closeModal}
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Eliminar
          </button>
        </div>
      </DeleteEventsModal.Modal>

      <div className="w-[50%]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default EventsPrincipalScreen;
