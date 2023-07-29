import { useEffect, useState } from "react";
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

  console.log(actorData);

  return (
    <div className="pb-12">
      {error && <>{error}</>}
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Discover TV Series</h1>
          <LinkButton className="w-24" to="/" label="See More" />
        </div>
        <div className="grid grid-cols-5 grid-rows-4 gap-2">
          {movieData.length > 0 ? (
            movieData.map((data) => <ContentCard data={data} linkTo="movies" key={data.id} />)
          ) : (
            <>WAIT</>
          )}
        </div>
      </div>

      <div className="w-full mt-12">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Popular Actor</h1>
          <LinkButton className="w-24" to="/" label="See More" />
        </div>
        <div className="grid grid-cols-5 grid-rows-4 gap-2">
          {tvData.length > 0 ? (
            tvData.map((data) => <ContentCard data={data} linkTo="tv" key={data.id} />)
          ) : (
            <>WAIT</>
          )}
        </div>
      </div>

      <div className="w-full mt-12">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Popular Actor</h1>
          <LinkButton className="w-24" to="/" label="See More" />
        </div>
        <div className="grid grid-cols-5 grid-rows-4 gap-2">
          {actorData.length > 0 ? (
            actorData.map((data) => <ContentCard data={data} linkTo="actors" key={data.id} />)
          ) : (
            <>WAIT</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
