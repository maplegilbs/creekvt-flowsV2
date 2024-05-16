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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      path: "",
      element: <InnerLayout />,
      children: [
        {path: "/forecasts",
          element: <Forecasts />
        },
        {path: "gauges",
          element: <Gauges />
        },
        {path: "rain",
          element: <Rainfall />
        },
        {path: "visuals",
          element: <Visuals />
        },
      ]
    }]

  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
