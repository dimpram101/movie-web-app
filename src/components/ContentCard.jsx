import moment from "moment";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ContentCard = (props) => {
  const { data } = props;
  return (
    <div className="relative group overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        alt=""
        className="rounded-lg z-0"
      />
      <div className="z-10 w-full absolute top-0 left-0 h-full py-4 px-2 bg-none group-hover:bg-black group-hover:bg-opacity-75 transition-all duration-300 ease-in-out">
        <div className="flex flex-col justify-between h-full translate-y-[430px] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <h1 className="text-2xl font-sofia">{`${
            data.original_title
          } (${moment(data.release_date).format("YYYY")})`}</h1>
          <div className="flex flex-col gap-4">
            <p>{data.overview}</p>
            <Link
              to={"/"}
              className="w-full text-center py-2 bg-orange-400 rounded-lg font-semibold"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
