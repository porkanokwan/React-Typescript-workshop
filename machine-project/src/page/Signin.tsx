import { useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { deleteToken, setToken } from "../service/localStorage";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertError from "../component/AlertError";
import useAuthSignIn from "../hooks/auth/authSignIn";
import { styled } from "@mui/material";

const LinkStyles = styled(Link)(() => ({
  color: "white",
}));

function Signin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authSignIn = useAuthSignIn();

  const schema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputSignIn>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputSignIn> = async (data) => {
    const response = await authSignIn(data);
    if (response instanceof Error) {
      setOpen(true);
      setErrorMessage(response.message);
    }
    if (response.result?.status === 200) {
      setToken(response.result.data);
      navigate("/");
    } else {
      deleteToken();
    }
  };

  return (
    <div className="container">
      <div className="box-img"></div>

      <div className="form-auth">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>username: </label>
          <input {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}

          <label>password: </label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}

          <input type="submit" />
        </form>

        <span>
          Create New Account{"  "}
          <LinkStyles to="/signup">Click here!!</LinkStyles>
        </span>
      </div>

      {open && (
        <AlertError
          errorMessage={errorMessage}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default Signin;
