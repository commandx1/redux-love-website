import React, { useState, useEffect, Fragment } from "react";
import "./footer.scss";

const Footer = () => {
  const [counter, setCounter] = useState();

  function countUpFromTime(countFrom, id) {
    countFrom = new Date(countFrom).getTime();
    var now = new Date(),
      countFrom = new Date(countFrom),
      timeDifference = now - countFrom;

    var secondsInADay = 60 * 60 * 1000 * 24,
      secondsInAHour = 60 * 60 * 1000;

    let days = Math.floor((timeDifference / secondsInADay) * 1);
    let hours = Math.floor(
      ((timeDifference % secondsInADay) / secondsInAHour) * 1
    );
    let mins = Math.floor(
      (((timeDifference % secondsInADay) % secondsInAHour) / (60 * 1000)) * 1
    );
    let secs = Math.floor(
      ((((timeDifference % secondsInADay) % secondsInAHour) % (60 * 1000)) /
        1000) *
        1
    );

    setCounter({ gun: days, saat: hours, dakika: mins, saniyedir: secs }); //setCounter

    clearTimeout(countUpFromTime.interval);
    countUpFromTime.interval = setTimeout(function () {
      countUpFromTime(countFrom, id);
    }, 1000);
  }

  useEffect(() => {
    countUpFromTime("Jun 18, 2019 22:00:00", "countup1");
  }, [])


  return (
    <footer>
      <div>
        {counter && Object.keys(counter).map(key => 
          <Fragment key={key}>
            <span> {counter[key]}</span>
            <span> {key}</span>
          </Fragment>
          )}
          {' '}benimsin...
      </div>
    </footer>
  );
};

export default Footer;