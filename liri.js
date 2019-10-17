require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var axios = require('axios');
var moment = require('moment');
var command = process.argv[2];
var input = process.argv[3];
for (let i = 4; i < (process.argv).length; i++) {
    input += "+" + process.argv[i];
}
var movieInfo = [];
console.log('hello');
var getMovieInfo = function (qURL) {
    axios.get(qURL).then(function (response) {
        movieInfo.push(response.data.Title, response.data.Year, response.data.Rated, response.data.Ratings[1], response.data.Country, response.data.Language, response.data.Plot, response.data.Actors);
        console.log(movieInfo);
    });
}
function all(cmd, inpt) {
    switch (cmd) {
        case "concert-this":
            var queryURL = "https://rest.bandsintown.com/artists/" + inpt + "/events?app_id=codingbootcamp";
            axios.get(queryURL).then(function (response) {
                for (let i = 0; i < (response.data).length; i++) {
                    console.log(response.data[i].venue.name, response.data[i].venue.city, response.data[i].venue.country, moment(response.data[i].datetime).format("L"));
                }
            });
            break;
        case "spotify-this-song":
            function spot() {
                var Spotify = require('node-spotify-api');
                var spotify = new Spotify({
                    id: "f72cf46ec989400687f58b4144b65c1f",
                    secret: "d65e2ae116a84577ac0b4f4f1cd1be79"
                });
                var songInfo = [];
                spotify
                    .search({ type: 'track', query: inpt })
                    .then(function (response) {
                        // console.log(response.tracks);
                        songInfo.push(response.tracks.items[0].artists[0].name, response.tracks.items[0].name, response.tracks.items[0].href, response.tracks.items[0].album.name);
                        console.log(songInfo);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            spot();
            break;
        case "movie-this":
            if (input === undefined) {
                var queryURL = "http://www.omdbapi.com/?t=mr+nobody&apikey=a58d70c6";
                getMovieInfo(queryURL);
            } else {
                var queryURL = "http://www.omdbapi.com/?t=" + input + "&apikey=a58d70c6";
                getMovieInfo(queryURL);
            }
            break;
        case "do-what-it-says":
            fs.readFile('random.txt', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                }
                let split = data.split(',');
                command = split[0];
                input = split[1];
                all(command, input);
            });
        // console.log(command, input);
        // all(command, input);
    }
}
all(command, input);

