import { useFirebase } from "@/hooks/useFirebase";
import { GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { emailSignIn, SNSSignIn, getCurrentUser } = useFirebase();
  const googleProvider = new GoogleAuthProvider();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    emailSignIn(data.email, data.password);
  };

  useEffect(() => {
    const user = async () => {
      console.log(await getCurrentUser());
    };
    user();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type="submit">登録</button>
      </form>
      <button onClick={() => SNSSignIn(googleProvider)}>
        Googleでログイン
      </button>
    </>
  );
};

export default Login;
