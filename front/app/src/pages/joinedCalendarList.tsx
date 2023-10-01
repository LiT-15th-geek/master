import React from 'react'
import {CalendarListHeader} from "@/components/calendarList/CalendarListHeader";
import {CalendarListBody} from "@/components/calendarList/CalendarListBody";

const JoinedCalendarList = () => {
    return (
        <div>
            <CalendarListHeader title={"参加しているカレンダー"}/>
            <CalendarListBody/>
            <CalendarListBody/>
            <CalendarListBody/>
        </div>
    )
}
export default JoinedCalendarList
