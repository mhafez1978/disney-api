require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7070




app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.get("/", async (req, res) => {
    
  try {
    const response = await fetch("https://api.disneyapi.dev/character");
    if (!response.ok) {
      // Check if the request was successful
      throw new Error(`Error: ${response.status}`); // Throw an error if not successful
    }
    const charactersData = await response.json(); // Parse the JSON from the response


    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    const characterNames = charactersData.data.map((character) => [
      {
        id: getRandomInt(0,100),
        name: character.name,
        image: character.imageUrl,
        movies: character.tvShows.map((any) => any),
        films: character.films.map((any) => any),
        videoGames: character.videoGames.map((any) => any),
        enemies: character.enemies.map((any) => any),
        createdAt: character.createdAt,
      },
    ]);

    res.json(characterNames);

    // Optionally, you can manipulate charactersData here before sending it

    //res.json(charactersData); // Send the fetched data to the client
  } catch (error) {
    res.status(500).send(error.message); // Send an error response if something goes wrong
  }
});


app.listen(PORT, () => {
    console.log(`Server API is running on http://localhost:${PORT}`)
})