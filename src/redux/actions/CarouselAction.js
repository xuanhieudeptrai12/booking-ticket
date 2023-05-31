import axios from "axios";
import { DOMAIN } from "../../util/setting/config";
import { SET_CAROUSEL } from "./types/CarouselType";
import { GetBannerFromAPI } from '../../services/QuanLyPhimService'


export const getCarouselAction = () => {

    return async (dispatch) => {
        try {
            // const result = await GetBannerFromAPI()
            const result = await axios({
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                method: "GET",
            })

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