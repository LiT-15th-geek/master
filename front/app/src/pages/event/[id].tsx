import React from "react";
import Image from "next/image";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { Calendar } from "@/components/common/Calendar";
import { SubTitle } from "@/components/eventId/SubTitle";
import { BookList } from "@/components/eventId/BookList";
import { getDates, getDiffHour, mergeObjectsByDate } from "@/utils/date";

type DiffHour = {
  date: string;
  hours: number[];
};

const Event = () => {
  const { routerBack, getQueryId } = useCustomRouter();
  const data = {
    id: getQueryId,
    event_title: "勉強会",
    description: "勉強会です",
    term_start_day: "2021-11-10",
    term_end_day: "2021-11-20",
    location: "東京都",
    requireTime: "2",
    nickname: "たろう",
  };

  const books: GetBookResponse[] = [
    {
      id: 1,
      event_id: 1,
      start_time: "2021-11-10 10:00:00",
      end_time: "2021-11-10 11:00:00",
      vague: false,
      alive: true,
      bookedUser_id: 1,
      point: 1,
    },
    {
      id: 2,
      event_id: 1,
      start_time: "2021-11-10 11:00:00",
      end_time: "2021-11-10 12:00:00",
      vague: false,
      alive: true,
      bookedUser_id: 1,
      point: 1,
    },
    {
      id: 2,
      event_id: 1,
      start_time: "2021-11-11 11:00:00",
      end_time: "2021-11-11 12:00:00",
      vague: false,
      alive: true,
      bookedUser_id: 1,
      point: 1,
    },
  ];

  const {
    event_title,
    description,
    requireTime,
    term_start_day,
    term_end_day,
    location,
  } = data;

  const dateArray = getDates(term_start_day, term_end_day);
  const diffHours: DiffHour[] = [];
  books.map((book) => {
    const { start_time, end_time } = book;
    const diffHour = getDiffHour(start_time, end_time);
    diffHours.push(...diffHour);
  });
  for (let i = 0; i < diffHours.length; i++) {
    diffHours[i].hours;
  }

  const mergeDiffHours = mergeObjectsByDate(diffHours);
  console.log(mergeDiffHours);

  return (
    <div>
      <Image
        src="/image/leftArrow.svg"
        width={30}
        height={30}
        alt="back_icon"
        onClick={routerBack}
      />
      <div>
        <h2>{event_title}</h2>
        <p>{description}</p>
        <Calendar
          books={[
            {
              day: 1,
              month: 9,
              year: 2023,
              event: { id: 1, title: "test4333" },
            },
            { day: 3, month: 9, year: 2022, event: { id: 1, title: "test" } },
            {
              day: 5,
              month: 8,
              year: 2023,
              event: { id: 1, title: "test4333" },
            },
            { day: 6, opacity: "50", month: 9, year: 2023 },
            { day: 9, opacity: "aa", month: 9, year: 2023 },
          ]}
        />
      </div>
      <div>
        <h3>イベント詳細</h3>
        <div>
          <SubTitle title="予定入力期間" src="/image/time.svg">
            <p>所要時間{requireTime}時間</p>
          </SubTitle>
          <div>
            <div>
              <p>開始日</p>
              <p>{term_start_day}</p>
            </div>
            <p>-</p>
            <div>
              <p>終了日</p>
              <p>{term_end_day}</p>
            </div>
          </div>
          <SubTitle title="開催場所" src="/image/location.svg">
            <p>{location}</p>
          </SubTitle>
          <h3>自分の予定</h3>
          <BookList>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {dateArray.map((date, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {/* 日付 */}
                  <p style={{ fontSize: "0.7rem" }}>
                    {date.toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  {/* 時間コマ */}
                  <div style={{ display: "flex", width: "100%" }}>
                    {[...Array(25)].map((_, i) => (
                      <div
                        key={i}
                        id={String(i)}
                        style={{
                          width: "4.2%",
                          height: "40px",

                          borderLeft: i % 6 === 0 ? "1px dashed #aaa" : "none",
                          background: mergeDiffHours.find(
                            (item) =>
                              date.toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                              }) === item.date &&
                              item.hours.find((hour) => hour === i + 1)
                          )
                            ? "#E68147"
                            : "none",
                        }}
                      ></div>
                    ))}
                  </div>
                  <Image
                    src={"/image/edit.svg"}
                    width={20}
                    height={20}
                    alt="edit"
                  />
                </div>
              ))}
            </div>
          </BookList>
          <h3>他のメンバーの予定</h3>
          {}
          <div>
            <div>
              <h3>質問への回答</h3>
              <div>
                <p>回答する</p>
                <Image
                  src={"nextmonth.svg"}
                  alt="回答する"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            {<div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
