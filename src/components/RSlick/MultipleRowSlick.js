import React from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film_Flip from "../Film/Film_Flip";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch } from "react-redux";
import { layDanhSachPhimDangChieuAction, layDanhSachPhimSapChieuAction } from "../../redux/actions/QuanLyPhimAction";




function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}

const MultipleRowSlick = (props) => {
    const dispatch = useDispatch()

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const renderFilms = () => {
        return props.arrFilm.map((item, index) => {
            return (
                <div key={index}>
                    {/* <Film phim={item} /> */}
                    <Film_Flip item={item} />
                </div>
            );
        });
    }


    return (
        <div>
            <button
                className="px-8 py-3 font-semibold border rounded bg-gray-800 text-white mr-2"
                onClick={() => {
                    dispatch(layDanhSachPhimDangChieuAction())
                }}
            >
                Phim đang chiếu
            </button>

            <button
                className="px-8 py-3 font-semibold rounded bg-white text-gray-800 border"
                onClick={() => {
                    dispatch(layDanhSachPhimSapChieuAction())
                }}
            >
                Phim sắp chiếu
            </button>

            <Slider {...settings}>
                {renderFilms()}
            </Slider>
        </div>
    );
}

export default MultipleRowSlick;