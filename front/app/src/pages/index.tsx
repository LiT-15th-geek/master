import { useFirebase } from "@/hooks/useFirebase";
import Link from "next/link";
import React from "react";

const index = () => {
  return <Link href={"/profile"}>index</Link>;
};

export default index;
