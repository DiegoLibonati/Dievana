const sectionMoviesContainer = document.querySelector(".section_container-moviescontainer");
const btnPrevPage = document.querySelector(".btnPrevPage");
const btnNextPage = document.querySelector(".btnNextPage");
const inputSearch = document.querySelector(".header_container-search input");
const containerSearchMenu = document.querySelector(".section_container-search--showmovies");

let pageCount = 1;

btnNextPage.addEventListener("click", (e)=>{

    if (pageCount >= 33508){
        pageCount = 33508;
    } else {
        pageCount++
    }

    sectionMoviesContainer.innerHTML = "";

    htmlToContainer();

})

btnPrevPage.addEventListener("click", (e)=>{

    if (pageCount <= 1){
        pageCount = 1;
    } else {
        pageCount--
    }

    sectionMoviesContainer.innerHTML = "";

    htmlToContainer();
})

const createHTML = (img, name, rate)=>{

    return `

        <div class="section_container-movie">
            <div class="section_container-movie--img">
                <img src="${img}" alt="${name}">
            </div>

            <div class="section_container-movie--description">
                <h3 class="section_container-movie--description---title">${name}</h3>
                <h3 class="section_container-movie--description---rate">${rate}</h3>
            </div>
        </div>
    `;

}

const htmlToContainer = () =>{

    let moviesArray = getMoviesApi(pageCount);

    moviesArray.then(arrayMovies => {
        
        if (pageCount !== 1){
            for (let i = 4; i < arrayMovies.length; i++){

                getInformationFromMoviesToHtml(arrayMovies, i);
                
            }
            getFourMoviesToCompleteGridFromTheNextPage();
        } else {
            for (let i = 0; i < arrayMovies.length; i++){

                getInformationFromMoviesToHtml(arrayMovies, i);

            }
            getFourMoviesToCompleteGridFromTheNextPage();
        }

        checkRate();
    })



}

const getFourMoviesToCompleteGridFromTheNextPage = () =>{

    let moviesArray = getMoviesApi(pageCount + 1);

    moviesArray.then(arrayMovies =>{

        if (pageCount !== 1){
            for (let i = 0; i < 8; i++){

                getInformationFromMoviesToHtml(arrayMovies, i);
    
            }
        } else {
            for (let i = 0; i < 4; i++){

                getInformationFromMoviesToHtml(arrayMovies, i);
    
            }
        }
        getAllMoviesToShowInformationAboutTheMovieWithClick();
        checkRate();
    })

}

const getInformationFromMoviesToHtml = (arr, i)=>{

    let imgPath = `https://image.tmdb.org/t/p/w1280/${arr[i].poster_path}`;

    sectionMoviesContainer.innerHTML += createHTML(imgPath, arr[i].title, arr[i].vote_average);


}

const getAllMoviesToShowInformationAboutTheMovieWithClick = () =>{

    let allMoviesDiv = document.querySelectorAll(".section_container-movie");

    allMoviesDiv.forEach(function(movie){

        movie.addEventListener("click",(e)=>{

            if (e.currentTarget.classList.contains("disable")){

            } else {

                const nameMovie = e.target.getAttribute("alt");

                let moviesArray = getMoviesApi(pageCount);
                
                moviesArray.then(arrayMovies =>{
                    
                    for (let i = 0; i < arrayMovies.length; i++){
                        if (arrayMovies[i].title == nameMovie){
                            let imgPath = `https://image.tmdb.org/t/p/w1280/${arrayMovies[i].poster_path}`;
                            createANewDivToShowInformation(e, arrayMovies[i].overview, arrayMovies[i].title, imgPath);
                        }
                    }

                })

                let moviesArrayExtra = getMoviesApi(pageCount+1);
                
                moviesArrayExtra.then(arrayMovies =>{
                    
                    for (let i = 0; i < arrayMovies.length; i++){
                        if (arrayMovies[i].title == nameMovie){
                            let imgPath = `https://image.tmdb.org/t/p/w1280/${arrayMovies[i].poster_path}`;
                            createANewDivToShowInformation(e, arrayMovies[i].overview, arrayMovies[i].title, imgPath);
                        }
                    }

                })
            }

        })

    });

}

const createANewDivToShowInformation = (e, overview, title, img)=>{
    const div = document.createElement("DIV");

    const divHeader = document.createElement("DIV");
    const titleMovie = document.createElement("H3");
    const button = document.createElement("button");

    const divInformation = document.createElement("DIV");
    const titleOverview = document.createElement("H3");
    const informationOverview = document.createElement("p");

    e.path[2].classList.add("disable");

    div.classList.add("section_container_movie--information");

    e.path[2].append(div);

    divHeader.classList.add("section_container_movie--information---header")
    divInformation.classList.add("section_container_movie--information---information")

    div.append(divHeader, divInformation);
  
    divHeader.append(titleMovie, button);

    divInformation.append(titleOverview, informationOverview);
    e.path[2].children[2].children[0].children[0].textContent = `${title}`;
    e.path[2].children[2].children[0].children[1].textContent = "X";

    e.path[2].children[2].children[0].style.background = `url("${img}")`;
    e.path[2].children[2].children[0].style.backgroundSize = "cover";

    e.path[2].children[2].children[1].children[0].textContent = `Overview`;
    e.path[2].children[2].children[1].children[1].textContent = `${overview}`;

    setTimeout(()=>{
        div.classList.add("show-information");
    },100)

    e.path[2].children[2].children[0].children[1].addEventListener("click", (e)=>{
        div.classList.remove("show-information");
        e.path[3].classList.remove("disable");
        e.path[2].remove();
    });

}

function delay(callback, ms) {
    let timer = 0;
    return function() {
      let context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

const webWorkerToSearchMovie = () =>{
        
        worker = new Worker("worker.js");

        worker.postMessage(inputSearch.value);

        containerSearchMenu.innerHTML = "";

        worker.addEventListener("message", async (e)=>{

            if (containerSearchMenu.children.length <= 10){
                let imgPath = `https://image.tmdb.org/t/p/w1280/${e.data.img}`;
                containerSearchMenu.innerHTML += createSearchHTML(e.data.title, imgPath, e.data.rate);
            }

        });

}

inputSearch.addEventListener("keyup", delay(function (e){

    webWorkerToSearchMovie()

    if (containerSearchMenu.classList.contains("show-searchmenu")){
        if (inputSearch.value.split(" ").join("") == ""){
            containerSearchMenu.classList.remove("show-searchmenu");
        }
    } else {
        containerSearchMenu.classList.add("show-searchmenu");
    }

},500));


const createSearchHTML = (title, img, rate) =>{

    return `

        <div class="moviefound">

            <div class="moviefound_img">
                <img src="${img}" alt="${title}">
            </div>

            <div class="moviefound_information">
                <h3>${title}</h3>
                <p>${rate}</p>
            </div>

        </div>
    
    `;

}

const checkRate = () =>{

    const allRatesMovies = document.querySelectorAll(".section_container-movie--description---rate");

    allRatesMovies.forEach(function(rate){

        if (rate.outerText > "0" && rate.outerText < "6"){
            rate.style.background = "red";
        }

        if (rate.outerText >= "6" && rate.outerText < "7"){
            rate.style.background = "yellow";
        }

        if (rate.outerText >= "7"){
            rate.style.background = "green";
        }

    });

}

const getMoviesApi = async (pageNum)=>{

    let peticion = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${pageNum}`);
    let result = await peticion.json();
    let moviesArray = result.results

    return moviesArray

}

htmlToContainer();

