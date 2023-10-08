import React from 'react'
import styles from "@/styles/Calendar.module.css";
import Image from "next/image";
type Props = {
    eventTitle: string;
    imgUrl: string;
}

export const CalendarEvent = (props: Props) => {
    const { eventTitle } = props;
    const { imgUrl } = props;

    return (
        <div className={styles.eachEvents}>
            <h3>{eventTitle}</h3>
            <Image src={imgUrl} width={24} height={24} alt={"editLogo"}/>
            <div className={styles.eachEventDetails}>

            </div>
        </div>
    )
}
