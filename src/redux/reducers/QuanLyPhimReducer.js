import { SET_DANH_SACH_PHIM, SET_FILTER_FILM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType"

const stateDefault = {
  arrFilm: [
    {
      "maPhim": 10895,
      "tenPhim": "ALIENOID: Cuộc Chiến Xuyên Không",
      "biDanh": "alienoid-cuoc-chien-xuyen-khong",
      "trailer": "https://www.youtube.com/embed/RxeQFo99XWQ",
      "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/alienoid-cuoc-chien-xuyen-khong_gp00.png",
      "moTa": "Năm 2022, 34534hai người ngoài hành tinh là Guard (Kim Woo-bin) và Thunder sinh sống tại Trái Đất đang tìm kiếm những tù nhân vượt ngục, vốn bị họ giam giữ trong cơ thể con người. Cảnh sát Moon (So Ji-sub) vô tình trở thành đối tượng bị truy đuổi mà không rõ lý do. Cùng lúc đó, ở triều đại Goryeo hơn 630 năm về trước, pháp sư xui xẻo Muruk (Ryu Jun-yeol) và “cô gái bắn sấm sét” Ean (Kim Tae-ri) đang cố gắng tranh giành một thanh gươm thần huyền thoại. Cuộc chiến khốc liệt ấy còn có sự tham gia của hai phù thủy hắc ám là Madam Black (Yum Jung-ah) và Mr. Blue (Jo Woo-Jin), cùng kẻ đeo mặt nạ bí ẩn Jajang (Kim Eui-sung). Một cánh cổng thời gian xuất hiện và mở ra sự kết nối giữa hai thời đại, tạo nên tình huống hỗn loạn chưa từng thấy.",
      "maNhom": "GP00",
      "ngayKhoiChieu": "2023-05-30T14:34:55.713",
      "danhGia": 10,
      "hot": false,
      "dangChieu": true,
      "sapChieu": true
    }
  ],
  filmFilter: [],
  filmDetail: {},
  dangChieu: true,
  sapChieu: true,
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {

    // case SET_DANH_SACH_PHIM: {
    //     state.arrFilm = action.arrFilm.filter(film =>
    //         film.dangChieu === state.dangChieu && film.sapChieu === state.sapChieu)
    //     return { ...state }
    // }
    case SET_DANH_SACH_PHIM: {
      state.arrFilm = action.arrFilm
      return { ...state }
    }

    case SET_FILTER_FILM: {
      return { ...state, filmFilter: state.arrFilm.filter(item => item?.[action.payload] === true) }
    }

    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail
      return { ...state }
    }

    default: return { ...state }

  }
}