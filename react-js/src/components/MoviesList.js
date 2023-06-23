/**
 * @author Jayasree Meher
 * @email jayasree.meher31@gmail.com
 * @create date 2023-06-09 19:36:01
 * @desc React js application
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../App.css";
import API from "../config";

const MovieItem = (props) => {
  const movieRecord = props.data;
  return (
    <div class="card">
      <img src={movieRecord.Poster} alt={movieRecord.Title} />
      <div class="movie-detail-container">
        <h4>
          <b>{movieRecord.Title}</b>
        </h4>
        <p>{movieRecord.Year}</p>
        <Link to="/movie-detail" state={movieRecord.imdbID}>
          More Details
        </Link>
      </div>
    </div>
  );
};

const MoviesList = () => {
  const [searchTxt, setSearchTxt] = useState("superman");
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState();

  useEffect(() => {
    fetchDataFromAPI(searchTxt);
  }, []);

  const fetchDataFromAPI = (searchTxt) => {
    API.get(`/movies/search?name=${searchTxt}`)
      .then((response) => {
        console.log("response", response);
        setIsLoading(false);
        if (response && response.status === 200 && !response.isError) {
          setMovies(response.data.records);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`The name you entered was: ${searchTxt}`);
    if (searchTxt !== null && searchTxt !== "") {
      setIsLoading(true);
      fetchDataFromAPI(searchTxt);
    }
  };

  return (
    <div class="container">
      <div class="search-container">
        <form class="form-inline" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTxt}
            name="search"
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {isLoading && <h1 class="no-results">Loading...</h1>}
      {!isLoading && (
        <>
          <div className="movielist-container">
            {movies && movies.length > 0 ? (
              movies.map((movie, index) => (
                <MovieItem key={index} data={movie} />
              ))
            ) : (
              <h1 class="no-results">No results found!</h1>
            )}
          </div>
        </>
      )}
      {isError && (
        <h1 class="error-msg">Something went wrong. Please try again</h1>
      )}
    </div>
  );
};

export default MoviesList;
