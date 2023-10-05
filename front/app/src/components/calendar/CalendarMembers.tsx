import React from 'react'
import {CalendarEventData} from "@/types/calendarResponse";
import styles from "@/styles/Calendar.module.css";
type Props = {
    memberName: String;
}


export const CalendarMembers = (props: Props) => {
    const { memberName } = props;

    return (
        <div className={styles.memberList}>
            <p>{memberName}</p>
        </div>
    )
}
