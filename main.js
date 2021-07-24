function getElement(element){
    return document.querySelector(element);
}

const principalContainer = getElement("main .container");
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

var pokemonHolder;
var hasAErrorOnTheRequest = false; 

async function requestPokemon(url, name){
    await fetch(url + name)
        .then(response => response.json())
        .then(data => {pokemonHolder = data;})    
        .catch(err => {console.log(err); hasAErrorOnTheRequest = true;});
       
}

window.onload = ()=>{
    let theSearchBoxAreOnFocus = false;

    document.addEventListener("keypress", (event)=>{
        if(event.key == "Enter" && theSearchBoxAreOnFocus){
            searchPokemon();
        }
    });
    
    document.querySelector("#search-box").addEventListener("focusin", (event)=>{
        return theSearchBoxAreOnFocus = !theSearchBoxAreOnFocus;
    });

    document.querySelector("#search-box").addEventListener("focusout", (event)=>{
        return theSearchBoxAreOnFocus = !theSearchBoxAreOnFocus;
    });
}


function pokemonViewBuilder(pokemon){

    let pokemonContainer = document.createElement("div");
    pokemonContainer.className = `pokemon ${pokemon.types[0].type.name}-bg`;
    
    //ID Component Builder
    let idPokemon = document.createElement("span");
    idPokemon.className = "id";
    idPokemon.textContent = pokemon.id;
    pokemonContainer.appendChild(idPokemon);

    //IMG Component Builder
    let imagePokemon = document.createElement("img");
    imagePokemon.src = pokemon.sprites.front_default;
    pokemonContainer.appendChild(imagePokemon);

    //Name Component Builder
    let namePokemon = document.createElement("h3");
    namePokemon.textContent = (pokemon.name).toUpperCase();
    pokemonContainer.appendChild(namePokemon);

    //Types Component Builder
    let typesContainer = document.createElement("div");
    typesContainer.className = "types";

    for(index = 0; index < pokemon.types.length; index++){
        let type = document.createElement("i");
        type.className = `fas fa-circle ${pokemon.types[index].type.name}`;
        type.title = `${pokemon.types[index].type.name}`
        typesContainer.appendChild(type);
    }

    pokemonContainer.appendChild(typesContainer);

    //Stats Component Builder
    let statsContainer = document.createElement("div");
    statsContainer.className = "stats";

    for(index = 0; index < pokemon.stats.length; index++){
        let div = document.createElement("div");
        let statName = pokemon.stats[index].stat.name;
        div.className = statName;

        let styles = getComputedStyle(document.body);
        let colorBackground = styles.getPropertyValue(`--${statName}`);
        
        let statValue = pokemon.stats[index].base_stat;
        div.title = statValue;
        let background = `linear-gradient(to right, ${colorBackground} 0% ${statValue}%, white ${statValue}% 100%)`;
        div.style.background = background;
        
        div.textContent = statName.toUpperCase();
        statsContainer.appendChild(div);
    }

    pokemonContainer.appendChild(statsContainer);

    //Height and Weight Span Builder

    let Wrapper = document.createElement("div");
    let aboutContainer = document.createElement("div");
    aboutContainer.className = "about"
    let aboutContent = document.createElement("span");
    aboutContent.innerHTML = `<i class="fas fa-arrows-alt-v"></i> ${pokemon.height/10}M <i class="fas fa-weight"></i> ${pokemon.weight/10}KG`;

    aboutContainer.appendChild(aboutContent);
    Wrapper.appendChild(aboutContainer);

    pokemonContainer.appendChild(Wrapper);

    //Add to HTML
    principalContainer.appendChild(pokemonContainer);
    
}

function searchPokemon(pokemonIdentifier = (getElement("#search-box").value).toLowerCase(), myTeam = false){

    if(document.getElementById("welcome") != null){
        principalContainer.removeChild(document.getElementById("welcome"));
    }

    let outFirstIntervalSearchAreaInAPI = (parseInt(pokemonIdentifier) <= 0 || parseInt(pokemonIdentifier) >= 899);
    let outSecondIntervalSearchAreaAPI = (parseInt(pokemonIdentifier) <= 10000 || parseInt(pokemonIdentifier) >= 10221);

    if(pokemonIdentifier === "" || (outFirstIntervalSearchAreaInAPI && outSecondIntervalSearchAreaAPI)){
            displayErrorOnRequestCard("show");
            return;
    }
    
    if(!myTeam){
        disableButtons();
    }
    
    pokemonHolder = null;
    requestPokemon(baseUrl, pokemonIdentifier);
    setTimeout(() => {
        if(hasAErrorOnTheRequest || pokemonHolder == null){
            displayErrorOnRequestCard("show");
            hasAErrorOnTheRequest = !hasAErrorOnTheRequest;
            if(!myTeam){
                disableButtons();
            }
        }else{
            displayErrorOnRequestCard("hide");
            pokemonViewBuilder(pokemonHolder);
            if(!myTeam){
                disableButtons();
            }
        }
    }, 1000);

}

function displayErrorOnRequestCard(opt){
    let card = getElement(".placeholder-container");
    if(opt == "show"){
        principalContainer.innerHTML = "";
        principalContainer.appendChild(card);
        card.style.display = "flex";
    }else if(opt = "hide"){
        card.style.display = "none";
    }
}

function clearView(){
    let pokemons = document.querySelectorAll(".pokemon");
    if(pokemons.length == 0){
        return console.log("Already clear");
    }else{
        for(i = 0; i < pokemons.length; i++){
            principalContainer.removeChild(document.querySelector(".pokemon"));
        }
    }
}

function myTeam(){
   
    disableButtons();
    
    clearView();

    var counter = 0;

    let interval = setInterval(()=>{
        if(counter == 3){
            clearInterval(interval);
            disableButtons();
        }
        counter++;
        delayForRequest();
    }, 1100);

}

function delayForRequest(){
    var id = Math.floor(Math.random() * 898 - 0);
    setTimeout(
        ()=>{
            searchPokemon(id, true);
        }, 1000
    )
}

function disableButtons(){
    let resetButton = document.querySelector(".reset");
    let searchButton = document.querySelector("#search-box");
    let myTeamButton = document.querySelector(".myTeam");

    if(resetButton.disabled){
        resetButton.disabled = !resetButton.disabled; 
        resetButton.style.pointerEvents = "all";
        searchButton.disabled = !searchButton.disabled;
        searchButton.style.pointerEvents = "all"; 
        myTeamButton.disabled = !myTeamButton.disabled;
        myTeamButton.style.pointerEvents = "all";
    }else{
        resetButton.disabled = !resetButton.disabled; 
        resetButton.style.pointerEvents = "none";
        searchButton.disabled = !searchButton.disabled;
        searchButton.style.pointerEvents = "none"; 
        myTeamButton.disabled = !myTeamButton.disabled;
        myTeamButton.style.pointerEvents = "none";

    }
}