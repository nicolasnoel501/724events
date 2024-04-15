import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date"; // Importe la fonction getMonth depuis le fichier Date.js dans le dossier helpers.
import "./style.scss"; // Importe les styles CSS spécifiques à ce composant.

// Définition du composant EventCard
const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(), // Par défaut, la date est la date actuelle.
  title,
  label,
  small = false, // Par défaut, small est faux.
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`} // Ajoute la classe "EventCard--small" si small est true.
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{getMonth(date)}</div> {/* Affiche le mois de la date */}
    </div>
  </div>
);

// Définit les types des props attendues par le composant EventCard
EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired, // L'URL de l'image est requise.
  imageAlt: PropTypes.string, // L'attribut alt de l'image.
  date: PropTypes.instanceOf(Date).isRequired, // La date doit être une instance de Date et est requise.
  title: PropTypes.string.isRequired, // Le titre est requis.
  small: PropTypes.bool, // Un booléen indiquant si la carte doit être petite ou non.
  label: PropTypes.string.isRequired, // Le label de l'événement est requis.
};

// Définit les valeurs par défaut des props du composant EventCard
EventCard.defaultProps = {
  imageAlt: "image", // Par défaut, l'attribut alt de l'image est "image".
  small: false, // Par défaut, small est faux.
};

export default EventCard; // Exporte le composant EventCard pour qu'il puisse être utilisé ailleurs.
