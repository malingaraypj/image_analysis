import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/nav_enclose";

// Pages
import About from "./pages/about.jsx";
import Services from "./pages/services.jsx";
import Features from "./pages/features.jsx";
// import Home, { fetchData } from "./pages/home.jsx";
import ErrorPage from "./UI/errorPage.jsx";
import { ModalProvider } from "./UI/modalContext.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Landing, { loader as PatientLoader } from "./pages/landing.jsx";
import AddPatient, { action as PatientAction } from "./pages/addPatient.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />, // Global error handler
    children: [
      { index: true, element: <Landing />, loader: PatientLoader },
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
  {
    path: "/addPatient",
    element: <AddPatient />,
    action: PatientAction,
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
