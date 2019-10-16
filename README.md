# liri-node-app

In this node.js app, users can search for information about a song, concert or movie. Using the command line, users input one of the commands, either "spotify-this-song", "concert-this", or "movie-this". The application takes the information, and using APIs, retrieves corresponding data that matches the user's search.

For "spotify-this-song", based on the user's input, the app will console.log:
    
    * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

For "concert-this", based on the user's input, the app will console.log:

    * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
    
For "movie-this", based on the user's input, the app will console.log:

    * Title of the movie.   
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

For "do-what-it-says", based on the user's input, the app will run the text from the file "random.txt".
