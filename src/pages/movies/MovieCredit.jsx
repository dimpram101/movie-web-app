import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import Loading from "react-loading";
import CreditSection from "../../components/CreditSection";

const MovieCredit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [credit, setCredit] = useState({
    id: null,
    cast: [],
    crew: [],
  });

  useEffect(() => {
    api.get(`/movie/${id}/credits`).then((res) => {
      setCredit(res.data);
      setIsLoading(false);
    });
  }, [id]);

  console.log(credit);

  return (
    <>
      {isLoading ? (
        <div className="-mt-24 h-screen w-full flex flex-col justify-center items-center">
          <Loading type="bubbles" />
        </div>
      ) : (
        <CreditSection credit={credit} />
      )}
    </>
  );
};

export default MovieCredit;
