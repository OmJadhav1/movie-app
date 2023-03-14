let api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37e616f258e8b4c3f8a78be9303b4c22&page=1'
const image_path = 'https://image.tmdb.org/t/p/w500' //1280->500
const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=37e616f258e8b4c3f8a78be9303b4c22&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const next = document.getElementById('next')
const mybutton = document.getElementById("myBtn");
getmovies(api_url)

async function getmovies(url){
    const res  = await fetch(url)
    const data = await res.json()
    showmovies(data.results)
}

function showmovies(movies) {

    main.innerHTML = '';

    movies.forEach(movie => {
      const {title , poster_path, vote_average, overview, id}   = movie
      let homepage = getmovie(title , poster_path, vote_average, overview, id);
      var homepage_url="";
      const printhomepage = () => {
        homepage.then((a) => {
          homepage_url=a;
          if(homepage_url === ""){
            homepage_url= "#";
          }
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
        <a href="${homepage_url}" target="_blank">
        <img src="${image_path + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${ratingofmovie(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        </a>      
      `
      main.appendChild(movieElement);
        });
      };
      printhomepage();   
    });
}

async function getmovie(title , poster_path, vote_average, overview, id){
  const movie_url = "https://api.themoviedb.org/3/movie/"+id+"?api_key=37e616f258e8b4c3f8a78be9303b4c22";
  const response  = await fetch(movie_url)
  const datamovie = await response.json()
  return datamovie.homepage;
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

next.addEventListener('click', function() {
    api_url='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37e616f258e8b4c3f8a78be9303b4c22&page=2';
    getmovies(api_url);
    document.documentElement.scrollTop = 0;
    next.style.display = 'none';
})

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if ( document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', function () {
    document.documentElement.scrollTop = 0;
}) 