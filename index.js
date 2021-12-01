// const express = require('express')
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(express.json())
 
const PORT = 9000;

// const movies = ;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;
// mongodb+srv://rajshankar:<password>@cluster0.xc4ii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

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
   const filterMovies = await getMovies(filter);

   response.send(filterMovies)
})

app.post('/movies', async (request, response) => {
	const data = request.body;
	// console.log(data);
	const result = await createMovies(data)
	response.send(data);
})

app.get("/movies/:id",async (request, response) => {
    console.log(request.params)
    const {id } = request.params

	const movie = await getMovieById(id)
    // const movie = movies.find((mv)=> mv.id == id)
    console.log(movie);
   

    movie ? response.send(movie): response.status(404).send ({msg: "No matching movie found"}) ;
})

app.delete("/movies/:id",async (request, response) => {
    console.log(request.params)
    const {id } = request.params

	const result = await deleteMovieById(id)

    result.deletedCount > 0
	? response.send(result): response.status(404).send ({msg: "No matching movie found"}) ;
});

app.put("/movies/:id",async (request, response) => {
    console.log(request.params)
    const {id } = request.params
	const data = request.body;

	const result = await updateMovieById(id, data)
	const movie = await getMovieById(id)
	response.send(movie)

});


app.listen(PORT, () => console.log("App is start in", PORT))
 

async function updateMovieById(id, data) {
	return await client
		.db("b28wd")
		.collection("movies")
		.updateOne({ id: id }, { $set: data });
}

async function createMovies(data) {
	return await client
		.db("b28wd")
		.collection("movies")
		.insertMany(data);
}

async function getMovies(filter) {
	return await client
		.db("b28wd")
		.collection("movies")
		.find(filter).toArray();
}

async function deleteMovieById(id) {
	return await client
		.db("b28wd")
		.collection("movies")
		.deleteOne({ id: id });
}

async function getMovieById(id) {
	return await client
		.db("b28wd")
		.collection("movies")
		.findOne({ id: id });
}

