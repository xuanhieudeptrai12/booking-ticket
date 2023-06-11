import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import {
   DANG_NHAP_ACTION,
   SET_AUTHEN,
   SET_PREVIOU_LOCATION,
   SET_THONG_TIN_NGUOI_DUNG,
   USER_SIGNUP_SUCCESS,
} from "../actions/types/QuanLyNguoiDungType";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
   user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
   userLogin: user,
   thongTinNguoiDung: {},
   isAuthenticated: false,
   previousLocation: "/",
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
      //set case USER_SIGNUP_SUCCESS
      case USER_SIGNUP_SUCCESS: {
         console.log(action.payload);
         return { ...state };
         //  return { ...state, dataSignUp: action.payload, errSignUp: null };
      }

      case SET_AUTHEN: {
         // set về true chứng tỏ đã đăng nhập
         return { ...state, isAuthenticated: true, previousLocation: "" };
      }
      case SET_PREVIOU_LOCATION: {
         return { ...state, previousLocation: action.payload };
      }
      default:
         return { ...state };
   }
};
