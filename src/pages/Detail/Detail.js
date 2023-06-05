import React, { useEffect } from "react";
import Header from "../../teamplates/HomeTemplate/Layout/Header/Header";
import Footer from "../../teamplates/HomeTemplate/Layout/Footer/Footer";
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import "../../assets/styles/circle.css"
import { Rate, Tabs } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SET_CHI_TIET_PHIM } from "../../redux/actions/types/QuanLyRapType";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";

function Detail(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
    let { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {

        // lấy thông tin từ url
        dispatch(layThongTinChiTietPhim(id))
    }, [])
    console.log(filmDetail);

    return (

        <>
            <Header />
            <div
                style={{
                    backgroundImage: `url(${filmDetail.hinhAnh})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                }}>
                <CustomCard
                    style={{ paddingTop: '150px', minHeight: '100vh' }}
                    effectColor="#fff" // required
                    color="#fff" // default color is white
                    blur={10} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                >
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 col-start-4">
                            <div className="grid grid-cols-3">
                                <img
                                    className="col-span-1"
                                    style={{ width: '100%', height: '350px' }}
                                    src={filmDetail.hinhAnh}
                                    alt={filmDetail.tenPhim} />
                                <div
                                    className="col-span-2 ml-5"
                                    style={{ marginTop: '6%' }}>
                                    <p className="text-base font-thin">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                    <p className="text-4xl">{filmDetail.tenPhim}</p>
                                    <p>{filmDetail.moTa}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 pl-32">
                            <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                            <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                                <span className="text-white">

                                    {filmDetail.danhGia * 10}%
                                </span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>

                                </div>

                            </div>
                            <br />

                        </div>
                    </div>
                    <div className="mt-24 ml-52">
                        <Tabs
                            tabPosition={'left'}
                            items={new Array(3).fill(null).map((_, i) => {
                                const id = String(i + 1);
                                return {
                                    label: `Tab ${id}`,
                                    key: id,
                                    children: `Content of Tab ${id}`,
                                };
                            })}
                        />
                    </div>
                </CustomCard>
            </div>
            <Footer />
        </>
    );
}

export default Detail;