'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@prisma/client';

export type OrderWithRelations = {
  id: string;
  orderNumber: string;
  userName: string;
  userPhone: string;
  paid: boolean;
  deliveryFee: number;
  serviceFee: number;
  status: OrderStatus;
  orderDate: Date;
  quantity: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
  };
  User: {
    email: string;
  };
};

const columns: ColumnDef<OrderWithRelations>[] = [
  {
    accessorKey: 'orderNumber',
    header: 'Order #',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.orderNumber}</div>
    ),
  },
  {
    accessorKey: 'userName',
    header: 'Customer Name',
    cell: ({ row }) => <div>{row.original.userName}</div>,
  },
  {
    accessorKey: 'userPhone',
    header: 'Phone',
    cell: ({ row }) => <div>{row.original.userPhone}</div>,
  },
  {
    accessorKey: 'paid',
    header: 'Payment',
    cell: ({ row }) => (
      <Badge variant={row.original.paid ? 'success' : 'warning'}>
        {row.original.paid ? 'Paid' : 'Pending'}
      </Badge>
    ),
  },
  {
    accessorKey: 'deliveryFee',
    header: 'Delivery Fee',
    cell: ({ row }) => (
      <div className="text-right">₹{row.original.deliveryFee.toFixed(2)}</div>
    ),
  },
  {
    accessorKey: 'serviceFee',
    header: 'Service Fee',
    cell: ({ row }) => (
      <div className="text-right">₹{row.original.serviceFee.toFixed(2)}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      const variants: Record<
        OrderStatus,
        | 'default'
        | 'outline'
        | 'secondary'
        | 'destructive'
        | 'success'
        | 'warning'
        | 'info'
        | 'pending'
        | 'neutral'
      > = {
        ORDERED: 'default',
        CONFIRMED: 'success',
        SHIPPED: 'info',
        OUT_FOR_DELIVERY: 'pending',
        DELIVERED: 'success',
        CANCELLED: 'destructive',
        RETURNED: 'warning',
      };

      return (
        <Badge variant={variants[status]}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'product.name',
    header: 'Product',
    cell: ({ row }) => {
      const tooltipContent = (
        <div className="space-y-2 p-2">
          <div>
            <strong>Product ID:</strong> {row.original.product.id}
          </div>
          <div>
            <strong>Quantity:</strong> {row.original.quantity}
          </div>
          <div>
            <strong>Subtotal:</strong> ₹{row.original.subtotal.toFixed(2)}
          </div>
          <div>
            <strong>Customer Email:</strong> {row.original.User.email}
          </div>
        </div>
      );

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center cursor-help">
                {row.original.product.name}
                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-md">
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },

  {
    accessorKey: 'orderDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{format(new Date(row.original.orderDate), 'PPP p')}</div>;
    },
  },
];

export function OrdersDataTable({ data }: { data: OrderWithRelations[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by order number..."
          value={
            (table.getColumn('orderNumber')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('orderNumber')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} order(s) total.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
