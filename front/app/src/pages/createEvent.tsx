import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Label } from "@/components/createCalendar.tsx/Label";
import { useFirebase } from "@/hooks/useFirebase";
import { Modal } from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { NextPage } from "next";
import { CreateEventRequest } from "@/types/createEvent";
import styles from "@/styles/CreateEvent.module.css";
import { SignInMethod } from "firebase/auth";

type Inputs = {
  event_title: string;
  description: string;
  term_start_day: string;
  term_end_day: string;
  location: string;
  requireTime: number;
  members: [
    {
      id: number;
      priority: number;
      must: boolean;
    }
  ];
};
type Question = {
  id?: number;
  question: string;
};

const Priorities = [
  { id: 1, name: "低" },
  { id: 2, name: "中" },
  { id: 3, name: "高" },
  { id: 4, name: "必須" },
];

const CreateEvent: NextPage = () => {
  const { getUId } = useFirebase();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [users, setUsers] = React.useState([
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
  ]);
  const [questions, setQuestions] = React.useState<Question[]>([
    { id: 1, question: "test1" },
    { id: 2, question: "test2" },
    { id: 3, question: "test3" },
  ]);
  const [isCheck, setIsCheck] = React.useState<boolean>(false);
  const [request, setRequest] = React.useState<CreateEventRequest>();
  const { isOpen, handleClose, handleOpen } = useModal();
  const { routerPush, routerBack } = useCustomRouter();

  const handleSetQuestions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const question = inputRef.current?.value;
    if (question) {
      setQuestions((prevState) =>
        prevState
          ? [...prevState, { question: question }]
          : [{ question: question }]
      );
      inputRef.current.value = "";
    }
  };
  const onSubmit = async (data: Inputs) => {
    handleOpen();
    setRequest({
      event_title: data.event_title,
      description: data.description,
      term_start_day: data.term_start_day,
      term_end_day: data.term_end_day,
      location: data.location,
      requireTime: data.requireTime,
      members: data.members,
      defaultquestions: [1, 2],
      user_id: await getUId(),
      additionalQuestions: ["", ""],
    });
  };

  const handleCreateEvent = async () => {
    try {
      const result = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const json = await result.json();
      if (json) {
        handleClose();
        routerPush(`/createCalendar/${json.calendar_id}`);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className={styles.check}>
          <h3>イベントを作成しますか？</h3>
          <div className={styles.check_button}>
            <button className={styles.check_yes} onClick={handleCreateEvent}>
              <p>作成する</p>
            </button>
            <button className={styles.check_no} onClick={handleClose}>
              <p>作成しない</p>
            </button>
          </div>
        </div>
      </Modal>
      <div className={styles.header}>
        <Image
          src="/image/leftArrow.svg"
          width={30}
          height={30}
          alt="back_icon"
          onClick={routerBack}
        />
        <h2>イベントを作成する</h2>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={""}>
          <div className={styles.item}>
            <Label title="イベント名を入力" href={"/image/edit.svg"}>
              <input
                type="text"
                {...register("event_title", { required: true })}
              />
            </Label>
            {errors.event_title && <span>This field is required</span>}
            <label>
              <p>詳細を入力</p>
              <input
                type="text"
                {...register("description", { required: true })}
              />
            </label>
          </div>
          <div className={styles.item}>
            <Label href="/image/clock.svg" title="期間を入力" />
            <div className={styles.term}>
              <label>
                <p>開始日</p>
                <input
                  className={styles.term}
                  type="text"
                  {...register("term_start_day", { required: true })}
                />
              </label>
              <div className={styles.hyphen}>
                <h1>-</h1>
              </div>
              <label>
                <p>終了日</p>
                <input
                  className={styles.term}
                  type="text"
                  {...register("term_end_day", { required: true })}
                />
              </label>
            </div>
            <label>
              <p>所要時間を入力</p>
              <input
                type="text"
                {...register("requireTime", { required: true })}
              />
            </label>
          </div>
          <div className={styles.item}>
            <Label title="開催場所を入力" href={"/image/mapPin.svg"}>
              <input
                type="text"
                {...register("location", { required: true })}
              />
            </Label>
          </div>
          <div className={styles.item}>
            <Label title="メンバーの重要度を入力" href={"/image/users.svg"} />
            <div className={styles.user_priority}>
              {users.map((user, index) => (
                <div key={index + 1}>
                  <div className={styles.user_info}>
                    <Image
                      src="/image/userSmall.svg"
                      width={24}
                      height={24}
                      alt="edit_icon"
                    />
                    <p>{user.name}</p>
                  </div>
                  <div className={styles.priority_items}>
                    {Priorities.map((priority, index) => (
                      <label key={index + 1}>
                        <p>{priority.name}</p>
                        <input
                          type="checkbox"
                          {...register("members.0.priority")}
                          style={{ display: "none" }}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.item}>
            <Label title="質問" href={"/image/questions.svg"} />
            {/* 質問一覧 */}
            {questions.map((question, index) => (
              <div key={index + 1}>
                <div className={styles.default_question}>
                  <p>{question.question}</p>
                  <Image
                    src="/image/checkbox.svg"
                    width={24}
                    height={24}
                    alt="edit_icon"
                  />
                </div>
              </div>
            ))}

            {/* 質問作成*/}
            <div className={styles.original_question}>
              <input type="text" ref={inputRef} />
              <button
                onClick={(e) => {
                  handleSetQuestions(e);
                }}
              >
                <Image
                  src="/image/plusSquare.svg"
                  width={30}
                  height={30}
                  alt="add_icon"
                />
              </button>
            </div>
          </div>
          <div className={styles.decide_button}>
            <button type="submit">
              <h3>イベントを作成する</h3>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
