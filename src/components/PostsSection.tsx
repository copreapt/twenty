import { PostCard } from "."

const PostsSection = () => {
  return (
    <>
    <section className="bg-white rounded-md shadow-sm shadow-white overflow-y-auto">
      <div className="py-10">
        <PostCard />
      </div>
    </section>
    </>
  )
}

export default PostsSection