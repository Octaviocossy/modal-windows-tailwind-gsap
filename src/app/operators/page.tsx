import { EResult, IOperator } from "@/models";
import { OperatorsTable } from "@/screens";
import { Container } from "@/ui";
import { api } from "@/services";

export default async function Products() {
  const { type, value } = await api.get<IOperator[]>("/api/operators");

  return (
    <Container>
      {type === EResult.SUCCESS && <OperatorsTable operators={value} />}
    </Container>
  );
}
