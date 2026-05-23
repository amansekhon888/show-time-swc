import { Link } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";

const NotFoundPage = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <AppHeader />
    <main className="grid min-h-[calc(100vh-80px)] place-items-center px-4 py-8">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center shadow-2xl shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-red-400">Page not found</p>
        <h1 className="mt-4 text-5xl font-semibold text-white">404</h1>
        <p className="mt-4 text-sm text-gray-300">The page you’re looking for is missing its ticket.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-3xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Return home
        </Link>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
