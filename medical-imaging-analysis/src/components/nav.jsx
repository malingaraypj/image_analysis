import { NavLink } from "react-router-dom";
import navLogo from "./../assets/nav_logo.png";

export default function Nav() {
  let navLinkClasses = "text-blue-200 underline decoration-2";
  return (
    <nav className="flex items-center justify-between bg-blue-500 w-full h-16 px-6 sm:px-12 text-white font-sans">
      {/* Logo and Navigation Links */}
      <div className="flex items-center space-x-8">
        <img src={navLogo} alt="navigation logo" className="h-10" />
        <ul className="flex space-x-6 sm:space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? navLinkClasses : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? navLinkClasses : undefined
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? navLinkClasses : undefined
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive ? navLinkClasses : undefined
              }
            >
              Features
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Login/Signup */}
      <div>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? navLinkClasses : undefined)}
        >
          Login/Signup
        </NavLink>
      </div>
    </nav>
  );
}
