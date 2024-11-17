import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/nav_enclose";

// Pages
import About from "./pages/about.jsx";
import Services from "./pages/services.jsx";
import Features from "./pages/features.jsx";
import Signup from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import { fetchData } from "./pages/home.jsx";
import ErrorPage from "./UI/errorPage.jsx";
import ImageDetailsModal from "./components/services/report.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />, // Global error handler
    children: [
      { index: true, element: <Home />, loader: fetchData },
      { path: "/about", element: <About /> },
      {
        path: "/services",
        element: <Services />,
        children: [
          {
            path: "report",
            element: <ImageDetailsModal />,
          },
        ],
      },
      { path: "/features", element: <Features /> },
      {
        path: "/signup",
        element: <Signup />,
        // Route-specific error handler (optional)
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
