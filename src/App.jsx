import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";
import Home from "./pages/Home";
import Actors from "./pages/actors/Actors";
import Movie from "./pages/movies/Movie";
import Tv from "./pages/tv/Tv";
import MovieDetail from "./pages/movies/MovieDetail";
import MovieSearch from "./pages/movies/MovieSearch";
import MovieGenre from "./pages/movies/MovieGenre";
import MovieSearchByGenre from "./pages/movies/MovieSearchByGenre";
import MovieCredit from "./pages/movies/MovieCredit";
import TvDetail from "./pages/tv/TvDetail";

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
        path: "/movies",
        children: [
          {
            index: true,
            element: <Movie />,
          },
          {
            path: "genre",
            element: <MovieGenre />,
          },
          {
            path: "genre/:id",
            element: <MovieSearchByGenre />,
          },
          {
            path: "search/:query",
            element: <MovieSearch />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <MovieDetail />,
              },
              {
                path: "credit",
                element: <MovieCredit />,
              },
            ],
          },
        ],
      },
      {
        path: "/tv",
        children: [
          {
            index: true,
            element: <Tv />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <TvDetail />,
              },
              {
                path: "credit",
                element: <>TSE credit</>,
              },
            ],
          },
        ],
      },
      {
        path: "/actors",
        children: [
          {
            index: true,
            element: <Actors />,
          },
          {
            path: ":id",
            element: <>TEST ID</>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <>NOT FOUND</>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
