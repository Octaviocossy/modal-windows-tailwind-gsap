import { NextRequest } from "next/server";

interface IParams<T> {
  params: T;
}

export type TMiddleware = (req: NextRequest) => void;

export type TMiddlewareWParams<T> = (req: NextRequest, params: IParams<T>) => void;
