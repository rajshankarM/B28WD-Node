// const express = require('express')
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from "./helper.js";

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

export const client  = await createConnection();

app.get('/', (request, response) => {
    response.send('Hello World 🌎!!!')
})

app.use("/movies", moviesRouter)


app.listen(PORT, () => console.log("App is start in", PORT))
 


