import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomePage.module.css';
import { Link, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate= useNavigate();
  return(
  <div className={styles.HomePage}>

    <button onClick={()=>navigate('/pokedex')} className={styles.start}>
     Start Pokedex
    </button>
  </div>
  )
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
