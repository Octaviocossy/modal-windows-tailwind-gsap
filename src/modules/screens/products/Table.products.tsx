"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useProducts, useTable } from "@/hooks";
import {  IProduct } from "@/models";

interface IProps {
  products: IProduct[];
}

export function ProductsTable({ products }: IProps) {
  const { handleCreateProductModal } = useProducts();

  const COLUMNS: ColumnDef<IProduct>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (props) => (
        <>
          <span className="text-orange-700">#</span>
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
            onClick={() => handleCreateProductModal(product.id)}
            className="p-2 px-4 text-orange-700 hover:bg-orange-500/20 transition-colors bg-orange-500/10 rounded-lg"
          >
            Details
          </button>
        );
      },
    },
  ];

  const { Table } = useTable(products, COLUMNS);

  return <Table options={{ borders: true }} />;
}
