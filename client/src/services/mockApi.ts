export type UserRole = "user" | "owner" | "admin";

interface Auditorium {
  id: string;
  name: string;
  theatreId: string;
  rows: number;
  cols: number;
}

interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  seats: string[];
  total: number;
  status: "confirmed" | "pending";
  createdAt: string;
}

interface SupportTicket {
  id: string;
  title: string;
  message: string;
  fromUserId: string;
  toRole: UserRole;
  status: "open" | "resolved";
  createdAt: string;
  replies: Array<{ senderId: string; message: string; createdAt: string }>;
}

interface RequestOptions {
  url: string;
  method: string;
  data?: any;
  params?: any;
  headers?: Record<string, any>;
}

const STORAGE_KEY = "showtime-mock-store-v1";

const initialState = {
  users: [
    {
      id: "u1",
      fullName: "Kajol Sharma",
      email: "user@showtime.app",
      password: "User@123",
      role: "user" as UserRole,
    },
    {
      id: "o1",
      fullName: "Rekha Kapoor",
      email: "owner@showtime.app",
      password: "Owner@123",
      role: "owner" as UserRole,
      ownerTheatreIds: ["t1", "t2"],
    },
    {
      id: "a1",
      fullName: "Vikram Mehta",
      email: "admin@showtime.app",
      password: "Admin@123",
      role: "admin" as UserRole,
    },
  ],
  movies: [
    { id: "m1", title: "Midnight Galaxy", genre: "Sci-Fi", duration: 145, rating: "A" },
    { id: "m2", title: "Bollywood Beats", genre: "Musical", duration: 130, rating: "U/A" },
    { id: "m3", title: "Crime & Canvas", genre: "Thriller", duration: 120, rating: "A" },
    { id: "m4", title: "Dreamcatcher", genre: "Fantasy", duration: 115, rating: "U" },
  ],
  theatres: [
    { id: "t1", name: "Aurora Cinemas", location: "Mumbai", ownerId: "o1" },
    { id: "t2", name: "Nova Screenplex", location: "Bengaluru", ownerId: "o1" },
    { id: "t3", name: "CineTown", location: "Delhi", ownerId: "o1" },
  ],
  auditoriums: [
    { id: "audi1", name: "Grand Hall", theatreId: "t1", rows: 6, cols: 10 },
    { id: "audi2", name: "Luxe Studio", theatreId: "t1", rows: 5, cols: 8 },
    { id: "audi3", name: "Premium 3D", theatreId: "t2", rows: 7, cols: 12 },
  ],
  showtimes: [
    { id: "s1", movieId: "m1", auditoriumId: "audi1", startTime: "18:00", price: 350, bookedSeats: ["A1","A2","B5"] },
    { id: "s2", movieId: "m2", auditoriumId: "audi1", startTime: "21:00", price: 310, bookedSeats: ["C3","C4"] },
    { id: "s3", movieId: "m3", auditoriumId: "audi2", startTime: "19:30", price: 280, bookedSeats: ["A1","D2"] },
    { id: "s4", movieId: "m4", auditoriumId: "audi3", startTime: "17:45", price: 400, bookedSeats: ["E5","E6"] },
  ],
  bookings: [
    { id: "b1", userId: "u1", showtimeId: "s1", seats: ["A3"], total: 350, status: "confirmed", createdAt: new Date().toISOString() },
  ] as Booking[],
  supportTickets: [
    {
      id: "ticket1",
      title: "Audio issue in hall",
      message: "The audio system in Grand Hall is too low for the evening show.",
      fromUserId: "u1",
      toRole: "owner" as UserRole,
      status: "open",
      createdAt: new Date().toISOString(),
      replies: [],
    },
  ] as SupportTicket[],
};

const readStore = (): typeof initialState => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return initialState;
    }
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
  return initialState;
};

const writeStore = (store: typeof initialState) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

const createToken = (payload: object) => {
  return btoa(JSON.stringify(payload));
};

