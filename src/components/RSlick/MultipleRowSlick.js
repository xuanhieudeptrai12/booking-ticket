import React, { useMemo, useState } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film_Flip from "../Film/Film_Flip";
import { SET_FILTER_FILM } from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch, useSelector } from "react-redux";

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
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)
    const { arrFilm, filmFilter } = useSelector(state => state.QuanLyPhimReducer)
    const [filter, setFilter] = useState('')
    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film'
    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film'

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
    console.log(1, arrFilm);
    const renderFilms = () => {
        return data.map((item, index) => {
            return (
                <div key={index}>
                    {/* <Film phim={item} /> */}
                    <Film_Flip item={item} />
                </div>
            );
        });
    }

    const data = useMemo(() => {
        if (filter === '') {
            return arrFilm
        } else {
            return filmFilter
        }
    }, [filter, arrFilm, filmFilter])

    const handleFilterFilm = (type) => {
        dispatch({
            type: SET_FILTER_FILM,
            payload: type
        })
        setFilter(type)
    }

    return (
        <div>
            <button
                className={` ${styleSlick[activeClassDC]} px-8 py-3 font-semibold border rounded bg-gray-800 text-white mr-2`}
                onClick={() => handleFilterFilm('dangChieu')}
            >
                Phim đang chiếu
            </button>

            <button
                className={` ${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border`}
                onClick={() => handleFilterFilm('sapChieu')}
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