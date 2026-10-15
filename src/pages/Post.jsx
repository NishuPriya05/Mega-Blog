import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12 bg-white min-h-screen">
      <Container>
        <article className="mx-auto max-w-3xl">
          {/* Action Header Elements for Layout Control */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to feed
            </button>

            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    // bgColor="bg-slate-100"
                    className="bg-slate-700 text-slate-700 hover:bg-slate-400 transition-colors"
                  >
                    Edit Post
                  </Button>
                </Link>
                <Button
                  // bgColor="bg-red-50"
                  className="bg-red-700 text-red-600 hover:bg-red-400 transition-colors"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Heading Metadata */}
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                Published
              </span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </header>

          {/* Hero Banner Showcase Frame */}
          <div className="w-full mb-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover max-h-[440px]"
            />
          </div>

          {/* Core Content Body (Strict Reading Lane Constraint) */}
          <div className="prose-custom">{parse(post.content)}</div>
        </article>
      </Container>
    </div>
  ) : null;
}
