import { useFirebase } from "@/hooks/useFirebase";
import React from "react";
import { useForm } from "react-hook-form";

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
  const onSubmit = (data: Inputs) => {
    console.log(data);

    emailSignUp(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <input type="password" {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      <button type="submit">登録</button>
    </form>
  );
};

export default Signup;
