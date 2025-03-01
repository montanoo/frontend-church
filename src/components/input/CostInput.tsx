import React, { useState } from "react";

interface CostInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const CostInput: React.FC<CostInputProps> = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Eliminar caracteres no numéricos, excepto el punto decimal
    inputValue = inputValue.replace(/[^0-9.]/g, "");

    // Evitar más de un punto decimal
    if ((inputValue.match(/\./g) || []).length > 1) {
      inputValue = inputValue.substring(0, inputValue.lastIndexOf(".") + 1);
    }

    // Limitar a dos decimales
    const decimalIndex = inputValue.indexOf(".");
    if (decimalIndex !== -1) {
      inputValue = inputValue.substring(0, decimalIndex + 3); 
    }

    // Eliminar ceros innecesarios a la izquierda
    if (inputValue.startsWith("0") && inputValue.length > 1 && !inputValue.startsWith("0.")) {
      inputValue = inputValue.replace(/^0+/, "");
    }

    setInputValue(inputValue);
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    } else {
      onChange(0);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block font-semibold">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

export default CostInput;
