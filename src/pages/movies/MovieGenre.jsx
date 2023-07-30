// import React from 'react'
import { useState, useEffect } from "react";
import Loading from "react-loading";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const MovieGenre = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/genre/movie/list")
      .then((res) => {
        setGenres(res.data.genres);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  
  const redirectHandler = (id) => {
    navigate(`/movies/genre/${id}`);
  }

  if (isLoading) {
    return (
      <div className="-mt-24 h-screen w-full flex flex-col justify-center items-center">
        <Loading type="bubbles" />
      </div>
    );
  }

  return (
    <>
      <h1 className="font-semibold font-sofia text-3xl mb-3">Movie Genre</h1>
      <div className="grid grid-cols-5 gap-2">
        {genres.length > 0 &&
          genres.map((genre) => (
            <div
              className="h-32 flex flex-col justify-center items-center rounded-md cursor-pointer border border-white border-opacity-20 hover:bg-orange-400 transition-colors duration-300 ease-in-out"
              key={genre.id}
              onClick={() => redirectHandler(genre.id)}
            >
              <p className="font-sofia text-xl font-semibold italic">{genre.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default MovieGenre;
