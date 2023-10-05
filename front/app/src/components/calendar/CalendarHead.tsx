import React from 'react'
import Image from "next/image";
import styles from "@/styles/Calendar.module.css";
type Props = {
    calendarTitle: string;
    calendarDescription: string;
    handleOpen: ()=>void;
}

export const CalendarHead = (props: Props) => {
    const { calendarTitle , calendarDescription, handleOpen} = props;


    return (
        <div className={styles.header}>
            <div className={styles.toolBar}>
                <Image src={"/image/leftArrow.svg"} width={40} height={40} alt={"leftArrow"}/>
                <Image src={"/image/defaultUserIcon.svg"} width={40} height={40} alt={"userIcon"}/>
            </div>
            <div className={styles.titleBox}>
                <h1>{calendarTitle}</h1>
                <p>{calendarDescription}</p>
            </div>
            <div className={styles.menuBar}>
                <div className={styles.menuMember} onClick={handleOpen}>
                    <Image src={"/image/defaultUserLogo.svg"} width={60} height={60} alt={"defaultUserLogo"}/>
                    <p>メンバー</p>
                </div>
                <div className={styles.menuExit}>
                    <Image src={"/image/exitLogo.svg"} width={60} height={60} alt={"exitLogo"}/>
                    <p>退出</p>
                </div>
            </div>
        </div>
    )
}
