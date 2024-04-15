import React, { useEffect, useState, useRef } from "react"; // Import des hooks React
import { useData } from "../../contexts/DataContext"; // Import du contexte de données
import { getMonth } from "../../helpers/Date"; // Import de la fonction getMonth pour formater les mois
import "./style.scss"; // Import du fichier de style SCSS

const Slider = () => {
  const { data } = useData(); // Récupération des données à partir du contexte
  const [index, setIndex] = useState(0); // État pour suivre l'index de l'événement actuel
  const intervalRef = useRef(null); // Référence pour stocker l'intervalle

  // Trie des événements du plus vieux au plus récent
  const sortedEvents = data?.focus?.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Fonction pour démarrer l'intervalle
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < sortedEvents.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Intervalle de 5 secondes entre les changements de diapositives
  };

  useEffect(() => {
    startInterval(); // Démarrage de l'intervalle au chargement du composant

    return () => clearInterval(intervalRef.current); // Nettoyage de l'intervalle à la fin de l'effet
  }, [sortedEvents]); // Déclenché lorsque sortedEvents change

  // Fonction pour gérer le clic sur la pagination
  const handleClick = (idx) => {
    setIndex(idx); // Définit l'index sur celui de la diapositive cliquée
    clearInterval(intervalRef.current); // Arrête l'intervalle actuel
    startInterval(); // Redémarre l'intervalle pour continuer le défilement automatique
  };

  return (
    <div className="SlideCardList">
      {sortedEvents?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" /> {/* Affichage de l'image de l'événement */}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3> {/* Affichage du titre de l'événement */}
              <p>{event.description}</p> {/* Affichage de la description de l'événement */}
              <div>{getMonth(new Date(event.date))}</div> {/* Affichage du mois de l'événement */}
            </div>
          </div>
        </div>
      ))}
      {/* Pagination pour sélectionner les diapositives */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvents?.map((event, idx) => (
            <input
              key={event.id}
              type="radio"
              readOnly
              name="radio-button"
              checked={index === idx}
              onClick={() => handleClick(idx)} // Appel de handleClick lors du clic sur la pagination
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider; // Export du composant Slider
