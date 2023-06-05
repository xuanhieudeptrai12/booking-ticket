import axios from "axios";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";
import { DOMAIN, GROUPID } from "../../util/setting/config";


export const layDanhSachHeThongRapAction = () => {
    return async dispatch => {
        try {

            const result = await axios({
                url: `${DOMAIN}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`,
                method: "GET",
            })
            if (result.status === 200) {

                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                })

            }


        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinChiTietPhim = (id) => {
    return async dispatch => {
        try {

            const result = await axios({
                url: `${DOMAIN}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
                method: "GET",
            })

            //nếu thành công thì đưa lên reducer
            if (result.status === 200) {

                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    filmDetail: result.data.content
                })

            }


        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

