import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import {
   DANG_NHAP_ACTION,
   SET_THONG_TIN_NGUOI_DUNG,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
   user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

//Nhan ctrl + shilf + p => setting UI or code(json)
//search format on save => ctrl S => save
// Search tab => chon editor: tab Size => sua lai nhu y muon
// DUm e đg viet huong dan
const stateDefault = {
   userLogin: user,
   thongTinNguoiDung: {},
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
   switch (action.type) {
      case DANG_NHAP_ACTION: {
         const { thongTinDangNhap } = action;
         localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
         localStorage.setItem(
            TOKEN,
            JSON.stringify(thongTinDangNhap.accessToken)
         );
         return { ...state };
      }
      //không phải lỗi
      //
      case SET_THONG_TIN_NGUOI_DUNG: {
         state.thongTinNguoiDung = action.thongTinNguoiDung;
         return { ...state };
      }

      default:
         return { ...state };
   }
};
