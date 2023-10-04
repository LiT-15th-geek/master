import React from 'react'
import {CalendarEvent} from "@/components/calendar/CalendarEvent";
import styles from "@/styles/Calendar.module.css";
type Props = {
    nowEventList: {
            id: number;
            title: string;
            decided_time: Date;
    }[];
    endEventList: {
            id: number;
            title: string;
            decided_time: Date;
        }[];
}

export const CalendarEventBlock = (props: Props) => {
    const { nowEventList } = props;
    const { endEventList } = props;

    return (
        <div className={styles.allEvents}>
            <h2>イベント一覧</h2>
            {nowEventList.map((event) => (
                <CalendarEvent key={event.id} eventTitle={event.title || "イベント名"}/>
            ))}
            <h2>終了済みのイベント一覧</h2>
            {endEventList.map((event) => (
                <CalendarEvent key={event.id} eventTitle={event.title || "イベント名"}/>
            ))}
        </div>
    )
}
