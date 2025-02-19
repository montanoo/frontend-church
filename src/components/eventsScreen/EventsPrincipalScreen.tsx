"use client";
import React, { useEffect, useState, useRef } from "react";

type Option = {
  value: string;
  label: string;
};
import { useModal } from "@/hooks/useModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventService from "@/requests/Events";
import DateTimeRangePicker from "../dateTimePicker/DateTimePicker";
import CostInput from "../input/CostInput";
import HallService from "@/requests/Hall";
import EventOrganizerService from "@/requests/EventOrganizer";
import Dropdown from "../dropdown/Dropdown";
import HallDropdown from "../dropdown/HallDropdown";      

const EventsPrincipalScreen: React.FC = () => {

  const [dateRange, setDateRange] = useState<{ startDateTime: string; endDateTime: string }>({
    startDateTime: '',
    endDateTime: ''
  });

  const [events, setEvents] = useState([]);
  useEffect(() => {
    EventService.get()
      .then((res) => {
        setEvents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [halls, setHalls] = useState<Option[]>([]); 
  const [organizers, setOrganizers] = useState<Option[]>([]);

  const [cost, setCost] = useState<number>(0);
  const CreateEventsModal = useModal();
  const DeleteEventsModal = useModal();
  const CreateHallModal = useModal();
  const CreateOrganizerModal = useModal();

  const hallNameRef = useRef<HTMLInputElement | null>(null);
  const hallCapacityRef = useRef<HTMLInputElement | null>(null);

  const organizerNameRef = useRef<HTMLInputElement | null>(null);
  const organizerEmailRef = useRef<HTMLInputElement | null>(null);
  const organizerPhoneRef = useRef<HTMLInputElement | null>(null);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const organizerIdRef = useRef<HTMLInputElement | null>(null);
  const hallIdRef = useRef<HTMLInputElement | null>(null);

  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string | null>(null);

  const handleSelectOrganizer = (value: string) => {
    setSelectedOrganizer(value); 
  };

  const handleSelectHall = (value: string) => {
    setSelectedHall(value); 
  };

  useEffect(() => {
    HallService.get()
      .then((res) => {
        const formattedHalls = res.data.map((hall: { id: string; hallName: string }) => ({
          value: hall.id,  
          label: hall.hallName, 
        }));
        setHalls(formattedHalls);
        console.log(formattedHalls, "Halls data");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);  

  useEffect(() => {
    EventOrganizerService.get()
      .then((res) => {
        const formattedOrganizers = res.data.map((organizer: { id: string; name: string }) => ({
          value: organizer.id,  
          label: organizer.name, 
        }));
        setOrganizers(formattedOrganizers);
        console.log(formattedOrganizers, "Organizers data");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("Salones actualizados:", halls);
  }, [halls]);

  useEffect(() => {
    console.log("Encargados actualizados:", organizers);
  }, [organizers]);

  const handleNewEvent = () => {
    console.log("Nuevo evento creado.");
    CreateEventsModal.openModal();
  };


  const handleEventClick = () => {
    DeleteEventsModal.openModal();
  };

  const handleNewHall = () => {
    CreateHallModal.openModal();
  };

  const handleNewOrganizer = () => {
    CreateOrganizerModal.openModal();
  };

  const handleCreateHall = () => {
    HallService.post({
      hallName: hallNameRef.current?.value || "",
      capacity: parseInt(hallCapacityRef.current?.value || "0"),
      parishId: 1,
    })
        .then((res) => {
          const formattedHalls = res.data.map((hall: { id: string; name: string }) => ({
           value: hall.id,
           label: hall.name,
          }));
          setHalls(formattedHalls);
          console.log(formattedHalls, "Halls data after creation");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          CreateHallModal.closeModal();
        });
  };

  const handleCreateEvent = () => {
    EventService.post({
      title: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      cost: cost,
      hallId: selectedHall ? parseInt(selectedHall) : 0,
      organizerId: selectedOrganizer ? parseInt(selectedOrganizer) : 0,
      startDateTime: new Date(dateRange.startDateTime), 
      endDateTime: new Date(dateRange.endDateTime),      
    })
    .then((res) => {
      setEvents(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      CreateEventsModal.closeModal();
    });
  };

  const handleCreateOrganizer = () => {
    EventOrganizerService.post({
      name: organizerNameRef.current?.value || "",
      email: organizerEmailRef.current?.value || "",
      phoneNumber: organizerPhoneRef.current?.value || "",
    })
        .then((res) => {
          setOrganizers(res.data);
          console.log(organizers);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          CreateOrganizerModal.closeModal();
        });
  }

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
        <div className="relative border border-gray-300 flex gap-4 items-center p-4">

          <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium text-gray-600">
            Eventos
          </span>

            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex items-center gap-4 w-full">
              <label htmlFor="event" className="block font-semibold w-1/3">
                Evento:
              </label>
              <input
                type="text"
                id="event"
                className="w-full p-1 border border-gray-300 rounded-md"
                ref={titleRef}
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label htmlFor="church" className="block font-semibold w-1/3">
                Descripción:
              </label>
              <input
                type="text"
                id="description"
                className="w-full p-1 border border-gray-300 rounded-md"
                ref={descriptionRef}
              />
            </div>

            <div>

              <DateTimeRangePicker
              onDateChange={(start, end) => setDateRange({ startDateTime: start, endDateTime: end })}
              />

            </div>

            <div>
            <CostInput
                label="Costo del evento"
                value={cost}
                onChange={setCost}
              />
            </div>

            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="saloonText" className="block font-semibold w-2/3">
                  Salón
                </label>

                <HallDropdown options={halls} selected={selectedHall} onSelect={handleSelectHall} ref={hallIdRef}/>

                <button
                onClick={handleNewHall}
                className="flex-col-4 text-[#6AADB4] py-1 px-2 rounded-full shadow hover:py-2 hover:px-3 transition-all duration-500 w-1/3"
                >
                  Agregar salón
                </button>
              </div>
            </div>

            <CreateHallModal.Modal
              isOpen={CreateHallModal.isOpen}
              closeModal={CreateHallModal.closeModal}
            >
              <div className="relative border border-gray-300 flex gap-4 items-center p-4">
                <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium text-gray-600">
                  Salones
                </span>
                
                <div className="flex flex-col gap-y-4 w-full">
                  {/* Nombre del salón */}
                  <div className="flex items-center gap-4 w-full">
                    <label htmlFor="hall" className="font-semibold w-1/3">
                      Nombre del salón:
                    </label>
                    <input
                      type="text"
                      id="hall"
                      className="w-full p-1 border border-gray-300 rounded-md"
                      placeholder="Escribe el nombre del salón"
                      ref={hallNameRef}
                    />
                  </div>

                  {/* Capacidad */}
                  <div className="flex items-center gap-4 w-full">
                    <label htmlFor="capacity" className="font-semibold w-1/3">
                      Capacidad:
                    </label>
                    <input
                     type="number"
                      id="capacity"
                      className="w-full p-1 border border-gray-300 rounded-md"
                      placeholder="Escribe la capacidad del salón"
                      ref={hallCapacityRef}
                    />
                  </div>



                  <div className="flex items-center justify-center w-full">
                  <button 
                    onClick={handleCreateHall}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
                  >
                    Crear salón
                  </button>
                </div>

                </div>                  
              </div>
            </CreateHallModal.Modal>

        </div>
        </div>

        <div className="relative border border-gray-300 flex gap-4 items-center p-4 mt-4">
          
          <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium text-gray-600">
            Encargado
          </span>

          <div className="flex flex-col gap-y-4 w-full">
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="saloonText" className="block font-semibold w-2/3">
                  Encargado
                </label>

                <Dropdown options={organizers} selected={selectedOrganizer} onSelect={handleSelectOrganizer} ref={organizerIdRef}/>

                <button
                onClick={handleNewOrganizer}
                className="flex-col-4 text-[#6AADB4] py-1 px-2 rounded-full shadow hover:py-2 hover:px-3 transition-all duration-500 w-1/3"
                >
                  Agregar encargado
                </button>
              </div>
            </div>

            <CreateOrganizerModal.Modal
              isOpen={CreateOrganizerModal.isOpen}
              closeModal={CreateOrganizerModal.closeModal}
            >
              <div className="relative border border-gray-300 flex gap-4 items-center p-4">
                <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium text-gray-600">
                  Encargados
                </span>
                
                <div className="flex flex-col gap-y-4 w-full">
                  {/* Nombre del encargado */}
                  <div className="flex items-center gap-4 w-full">
                    <label htmlFor="organizer" className="font-semibold w-1/3">
                      Nombre del encargado:
                    </label>
                    <input
                      type="text"
                      id="organizer"
                      className="w-full p-1 border border-gray-300 rounded-md"
                      placeholder="Escribe el nombre del encargado"
                      ref={organizerNameRef}
                    />
                  </div>

                  {/* Correo electronico */}
                  <div className="flex items-center gap-4 w-full">
                    <label htmlFor="email" className="font-semibold w-1/3">
                      E-mail:
                    </label>
                    <input
                     type="string"
                      id="email"
                      className="w-full p-1 border border-gray-300 rounded-md"
                      placeholder="Escribe el correo del encargado"
                      ref={organizerEmailRef}
                    />
                  </div>

                  {/* Número de teléfono del encargado */}
                  <div className="flex items-center gap-4 w-full">
                    <label htmlFor="phoneNumber" className="font-semibold w-1/3">
                      Número de teléfono:
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="w-full p-1 border border-gray-300 rounded-md"
                      placeholder="Escribe el nombre del encargado"
                      ref={organizerPhoneRef}
                    />
                  </div>

                  <div className="flex items-center justify-center w-full">
                  <button 
                    onClick={handleCreateOrganizer}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
                  >
                    Crear encargado
                  </button>
                </div>

                </div>                  
              </div>
            </CreateOrganizerModal.Modal>

        </div>


        <div className="flex justify-center gap-4">
          <button
            onClick={handleCreateEvent}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
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
