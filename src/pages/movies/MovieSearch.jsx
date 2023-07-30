import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../api";

const MovieSearch = () => {
  const { query } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  });

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);

  useEffect(() => {
    api
      .get("/search/movie", {
        params: {
          query: encodeURIComponent(query),
          page: page,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [query, page]);

  const pageController = (action) => {
    if (action === "add") {
      const newPage = page + 1;
      setPage(newPage);
      setSearchParams(params => {
        params.set("page", newPage)
        return params;
      });
    } else {
      const newPage = page - 1 === 0 ? 1 : page - 1;
      setPage(newPage);
      setSearchParams(params => {
        params.set("page", newPage)
        return params;
      });
    }
  }

  return (
    <div>
      {query} {page}
      <div onClick={() => pageController('add')}>clcik</div>
      <div onClick={() => pageController('subtract')}>clcik</div>
    </div>
  );
};

export default MovieSearch;
