import { useEffect, useState } from "react";
import Loading from "react-loading";
import api from "../api";
import ContentCard from "../components/ContentCard";
import LinkButton from "../components/LinkButton";

const Home = () => {
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [actorData, setActorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/discover/movie")
      .then((res) => setMovieData(res.data.results))
      .catch((err) => setError(err));
    api
      .get("/discover/tv?with_original_language=en")
      .then((res) => setTvData(res.data.results))
      .catch((err) => setError(err));
    api
      .get("/person/popular")
      .then((res) => setActorData(res.data.results))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="pb-12">
      {error && <>{error}</>}
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Discover Movies</h1>
          <LinkButton className="w-24" to="/movies" label="See More" />
        </div>
        {movieData.length > 0 ? (
          <div className="grid grid-cols-5 grid-rows-4 gap-2">
            {movieData.map((data) => (
              <ContentCard data={data} linkTo="movies" key={data.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Loading color="white" type="bubbles" />
          </div>
        )}
      </div>

      <div className="w-full mt-12">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Popular TV Series</h1>
          <LinkButton className="w-24" to="/tv" label="See More" />
        </div>
        {tvData.length > 0 ? (
          <div className="grid grid-cols-5 grid-rows-4 gap-2">
            {tvData.map((data) => (
              <ContentCard data={data} linkTo="tv" key={data.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Loading color="white" type="bubbles" />
          </div>
        )}
      </div>

      <div className="w-full mt-12">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Popular Actor</h1>
          <LinkButton className="w-24" to="/actors" label="See More" />
        </div>
        {actorData.length > 0 ? (
          <div className="grid grid-cols-5 grid-rows-4 gap-2">
            {actorData.map((data) => (
              <ContentCard data={data} linkTo="actors" key={data.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Loading color="white" type="bubbles" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
