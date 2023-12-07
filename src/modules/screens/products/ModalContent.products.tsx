import { IProduct } from "@/models";
import { DetailsItem } from "@/ui";

interface IProps {
  product: IProduct;
}
export const ProductModalContent: React.FC<IProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-2 w-full p-4 gap-4">
      <DetailsItem label="Name" value={product.name} />
      <DetailsItem label="description" value={product.description} />
      <DetailsItem label="price" value={product.price} />
      <DetailsItem label="Operator Name" value={product.operator_name} />
    </div>
  );
};
