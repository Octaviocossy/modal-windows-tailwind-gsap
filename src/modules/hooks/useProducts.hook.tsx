import { ProductModalContent } from "@/screens";
import { EResult, IProduct } from "@/models";
import { useModalProvider } from "@/context";
import { api } from "@/services";

const useProducts = () => {
  const { actions } = useModalProvider();

  const handleCreateProductModal = async (id: IProduct["id"]) => {
    const { type, value } = await api.get<IProduct>(`/api/products/${id}`);

    if (type === EResult.ERROR) return;

    actions.onCreate({
      minimizedTitle: `Product #${value.id}`,
      isDraggeable: true,
      handleOpen: handleCreateProductModal,
      component: <ProductModalContent product={value} />,
      isOpen: true,
      title: `Product #${value.id}`,
      size: "md",
      id: value.id,
    });
  };

  return { handleCreateProductModal };
};

export default useProducts;
