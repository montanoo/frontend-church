const FinancesScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transacciones ultra super cool</h1>

      {/* Formulario de ingreso de transacción */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingresar Transacción</h2>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" placeholder="Tipo de transacción" className="border p-2 rounded w-full" />
          <input type="number" placeholder="Monto" className="border p-2 rounded w-full" />
          <input type="text" placeholder="Descripción" className="border p-2 rounded w-full" />
          <input type="date" className="border p-2 rounded w-full" />
          <input type="text" placeholder="Categoría" className="border p-2 rounded w-full" />
        </div>
      </div>

      {/* Filtros */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filtros</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Filtro de Rango de Fechas */}
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Desde:</label>
            <input type="date" className="border p-2 rounded" />
            <label className="text-gray-700">Hasta:</label>
            <input type="date" className="border p-2 rounded" />
          </div>

          {/* Filtro Dropdown - Tipo de Transacción */}
          <div>
            <label className="text-gray-700 block mb-1">Tipo de Transacción:</label>
            <select className="border p-2 rounded w-full">
              <option value="">Todos</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Finanzas */}
      <div className="w-full max-w-5xl overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Id de transacción</th>
              <th className="border border-gray-300 px-4 py-2">Tipo de transacción</th>
              <th className="border border-gray-300 px-4 py-2">Monto</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Fecha de transacción</th>
              <th className="border border-gray-300 px-4 py-2">Categoría</th>
              <th className="border border-gray-300 px-4 py-2">Reserva</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí se llenarán las filas dinámicamente en el futuro */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center" colSpan={7}>
                (Sin datos por ahora)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancesScreen;



  