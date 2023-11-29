import { NextResponse } from "next/server";
import PRODUCTS from "@/mocks/products.mock.json";

export const GET = () => {
  return NextResponse.json(PRODUCTS, { status: 200 });
};
