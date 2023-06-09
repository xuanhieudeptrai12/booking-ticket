import axios from "axios";
import { DOMAIN, TOKEN } from "../../util/setting/config";
import {
   DANG_NHAP_ACTION,
   SET_THONG_TIN_NGUOI_DUNG,
} from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap, navigate) => {
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
            navigate(-1); // quay lại trang trước đó
         }
      } catch (errors) {
         console.log("that bai", errors);
      }
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
