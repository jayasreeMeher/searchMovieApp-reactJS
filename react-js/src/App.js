import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movie-detail" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
