import React from "react";
import styles from "@/styles/Profile.module.css";
type Props = {
  title: string;
};

export const CalendarList = (props: Props) => {
  // const title = props.title;
  const { title } = props;
  const a = [{ test: "test" }, { test: "test" }, { test: "test" }];

  return (
    <div>
      <div className={styles.a}>{title}</div>
      <div>
        {a.map((item, index) => (
          <div key={index + 1}>カレンダー:{item.test}</div>
        ))}
      </div>
    </div>
  );
};
