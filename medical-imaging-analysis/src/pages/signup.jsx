import { useState, useRef, useContext, useEffect } from "react";
import validator from "validator";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ModalContext from "../UI/modalContext";

export default function Signup() {
  const [errors, setErrors] = useState({});
  const [backendError, setBackendErrors] = useState("");
  const [loading, setLoading] = useState(false);

  //input refs
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();

  const modalCtx = useContext(ModalContext);

  useEffect(() => {
    // Clear the input values when the component mounts
    nameRef.current.value = "";
    passwordRef.current.value = "";
    passwordConfirmRef.current.value = "";
    emailRef.current.value = "";

    setErrors({});
  }, [modalCtx.modalType]);

  // Validate input fields
  function validateName(name) {
    if (!validator.isLength(name, { min: 1 })) {
      return "Name is required";
    }
    return "";
  }

  function validateEmail(email) {
    if (!validator.isEmail(email)) {
      return "Invalid email address";
    }
    return "";
  }

  function validatePassword(password) {
    let error = "";
    if (!validator.isLength(password, { min: 8 })) {
      error = "Password must be at least 8 characters long and contain:";
      if (!/[A-Z]/.test(password)) {
        error += " one uppercase letter,";
      }
      if (!/[a-z]/.test(password)) {
        error += " one lowercase letter,";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        error += " one special character.";
      }
    }
    return error;
  }

  function validatePasswordConfirm(password, confirmPassword) {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  }

  // Handle input change for each field and validate immediately
  function handleName(event) {
    const name = event.target.value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(name),
    }));
  }

  function handleEmail(event) {
    const email = event.target.value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(email),
    }));
  }

  function handlePassword(event) {
    const password = event.target.value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(password),
    }));
  }

  function handleConfirmPassword(event) {
    const confirmPassword = event.target.value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordConfirm: validatePasswordConfirm(
        passwordRef.current.value,
        confirmPassword
      ),
    }));
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    // console.log("clear still")
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
    };

    // Form Validation
    const validationErrors = {
      name: validateName(data.name),
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      passwordConfirm: validatePasswordConfirm(
        data.password,
        data.passwordConfirm
      ),
      backendError: "",
    };

    setErrors(validationErrors);

    // If there are validation errors, stop submission
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setLoading(false);
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

      // console.log("leaving fetch")

      if (!response.ok) {
        const errorData = await response.json();
        // setErrors({ backendError: errorData.message });
        setBackendErrors(errorData.message);
        // console.log("Backend Error:", errorData.message); // Log for debugging
        setLoading(false);
        throw new Error(errorData.message || "Error while submitting data");
      }

      const result = await response.json();
      console.log("Signup successful:", result); // Log the successful result
      setLoading(false);
      modalCtx.closeModal();
    } catch (error) {
      setLoading(false);
      setErrors({ backendError: error.message });
      console.error("Signup error:", error);
    }
  }

  return (
    <Modal
      open={modalCtx.isModalOpen && modalCtx.modalType === "signup"}
      onClose={modalCtx.closeModal}
    >
      <h2 className="text-lg font-bold mb-4">Sign Up</h2>
      {backendError && (
        <p className="text-red-500">{backendError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            ref={nameRef}
            id="signup-name"
            label="Enter your name"
            type="text"
            error={errors.name}
            onChange={handleName}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <Input
            ref={emailRef}
            id="signup-email"
            label="Enter your email"
            type="email"
            error={errors.email}
            onChange={handleEmail}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <Input
            ref={passwordRef}
            id="signup-password"
            label="Enter your password"
            type="password"
            error={errors.password}
            onChange={handlePassword}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <Input
            ref={passwordConfirmRef}
            id="signup-passwordConfirm"
            label="Confirm your password"
            type="password"
            error={errors.passwordConfirm}
            onChange={handleConfirmPassword}
          />
          {errors.passwordConfirm && (
            <p className="text-red-500">{errors.passwordConfirm}</p>
          )}

          <div className="flex justify-between mt-4">
            <Button
              className="bg-blue-500 px-5 py-2 hover:bg-blue-400 text-white rounded-xl"
              type="button"
              onClick={modalCtx.closeModal}
            >
              Close
            </Button>
            <div>
              {loading ? (
                <div className="flex justify-center items-center mt-4">
                  <div className="loader"></div>{" "}
                </div>
              ) : (
                <Button
                  className="bg-blue-500 px-5 py-2 hover:bg-blue-400 text-white rounded-xl"
                  type="submit"
                >
                  Submit
                </Button>
              )}
              <div className="text-blue-600 m-1">
                <Button
                  onClick={() => {
                    modalCtx.toggleModalType();
                    modalCtx.openModal();
                  }}
                >
                  already a user?.. Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
