import { PostCard } from "."

const PostsSection = () => {
  return (
    <>
    <section className=" bg-white rounded-md shadow-sm shadow-white overflow-y-auto px-3">
      <div>
        <PostCard />
      </div>
    </section>
    </>
  )
}

export default PostsSection