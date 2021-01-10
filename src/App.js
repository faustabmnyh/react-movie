import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import SeasonDetails from "./pages/SeasonDetails";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:movieId" component={MovieDetails} />
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
        <Route exact path="/search/:searchName" component={SearchPage} />
        <Route exact path="/category/:category" component={CategoryPage} />
      </main>
      {/* <footer>© 2021 MgM. All rights reserved.</footer> */}
    </Router>
  );
}

export default App;
