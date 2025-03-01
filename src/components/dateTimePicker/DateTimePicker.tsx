import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimeRangePicker: React.FC<{ onDateChange: (start: string, end: string) => void }> = ({ onDateChange }) => {
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (startDate && endDate && !initialized) {
      onDateChange(startDate.toISOString(), endDate.toISOString());
      setInitialized(true); 
    }
  }, [startDate, endDate, onDateChange, initialized]); 

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (isFirstRun.current) {
      isFirstRun.current = false;
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full p-6 border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-lg font-medium">Selecciona una hora de inicio y fin:</h3>

      {/* Selector de fecha de inicio */}
      <div className="flex items-center gap-4 w-full">
        <label className="block font-semibold w-1/2">Fecha y hora de inicio:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Selecciona hora de inicio"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Selector de fecha de fin */}
      <div className="flex items-center gap-4 w-full">
        <label className="block font-semibold w-1/2">Fecha y hora de fin:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Selecciona hora de fin"
          minDate={startDate || undefined}
          minTime={startDate ? new Date(new Date(startDate).setHours(startDate.getHours(), startDate.getMinutes(), 0, 0)) : undefined}
          maxTime={startDate ? new Date(new Date(startDate).setHours(23, 59, 59, 999)) : undefined}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default DateTimeRangePicker;
