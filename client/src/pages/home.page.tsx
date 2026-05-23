import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="max-w-6xl mx-auto px-4 py-20">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/20">
          <div className="grid gap-10 xl:grid-cols-[1.4fr_0.9fr] items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-red-400">Premium cinema booking</p>
                <h1 className="text-5xl font-semibold text-white">Experience every showtime like VIP.</h1>
                <p className="max-w-2xl text-base leading-8 text-gray-300">
                  Browse movies, reserve premium seats, and manage your bookings with a cinematic dashboard designed for movie lovers.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center justify-center rounded-3xl bg-red-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
                >
                  Login to continue
                </Link>
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Create an account
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/30">
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Fast Booking</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">Reserve your seat in seconds</h2>
                  <p className="mt-3 text-sm text-gray-300">Secure the best seats before the show starts and keep all your plans in one place.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Personalized dashboard</p>
                    <p className="mt-3 text-sm text-gray-300">Manage bookings, support requests, and ticket history from a single premium view.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Smart access</p>
                    <p className="mt-3 text-sm text-gray-300">Login before booking and return to the movie you selected automatically.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
