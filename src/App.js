import "./App.css";
import { createBrowserHistory } from "history";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { HomeTemplate } from "./teamplates/HomeTemplate/HomeTemplate";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./teamplates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import UserTemplate from "./teamplates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { USER_LOGIN } from "./util/setting/config";
import { UP_DATE_NGUOI_DUNG } from "./redux/actions/types/QuanLyNguoiDungType";

export const history = createBrowserHistory();

// const isAuthenticated = true; //Dang nhap dang ky
//const isAuthorization //Phan quyen admin, user, guest
// /checkout/:id
const ProtectedRoute = () => {
   const { isAuthenticated } = useSelector(
      (state) => state.QuanLyNguoiDungReducer
   );
   console.log("ProtectedRoute", isAuthenticated);
   return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

const RejectedRoute = (props) => {
   const { path } = props;
   const { isAuthenticated } = useSelector(
      (state) => state.QuanLyNguoiDungReducer
   );
   console.log("RejectedRoute", isAuthenticated);
   return isAuthenticated ? <Outlet /> : <Navigate to={path} />;
};

function App() {
   const location = useLocation();
   const dispatch = useDispatch();
   useEffect(() => {
      const userCur = JSON.parse(localStorage.getItem(USER_LOGIN)) ?? {};
      console.log(userCur);
      dispatch({ type: UP_DATE_NGUOI_DUNG, payload: userCur });
   }, [dispatch]);
   return (
      <>
         <Loading />
         <Routes>
            <Route path="/" element={<HomeTemplate />} />
            <Route path="/detail/:id" element={<Detail />} />▬
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            {/* ĐÃ ĐĂNG NHẬP THÀNH CÔNG */}
            <Route path="" element={<RejectedRoute path="/login" />}>
               <Route path="/checkout/:id" element={<Checkout />} />
            </Route>
            {/* CHƯA ĐĂNG NHẬP THÌ KHÔNG ĐƯỢC VÀO */}
            {/* <Route path="" element={<RejectedRoute path="/" />}> */}
            <Route path="/login" element={<UserTemplate />} />
            <Route path="/register" element={<Register />} />
            {/* </Route> */}
         </Routes>
      </>
   );
}

export default App;
