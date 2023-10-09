import { useCustomRouter } from "@/hooks/useCustomRouter";
import { fetcher } from "@/utils/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
import { CalendarResponse } from "@/types/calendarResponse";
import { CalendarHead } from "@/components/calendar/CalendarHead";
import { CalendarMain } from "@/components/calendar/CalendarMain";
import { CalendarMembers } from "@/components/calendar/CalendarMembers";
import { CalendarEventBlock } from "@/components/calendar/CalendarEventBlock";
import { useFirebase } from "@/hooks/useFirebase";
import { Modal } from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import styles from "@/styles/Calendar.module.css";
// import { Calendar } from "@/components/common/Calendar";
import Image from "next/image";
import { CalendarLeave } from "@/components/calendar/CalendarLeave";
import { Calendar } from "@/components/common/Calendar";

const CalendarId = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const { getUId } = useFirebase();
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
  const memberList = data?.users;

  return (
    <>
      {/*<div>{getQueryId}</div>*/}
      <div>
        {/*{data && <CalendarHead calendarTitle={data.title}/>}*/}
        {/*↑のが条件分岐*/}
        <CalendarHead
          calendarTitle={calendarTitle || "カレンダー名"}
          calendarDescription={calendarDesc || "デフォルトの説明"}
          handleOpen={handleOpen}
        />
        <Calendar
          books={[
            {
              day: 3,
              month: 9,
              year: 2023,
              event: { id: 1, title: "テスト勉強" },
            },
            {
              day: 2,
              month: 9,
              year: 2023,
              event: { id: 1, title: "テスト勉強" },
            },
            { day: 11, opacity: "44", month: 9, year: 2023 },
            { day: 12, opacity: "44", month: 9, year: 2023 },
            { day: 13, opacity: "88", month: 9, year: 2023 },
            { day: 14, opacity: "dd", month: 9, year: 2023 },
          ]}
        />
        <CalendarEventBlock
          nowEventList={futureEvents!}
          endEventList={pastEvents!}
        />
      </div>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className={styles.memberModal}>
          {memberList?.map((member, nickname) => (
            <CalendarMembers
              key={nickname}
              // @ts-ignore
              memberName={member["nickname"] || "メンバー"}
            />
          ))}
        </div>
      </Modal>
      {/*<Modal isOpen={isOpen} handleClose={handleClose}>*/}
      {/*    <CalendarLeave/>*/}
      {/*</Modal>*/}
    </>
  );
};

export default CalendarId;
