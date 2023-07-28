import axios, { AxiosResponse } from "axios";
import { getToken } from "../../service/localStorage";

export type Response = {
  result?: AxiosResponse<number>;
  error?: any;
};

export default function useDeleteProductByID() {
  const deleteProductByID = async (productId: string): Promise<Response> => {
    try {
      const url = `https://localhost:7145/api/Product/removeproduct/${productId}`;
      const token = getToken();
      const result = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return { result };
    } catch (error) {
      return { error };
    }
  };

  return deleteProductByID;
}
