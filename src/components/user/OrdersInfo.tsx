import { Order } from "@/types/order.types";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export default function OrdersInfo({ orders }: { orders: Order[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');

  const columns = useMemo<ColumnDef<Order>[]>(() => [
    {
      header: '#',
      accessorFn: (row, index) => index + 1,
      id: 'index',
      size: 50,
    },
    {
      header: 'Fecha',
      accessorKey: 'orderDate',
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleDateString('es-CO');
      },
      size: 100,
    },
    {
      header: 'Pedido',
      accessorKey: 'orderNumber',
      size: 120,
    },
    {
      header: 'Nombre',
      accessorFn: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
      id: 'customerName',
      size: 200,
    },
    {
      header: 'Identificación',
      accessorKey: 'customer.nationalId',
      size: 150,
    },
    {
      header: 'Teléfono',
      accessorKey: 'customer.phoneNumber',
      size: 130,
    },
    {
      header: 'Dirección',
      accessorKey: 'shippingAddress',
      size: 250,
    },
    {
      header: 'Ciudad',
      accessorKey: 'customer.city',
      size: 120,
    },
    {
      header: 'Notas',
      accessorKey: 'notes',
      size: 200,
      cell: ({ getValue }) => {
        const notes = getValue() as string;
        return notes ? (
          <span className="truncate block" title={notes}>
            {notes.length > 30 ? `${notes.substring(0, 30)}...` : notes}
          </span>
        ) : '-';
      },
    },
    {
      header: 'Total',
      accessorKey: 'totalAmount',
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        if (!amount) return '$0';

        return `$ ${amount.toLocaleString('es-CO')}`;
      },
      size: 100,
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const statusColors: Record<string, string> = {
          PENDING: 'bg-yellow-100 text-yellow-800',
          PROCESSING: 'bg-blue-100 text-blue-800',
          SHIPPED: 'bg-purple-100 text-purple-800',
          DELIVERED: 'bg-green-100 text-green-800',
          CANCELLED: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
          </span>
        );
      },
      size: 120,
    },
    {
      header: 'Acciones',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => console.log('Ver orden:', row.original.id)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Ver
          </button>
          <button
            onClick={() => console.log('Editar orden:', row.original.id)}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => console.log('Eliminar orden:', row.original.id)}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      ),
      size: 200,
    },
  ], []);

  const table = useReactTable<Order>({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Filtro global */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Buscar en todas las columnas..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="text-sm text-gray-600">
          Mostrando {table.getRowModel().rows.length} de {orders.length} órdenes
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <span>
                            {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'<'}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'>'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'>>'}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border rounded px-2 py-1"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}