import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './FavoriteList.module.css';
import Handler from '../Handler/Handler.jsx';

import { PokeFetchContext } from '../PokeFetch/PokeFetchContext.jsx';
import PokeCard from '../PokeCard/PokeCard.jsx';

const FavoriteList = () => {
  const {pokemons,favorites,jsonkey,loading,error}=useContext(PokeFetchContext)
 const [localFavorites, setLocalFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(jsonkey);
    return savedFavorites ? JSON.parse(savedFavorites) : favorites;
  });
  return(
    <div className={styles.page}>
      <Handler />
      <p>Your Favorite Pokemon's!</p>
      <PokeCard pokemons={localFavorites} favorites={favorites} jsonkey={jsonkey} />
     
    </div>
  )
};

FavoriteList.propTypes = {};

FavoriteList.defaultProps = {};

export default FavoriteList;
