import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className='w-full h-20 bg-black border-b border-b-white border-opacity-20 fixed top-0 left-0 z-50 font-sofia'>
      <div className="max-w-screen-2xl mx-auto h-full flex flex-row justify-between items-center">
        <Link className='text-3xl text-white font-bold' to={'/'}>Tontonin</Link>
        <div className="flex gap-8 text-lg">
          <Link className='bg-left-bottom bg-gradient-to-r from-orange-400 to-orange-400 bg-[length:0%_1.5px] bg-no-repeat hover:bg-[length:100%_1.5px] transition-all duration-300 ease-out cursor-pointer' to={'/'}>Movies</Link>
          <Link className='bg-left-bottom bg-gradient-to-r from-orange-400 to-orange-400 bg-[length:0%_1.5px] bg-no-repeat hover:bg-[length:100%_1.5px] transition-all duration-300 ease-out cursor-pointer' to={'/tv'}>TV Shows</Link>
          <Link className='bg-left-bottom bg-gradient-to-r from-orange-400 to-orange-400 bg-[length:0%_1.5px] bg-no-repeat hover:bg-[length:100%_1.5px] transition-all duration-300 ease-out cursor-pointer' to={'/actors'}>Actors</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar