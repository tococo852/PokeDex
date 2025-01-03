import React, { createContext, useState, useEffect } from 'react';

export const PokeFetchContext = createContext();

export const PokeFetchProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const key = 'favorites';

  useEffect(() => {
    const storedFavorites = localStorage.getItem(key);
    if (storedFavorites === null) {
      localStorage.setItem(key, JSON.stringify([]));
      setFavorites([]);
    } else {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [key]);

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const pokeApiResponse = await fetch('https://pokeapi.co/api/v2/pokedex/extended-sinnoh');
        const pokeApiData = await pokeApiResponse.json();
        const pokemonEntries = pokeApiData.pokemon_entries;

        const pokemonDetailsPromises = pokemonEntries.map(entry => {
          const pokemonDataPromise = fetch('https://pokeapi.co/api/v2/pokemon/' + (entry.pokemon_species.url).split('/').splice(-2)[0])
            .then(res => {
              if (!res.ok) {
                throw new Error(`Pokemon data not found: ${entry.pokemon_species.id}`);
              }
              return res.json();
            });

          const pokemonDescriptionPromise = fetch(entry.pokemon_species.url)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Species data not found: ${entry.pokemon_species.id}`);
              }
              return res.json();
            });

          return Promise.all([pokemonDataPromise, pokemonDescriptionPromise]).then(([pokemonData, speciesData]) => {
            const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available';

            return {
              name: pokemonData.name,
              id: pokemonData.id,
              description: description,
              height: pokemonData.height,
              sprites: pokemonData.sprites,
              region_id: speciesData.pokedex_numbers.find(entry => entry.pokedex.name === 'extended-sinnoh').entry_number,
              types: pokemonData.types,
              weight: pokemonData.weight,
            };
          }).catch(err => {
            console.error(err);
            return null;
          });
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails.filter(pokemon => pokemon !== null));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokedex();
  }, []);

  return (
    <PokeFetchContext.Provider value={{ pokemons, favorites, jsonkey: key, loading, error }}>
      {console.log(pokemons)}

      {children}
    </PokeFetchContext.Provider>
  );
};
