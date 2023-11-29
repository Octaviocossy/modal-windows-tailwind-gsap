"use client";

import { useTable } from "@/hooks";
import { IProduct } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

const COLUMNS: ColumnDef<IProduct>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: (props) => (
      <>
        <span className="text-blue-700">#</span>
        {props.getValue()}
      </>
    ),
  },
  { header: "Product", accessorKey: "name" },
  { header: "Description", accessorKey: "description" },
  { header: "Price", accessorKey: "price" },
  { header: "Operator", accessorKey: "operator_name" },
  {
    id: "actions",
    header: () => null,
    cell: (props) => {
      const product = props.row.original as IProduct;

      return (
        <button
          onClick={() => console.log(product.id)}
          className="p-2 px-4 text-blue-700 hover:bg-blue-500/20 transition-colors bg-blue-500/10 rounded-lg"
        >
          Details
        </button>
      );
    },
  },
];

interface IProps {
  products: IProduct[];
}

export function ProductsTable({ products }: IProps) {
  const { Table } = useTable(products, COLUMNS);

  return <Table />;
}
