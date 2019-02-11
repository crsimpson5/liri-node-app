# LIRI Bot

### What is LIRI?

LIRI stands for Language Interpretation and Recognition Interface. LIRI is a Node CLI app that has three purposes:

* Gets upcoming concerts for a given band or artist using the [bandsintown API](http://www.artists.bandsintown.com/bandsintown-api/?locale=en)

* Gets info for a given song using the [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)

* Gets info for a given movie using [OMDb API](http://www.omdbapi.com/)

### LIRI Commands

The input syntax is a command followed by the search term. If no search term is provided then it will default to a predetermined search term.

After each command the response data is written to the log.txt file.

* `concert-this <band or artist>`

  ![concert-this example](https://i.imgur.com/cEI2Foa.png)

* `spotify-this-song <song>`

  ![spotify-this-song example](https://i.imgur.com/NEy0tMu.png)

* `movie-this <movie name>`

  ![movie-this example](https://i.imgur.com/tRvPwFO.png)

* `do-what-it-says`

  * This command will read and execute a command and search term from the do-this.txt file.
