"use client";

import { useOperators, useTable } from "@/hooks";
import { IOperator } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  operators: IOperator[];
}

export function OperatorsTable({ operators }: IProps) {
  const { handleCreateOperatorModal } = useOperators();

  const COLUMNS: ColumnDef<IOperator>[] = [
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
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Location", accessorKey: "location" },
    { header: "Phone number", accessorKey: "mobile" },
    {
      id: "actions",
      header: () => null,
      cell: (props) => {
        const operator = props.row.original as IOperator;

        return (
          <button
            onClick={() => handleCreateOperatorModal(operator.id)}
            className="p-2 px-4 text-blue-700 hover:bg-blue-500/20 transition-colors bg-blue-500/10 rounded-lg"
          >
            Products
          </button>
        );
      },
    },
  ];

  const { Table } = useTable(operators, COLUMNS);

  return <Table options={{ borders: true }} />;
}
