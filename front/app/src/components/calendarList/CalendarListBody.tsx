import React from 'react'
import Image from "next/image";
import styles from "@/styles/CalendarList.module.css"

export const CalendarListBody = () => {

    return (
        <div className={styles.eachCalendar}>
            <div className={styles.calendarTitle}>
                <h3>Calendar1</h3>
                <Image src={""} width={30} height={30} alt={"privateBool"}/>
            </div>
            <div className={styles.calendarDetails}>
                {/*divの分け方これで大丈夫かまえひろに確認！*/}
                <div className={styles.userIconsLists}>
                    <Image src={"/image/defaultUserIcon.svg"} width={30} height={30} alt={"userIcon1"}/>
                    <Image src={"/image/defaultUserIcon.svg"} width={30} height={30} alt={"userIcon1"}/>
                    <Image src={"/image/defaultUserIcon.svg"} width={30} height={30} alt={"userIcon1"}/>
                    <Image src={"/image/defaultUserIcon.svg"} width={30} height={30} alt={"userIcon1"}/>
                    <Image src={"/image/defaultUserIcon.svg"} width={30} height={30} alt={"userIcon1"}/>
                    <Image src={"/image/threeDots.svg"} width={16} height={16} alt={"三点リーダー"}/>
                </div>
                <div className={styles.eachEvent}>
                    <div className={styles.eventTitle}>
                        <p>Event1</p>
                    </div>
                    <div className={styles.eventDetails}>
                        <Image src={"/image/threeDots.svg"} width={16} height={16} alt={"三点リーダー"}/>
                        <Image src={""} width={20} height={20} alt={""}/>
                    </div>
                </div>
                <div className={styles.eachEvent}>
                    <div className={styles.eventTitle}>
                        <p>Event2</p>
                    </div>
                    <div className={styles.eventDetails}>
                        <Image src={"/image/threeDots.svg"} width={16} height={16} alt={"三点リーダー"}/>
                        <Image src={""} width={20} height={20} alt={""}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
