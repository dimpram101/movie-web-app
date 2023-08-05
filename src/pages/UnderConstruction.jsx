import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loading from "react-loading";

const UnderConstruction = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen -mt-24 w-full">
      <Loading color="white" type="spinningBubbles" />
      <h1 className="font-sofia italic text-3xl font-bold">
        This page is under construction
      </h1>
      <Button label={"Go Back"} className={"w-32"} onClick={goBackHandler} />
    </div>
  );
};

export default UnderConstruction;
