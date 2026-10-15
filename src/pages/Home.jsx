import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components";

function Home() {
  const [posts, setPosts] = useState([]);
  const { status, userData } = useSelector((state) => state.auth);
  const isAuthenticated = status && Boolean(userData);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center sm:py-24">
        <Container>
          <div className="flex min-h-[42vh] flex-col items-center justify-center">
            <div className="mb-5 rounded-2xl bg-[#eaf0e9] p-4 text-[#183a35]">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#183a35] sm:text-3xl">
              {isAuthenticated
                ? "Your first story starts here"
                : "No publications yet"}
            </h1>
            <p className="mt-2 max-w-sm text-slate-500">
              {isAuthenticated
                ? "Create a post to share an idea with the MegaBlog community."
                : "Sign in or create an account to publish the first story."}
            </p>
            <Link
              to={isAuthenticated ? "/add-post" : "/signup"}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#ef7755] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#dc6244]"
            >
              {isAuthenticated ? "Create your first post" : "Get started"}
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-9 sm:py-14">
      <Container>
        {/* Dynamic Editorial Section Hero Header */}
        <div className="mb-8 border-b border-slate-200 pb-7 sm:mb-10 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#d75e43]">
              {isAuthenticated
                ? `Welcome back${userData.name ? `, ${userData.name}` : ""}`
                : "The MegaBlog journal"}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#183a35] sm:text-4xl">
              {isAuthenticated ? "Your reading feed" : "Latest Publications"}
            </h1>
          </div>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600 sm:mt-0 sm:text-lg">
            {isAuthenticated
              ? "Catch up on the latest stories, or share a new idea of your own."
              : "Fresh perspectives, thoughtful ideas, and stories worth sharing."}
          </p>
        </div>

        {!isAuthenticated && (
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-[#d8e3dc] bg-[#eef3ef] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-[#183a35] sm:text-base">
              Want to write articles? Click Get Started to share your stories
              with the community.
            </p>
            <Link
              to="/signup"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#ef7755] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#dc6244]"
            >
              Get Started
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="mb-6 flex flex-wrap gap-3">
            <Link
              to="/all-posts"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#183a35] transition-colors hover:bg-slate-50"
            >
              Browse all posts
            </Link>
            <Link
              to="/add-post"
              className="rounded-lg bg-[#183a35] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24554c]"
            >
              Create a post
            </Link>
          </div>
        )}

        {/* Dynamic Grid Alignment Layout Frame */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="w-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
