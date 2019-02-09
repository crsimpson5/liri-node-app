require("dotenv").config();

const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const fs = require("fs");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let term = process.argv.slice(3).join(" ");
let data = "";

function runCommand(command) {
  switch (command) {
    case "concert-this":
      concertThis(term);
      break;
  
    case "spotify-this-song":
      spotifyThis(term);
      break;
  
    case "movie-this":
      movieThis(term);
      break;
  
    case "do-what-it-says":
      fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) console.log(error);

        command = data.split(" ")[0];
        term = data.split(" ").slice(1).join("+");
        
        runCommand(command);
      })
      break;
  
    default:
      return console.log("Invalid command");
  }
}

function concertThis(band) {
  if (!band) {
    band = "Maroon+5";
  }

  let URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

  console.log("\nSearching concerts for " + band.split("+").join(" ") + "\n" +
    "------------------------\n");

  axios.get(URL)
    .then(function (response) {

      response = response.data;
      response.forEach(concert => {
        let date = moment(concert.datetime).format("MM/DD/YY");

        data += [
          "  Lineup: " + concert.lineup.join(", "),
          "  Venue: " + concert.venue.name,
          "  Location: " + concert.venue.city,
          "  Date: " + date,
          "------------------------\n\n"
        ].join("\n\n");
      });

      console.log(data);

      fs.appendFile("log.txt", data, err => {
        if (err) throw err;
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

function spotifyThis(song) {
  if (!song) {
    song = "Sweet+Victory";
  }

  console.log("\nSearching track info for " + song.split("+").join(" ") + "\n" +
    "------------------------\n");

  spotify.search({ type: "track", query: song }, function (err, response) {
    if (err) {
      return console.log("Error occured: " + err);
    }

    let artists = [];

    response = response.tracks.items[0];
    response.artists.forEach(artist => artists.push(artist.name));

    data = [
      "  Song name: " + response.name,
      "  Artists: " + artists.join(", "),
      "  Album: " + response.album.name,
      "  Link: " + response.href,
      "------------------------\n\n"
    ].join("\n\n");

    console.log(data);

    fs.appendFile("log.txt", data, err => {
      if (err) throw err;
    })
  });
}

function movieThis(movie) {
  if (!movie) {
    movie = "Mr.+Nobody";
  }

  let URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&type=movie";

  console.log("\nSearching movies for " + movie.split("+").join(" ") + "\n" +
    "------------------------\n");

  axios.get(URL)
    .then(function (response) {

      response = response.data;

      data += [
        "  Title: " + response.Title,
        "  Year release: " + response.Year,
        "  IMDB rating: " + response.imdbRating,
        "  Rotten Tomatoes: " + response.Ratings[1].Value,
        "  Country: " + response.Country,
        "  Language: " + response.Language,
        "  Actors: " + response.Actors,
        "  Plot: " + response.Plot,
        "------------------------\n\n"
      ].join("\n\n");

      console.log(data);

      fs.appendFile("log.txt", data, err => {
        if (err) throw err;
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

runCommand(command);