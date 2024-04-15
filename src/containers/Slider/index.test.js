import { render, screen } from "@testing-library/react"; // Import des fonctions de test de React Testing Library
import Slider from "./index"; // Import du composant Slider à tester
import { api, DataProvider } from "../../contexts/DataContext"; // Import du contexte de données et de l'API

// Données de test pour simuler les événements du slider
const data = {
  focus: [
    {
      title: "World economic forum", // Titre du premier événement
      description: "Oeuvre à la coopération entre le secteur public et le privé.", // Description du premier événement
      date: "2022-02-29T20:28:45.744Z", // Date du premier événement
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png", // Image de couverture du premier événement
    },
    {
      title: "World Gaming Day", // Titre du deuxième événement
      description: "Evenement mondial autour du gaming", // Description du deuxième événement
      date: "2022-03-29T20:28:45.744Z", // Date du deuxième événement
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png", // Image de couverture du deuxième événement
    },
    {
      title: "World Farming Day", // Titre du troisième événement
      description: "Evenement mondial autour de la ferme", // Description du troisième événement
      date: "2022-01-29T20:28:45.744Z", // Date du troisième événement
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png", // Image de couverture du troisième événement
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn(); // Supprime les messages d'erreur de la console
    api.loadData = jest.fn().mockReturnValue(data); // Mock de la fonction loadData de l'API
    render( // Rendu du Slider avec les données fournies par le DataProvider
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum"); // Attend que le titre "World economic forum" soit affiché
    await screen.findByText("janvier"); // Attend que le mois "janvier" soit affiché
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    ); // Attend que la description de l'événement soit affichée
  });
});
