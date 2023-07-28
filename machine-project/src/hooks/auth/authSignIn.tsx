import axios, { AxiosResponse } from "axios";
import { InputSignIn } from "../../page/Signin";

export type Response = {
  result?: AxiosResponse<string>;
  error?: any;
};

export default function useAuthSignIn() {
  const authSignIn = async (body: InputSignIn): Promise<Response> => {
    try {
      const url = `https://localhost:7145/api/Auth/login`;
      const result = await axios.post(url, body);

      if (result.data === "") {
        throw new Error("Incorrect information");
      } else {
        return { result };
      }
    } catch (error) {
      return { error };
    }
  };

  return authSignIn;
}
