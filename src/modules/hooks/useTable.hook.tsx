import { useCallback, useMemo, useState } from "react";
import * as TanstackTable from "@tanstack/react-table";
import * as Icon from "lucide-react";
import { cn } from "@/utilities";

interface ITableOptions {
  containerClassName?: string;
}

interface ITableProps {
  options?: ITableOptions;
}

const useTable = <T extends Object>(data: T[], columns: TanstackTable.ColumnDef<T>[]) => {
  const Table: React.FC<ITableProps> = (props) => {
    const [{ pageIndex, pageSize }, setPagination] = useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 5 });

    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

    const table = TanstackTable.useReactTable({
      getPaginationRowModel: TanstackTable.getPaginationRowModel(),
      getCoreRowModel: TanstackTable.getCoreRowModel(),
      onPaginationChange: setPagination,
      state: { pagination },
      columns,
      data,
    });

    return (
      <div
        className={cn(
          "border w-fit rounded-md",
          props.options?.containerClassName
        )}
      >
        <table className={"table-auto"}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4">
                    {header.isPlaceholder
                      ? null
                      : TanstackTable.flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-b">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4">
                      {TanstackTable.flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 font-bold"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex space-x-4 text-sm justify-center items-center p-4">
          <div className="flex space-x-2">
            <button
              className={cn(
                "h-fit p-2 px-4 text-sm rounded-md hover:bg-gray-50 transition-colors border",
                { "bg-gray-50": !table.getCanPreviousPage() }
              )}
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            >
              <Icon.ChevronsLeft className="h-[1rem] w-[1rem]" />
            </button>
            <button
              className={cn(
                "h-fit p-2 px-4 text-sm rounded-md hover:bg-gray-50 transition-colors border",
                { "bg-gray-50": !table.getCanPreviousPage() }
              )}
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <Icon.ChevronLeft className="h-[1rem] w-[1rem]" />
            </button>
          </div>
          <p>{table.getState().pagination.pageIndex + 1}</p>
          <div className="flex space-x-2">
            <button
              className={cn(
                "h-fit p-2 px-4 text-sm rounded-md hover:bg-gray-50 transition-colors border",
                { "bg-gray-50": !table.getCanNextPage() }
              )}
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <Icon.ChevronRight className="h-[1rem] w-[1rem]" />
            </button>
            <button
              className={cn(
                "h-fit p-2 px-4 text-sm rounded-md hover:bg-gray-50 transition-colors border ",
                { "bg-gray-50": !table.getCanNextPage() }
              )}
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              <Icon.ChevronsRight className="h-[1rem] w-[1rem]" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { Table: useCallback((props: ITableProps) => (<Table {...props} />), [data]) };
};

export default useTable;
