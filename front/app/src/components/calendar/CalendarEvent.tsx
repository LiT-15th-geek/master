import React from 'react'
import styles from "@/styles/Calendar.module.css";
import Image from "next/image";
type Props = {
    eventTitle: string;
}

export const CalendarEvent = (props: Props) => {
    const { eventTitle } = props;

    return (
        <div className={styles.events}>
            <div className={styles.mainEvents}>
                <h2>イベント一覧</h2>
                <div className={styles.eachEvents}>
                    <h3>{eventTitle}</h3>
                    <div className={styles.eventDetails}>
                        <h3>未入力</h3>
                        <Image src={"/image/editLogo.svg"} width={24} height={24} alt={"editLogo"}/>
                    </div>
                </div>
            </div>
            <div className={styles.doneEvents}>
                <h2>終了済みイベント一覧</h2>
                <div className={styles.eachEvents}>
                    <h3>{eventTitle}</h3>
                    <div className={styles.eventDetails}>
                        <h3>未入力</h3>
                        <Image src={"/image/threeDots.svg"} width={30} height={30} alt={"三点リーダー"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
