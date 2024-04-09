import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const sortedEvents = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) - new Date(evtB.date)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < sortedEvents.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [sortedEvents, index]); // Ajout de 'index' comme dépendance

  const handleClick = (idx) => {
    setIndex(idx);
  };

  return (
    <div className="SlideCardList">
      {sortedEvents?.map((event, idx) => (
        <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvents?.map((event, idx) => (
            <input
              key={event.id}
              type="radio"
              readOnly
              name="radio-button"
              checked={index === idx}
              onClick={() => handleClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
