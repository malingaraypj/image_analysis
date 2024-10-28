import { NavLink } from "react-router-dom";
import navLogo from "./../assets/nav_logo.png";

export default function Nav() {
  let navLinkClasses = "hover:text-blue-200 hover:underline";
  return (
    <nav className="flex items-center justify-between bg-blue-500 w-full h-16 px-6 sm:px-12 text-white font-sans">
      {/* Logo and Navigation Links */}
      <div className="flex items-center space-x-8">
        <img src={navLogo} alt="navigation logo" className="h-10" />
        <ul className="flex space-x-6 sm:space-x-8">
          <li>
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={navLinkClasses}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/features" className={navLinkClasses}>
              Features
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Login/Signup */}
      <div>
        <NavLink to="/signup" className={navLinkClasses}>
          Login/Signup
        </NavLink>
      </div>
    </nav>
  );
}
