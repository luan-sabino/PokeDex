function getElement(element){
    return document.querySelector(element);
}

const divContainer = getElement("main .container");
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
var pokemon;
var flagError = false; 

async function requestPokemon(url, name){
    
    await fetch(url + name)
        .then(response => response.json())
        .then(data => {pokemon = data;})    
        .catch(err => {console.log(err); flagError = true;});
       
}

function pokemonViewBuilder(pokemon){

    let divPokemon = document.createElement("div");
    divPokemon.className = `pokemon ${pokemon.types[0].type.name}-bg`;
    
    //ID Component Builder
    let spanId = document.createElement("span");
    spanId.className = "id";
    spanId.textContent = pokemon.id;
    divPokemon.appendChild(spanId);

    //IMG Component Builder
    let imgPok = document.createElement("img");
    imgPok.src = pokemon.sprites.front_default;
    divPokemon.appendChild(imgPok);

    //Name Component Builder
    let name = document.createElement("h3");
    name.textContent = (pokemon.name).toUpperCase();
    divPokemon.appendChild(name);

    //Types Component Builder
    let typesDiv = document.createElement("div");
    typesDiv.className = "types";

    for(index = 0; index < pokemon.types.length; index++){
        let type = document.createElement("i");
        type.className = `fas fa-circle ${pokemon.types[index].type.name}`;
        type.title = `${pokemon.types[index].type.name}`
        typesDiv.appendChild(type);
    }

    divPokemon.appendChild(typesDiv);

    //Stats Component Builder
    let statsDiv = document.createElement("div");
    statsDiv.className = "stats";

    for(index = 0; index < pokemon.stats.length; index++){
        let div = document.createElement("div");
        let statName = pokemon.stats[index].stat.name;
        div.className = statName;

        let styles = getComputedStyle(document.body);
        let colorBg = styles.getPropertyValue(`--${statName}`);
        
        let statValue = pokemon.stats[index].base_stat;
        div.title = statValue;
        let background = `linear-gradient(to right, ${colorBg} 0% ${statValue}%, white ${statValue}% 100%)`;
        div.style.background = background;
        
        div.textContent = statName.toUpperCase();
        statsDiv.appendChild(div);
    }

    divPokemon.appendChild(statsDiv);

    //Height and Weight Span Builder

    let divWrapper = document.createElement("div");
    let divAbout = document.createElement("div");
    divAbout.className = "about"
    let span = document.createElement("span");
    span.innerHTML = `<i class="fas fa-arrows-alt-v"></i> ${pokemon.height/10}M <i class="fas fa-weight"></i> ${pokemon.weight/10}KG`;

    divAbout.appendChild(span);
    divWrapper.appendChild(divAbout);

    divPokemon.appendChild(divWrapper);

    //Add to HTML
    divContainer.appendChild(divPokemon);
    
}

function searchPokemon(pokemonIdentifier = (getElement("#search-box").value).toLowerCase(), myTeam = false){

    if(document.getElementById("welcome") != null){
        divContainer.removeChild(document.getElementById("welcome"));
    }

    let outFirstIntervalAPI = (parseInt(pokemonIdentifier) <= 0 || parseInt(pokemonIdentifier) >= 899);
    let outSecondIntervalAPI = (parseInt(pokemonIdentifier) <= 10000 || parseInt(pokemonIdentifier) >= 10221);

    if(pokemonIdentifier === "" || (outFirstIntervalAPI && outSecondIntervalAPI)){
            errorOnRequest("show");
            return;
    }
    
    if(!myTeam){
        disableButtons();
    }
    
    pokemon = null;
    requestPokemon(baseUrl, pokemonIdentifier);
    setTimeout(() => {
        if(flagError || pokemon == null){
            errorOnRequest("show");
            flagError = !flagError;
            if(!myTeam){
                disableButtons();
            }
        }else{
            errorOnRequest("hide");
            pokemonViewBuilder(pokemon);
            if(!myTeam){
                disableButtons();
            }
        }
    }, 1000);

}

function errorOnRequest(opt){
    let card = getElement(".placeholder-container");
    if(opt == "show"){
        divContainer.innerHTML = "";
        divContainer.appendChild(card);
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
            divContainer.removeChild(document.querySelector(".pokemon"));
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
        delay();
    }, 1100);

}

function delay(){
    var id = Math.floor(Math.random() * 898 - 0);
    setTimeout(
        ()=>{
            searchPokemon(id, true);
        }, 1000
    )
}

function disableButtons(){
    let resetBtn = document.querySelector(".reset");
    let searchBtn = document.querySelector("#search-box");
    let myTeamBtn = document.querySelector(".myTeam");

    if(resetBtn.disabled){
        resetBtn.disabled = !resetBtn.disabled; 
        resetBtn.style.pointerEvents = "all";
        searchBtn.disabled = !searchBtn.disabled;
        searchBtn.style.pointerEvents = "all"; 
        myTeamBtn.disabled = !myTeamBtn.disabled;
        myTeamBtn.style.pointerEvents = "all";
    }else{
        resetBtn.disabled = !resetBtn.disabled; 
        resetBtn.style.pointerEvents = "none";
        searchBtn.disabled = !searchBtn.disabled;
        searchBtn.style.pointerEvents = "none"; 
        myTeamBtn.disabled = !myTeamBtn.disabled;
        myTeamBtn.style.pointerEvents = "none";

    }


}