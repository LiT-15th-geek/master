import React, { useState } from "react";
import styles from "@/styles/Modal.module.css";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};
export const Modal = (props: Props) => {
  const { isOpen, children, handleClose } = props;

  const closeWithClickOutSideMethod = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setter: { (): void; (arg0: boolean): void }
  ) => {
    if (e.target === e.currentTarget) {
      //メニューの外側をクリックしたときだけメニューを閉じる
      console.log("メニューの外側をクリックした");
      setter(false);
    } else {
      console.log("メニューの内側をクリックした");
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            closeWithClickOutSideMethod(e, handleClose);
          }}
        >
          <div className={styles.modalBody} onClick={() => {}}>
            <div className={styles.buttonContainer}>
              <button className={styles.closeButton} onClick={handleClose}>
                <Image
                  src={"/image/close.svg"}
                  width={40}
                  height={40}
                  alt="close"
                />
              </button>
            </div>
            {children}
          </div>
          <div className={styles.nonScroll}></div>
        </div>
      )}
    </>
  );
};
