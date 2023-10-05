import React from "react";
import styles from "@/styles/CreateCalendar.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Label } from "@/components/createCalendar.tsx/Label";
import { useFirebase } from "@/hooks/useFirebase";
import { Modal } from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import {
  CreateCalendarRequest,
  CreateCalendarResponse,
} from "@/types/createCalendar";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { NextPage } from "next";

type Inputs = {
  name: string;
  description: string;
};

const CreateCalendar: NextPage = () => {
  const { getUId } = useFirebase();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [users, setUsers] = React.useState<string[]>([]);
  const [isCheck, setIsCheck] = React.useState<boolean>(false);
  const [request, setRequest] = React.useState<CreateCalendarRequest>();
  const { isOpen, handleClose, handleOpen } = useModal();
  const { routerPush, routerBack } = useCustomRouter();

  const handleSetUsers = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      setUsers([...users, inputRef.current?.value]);
      inputRef.current.value = "";
    }
  };
  const onSubmit = async (data: Inputs) => {
    if (errors.name || errors.description) return;
    if (users.length === 0) return;
    handleOpen();
    setRequest({
      team_title: data.name,
      description: data.description,
      is_private: isCheck,
      nicknameArray: users,
      user_id: await getUId(),
    });
  };

  const handleCreateCalendar = async () => {
    try {
      const result = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const json: CreateCalendarResponse = await result.json();
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
        <div className={styles.modalBody}>
          <p>カレンダーを作成しますか？</p>
          <div>
            <button onClick={handleCreateCalendar}>作成する</button>
            <button onClick={handleClose}>作成しない</button>
          </div>
        </div>
      </Modal>
      <div className={styles.title}>
        <Image
          src="/image/leftArrow.svg"
          width={30}
          height={30}
          alt="back_icon"
          onClick={routerBack}
        />
        <h2>カレンダーを作成する</h2>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.categories}>
            <Label title="カレンダー名を入力" href={"/image/edit.svg"}></Label>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
            <label>
              <p>詳細を入力</p>
              <input
                type="text"
                {...register("description", { required: true })}
              />
            </label>
          </div>
          <div className={styles.categories}>
            <Label href="/image/users.svg" title="メンバー名を入力" />
            {users.map((user, index) => {
              return (
                <div key={index + 1} className={styles.label}>
                  <Image
                    src="/image/userSmall.svg"
                    width={24}
                    height={24}
                    alt="edit_icon"
                  />
                  <p>{user}</p>
                </div>
              );
            })}
            <div>
              <input type="text" ref={inputRef} />
              <button
                className={styles.add_button}
                onClick={(e) => {
                  handleSetUsers(e);
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
            {errors.description && <span>This field is required</span>}
          </div>
          <div className={styles.categories}>
            <Label title="パスワードについて" href="/image/checkedbox.svg" />
            <div className={styles.passwordBox}>
              <p>パスワードをそれぞれに設定（自動生成）する</p>
              <Image
                src={isCheck ? "/image/checkedbox.svg" : "/image/checkbox.svg"}
                width={23}
                height={23}
                alt="edit_icon"
                onClick={() => {
                  setIsCheck(!isCheck);
                }}
              />
            </div>
          </div>
          <div className={styles.button_setting}>
            <button type="submit" className={styles.submit_button}>
              <h3>カレンダーを作成する</h3>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCalendar;
