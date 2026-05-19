import { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', genre: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/movies`);
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError('Unable to load movies');
    } finally {
      setLoading(false);
    }
  };

  const submitMovie = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
      setForm({ title: '', genre: '' });
      fetchMovies();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <h1>ShowTime Catalog</h1>
      <section className="card">
        <h2>Add a Movie</h2>
        <form onSubmit={submitMovie}>
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <label>Genre</label>
          <input
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            required
          />
          <button type="submit">Create Movie</button>
        </form>
      </section>

      <section className="card">
        <h2>Movie List</h2>
        {loading && <p>Loading movies...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <ul>
            {movies.map((movie) => (
              <li key={movie._id}>
                <strong>{movie.title}</strong> — {movie.genre}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
