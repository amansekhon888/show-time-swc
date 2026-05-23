import { useEffect, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createShowtime, fetchOwnerData } from "../store/ownerSlice";
import AppHeader from "../components/layout/AppHeader";

const OwnerPage = () => {
  const dispatch = useAppDispatch();
  const { auditoriumData, showtimes, error } = useAppSelector((state) => state.owner);
  const [formState, setFormState] = useState({ auditoriumId: "", movieId: "", startTime: "", price: "" });

  useEffect(() => {
    dispatch(fetchOwnerData());
  }, [dispatch]);

  const handleChange = (key: string, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.auditoriumId || !formState.movieId || !formState.startTime || !formState.price) {
      return;
    }

    await dispatch(
      createShowtime({
        auditoriumId: formState.auditoriumId,
        movieId: formState.movieId,
        startTime: formState.startTime,
        price: Number(formState.price),
      })
    );
    setFormState({ auditoriumId: "", movieId: "", startTime: "", price: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">Owner hub</p>
                <h1 className="text-3xl font-semibold text-white">Manage auditoriums & showtimes</h1>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                <p className="text-sm text-gray-400">Create a new showtime</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <label className="block text-sm text-gray-300">
                    Select auditorium
                    <select
                      value={formState.auditoriumId}
                      onChange={(event) => handleChange("auditoriumId", event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    >
                      <option value="">Choose auditorium</option>
                      {auditoriumData?.auditoriums?.map((auditorium: any) => (
                        <option key={auditorium.id} value={auditorium.id}>
                          {auditorium.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm text-gray-300">
                    Movie
                    <select
                      value={formState.movieId}
                      onChange={(event) => handleChange("movieId", event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    >
                      <option value="">Choose movie</option>
                      {auditoriumData?.movies?.map((movie: any) => (
                        <option key={movie.id} value={movie.id}>
                          {movie.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm text-gray-300">
                    Start time
                    <input
                      type="text"
                      value={formState.startTime}
                      onChange={(event) => handleChange("startTime", event.target.value)}
                      placeholder="e.g. 19:30"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    />
                  </label>

                  <label className="block text-sm text-gray-300">
                    Price
                    <input
                      type="number"
                      value={formState.price}
                      onChange={(event) => handleChange("price", event.target.value)}
                      placeholder="e.g. 350"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Create showtime
                  </button>

                  {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
                </form>
              </div>

              <aside className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Active showtimes</p>
                <div className="mt-6 space-y-4">
                  {showtimes.length === 0 ? (
                    <p className="text-sm text-gray-300">No active showtimes yet.</p>
                  ) : (
                    showtimes.map((showtime) => (
                      <div key={showtime.id} className="rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                        <p className="text-sm font-semibold text-white">{showtime.id}</p>
                        <p className="mt-2 text-xs text-gray-400">Starts at {showtime.startTime}</p>
                        <p className="text-sm text-gray-300">Price ₹{showtime.price}</p>
                      </div>
                    ))
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OwnerPage;
