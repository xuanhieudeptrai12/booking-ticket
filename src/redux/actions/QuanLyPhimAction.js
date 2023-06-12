import { DOMAIN, GROUPID } from "../../util/setting/config";
import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "./types/QuanLyPhimType";
import axios from 'axios'



export const layDanhSachPhimAction = () => {

    return async (dispatch) => {
        try {

            const result = await axios({
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`,
                method: "GET",
            })
            // console.log(result);
            //sau khi lấy được dữ liệu về đưa lên reducer
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })

        } catch (errors) {
            console.log('errors', errors);
        }
    }
}

