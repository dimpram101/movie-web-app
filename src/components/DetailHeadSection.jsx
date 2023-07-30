import moment from "moment/moment";
import minutesToHm from "../utils/minutesToHours";
import numberFormatter from "../utils/numberFormatter";
import NoImage from '../assets/no-image.png'

/* eslint-disable react/prop-types */
const DetailHeadSection = ({ data, rate }) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-[550px] h-[604px]">
        <img
          src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : NoImage}
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
            <p>{data?.release_date ? moment(data.release_date).format("MM/DD/YYYY") : 'Unknown'}</p>
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
            <p className="font-normal">{data.spoken_languages[0]?.name ?? 'Unknown'}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-orange-400 font-bold">Budget</p>
            <p className="font-normal">{numberFormatter.format(data.budget)}</p>
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
  );
};

export default DetailHeadSection;
