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
