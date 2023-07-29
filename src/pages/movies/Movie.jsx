import { useEffect, useMemo, useState } from "react";
import api from "../../api";
import Loading from "react-loading";
import ContentCard from "../../components/ContentCard";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const history = useNavigate();

  const sliceData = (data) => {
    const chunkSize = 5;
    const slicedData = [];

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      slicedData.push(chunk);
    }

    return slicedData;
  };

  const memoizedNowPlayingMovies = useMemo(
    () => sliceData(nowPlayingMovies),
    [nowPlayingMovies]
  );
  const memoizedPopularMovies = useMemo(
    () => sliceData(popularMovies),
    [popularMovies]
  );
  const memoizedTopRatedMovies = useMemo(
    () => sliceData(topRatedMovies),
    [topRatedMovies]
  );

  useEffect(() => {
    api
      .get(`/movie/now_playing`)
      .then((res) => setNowPlayingMovies(res.data.results))
      .catch((err) => console.log(err));
    api
      .get("/movie/popular")
      .then((res) => setPopularMovies(res.data.results))
      .catch((err) => console.log(err));
    api
      .get("/movie/top_rated")
      .then((res) => setTopRatedMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    const query = e.target.t.value;
    history(`/movies/search/${query}`);
  };

  return (
    <>
      <form
        className="flex flex-row gap-2 justify-end"
        onSubmit={searchHandler}
      >
        <input
          type="text"
          className="bg-transparent border border-white rounded-lg py-2 px-2 w-96"
          placeholder="Search by title..."
          name="t"
        />
        <button
          className="py-2 px-4 text-center flex flex-row gap-1 items-center bg-orange-400 rounded-lg justify-center"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          Search
        </button>
      </form>

      <div className="mt-12">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-3">
            <h1 className="text-2xl font-sofia">Currently Showing</h1>
          </div>
          {memoizedNowPlayingMovies.length > 0 ? (
            <Carousel
              autoPlay={true}
              animation="slide"
              navButtonsAlwaysVisible={false}
              navButtonsProps={{
                className: "w-8 h-8 md:w-16 md:h-16 z-50",
                style: {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              {memoizedNowPlayingMovies.map((movieData) => (
                <div className="grid grid-cols-5 gap-2" key={movieData.id}>
                  {movieData.map((movie) => (
                    <ContentCard
                      data={movie}
                      linkTo="nowPlayingMovies"
                      key={movie.id}
                    />
                  ))}
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full flex justify-center items-center">
              <Loading color="white" type="bubbles" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-3">
            <h1 className="text-2xl font-sofia">Popular</h1>
          </div>
          {memoizedPopularMovies.length > 0 ? (
            <Carousel
              autoPlay={true}
              animation="slide"
              navButtonsAlwaysVisible={false}
              navButtonsProps={{
                className: "w-8 h-8 md:w-16 md:h-16 z-50",
                style: {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              {memoizedPopularMovies.map((movieData) => (
                <div className="grid grid-cols-5 gap-2" key={movieData.id}>
                  {movieData.map((movie) => (
                    <ContentCard
                      data={movie}
                      linkTo="nowPlayingMovies"
                      key={movie.id}
                    />
                  ))}
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full flex justify-center items-center">
              <Loading color="white" type="bubbles" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-3">
            <h1 className="text-2xl font-sofia">Top Rated</h1>
          </div>
          {memoizedTopRatedMovies.length > 0 ? (
            <Carousel
              autoPlay={true}
              animation="slide"
              navButtonsAlwaysVisible={false}
              navButtonsProps={{
                className: "w-8 h-8 md:w-16 md:h-16 z-50",
                style: {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              {memoizedTopRatedMovies.map((movieData) => (
                <div className="grid grid-cols-5 gap-2" key={movieData.id}>
                  {movieData.map((movie) => (
                    <ContentCard
                      data={movie}
                      linkTo="nowPlayingMovies"
                      key={movie.id}
                    />
                  ))}
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full flex justify-center items-center">
              <Loading color="white" type="bubbles" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Movie;
