import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TransitionsModal from "./TransitionsModal";
import { removeProduct } from "../redux/productSlice";
import DefaultImage from "../img/Back-to-school.jpg";
import AlertError from "./AlertError";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useDeleteProductByID from "../hooks/product/useDeleteProductByID";
import { useNavigate } from "react-router-dom";

function CardItem(props: { product: Product }) {
  const { product } = props;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteProductByID = useDeleteProductByID();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.product);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const isDelete = window.confirm("Do you want to delete this product?");
    if (isDelete) {
      const response = await deleteProductByID(product.productId);
      if (response.error?.response.status === 401) {
        setOpenError(true);
        setErrorMessage("Unauthorization");
      }
      if (response.error?.response.status === 403) {
        setOpenError(true);
        setErrorMessage("Forbidden");
      }

      if (response.result?.status === 200) {
        dispatch(removeProduct(product.productId));
      }
    } else {
      window.alert("successfully cancelled");
    }
  };

  const handleClick = () => navigate(`/product/${product?.productId}`);
  console.log(product);
  console.log(select);
  return (
    <>
      <Card sx={{ maxWidth: 375 }}>
        <CardMedia
          sx={{ height: 350 }}
          image={product?.image || DefaultImage}
          title={product?.name}
        />
        <CardContent className="card" onClick={handleClick}>
          <Typography gutterBottom variant="h5" component="div" noWrap={true}>
            {product?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap={true}>
            {product?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Edit <EditIcon />
          </Button>
          <Button size="small" onClick={handleDelete}>
            Delete <DeleteIcon />
          </Button>
        </CardActions>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <TransitionsModal
          open={open}
          title="Edit Product"
          product={product}
          onClose={handleClose}
        />
      </Modal>

      {openError && (
        <AlertError
          errorMessage={errorMessage}
          open={openError}
          handleClose={() => setOpenError(false)}
        />
      )}
    </>
  );
}

export default CardItem;
