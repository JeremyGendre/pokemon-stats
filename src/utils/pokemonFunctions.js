/**
 * Return the given stat value corresponding to the given pokemon
 * @param pokemon
 * @param stat_needle
 * @returns {number}
 */
export function getStatFromPokemon(pokemon,stat_needle) {
    let pokemonStats = getStats(pokemon);
    if(pokemonStats === null){return 0;}

    let result = 0;
    for(let i = 0; i < pokemonStats.length; i++){
        if(pokemonStats[i].stat.name === stat_needle){
            result = pokemonStats[i].base_stat;
            break;
        }
    }
    return result;
}

/**
 * Get the 'stats' property of a given needle if possible, return null if not
 * @param needle
 * @returns Object|null
 */
export function getStats(needle){
    let result = null;
    if(needle !== undefined && needle !== null){
        if(needle.stats !== undefined){
            result = needle.stats;
        }else if(needle.data !== undefined && needle.data.stats !== undefined){
            result = needle.data.stats;
        }
    }
    return result;
}

/**
 * Get the 'name' property of a given needle if possible, return null if not
 * @param pokemon
 * @returns string|null
 */
export function getPokemonName(pokemon){
    let result = null;
    if(pokemon !== undefined && pokemon !== null){
        if(undefined !== pokemon.name){
            result = pokemon.name;
        }else if(pokemon.data !== undefined && pokemon.data.name !== undefined){
            result = pokemon.data.name;
        }
    }
    return result;
}

/**
 * Get the HP stat of a given pokemon
 * @param pokemon (need to be an object)
 * @returns int
 */
export function getHpStatFromPokemon(pokemon){
    return getStatFromPokemon(pokemon,'hp');
}

/**
 * Get the Attack stat of a given pokemon
 * @param pokemon (need to be an object)
 * @returns int
 */
export function getAttackStatFromPokemon(pokemon){
    return getStatFromPokemon(pokemon,'attack');
}

/**
 * Get the Defense stat of a given pokemon
 * @param pokemon (need to be an object)
 * @returns int
 */
export function getDefenseStatFromPokemon(pokemon){
    return getStatFromPokemon(pokemon,'defense');
}

/**
 * Get the Special Attack stat of a given pokemon
 * @param pokemon (need to be an object)
 * @returns int
 */
export function getSpecialAttackStatFromPokemon(pokemon){
    return getStatFromPokemon(pokemon,'special-attack');
}

/**
 * Get the Special Defense stat of a given pokemon
 * @param pokemon (need to be an object)
 * @returns int
 */
export function getSpecialDefenseStatFromPokemon(pokemon){
    return getStatFromPokemon(pokemon,'special-defense');
}

/**
 * Get the Speed stat of a given pokemon
 * @param pokemon (need to be an object)
 * @returns int
 */
export function getSpeedStatFromPokemon(pokemon){
    return getStatFromPokemon(pokemon,'speed');
}

/**
 * Return the pokemon with the best HP stat
 * @param pokemonList
 * @returns {null}
 */
export function getBestHpPokemonFromList(pokemonList){
    let bestPokemon = null;
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        if(i === 0){bestPokemon = pokemon; continue;}

        if(getHpStatFromPokemon(pokemon) > getHpStatFromPokemon(bestPokemon)){
            bestPokemon = pokemon;
        }
    }
    return bestPokemon;
}

/**
 * Return the pokemon with the best Attack stat
 * @param pokemonList
 * @returns {null}
 */
export function getBestAttackPokemonFromList(pokemonList){
    let bestPokemon = null;
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        if(i === 0){bestPokemon = pokemon; continue;}

        if(getAttackStatFromPokemon(pokemon) > getAttackStatFromPokemon(bestPokemon)){
            bestPokemon = pokemon;
        }
    }
    return bestPokemon;
}

/**
 * Return the pokemon with the best Defense stat
 * @param pokemonList
 * @returns {null}
 */
export function getBestDefensePokemonFromList(pokemonList){
    let bestPokemon = null;
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        if(i === 0){bestPokemon = pokemon; continue;}

        if(getDefenseStatFromPokemon(pokemon) > getDefenseStatFromPokemon(bestPokemon)){
            bestPokemon = pokemon;
        }
    }
    return bestPokemon;
}

/**
 * Return the pokemon with the best Special Attack stat
 * @param pokemonList
 * @returns {null}
 */
export function getBestSpecialAttackPokemonFromList(pokemonList){
    let bestPokemon = null;
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        if(i === 0){bestPokemon = pokemon; continue;}

        if(getSpecialAttackStatFromPokemon(pokemon) > getSpecialAttackStatFromPokemon(bestPokemon)){
            bestPokemon = pokemon;
        }
    }
    return bestPokemon;
}

/**
 * Return the pokemon with the best Special Defense stat
 * @param pokemonList
 * @returns {null}
 */
export function getBestSpecialDefensePokemonFromList(pokemonList){
    let bestPokemon = null;
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        if(i === 0){bestPokemon = pokemon; continue;}

        if(getSpecialDefenseStatFromPokemon(pokemon) > getSpecialDefenseStatFromPokemon(bestPokemon)){
            bestPokemon = pokemon;
        }
    }
    return bestPokemon;
}

/**
 * Return the pokemon with the best Speed stat
 * @param pokemonList
 * @returns {null}
 */
export function getBestSpeedPokemonFromList(pokemonList){
    let bestPokemon = null;
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        if(i === 0){bestPokemon = pokemon; continue;}

        if(getSpeedStatFromPokemon(pokemon) > getSpeedStatFromPokemon(bestPokemon)){
            bestPokemon = pokemon;
        }
    }
    return bestPokemon;
}


