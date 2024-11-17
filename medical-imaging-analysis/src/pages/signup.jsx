import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();

  function validateForm(data) {
    const validationErrors = {};

    // Name Validation
    if (!validator.isLength(data.name, { min: 1 })) {
      validationErrors.name = "Name is required";
    }

    // Email Validation
    if (!validator.isEmail(data.email)) {
      validationErrors.email = "Invalid email address";
    }

    // Password Validation
    if (!validator.isLength(data.password, { min: 8 })) {
      validationErrors.password = "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(data.password)) {
      validationErrors.password =
        "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(data.password)) {
      validationErrors.password =
        "Password must contain at least one lowercase letter";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      validationErrors.password =
        "Password must contain at least one special character";
    }

    // Password Confirm Validation
    if (data.password !== data.passwordConfirm) {
      validationErrors.passwordConfirm = "Passwords do not match";
    }

    return validationErrors;
  }

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
        "http://localhost:4000/medical_analysis/user/signup",
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

        navigate("/error", {
          state: {
            message: errorData.message || "Error while submitting data",
          },
        });
        throw new Error(errorData.message || "Error while submitting data");
      }

      const result = await response.json();
      console.log(result);

      navigate(-1);
    } catch (error) {
      navigate("/error", { state: { message: error.message } });
    }
  }

  function handleModalClose() {
    navigate(-1);
  }

  return (
    <Modal open={true} onClose={handleModalClose}>
      <h2 className="text-lg font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            ref={nameRef}
            id="name"
            label="Enter your name"
            type="text"
            error={errors.name}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

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

          <Input
            ref={passwordConfirmRef}
            id="passwordConfirm"
            label="Confirm your password"
            type="password"
            error={errors.passwordConfirm}
          />
          {errors.passwordConfirm && (
            <p className="text-red-500">{errors.passwordConfirm}</p>
          )}

          <div className="flex justify-between mt-4">
            <Button
              className="bg-blue-500 px-5 py-2 hover:bg-blue-400 text-white rounded-xl"
              type="button"
              onClick={handleModalClose}
            >
              Close
            </Button>
            <Button
              className="bg-blue-500 px-5 py-2 hover:bg-blue-400 text-white rounded-xl"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
