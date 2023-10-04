import React from 'react'
import styles from "@/styles/Calendar.module.css";
import Image from "next/image";
type Props = {
    eventTitle: string;
}

export const CalendarEvent = (props: Props) => {
    const { eventTitle } = props;

    return (
        <div className={styles.eachEvents}>
            <h3>{eventTitle}</h3>
            <div className={styles.eachEventDetails}>
                <p>入力済み：</p>
                <p>未入力：</p>
                <Image src={"/image/editLogo.svg"} width={24} height={24} alt={"editLogo"}/>
            </div>
        </div>
    )
}
