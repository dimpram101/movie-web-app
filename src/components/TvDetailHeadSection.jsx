import moment from "moment/moment";
import NoImage from '../assets/no-image.png'

/* eslint-disable react/prop-types */
const TvDetailHeadSection = ({ data }) => {
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
            {data.name} ({moment(data.release_date).format("YYYY")})
          </h1>
          <div className="flex items-center mb-3 text-lg">
            <div className="flex gap-2">
              {data.genres.map((genre, index) => (
                <p key={genre.id}>{genre.name}{index !== data.genres.length-1 && ','}</p>
              ))}
            </div>
            <p className="mx-2">|</p>
            <p>{data.number_of_seasons} {data.number_of_seasons === 1 ? 'Season' : 'Seasons'}</p>
            <p className="mx-2">|</p>
            <p>{data.number_of_episodes} {data.number_of_episodes === 1 ? 'Episode' : 'Episodes'}</p>
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
            <p className="text-orange-400 font-bold">Next Episode</p>
            <p className="font-normal">{data.next_episode_to_air ? `${data.next_episode_to_air.name} : ${moment(data.next_episode_to_air.air_date).format('YYYY/MM/DD')}` : 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetailHeadSection;
