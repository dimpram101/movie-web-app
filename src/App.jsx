import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";
import Home from "./pages/Home";
import Actors from "./pages/actors/Actors";
import Movie from "./pages/movies/Movie";
import Tv from "./pages/tv/Tv"

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
        path: '/movies',
        children: [
          {
            index: true,
            element: <Movie />
          },
          {
            path: "genre",
            element: <>GENRE</>
          },
          {
            path: "search/:query",
            element: <>QUERYTEST</>
          },
          {
            path: ":id",
            element: <>TEST ID</>
          }
        ]
      },
      {
        path: '/tv',
        children: [
          {
            index: true,
            element: <Tv />
          },
          {
            path: ":id",
            element: <>TEST ID</>
          }
        ]
      },
      {
        path: '/actors',
        children: [
          {
            index: true,
            element: <Actors />
          },
          {
            path: ":id",
            element: <>TEST ID</>
          }
        ]
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
