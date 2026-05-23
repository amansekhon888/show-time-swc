import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBookings } from "../store/bookingSlice";
import AppHeader from "../components/layout/AppHeader";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { bookings, loading, error } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookings());
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">Welcome back</p>
              <h2 className="text-3xl font-semibold text-white">{user?.fullName}</h2>
              <p className="text-sm text-gray-400">Your next showtime is waiting.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Link
                to="/search"
                className="rounded-3xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Discover movies
              </Link>
              <Link
                to="/support"
                className="rounded-3xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Support center
              </Link>
              {(user?.role === "owner" || user?.role === "admin") && (
                <Link
                  to={user.role === "owner" ? "/owner" : "/admin"}
                  className="rounded-3xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Manage dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Recent bookings</p>
                    <h3 className="text-xl font-semibold text-white">Your booking history</h3>
                  </div>
                  <Link
                    to="/search"
                    className="text-sm font-semibold text-red-400 hover:text-red-300"
                  >
                    Browse showtimes
                  </Link>
                </div>

                {loading ? (
                  <p className="mt-6 text-sm text-gray-400">Loading bookings...</p>
                ) : error ? (
                  <p className="mt-6 text-sm text-red-300">{error}</p>
                ) : bookings.length === 0 ? (
                  <p className="mt-6 text-sm text-gray-400">No bookings yet. Start exploring now.</p>
                ) : (
                  <div className="mt-6 space-y-4">
                    {bookings.slice(0, 3).map((booking: any) => (
                      <div key={booking.id} className="rounded-3xl bg-slate-900/80 p-4 border border-white/10">
                        <p className="text-sm font-semibold text-white">Booking ID: {booking.id}</p>
                        <p className="text-sm text-gray-400">Seats: {booking.seats.join(", ")}</p>
                        <p className="text-sm text-gray-400">Total: ₹{booking.total}</p>
                        <p className="text-xs uppercase tracking-[0.16em] text-gray-500">{booking.status}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Fast access</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-gray-400">Authorized role</p>
                  <p className="mt-2 text-lg font-semibold text-white">{user?.role}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-gray-400">Support tickets</p>
                  <p className="mt-2 text-lg font-semibold text-white">Open a request anytime</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
