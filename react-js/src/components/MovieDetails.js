/**
 * @author Jayasree Meher
 * @email jayasree.meher31@gmail.com
 * @create date 2023-06-09 19:36:01
 * @desc React js application
 */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../config";
import "./../App.css";

const MovieDetails = () => {
  const location = useLocation();
  const imdbID = location.state;
  const [movieData, setMovieData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    if (!imdbID) {
      return;
    }
    API.get(`/movies/${imdbID}`)
      .then((response) => {
        console.log("response", response);
        setIsLoading(false);
        if (response && response.status === 200 && !response.isError) {
          setIsError(false);
          setMovieData(response.data.records);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [imdbID]);

  return (
    <div>
      {isLoading && <h1 class="no-results">Loading...</h1>}
      {!isLoading && (
        <>
          <Link to="/movies" class="back-btn">
            <button>Go Back</button>
          </Link>
          <div class="movie-container">
            <div class="row">
              <h2 class="movie-title">{movieData?.Title}</h2>
              <div class="column left">
                <img
                  class="img-detail"
                  src={movieData.Poster}
                  alt={movieData?.Title}
                />
              </div>
              <div class="column right">
                <div class=" card-detail">
                  <div class="movie-detail-container">
                    <div class="plot">{movieData?.Plot}</div>
                    <p>
                      <b>Year </b>
                      <br />
                      {movieData?.Year}
                    </p>
                    <p>
                      <b>Released on </b>
                      <br />
                      {movieData?.Released}
                    </p>
                    <p>
                      <b>Awards </b>
                      <br />
                      {movieData?.Awards}
                    </p>
                    <p>
                      <b>Genre </b>
                      <br />
                      {movieData?.Genre}
                    </p>
                    <p>
                      <b>Writer </b>
                      <br />
                      {movieData?.Writer}
                    </p>
                    <p>
                      <b>Language </b>
                      <br />
                      {movieData?.Language}
                    </p>
                    <p>
                      <b>Actors </b>
                      <br />
                      {movieData?.Actors}
                    </p>
                    <p>
                      <b>Country </b>
                      <br />
                      {movieData?.Country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
