import React from 'react';
import PropTypes from 'prop-types';
import styles from './Details.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const pokemon = location.state?.pokemonData;
  const navigate = useNavigate();
  
  

  const handleClickBack = () => {
    navigate('/pokedex');
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className={styles.details}>
      <div className={styles.detailsbox}> 
        <button onClick={handleClickBack}>Back</button>
        <div className={styles.information}>
          <div className={styles.sprites}>        
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <div className={styles.infobox}>
            <div className={styles.namePlate}>
              <h2 className={styles.color}>No.{pokemon.region_id} {pokemon.name}</h2>
            </div>
            <div className={styles.typezone}> 
              <div className={`${styles[pokemon.types[0].type.name.toLowerCase()]}`}>
                {pokemon.types[0].type.name}
              </div>
              {pokemon.types[1] && (
                <div className={`${styles[pokemon.types[1].type.name.toLowerCase()]}`}>
                  {pokemon.types[1].type.name}
                </div>
              )}
            </div>
            <div className={styles.stats}>
              <p>Height: {pokemon.height / 10}m</p>
              <p>Weight: {pokemon.weight / 10}kg</p>
            </div>
          </div>
        </div>
        <div className={styles.description}>{pokemon.description}</div>
      </div>
    </div>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
