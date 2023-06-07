import { TOKEN, USER_LOGIN } from "../../util/setting/config"
import { DANG_NHAP_ACTION } from "../actions/types/QuanLyNguoiDungType"


let user = {}

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault= {
    userLogin: user,
}
    

export const QuanLyNguoiDungReducer  = (state = stateDefault, action) => {
    switch (action.type) {
        
        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap))
            localStorage.setItem(TOKEN,JSON.stringify(thongTinDangNhap.accessToken))
        }
            
    
        default: return { ...state }
            
    }
}