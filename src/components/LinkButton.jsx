/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <Link to={props.to} className={`py-2 bg-orange-400 hover:bg-orange-500 rounded-lg font-semibold text-center ${props.className}`}>{props.label}</Link>
  )
}

export default LinkButton