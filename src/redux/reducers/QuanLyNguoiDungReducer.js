import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import {
   DANG_NHAP_ACTION,
   SET_AUTHEN,
   SET_PREVIOU_LOCATION,
   SET_THONG_TIN_NGUOI_DUNG,
   UP_DATE_NGUOI_DUNG,
   USER_LOGOUT,
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
   currentUser: user,
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
      case UP_DATE_NGUOI_DUNG: {
         const isAuthenticated = action.payload?.taiKhoan ? true : false;
         return {
            ...state,
            currentUser: action.payload,
            isAuthenticated: isAuthenticated,
         };
      }
      //không phải lỗi
      case SET_THONG_TIN_NGUOI_DUNG: {
         state.thongTinNguoiDung = action.thongTinNguoiDung;
         return { ...state };
      }
      //set case USER_SIGNUP_SUCCESS
      case USER_SIGNUP_SUCCESS: {
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

      case USER_LOGOUT: {
         localStorage.removeItem(USER_LOGIN);
         localStorage.removeItem(TOKEN);
         return {
            ...state,
            currentUser: {},
            isAuthenticated: false,
         };
      }
      default:
         return { ...state };
   }
};
