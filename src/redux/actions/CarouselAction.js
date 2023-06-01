import axios from "axios";
import { DOMAIN } from "../../util/setting/config";
import { SET_CAROUSEL } from "./types/CarouselType";
import { GetBannerFromAPI } from '../../services/QuanLyPhimService'
import { useGetAPI } from "../../services/baseService";


export const getCarouselAction = () => {

    return async (dispatch) => {
        try {
            // const result = await GetBannerFromAPI()
            // const result = await useGetAPI('/api/QuanLyPhim/LayDanhSachBanner')
            // console.log(result);
            const result = await axios({
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                method: "GET",
            })
            // console.log(result);
            //đưa lên reducer
            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            })

        } catch (errors) {
            console.log('errors', errors);
        }
    }

}