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

switch (command) {
    case "concert-this":
        var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        axios.get(queryURL).then(function (response) {
            for (let i = 0; i < (response.data).length; i++) {
                console.log(response.data[i].venue.name, response.data[i].venue.city, response.data[i].venue.country, moment(response.data[i].datetime).format("L"));
            }
        });
        break;
    case "spotify-this-song":
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: "f72cf46ec989400687f58b4144b65c1f",
            secret: "d65e2ae116a84577ac0b4f4f1cd1be79"
        });
        var songInfo = [];
        spotify
            .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
            .then(function (data) {
                songInfo.push(data.artists[0].name, data.name, data.external_urls.spotify, data.album.name);
                console.log(songInfo);
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
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
        var cmd = require('node-cmd');

        fs.readFile('random.txt', 'utf8', function(err, text) {
            cmd.get(
                `node liri.js ` + text,
                function(err, data, stderr){
                    if (!err) {
                       console.log(data)
                    } else {
                       console.log('error', err)
                    }
         
                }
            );
        });
        
}

// fs.readFile('random.txt', 'utf8', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//     }

// });

