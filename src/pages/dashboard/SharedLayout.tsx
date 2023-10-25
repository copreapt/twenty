import { Navbar, AddsSection, PostsSection, PostCard, SearchBar } from "../../components"


const SharedLayout = () => {
  return (
    <main>
      <SearchBar />
      <Navbar />
      <AddsSection />
      <PostsSection />
      <PostCard />
    </main>
  )
}

export default SharedLayout