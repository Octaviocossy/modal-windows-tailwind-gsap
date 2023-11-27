import { ReactNode } from "react";

type ISize = "sm" | "md" | "lg" | "xl" | "full";

export interface IModal {
  id: number;
  size: ISize;
  title: string;
  isOpen: boolean;
  component: ReactNode;
  isDraggeable?: boolean;
  isFullscreen?: boolean;
  minimizedTitle: string;
  handleOpen: (id: number) => void;
}

export interface IModalState<T> {
  id: number;
  data: T;
}

export interface ITab {
  title: string;
  id: number;
  handleOpen: (id: number) => void;
}
