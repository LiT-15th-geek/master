import React from 'react'
import {CalendarEventData} from "@/types/calendarResponse";
import styles from "@/styles/Calendar.module.css";
import Image from "next/image";
type Props = {
    memberName: String;
}


export const CalendarMembers = (props: Props) => {
    const { memberName } = props;

    return (
        <div className={styles.memberList}>
            <Image src={"/image/user.svg"} width={24} height={24} alt={"defaultUserLogo"}/>
            <p>{memberName}</p>
        </div>
    )
}
