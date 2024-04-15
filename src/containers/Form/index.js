import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field"; // Import du composant Field
import Select from "../../components/Select"; // Import du composant Select
import Button, { BUTTON_TYPES } from "../../components/Button"; // Import du composant Button

// Fonction de simulation d'une API de contact
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 900); // Retourne une promesse résolue après 900ms (simulant une requête asynchrone)
  });

// Composant Form représentant un formulaire de contact
const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false); // État pour suivre l'état d'envoi du formulaire

  // Fonction de gestion de l'envoi du formulaire
  const sendContact = useCallback(async (evt) => {
    evt.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    setSending(true); // Définit l'état d'envoi sur true pour indiquer que l'envoi est en cours
    try {
      await mockContactApi(); // Appel à la fonction de simulation de l'API de contact
      setSending(false); // Réinitialisation de l'état d'envoi une fois la requête terminée
      onSuccess(); // Exécution de la fonction onSuccess fournie en tant que prop
    } catch (err) {
      setSending(false); // Réinitialisation de l'état d'envoi en cas d'erreur
      onError(err); // Exécution de la fonction onError fournie en tant que prop avec l'erreur comme argument
    }
  }, [onSuccess, onError]); // Dépendances de useCallback

  // Rendu du formulaire de contact
  return (
    <form onSubmit={sendContact}> {/* Gestion de l'événement de soumission du formulaire */}
      <div className="row">
        <div className="col">
          {/* Champ de saisie pour le nom */}
          <Field placeholder="" label="Nom" />
          {/* Champ de saisie pour le prénom */}
          <Field placeholder="" label="Prénom" />
          {/* Sélecteur pour le type de contact (Personnel / Entreprise) */}
          <Select
            selection={["Personel", "Entreprise"]} // Options du sélecteur
            onChange={() => null} // Gestionnaire de changement de sélection
            label="Personel / Entreprise" // Étiquette du sélecteur
            type="large" // Type de sélecteur (large)
            titleEmpty // Indique si le titre est vide (true)
          />
          {/* Champ de saisie pour l'email */}
          <Field placeholder="" label="Email" />
          {/* Bouton de soumission du formulaire */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"} {/* Texte du bouton basé sur l'état d'envoi */}
          </Button>
        </div>
        <div className="col">
          {/* Champ de saisie pour le message (textarea) */}
          <Field
            placeholder="message" // Placeholder du champ de saisie
            label="Message" // Étiquette du champ de saisie
            type={FIELD_TYPES.TEXTAREA} // Type de champ de saisie (textarea)
          />
        </div>
      </div>
    </form>
  );
};

// Définition des types de props attendus
Form.propTypes = {
  onError: PropTypes.func, // Fonction de gestion d'erreur
  onSuccess: PropTypes.func, // Fonction de gestion de succès
};

// Valeurs par défaut des props
Form.defaultProps = {
  onError: () => null, // Fonction vide par défaut pour la gestion d'erreur
  onSuccess: () => null, // Fonction vide par défaut pour la gestion de succès
};

export default Form; // Export du composant Form
