import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { CreateCalendarInvitedResponse } from "@/types/createCalendar";
import { fetcher } from "@/utils/fetcher";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import styles from "@/styles/CreateCalender[id].module.css";

const CreateCalenderId = () => {
  const { getQueryId, routerPush } = useCustomRouter();
  const { data, isLoading, error } = useSWR<CreateCalendarInvitedResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}calendar/new/${getQueryId}`,
    fetcher
  );
  const { isOpen, handleOpen, handleClose } = useModal();
  //   if (error) return "An error has occurred.";
  //   if (isLoading) return "Loading...";
  //   if (!data) return <></>;
  const copyToClipboard = async () => {
    if (typeof getQueryId === "string") {
      try {
        await global.navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_BROWSER_URL}invited/${getQueryId}`
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className={styles.modal_password}>
          {data?.bookedUsers?.map((user, index) => (
            <div className={styles.modal_information} key={index + 1}>
              <div className={styles.modal_member}>
                <Image
                  src="/image/userSmall.svg"
                  width={24}
                  height={24}
                  alt="user_image"
                />
                <p>{user.nickname}</p>
              </div>
              <p className={styles.en}>{user.password}</p>
            </div>
          ))}
        </div>
      </Modal>
      <div className={styles.container}>
        <Image src="/image/edit.svg" width={70} height={70} alt="edit_icon" />
        <h3>作成しました！</h3>
        <div className={styles.buttons}>
          <button className={styles.button_white} onClick={copyToClipboard}>
            <p>招待リンクをコピー</p>
          </button>
          <button className={styles.button_white} onClick={handleOpen}>
            <p>パスワードを表示</p>
          </button>
          <button
            className={styles.button_color}
            onClick={() => {
              routerPush(`/invited/${getQueryId}`);
            }}
          >
            <p>カレンダーを見る</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCalenderId;
