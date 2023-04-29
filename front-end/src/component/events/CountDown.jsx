import React, { useState } from "react";
import data 

function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date(); // + sp tranfer date to timeshap
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  return <div>

  </div>;
};

export default CountDown;
