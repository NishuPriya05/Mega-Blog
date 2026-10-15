import { useState, useEffect } from "react";
import { Container, PostCard } from "../Components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let isMounted = true;
    appwriteService.getPosts([]).then((result) => {
      if (isMounted && result) {
        setPosts(result.documents);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full py-9 sm:py-14">
      <Container>
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="mb-2 text-xs font-bold uppercase text-[#d75e43]">
            Your reading list
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#183a35] sm:text-4xl">
            All posts
          </h1>
        </div>
        {posts.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            No posts to show yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div key={post.$id} className="min-w-0">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
