import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../api";
import Loading from "react-loading";
import Button from "../../components/Button";
import ContentCard from "../../components/ContentCard";

const MovieSearchByGenre = () => {
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const genreList = await api.get("/genre/movie/list");
        const movieList = await api.get("/discover/movie", {
          params: {
            with_genres: id,
            page: page,
          },
        });
        setGenres(genreList.data.genres);
        setData(movieList.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id, page]);

  const pageController = (action) => {
    if (action === "add") {
      const newPage = page + 1 > data.total_pages ? data.total_pages : page + 1;
      setPage(newPage);
      setSearchParams((params) => {
        params.set("page", newPage);
        return params;
      });
    } else {
      const newPage = page - 1 === 0 ? 1 : page - 1;
      setPage(newPage);
      setSearchParams((params) => {
        params.set("page", newPage);
        return params;
      });
    }
    setIsLoading(true);
  };

  const pageFormController = (e) => {
    e.preventDefault();
    let newPage = e.target.currentPage.value;
    if (newPage > data.total_pages) {
      newPage = data.total_pages;
    }
    setPage(newPage);
    setSearchParams((params) => {
      params.set("page", newPage);
      return params;
    });
    setIsLoading(true);
  };

  const genreSelectHandler = (e) => {
    setIsLoading(true);
    navigate(`/movies/genre/${e.target.value}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex h-screen justify-center items-center">
        <Loading color="white" type="bubbles" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <p className="font-sofia font-semibold text-2xl">Genre : </p>
            {genres.length > 0 && (
              <select
                className="bg-black px-2 py-2 border border-white rounded-lg w-40"
                defaultValue={id}
                onChange={(e) => genreSelectHandler(e)}
              >
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-row justify-center items-center text-xl gap-4">
            <Button
              label={"Prev"}
              onClick={() => pageController("subtract")}
              disabled={page === 1}
            />
            <div className="flex flex-row items-center border border-white border-opacity-40 rounded-lg pr-4">
              <form onSubmit={pageFormController}>
                <input
                  type="number"
                  placeholder={page}
                  name="currentPage"
                  className="bg-transparent rounded-lg w-12 px-2 py-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button type="submit" className="hidden"></button>
              </form>
              <p>
                of {data.total_pages} {data.total_pages > 1 ? "pages" : "page"}
              </p>
            </div>
            <Button
              label={"Next"}
              onClick={() => pageController("add")}
              disabled={page === data.total_pages}
            />
          </div>
        </div>
        {data.results.length > 0 ? (
          <div className="grid grid-cols-5 grid-rows-4 gap-2">
            {data.results.map((data) => (
              <ContentCard data={data} linkTo="movies" key={data.id} />
            ))}
          </div>
        ) : (
          <div className="h-96 flex flex-col justify-center items-center italic text-3xl font-semibold">
            No data found
          </div>
        )}
      </div>
    </>
  );
};

export default MovieSearchByGenre;
