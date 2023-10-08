import React from "react";

type Props = {
  children?: React.ReactNode;
};
const times = ["0:00", "6:00", "12:00", "18:00", "24:00"];
export const BookList = (props: Props) => {
  const { children } = props;
  return (
    <div style={{ width: "90vw", display: "flex", flexDirection: "column",margin:"30px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "83%",
          /* gap: 9vw; */
          position: "relative",
          left: "31px",
          margin:" 0  0 5px 0"
        }}
      >
        {times.map((time, index) => (
          <p key={index + 1} style={{ fontSize: "0.7rem" }}>
            {time}
          </p>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};
