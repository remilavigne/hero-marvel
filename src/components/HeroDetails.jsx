import React from 'react';
import ComicsCard from './ComicsCard';
import Loading from './Loading';
import Errors from './Errors';

const HeroDetails = ({ hero, comics, onClose }) => {
  return (
    <div className="max-w-4xl">
      {/* Header avec le nom et CTA retour à la liste */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Liste des comics pour <strong>{hero.name}</strong> :
        </h2>
        <button
          onClick={onClose}
          className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
         Retour à la liste des héros
        </button>
      </div>

      {/* Liste des comics disponible */}
      {comics ? (
        comics.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comics.map((comic) => (
              <ComicsCard key={comic.id} comic={comic} />
            ))}
          </div>
        ) : (
          <Errors text="Oups ! Nous n'avons pas trouver de comics pour ce Héro" />
        )
      ) : (
        <div className="mt-6 text-center">
          <Loading text="Chargement des comics..." img=""/>
        </div>
      )}
    </div>
  );
};

export default HeroDetails;