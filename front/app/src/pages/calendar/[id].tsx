import { useCustomRouter } from "@/hooks/useCustomRouter";
import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";
import {CalendarResponse} from "@/types/calendarResponse";
import {CalendarHead} from "@/components/calendar/CalendarHead";
import {CalendarEvent} from "@/components/calendar/CalendarEvent";
import {CalendarMain} from "@/components/calendar/CalendarMain";
import {CalendarEventBlock} from "@/components/calendar/CalendarEventBlock";


const Calendar = () => {
  const { getQueryId } = useCustomRouter();

  const { data, error, isLoading } = useSWR<CalendarResponse>(
    "",
    fetcher
  );

  console.log(data);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

    const CALENDAR = {
        title: "カレンダー１",
        description: "詳細１",
        now_events: [
            {
                id: 1,
                title: "サービス名決め",
                decided_time: new Date(),
            },
            {
                id: 2,
                title: "本番",
                decided_time: new Date(),
            }
        ],
        end_events: [
            {
                id: 1,
                title: "キックオフ",
                decided_time: new Date(),
            },
            {
                id: 2,
                title: "テーマ決め",
                decided_time: new Date(),
            },
            {
                id: 3,
                title: "メンバー割り振り",
                decided_time: new Date(),
            },
        ],
    };

    return (
        <>
            {/*<div>{getQueryId}</div>*/}
            <div>
                {/*{data && <CalendarHead calendarTitle={data.title}/>}*/}
                {/*↑のが条件分岐*/}
                <CalendarHead
                    // calendarTitle={data?.title || "カレンダー名"}
                    // calendarDescription={data?.description || "デフォルトの説明"}
                    calendarTitle={CALENDAR.title || "カレンダー名"}
                    calendarDescription={CALENDAR.description || "デフォルトの説明"}
                />
                <CalendarMain/>
                <CalendarEventBlock
                    nowEventList={CALENDAR.now_events}
                    endEventList={CALENDAR.end_events}
                />

            </div>
        </>
  )
}

export default Calendar;
