import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../api";
import Button from "../../components/Button";
import Loading from "react-loading";
import ContentCard from "../../components/ContentCard";
import { useNavigate } from "react-router-dom";

const MovieSearch = () => {
  const { query } = useParams();
  const history = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);

  useEffect(() => {
    api
      .get("/search/movie", {
        params: {
          query: query,
          page: page,
          include_adult: false
        },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [query, page]);

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
    setIsLoading(true)
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
    setIsLoading(true)
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const newQuery = e.target.t.value;
    console.log(newQuery)
    setIsLoading(true);
    history(`/movies/search/${newQuery}`);
  };

  console.log(data);

  if (isLoading) {
    return (
      <div className="w-full flex h-screen justify-center items-center">
        <Loading color="white" type="bubbles" />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 pb-8">
        <div className="flex flex-row justify-between items-center w-full mb-8">
          <form
            className="flex flex-row gap-2 justify-end w-full"
            onSubmit={searchHandler}
          >
            <input
              type="text"
              className="bg-transparent border border-white border-opacity-25 rounded-lg py-2 px-2 w-full"
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
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-3">
            <h1 className="text-2xl font-sofia">Search {`"${query}"`}</h1>
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
                  of {data.total_pages}{" "}
                  {data.total_pages > 1 ? "pages" : "page"}
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
          ):(
            <div className="h-96 flex flex-col justify-center items-center italic text-3xl font-semibold">
              No data found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
