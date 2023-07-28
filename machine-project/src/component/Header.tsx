import LogoutIcon from "@mui/icons-material/Logout";
import { deleteToken } from "../service/localStorage";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteToken();
    navigate("/signin");
  };
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Product</h1>
      <div className="btn-logout" role="button" onClick={handleLogout}>
        <LogoutIcon />
      </div>
    </div>
  );
}

export default Header;
