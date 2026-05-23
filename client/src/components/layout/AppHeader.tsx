import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import ThemeToggle from "../ThemeToggle.component";

const AppHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  if (!user) return null;

  return (
    <header className="bg-slate-950/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-red-400">ShowTime</p>
            <h1 className="text-lg font-semibold text-white">{user.fullName}</h1>
            <p className="text-xs text-gray-400">Role: {user.role}</p>
          </div>
          <nav className="flex flex-wrap gap-2">
            <Link className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition" to="/">
              Dashboard
            </Link>
            <Link className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition" to="/search">
              Search
            </Link>
            <Link className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition" to="/support">
              Support
            </Link>
            {user.role === "owner" && (
              <Link className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition" to="/owner">
                Owner Hub
              </Link>
            )}
            {user.role === "admin" && (
              <Link className="px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition" to="/admin">
                Admin Panel
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
