import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";
import Home from "./pages/Home";
import Actors from "./pages/actors/Actors";
import Movie from "./pages/movies/Movie";
import Tv from "./pages/tv/Tv"
import MovieDetail from "./pages/movies/MovieDetail";
import MovieSearch from "./pages/movies/MovieSearch";

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
            element: <MovieSearch />
          },
          {
            path: ":id",
            element: <MovieDetail />
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
