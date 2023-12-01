import { NextResponse } from "next/server";
import OPERATORS from "@/mocks/operators.mock.json";

export const GET = () => {
  return NextResponse.json(OPERATORS, { status: 200 });
};
