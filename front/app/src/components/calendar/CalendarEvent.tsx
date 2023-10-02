import React from 'react'
import styles from "@/styles/Calendar.module.css";
export const CalendarEvent = () => {
    return (
        <div className={styles.events}>
            <div className={styles.mainEvents}>
                <h2></h2>
            </div>
            <div className={styles.doneEvents}>

            </div>
        </div>
    )
}
