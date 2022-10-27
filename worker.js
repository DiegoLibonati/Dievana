importScripts('https://cdn.jsdelivr.net/npm/fuse.js@6.6.2');

const searchMovie = () =>{

    addEventListener("message", async (e) =>{

        if (!e.data.split(" ").join("") == ""){

            for (let i = 1; i < 101; i++){

                let moviesArray = await getMoviesApi(i);

                const options = {
                    includeScore: true,
                    keys:[`title`],
                }


                const fuse = await new Fuse(moviesArray, options);

                let result = await fuse.search(`${e.data}`);



                for (let i = 0; i < result.length; i++){
                    if (result[i].item.title.match(e.data)){
                        postMessage({title: result[i].item.title, img: result[i].item.poster_path, rate: result[i].item.vote_average});
                    }
                }

            }

        }
    });

}


const getMoviesApi = async (pageNum)=>{

    let peticion = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${pageNum}`);
    let result = await peticion.json();
    let moviesArray = result.results

    return moviesArray

}

searchMovie();

