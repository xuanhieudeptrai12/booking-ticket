import {
   CHANGE_TAB_ACTIVE,
   CHUYEN_TAB,
   DAT_VE,
   DAT_VE_HOAN_TAT,
   SET_CHI_TIET_PHONG_VE,
} from "../actions/types/QuanLyDatVeType";

const stateDefault = {
   chiTietPhongVe: {},
   danhSachGheDangDat: [],
   danhSachGheKhachDat: [{ maGhe: 48041 }, { maGhe: 48042 }],
   // [{maGhe:48041},{maGhe:48042}],
   tabActive: "1",
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
   switch (action.type) {
      case SET_CHI_TIET_PHONG_VE: {
         state.chiTietPhongVe = action.chiTietPhongVe;
         return { ...state };
      }

      case DAT_VE: {
         //cập nhập danh sách ghế đang đặt
         let danhSachGheCapNhap = [...state.danhSachGheDangDat];

         //click vào ghế rồi thì sẽ update trong danh sách này
         //biến index để tìm ra chính xác ghế được chọn
         let index = danhSachGheCapNhap.findIndex(
            (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
         );

         if (index === -1) {
            // index bằng -1 tức là chưa có trong mảng thì sẽ thêm vào mảng
            danhSachGheCapNhap.push(action.gheDuocChon);
         } else {
            //ngược lại đã có rồi thì xóa nó ra
            danhSachGheCapNhap.splice(index, 1);
         }

         //cập nhập lại state và field danhSachGheDangDat
         return { ...state, danhSachGheDangDat: danhSachGheCapNhap };
      }
      case DAT_VE_HOAN_TAT: {
         state.danhSachGheDangDat = [];
         return { ...state };
      }
      case CHUYEN_TAB: {
         state.tabActive = "2";
         return { ...state };
      }
      case CHANGE_TAB_ACTIVE: {
         state.tabActive = action.number;
         return { ...state };
      }
      default:
         return { ...state };
   }
};
