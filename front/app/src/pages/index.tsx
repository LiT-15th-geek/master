import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const Home = () => {
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

  return (
    <div>
      <h2>POSTの一覧</h2>
      <table>
              </table>
    </div>
  );
};

export default Home;