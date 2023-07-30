import NoImage from "../assets/no-image.png"
/* eslint-disable react/prop-types */
const CastCard = (props) => {
  const { cast } = props;
  return (
    <div className="w-60 h-[26rem] flex flex-col">
      <div className="h-[17rem] rounded-t-lg">
        <img src={cast.profile_path ? `https://www.themoviedb.org/t/p/w200/${cast.profile_path}` : NoImage} alt="" className="w-full object-cover h-full rounded-t-lg"/>
      </div>
      <div className="flex-1 border border-white border-opacity-25 rounded-b-lg flex flex-col gap-2 px-3 py-3">
        <p className="text-xl font-bold text-orange-400">{cast.name}</p>
        <p>{cast.character}</p>
      </div>
    </div>
  );
};

export default CastCard;
