import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import HomeCarousel from "../../teamplates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
//kết nối redux
// import { QuanLyPhimService } from '../../services/QuanLyPhimService'
// import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import {
   DISPLAY_LOADING,
   HIDE_LOADING,
} from "../../redux/actions/types/LoadingType";
function Home(props) {
   const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
   const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
   const dispatch = useDispatch();

   useEffect(() => {
      const awaitLoadingData = async () => {
         try {
            await dispatch({ type: DISPLAY_LOADING });

            // vừa vào trang web là dispatch để lấy danh sách phim
            await dispatch(layDanhSachPhimAction());

            //lấy danh sách rạp chiếu
            await dispatch(layDanhSachHeThongRapAction());

            await dispatch({ type: HIDE_LOADING });
         } catch (error) {
            // Xử lý lỗi nếu có thì cũng tắt loading
            await dispatch({ type: HIDE_LOADING });
            console.log(error);
         }
      };

      awaitLoadingData();
   }, []);

   return (
      <div>
         <HomeCarousel />
         <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto ">
               <MultipleRowSlick arrFilm={arrFilm} />
            </div>
         </section>
         <div className="container px-5 py-24 mx-auto ">
            <HomeMenu heThongRapChieu={heThongRapChieu} />
         </div>
      </div>
   );
}

export default Home;
