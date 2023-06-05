import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import HomeCarousel from '../../teamplates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
//kết nối redux
// import { QuanLyPhimService } from '../../services/QuanLyPhimService'
// import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        // vừa vào trang web là dispatch để lấy danh sách phim
        const action = layDanhSachPhimAction()
        dispatch(action)

        //lấy danh sách rạp chiếu
        dispatch(layDanhSachHeThongRapAction())
    }, [])

    return (
        <div>
            <HomeCarousel />
            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-24 mx-auto " >
                    <MultipleRowSlick arrFilm={arrFilm} />
                </div>
            </section>
            <div className="container px-5 py-24 mx-auto " >
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>

        </div>
    );
}

export default Home;