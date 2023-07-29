import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";
import Home from "./pages/Home";
import Actors from "./pages/actors/Actors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/tv',
        element: <>Tv Show</>
      },
      {
        path: '/actors',
        element: <Actors />
      }
    ],
  },
  {
    path: '*',
    element: <>NOT FOUND</>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
