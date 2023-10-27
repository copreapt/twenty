import { PostCard } from "."

const PostsSection = () => {
  return (
    <>
    <section className="bg-red-500 rounded-md shadow-sm shadow-white overflow-y-auto">
      <div className="px-10 py-10">
        <PostCard />
      </div>
    </section>
    </>
  )
}

export default PostsSection