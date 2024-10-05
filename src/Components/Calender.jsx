import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './Calender.scss'

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const arrMonth = (year) => ({
  January: 31,
  February: isLeapYear(year) ? 29 : 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
});

const arrDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const LeftBlock = ({ date, handleToUpdate, handleToUpdateSubmit }) => {
  const [toggle, setToggle] = useState(true);
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");

  const handleClick = () => {
    handleToUpdate(!toggle);
    setToggle(!toggle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleToUpdateSubmit(time, event);
  };

  return (
    <div className="flip-container-left">
      <div className={`flipper ${toggle ? "" : "toggle"}`}>
        <div className="front front-left">
          <h2>Today</h2>
          <h1>{date.getDate()}</h1>
          <h2>{arrDays[date.getDay()]}</h2>
          <button className="btn btn-flip" onClick={handleClick}>
            +
          </button>
        </div>
        <div className="back back-left">
          <form onSubmit={handleSubmit}>
            <div className="container-event">
              <input
                type="text"
                className="input-time"
                maxLength="5"
                placeholder="12:00"
                onChange={(e) => setTime(e.target.value)}
              />
              <button className="btn btn-submit">→</button>
            </div>
            <input
              type="text"
              className="input-event"
              placeholder="Event"
              onChange={(e) => setEvent(e.target.value)}
            />
          </form>
          <button className="btn btn-flip" onClick={handleClick}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

const RightBlock = ({ date, toggle, handleToUpdateDate, eventList }) => {
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedDay, setSelectedDay] = useState(date.getDate());


  const daysInMonth = arrMonth(selectedYear);

  console.log(daysInMonth);
  // Get days for current year
  const daysCount = daysInMonth[Object.keys(daysInMonth)[selectedMonth]];
  const firstDay = new Date(`${selectedYear}-${selectedMonth + 1}-01`).getDay();

  const updateMonth = (event) => {
    const newMonth = Object.keys(arrMonth((selectedYear))).indexOf(event.target.value);
    handleToUpdateDate(`${selectedDay}/${newMonth}/${selectedYear}`);
    setSelectedMonth(newMonth);
  };



  const prevMonth = () => {
    console.log(selectedMonth);
    if (selectedMonth - 1 < 0) {
      handleToUpdateDate(`${selectedDay}/11/${selectedYear - 1}`);
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      handleToUpdateDate(`${selectedDay}/${selectedMonth - 1}/${selectedYear}`);
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth + 1 > 11) {
      handleToUpdateDate(`${selectedDay}/0/${selectedYear + 1}`);
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      handleToUpdateDate(`${selectedDay}/${selectedMonth + 1}/${selectedYear}`);
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const updateYear = (event) => {
    const newYear = parseInt(event.target.value);
    if (event.target.value.length === 4) {
      handleToUpdateDate(`${selectedDay}/${selectedMonth}/${newYear}`);
      setSelectedYear(newYear);
    } else if (event.target.value.length > 0) {
      setSelectedYear(newYear);
    }
  };

  const handleClick = (event) => {
    const newDay = parseInt(event.currentTarget.dataset.id);
    handleToUpdateDate(`${newDay}/${selectedMonth}/${selectedYear}`);
    setSelectedDay(newDay);
  };

  const getDayBlocks = () => {
    const arrNo = [];
    for (let n = 0; n < firstDay; n++) {
      arrNo.push(<div key={`empty-${n}`} className="day-block" />);
    }
    for (let i = 1; i <= daysCount; i++) {
      arrNo.push(
        <div
          key={i}
          data-id={i}
          onClick={handleClick}
          className={`day-block ${i === selectedDay ? "active" : ""}`}
        >
          <div className="inner">{i}</div>
        </div>
      );
    }
    return arrNo;
  };

  const getEvents = () => {
    return eventList
      .filter((event) => {
        const dateArr = event[0].split("/");
        return (
          parseInt(dateArr[0]) === selectedDay &&
          parseInt(dateArr[1]) === selectedMonth &&
          parseInt(dateArr[2]) === selectedYear
        );
      })
      .map((event, index) => (
        <div key={index} className="event">
          <p className="event-time">{event[1]}</p>
          <p className="event-name">{event[2]}</p>
        </div>
      ));
  };

  // const getMonthOptions = () => {
  //   const monthObj = arrMonth(selectedYear)

  //   return Object.keys(monthObj).map((month) => (
  //     <option
  //       key={month}
  //       className="option-month"
  //       selected={month === Object.keys(arrMonth)[selectedMonth] ? "selected" : ""}
  //     >
  //       {month}
  //     </option>
  //   ));
  // }

  const getMonthOptions = () => {
    return Object.keys(daysInMonth).map((month, index) => (
      <option key={index} value={month} selected={index === selectedMonth}>
        {month}
      </option>
    ));
  };


  return (
    <div className="flip-container-right">
      <div className={`flipper ${toggle ? "" : "toggle"}`}>
        <div className="front front-right">
          <div className="container-date-picker">
            <button className="btn btn-prev" onClick={prevMonth}>
              &lt;
            </button>
            <select className="select-month" onChange={updateMonth}>
              {getMonthOptions()}
            </select>
            <input
              type="text"
              className="input-year"
              onChange={updateYear}
              value={selectedYear}
              maxLength="4"
            />
            <button className="btn btn-next" onClick={nextMonth}>
              &gt;
            </button>
          </div>
          <div className="container-day">
            {arrDays.map((day) => (
              <div key={day} className="weekday">
                {day.substring(0, 3)}
              </div>
            ))}
            {getDayBlocks()}
          </div>
        </div>
        <div className="back back-right">
          <div className="container-events">{getEvents()}</div>
        </div>
      </div>
    </div>
  );
};

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  );

  const handleToUpdate = (isToggle) => {
    setToggle(isToggle);
  };

  const handleToUpdateSubmit = (time, event) => {
    setEventList((prevList) => [...prevList, [selectedDate, time, event]]);
  };

  const handleToUpdateDate = (date) => {
    setSelectedDate(date);
  };

  // useEffect(() => {
  //   const timerID = setInterval(() => {
  //     setDate(new Date());
  //   }, 1000);

  //   return () => clearInterval(timerID);
  // }, []);

  return (
    <div className="outer">
      <div className="wrapper">
        <LeftBlock
          date={date}
          handleToUpdate={handleToUpdate}
          handleToUpdateSubmit={handleToUpdateSubmit}
        />
        <RightBlock
          date={date}
          toggle={toggle}
          handleToUpdateDate={handleToUpdateDate}
          eventList={eventList}
        />
      </div>
    </div>
  );
};


