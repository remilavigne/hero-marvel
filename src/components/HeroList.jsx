import React, { useState } from 'react';
import useSWR from 'swr';
import CryptoJS from 'crypto-js';
import HeroCard from './HeroCard'; 
import HeroDetails from './HeroDetails'; 
import Loading from './Loading';

// Variables pour l'API
const API_URL = 'https://gateway.marvel.com/v1/public/characters';
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

// Fonction Fetcher 
const fetcher = async (url) => {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  const fullUrl = `${url}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  const data = await response.json();
  return data;
};

// Composant HeroList pour afficher la liste des personnages disponibles
const HeroList = () => {
  const { data, error } = useSWR(API_URL, fetcher);
  const [selectedHero, setSelectedHero] = useState(null);
  const [comicsData, setComicsData] = useState({});

  if (error) return <Error text="Nous n'avons pas pu charger les personnages" />;
  if (!data) return <Loading text="Chargement des personnages..." />;

  const heroes = data.data.results;

  const handleHeroClick = async (hero) => {
    const { id } = hero;
    
    // Vérifiez si des comics sont déjà chargés pour ce héros
    if (!comicsData[id]) {
      const ts = new Date().getTime();
      const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
      const comicsUrl = `https://gateway.marvel.com/v1/public/comics?characters=${id}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
      
      const comicsResponse = await fetch(comicsUrl);
      const comicsData = await comicsResponse.json();

      // Stockage des comics dans le state
      setComicsData((prev) => ({
        ...prev,
        [id]: comicsData.data.results,
      }));
    }

    // Stockage des héro
    setSelectedHero(hero); 
  };

  const handleCloseDetails = () => {
    setSelectedHero(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col justify-items-start mb-8">
        <h1 className="text-4xl font-black text-gray-800 mb-3">Les personnages Marvel</h1>
        <h3 className=" font-bold text-gray-800">Clique sur ton héro préféré pour afficher la sélection de comics où il est présent</h3>
      </div>

      {/* Liste des personnage disponible */}
      {selectedHero ? (
        <HeroDetails
          hero={selectedHero}
          comics={comicsData[selectedHero.id]}
          onClose={handleCloseDetails}
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} onClick={() => handleHeroClick(hero)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroList;