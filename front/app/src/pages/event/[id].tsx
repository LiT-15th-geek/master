import React, { useEffect } from "react";
import Image from "next/image";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { Calendar } from "@/components/common/Calendar";
import { SubTitle } from "@/components/eventId/SubTitle";
import { BookList } from "@/components/eventId/BookList";
import { getDates, getDiffHour, mergeObjectsByDate } from "@/utils/date";
import { FAQ } from "@/types/event";
import { Modal } from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { AddBook } from "@/components/eventId/AddBook";

type DiffHour = {
  date: string;
  hours: number[];
};

const h3 = {
  color: "#525252",
  fontFamily: "Zen Kaku Gothic New",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
};

const Event = () => {
  const { routerBack, getQueryId } = useCustomRouter();
  const data = {
    id: getQueryId,
    event_title: "勉強会",
    description: "勉強会です",
    term_start_day: "2023-9-11",
    term_end_day: "2023-9-14",
    location: "東京都",
    requireTime: "2",
    nickname: "たろう",
  };

  const BOOKS: GetBookResponse[] = [
    {
      id: 1,
      event_id: 1,
      start_time: "2023-9-12 10:00:00",
      end_time: "2023-9-12 11:00:00",
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

  const QUESTION: FAQ[] = [
    { title: "参加費1000円", id: 1, answer: "" },
    { title: "pc必須", id: 2, answer: "" },
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
  const questionModal = useModal();
  const bookModal = useModal();
  const [selectedDate, setSelectedDate] = React.useState<DiffHour>();
  const [books, setBooks] = React.useState<GetBookResponse[]>(BOOKS);
  const [questions, setQuestions] = React.useState<FAQ[]>(QUESTION);
  const handleSetBooks = (book: GetBookResponse) => {
    setBooks([...books, book]);
    bookModal.handleClose();
  };

  const handleSetAnswer = (answer: { [key: number]: string }) => {
    Object.keys(answer).map((item, i) => {
      const newQuestions = [...questions];
      newQuestions[i].answer = answer[i + 1];
      setQuestions(newQuestions);
    });
    questionModal.handleClose();
  };

  const bookModalOpen = (book: DiffHour) => {
    setSelectedDate(book);
    bookModal.handleOpen();
  };
  books.map((book) => {
    const { start_time, end_time } = book;
    const diffHour = getDiffHour(start_time, end_time);
    diffHours.push(...diffHour);
  });
  for (let i = 0; i < diffHours.length; i++) {
    diffHours[i].hours;
  }

  const mergeDiffHours = mergeObjectsByDate(diffHours);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    handleSetAnswer(data);
  };
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    setBooks(BOOKS);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <Modal
        isOpen={questionModal.isOpen}
        handleClose={questionModal.handleClose}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              margin: "20px 0",
            }}
          >
            質問に回答してください
          </p>
          {questions.map((question) => (
            <label
              key={question.id}
              style={{
                margin: "0 0 20px 0",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  margin: "0 0 10px 0",
                }}
              >
                {question.title}
              </p>
              <input
                {...register(String(question.id), { required: true })}
                type="text"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #525252",
                  background: "#F9F9F9",
                  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset",
                  width: "200px",
                  height: "30px",
                }}
              />
            </label>
          ))}
          <input
            value={"回答する"}
            type="submit"
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              background: "#E68147",
              border: "none",
              color: "#f9f9f9",
              fontSize: "18px",
              margin: "20px 0",
            }}
          />
        </form>
      </Modal>
      <Modal isOpen={bookModal.isOpen} handleClose={bookModal.handleClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>{selectedDate?.date}:自分の予定</p>
          <AddBook
            hours={selectedDate?.hours}
            date={selectedDate?.date}
            handleSetBooks={handleSetBooks}
            length={books.length}
          />
        </div>
      </Modal>
      <div style={{ margin: "30px 0" }}>
        <Image
          src="/image/leftArrow.svg"
          width={30}
          height={30}
          alt="back_icon"
          onClick={routerBack}
        />
        <div>
          <div style={{ margin: "30px 0" }}>
            <h2
              style={{
                fontFamily: "Zen Kaku Gothic New",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              {event_title}
            </h2>
            <p
              style={{
                color: "#525252",
                fontFamily: "Zen Kaku Gothic New",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {description}
            </p>
          </div>
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
        </div>
        <div>
          <section style={{ margin: "0  0 30px 0" }}>
            <h3 style={h3}>イベント詳細</h3>
            <article style={{ margin: "25px 0" }}>
              <SubTitle title="予定入力期間" src="/image/time.svg">
                <p>所要時間 {requireTime}時間</p>
              </SubTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 0",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p>開始日</p>
                  <p>{term_start_day.replaceAll("-", "/")}</p>
                </div>
                <p>ー</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p>終了日</p>
                  <p>{term_end_day.replaceAll("-", "/")}</p>
                </div>
              </div>
            </article>
            <article style={{ margin: " 25px 0px 0 0" }}>
              <SubTitle title="開催場所" src="/image/location.svg">
                <p>{location}</p>
              </SubTitle>
            </article>
          </section>
          <h3 style={h3}>自分の予定</h3>
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
                  onClick={() =>
                    bookModalOpen(
                      mergeDiffHours.filter(
                        (item) =>
                          date.toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                          }) === item.date
                      )[0]
                    )
                  }
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
                      />
                    ))}
                  </div>
                  <Image
                    src={"/image/bookEdit.svg"}
                    width={20}
                    height={20}
                    alt="edit"
                  />
                </div>
              ))}
            </div>
          </BookList>

          {/* <h3>他のメンバーの予定</h3>
          {} */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0  0 10px 0",
              }}
            >
              <h3 style={h3}>質問への回答</h3>
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={questionModal.handleOpen}
              >
                <p style={{ fontSize: "1.2rem" }}>回答する</p>
                <Image
                  src={"/image/nextmonth.svg"}
                  alt="回答する"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            {questions.map((question) => (
              <div key={question.id} style={{ margin: "10px 0 0 0" }}>
                <div>質問　{question.title}</div>
                <div>回答　{question.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
