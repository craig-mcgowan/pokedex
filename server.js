const express = require("express")
const app = express()
const pokemon = require("./models/pokemon.js")
const methodOverride = require('method-override')
const pokemonStats = [
  "hp",
  "attack",
  "defense",
  "spattack",
  "spdefense",
  "speed",
];
const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
]; 

//===========================
// Middleware
//===========================

app.use(express.urlencoded({ extended: false }));
//Serve files statically from the public folder
app.use(express.static("public"));
//register the method-override middleware
app.use(methodOverride("_method"));

//===========================
// Routes
//===========================

//Index 
app.get('/pokemon', (req, res) => {
  res.render("index.ejs", { allPokemon: pokemon})
})
//New
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs", {pokemonStats: pokemonStats, pokemonTypes: pokemonTypes})
})

//Destroy
app.delete("/pokemon/:id", (req, res) => {
  pokemon.splice(req.params.id-1, 1)
  res.redirect("/pokemon")
})

//Update
app.put("/pokemon/:id", (req, res) => {
    const data = req.body
    data.type = []
    data.stats = {}

     for (let key in data) {
       data[key] === "on" ?
         (data.type.push(key),
         delete data[key]) :
         null;
       pokemonStats.includes(key) ?
         (data.stats[key] = data[key],
         delete data[key]):
         null;
       
     }
    data.id= pokemon[req.params.id].id
    pokemon[req.params.id] = data
    console.log(console.log(pokemon[req.params.id]))
    res.redirect("/pokemon")

})

//Create
  app.post("/pokemon", (req, res) => {
    const data = req.body
    data.type = []
    data.stats = {}

     for (let key in data) {
       data[key] === "on" ?
         (data.type.push(key),
         delete data[key]) :
         null;
       pokemonStats.includes(key) ?
         (data.stats[key] = data[key],
         delete data[key]):
         null;
       
     }
    data.id = Number(pokemon[pokemon.length-1].id)+1
    pokemon.push(data)
    res.redirect("/pokemon")
})

//Edit
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    thisPokemon: pokemon[Number(req.params.id) - 1],
    id: req.params.id - 1,
    pokemonStats: pokemonStats,
    pokemonTypes: pokemonTypes,
  });
})

//Show
app.get('/pokemon/:id', (req, res) => {
  res.render("show.ejs", { thisPokemon: pokemon[Number(req.params.id) - 1]});
})

app.listen(3000, () => {
  console.log("Your pokemon are waiting on port 3000")
})