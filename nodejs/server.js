/**
 * @author Jayasree Meher
 * @email jayasree.meher31@gmail.com
 * @create date 2023-06-08 19:36:01
 * @desc Node js application
 */

const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
var cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === "development") {
  console.log("mode development");
}

app.use(cors());

app.get("/", (req, res) => {
  res.send("This is an assignment node js application.");
});

// OMDB Movies search API
app.get("/movies/search", function (req, res) {
  const filters = req.query;
  console.log("The name: " + JSON.stringify(filters));
  const searchString = (filters && filters.name) || "";

  console.log(
    "calling OMDB API",
    `${process.env.OMDB_BASEURL}/?s=${searchString}& page=2&apikey=${process.env.OMDB_APIKEY}`
  );

  axios
    .get(
      `${process.env.OMDB_BASEURL}/?s=${searchString}&page=2&apikey=${process.env.OMDB_APIKEY}`
    )
    .then((response) => {
      console.log("Status Code:", response.status);
      const moviesData = response.data;
      if (response.status == 200 && moviesData.Response == "True") {
        const respData = {
          isError: false,
          status: response.status,
          records: moviesData.Search,
        };
        res.send(respData);
      } else {
        const respError = {
          isError: true,
          status: response.status,
          data: [],
        };

        res.send(respError);
      }
    })
    .catch((err) => {
      console.log("Error: ", err.message);
      res.status(400).send("Sorry, Something went wrong");
    });
});

app.get("/movies/:imdbId", function (req, res) {
  console.log("params", JSON.stringify(req.params));
  console.log("IMDB Key ", JSON.stringify(req.params.imdbId));
  const imdbParam = (req.params && req.params.imdbId) || "";

  console.log(
    "Calling OMDB API ",
    `${process.env.OMDB_BASEURL}/?i=${imdbParam}&plot=full&apikey=${process.env.OMDB_APIKEY}`
  );
  axios
    .get(
      `${process.env.OMDB_BASEURL}/?i=${imdbParam}&plot=full&apikey=${process.env.OMDB_APIKEY}`
    )
    .then((response) => {
      console.log("Status Code:", response.status);
      const movieData = response.data;
      if (response.status == 200 && movieData) {
        const respData = {
          isError: false,
          status: response.status,
          records: movieData,
        };
        res.send(respData);
      } else {
        const respError = {
          isError: true,
          status: response.status,
          data: [],
        };

        res.send(respError);
      }
    })
    .catch((err) => {
      console.log("Error: ", err.message);
      res.status(400).send("Sorry, Something went wrong");
    });
});

app.listen(port, () => {
  console.log(`Node js application listening on port ${port}!`);
  console.log(`Access the application http://localhost:${port}/`);
});
