import { Navbar, AddsSection, PostsSection, SearchBar } from "../../components"


const SharedLayout = () => {
  return (
    <main className="h-screen md:w-full lg:max-w-screen-2xl lg:center-div-lg bg-gray-200 flex flex-col overflow-y-hidden">
      <div className="pt-10 flex-end">
        <SearchBar />
      </div>
      {/* container */}
      <div className="flex justify-between mt-10 mx-3 overflow-y-auto grow">
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
      <div className="md:hidden mx-5 flex items-center py-3 mt-10 bg-white rounded-md shadow-sm shadow-white mb-3 justify-center">
        <Navbar />
      </div>      
    </main>
  )
}

export default SharedLayout