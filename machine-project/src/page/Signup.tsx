import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AlertError from "../component/AlertError";
import { useNavigate } from "react-router-dom";
import useAuthSignUp from "../hooks/auth/authSignUp";

function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authSignUp = useAuthSignUp();

  const schema = yup
    .object({
      username: yup.string().required(),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          "Password must contain at least one uppercase character one lowercase character one special characters and one number"
        )
        .required(),
      name: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .required(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await authSignUp(data);
    if (response instanceof Error) {
      setOpen(true);
      setErrorMessage(response.message);
    }
    if (response.result?.status === 200) {
      const isSuccess = window.confirm(
        "Register success, Do you want to go to Login page ?"
      );
      isSuccess && navigate("/signin");
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="container">
      <div className="box-img"></div>

      <div className="form-auth">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>username: </label>
          <input
            {...register("username")}
            name="username"
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <label>password: </label>
          <input
            type="password"
            {...register("password")}
            name="password"
            placeholder="Password at least 8 characters"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <label>name: </label>
          <input {...register("name")} name="name" placeholder="Name" />
          {errors.name && <p>{errors.name.message}</p>}

          <input type="submit" />
        </form>
      </div>

      {open && (
        <AlertError
          errorMessage={errorMessage}
          handleClose={handleClose}
          open={open}
        />
      )}
    </div>
  );
}

export default Signup;
