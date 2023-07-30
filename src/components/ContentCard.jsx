/* eslint-disable react/prop-types */
import moment from "moment";
import LinkButton from "./LinkButton";

const ContentCard = (props) => {
  const { data, linkTo } = props;
  return (
    <div className="relative group overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path ?? data.profile_path}`}
        alt=""
        className="rounded-lg z-0"
      />
      <div className="z-10 w-full absolute top-0 left-0 h-full py-4 px-2 bg-none group-hover:bg-black group-hover:bg-opacity-75 transition-all duration-300 ease-in-out">
        <div className="flex flex-col justify-between h-full translate-y-[430px] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <h1 className="text-2xl font-sofia">{`${
            data.title ?? data.name ?? data.original_name
          } ${data.poster_path ? `(${moment(data.release_date).format("YYYY")})` : ''}`}</h1>
          <div className="flex flex-col">
            <p className="h-72 w-full overflow-ellipsis truncate whitespace-normal flex flex-col">{data.overview}</p>
            <LinkButton to={`/${linkTo}/${data.id}`} label="Detail" className="flex-grow"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
