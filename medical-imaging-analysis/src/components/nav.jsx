import Button from "../UI/Button";
import { useContext } from "react";
import ModalContext from "../UI/modalContext";
import { SearchContext } from "../UI/searchContext";
import { useNavigate } from "react-router-dom";
// import Input from "../UI/Input";

export default function Nav() {
  // Accessing modal context
  const modalCtx = useContext(ModalContext);
  // const searchCtx = useContext(SearchContext);
  // const navigate = useNavigate();

  // console.log(searchCtx);
  function handleChange(e) {
    // console.log(e.target.value);
    // const query=e.target.value;
    // searchCtx.updateSearchQuery(query);
    // navigate(`/?query=${encodeURIComponent(query)}`);
  }

  // Handle button click
  function handleClick() {
    console.log("Button clicked");
    modalCtx.openModal();
  }

  return (
    <nav className="flex items-center justify-between bg-blue-300 w-full h-16 px-6 sm:px-12 text-white font-sans fixed top-0 z-50">
      <div className="flex justify-center w-full">
        {/* <input
          type="text"
          placeholder="Search patients"
          onChange={handleChange}
          className="mr-4 p-2 text-black w-2/5"
        /> */}
        {/* <Button className="bg-blue-600 p-3 rounded-lg hover:bg-blue-500 hover:border-white">Search</Button> */}
      </div>
      <Button onClick={handleClick} className="bg-blue-600 p-3 rounded-2xl">
        Login/Signup
      </Button>

      {/* Uncomment and update the below code for logo and navigation links if needed */}
      {/*
      <div className="flex items-center space-x-8">
        <img src={navLogo} alt="Navigation Logo" className="h-10" />
        <ul className="flex space-x-6 sm:space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-200 underline decoration-2" : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive ? "text-blue-200 underline decoration-2" : undefined
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services"
              className={({ isActive }) =>
                isActive ? "text-blue-200 underline decoration-2" : undefined
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="features"
              className={({ isActive }) =>
                isActive ? "text-blue-200 underline decoration-2" : undefined
              }
            >
              Features
            </NavLink>
          </li>
        </ul>
      </div>
      */}
    </nav>
  );
}
