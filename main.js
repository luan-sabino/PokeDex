function getElement(element){
    return document.querySelector(element);
}

const divContainer = getElement("main .container");
const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
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

function searchPokemon(pokemonIdentifier){

    var pokemonIdentifier = (getElement("#search-box").value).toLowerCase();

    console.log(pokemonIdentifier);

    requestPokemon(baseUrl, pokemonIdentifier);

        
    setTimeout(() => {
        if(flagError){
            errorOnRequest("show");
            flagError = !flagError;
        }else{
            errorOnRequest("hide");
            pokemonViewBuilder(pokemon);
        }
    }, 1000);

}

function errorOnRequest(opt){
    let card = getElement(".error-container");
    if(opt == "show"){
        divContainer.innerHTML = "";
        divContainer.appendChild(card);
        card.style.display = "flex";
    }else if(opt = "hide"){
        card.style.display = "none";
    }
}

/*
var myTeamPokemons = [];

function myteam(){


    var id = 0;

    for(var i = 0; i < 4; i++){
        id = Math.floor(Math.random() * 898 - 0);
        requestPokemon(baseUrl, id);
        setTimeout(() => {
            pokemonViewBuilder(pokemon);

        }, 1000)
    }

}
*/