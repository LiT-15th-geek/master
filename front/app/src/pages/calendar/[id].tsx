import { useCustomRouter } from "@/hooks/useCustomRouter";
import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";
import {CalendarResponse} from "@/types/calendarResponse";
import {CalendarHead} from "@/components/calendar/CalendarHead";
import {CalendarMain} from "@/components/calendar/CalendarMain";
import {CalendarEventBlock} from "@/components/calendar/CalendarEventBlock";
import {useFirebase} from "@/hooks/useFirebase";


const Calendar = () => {
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
    // console.log(calendarTitle)

    const CALENDAR = {
        title: "インターン",
        description: "〇〇のインターン生を集めたカレンダーです。月に1回から2回ほどイベントを開催しているため是非参加してみてください。",
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
                    calendarTitle={ calendarTitle || "カレンダー名"}
                    calendarDescription={ calendarDesc || "デフォルトの説明"}
                />
                <CalendarMain/>
                <CalendarEventBlock
                    nowEventList={ futureEvents }
                    endEventList={ pastEvents }
                />

            </div>
        </>
    )
}

export default Calendar;
