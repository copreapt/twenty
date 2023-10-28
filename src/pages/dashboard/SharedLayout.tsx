import { Navbar, AddsSection, PostsSection, SearchBar } from "../../components"


const SharedLayout = () => {
  return (
    <main className="h-screen md:w-full lg:max-w-screen-2xl lg:center-div-lg bg-gray-200 flex flex-col">
{/* Search Bar for Desktop */}
      <div className="pt-2 flex-end hidden">
        <SearchBar />
      </div>
{/* top div for mobile version */}
<div className="border-b border-gray-300 p-2 bg-white text-center text-cyan-700">
      <h1 className="text-xl font-light">Twenty</h1>
</div>
      {/* container */}
      <div className="flex justify-between overflow-auto grow">
{/* Navbar for desktop version */}
          <div className="hidden md:flex">
            <Navbar />
          </div>
{/* Posts section visible for both desktop and mobile */}
          <div className="w-full grow">
            <PostsSection />
          </div>
{/* Adds Section visible only for desktop version */}
          <div className="hidden md:flex">
            <AddsSection />
          </div>
      </div>
{/* Navbar for mobile version */}
      <div className="md:hidden flex items-center py-3 bg-white rounded-md shadow-sm shadow-white justify-center border-t border-gray-300">
        <Navbar />
      </div>      
    </main>
  )
}

export default SharedLayout