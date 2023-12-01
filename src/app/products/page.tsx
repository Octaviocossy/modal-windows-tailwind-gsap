import { EResult, IProduct } from "@/models";
import { ProductsTable } from "@/screens";
import { Container } from "@/ui";
import { api } from "@/services";

export default async function Products() {
  const { type, value } = await api.get<IProduct[]>("/products");

  return (
    <Container>
      {type === EResult.SUCCESS && <ProductsTable products={value} />}
    </Container>
  );
}
