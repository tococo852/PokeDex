import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchList.module.css';
import Handler from '../Handler/Handler.jsx';
import PokeCard from '../PokeCard/PokeCard.jsx'; 
import { PokeFetchContext } from '../PokeFetch/PokeFetchContext.jsx';
import { useParams } from 'react-router-dom';

const SearchList = () => {
  const { pokemons, favorites, jsonkey } = useContext(PokeFetchContext);
  const { pokemon } = useParams(); 
  const [localFavorites, setLocalFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(jsonkey);
    return savedFavorites ? JSON.parse(savedFavorites) : favorites;
  });

  const matchingPokemon = pokemons.find((p) => p.name.toLowerCase() === pokemon?.toLowerCase());

  return (
    <div className={styles.SearchList}>
      <Handler />
      {matchingPokemon ? (
        <PokeCard pokemons={[matchingPokemon]} favorites={localFavorites} jsonkey={jsonkey} />
      ) : (
        <p>Pokemon not found</p>
      )}
    </div>
  );
};

SearchList.propTypes = {};

SearchList.defaultProps = {};

export default SearchList;
