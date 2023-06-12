import axios from "axios";
import { DOMAIN, TOKEN } from "../../util/setting/config";
import {
   DANG_NHAP_ACTION,
   SET_AUTHEN,
   SET_THONG_TIN_NGUOI_DUNG,
   USER_LOGOUT,
   USER_SIGNUP_FAILED,
   USER_SIGNUP_REQUEST,
   USER_SIGNUP_SUCCESS,
} from "./types/QuanLyNguoiDungType";
import Swal from "sweetalert2";

export const dangNhapAction = (thongTinDangNhap) => {
   return async (dispatch) => {
      try {
         const result = await axios({
            // url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
            url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
            method: "POST",
            data: thongTinDangNhap,
            // headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
         });

         if (result.status === 200) {
            dispatch({
               type: DANG_NHAP_ACTION,
               thongTinDangNhap: result.data.content,
            });

            // navigate(-1); // quay lại trang trước đó

            //dispatch hành động đăng nhập rồi
            //sau khi đăng nhập rồi thì set biến authen bằng true
            dispatch({ type: SET_AUTHEN });
         }
      } catch (errors) {
         console.log("that bai", errors);
      }
   };
};

export const DangKyAction = (userRegister, navigate) => {
   return async (dispatch) => {
      dispatch({
         type: USER_SIGNUP_REQUEST,
      });
      try {
         const result = await axios({
            url: `${DOMAIN}/api/QuanLyNguoiDung/DangKy`,
            method: "POST",
            data: {
               taiKhoan: userRegister.taiKhoan,
               matKhau: userRegister.matKhau,
               email: userRegister.email,
               soDt: userRegister.soDt,
               maNhom: userRegister.maNhom,
               hoTen: userRegister.hoTen,
               maLoaiNguoiDung: userRegister.maLoaiNguoiDung,
            },
         });
         console.log(result);
         if (result.status === 200) {
            dispatch({
               type: USER_SIGNUP_SUCCESS,
               payload: userRegister,
            });

            // Swal("Thành công", "bạn đăng ký thành công", "success");
            Swal.fire("Thành công", "bạn đăng ký thành công", "success").then(
               () => {
                  // Chuyển trang tại đây
                  navigate("/login");
               }
            );
         }
      } catch (err) {
         dispatch({
            type: USER_SIGNUP_FAILED,
            payload: err.message,
         });
         console.log("that bai", err);
      }
   };
};

export const dangXuatTaiKhoanAction = (navigate) => {
   return (dispatch) => {
      dispatch({
         type: USER_LOGOUT,
      });
      Swal.fire("Thành công", "bạn đăng xuất thành công", "success").then(
         () => {
            // Chuyển trang tại đây
            navigate("/");
         }
      );
   };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
   return async (dispatch) => {
      try {
         const result = await axios({
            url: `${DOMAIN}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
            method: "POST",
            data: thongTinDangNhap,
            headers: {
               Authorization:
                  "Bearer " + localStorage.getItem(TOKEN).replace(/"/g, ""),
            }, //JWT
         });

         if (result.status === 200) {
            dispatch({
               type: SET_THONG_TIN_NGUOI_DUNG,
               thongTinNguoiDung: result.data.content,
            });
         }
      } catch (errors) {
         console.log("that bai", errors);
      }
   };
};
