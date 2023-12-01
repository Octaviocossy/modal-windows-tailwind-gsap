"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useModalProvider } from "@/context";
import { Draggable } from "gsap/all";
import * as Icon from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/utilities";

const sizes: { [key: string]: string } = {
  xs: "min-w-[10rem] min-h-[10rem]",
  sm: "min-w-[20rem] min-h-[20rem]",
  md: "min-w-[30rem] min-h-[30rem]",
  lg: "min-w-[40rem] min-h-[40rem]",
  xl: "min-w-[50rem] min-h-[50rem]",
  full: "min-w-[100%] min-h-[100%]",
};

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => (
  <button
    className="p-1 rounded-lg hover:bg-gray-50 transition-all"
    {...props}
  />
);

const useModal = () => {
  const { state, actions } = useModalProvider();
  const { modal } = state;

  const Modal = () => {
    const modal_ref = useRef<HTMLDivElement | null>(null);
    const modal_content = useRef<HTMLDivElement | null>(null);
    const [isdraggable, setIsDraggable] = useState(true);

    useEffect(() => {
      gsap.registerPlugin(Draggable);

      const [dragg] = Draggable.create(modal_content.current, {
        type: "x,y",
        inertia: true,
        bounds: modal_ref.current,
      });

      isdraggable ? dragg?.enable() : dragg?.disable();

      return () => {
        dragg?.kill();
      };
    }, [isdraggable]);

    return (
      modal && (
        <div ref={modal_ref} className="min-h-screen min-w-full absolute top-0">
          <div
            className={cn(
              "absolute left-0 right-0 top-0 bottom-0 m-auto border rounded-lg bg-white w-fit h-fit shadow-sm",
              modal.isFullscreen
                ? sizes["full"]
                : sizes[modal.size as keyof typeof sizes]
            )}
            ref={modal_content}
          >
            <div
              className="flex justify-between items-center p-4 border-b"
              onMouseOver={() => setIsDraggable(true)}
            >
              <h2 className="text-lg font-bold">{modal.title}</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    actions.onMinimize({
                      id: modal.id,
                      title: modal.minimizedTitle,
                      handleOpen: modal.handleOpen,
                    });
                  }}
                >
                  <Icon.Minus className="h-[1.3rem] w-[1.3rem]" />
                </Button>
                <Button onClick={() => actions.onResize()}>
                  <Icon.PictureInPicture2 className="h-[1.3rem] w-[1.3rem]" />
                </Button>
                <Button onClick={() => actions.onClose()}>
                  <Icon.X className="h-[1.3rem] w-[1.3rem]" />
                </Button>
              </div>
            </div>
            <div
              className="flex justify-center items-center cursor-default h-full"
              onMouseOver={() => setIsDraggable(false)}
            >
              {modal.component}
            </div>
          </div>
        </div>
      )
    );
  };

  const Bar = () => {
    return (
      <div className="absolute bottom-0 z-50 min-h-screen">
        <div className="bottom-[1rem] flex flex-wrap fixed">
          {state.tabs.map((tab) => (
            <div
              key={tab.id}
              className="items-center bg-white border flex m-[1rem] p-[0.5rem] rounded-lg shadow-sm"
            >
              <p className="w-[13rem]">{tab.title}</p>
              <Button onClick={() => tab.handleOpen(tab.id)}>
                <Icon.Maximize2 className="h-[1rem] w-[1rem]" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { Modal: useCallback(() => <Modal />, [state.modal]), Bar: useCallback(() => <Bar />, [state.tabs]) } as const;
};

export default useModal;
