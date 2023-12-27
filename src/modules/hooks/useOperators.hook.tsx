import { OperatorModalContent } from "@/screens";
import { EResult, IOperator } from "@/models";
import { useModalProvider } from "@/context";
import { api } from "@/services";

const useOperators = () => {
  const { actions } = useModalProvider();

  const handleCreateOperatorModal = async (id: IOperator["id"]) => {
    const { type, value } = await api.get<IOperator>(`/api/operators/${id}`);

    if (type === EResult.ERROR) return;

    actions.onCreate({
      minimizedTitle: `Operator #${value.id}`,
      isDraggeable: true,
      handleOpen: handleCreateOperatorModal,
      component: <OperatorModalContent operator={value} />,
      isOpen: true,
      title: `Operator #${value.id}`,
      size: "lg",
      id: value.id,
    });
  };

  return { handleCreateOperatorModal };
};

export default useOperators;
