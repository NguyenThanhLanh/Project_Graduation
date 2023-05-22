import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard.jsx";
import { useSelector } from "react-redux";
import { getAllEvent } from "../../redux/actions/event";

const Events = () => {
  const { eventData } = useSelector((state) => state.eventData);
  const listEvent = eventData ? [...eventData] : [];

  console.log("eventdata:**********************************", listEvent);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Sự kiện nổi bậc</h1>
        </div>
        <div className="w-full grid">
          {listEvent?.length !== 0 && (
            <EventCard active={true} data={listEvent[0]} />
          )}
          <h4>{listEvent?.length === 0 && "No Events have!"}</h4>
        </div>
      </div>
    </div>
  );
};

export default Events;
