// Poster API requests:
// http://www.omdbapi.com/?apikey=10caca9a&

document.addEventListener("DOMContentLoaded",()=>{
    const movieForm = document.getElementById('movieForm')
    const movieResult = document.getElementById('movieResults')

    movieForm.addEventListener("submit",async (e)=>{
        // prevent the browser default
        e.preventDefault()
        const movieName =document.getElementById('movieInput').value
        await searchMovies(movieName)
    })

    // search for the movies 
    async function searchMovies(movieName) {

        try {
            // loading
            movieResult.innerHTML='<div class="loading">searching movies.......</div>'
            
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=10caca9a&s=${movieName}`
                );
            const data = await response.json()

           if(data.Response ==='False'){
                throw new Error(data.Error||'No Movie Found 😔')
           }

           displayMovies(data.Search)
        } catch (error) {
         movieResult.innerHTML =`
            <div class = "error-message">
            ${
                error.message ||
                "Error Searching Movies. Please try again later.🤗"
            }
            </div>
            `;
        }
    }
    // DISPLAY ALL THE MOVIES

function displayMovies (movies){
    movieResult.innerHTML=`
        <div class="movies-grid">
            ${movies
                .map(
                    (movie)=>`
                    <div class="movies-grid">
                        <img 
                        src="${movie.poster !=="N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                        }"
                        alt="${movie.Title}"
                        class="movie-poster"
                        >
                        <div class='movie-info'>
                        <h3 class="movie-title">${movie.Title}</h3>
                        <h3 class="movie-year">${movie.Year}</h3>
                        </div>
                 </div>
                 `
                )
                .join("")}
            </div>
        `;
}
})

