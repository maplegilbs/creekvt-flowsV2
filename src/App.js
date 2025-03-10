//Hooks
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
//Pages
import Forecasts from './pages/forecasts';
import Cams from './pages/cams';
import Gauges from './pages/gauges';
import Home from './pages/home';
import InnerLayout from './pages/innerLayout';
import Layout from './pages/layout';
import Rainfall from './pages/rain';
import Visuals from './pages/visuals';
//Styles
import "./App.css"


const ErrorElement = () => {
  const error = useRouteError();

  // Log the error to the console
  console.error('Error:', error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <pre>{error.statusText || error.message}</pre>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [{
      path: "/flows/",
      element: <InnerLayout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "forecasts",
          element: <Forecasts />
        },
        {
          path: "gauges",
          element: <Gauges />
        },
        {
          path: "rain",
          element: <Rainfall />
        },
        {
          path: "cams",
          element: <Cams />
        },
        {
          path: "visuals",
          element: <Visuals />,
        },
      ]
    }]
  },
  { basename: "/flows" }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
