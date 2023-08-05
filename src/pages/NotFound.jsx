import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const NotFound = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen -mt-24">
      <h1 className="font-sofia italic text-3xl font-bold">Not Found</h1>
      <Button label={'Go Back'} className={'w-32'} onClick={goBackHandler}/>
    </div>
  )
}

export default NotFound