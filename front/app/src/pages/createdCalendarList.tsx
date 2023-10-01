import React from 'react'
import {CalendarListHeader} from "@/components/calendarList/CalendarListHeader";
import {CalendarListBody} from "@/components/calendarList/CalendarListBody";

const CreatedCalendarList = () => {


    return (
        <div>
            <CalendarListHeader title={"主催しているカレンダー"}/>
            <CalendarListBody/>
            <CalendarListBody/>
            <CalendarListBody/>
        </div>
    )
}
export default CreatedCalendarList
