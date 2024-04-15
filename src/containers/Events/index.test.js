import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

// Données de test pour simuler la réponse de l'API
const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("Quand Events est créé", () => {
  beforeEach(() => {
    // Simulation de la réponse de l'API avec les données de test
    api.loadData = jest.fn().mockReturnValue(data);
  });

  it("affiche une liste de cartes d'événements", async () => {
    // Rendu du composant Events enveloppé dans DataProvider
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
    // Attente de l'apparition du texte "avril" dans le DOM
    await waitFor(() => expect(screen.getByText("avril")).toBeInTheDocument());
  });

  describe("quand une erreur se produit", () => {
    beforeEach(() => {
      // Simulation de la réponse de l'API rejetée
      api.loadData.mockRejectedValue();
    });

    it("affiche un message d'erreur", async () => {
      // Rendu du composant Events enveloppé dans DataProvider
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Attente de l'apparition du message d'erreur dans le DOM
      await waitFor(() => expect(screen.getByText("Une erreur s'est produite")).toBeInTheDocument());
    });
  });

  describe("quand une catégorie est sélectionnée", () => {
    it("affiche une liste filtrée", async () => {
      // Rendu du composant Events enveloppé dans DataProvider
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Attente de l'apparition de la carte d'événement "Forum #productCON" dans le DOM
      await waitFor(() => expect(screen.getByText("Forum #productCON")).toBeInTheDocument());

      // Clique sur le bouton de réduction pour étendre la sélection de catégories
      fireEvent.click(screen.getByTestId("collapse-button-testid"));
      // Clique sur la catégorie "soirée entreprise"
      fireEvent.click(await screen.findByText("soirée entreprise"));

      // Attente de l'apparition de la carte d'événement "Conférence #productCON" dans le DOM
      await waitFor(() => expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument());
      expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
    });
  });

  describe("quand on clique sur un événement", () => {
    it("affiche le détail de l'événement dans une Modale", async () => {
      // Rendu du composant Events enveloppé dans DataProvider
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Clique sur la carte d'événement "Conférence #productCON"
      fireEvent.click(await screen.findByText("Conférence #productCON"));

      // Attente de l'apparition des détails de l'événement dans la Modale
      await waitFor(() => expect(screen.getByText("24-25-26 Février")).toBeInTheDocument());
      expect(screen.getByText("1 site web dédié")).toBeInTheDocument();
    });
  });
});
