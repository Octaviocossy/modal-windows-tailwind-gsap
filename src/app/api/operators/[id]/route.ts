import OPERATORS from "@/mocks/operators.mock.json";
import PRODUCTS from "@/mocks/products.mock.json";
import { TMiddlewareWParams } from "@/models";
import { NextResponse } from "next/server";

export const GET: TMiddlewareWParams<{ id: string }> = (_req, { params: { id } }) => {
  const operator = OPERATORS.find(operator => operator.id === Number(id))
  const products = PRODUCTS.filter(product => product.operator_id === Number(id))

  return NextResponse.json({ ...operator, products }, { status: 200 });
};
