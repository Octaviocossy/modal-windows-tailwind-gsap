"use client";

import { useModalProvider } from "@/context";
import { parseWordSubstring } from "@/utilities";

export default function Home() {
  const { actions } = useModalProvider();

  const handleCreateModal = (id: number) => {
    actions.onCreate({
      handleOpen: handleCreateModal,
      minimizedTitle: parseWordSubstring("Testing title!", 20),
      isDraggeable: true,
      isOpen: true,
      title: "titulo!",
      size: "lg",
      id: id,
      component: (
        <div>
          <p>Test</p>
        </div>
      ),
    });
  };

  return (
    <div>
      <button onClick={() => handleCreateModal(1)}>create modal</button>
    </div>
  );
}
