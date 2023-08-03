/* eslint-disable react/prop-types */
import NoImage from "../assets/no-image.png";

const CreditSection = ({ credit }) => {
  return (
    <div className="w-full flex flex-row pb-8">
      <div className="w-1/2">
        <h1 className="text-3xl font-sofia font-semibold mb-3">
          Cast <span className="font-thin">({credit.cast.length})</span>
        </h1>
        <div className="flex flex-col gap-4">
          {credit.cast.map((cast) => (
            <div
              key={cast.id}
              className="flex flex-row gap-6 w-full items-center"
            >
              <div className="w-20 h-20">
                <img
                  src={
                    cast.profile_path
                      ? `https://www.themoviedb.org/t/p/w200/${cast.profile_path}`
                      : NoImage
                  }
                  alt=""
                  className="h-full object-cover w-full"
                />
              </div>
              <div className="flex flex-col justify-center font-sofia">
                <p className="text-xl font-bold text-orange-400">{cast.name}</p>
                <p>{cast.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl font-sofia font-semibold mb-3">
          Crew <span className="font-thin">({credit.crew.length})</span>
        </h1>
        <div className="flex flex-col gap-4">
          {credit.crew.map((crew) => (
            <div
              key={crew.id}
              className="flex flex-row gap-6 w-full items-center"
            >
              <div className="w-20 h-20">
                <img
                  src={
                    crew.profile_path
                      ? `https://www.themoviedb.org/t/p/w200/${crew.profile_path}`
                      : NoImage
                  }
                  alt=""
                  className="h-full object-cover w-full"
                />
              </div>
              <div className="flex flex-col justify-center font-sofia">
                <p className="text-xl font-bold text-orange-400">{crew.name}</p>
                <p>{crew.job}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditSection;
