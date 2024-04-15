import { render, screen } from "@testing-library/react"; // Importe les fonctions de rendu et de sélection d'éléments du DOM pour les tests.
import EventCard from "./index"; // Importe le composant EventCard à tester.

describe("Lorsqu'une carte d'événement est créée", () => {
  it("une image est affichée avec une valeur alt", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        date={new Date("2022-04-01")}
        title="test event"
        label="test label"
      />
    );
    const imageElement = screen.getByTestId("card-image-testid"); // Sélectionne l'élément d'image par son attribut de test.
    expect(imageElement).toBeInTheDocument(); // Vérifie si l'élément d'image est présent dans le DOM.
    expect(imageElement.alt).toEqual("image-alt-text"); // Vérifie si l'attribut alt de l'image correspond à la valeur attendue.
  });

  it("un titre, un label et un mois sont affichés", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={new Date("2022-04-01")}
      />
    );
    const titleElement = screen.getByText(/test event/); // Sélectionne l'élément de titre par son texte.
    const monthElement = screen.getByText(/avril/); // Sélectionne l'élément du mois par son texte.
    const labelElement = screen.getByText(/test label/); // Sélectionne l'élément du label par son texte.
    expect(titleElement).toBeInTheDocument(); // Vérifie si l'élément de titre est présent dans le DOM.
    expect(labelElement).toBeInTheDocument(); // Vérifie si l'élément du label est présent dans le DOM.
    expect(monthElement).toBeInTheDocument(); // Vérifie si l'élément du mois est présent dans le DOM.
  });

  describe("avec la prop small", () => {
    it("un modificateur small est ajouté", () => {
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          small // La prop small est true, ce qui devrait ajouter la classe CSS EventCard--small.
        />
      );
      const cardElement = screen.getByTestId("card-testid"); // Sélectionne l'élément de carte par son attribut de test.
      expect(cardElement.className.includes("EventCard--small")).toEqual(true); // Vérifie si la classe CSS EventCard--small a été ajoutée à l'élément de carte.
    });
  });
});
