import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import logo from "../../assets/image/web-logo.png";
import Swal from "sweetalert2";

function Login() {
   const dispatch = useDispatch();
   const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
   const { previousLocation } = useSelector(
      (state) => state.QuanLyNguoiDungReducer
   );
   const navigate = useNavigate();
   const signUpUserSchema = yup.object().shape({
      taiKhoan: yup.string().required("*Require Field!"),
      matKhau: yup.string().required("*Require Field!"),
   });
   const formik = useFormik({
      initialValues: {
         taiKhoan: "",
         matKhau: "",
      },
      validationSchema: signUpUserSchema,
      onSubmit: (values) => {

         // const action = dangNhapAction(values);
         dispatch(dangNhapAction(values));

         Swal.fire("Thành công", "Bạn đăng nhập thành công", "success").then(
            () => {
               if (previousLocation !== "") {
                  navigate({ pathname: previousLocation });
               }
            });
      },
   });

   return (
      <>
         <div id="signup">
            <div className="signup__wrapper">
               <img className="signup__logo" src={logo} alt="dang-ky" />
               <form onSubmit={formik.handleSubmit}>
                  <div className="form-group text-left">
                     <input
                        type="text"
                        name="taiKhoan"
                        className="form-control"
                        value={formik.values.taiKhoan}
                        onChange={formik.handleChange}
                        autoComplete="off"
                        placeholder="Your Account"
                     />
                     {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                        <div className="alert text-danger alert-validation">
                           {formik.errors.taiKhoan}
                        </div>
                     )}
                  </div>
                  <div className="form-group text-left">
                     <input
                        type="password"
                        name="matKhau"
                        className="form-control"
                        value={formik.values.matKhau}
                        onChange={formik.handleChange}
                        autoComplete="off"
                        placeholder="Password"
                     />
                     {formik.errors.matKhau && formik.touched.matKhau && (
                        <div className="alert text-danger alert-validation">
                           {formik.errors.matKhau}
                        </div>
                     )}
                  </div>

                  <div className="mt-10">
                     <button
                        className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                            shadow-lg"
                     >
                        Đăng nhập
                     </button>
                  </div>

                  <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                     Bạn chưa có tài khoản ?{" "}
                     <span
                        // to="/register"
                        onClick={() => navigate("/register")}
                        className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                     >
                        Register
                     </span>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default Login;
