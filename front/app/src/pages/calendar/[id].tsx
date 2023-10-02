import { useCustomRouter } from "@/hooks/useCustomRouter";
import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";

const Calendar = () => {
  const { getQueryId } = useCustomRouter();

  const { data, error, isLoading } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
  );

  console.log(data);
  
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return <div>{getQueryId}</div>;
};

export default Calendar;
