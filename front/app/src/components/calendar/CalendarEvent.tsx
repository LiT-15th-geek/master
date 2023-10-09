import React from 'react'
import styles from "@/styles/Calendar.module.css";
import Image from "next/image";
import {useCustomRouter} from "@/hooks/useCustomRouter";
type Props = {
    eventTitle: string;
    imgUrl: string;
}

export const CalendarEvent = (props: Props) => {
    const { eventTitle } = props;
    const { imgUrl } = props;
    const { routerPush } = useCustomRouter();

    return (
        <div className={styles.eachEvents}>
            <h3>{eventTitle}</h3>
            <Image src={imgUrl} width={24} height={24} alt={"editLogo"} onClick={()=>{routerPush("/event/1")}}/>
        </div>
    )
}
