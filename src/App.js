import "./App.css";
import { createBrowserHistory } from "history";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { HomeTemplate } from "./teamplates/HomeTemplate/HomeTemplate";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import UserTemplate from "./teamplates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { USER_LOGIN } from "./util/setting/config";
import { UP_DATE_NGUOI_DUNG } from "./redux/actions/types/QuanLyNguoiDungType";

export const history = createBrowserHistory();

const RejectedRoute = (props) => {
   const { path } = props;
   return localStorage.getItem(USER_LOGIN) ? (
      <Outlet />
   ) : (
      <Navigate to={path} />
   );
};

function App() {
   const dispatch = useDispatch();
   useEffect(() => {
      const userCur = JSON.parse(localStorage.getItem(USER_LOGIN)) ?? {};
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
            <Route path="" element={<RejectedRoute path="/login" />}>
               <Route path="/checkout/:id" element={<Checkout />} />
            </Route>
            <Route path="/login" element={<UserTemplate />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </>
   );
}

export default App;
