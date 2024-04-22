import React, { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // Trie des événements du plus vieux au plus récent
  const sortedEvents = data?.focus?.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < sortedEvents.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);
  };

  useEffect(() => {
    startInterval();

    return () => clearInterval(intervalRef.current);
  }, [sortedEvents]);

  const handleClick = (idx) => {
    setIndex(idx);
    clearInterval(intervalRef.current); // Arrête l'intervalle
    startInterval(); // Relance l'intervalle après un clic
  };

  return (
    <div className="SlideCardList">
      {sortedEvents?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
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
