"use client";

import { useModal } from "@/hooks";

interface IProps {
  children: React.ReactNode;
}

export function ModalLayout({ children }: IProps) {
  const { Modal, Bar } = useModal();

  return (
    <>
      {children}
      <Modal />
      <Bar />
    </>
  );
}

