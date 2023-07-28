import { Box, Fade, Typography, styled } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { addNewProduct, editProductById } from "../redux/productSlice";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import AlertError from "./AlertError";
import useCreateNewProduct from "../hooks/product/useNewProduct";

const LabelBlack = styled("label")(() => ({
  color: "black",
}));

const InputStyle = styled("input")(() => ({
  border: "1px solid black",
}));

const TextAreaStyle = styled(TextareaAutosize)(() => ({
  border: "1px solid black",
  width: "100%",
}));

const BoxStyle = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24px",
}));

function TransitionsModal(props: {
  open: boolean;
  title: string;
  product?: Product;
  onClose: () => void;
}) {
  const { open, title, product, onClose } = props;
  const dispatch = useAppDispatch();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createNewProduct, editProduct } = useCreateNewProduct();

  const schema = yup
    .object({
      name: yup.string().required(),
      price: yup
        .string()
        .matches(/^[0-9]*$/, "price must be number")
        .required(),
      description: yup.string().required(),
      image: yup.string().url(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputProduct>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputProduct> = async (data) => {
    if (product) {
      const response = await editProduct({
        ...data,
        productId: String(product.productId),
        price: Number(data.price),
      });
      if (response.error?.response.status === 401) {
        setOpenError(true);
        setErrorMessage("Unauthorization");
      }

      if (response.error?.response.status === 403) {
        setOpenError(true);
        setErrorMessage("Forbidden");
      }

      if (response.error?.response.status === 400) {
        setOpenError(true);
        setErrorMessage("Incomplete information");
      }

      if (response.result?.status === 200) {
        dispatch(
          editProductById({
            ...data,
            productId: String(product.productId),
            unitPrice: Number(data.price),
            image: data.imageURL,
          })
        );
        onClose();
      }
    } else {
      const response = await createNewProduct(data);
      if (response.error?.response.status === 401) {
        setOpenError(true);
        setErrorMessage("Unauthorization");
      }
      if (response.error?.response.status === 403) {
        setOpenError(true);
        setErrorMessage("Forbidden");
      }
      if (response.result?.status === 200) {
        dispatch(
          addNewProduct({
            ...data,
            productId: String(response.result.data),
            unitPrice: Number(data.price),
            image: data.imageURL,
          })
        );
        onClose();
      }
    }
  };

  return (
    <>
      <Fade in={open}>
        <BoxStyle>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <LabelBlack>name: </LabelBlack>
            <InputStyle
              {...register("name", { required: true, maxLength: 20 })}
              placeholder="Name of Product"
              defaultValue={product?.name}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <LabelBlack>Price: </LabelBlack>
            <InputStyle
              {...register("price", {
                required: true,
              })}
              placeholder="Price"
              defaultValue={product?.unitPrice}
            />
            {errors.price && <p>{errors.price.message}</p>}

            <LabelBlack>description: </LabelBlack>
            <TextAreaStyle
              {...register("description")}
              placeholder="Description"
              minRows={5}
              defaultValue={product?.description}
            />
            {errors.description && <p>{errors.description.message}</p>}

            <LabelBlack>image: </LabelBlack>
            <InputStyle
              {...register("imageURL")}
              placeholder="image"
              defaultValue={product?.image}
            />
            {errors.imageURL && <p>{errors.imageURL.message}</p>}

            <input type="submit" />
          </form>
        </BoxStyle>
      </Fade>

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

export default TransitionsModal;
