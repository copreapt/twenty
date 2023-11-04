import {BsSearch} from 'react-icons/bs'


const SearchBar = () => {
  return (
    <section>
      <form className='flex items-center justify-center gap-2 pt-4 pb-4 rounded-md bg-white shadow-sm shadow-white mx-10'>
        <BsSearch />
        <input type="text" className="border-2 rounded-md border-gray-800 px-2 focus:shadow-none focus:border-black focus:outline-none focus:ring-transparent md:px-40" />
      </form>
    </section>
  )
}

export default SearchBar