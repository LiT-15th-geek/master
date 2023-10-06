import React, { useState } from "react";
import styles from "@/styles/Invites.module.css";
import Image from "next/image";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { InvitedResponse, NickNames } from "@/types/invitedResponse";
import { Modal } from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";

const Invited = () => {
  const { getQueryId } = useCustomRouter();
  const { isOpen, handleClose, handleOpen } = useModal();
  const [user, setUser] = useState<NickNames>();
  const [switchModal, setSwitchModal] = useState<"name" | "login">("name");
  const { routerPush } = useCustomRouter();
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const { data, error, isLoading } = useSWR<InvitedResponse>(
    `http://localhost:3000/calendar/${getQueryId}/bookedUser`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  const handleSelectUser = (data: NickNames) => {
    setUser(data);
    handleClose();
  };

  const handleClickSelectUser = () => {
    setSwitchModal("name");
    handleOpen();
  };

  const handleClickLogin = () => {
    if (data?.is_Private) {
      // postpassword
    }
    setSwitchModal("login");
    handleOpen();
  };

  const handleClickGest = () => {
    routerPush(`/calendar/${getQueryId}`);
  }
  console.log(data);

  return (
    <>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className={styles.modalBody}>
          {switchModal === "name" ? (
            <>
              <p className={styles.modalTitle}>名前を選択してください</p>
              <div className={styles.members}>
                {data?.nicknames.map((name, i) => (
                  <div
                    className={styles.member}
                    key={i + 1}
                    onClick={() => {
                      handleSelectUser(name);
                    }}
                  >
                    <Image
                      src={"/image/user.svg"}
                      width={30}
                      height={30}
                      alt="user"
                    />
                    <p>{name.nickname}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.buttons}>
              <button
                className={styles.activeButton}
                onClick={() =>
                  routerPush(
                    `/?calendar=${getQueryId}&bookedUserId=${user?.id}`
                  )
                }
              >
                ログイン / 登録して進める
              </button>
              <button className={styles.button} onClick={handleClickGest}>ゲストとして進める</button>
            </div>
          )}
        </div>
      </Modal>
      <div className={styles.container}>
        <Image src={"/image/edit.svg"} width={50} height={50} alt="edit" />
        <p>
          {data?.team_title}
          <br />
          に招待されました
        </p>
        <button
          onClick={handleClickSelectUser}
          className={user ? styles.button : styles.activeButton}
        >
          名前を選択
        </button>

        {user && (
          <>
            <div className={styles.member}>
              <Image
                src={"/image/user.svg"}
                width={30}
                height={30}
                alt="user"
              />
              <p>{user.nickname}</p>
            </div>
            {data?.is_Private && (
              <input
                type="password"
                placeholder="パスワードを入力"
                className={styles.password}
                ref={passwordRef}
              />
            )}
            <button onClick={handleClickLogin} className={styles.activeButton}>
              カレンダーに移動
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Invited;
