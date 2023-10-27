import { PostCard } from "."

const PostsSection = () => {
  return (
    <>
    <section className="grow bg-red-500 w-full rounded-md shadow-sm shadow-white overflow-y-auto">
      <div className="px-10 py-10">
        <PostCard />
      </div>
    </section>
    </>
  )
}

export default PostsSection