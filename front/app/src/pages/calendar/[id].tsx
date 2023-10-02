import { useCustomRouter } from "@/hooks/useCustomRouter";
import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";
import {CalendarResponse} from "@/types/calendarResponse";
import {CalendarHead} from "@/components/calendar/CalendarHead";
import {CalendarEvent} from "@/components/calendar/CalendarEvent";
import {CalendarMain} from "@/components/calendar/CalendarMain";


const Calendar = () => {
  const { getQueryId } = useCustomRouter();

  const { data, error, isLoading } = useSWR<CalendarResponse>(
    "",
    fetcher
  );

  console.log(data);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

    return (
        <>
            {/*<div>{getQueryId}</div>*/}
            <div>
                {/*{data && <CalendarHead calendarTitle={data.title}/>}*/}
                {/*↑のが条件分岐*/}
                <CalendarHead
                    calendarTitle={data?.title || "カレンダー名"}
                    calendarDescription={data?.description || "デフォルトの説明"}
                />
                <CalendarMain/>
                {data?.now_events.map((event) => (
                    <CalendarEvent key={event.id} eventTitle={event.title || "イベント名"}/>
                ))}
            </div>
        </>
  )
}

export default Calendar;
