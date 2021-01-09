import { MovieProvider } from "./context/movieContext";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import SeasonDetails from "./pages/SeasonDetails";

function App() {
  return (
    <MovieProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/movie/:movieId"
          component={MovieDetails}
        />
        <Route
          exact
          path="/movie/:movieId/media/:media"
          component={MovieDetails}
        />
        <Route
          exact
          path="/movie/:movieId/season/:seasonNumber/name/:name"
          component={SeasonDetails}
        />
      </Router>
    </MovieProvider>
  );
}

export default App;
