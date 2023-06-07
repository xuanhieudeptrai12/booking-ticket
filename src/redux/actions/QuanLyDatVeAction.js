import axios from "axios";
import { DOMAIN } from "../../util/setting/config";
import { SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";
import { GetBannerFromAPI } from '../../services/QuanLyPhimService'
import { useGetAPI } from "../../services/baseService";


export const layChiTietPhongVeAction = (maLichChieu) => {

    return async (dispatch) => {
        try {
            
            const result = await axios({
                url: `${DOMAIN}//api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
                method: "GET",
            })
            
            //đưa lên reducer
            console.log(result);

            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }

        } catch (errors) {
            console.log('errors', errors.response?.data);
            console.log('errors', errors);
        }
    }

}