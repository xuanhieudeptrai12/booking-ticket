import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/image/web-logo.png";
import "./style.css";
import { DangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { useFormik } from "formik";
import * as yup from "yup";

const Register = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   //validation
   const signUpUserSchema = yup.object().shape({
      taiKhoan: yup
         .string()
         .min(5, "Your name must be at least 5 characters long!")
         .max(25, "Your name must be under 25 characters long!")
         .required("*Require Field!"),
      matKhau: yup
         .string()
         .min(6, "The password must be at least 6 characters long!")
         .matches(
            /^(?=.*[A-Z])(?=.*[@#$%]).+$/,
            "The password must contain at least 1 special character!"
         )
         .required("*Require Field!"),
      email: yup
         .string()
         .required("*Require Field!")
         .email("*The email is invalid"),
      soDt: yup
         .string()
         .required("*Require Field!")
         .matches(/^[0-9]+$/), //viet bieu thuc chinh quy phai viet lien, khong co dau cach giua cac ky tu
      maNhom: yup.string().required("*Require Field!"),
      hoTen: yup.string().required("*Require Field!"),
      confirmMatKhau: yup
         .string()
         .oneOf([yup.ref("matKhau")], "The passwords do not match")
         .required("*Require Field!"),
   });

   const formik = useFormik({
      initialValues: {
         taiKhoan: "",
         matKhau: "",
         email: "",
         soDt: "",
         maNhom: "GP01",
         maLoaiNguoiDung: "KhachHang",
         hoTen: "",
      },
      validationSchema: signUpUserSchema,
      onSubmit: (values) => {
         console.log(values);
         dispatch(DangKyAction(values, navigate));
      },
   });

   return (
      <>
         <div id="signup">
            <div className="signup signup--customize">
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
                           placeholder="Tài khoản"
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
                           autoComplete="new-password"
                           placeholder="Password"
                        />
                        {formik.errors.matKhau && formik.touched.matKhau && (
                           <div className="alert text-danger alert-validation">
                              {formik.errors.matKhau}
                           </div>
                        )}
                     </div>
                     <div className="form-group text-left">
                        <input
                           type="password"
                           name="confirmMatKhau"
                           className="form-control focus:bg-red-500"
                           value={formik.values.confirmMatKhau}
                           onChange={formik.handleChange}
                           autoComplete="off"
                           placeholder="Confirm Password"
                        />
                        {formik.errors.confirmMatKhau &&
                           formik.touched.confirmMatKhau && (
                              <div className="alert text-danger alert-validation">
                                 {formik.errors.confirmMatKhau}
                              </div>
                           )}
                     </div>
                     <div className="form-group text-left">
                        <input
                           type="text"
                           name="hoTen"
                           className="form-control"
                           value={formik.values.hoTen}
                           onChange={formik.handleChange}
                           autoComplete="off"
                           placeholder="Your Fullname"
                        />
                        {formik.errors.hoTen && formik.touched.hoTen && (
                           <div className="alert text-danger alert-validation">
                              {formik.errors.hoTen}
                           </div>
                        )}
                     </div>
                     <div className="form-group text-left">
                        <input
                           type="email"
                           name="email"
                           className="form-control"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           autoComplete="off"
                           placeholder="Email: hieudeptrai@gmail.com"
                        />
                        {formik.errors.email && formik.touched.email && (
                           <div className="alert text-danger alert-validation">
                              {formik.errors.email}
                           </div>
                        )}
                     </div>
                     <div className="form-group text-left">
                        <input
                           type="text"
                           name="soDt"
                           className="form-control"
                           value={formik.values.soDt}
                           onChange={formik.handleChange}
                           autoComplete="off"
                           placeholder="Phone"
                        />
                        {formik.errors.soDt && formik.touched.soDt && (
                           <div className="alert text-danger alert-validation">
                              {formik.errors.soDt}
                           </div>
                        )}
                     </div>
                     <div className="text-center mt-5">
                        <Link to="/signin">Đã có tài khoản ? Đăng nhập !</Link>
                        <button className="btn btn-success" type="submit">
                           Đăng ký
                        </button>
                     </div>
                  </form>
                  <div className="signup__close">
                     <NavLink className="btn-close" to="/">
                        <i className="fa fa-times"></i>
                     </NavLink>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;
