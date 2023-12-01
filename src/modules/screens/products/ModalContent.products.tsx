import { IProduct } from "@/models";

interface IProps {
  product: IProduct;
}

export const ProductModalContent: React.FC<IProps> = ({ product }) => {
  return <div>{product.name}</div>;
};
