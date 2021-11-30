// const express = require('express')
import express from "express";
import { MongoClient } from "mongodb";


const app = express()

app.use(express.json())
 
const PORT = 9000;

// const movies =;

const MONGO_URL = "mongodb://localhost";

async function createConnection(){
	const client = new MongoClient(MONGO_URL)
    await client.connect()
	console.log("Mongodb Connected");
	return client;
}

const client  = await createConnection();

app.get('/', (request, response) => {
    response.send('Hello World 🌎!!!')
})

app.get("/movies",async (request, response) => {
    console.log(request.query);
    const filter = request.query;
	console.log(filter)
	if(filter.rating){
		filter.rating = parseInt(filter.rating)
	}
    // console.log(language, rating);

//    let filterMovies = movies;

//    if(language){
//      filterMovies = filterMovies.filter((mv) => mv.language == language);
//    }

//    if(rating){
//     filterMovies = filterMovies.filter((mv) => mv.rating == +rating);
//   }
   const filterMovies = await client
   .db("b28wd")
   .collection("movies")
   .find(filter).toArray();

   response.send(filterMovies)
})

app.post('/movies', async (request, response) => {
	const data = request.body;
	// console.log(data);
	const result = await client
	.db("b28wd")
	.collection("movies")
	.insertMany(data)
	response.send(data);
})

app.get("/movies/:id",async (request, response) => {
    console.log(request.params)
    const {id } = request.params

	const movie = await client
	.db("b28wd")
	.collection("movies")
	.findOne({ id: id })
    // const movie = movies.find((mv)=> mv.id == id)
    console.log(movie);
   

    movie ? response.send(movie): response.status(404).send ({msg: "No matching movie found"}) ;
})

app.listen(PORT, () => console.log("App is start in", PORT))
 
