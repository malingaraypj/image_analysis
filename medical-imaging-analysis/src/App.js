import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/nav_enclose";

// Pages
import About from "./pages/about.jsx";
import Services from "./pages/services.jsx";
import Features from "./pages/features.jsx";
import Home, { fetchData } from "./pages/home.jsx";
import ErrorPage from "./UI/errorPage.jsx";
import { ModalProvider } from "./UI/modalContext.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />, // Global error handler
    children: [
      { index: true, element: <Home />, loader: fetchData },
      { path: "about", element: <About /> },
      {
        path: "services",
        element: <Services />,
      },
      { path: "features", element: <Features /> },
      {
        path: "error",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <Signup />
      <Login />
    </ModalProvider>
  );
}

export default App;
