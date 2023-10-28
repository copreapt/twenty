import { PostCard } from "."

const PostsSection = () => {
  return (
    <>
    <section className="bg-white rounded-md py-2 shadow-sm shadow-white overflow-y-auto px-3">
      <div>
        <PostCard />
      </div>
    </section>
    </>
  )
}

export default PostsSection