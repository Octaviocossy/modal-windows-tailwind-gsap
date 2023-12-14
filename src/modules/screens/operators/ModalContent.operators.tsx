"use client";

import { useOperators, useProducts, useTable } from "@/hooks";
import { IOperator, IProduct } from "@/models";
import { useModalProvider } from "@/context";
import { DetailsItem } from "@/ui";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  operator: IOperator;
}

export const OperatorModalContent: React.FC<IProps> = ({ operator }) => {
  const { handleCreateProductModal } = useProducts();
  const { handleCreateOperatorModal } = useOperators();
  const { actions } = useModalProvider();

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
            onClick={() => {
              actions.onMinimize({
                id: operator.id,
                title: `Operator #${operator.id}`,
                handleOpen: handleCreateOperatorModal,
              });

              handleCreateProductModal(product.id);
            }}
            className="p-2 px-4 text-orange-700 hover:bg-orange-500/20 transition-colors bg-orange-500/10 rounded-lg"
          >
            Details
          </button>
        );
      },
    },
  ];

  const { Table } = useTable(operator.products ?? [], COLUMNS);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 w-full p-4 gap-4 text-sm">
        <DetailsItem label="Name" value={operator.name} />
        <DetailsItem label="Email" value={operator.email} />
        <DetailsItem label="Location" value={operator.location} />
        <DetailsItem label="Mobile" value={operator.mobile} />
      </div>
      <h3 className="text-lg font-bold p-4">List of products 📦</h3>
      <Table options={{ size: "sm", containerClassName: "px-4" }} />
    </div>
  );
};
