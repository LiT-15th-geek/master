import React from 'react'
import Image from "next/image";
import {inspect} from "util";
import styles from "@/styles/CalendarList.module.css";
import Link from "next/link";
type Props = {
    title: string;
}

export const CalendarListHeader = (props: Props) => {
    const { title } = props;

    return (
        <>
            <div className={styles.header}>
                <div className={styles.titleBar}>
                    <Image src={"/image/leftArrow.svg"} width={40} height={40} alt={"leftArrow"}/>
                    <h2 className={styles.title}>{title}</h2>
                    <Link className={styles.userIcon} href={"/profile"}><Image src={"/image/defaultUserIcon.svg"} width={40} height={40} alt={"userIcon"}/></Link>
                </div>
                <input className={styles.searchBar} type={"textbox"} id={"calendarSearch"} name={"calendarListSearchBar"} placeholder={"検索バー"}></input>
            </div>
        </>
    )
}
