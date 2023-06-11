import axios from "axios";
import { DOMAIN, TOKEN } from "../../util/setting/config";
import {
   CHUYEN_TAB,
   DAT_VE_HOAN_TAT,
   SET_CHI_TIET_PHONG_VE,
} from "./types/QuanLyDatVeType";
import {
   displayLoadingAction,
   hideLoadingAction,
} from "../actions/LoadingAction";

export const layChiTietPhongVeAction = (maLichChieu) => {
   return async (dispatch) => {
      try {
         const result = await axios({
            url: `${DOMAIN}//api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
            method: "GET",
         });

         //đưa lên reducer
         console.log(
            result.data.content.danhSachGhe.filter(
               (item) => item.daDat === false
            )
         );

         if (result.status === 200) {
            dispatch({
               type: SET_CHI_TIET_PHONG_VE,
               chiTietPhongVe: result.data.content,
            });
         }
      } catch (errors) {
         console.log("errors", errors.response?.data);
         console.log("errors", errors);
      }
   };
};

export const datVeAction = (thongTinDatVe) => {
   return async (dispatch) => {
      try {
         dispatch(displayLoadingAction);

         const result = await axios({
            url: `${DOMAIN}/api/QuanLyDatVe/DatVe`,
            method: "POST",
            data: thongTinDatVe,
            headers: {
               Authorization:
                  "Bearer " + localStorage.getItem(TOKEN).replace(/"/g, ""),
            }, //JWT
         });

         //đưa lên reducer
         //nếu gọi lên api đặt vé thành công thì gọi lại logic lấy chi tiết phòng vé để load lại chỗ ngồi đã được đặt
         if (result.status === 200) {
            // sau khi đặt vé sau thì đợi hành động gọi lại để update lại vé là đã đặt
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            //xong tiếp tục đợi 1 hành động clear hết thông tin bên tay phải như giá vé, tên người dùng
            await dispatch({
               type: DAT_VE_HOAN_TAT,
            });
            //đợi tắt loading
            await dispatch(hideLoadingAction);

            //rồi chuyển tab
            dispatch({ type: CHUYEN_TAB });
         }
      } catch (errors) {
         dispatch(hideLoadingAction);
         console.log("errors", errors.response?.data);
         console.log("errors", errors);
      }
   };
};
