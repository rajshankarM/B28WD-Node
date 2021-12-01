import express from "express";
const router = express.Router();

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