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
    <div style={{ display: "flex", alignItems: "center",justifyContent:"space-between" }}>
      <div  style={{ display: "flex", alignItems: "center",gap:"10px" }}>
        <Image src={src} width={30} height={30} alt="icon" />
        <div>{title}</div>
      </div>
      {children}
    </div>
  );
};
