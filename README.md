# Modal Windows System 🪟 
This system is able to create modal windows, minimize or maximize them. The idea was to create a base in TailwindCSS capable of being modified to the taste of each developer, it is 100% customizable and adaptable to circumstances.

## Technologies ⚙️
- NextJS
- TailwindCSS
- GSAP
- Lucide Icons

## Layout and components 🌈
The system has two parts, a custom Hook that contains the Modal and Bar components (minimized modal view), and the Modal context, this is where the magic happens. ✨

The ideal is to create a layout in which the aforementioned components will be found.
```TypeScript
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
```

## CRUD 📦
The modal Context provides us with 4 functions, onCreate, onClose, onMinimize and onResize, of which the most used will be onCreate and onMinimize, we don't have to worry about the others.

### onCreate 📦
Function used to create a new modal window, the same one receives some properties that we are going to explain next.
```TypeScript
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
```
Some of the most important properties:
- _minimizedTitle_: Title that will appear once minimized.
- _isDraggable_: If this property is true the modal will be able to be dragged on the screen.
- _handleOpen_: function that will be used at the moment of minimizing the modal, this must be the same function in which onCreate is called.
- _component_: Component that will show the modal.
- _title_: Title that will be shown in the modal.
- _size_: size of the modal.
- _id_: id of the modal.

```TypeScript
actions.onCreate({
    minimizedTitle: `Operator #${value.id}`,
    isDraggeable: true,
    handleOpen: handleCreateOperatorModal,
    component: <OperatorModalContent operator={value} />,
    isOpen: true,
    title: `Operator #${value.id}`,
    size: "lg",
    id: value.id,
});
```

### onMinimize 📦
This function clears the state Modal inside the context and saves in the state Tabs the properties that we pass to it by parameters. In simple words, it creates the minimized tab.
```TypeScript
export interface ITab {
  title: string;
  id: number;
  handleOpen: (id: number) => void;
}
```
Some of the most important properties:
- _title_: Title that will appear once minimized.
- _id_: id of the modal.
- _handleOpen_: Title that will appear once minimized.
```TypeScript
actions.onMinimize({
    id: operator.id,
    title: `Operator #${operator.id}`,
    handleOpen: handleCreateOperatorModal,
});
```