const parseToken = (token?: string | null) => {
  if (!token) return null;
  try {
    const payload = atob(token);
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

const authorize = (headers?: Record<string, any>) => {
  const auth = headers?.Authorization || headers?.authorization || "";
  const token = auth.toString().replace("Bearer ", "");
  return parseToken(token);
};

const filterShowtimes = (query: any, store: typeof initialState) => {
  const { search = "", location = "", theatre = "", time = "" } = query || {};

  const lowerSearch = search.toString().toLowerCase();
  const lowerLocation = location.toString().toLowerCase();
  const lowerTheatre = theatre.toString().toLowerCase();
  const lowerTime = time.toString().toLowerCase();

  return store.showtimes
    .map((showtime) => {
      const movie = store.movies.find((item) => item.id === showtime.movieId);
      const auditorium = store.auditoriums.find((item) => item.id === showtime.auditoriumId);
      const theatre = auditorium && store.theatres.find((item) => item.id === auditorium.theatreId);
      return { showtime, movie, auditorium, theatre };
    })
    .filter((row) => {
      if (!row.movie || !row.auditorium || !row.theatre) return false;
      if (lowerSearch && !row.movie.title.toLowerCase().includes(lowerSearch)) return false;
      if (lowerLocation && !row.theatre.location.toLowerCase().includes(lowerLocation)) return false;
      if (lowerTheatre && !row.theatre.name.toLowerCase().includes(lowerTheatre)) return false;
      if (lowerTime && !row.showtime.startTime.toLowerCase().includes(lowerTime)) return false;
      return true;
    });
};

const buildSeatLayout = (auditorium: Auditorium, bookedSeats: string[]) => {
  const layout: Array<{ id: string; row: string; number: number; booked: boolean }> = [];
  const rowNames = Array.from({ length: auditorium.rows }, (_, idx) => String.fromCharCode(65 + idx));

  rowNames.forEach((row) => {
    for (let col = 1; col <= auditorium.cols; col += 1) {
      const seatId = `${row}${col}`;
      layout.push({ id: seatId, row, number: col, booked: bookedSeats.includes(seatId) });
    }
  });

  return layout;
};

export const mockApi = {
  async handleRequest(options: RequestOptions) {
    const store = readStore();
    const { url, method, data, params, headers } = options;
    const trimmedUrl = url.replace(/\?.*$/, "");

    if (trimmedUrl === "/api/auth/login" && method === "post") {
      const { email, password } = data || {};
      const user = store.users.find((item) => item.email === email && item.password === password);
      if (!user) {
        throw { status: 401, message: "Invalid credentials" };
      }
      const token = createToken({ id: user.id, email: user.email, fullName: user.fullName, role: user.role });
      return { token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } };
    }

    if (trimmedUrl === "/api/auth/register" && method === "post") {
      const { fullName, email, password } = data || {};
      if (!fullName || !email || !password) {
        throw { status: 400, message: "All fields are required" };
      }
      if (store.users.some((item) => item.email === email)) {
        throw { status: 409, message: "Email already exists" };
      }
      const user = {
        id: `u${Date.now()}`,
        fullName,
        email,
        password,
        role: "user" as UserRole,
      };
      store.users.push(user);
      writeStore(store);
      const token = createToken({ id: user.id, email: user.email, fullName: user.fullName, role: user.role });
      return { token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } };
    }

    if (trimmedUrl === "/api/movies" && method === "get") {
      return { movies: store.movies, theatres: store.theatres, auditoriums: store.auditoriums, showtimes: store.showtimes };
    }

    if (trimmedUrl === "/api/search" && method === "get") {
      return { results: filterShowtimes(params, store) };
    }

    if (trimmedUrl.startsWith("/api/showtimes/") && method === "get") {
      const showtimeId = trimmedUrl.split("/").pop();
      const showtime = store.showtimes.find((item) => item.id === showtimeId);
      if (!showtime) {
        throw { status: 404, message: "Showtime not found" };
      }
      const auditorium = store.auditoriums.find((item) => item.id === showtime.auditoriumId);
      if (!auditorium) {
        throw { status: 404, message: "Auditorium not found" };
      }
      return {
        showtime,
        auditorium,
        layout: buildSeatLayout(auditorium, showtime.bookedSeats),
      };
    }

    if (trimmedUrl === "/api/bookings" && method === "get") {
      const session = authorize(headers);
      if (!session) throw { status: 401, message: "Unauthorized" };
      if (session.role === "user") {
        return { bookings: store.bookings.filter((item) => item.userId === session.id) };
      }
      if (session.role === "owner") {
        const ownerTheatreIds = store.theatres.filter((item) => item.ownerId === session.id).map((item) => item.id);
        const ownerAuditoriumIds = store.auditoriums.filter((item) => ownerTheatreIds.includes(item.theatreId)).map((item) => item.id);
        const ownerShowtimeIds = store.showtimes.filter((item) => ownerAuditoriumIds.includes(item.auditoriumId)).map((item) => item.id);
        return { bookings: store.bookings.filter((item) => ownerShowtimeIds.includes(item.showtimeId)) };
      }
      return { bookings: store.bookings };
    }

    if (trimmedUrl === "/api/bookings" && method === "post") {
      const session = authorize(headers);
      if (!session) throw { status: 401, message: "Unauthorized" };
      const { showtimeId, seats } = data || {};
      const showtime = store.showtimes.find((item) => item.id === showtimeId);
      if (!showtime) throw { status: 404, message: "Showtime not found" };
      const alreadyBooked = seats.some((seat: string) => showtime.bookedSeats.includes(seat));
      if (alreadyBooked) {
        throw { status: 409, message: "One or more selected seats are already booked" };
      }
      showtime.bookedSeats.push(...seats);
      const total = seats.length * showtime.price;
      const booking = {
        id: `b${Date.now()}`,
        userId: session.id,
        showtimeId,
        seats,
        total,
        status: "confirmed" as const,
        createdAt: new Date().toISOString(),
      };
      store.bookings.push(booking);
      writeStore(store);
      return { booking };
    }

    if (trimmedUrl === "/api/owner/auditoriums" && method === "get") {
      const session = authorize(headers);
      if (!session || session.role !== "owner") throw { status: 401, message: "Unauthorized" };
      const theatres = store.theatres.filter((item) => item.ownerId === session.id);
      const auditoriums = store.auditoriums.filter((item) => theatres.some((theatre) => theatre.id === item.theatreId));
      const showtimes = store.showtimes.filter((item) => auditoriums.some((audi) => audi.id === item.auditoriumId));
      return { auditoriums, theatres, showtimes, movies: store.movies };
    }

    if (trimmedUrl === "/api/owner/showtimes" && method === "post") {
      const session = authorize(headers);
      if (!session || session.role !== "owner") throw { status: 401, message: "Unauthorized" };
      const { auditoriumId, movieId, startTime, price } = data || {};
      const auditorium = store.auditoriums.find((item) => item.id === auditoriumId);
      if (!auditorium) throw { status: 404, message: "Auditorium not found" };
      const theatre = store.theatres.find((item) => item.id === auditorium.theatreId);
      if (!theatre || theatre.ownerId !== session.id) throw { status: 403, message: "Forbidden" };
      if (!movieId || !startTime || !price) {
        throw { status: 400, message: "Missing showtime details" };
      }
      const showtime = {
        id: `s${Date.now()}`,
        movieId,
        auditoriumId,
        startTime,
        price,
        bookedSeats: [],
      };
      store.showtimes.push(showtime);
      writeStore(store);
      return { showtime };
    }

    if (trimmedUrl === "/api/admin/overview" && method === "get") {
      const session = authorize(headers);
      if (!session || session.role !== "admin") throw { status: 401, message: "Unauthorized" };
      const totalBookings = store.bookings.length;
      const totalMovies = store.movies.length;
      const totalOwners = store.users.filter((item) => item.role === "owner").length;
      const unresolvedTickets = store.supportTickets.filter((ticket) => ticket.status === "open").length;
      return { totalBookings, totalMovies, totalOwners, unresolvedTickets, recentSupport: store.supportTickets.slice(-3) };
    }

    if (trimmedUrl === "/api/support" && method === "get") {
      const session = authorize(headers);
      if (!session) throw { status: 401, message: "Unauthorized" };
      if (session.role === "admin") {
        return { tickets: store.supportTickets };
      }
      if (session.role === "owner") {
        return { tickets: store.supportTickets.filter((ticket) => ticket.toRole === "owner") };
      }
      return { tickets: store.supportTickets.filter((ticket) => ticket.fromUserId === session.id) };
    }

    if (trimmedUrl === "/api/support" && method === "post") {
      const session = authorize(headers);
      if (!session) throw { status: 401, message: "Unauthorized" };
      const { title, message, toRole } = data || {};
      if (!title || !message || !toRole) {
        throw { status: 400, message: "All ticket fields are required" };
      }
      const ticket = {
        id: `ticket-${Date.now()}`,
        title,
        message,
        fromUserId: session.id,
        toRole,
        status: "open" as const,
        createdAt: new Date().toISOString(),
        replies: [],
      };
      store.supportTickets.push(ticket);
      writeStore(store);
      return { ticket };
    }

    if (trimmedUrl.startsWith("/api/support/") && method === "post") {
      const session = authorize(headers);
      if (!session) throw { status: 401, message: "Unauthorized" };
      const ticketId = trimmedUrl.split("/").pop();
      const ticket = store.supportTickets.find((item) => item.id === ticketId);
      if (!ticket) throw { status: 404, message: "Ticket not found" };
      const { message: replyMessage } = data || {};
      if (!replyMessage) throw { status: 400, message: "Reply message is required" };
      ticket.replies.push({ senderId: session.id, message: replyMessage, createdAt: new Date().toISOString() });
      writeStore(store);
      return { ticket };
    }

    throw { status: 404, message: `Mock API route not handled: ${method.toUpperCase()} ${trimmedUrl}` };
  },
};
