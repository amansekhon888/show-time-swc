import { useEffect, useState } from "react";
import { apiClient } from "../services/axiosClient";
import AppHeader from "../components/layout/AppHeader";

interface AdminOverview {
  totalBookings: number;
  totalMovies: number;
  totalOwners: number;
  unresolvedTickets: number;
  recentSupport: Array<{ id: string; title: string; status: string; createdAt: string }>;
}

const AdminPage = () => {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/admin/overview");
        setOverview(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load admin overview");
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">Admin panel</p>
              <h1 className="text-3xl font-semibold text-white">Platform overview</h1>
            </div>

            {loading ? (
              <p className="text-sm text-gray-300">Loading admin metrics…</p>
            ) : error ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : overview ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm text-gray-400">Total bookings</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{overview.totalBookings}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm text-gray-400">Registered owners</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{overview.totalOwners}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm text-gray-400">Available movies</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{overview.totalMovies}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm text-gray-400">Open support tickets</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{overview.unresolvedTickets}</p>
                </div>
              </div>
            ) : null}

            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
              <p className="text-sm text-gray-400">Recent support requests</p>
              <div className="mt-4 space-y-3">
                {overview?.recentSupport.map((ticket) => (
                  <div key={ticket.id} className="rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                    <p className="text-sm font-semibold text-white">{ticket.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gray-500">{ticket.status}</p>
                    <p className="mt-2 text-sm text-gray-400">{new Date(ticket.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
