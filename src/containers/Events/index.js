import { useState } from "react"; // Importe useState depuis React pour gérer l'état local
import EventCard from "../../components/EventCard"; // Importe le composant EventCard
import Select from "../../components/Select"; // Importe le composant Select
import { useData } from "../../contexts/DataContext"; // Importe le hook useData depuis le contexte DataContext
import Modal from "../Modal"; // Importe le composant Modal
import ModalEvent from "../ModalEvent"; // Importe le composant ModalEvent

import "./style.css"; // Importe les styles CSS

const PER_PAGE = 9; // Définit le nombre d'événements par page

const EventList = () => {
  const { data, error } = useData(); // Récupère les données et les erreurs depuis le contexte DataContext
  const [type, setType] = useState(); // Déclare un état local pour le type d'événement sélectionné
  const [currentPage, setCurrentPage] = useState(1); // Déclare un état local pour la page actuelle

  // Filtrer les événements en fonction du type sélectionné et de la pagination
  const filteredEvents = (
    (!type
      ? data?.events // Si aucun type sélectionné, affiche tous les événements
      :
      data?.events.filter((event) => event.type === type)) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true; // Retourne true si l'index de l'événement est dans la plage de pagination actuelle
    }

    return false; // Sinon, retourne false
  });

  // Fonction pour changer le type d'événement sélectionné
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialise la pagination à la première page
    setType(evtType); // Définit le nouveau type d'événement sélectionné
  };

  // Calcul du nombre de pages en fonction du nombre total d'événements filtrés
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  // Crée un ensemble de types d'événements uniques à partir des données
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {/* Affiche un message d'erreur en cas d'erreur */}
      {error && <div>Une erreur est survenue</div>}
      {/* Affiche un message de chargement si les données sont en cours de chargement */}
      {data === null ? (
        "Chargement en cours"
      ) : (
        <>
          {/* Affiche le titre pour les catégories */}
          <h3 className="SelectTitle">Catégories</h3>
          {/* Affiche le composant Select pour sélectionner le type d'événement */}
          <Select
            selection={Array.from(typeList)} // Convertit l'ensemble en un tableau
            onChange={(value) => (value ? changeType(value) : changeType(null))} // Appelle la fonction changeType avec la valeur sélectionnée
          />
          {/* Affiche la liste des événements filtrés */}
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              // Affiche le composant Modal pour chaque événement
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  // Affiche le composant EventCard dans le contenu du Modal
                  <EventCard
                    onClick={() => setIsOpened(true)} // Ouvre le Modal lorsqu'on clique sur l'événement
                    imageSrc={event.cover} // URL de l'image de l'événement
                    title={event.title} // Titre de l'événement
                    date={new Date(event.date)} // Date de l'événement
                    label={event.type} // Type de l'événement
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* Affiche la pagination pour naviguer entre les pages */}
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // Affiche un lien pour chaque page de la pagination
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList; // Exporte le composant EventList
