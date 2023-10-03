import { Header } from "@/components/common/Header";
import { useFirebase } from "@/hooks/useFirebase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from "@/styles/SignUp.module.css";
import { useCustomRouter } from "@/hooks/useCustomRouter";

type Inputs = {
  email: string;
  password: string;
};
const Signup = () => {
  const { emailSignUp } = useFirebase();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState("");
  const {routerPush} =useCustomRouter()

  const onSubmit = async (data: Inputs) => {
    try {
      const result = await emailSignUp(data.email, data.password);
      console.log(result);
      if (result === "success") {
        setError("");
        // todo:signup後に確認画面に遷移する
        // DBにアカウント登録する処理を書く
        routerPush("/login");
        return;
      }
      if (result === "auth/invalid-email") {
        setError("メールアドレスの形式が正しくありません");
      }
      if (result === "auth/weak-password") {
        setError("パスワードは6文字以上で入力してください");
      }
      if (result === "auth/email-already-in-use") {
        setError("このメールアドレスは既に使われています");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // todo:確認用のパスワードを入力させる
  return (
    <>
      <Header />
      <div className={styles.container}>
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
          {error && <span style={{color:"red"}}>{error}</span>}
          <button type="submit" className={styles.submit_button}>
            登録して進める
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
