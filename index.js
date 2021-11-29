const express = require('express')
const app = express()
 
const PORT = 9000;

const movies = [
	{id:"102",
    name:"Jai Bhim",
    poster:"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating:8.8,
    trailer:"https://www.youtube.com/embed/nnXpbTFrqXA",
    language :"tamil",
}, {
	id: "101",
	trailer: "https://www.youtube.com/embed/sY1S34973zA",
	name: "The Godfather",
	poster: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
	summary: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
	rating: 9.2,
    language :"english",
}, {
	id: "102",
	trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
	name: "The Dark Knight",
	poster: "https://images-na.ssl-images-amazon.com/images/I/91ebheNmoUL._RI_.jpg",
	summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
	rating: 9,
    language :"english",
}, {
	id: "103",
	trailer: "https://www.youtube.com/embed/Z4Ym5vBfk50",
	name: "12 Angry Men",
	poster: "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/04/head.v1.cropped.jpg",
	summary: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
	rating: 9,
    language :"english",
}, {
	id: "104",
	trailer: "https://www.youtube.com/embed/mxphAlJID9U",
	name: "Schindler's List",
	poster: "https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2018/schindler2018_poster.jpg",
	summary: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
	rating: 8.9,
    language :"english",
}, {
	id: "105",
	trailer: "https://www.youtube.com/embed/r5X-hFf6Bwo",
	name: "The Lord of the Rings: The Return of the King",
	poster: "https://sm.ign.com/ign_ap/screenshot/default/the-lord-of-the-rings-the-return-of-the-king-59b7d7a3775bf_dhkf.jpg",
	summary: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
	rating: 8.9,
    language :"english",
}]

app.get('/', (request, response) => {
    response.send('Hello World 🌎!!!')
})

app.get("/movies", (request, response) => {
    console.log(request.query);
    const {language, rating} = request.query
    console.log(language, rating);

   let filterMovies = movies;

   if(language){
     filterMovies = filterMovies.filter((mv) => mv.language == language);
   }

   if(rating){
    filterMovies = filterMovies.filter((mv) => mv.rating == +rating);
  }

   response.send(filterMovies)
})

app.get("/movies/:id", (request, response) => {
    console.log(request.params)
    const {id} = request.params
    const movie = movies.find((mv)=> mv.id == id)
    console.log(movie);
    // {msg: "No matching movie found"}

    movie ? response.send(movie): response.status(404).send ({msg: "No matching movie found"}) ;
})

app.listen(PORT, () => console.log("App is start in", PORT))
 
