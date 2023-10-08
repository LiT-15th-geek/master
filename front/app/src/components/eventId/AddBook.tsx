import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "@/styles/EventCreate.module.css";

import Image from "next/image";

type Props = {
  hours?: number[];
};
const times = ["0:00", "6:00", "12:00", "18:00", "24:00"];

export const AddBook = (props: Props) => {
  const { hours } = props;
  const sortHours = hours?.sort((a, b) => a - b);

  const [startCurrent, setStartCurrent] = useState(
    sortHours ? sortHours[0] * 60 : 0
  );

  const [endCurrent, setEndCurrent] = useState(
    sortHours ? sortHours[sortHours.length - 1] * 60 : 0
  );

  const [requireTime, setRequireTime] = useState(hours);

  const handleRequireTime = () => {
    const requireTime = [];
    console.log(startCurrent, endCurrent);

    for (let i = (startCurrent + 60) / 60; i <= endCurrent / 60; i += 1) {
      requireTime.push(i);
    }
    setRequireTime(requireTime);
  };

  useEffect(() => {
    handleRequireTime();
    console.log(requireTime);
  }, [startCurrent, endCurrent]);

  const rangeToTime = (range: number) => {
    const hour = Math.floor(range / 60);
    const minute = range % 60 < 10 ? `0${range % 60}` : range % 60;

    return `${hour}:${minute}`;
  };

  const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event?.target.value) < endCurrent) {
      setStartCurrent(Number(event?.target.value));
    }
  };

  const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event?.target.value) > startCurrent) {
      setEndCurrent(Number(event?.target.value));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "30px 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="range"
          min={0}
          max={24 * 60}
          value={startCurrent}
          step="60"
          onChange={handleStartChange}
          className={styles.customVerticalSlider}
          id={styles.left}
          style={{
            position: "absolute",
            right: "60px",
            zIndex: 2,
          }}
        />
        {/* bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {[...Array(25)].map((_, index) => (
            <div key={index + 1} style={{ display: "flex" }}>
              <p
                style={{
                  minWidth: "50px",
                  height: "12px",
                  position: "relative",
                  bottom: "10px",
                  right: "50px",
                  textAlign: "center",
                }}
              >
                {index % 6 === 0 && times[index / 6]}
              </p>

              <div
                style={{
                  width: "30px",
                  height: "12px",
                  backgroundColor: requireTime?.includes(index + 1)
                    ? "#E68147"
                    : "#f9f9f9",
                  borderLeft: index !== 24 ? "1px solid #595959" : "none",
                  borderRight: index !== 24 ? "1px solid #595959" : "none",
                  borderTop: index === 0 ? "1px solid #595959" : "none",
                  borderBottom:
                    index === 23
                      ? "1px solid #595959"
                      : (index + 1) % 6 === 0
                      ? "1px dashed #595959"
                      : "none",
                }}
              ></div>
            </div>
          ))}
        </div>

        <input
          type="range"
          min={0}
          max={24 * 60}
          value={endCurrent}
          step="60"
          onChange={handleEndChange}
          className={styles.customVerticalSlider}
          style={{
            position: "absolute",
            left: "110px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <p style={{ width: "100px" }}>
          {rangeToTime(startCurrent)} ~ {rangeToTime(endCurrent)}
        </p>
        <p>時間帯を追加する</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          <button className={styles.selectButton}>
            <Image src="/image/ok.svg" alt="ok" width={30} height={30} />
          </button>
          <button className={styles.selectButton}>
            <Image src="/image/tryangle.svg" alt="ok" width={30} height={30} />
          </button>
        </div>
        <button
          style={{
            width: "150px",
            height: "40px",
            borderRadius: "30px",
            background: "#E68147",
            color: "#f9f9f9",
          }}
        >
          追加する
        </button>
      </div>
    </div>
  );
};
