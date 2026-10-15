import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b8c8c0] hover:shadow-md sm:p-4">
        {/* Aspect Ratio Bounded Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-slate-100">
          <img
            src={appwriteService.getFileView(featuredImage).toString()}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src =
              //   "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80";
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Card Metadata / Body */}
        <div className="flex flex-1 flex-col pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d75e43]">
            Article
          </span>
          <h2 className="mt-2 text-lg font-bold leading-snug text-[#183a35] transition-colors duration-200 group-hover:text-[#d75e43] sm:text-xl">
            {title}
          </h2>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
            Explore the ideas and perspective in this story.
          </p>
          <div className="mt-4 flex items-center text-sm font-semibold text-[#183a35] transition-colors group-hover:text-[#d75e43]">
            Read Article
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
