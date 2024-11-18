import { useState, useRef, useContext, useEffect } from "react";
import validator from "validator";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ModalContext from "../UI/modalContext";

export default function Login() {
  const [errors, setErrors] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();

  // Validate form data
  function validateForm(data) {
    const validationErrors = {};

    // Email Validation
    if (!validator.isEmail(data.email)) {
      validationErrors.email = "Invalid email address";
    }

    // Password Validation
    if (!validator.isLength(data.password, { min: 8 })) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    return validationErrors;
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // Form Validation
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/medical_analysis/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error while logging in");
      }

      const result = await response.json();
      console.log(result);
      modalCtx.closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  const modalCtx = useContext(ModalContext);
  useEffect(() => {
    if (modalCtx.isModalOpen && modalCtx.isLogin) {
      modalCtx.closeModal();
    }
  }, [modalCtx, modalCtx.isModalOpen, modalCtx.isLogin]);

  return (
    <Modal
      open={modalCtx.isModalOpen && modalCtx.isLogin}
      onClose={modalCtx.closeModal}
    >
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            ref={emailRef}
            id="email"
            label="Enter your email"
            type="email"
            error={errors.email}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <Input
            ref={passwordRef}
            id="password"
            label="Enter your password"
            type="password"
            error={errors.password}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <div className="flex justify-between mt-4">
            <Button
              className="bg-blue-500 px-5 py-2 hover:bg-blue-400 text-white rounded-xl"
              type="button"
              onClick={modalCtx.closeModal}
            >
              Close
            </Button>
            <Button
              className="bg-blue-500 px-5 py-2 hover:bg-blue-400 text-white rounded-xl"
              type="submit"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
