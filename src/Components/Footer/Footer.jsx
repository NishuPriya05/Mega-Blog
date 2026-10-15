import Logo from "../Logo";

function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo width="32px" />
            <span className="text-base font-extrabold tracking-tight text-[#183a35]">
              Mega<span className="text-[#ef7755]">Blog</span>
            </span>
          </div>
          <p className="text-center text-sm text-slate-500 sm:text-left">
            &copy; {new Date().getFullYear()} MegaBlog Platform. 
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
