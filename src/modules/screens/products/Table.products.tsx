"use client";

import { ProductModalContent } from "./ModalContent.products";
import { EResult, IProduct } from "@/models";
import { useModalProvider } from "@/context";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@/hooks";
import { api } from "@/services";

interface IProps {
  products: IProduct[];
}

export function ProductsTable({ products }: IProps) {
  const { actions } = useModalProvider();

  const handleCreateProductModal = async (id: IProduct["id"]) => {
    const { type, value } = await api.get<IProduct>(`/api/products/${id}`);

    if (type === EResult.ERROR) return;

    actions.onCreate({
      minimizedTitle: `Product #${value.id}`,
      isDraggeable: true,
      handleOpen: handleCreateProductModal,
      component: (<ProductModalContent product={value} />),
      isOpen: true,
      title: `Product #${value.id}`,
      size: "md",
      id: value.id,
    });
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

  const { Table } = useTable(products, COLUMNS);

  return <Table />;
}
