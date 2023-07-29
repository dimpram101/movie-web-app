import { useEffect, useState } from "react";
import api from "../api";
import ContentCard from "../components/ContentCard";
import LinkButton from "../components/LinkButton";

const Home = () => {
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/discover/movie")
      .then((res) => setMovieData(res.data.results))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      {error && <>{error}</>}
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-2xl font-sofia">Discover Movie</h1>
          <LinkButton className="w-24" to="/" label="See More"/>
        </div>
        <div className="grid grid-cols-5 grid-rows-4 gap-2">
          {movieData.length > 0 ? (
            movieData.map((data) => <ContentCard data={data} key={data.id} />)
          ) : (
            <>WAIT</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
