"use client";

import { ModalProvider } from "@/context";

interface IProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProps) {
  return <ModalProvider>{children}</ModalProvider>;
}
