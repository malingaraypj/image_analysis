import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/nav_enclose";

// pages
import About from "./pages/about.jsx";
import Services from "./pages/services.jsx";
import Features from "./pages/features.jsx";
import Signup from "./pages/signup.jsx";
import Home from "./pages/home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "features", element: <Features /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
