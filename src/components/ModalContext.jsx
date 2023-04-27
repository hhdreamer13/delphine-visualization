import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const value = {
    showModal,
    setShowModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
