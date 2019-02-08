require("dotenv").config();

const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let term = process.argv.slice(3).join("+");

switch (command) {
  case "concert-this":
    let URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    console.log("\nSearching concerts for " + term + "\n");

    axios.get(URL)
      .then(function (response) {
        response = response.data;
        let data = "";

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
      })
      .catch(function (error) {
        console.log(error);
      });
    break;

  case "spotify-this-song":
    break;

  case "movie-this":
    break;

  case "do-what-it-says":
    break;

  default:
    console.log("Invalid command");
}
