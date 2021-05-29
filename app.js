let key = env.key;

const input = document.querySelector("#input");
const button = document.querySelector(".button");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let value = "";
let pagenum = 1;

input.addEventListener("input",(e) => {
    e.preventDefault();
    value = input.value;
});

button.addEventListener("click",() => {
    pagenum = 1;
    getmovie(value, pagenum);
});

async function getmovie(value,pagenum){

    if(value ==="")return;

    const data=await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${value}&page=${pagenum}`);

    document.querySelector(".display").innerHTML = "";
    const result= await data.json();
    console.log(result)
  result.Search.forEach((item)=> {
      let moviediv = document.createElement("div");
      moviediv.classList.add("movie");
      let Poster = document.createElement("Poster");
      Poster.classList.add("Poster");

       
      let tresult = document.createElement("p");
      tresult.classList.add("tresult");
      
      tresult.innerHTML=`Total Results:${result.totalResults}`
      moviediv.appendChild(tresult);
      
     


      

      let img = document.createElement("img");
      img.src=`${item.Poster}`==="N/A" ?(image.src="./img/noimg.png") : `${item.Poster}`;
      Poster.appendChild(img);
      moviediv.appendChild(Poster);

      let description=document.createElement("div");
      description.classList.add("description");
      description.innerHTML =`Title : ${item.Title} <br><br>Year: ${item.Year} <br><br>Type: ${item.Type}  <br><br> <a href=https://www.imdb.com/title/${item.imdbID} target="_blank"> IMDB: https://www.imdb.com/title/${item.imdbID} </a>`;

  moviediv.appendChild(description);

  document.querySelector(".display").appendChild(moviediv);




  });
  next.classList.add("visible");
  prev.classList.add("visible");
};


next.addEventListener("click", ()=> {
    if(value === "") return
    pagenum++;
    getmovie(value,pagenum);

});
prev.addEventListener("click", ()=> {
    if(value === "") return
    if(pagenum==="") return
    pagenum--;
    getmovie(value,pagenum);

});
