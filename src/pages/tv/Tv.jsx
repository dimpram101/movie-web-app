import { useEffect, useMemo, useState } from "react";
import api from "../../api";
import sliceData from "../../utils/sliceData";
import LinkButton from "../../components/LinkButton";
import Carousel from "react-material-ui-carousel";
import ContentCard from "../../components/ContentCard";
import Loading from "react-loading";
import { useNavigate } from "react-router-dom";

const Tv = () => {
  const [discoverData, setDiscoverData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    api
      .get("/tv/on_the_air")
      .then((res) => setDiscoverData(res.data.results))
      .catch((err) => console.log(err));
    api
      .get("/tv/popular")
      .then((res) => setPopularData(res.data.results))
      .catch((err) => console.log(err));
    api
      .get("/tv/top_rated")
      .then((res) => setTopRatedData(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const memoizedDiscoverData = useMemo(
    () => sliceData(discoverData),
    [discoverData]
  );
  const memoizedPopularData = useMemo(
    () => sliceData(popularData),
    [popularData]
  );
  const memoizedTopRatedData = useMemo(
    () => sliceData(topRatedData),
    [topRatedData]
  );

  const searchHandler = (e) => {
    e.preventDefault();
    const query = e.target.t.value;
    history(`/tv/search/${query}`);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <LinkButton label="See Genre" to="/tv/genre" className="w-28" />
        <form
          className="flex flex-row gap-2 justify-end"
          onSubmit={searchHandler}
        >
          <input
            type="text"
            className="bg-transparent border border-white rounded-lg py-2 px-2 w-96"
            placeholder="Search by title..."
            name="t"
            required
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
      </div>

      <div className="mt-12">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-3">
            <h1 className="text-2xl font-sofia">Currently Showing</h1>
          </div>
          {memoizedDiscoverData.length > 0 ? (
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
              {memoizedDiscoverData.map((tvData) => (
                <div className="grid grid-cols-5 gap-2" key={tvData.id}>
                  {tvData.map((tv) => (
                    <ContentCard data={tv} linkTo="tv" key={tv.id} />
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
          {memoizedPopularData.length > 0 ? (
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
              {memoizedPopularData.map((tvData) => (
                <div className="grid grid-cols-5 gap-2" key={tvData.id}>
                  {tvData.map((tv) => (
                    <ContentCard data={tv} linkTo="tv" key={tv.id} />
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
          {memoizedTopRatedData.length > 0 ? (
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
              {memoizedTopRatedData.map((tvData) => (
                <div className="grid grid-cols-5 gap-2" key={tvData.id}>
                  {tvData.map((tv) => (
                    <ContentCard data={tv} linkTo="tv" key={tv.id} />
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

export default Tv;
