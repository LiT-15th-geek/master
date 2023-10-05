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

type Inputs = {
  name: string;
  description: string;
};
const createCalendar = () => {
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
  const { routerPush } = useCustomRouter();

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
      <h1>カレンダーを作成する</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Label title="カレンダー名を入力" href={"/image/edit.svg"}>
            <input type="text" {...register("name", { required: true })} />
          </Label>
          {errors.name && <span>This field is required</span>}
          <label>
            <p>詳細を入力</p>
            <input
              type="text"
              {...register("description", { required: true })}
            />
          </label>

          <Label href="/image/edit.svg" title="メンバー名を入力" />
          {users.map((user, index) => {
            return (
              <div key={index + 1} className={styles.label}>
                <Image
                  src="/image/edit.svg"
                  width={30}
                  height={30}
                  alt="edit_icon"
                />
                <p>{user}</p>
              </div>
            );
          })}
          <div>
            <input type="text" ref={inputRef} />
            <button
              onClick={(e) => {
                handleSetUsers(e);
              }}
            >
              追加
            </button>
          </div>
          {errors.description && <span>This field is required</span>}
          <Label title="パスワードについて" href="/image/edit.svg" />
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
          <button type="submit" className={styles.submit_button}>
            カレンダーを作成する
          </button>
        </form>
      </div>
    </div>
  );
};

export default createCalendar;
