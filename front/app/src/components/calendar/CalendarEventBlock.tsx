import React from "react";
import { CalendarEvent } from "@/components/calendar/CalendarEvent";
import styles from "@/styles/Calendar.module.css";
import { CalendarEventData } from "@/types/calendarResponse";
type Props = {
  nowEventList: CalendarEventData[];
  endEventList: CalendarEventData[];
};

export const CalendarEventBlock = (props: Props) => {
  const { nowEventList } = props;
  const { endEventList } = props;

  return (
    <div className={styles.allEvents}>
      <div style={{margin:"0 0 30px 0 "}}>
        <h2  style={{margin:"0 0 10px 0 "}}>イベント一覧</h2>
        {nowEventList.map((event) => (
          <CalendarEvent
            key={event.id}
            eventTitle={event.event_title || "イベント名"}
            imgUrl={"/image/editLogo.svg"}
          />
        ))}
      </div>
      <div style={{margin:"0 0 30px 0 "}}>
        <h2>終了済みのイベント一覧</h2>
        {endEventList.map((event) => (
          <CalendarEvent
            key={event.id}
            eventTitle={event.event_title || "イベント名"}
            imgUrl={"/image/threeDots.svg"}
          />
        ))}
      </div>
    </div>
  );
};
