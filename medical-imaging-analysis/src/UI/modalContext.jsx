import { createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true); // You can toggle between login/signup here

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
    setIsSignup((prevState) => !prevState); // Toggle between signup and login
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, isSignup, openModal, closeModal, toggleModalType }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
