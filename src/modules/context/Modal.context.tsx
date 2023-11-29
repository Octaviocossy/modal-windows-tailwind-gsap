import { getLocalStorage, updateIdOnLocalStorage } from "@/utilities";
import { createContext, useContext, useState } from "react";
import { ELocalStorage, IModal, ITab } from "@/models";

interface State {
  modal: IModal | null;
  tabs: ITab[];
}

interface Actions {
  onClose: () => void;
  onCreate: (modal: IModal) => void;
  onResize: () => void;
  onMinimize: (props: ITab) => void;
}

interface IContextProps {
  state: State;
  actions: Actions;
}

const Context = createContext({} as IContextProps);

interface IProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<IProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<IModal | null>(null);
  const [tabs, setTabs] = useState<ITab[]>([]);

  const onCreate = (modal: IModal) => {
    const sessionTabs = getLocalStorage<number[]>(ELocalStorage.TABS) || [];

    if (sessionTabs.some((idTab) => idTab === modal.id)) {
      setTabs((prev) => prev.filter((tab) => tab.id !== modal.id));
      updateIdOnLocalStorage<IModal["id"]>(modal.id, ELocalStorage.TABS);
    }

    setModal(modal);
  };

  const onClose = () => {
    setModal(null);
  };

  const onMinimize = ({ title, id, handleOpen }: ITab) => {
    setModal(null);

    updateIdOnLocalStorage<ITab["id"]>(id, ELocalStorage.TABS);

    setTabs((prev) => [...prev, { title, id, handleOpen }]);
  };

  const onResize = () => {
    setModal((prev) => {
      if (!prev) return null;

      return { ...prev, isFullscreen: !prev.isFullscreen };
    });
  };

  const state = { modal, tabs };
  const actions = { onCreate, onClose, onMinimize, onResize };

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
};

export const useModalProvider = () => {
  const { state, actions } = useContext(Context);

  return { state, actions };
};
