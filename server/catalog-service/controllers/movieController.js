import Movie from '../models/movieModel.js';

export const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (_req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.json(movies);
  } catch (error) {
    next(error);
  }
};
