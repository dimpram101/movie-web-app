// import React from 'react'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import moment from "moment";
import minutesToHm from "../../utils/minutesToHours";
import Loading from "react-loading";
import { useMemo } from "react";
import numberFormatter from "../../utils/numberFormatter";
import CastCard from "../../components/CastCard";

const MovieDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const rate = useMemo(() => {
    if (!data) return null;
    const rate = data.release_dates.results.filter(
      (result) => result.iso_3166_1 === "US"
    )[0].release_dates[0].certification;
    return rate;
  }, [data]);
  const casts = useMemo(() => {
    if (!data) return null;
    let casts = [];
    for (let i = 0; i < 13; i++) {
      casts.push(data.credits.cast[i]);
    }
    return casts;
  }, [data])

  useEffect(() => {
    api
      .get(`/movie/${id}?append_to_response=credits,release_dates`)
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
          <div className="flex flex-row gap-4">
            <div className="w-[550px] h-[604px]">
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                className="h-full"
              />
            </div>
            <div className="w-full flex flex-col justify-between font-sofia">
              <div className="flex flex-col">
                <h1 className="text-4xl font-extrabold">
                  {data.title} ({moment(data.release_date).format("YYYY")})
                </h1>
                <div className="flex items-center mb-3 text-lg">
                  <p>{rate}</p>
                  <p className="mx-2">|</p>
                  <p>{moment(data.release_date).format("MM/DD/YYYY")}</p>
                  <p className="mx-2">|</p>
                  <div className="flex gap-2">
                    {data.genres.map((genre) => (
                      <p key={genre.id}>{genre.name}</p>
                    ))}
                  </div>
                  <p className="mx-2">|</p>
                  <p>{minutesToHm(data.runtime)}</p>
                </div>
                <p className="text-xl italic font-thin mb-3">{data.tagline}</p>
                <div className="flex flex-col text-lg">
                  <p className="font-bold text-orange-400">Overview</p>
                  <p className="">{data.overview}</p>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-orange-400 font-bold">Status</p>
                  <p className="font-normal">{data.status}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-orange-400 font-bold">Original Language</p>
                  <p className="font-normal">{data.spoken_languages[0].name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-orange-400 font-bold">Budget</p>
                  <p className="font-normal">
                    {numberFormatter.format(data.budget)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-orange-400 font-bold">Revenue</p>
                  <p className="font-normal">
                    {numberFormatter.format(data.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 font-sofia w-full">
            <h1 className="text-orange-400 text-3xl font-semibold">Cast</h1>
            <div className="mt-2 flex overflow-x-auto h-[26rem]">
              <div className="flex-shrink-0 flex space-x-4">
                {casts.length > 0 && casts.map(cast => <CastCard cast={cast} key={cast}/>)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
