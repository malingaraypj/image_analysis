import { createContext, useState } from "react";

const ModalContext = createContext({
  isModalOpen: false,
  modalType: "signup",
  toggle: () => {},
});

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signup");

  const openModal = () => {
    console.log("opening the modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("closing modal");
    setIsModalOpen(false);
  };

  const toggleModalType = () => {
    console.log("switching modal");
    setModalType((prevState) => {
      if (prevState === "signup") {
        return "login";
      }
      return "signup";
    }); // Toggle between signup and login
  };

  const contextVal = {
    isModalOpen,
    modalType,
    openModal,
    closeModal,
    toggleModalType,
  };

  console.log(contextVal)

  return (
    <ModalContext.Provider value={contextVal}>{children}</ModalContext.Provider>
  );
}

export default ModalContext;
