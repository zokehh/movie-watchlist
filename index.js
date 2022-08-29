const inputSearch = document.getElementById("form_input")
const inputBtn = document.getElementById("search_btn")
const form = document.getElementById("form")

form.addEventListener("submit", getFilms)

let film = []

async function getFilms(event) {
    event.preventDefault()
    let inputValue = inputSearch.value
    const res = await fetch(`https://www.omdbapi.com/?apikey=f13b85fc&s=${inputValue}`)
    const data = await res.json()
        console.log(data)


    let allFilms = []
    for (let i = 0; i < (data.Search).length; i++){
        allFilms.push(data.Search[i].imdbID)
    }
    
    for (let test of allFilms) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=f13b85fc&i=${test}`)
        const data = await res.json()
            film.push(data)
            console.log(film)        

        }
    renderFilm(film)    
    inputSearch.value = ""
    allFilms = []
    html = ""
    film = []
}


function renderFilm(film) {
    let html = ""
    for (let i = 0; i < film.length; i++) {
        html += `
        <div class="film-container">
            <img class="film-img" src="${film[i].Poster}">
            <div class="second-child">
                <div class="film-padd Title">${film[i].Title}</div>
                <div class="film-padd">Director: ${film[i].Director}</div>
                <div class="film-padd">Genre: ${film[i].Genre}</div>
                <div class="film-padd">Runtime: ${film[i].Runtime}</div>
            </div>
        </div>
        `
        }
    document.getElementById("main").innerHTML = html
    html = ""
}
