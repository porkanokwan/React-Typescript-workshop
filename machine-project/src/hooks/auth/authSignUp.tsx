import axios, { AxiosResponse } from "axios";
import { IFormInput } from "../../page/Signup";

export type Response = {
  result?: AxiosResponse<string>;
  error?: any;
};

export default function useAuthSignUp() {
  const authSignUp = async (body: IFormInput): Promise<Response> => {
    try {
      const url = `https://localhost:7145/api/Auth/register`;
      const result = await axios.post(url, body);

      if (result.data === "Username duplicated") {
        throw new Error("Username duplicated");
      } else {
        return { result };
      }
    } catch (error) {
      return { error };
    }
  };

  return authSignUp;
}
