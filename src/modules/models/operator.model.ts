import { IProduct } from "@/models";

export interface IOperator {
  id: number;
  name: string;
  email: string;
  location: string;
  mobile: string;
  products?: IProduct[];
}
