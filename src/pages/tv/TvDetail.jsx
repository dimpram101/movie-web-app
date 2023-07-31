import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import Loading from "react-loading";
import CastCard from "../../components/CastCard";
import TvDetailHeadSection from "../../components/TvDetailHeadSection";
import NoImage from "../../assets/no-image.png";

const TvDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(data);

  const casts = useMemo(() => {
    if (!data) return null;
    let casts = [];
    if (data.credits.cast.length < 13) {
      for (let i = 0; i < data.credits.cast.length; i++) {
        casts.push(data.credits.cast[i]);
      }
    } else {
      for (let i = 0; i < 13; i++) {
        casts.push(data.credits.cast[i]);
      }
    }
    return casts;
  }, [data]);

  useEffect(() => {
    api
      .get(`/tv/${id}?append_to_response=credits,release_dates`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="py-4">
      {!data && (
        <div className="-mt-24 h-screen w-full flex flex-col justify-center items-center">
          <Loading type="bubbles" />
        </div>
      )}
      {data && (
        <>
          <TvDetailHeadSection data={data} />

          <div className="mt-8 h-[28rem]">
            <h1 className="text-3xl font-sofia text-orange-400 font-semibold">
              Seasons
            </h1>
            <div className="border border-white border-opacity-40 rounded h-full mt-2 overflow-y-scroll flex flex-col p-2">
              <div className="flex-shrink-0 flex flex-col space-y-1">
                {data.seasons.length > 0 &&
                  data.seasons.map((season) => (
                    <div
                      className="h-32 border border-orange-400 border-opacity-30 flex"
                      key={season.id}
                    >
                      <div className="flex flex-col gap-2 w-1/2 p-2">
                        <h1 className="text-2xl font-sofia text-orange-400">
                          Season {season.season_number}
                        </h1>
                        <p>Air Date : {season.air_date}</p>
                        <p>Total episode : {season.episode_count}</p>
                      </div>
                      <div className="w-1/2 h-full opacity-40">
                        <img src={season.poster_path ? `https://image.tmdb.org/t/p/w500/${season.poster_path}` : NoImage} alt="" className="w-full h-full object-cover"/>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-16 font-sofia w-full">
            <h1 className="text-orange-400 text-3xl font-semibold">Casts</h1>
            <div className="mt-2 flex overflow-x-auto h-[28rem]">
              <div className="flex-shrink-0 flex space-x-4">
                {casts.length > 0 &&
                  casts.map((cast) => <CastCard cast={cast} key={cast} />)}
                <Link
                  to={`/tv/${id}/credit`}
                  className="w-60 h-[26rem] flex flex-col justify-center items-center gap-2 rounded-lg group hover:bg-opacity-50 hover:bg-orange-400 transition-colors duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-orange-400 group-hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                  <p className="font-semibold text-orange-400 group-hover:text-white transition-colors duration-300 ease-in-out">
                    See More Casts
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TvDetail;
