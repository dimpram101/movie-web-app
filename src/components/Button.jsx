/* eslint-disable react/prop-types */
const Button = ({ label, onClick, className, type = 'button', disabled }) => {
  return (
    <button className={`py-2 px-4 bg-orange-400 hover:bg-orange-500 rounded-lg font-semibold text-center disabled:cursor-not-allowed disabled:opacity-75 ${className}`} onClick={onClick} type={type} disabled={disabled}>{label}</button>
  )
}

export default Button