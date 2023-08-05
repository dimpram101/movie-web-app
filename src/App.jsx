import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";
import Home from "./pages/Home";
// import Actors from "./pages/actors/Actors";
import Movie from "./pages/movies/Movie";
import Tv from "./pages/tv/Tv";
import MovieDetail from "./pages/movies/MovieDetail";
import MovieSearch from "./pages/movies/MovieSearch";
import MovieGenre from "./pages/movies/MovieGenre";
import MovieSearchByGenre from "./pages/movies/MovieSearchByGenre";
import MovieCredit from "./pages/movies/MovieCredit";
import TvDetail from "./pages/tv/TvDetail";
import TvCredit from "./pages/tv/TvCredit";
import TvSearch from "./pages/tv/TvSearch";
import TvGenre from "./pages/tv/TvGenre";
import TvSearchByGenre from "./pages/tv/TvSearchByGenre";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";

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
            path: "genre",
            element: <TvGenre />,
          },
          {
            path: "genre/:id",
            element: <TvSearchByGenre />,
          },
          {
            path: "search/:query",
            element: <TvSearch />,
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
                element: <TvCredit />,
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
            element: <UnderConstruction />,
          },
          // {
          //   path: ":id",
          //   element: <>TEST ID</>,
          // },
          {
            path: "*",
            element: <UnderConstruction />
          }
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
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
