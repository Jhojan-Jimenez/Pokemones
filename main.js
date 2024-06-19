const contenedorPokemons = document.querySelector('#contenedor-pokemones');
const apiPoke = "https://pokeapi.co/api/v2/pokemon/"
let pokemonesIniciales = []

for (let index = 1; index < 120; index++) {
    fetch(apiPoke+`${index}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        pokemonesIniciales.push(respuesta)
        agregar(respuesta)
    })
}

function filtrar(e) {
    contenedorPokemons.innerHTML = ""
    const id = e.srcElement.id
    if (id == "ver-todos") {
        pokemonesIniciales.forEach((pokemon)=>{
            agregar(pokemon)})
    }else{
        pokemonesIniciales.forEach(pokemon => {
            const type1 = pokemon.types[0].type.name;
            const type2 = pokemon.types[1]?.type.name || type1;
            if(type1 == id || type2 == id){
                agregar(pokemon)
            }
                
        }) 
    }
}
    
function agregar(pokemon) {
    let pokeId = pokemon.id
    
    if (pokeId<10) {
        pokeId = "00"+`${pokeId}`
    }else if (pokeId<100){
        pokeId = "0"+`${pokeId}`
    }
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types[1]?.type.name || type1;

    contenedorPokemons.innerHTML += `
    <div class="pokemon">
        <div class="id-back">
            #${pokeId}
        </div>
        <div class="pokemon-head">
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="">
            <span>${pokeId}</span>
            <h2>${pokemon.name}</h2>
        </div>
        <div class="pokemon-features">
            <span class="tipo ${type1}">${type1}</span>
            <span class="tipo ${type2}">${type2}</span>
            <span>${pokemon.height}</span>
            <span>${pokemon.weight}</span>
        </div>
    </div>
    `;
}

const botones = document.querySelectorAll(".btn-header")
    botones.forEach(boton => {
        boton.addEventListener('click',filtrar)
    });
