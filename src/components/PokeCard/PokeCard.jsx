import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PokeCard.module.css';
import { Link, useLocation } from 'react-router-dom'; 

let selectedPokemons=[]

const PokeCard = ({ pokemons , favorites, jsonkey}) => {

  const [localFavorites, setLocalFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem(jsonkey);
    return savedFavorites ? JSON.parse(savedFavorites) : favorites;
  });
    const toggleFavorite = (pokemon) => {
    setLocalFavorites((prevFavorites) => {
      const localFavorites = prevFavorites.some((fav) => fav.name === pokemon.name);
      if (localFavorites) {
        return prevFavorites.filter((fav) => fav.name !== pokemon.name);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };
  const location = useLocation(); 
  useEffect(() => {
    localStorage.setItem(jsonkey, JSON.stringify(localFavorites)); 
    console.log(`i got triggered! at ${location.pathname}, the state of favorites is:`);
    console.log(localFavorites);
    console.log('////////')
  }, [location, localFavorites]); 

const [currentPage, setCurrentPage]=useState(1)
const itemsPerPage = 30; 
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);
const handlePageChange = (page) => {
  setCurrentPage(page);
};

  return (
    <div className={styles.pokeList}>
      <div className={styles.pokeGrid}>
      {currentItems.map((pokemon) => {
        const [isStar, setIsStar] = useState(false);
        const toggleStar = ({poke}) => {
          setIsStar(!isStar);
          let check;
          toggleFavorite(pokemon);
        };
        const startStar= (poke)=>{
          
          setIsStar(
            localFavorites.some(pokemon=> pokemon.name===poke.name)
          );
          
        }
        
        React.useEffect(() => {
          startStar(pokemon);
        }, [pokemon, localFavorites]); 


        return (
          <div className={styles.pokeContainer} key={pokemon.id}>
            <div className={styles.pokeHeader}>
              <div
                className={`${styles.star} ${isStar ? styles.filler : ''}`}
                onClick={()=>toggleStar({poke: pokemon})}
                style={{ cursor: 'pointer' }}
              >    
              </div>
              <h2 className={styles.pokeName}>{pokemon.name}</h2>
              <p>No.{pokemon.region_id}</p>

            </div>
            <div >
              <Link to="detail" state={{ pokemonData: pokemon }}>
                <img
                  className={styles.pokeSprite}
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </Link>
            </div>

            <p className={styles.descriptionBox}>{pokemon.description}</p>
          </div>


        );
      })}
      </div>
    {}
    <div className={styles.pagination}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: Math.ceil(pokemons.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? styles.activePage : ''}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === Math.ceil(pokemons.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      
    </div>
  );
};

PokeCard.propTypes = {
  pokemons: PropTypes.array.isRequired,
};

export default PokeCard;
