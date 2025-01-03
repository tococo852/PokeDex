import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import PokeDex from './components/PokeDex-test/PokeDex-test.jsx'
import Home from './components/HomePage/HomePage.jsx';
import Detail from './components/Details/Details.jsx'
import FavoriteList from './components/FavoriteList/FavoriteList.jsx'
import SearchList from './components/SearchList/SearchList.jsx';
import { PokeFetchProvider } from './components/PokeFetch/PokeFetchContext.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
 
    <PokeFetchProvider>

      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<PokeDex />} />

          <Route path="/pokedex/detail" element={<Detail />} />
          <Route path="/pokedex/favorites/detail" element={<Detail />} />
          <Route path="/pokedex/:pokemon/detail" element={<Detail />} />

          <Route path="/pokedex/favorites" element={<FavoriteList />} />
          <Route path="/pokedex/:pokemon" element={<SearchList />} />
          

        </Routes>
     </Router>
     </PokeFetchProvider>

  
  )
}

export default App

