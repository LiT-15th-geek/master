import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { CreateCalendarInvitedResponse } from "@/types/createCalendar";
import { fetcher } from "@/utils/fetcher";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";

const CreateCalenderId = () => {
  const { getQueryId,routerPush } = useCustomRouter();
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
        await global.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BROWSER_URL}invited/${getQueryId}`);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div>
          {data?.bookedUsers?.map((user, index) => (
            <div key={index + 1}>
              <Image src={""} width={50} height={50} alt="user_image" />
              <p>{user.nickname}</p>
              <p>{user.password}</p>
            </div>
          ))}
        </div>
      </Modal>
      <div className={""}>
        <Image src="/image/edit.svg" width={50} height={50} alt="edit_icon" />
        <p>作成しました！</p>
        <div>
          <button onClick={copyToClipboard}>招待リンクをコピー</button>
          <button onClick={handleOpen}>パスワードを表示</button>
          <button onClick={()=>{routerPush(`/invited/${getQueryId}`)}}>カレンダーを見る</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCalenderId;
