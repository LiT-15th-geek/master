import { useFirebase } from "@/hooks/useFirebase";
import { GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import styles from "@/styles/SignUp.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

  // useForm = フォームのバリデーションを簡単にしてくれる
  // register = バリデーションのルールを設定する
  // handleSubmit = バリデーションを通った後に実行される処理
  // formState = フォームの状態を取得できる
  // errors = エラーの内容を取得できる
  // type=submitとonSubmitが結びついてる
  //
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  // googleログイン
  const handleGoogleLogin = async () => {
    const result = await SNSSignIn(googleProvider);
    console.log(result);

    if (result === "success") {
      setError("");
      if (getQueryId) {
        routerPush(`/calendar/${getQueryId}`);
        return;
      }
      routerPush("/profile");
      return;
    }
  };

  // ログインボタンを押した時
  const onSubmit = async (data: Inputs) => {
    const result = await emailSignIn(data.email, data.password);

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

  // useEffect = []の中身に変更があった時に実行される(triggerみたいなもの)[空だとページの読み込んだ時、1回だけ処理が実行される]
  useEffect(() => {
    const loginCheck = async () => {
      const result = await getCurrentUser();
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
          {/* onSubmitはボタンが押された時に走る処理 (type=submitとonSubmitが結びついてる[↓の場合]) */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label>
              <p>メールアドレスを入力してください</p>
              {/* ...registerがemailって名前をつけてる */}
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
