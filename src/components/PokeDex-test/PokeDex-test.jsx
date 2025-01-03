import React, { useState, useEffect, useContext } from 'react';
import styles from './PokeDex-test.module.css';
import { Link, Routes, Route } from 'react-router-dom';
import PokeCard from '../PokeCard/PokeCard.jsx';
import Handler from '../Handler/Handler.jsx';
import { PokeFetchContext } from '../PokeFetch/PokeFetchContext.jsx';

const PokeDex = () => {
  const {pokemons,favorites,jsonkey,loading,error}=useContext(PokeFetchContext)

const [localFavorites, setLocalFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(jsonkey);
    return savedFavorites ? JSON.parse(savedFavorites) : favorites;
  }); 
  if (loading) return <div>Loading Pokédex...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <Handler />
      <p>Displaying All Pokemons!</p>

      <PokeCard pokemons={pokemons} favorites={localFavorites} jsonkey={jsonkey} />

      
    </div>
  );
};

export default PokeDex;
