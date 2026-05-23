import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCatalog, searchShowtimes } from "../store/movieSlice";
import AppHeader from "../components/layout/AppHeader";

const Search = () => {
  const dispatch = useAppDispatch();
  const { movies, theatres, auditoriums, showtimes, results, loading, error } = useAppSelector((state) => state.movies);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [theatre, setTheatre] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  const showtimeCards = useMemo(() => {
    if (results.length > 0) return results;

    return showtimes
      .map((showtime) => {
        const movie = movies.find((item) => item.id === showtime.movieId);
        const auditorium = auditoriums.find((item) => item.id === showtime.auditoriumId);
        const theatre = auditorium && theatres.find((item) => item.id === auditorium.theatreId);
        return { showtime, movie, auditorium, theatre };
      })
      .filter((item) => item.movie && item.auditorium && item.theatre);
  }, [movies, theatres, auditoriums, results, showtimes]);

  const handleSearch = () => {
    dispatch(searchShowtimes({ search: searchText, location, theatre, time }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">Cinema search</p>
                <h2 className="text-3xl font-semibold text-white">Find your next showtime</h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <input
                className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                placeholder="Movie title"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
              <input
                className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
              <input
                className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                placeholder="Theatre"
                value={theatre}
                onChange={(event) => setTheatre(event.target.value)}
              />
              <input
                className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                placeholder="Start time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="mt-6 inline-flex items-center justify-center rounded-3xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Search showtimes
            </button>

            <div className="mt-8">
              {loading ? (
                <p className="text-sm text-gray-300">Loading showtimes...</p>
              ) : error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : showtimeCards.length === 0 ? (
                <p className="text-sm text-gray-300">No results found. Try a different query.</p>
              ) : (
                <div className="grid gap-4">
                  {showtimeCards.map((item, index) => (
                    <Link
                      key={`${item.showtime.id}-${index}`}
                      to={`/showtime/${item.showtime.id}`}
                      className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 transition hover:-translate-y-1 hover:bg-slate-900/90"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-red-400">{item.theatre?.name}</p>
                          <h3 className="mt-2 text-xl font-semibold text-white">{item.movie?.title}</h3>
                          <p className="mt-2 text-sm text-gray-400">{item.movie?.genre} • {item.movie?.duration} mins</p>
                        </div>
                        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">₹{item.showtime.price}</span>
                      </div>
                      <div className="mt-4 grid gap-2 text-sm text-gray-300">
                        <p>Hall: {item.auditorium?.name}</p>
                        <p>Timezone: {item.showtime.startTime}</p>
                        <p>Location: {item.theatre?.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Top movies</p>
            <div className="mt-6 space-y-4">
              {movies.slice(0, 4).map((movie) => (
                <div key={movie.id} className="rounded-3xl bg-slate-950/90 p-4 border border-white/10">
                  <p className="text-sm font-semibold text-white">{movie.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{movie.genre} • {movie.rating}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Search;
