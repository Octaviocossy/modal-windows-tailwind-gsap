import PRODUCTS from "@/mocks/products.mock.json";
import { TMiddlewareWParams } from "@/models";
import { NextResponse } from "next/server";

export const GET: TMiddlewareWParams<{ id: string }> = (_req, { params: { id } }) => {
  return NextResponse.json(PRODUCTS.find(product => product.id === Number(id)), { status: 200 });
};
