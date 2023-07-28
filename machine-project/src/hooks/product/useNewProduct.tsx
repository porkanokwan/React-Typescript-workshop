import axios, { AxiosResponse } from "axios";
import InputProduct from "../../component/TransitionsModal";
import { getToken } from "../../service/localStorage";

export type Response = {
  result?: AxiosResponse<number>;
  error?: any;
};

export default function useNewProduct() {
  const createNewProduct = async (body: InputProduct): Promise<Response> => {
    try {
      const url = `https://localhost:7145/api/Product/createproduct`;
      const token = getToken();
      const result = await axios.post(url, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return { result };
    } catch (error) {
      return { error };
    }
  };

  const editProduct = async (body: InputProduct): Promise<Response> => {
    try {
      const url = `https://localhost:7145/api/Product/editproduct/${body.productId}`;
      const token = getToken();
      const result = await axios.put(url, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return { result };
    } catch (error) {
      return { error };
    }
  };

  return { editProduct, createNewProduct };
}
