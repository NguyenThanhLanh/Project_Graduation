import React, { useEffect } from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import EventCard from "../component/events/EventCard";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { eventData } = useSelector((state) => state.eventData);
  const listEvent = eventData ? [...eventData] : [];
  return (
    <>
      <Header activeHeading={4} />
      <div className="w-full grid min-h-[80px]">
        {listEvent?.length !== 0 &&
          listEvent.map((item) => <EventCard active={true} data={item} />)}
        <h4>{listEvent?.length === 0 && "No Events have!"}</h4>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
