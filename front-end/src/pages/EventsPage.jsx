import React, { useEffect } from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import EventCard from "../component/events/EventCard";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <Footer />
    </>
  );
};

export default EventsPage;
