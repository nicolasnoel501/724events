import { render, screen } from "@testing-library/react"; // Import des utilitaires de test
import { DataProvider, api, useData } from "./index"; // Import du DataProvider, de l'API et du hook useData

describe("When a data context is created", () => {
  it("a call is executed on the events.json file", async () => {
    // Mock de la fonction loadData de l'API pour renvoyer une valeur
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });

    // Composant de test qui utilise le contexte de données
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };

    // Rendu du composant avec le DataProvider
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    // Vérification que le texte "ok" est affiché
    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });

  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      // Redirection des erreurs vers la console
      window.console.error = jest.fn();

      // Mock de la fonction loadData de l'API pour renvoyer une erreur
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      // Composant de test qui utilise le contexte de données
      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };

      // Rendu du composant avec le DataProvider
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      // Vérification que le texte d'erreur est affiché
      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });

  it("api.loadData", () => {
    // Redirection des erreurs vers la console
    window.console.error = jest.fn();

    // Mock de la fonction fetch pour renvoyer une valeur
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );

    // Composant de test qui utilise le contexte de données
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };

    // Rendu du composant avec le DataProvider
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
});
