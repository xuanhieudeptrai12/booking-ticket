import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
//kết nối redux
// import { QuanLyPhimService } from '../../services/QuanLyPhimService'
// import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()
    console.log(arrFilm);

    useEffect(() => {
        const action = layDanhSachPhimAction()
        dispatch(action)
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-24 mx-auto " >
                    <MultipleRowSlick arrFilm={arrFilm} />
                </div>
            </section>
            <HomeMenu />
        </div>
    );
}

export default Home;