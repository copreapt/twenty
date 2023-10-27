import { Navbar, AddsSection, PostsSection, SearchBar } from "../../components"


const SharedLayout = () => {
  return (
    <main className="md:w-full lg:max-w-screen-2xl lg:center-div-lg">
      <SearchBar />
      <div className="flex justify-between pt-10 mx-5">
{/* Navbar for desktop version */}
          <div className="hidden md:flex">
            <Navbar />
          </div>
{/* Posts section visible for both desktop and mobile */}
          <div>
            <PostsSection />
          </div>
{/* Adds Section visible only for desktop version */}
          <div className="hidden md:flex">
            <AddsSection />
          </div>
      </div>
{/* Navbar for mobile version */}
      <div className="md:hidden mx-5">
        <Navbar />
      </div>
    </main>
  )
}

export default SharedLayout