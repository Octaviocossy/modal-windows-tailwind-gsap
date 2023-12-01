"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/models";
import { useTable } from "@/hooks";
import { api } from "@/services";

const handleCreateProductModal = async (id: IProduct["id"]) => {
  const { value } = await api.get(`/api/products/${id}`);

  console.log(value);
};

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
          onClick={() => handleCreateProductModal(product.id)}
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
