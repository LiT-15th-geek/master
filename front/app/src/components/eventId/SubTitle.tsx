import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  children?: React.ReactNode;
};
export const SubTitle = (props: Props) => {
  const { title, src, children } = props;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image src={src} width={40} height={40} alt="icon" />
      <div>{title}</div>
      {children}
    </div>
  );
};
