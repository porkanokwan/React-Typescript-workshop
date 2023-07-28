import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import axios from "axios";
import { getAllProduct, selectProduct } from "../../redux/productSlice";
import { getToken } from "../../service/localStorage";

function useGetAllProduct(): Product[] {
  const { product } = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();
  const url = "https://localhost:7145/api/Product/getallproduct";
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllProduct(res.data));
    };

    fetchData();
  }, [dispatch, token]);

  return product;
}

export default useGetAllProduct;
