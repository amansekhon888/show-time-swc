import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createSupportTicket, fetchSupportTickets } from "../store/supportSlice";
import AppHeader from "../components/layout/AppHeader";

const SupportPage = () => {
  const dispatch = useAppDispatch();
  const { tickets, loading, error } = useAppSelector((state) => state.support);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [toRole, setToRole] = useState<"owner" | "admin">("owner");

  useEffect(() => {
    dispatch(fetchSupportTickets());
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !message) return;

    await dispatch(createSupportTicket({ title, message, toRole }));
    setTitle("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">Support center</p>
              <h1 className="text-3xl font-semibold text-white">Raise a ticket</h1>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
              <form className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm text-gray-300">
                  Topic
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    placeholder="Issue title"
                  />
                </label>

                <label className="block text-sm text-gray-300">
                  Message
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    placeholder="Describe your issue"
                  />
                </label>

                <label className="block text-sm text-gray-300">
                  Send to
                  <select
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                    value={toRole}
                    onChange={(event) => setToRole(event.target.value as "owner" | "admin")}
                  >
                    <option value="owner">Owner support</option>
                    <option value="admin">Admin support</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="mt-4 inline-flex items-center justify-center rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Submit ticket
                </button>
                {error && <p className="text-sm text-red-400">{error}</p>}
              </form>

              <aside className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Recent tickets</p>
                <div className="mt-6 space-y-3">
                  {loading ? (
                    <p className="text-sm text-gray-300">Loading tickets…</p>
                  ) : tickets.length === 0 ? (
                    <p className="text-sm text-gray-300">No tickets yet.</p>
                  ) : (
                    tickets.map((ticket) => (
                      <div key={ticket.id} className="rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                        <p className="font-semibold text-white">{ticket.title}</p>
                        <p className="mt-2 text-sm text-gray-400">Status: {ticket.status}</p>
                        <p className="mt-2 text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</p>
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

export default SupportPage;
