import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { bookSeats, fetchShowtimeDetails, resetBookingSuccess } from "../store/bookingSlice";
import AppHeader from "../components/layout/AppHeader";

const Showtime = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentShowtime, seatLayout, loading, error, booked } = useAppSelector((state) => state.bookings);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchShowtimeDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (booked) {
      const timer = window.setTimeout(() => {
        dispatch(resetBookingSuccess());
        navigate("/");
      }, 1400);
      return () => window.clearTimeout(timer);
    }
  }, [booked, dispatch, navigate]);

  const availableSeats = useMemo(() => seatLayout.filter((seat: any) => !seat.booked), [seatLayout]);
  const total = selectedSeats.length * (currentShowtime?.price || 0);

  const toggleSeat = (seatId: string) => {
    if (!currentShowtime) return;
    const seat = seatLayout.find((item: any) => item.id === seatId);
    if (!seat || seat.booked) return;
    setSelectedSeats((previous) =>
      previous.includes(seatId) ? previous.filter((value) => value !== seatId) : [...previous, seatId]
    );
  };

  const handleBooking = () => {
    if (!id || selectedSeats.length === 0) return;
    dispatch(bookSeats({ showtimeId: id, seats: selectedSeats }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">Seat booking</p>
                <h1 className="text-3xl font-semibold text-white">Choose your seats</h1>
              </div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-3xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
              >
                Back to search
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-gray-300">Loading showtime...</p>
            ) : error ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : currentShowtime ? (
              <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Starts at {currentShowtime.startTime}</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">Auditorium details</h2>
                    </div>
                    <div className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-gray-300">Price ₹{currentShowtime.price}</div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-3xl bg-slate-900/95 p-5 text-sm text-gray-300">
                      <p className="text-sm text-gray-400">Available seats</p>
                      <p className="mt-2 text-lg font-semibold text-white">{availableSeats.length} open</p>
                    </div>

                    <div className="grid gap-2 xl:grid-cols-2">
                      {seatLayout.map((seat: any) => (
                        <button
                          key={seat.id}
                          type="button"
                          onClick={() => toggleSeat(seat.id)}
                          disabled={seat.booked || loading}
                          className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${seat.booked ? "bg-red-700/40 text-red-200 cursor-not-allowed" : selectedSeats.includes(seat.id) ? "bg-emerald-500 text-slate-950" : "bg-white/10 text-white hover:bg-white/20"}`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Your selection</p>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-3xl bg-slate-900/90 p-4 text-sm text-gray-300">
                      <p className="text-white">Selected seats</p>
                      <p className="mt-3 text-lg font-semibold text-white">{selectedSeats.length ? selectedSeats.join(", ") : "No seats selected"}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/90 p-4 text-sm text-gray-300">
                      <p>Total cost</p>
                      <p className="mt-3 text-2xl font-semibold text-white">₹{total}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleBooking}
                      disabled={selectedSeats.length === 0 || loading}
                      className="w-full rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
                    >
                      Confirm booking
                    </button>
                    {booked && <p className="text-sm text-emerald-300">Booking confirmed! Redirecting to dashboard…</p>}
                  </div>
                </aside>
              </div>
            ) : (
              <p className="text-sm text-gray-300">Showtime not available.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Showtime;
