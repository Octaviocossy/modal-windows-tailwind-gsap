import { ProductsTable } from "./table";
import { IProduct } from "@/models";
import { api } from "@/services";
import { Center } from "@/ui";

export default async function Products() {
  const { type, value } = await api.get<IProduct[]>("/products");

  return (
    <Center>{type === "success" && <ProductsTable products={value} />}</Center>
  );
}
