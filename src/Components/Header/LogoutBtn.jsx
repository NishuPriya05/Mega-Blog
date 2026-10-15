import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <button
      className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#183a35] sm:px-4"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
