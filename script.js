const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37e616f258e8b4c3f8a78be9303b4c22&page=1'
const image_path = 'https://image.tmdb.org/t/p/w500' //1280->500
const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=37e616f258e8b4c3f8a78be9303b4c22&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
getmovies(api_url)

async function getmovies(url){
    const res  = await fetch(url)
    const data = await res.json()

    showmovies(data.results)
}

function showmovies(movies) {

    main.innerHTML = ''

    movies.forEach(movie => {
      const {title , poster_path, vote_average, overview}   = movie

      const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
        <img src="${image_path + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${ratingofmovie(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>   
    `
    main.appendChild(movieElement)
    });
 
}

function ratingofmovie(vote){
    if(vote >=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getmovies(search_api + searchTerm)

        search.value = ''
    }else{
        window.location.reload()
    }
})