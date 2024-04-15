import { fireEvent, render, screen } from "@testing-library/react"; // Import des utilitaires de test
import Form from "./index"; // Import du composant Form à tester

describe("When Events is created", () => { // Début des tests pour le composant Form
  it("a list of event card is displayed", async () => { // Test : Vérification de l'affichage des champs du formulaire
    render(<Form />); // Rendu du composant Form
    // Attente de l'affichage des éléments du formulaire
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => { // Test : Vérification de l'action déclenchée par le clic sur le bouton de soumission
    it("the success action is called", async () => { // Test : Vérification que l'action de succès est appelée
      const onSuccess = jest.fn(); // Mock de la fonction onSuccess
      render(<Form onSuccess={onSuccess} />); // Rendu du composant Form avec la fonction onSuccess mockée
      fireEvent( // Déclenchement d'un événement sur le bouton de soumission
        await screen.findByTestId("button-test-id"), // Recherche et attente du bouton de soumission
        new MouseEvent("click", { // Création d'un événement de clic
          cancelable: true, // Autorisation de l'annulation de l'événement
          bubbles: true, // Autorisation de la propagation de l'événement
        })
      );
      await screen.findByText("En cours"); // Attente de l'affichage du texte "En cours" sur le bouton
      await screen.findByText("Envoyer"); // Attente de l'affichage du texte "Envoyer" sur le bouton
      expect(onSuccess).toHaveBeenCalled(); // Vérification que la fonction onSuccess a été appelée
    });
  });
});
