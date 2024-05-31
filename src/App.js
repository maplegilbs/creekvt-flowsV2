//Components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//Pages
import Forecasts from './pages/forecasts';
import Gauges from './pages/gauges';
import InnerLayout from './pages/innerLayout';
import Layout from './pages/layout';
import Rainfall from './pages/rain';
import Visuals from './pages/visuals';
//Styles
import "./App.css"

import { useRouteError } from 'react-router-dom';

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
      path: "/flowsV2/",
      element: <InnerLayout />,
      children: [
        {path: "forecasts",
          element: <Forecasts />
        },
        {path: "gauges",
          element: <Gauges />
        },
        {path: "rain",
          element: <Rainfall />
        },
        {path: "visuals",
          // element: <Visuals />,
          children: [
            {path: "",
              element: <Visuals initialState={'form'}/>
            },
            {path: "addReport",
              element: <Visuals initialState={'form'}/>
            },
            {path: "levelsTable",
              element: <Visuals initialState={'table'}/>
            },
            {path: "cams",
              element: <Visuals initialState={'cams'}/>
            },
          ]
        },
      ]
    }]
  },
  {basename: "/flowsV2"}
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
