import React, { useEffect, useState } from "react";
import Image from "next/image";

const getCountDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
const DATE = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type Event = {
  id: number;
  title: string;
};
type Props = {
  books: { day: number; opacity?: string; event?: Event }[];
};

export const Calendar = (props: Props) => {
  const { books } = props;
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [dayCount, setDayCount] = useState(getCountDay(year, month));
  const handleIncrementMonth = () => {
    if (month === 12) {
      setDayCount(getCountDay(year + 1, 1));
      setYear((prevState) => prevState + 1);
      setMonth(1);
      return;
    }
    setDayCount(getCountDay(year, month + 1));
    setMonth((prevState) => prevState + 1);
  };
  const handleDecrementMonth = () => {
    if (month === 1) {
      setDayCount(getCountDay(year - 1, 12));
      setYear((prevState) => prevState - 1);
      setMonth(12);
      return;
    }
    setDayCount(getCountDay(year, month - 1));
    setMonth((prevState) => prevState - 1);
  };
  const filterColors = books.filter((book) => book.opacity);
  const handleFilterColor = (index: number) => {
    return filterColors.find((book) => book.day == index);
  };

  return (
    <div style={{ minWidth: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 3vw",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          onClick={handleDecrementMonth}
        >
          <Image
            src={"/image/lastmonth.svg"}
            width={20}
            height={20}
            alt="left"
          />
          <p>前の月</p>
        </div>
        <p>
          {year} / {month}
        </p>
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          onClick={handleIncrementMonth}
        >
          <p>次の月</p>
          <Image
            src={"/image/nextmonth.svg"}
            width={20}
            height={20}
            alt="left"
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", padding: "3vw" }}>
        {DATE.map((date, index) => (
          <div
            key={index + 1}
            style={{
              width: "13.42vw",
              display: "flex",
              borderRight: (index + 1) % 7 !== 0 ? "1px solid #525252" : "none",
            }}
          >
            <p
              style={{
                margin: "auto",
                fontSize: "11px",
                color:
                  index == 0 ? "#CE5879" : index == 6 ? "#63A0CF" : "#525252",
              }}
            >
              {date}
            </p>
          </div>
        ))}
        {[...Array(42)].map((_, index) => (
          <div
            key={index + 1}
            style={{
              background: `#E68147${
                handleFilterColor(index + 1)
                  ? handleFilterColor(index + 1)?.opacity
                  : "00"
              }`,
              width: "13.42vw",
              display: "flex",
              height: "14.28vw",
              borderTop: "1px solid #525252",
              borderRight: (index + 1) % 7 !== 0 ? "1px solid #525252" : "none",
            }}
          >
            <button
              style={{
                border: "none",
                height: "fit-content",
                margin: "3px 0 0 1.5px",
                color: "#525252",
                textAlign: "left",
                width: "100%",
                background: "transparent",
              }}
            >
              {dayCount > index && index + 1}
              {books.map(
                (book) =>
                  book.day == index + 1 &&
                  book.event && (
                    <p
                      key={book.event.id}
                      style={{
                        background: "#E68147",
                        color: "#f9f9f9",
                        borderRadius: "5px",
                        padding: "0 5px",
                        maxWidth: "96%",
                        minWidth: "96%",
                        textAlign: "center",
                        margin: "4px 0 0 0px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {book.event.title}
                    </p>
                  )
              )}
            </button>
          </div>
        ))}
        <div style={{ width: "100%" }}></div>
      </div>
    </div>
  );
};
