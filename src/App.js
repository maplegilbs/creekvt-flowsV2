//Components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//Pages
import Layout from './pages/layout';
//Styles
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
