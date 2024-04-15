import PropTypes from "prop-types"; // Import de PropTypes pour la validation des props
import { createContext, useCallback, useContext, useEffect, useState } from "react"; // Import des hooks et de la fonction createContext de React

// Création du contexte DataContext
const DataContext = createContext({});

// Définition de l'API pour charger les données
export const api = {
  loadData: async () => {
    const json = await fetch("/events.json"); // Chargement des données depuis un fichier JSON
    return json.json(); // Renvoie des données au format JSON
  },
};

// Composant DataProvider qui fournit les données à l'ensemble de l'application
export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null); // État pour gérer les erreurs de chargement des données
  const [data, setData] = useState(null); // État pour stocker les données chargées
  const getData = useCallback(async () => { // Fonction asynchrone pour charger les données
    try {
      setData(await api.loadData()); // Chargement des données à partir de l'API et mise à jour de l'état
    } catch (err) {
      setError(err); // Gestion des erreurs en cas d'échec du chargement des données
    }
  }, []); // La fonction ne dépend d'aucune variable externe, donc pas besoin de spécifier de dépendances pour le hook useCallback
  
  useEffect(() => { // Effet qui se déclenche à chaque changement des données
    if (data) return; // Si les données sont déjà chargées, on ne fait rien
    getData(); // Sinon, on charge les données
  });
  
  return (
    <DataContext.Provider // Fournit les données et les erreurs à l'ensemble de l'application via le contexte DataContext
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data, // Données chargées
        error, // Erreurs de chargement
      }}
    >
      {children} {/* Affichage des composants enfants */}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Propriété children, qui doit être un élément React
}

// Hook personnalisé useData pour accéder aux données à partir de n'importe quel composant de l'application
export const useData = () => useContext(DataContext);

export default DataContext; // Export par défaut du contexte DataContext
