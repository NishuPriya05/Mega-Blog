import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { status, userData } = useSelector((state) => state.auth);
  const isAuthenticated = status && Boolean(userData);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: isAuthenticated },
    { name: "Add Post", slug: "/add-post", active: isAuthenticated },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <Container>
        <nav className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 sm:h-20 sm:flex-nowrap sm:py-0">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              aria-label="MegaBlog home"
              className="flex shrink-0 items-center gap-2.5 transition-transform active:scale-95"
            >
              <Logo width="38px" />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-[#183a35]">
                  Mega<span className="text-[#ef7755]">Blog</span>
                </span>
                <span className="mt-1 text-[9px] font-semibold uppercase text-slate-500">
                  Ideas in motion
                </span>
              </span>
            </Link>
          </div>

          <ul className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.slug
                        ? "bg-[#eaf0e9] text-[#183a35]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#183a35]"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {/* Conditional Auth State Action Items */}
            {!isAuthenticated && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#183a35] sm:px-4"
                  >
                    Login
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => navigate("/signup")}
                    className="rounded-lg bg-[#ef7755] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#dc6244] active:bg-[#c94f34] sm:px-4"
                  >
                    Get Started
                  </button>
                </li> */}
              </>
            )}

            {isAuthenticated && (
              <li className="ml-1 border-l border-slate-200 pl-2 sm:ml-2 sm:pl-4">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
