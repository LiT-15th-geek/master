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
    if (errors) return;
    if (users.length === 0) return;
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
        <div className={""}>
          <p>イベントを作成しますか？</p>
          <div>
            <button onClick={handleCreateEvent}>作成する</button>
            <button onClick={handleClose}>作成しない</button>
          </div>
        </div>
      </Modal>
      <div className={""}>
        <Image
          src="/image/leftArrow.svg"
          width={30}
          height={30}
          alt="back_icon"
          onClick={routerBack}
        />
        <h2>イベントを作成する</h2>
      </div>
      <div className={""}>
        <form onSubmit={handleSubmit(onSubmit)} className={""}>
          <div>
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
          <div>
            <Label href="/image/users.svg" title="期間を入力" />
            <div>
              <label>
                <p>開始日</p>
                <input
                  type="text"
                  {...register("term_start_day", { required: true })}
                />
              </label>
              ー
              <label>
                <p>終了日</p>
                <input
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
            <Label title="開催場所を入力" href={"/image/edit.svg"}>
              <input
                type="text"
                {...register("location", { required: true })}
              />
            </Label>
            <Label title="メンバーの重要度を入力" href={"/image/edit.svg"} />
            {users.map((user, index) => (
              <div key={index + 1}>
                <div>
                  <Image
                    src="/image/userSmall.svg"
                    width={24}
                    height={24}
                    alt="edit_icon"
                  />
                  <p>{user.name}</p>
                </div>
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
            ))}
            <Label title="質問" href={"/image/edit.svg"} />
            {/* 質問一覧 */}
            {questions.map((question, index) => (
              <div key={index + 1}>
                <p>{question.question}</p>
                <Image
                  src="/image/userSmall.svg"
                  width={24}
                  height={24}
                  alt="edit_icon"
                />
              </div>
            ))}

            {/* 質問作成*/}
            <div>
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
          <div>
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
