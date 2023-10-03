import React from "react";
import Image from "next/image";
import { useCustomRouter } from "@/hooks/useCustomRouter";

export const Header = () => {
  const { routerBack } = useCustomRouter();
  return (
    <div style={{ width: "100%",height:"10vh",display:"flex",alignItems:"center" }} onClick={routerBack}>
      <Image src={"/image/leftArrow.svg"} alt="left" width={40} height={40} />
    </div>
  );
};
