import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [passError, setPassError] = useState({
    lengthError: null,
    upperCaseError: null,
    lowerCaseError: null,
    specialCharError: null,
    matchError: null,
  });
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);

  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();

  function validateForm(data) {
    const errors = {};

    if (!validator.isLength(data.name, { min: 1 })) {
      errors.name = "Name is required";
    }

    if (!validator.isEmail(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!validator.isLength(data.password, { min: 8 })) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (data.password !== data.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }

    return errors;
  }

  function handlePassword() {
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    let passErrors = {
      lengthError: null,
      upperCaseError: null,
      lowerCaseError: null,
      specialCharError: null,
      matchError: null,
    };

    // Password length validation
    if (password.length < 8) {
      passErrors.lengthError = "Password must be at least 8 characters long";
    }

    // Uppercase letter validation
    if (!/[A-Z]/.test(password)) {
      passErrors.upperCaseError =
        "Password must contain at least one uppercase letter";
    }

    // Lowercase letter validation
    if (!/[a-z]/.test(password)) {
      passErrors.lowerCaseError =
        "Password must contain at least one lowercase letter";
    }

    // Special character validation
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passErrors.specialCharError =
        "Password must contain at least one special character";
    }

    // Password confirmation validation
    if (password !== passwordConfirm) {
      passErrors.matchError = "Passwords do not match";
    }

    setPassError(passErrors);
  }

  function handleEmail() {
    const email = emailRef.current.value;
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError(null);
    }
  }

  function handleName() {
    const name = nameRef.current.value;
    if (name.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(data);

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

        throw new Error("Error while submitting data");
      }

      const result = await response.json();
      console.log(result);

      navigate(-1);
    }
  }

  function handleModalClose() {
    navigate(-1); // Go back
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
            onChange={handleName}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}

          <Input
            ref={emailRef}
            id="email"
            label="Enter your email"
            type="email"
            onChange={handleEmail}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <div className="flex flex-col gap-3">
            <div>
              <Input
                ref={passwordRef}
                id="password"
                label="Enter your password"
                type="password"
                onChange={handlePassword}
              />
              {passError.lengthError && (
                <p className="text-red-500">{passError.lengthError}</p>
              )}
              {passError.upperCaseError && (
                <p className="text-red-500">{passError.upperCaseError}</p>
              )}
              {passError.lowerCaseError && (
                <p className="text-red-500">{passError.lowerCaseError}</p>
              )}
              {passError.specialCharError && (
                <p className="text-red-500">{passError.specialCharError}</p>
              )}
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                ref={passwordConfirmRef}
                id="passwordConfirm"
                label="Confirm your password"
                type="password"
                onChange={handlePassword}
              />
              {passError.matchError && (
                <p className="text-red-500">{passError.matchError}</p>
              )}
              {errors.passwordConfirm && (
                <p className="text-red-500">{errors.passwordConfirm}</p>
              )}
            </div>
          </div>

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
