import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Handler.module.css';

const Handler = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/pokedex/${inputValue.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.Handler}>
      <h1>Sinnoh Pokédex</h1>
      <button onClick={() => navigate('/')}>Back to start</button>
      <div >
      <button onClick={() => navigate('/pokedex')}>Display All</button>
      <button onClick={() => navigate('/pokedex/favorites')}>Favorite List</button>
      </div>

      <div>
        <label htmlFor="input-box">Enter Pokémon Name:</label>
        <input
          type="text"
          id="input-box"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search Pokémon"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Handler;
