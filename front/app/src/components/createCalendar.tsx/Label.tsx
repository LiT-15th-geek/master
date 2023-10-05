import React from "react";

import Image from "next/image";
import styles from "@/styles/CreateCalendar.module.css";

type Props = {
  children?: React.ReactNode;
  href?: string;
  title: string;
};
export const Label = (props: Props) => {
  const { children, href, title } = props;
  return (
    <label>
      <div className={styles.label}>
        {href && <Image src={href} width={30} height={30} alt="edit_icon" />}
        <p>{title}</p>
      </div>
      {children}
    </label>
  );
};
