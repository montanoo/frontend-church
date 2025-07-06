"use client";
import React, { useEffect, useState } from "react";
//import axios from 'axios';
import FinanceService from "@/requests/Finance";
import { cA } from "node_modules/@fullcalendar/core/internal-common";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";


interface Transaction {
  id: number;
  transactionType: string;
  amount: number;
  description: string;
  transactionDate: string;
  category: string;
}

const FinancesScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);

  const [form, setForm] = useState({
    transactionType: "",
    amount: "",
    description: "",
    transactionDate: "",
    category: "",
  });

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    transactionType: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await FinanceService.get();
      setTransactions(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  };

  useEffect(() => {
    let data = [...transactions];

    if (filters.transactionType) {
      data = data.filter((t) => t.transactionType === filters.transactionType);
    }

    if (filters.from) {
      data = data.filter(
        (t) => new Date(t.transactionDate) >= new Date(filters.from)
      );
    }

    if (filters.to) {
      data = data.filter(
        (t) => new Date(t.transactionDate) <= new Date(filters.to)
      );
    }

    if (filters.description.trim()) {
      data = data.filter((t) =>
        t.description.toLowerCase().includes(filters.description.trim().toLowerCase())
      );
    }

    if (filters.category.trim()) {
      data = data.filter((t) =>
        t.category.toLowerCase().includes(filters.category.trim().toLowerCase())
      );
    }

    setFiltered(data);
  }, [filters, transactions]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedAmount = parseFloat(form.amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Monto inválido");
      }

      const dataToSend = {
        transactionType: form.transactionType,
        amount: parsedAmount,
        description: form.description,
        transactionDate: new Date(form.transactionDate).toISOString(),
        category: form.category,
      };

      await FinanceService.post(dataToSend);

      // Limpiar el formulario
      setForm({
        transactionType: "",
        amount: "",
        description: "",
        transactionDate: "",
        category: "",
      });

      // Volver a cargar las transacciones
      fetchTransactions();
    } catch (err) {
      console.error("Error submitting transaction", err);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Define las columnas y filas
    const columns = ["ID", "Tipo", "Monto", "Descripción", "Fecha", "Categoría"];
    const rows = filtered.map((t) => [
      t.id,
      t.transactionType,
      `$${parseFloat(t.amount as any).toFixed(2)}`,
      t.description,
      new Date(t.transactionDate).toLocaleDateString(),
      t.category,
    ]);

    // Título
    doc.setFontSize(16);
    doc.text("Reporte de Transacciones", 14, 20);

    // Tabla
    autoTable(doc, {
      startY: 30,
      head: [columns],
      body: rows,
    });

    // Descargar
    doc.save("transacciones_parroquia.pdf");
  };

  const handleExportExcel = () => {
    // Agrupar por fecha y sumar montos
    const aggregated = filtered.reduce((acc, t) => {
      const dateKey = new Date(t.transactionDate).toLocaleDateString();
      acc[dateKey] = (acc[dateKey] || 0) + parseFloat(t.amount as any);
      return acc;
    }, {} as Record<string, number>);

    // Convertir datos a formato Excel (dos hojas: transacciones y resumen)
    const transactionSheetData = [
      ["ID", "Tipo", "Monto", "Descripción", "Fecha", "Categoría"],
      ...filtered.map((t) => [
        t.id,
        t.transactionType,
        parseFloat(t.amount as any),
        t.description,
        t.transactionDate.split("T")[0], // Formatear fecha
        t.category,
      ]),
    ];

    const summarySheetData = [
      ["Fecha", "Total"],
      ...Object.entries(aggregated),
    ];

    const wb = XLSX.utils.book_new();

    const transactionSheet = XLSX.utils.aoa_to_sheet(transactionSheetData);
    const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);

    XLSX.utils.book_append_sheet(wb, transactionSheet, "Transacciones");
    XLSX.utils.book_append_sheet(wb, summarySheet, "Resumen");

    // Exportar
    XLSX.writeFile(wb, "transacciones_parroquia.xlsx");
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transacciones</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Ingresar Transacción
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Changed transactionType input to a dropdown */}
          <select
            name="transactionType"
            value={form.transactionType}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Seleccione tipo</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
            <option value="Transferencia">Transferencia</option>
          </select>
          <input
            name="amount"
            value={form.amount}
            onChange={handleInputChange}
            type="number"
            placeholder="Monto"
            className="border p-2 rounded w-full"
            required
            min="0.01"
            step="0.01"
            inputMode="decimal"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleInputChange}
            type="text"
            placeholder="Descripción"
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="transactionDate"
            value={form.transactionDate}
            onChange={handleInputChange}
            type="date"
            className="border p-2 rounded w-full"
            max={today}
            required
          />
          <input
            name="category"
            value={form.category}
            onChange={handleInputChange}
            type="text"
            placeholder="Categoría"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </form>

      {/* Filtros */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filtros</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Desde:</label>
            <input
              name="from"
              value={filters.from}
              onChange={handleFilterChange}
              type="date"
              className="border p-2 rounded"
            />
            <label className="text-gray-700">Hasta:</label>
            <input
              name="to"
              value={filters.to}
              onChange={handleFilterChange}
              type="date"
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-gray-700 block mb-1">
              Tipo de Transacción:
            </label>
            <select
              name="transactionType"
              value={filters.transactionType}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Todos</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <div>
              <label className="text-gray-700 block mb-1">Buscar por descripción:</label>
              <input
                name="description"
                value={filters.description}
                onChange={handleFilterChange}
                type="text"
                placeholder="Ej: Efectivo"
                className="border p-2 rounded w-full"
              />
            </div>
          <div>
              <label className="text-gray-700 block mb-1">Buscar por categoría:</label>
              <input
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                type="text"
                placeholder="Ej: Ofrenda"
                className="border p-2 rounded w-full"
              />
            </div>
        </div>
      </div>
      
      <div className="w-full max-w-5xl mb-4 flex justify-end">
        <button
          onClick={handleExportPDF}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Exportar a PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ml-2"
        >
          Exportar a Excel
        </button>
      </div>

      {/* Tabla */}
      <div className="w-full max-w-5xl overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">Monto</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
              <th className="border border-gray-300 px-4 py-2">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <tr key={t.id}>
                  <td className="border px-4 py-2">{t.id}</td>
                  <td className="border px-4 py-2">{t.transactionType}</td>
                  <td className="border px-4 py-2">${Number(t.amount).toFixed(2)}</td>
                  <td className="border px-4 py-2">{t.description}</td>
                  <td className="border px-4 py-2">
                      {t.transactionDate.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">{t.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center border px-4 py-2" colSpan={6}>
                  No hay transacciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancesScreen;
