import { useCustomRouter } from "@/hooks/useCustomRouter";
import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";
import {CalendarResponse} from "@/types/calendarResponse";
import {CalendarHead} from "@/components/calendar/CalendarHead";
import {CalendarMain} from "@/components/calendar/CalendarMain";
import {CalendarMembers} from "@/components/calendar/CalendarMembers";
import {CalendarEventBlock} from "@/components/calendar/CalendarEventBlock";
import {useFirebase} from "@/hooks/useFirebase";
import {Modal} from "@/components/common/Modal";
import {useModal} from "@/hooks/useModal";
import styles from "@/styles/Calendar.module.css";
import Image from "next/image";
import {CalendarLeave} from "@/components/calendar/CalendarLeave";


const Calendar = () => {
    const {isOpen, handleOpen, handleClose} = useModal();
    const {getUId} = useFirebase();
    const { getQueryId } = useCustomRouter();
    const checkUser = async () => {
        const user_id = await getUId();
        return user_id;
    };
    const { data, error, isLoading } = useSWR<CalendarResponse>(
    `http://localhost:3000/calendar/${getQueryId}`,
    fetcher
    );

    console.log(data);

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";


    // @ts-ignore
    const calendarTitle = data?.calendar.team_title;
    const calendarDesc = data?.calendar.description;
    const futureEvents = data?.futureEvents;
    const pastEvents = data?.pastEvents;
    const memberList = data?.members;

    return (
        <>
            {/*<div>{getQueryId}</div>*/}
            <div>
                {/*{data && <CalendarHead calendarTitle={data.title}/>}*/}
                {/*↑のが条件分岐*/}
                <CalendarHead
                    calendarTitle={ calendarTitle || "カレンダー名"}
                    calendarDescription={ calendarDesc || "デフォルトの説明"}
                    handleOpen={handleOpen}
                />
                <CalendarMain/>
                <CalendarEventBlock
                    nowEventList={ futureEvents! }
                    endEventList={ pastEvents! }
                />

            </div>
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <div className={styles.memberModal}>
                    {memberList?.map((member) => (
                        <CalendarMembers memberName={member || "メンバー"}/>
                    ))}
                </div>
            </Modal>
            {/*<Modal isOpen={isOpen} handleClose={handleClose}>*/}
            {/*    <CalendarLeave/>*/}
            {/*</Modal>*/}
        </>
    )
};




export default Calendar;
