import { Outlet } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";

export default function Navigation() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
