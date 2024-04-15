import { fireEvent, render, screen } from "@testing-library/react"; // Importe les fonctions de test de la bibliothèque Testing Library
import Select from "./index"; // Importe le composant Select à tester

// Définit une suite de tests pour le composant Select
describe("When a select is created", () => {
  // Test : Vérifie si une liste de choix est affichée
  it("a list of choices is displayed", () => {
    render(<Select selection={["value1", "value2"]} />);
    const selectElement = screen.getByTestId("select-testid"); // Sélectionne l'élément Select par son attribut data-testid
    const selectDefault = screen.getByText("Toutes"); // Sélectionne l'élément contenant le texte "Toutes"
    expect(selectElement).toBeInTheDocument(); // Vérifie que l'élément Select est dans le document
    expect(selectDefault).toBeInTheDocument(); // Vérifie que l'élément contenant "Toutes" est dans le document
  });

  // Test : Vérifie si un bouton d'action de réduction est affiché
  it("a collapse action button is displayed", () => {
    render(<Select selection={["value1", "value2"]} />);
    const collapseButtonElement = screen.getByTestId("collapse-button-testid"); // Sélectionne le bouton de réduction par son attribut data-testid
    expect(collapseButtonElement).toBeInTheDocument(); // Vérifie que le bouton de réduction est dans le document
  });

  // Sous-suite de tests pour le cas où il y a un libellé
  describe("with a label", () => {
    // Test : Vérifie si un libellé est affiché
    it("a label is displayed", () => {
      render(<Select label="label" selection={["value1", "value2"]} />);
      const labelDefault = screen.getByText("label"); // Sélectionne l'élément contenant le texte "label"
      expect(labelDefault).toBeInTheDocument(); // Vérifie que l'élément contenant "label" est dans le document
    });
  });

  // Sous-suite de tests pour le cas où un clic est déclenché sur le bouton de réduction
  describe("and a click is trigger on collapse button", () => {
    // Test : Vérifie si une liste de valeurs est affichée
    it("a list of values is displayed", () => {
      render(<Select selection={["value1", "value2"]} />);
      const collapseButtonElement = screen.getByTestId("collapse-button-testid"); // Sélectionne le bouton de réduction par son attribut data-testid
      fireEvent( // Déclenche un événement clic sur le bouton de réduction
        collapseButtonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      const choice1 = screen.getByText("value1"); // Sélectionne l'élément contenant le texte "value1"
      const choice2 = screen.getByText("value2"); // Sélectionne l'élément contenant le texte "value2"
      expect(choice1).toBeInTheDocument(); // Vérifie que l'élément contenant "value1" est dans le document
      expect(choice2).toBeInTheDocument(); // Vérifie que l'élément contenant "value2" est dans le document
    });

    // Sous-suite de tests pour le cas où un clic est déclenché sur un élément de choix
    describe("and a click is triggered on a choice item", () => {
      // Test : Vérifie si un callback onChange est appelé
      it("a onChange callback is called", () => {
        const onChange = jest.fn(); // Crée une fonction fictive onChange
        render(<Select selection={["value1", "value2"]} onChange={onChange} />);
        const collapseButtonElement = screen.getByTestId("collapse-button-testid"); // Sélectionne le bouton de réduction par son attribut data-testid
        fireEvent( // Déclenche un événement clic sur le bouton de réduction
          collapseButtonElement,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        const choice1 = screen.getByText("value1"); // Sélectionne l'élément contenant le texte "value1"
        fireEvent( // Déclenche un événement clic sur l'élément contenant "value1"
          choice1,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        expect(onChange.mock.calls.length).toBeGreaterThan(0); // Vérifie que la fonction fictive onChange a été appelée au moins une fois

        fireEvent( // Déclenche à nouveau un événement clic sur le bouton de réduction
          collapseButtonElement,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        const choiceAll = screen.getByText("Toutes"); // Sélectionne l'élément contenant le texte "Toutes"
        fireEvent( // Déclenche un événement clic sur l'élément contenant "Toutes"
          choiceAll,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        expect(onChange.mock.calls.length).toBeGreaterThan(1); // Vérifie que la fonction fictive onChange a été appelée au moins une fois de plus
      });
    });
  });
});
