import { useState } from "react";
import CardItem from "../component/CardItem";
import TransitionsModal from "../component/TransitionsModal";
import useGetAllProduct from "../hooks/product/useGetAllProduct";
import Modal from "@mui/material/Modal";
import Header from "../component/Header";

function Home() {
  const products = useGetAllProduct();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />

      <button type="button" className="btn-add" onClick={handleOpen}>
        Add New Product
      </button>

      <div className="container-card">
        {products.map((item) => (
          <CardItem key={item.productId} product={item} />
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <TransitionsModal
          open={open}
          onClose={handleClose}
          title="Add New Product"
        />
      </Modal>
    </>
  );
}

export default Home;
