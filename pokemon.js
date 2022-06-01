'use strict'

let pintaShiny;
var actualPokemon = Math.floor(Math.random() * 897);

class Pokemon {
    constructor(imagen,imagenShiny,nombre,espAtaque,ataque,vida,shiny,tipos){
        this.imagen = imagen;
        this.imagenShiny = imagenShiny;
        this.nombre = nombre;
        this.espAtaque = espAtaque;
        this.ataque = ataque;
        this.vida = vida;
        this.shiny = shiny;
        this.tipos = tipos;
    }
}
let p;
function getPokemon(numPokemon) {
    let RandShiny = Math.floor(Math.random() * 4095); // 1/4096
    let esShiny = true;
    return HTTP.ajax('GET',`https://pokeapi.co/api/v2/pokemon/`+ numPokemon).then(
        data => {
            if(RandShiny==1) esShiny = true;
            else esShiny = false;
            pintaShiny = esShiny;
            p = new Pokemon(data.sprites.front_default, data.sprites.front_shiny, data.name, data.stats[3].base_stat,data.stats[1].base_stat, data.stats[0].base_stat, esShiny, data.types);
            PintaPokemon(p);
        }
    )
}
let introBuscar = document.querySelector(".idPokemon");
introBuscar.setAttribute("value",actualPokemon);
let botonSiguiente = document.querySelector(".siguiente")
botonSiguiente.addEventListener("click", function( event ) {
    if(actualPokemon != 898) actualPokemon++;
    else actualPokemon = 1;
    getPokemon(actualPokemon);
    introBuscar.setAttribute("value",actualPokemon);
}, true);

let botonAnterior = document.querySelector(".anterior")
botonAnterior.addEventListener("click", function( event ) {
    if(actualPokemon != 1) actualPokemon--;
    else actualPokemon = 898;
    getPokemon(actualPokemon);
    introBuscar.setAttribute("value",actualPokemon);
}, true);

let botonBuscar = document.querySelector(".buscar")
botonBuscar.addEventListener("click", function( event ) {
    let busqueda = document.querySelector(".idPokemon");
    if(busqueda.value > 0 && busqueda.value <= 898) {
        getPokemon(busqueda.value);
        actualPokemon = busqueda.value;
    }
}, true);

introBuscar.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        let busqueda = document.querySelector(".idPokemon");
        if(busqueda.value > 0 && busqueda.value <= 898) {
            actualPokemon = busqueda.value;
            getPokemon(busqueda.value);
        }
    }
});

let botonCambio = document.querySelector(".shiny");
botonCambio.addEventListener("click", function( event ) {
    pintaShiny = !pintaShiny;
    if (pintaShiny) {
        document.querySelector(".card-img-top").setAttribute("src",p.imagenShiny);
        document.querySelector(".shiny").innerHTML="Ver Normal";
    } 
    else {
        document.querySelector(".card-img-top").setAttribute("src",p.imagen);
        document.querySelector(".shiny").innerHTML="Ver Shiny";
    }

    }, true);




function PintaPokemon(pokemon){
    let nombrePokemon = pokemon.nombre;
    const nombreBien = nombrePokemon.slice(0,1).toUpperCase() + nombrePokemon.slice(1) + " [ "+actualPokemon+" ]";
    
    document.querySelector(".card-title").innerHTML=nombreBien;
    document.getElementById("tipos").innerHTML = "";
    for(let i=0; i<pokemon.tipos.length;i++){
        document.getElementById("tipos").innerHTML+= "\""+pokemon.tipos[i].type.name+"\" ";
    }
    document.getElementById("espAtt").innerHTML="Attack - "+pokemon.ataque;
    document.getElementById("att").innerHTML="Special Attack - "+pokemon.espAtaque;
    document.getElementById("hp").innerHTML="HP - "+pokemon.vida;
    if(pokemon.shiny) document.querySelector(".card-img-top").setAttribute("src",pokemon.imagenShiny);
    else document.querySelector(".card-img-top").setAttribute("src",pokemon.imagen);
    if (pintaShiny) {
        document.querySelector(".shiny").innerHTML="Ver Normal";
    }
    else {
        document.querySelector(".shiny").innerHTML="Ver Shiny";
    }

    
}

getPokemon(actualPokemon);