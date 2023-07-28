import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../page/Home";
import Product from "../page/Product";
import Signin from "../page/Signin";
import Signup from "../page/Signup";
import { getToken } from "../service/localStorage";

function Router() {
  const [hasToken, setHasToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token: unknown = getToken();
    if (typeof token === "string") {
      setHasToken(token);
    } else {
      setHasToken("");
    }
  }, [location.pathname]);

  return (
    <Routes>
      {hasToken ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="*" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
