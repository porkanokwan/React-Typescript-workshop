import { Card, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import useGetAllProduct from "../hooks/product/useGetAllProduct";
import DefaultImg from "../img/Back-to-school.jpg";

function Product() {
  const products = useGetAllProduct();
  const { productId } = useParams();

  const findProduct = products.find(
    (item) => String(item.productId) === productId
  );

  return (
    <>
      <Header />

      <div className="container-product">
        <div className="productImg">
          <Card sx={{ width: 500, height: 500 }}>
            <CardMedia
              component="img"
              width="400"
              height="500"
              image={findProduct?.image || DefaultImg}
              alt={findProduct?.name}
            />
          </Card>
        </div>

        <div className="product-detail">
          <h2>
            Name: <span>{findProduct?.name}</span>
          </h2>
          <h2>
            Price: <span>{findProduct?.unitPrice}</span>
          </h2>
          <h2>
            Description: <span>{findProduct?.description}</span>
          </h2>
        </div>
      </div>
    </>
  );
}

export default Product;
