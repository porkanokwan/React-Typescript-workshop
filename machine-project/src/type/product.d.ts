type Product = {
  productId: string;
  name: string;
  description: string;
  unitPrice: number;
  image: string;
};

type IFormInput = {
  username: string;
  password: string;
  name: string;
};

type InputSignIn = {
  username: string;
  password: string;
};

type InputProduct = {
  productId: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
};
