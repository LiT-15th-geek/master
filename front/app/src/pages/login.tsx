import { Header } from "@/components/common/Header";
import { useFirebase } from "@/hooks/useFirebase";
import { GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import styles from "@/styles/SignUp.module.css";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useCustomRouter } from "@/hooks/useCustomRouter";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { emailSignIn, SNSSignIn, getCurrentUser } = useFirebase();
  const googleProvider = new GoogleAuthProvider();
  const { routerPush, getQueryId } = useCustomRouter();
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const handleGoogleLogin = async () => {
    const result = await SNSSignIn(googleProvider);
    if (result === "success") {
      setError("");
      if (getQueryId) {
        routerPush(`/calendar/${getQueryId}`);
        return;
      }
      routerPush("/");
      return;
    }
  };

  const onSubmit = async (data: Inputs) => {
    const result = await emailSignIn(data.email, data.password);
    console.log(result);

    if (result === "success") {
      setError("");
      if (getQueryId) {
        routerPush(`/calendar/${getQueryId}`);
        return;
      }
      routerPush("/");
      return;
    }
    if (result === "auth/invalid-login-credentials") {
      setError("メールアドレスの形式が正しくありません");
    }
  };

  useEffect(() => {
    const loginCheck = async () => {
      const result = await getCurrentUser()
      if (result) {
        if (getQueryId) {
          routerPush(`/calendar/${getQueryId}`);
          return;
        }
        routerPush("/");
        return;
      }
    };
    loginCheck();
  }, []);
  return (
    <>
      <>
        <div className={styles.container} style={{ height: "100vh" }}>
          <Image src="/image/edit.svg" width={70} height={70} alt="edit_icon" />
          <p className={styles.main_text}>情報を入力してください</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label>
              <p>メールアドレスを入力してください</p>
              <input type="text" {...register("email", { required: true })} />
            </label>
            {errors.email && <span>This field is required</span>}
            <label>
              <p>パスワードを入力してください</p>
              <input
                type="password"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && <span>This field is required</span>}
            {error && <span style={{ color: "red" }}>{error}</span>}
            <button type="submit" className={styles.submit_button}>
              ログイン
            </button>
          </form>
          <div className={styles.other_buttons}>
            <button onClick={handleGoogleLogin} className={styles.login_button}>
              Googleでログイン
            </button>
            <button
              className={styles.register_button}
              onClick={() => {
                routerPush("/signup");
              }}
            >
              新規登録
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default Login;
