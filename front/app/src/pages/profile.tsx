import { CalendarList } from "@/components/top/CalendarList";
import { MainCalendar } from "@/components/top/MainCalendar";
import { ProfileHeader } from "@/components/top/ProfileHeader";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = async () => {
      try {
        const result = await fetch("http://localhost:3000/user/aaa");
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await result.json();
        console.log(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    posts();
  }, []);
  // const PROFILE = {
  //   created_calendar: [
  //     {
  //       title: "カレンダー1",
  //       users: [
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //       ],
  //       event_count: 3,
  //     },
  //     {
  //       title: "カレンダー2",
  //       users: [
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //       ],
  //       event_count: 2,
  //     },
  //     {
  //       title: "カレンダー3",
  //       users: [
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //       ],
  //       event_count: 2,
  //     },
  //   ],
  //   created_calendar: [
  //     {
  //       title: "カレンダー1",
  //       users: [
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //       ],
  //       event_count: 3,
  //     },
  //     {
  //       title: "カレンダー2",
  //       users: [
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //       ],
  //       event_count: 2,
  //     },
  //     {
  //       title: "カレンダー3",
  //       users: [
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //         {
  //           icon: "https://placehold.jp/150x150.png",
  //         },
  //       ],
  //       event_count: 2,
  //     },
  //   ],
  // };

  return (
    <div>
      <ProfileHeader />
      <MainCalendar />
      <CalendarList title={"主催しているカレンダー"} />
      <CalendarList title={"参加しているカレンダー"} />
    </div>
  );
};

export default Profile;
