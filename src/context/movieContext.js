import { createContext, useContext, useReducer } from "react";
import {
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL,
} from "../constants/movieConstants";

const MovieStateContext = createContext();
const MovieDispatchContext = createContext();

const initialState = {
  movies: localStorage.getItem("movies")
    ? JSON.parse(localStorage.getItem("movies"))
    : [],
  loading: true,
  movie: {},
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MOVIE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case MOVIE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.payload,
      };
    case MOVIE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  return (
    <MovieDispatchContext.Provider value={dispatch}>
      <MovieStateContext.Provider value={state}>
        {children}
      </MovieStateContext.Provider>
    </MovieDispatchContext.Provider>
  );
};

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDisptach = () => useContext(MovieDispatchContext);
