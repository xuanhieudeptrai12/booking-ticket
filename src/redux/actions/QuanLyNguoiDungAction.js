import axios from "axios";
import { DOMAIN, TOKEN } from "../../util/setting/config";
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap, navigate) => {
   
   return async (dispatch) => {
      
      try {
         const result = await axios({
            // url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
            url: `https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap`,
            method: "POST",
            data: thongTinDangNhap,
            // headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
         });

         if (result.status === 200) {
            dispatch({
               type: DANG_NHAP_ACTION,
               thongTinDangNhap: result.data.content,
            });
            navigate(-1) // quay lại trang trước đó

         }
      } catch (errors) {
         console.log("that bai", errors);
      }
   };
};
