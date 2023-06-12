import React, { useEffect, useState } from "react";
import Header from "../../teamplates/HomeTemplate/Layout/Header/Header";
import Footer from "../../teamplates/HomeTemplate/Layout/Footer/Footer";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.css";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import TabPane from "antd/es/tabs/TabPane";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/actions/types/LoadingType";
import { SET_AUTHEN, SET_PREVIOU_LOCATION } from "../../redux/actions/types/QuanLyNguoiDungType";
import { USER_LOGIN } from "../../util/setting/config";

function Detail(props) {
  const [showFullText, setShowFullText] = useState(false)
  const filmDetail = useSelector(
    (state) => state.QuanLyPhimReducer.filmDetail
  );

  let { id } = useParams();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const location = useLocation();
  const previousLocation = location.pathname;

  useEffect(() => {
    !isAuthenticated &&
      dispatch({ type: SET_PREVIOU_LOCATION, payload: previousLocation });
    if (localStorage.getItem(USER_LOGIN)) {
      dispatch({ type: SET_AUTHEN })
    }
  }, []);

  useEffect(() => {
    const awaitLoadingData = async () => {
      try {
        await dispatch({ type: DISPLAY_LOADING });

        // lấy thông tin từ url
        await dispatch(layThongTinChiTietPhim(id));

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
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${filmDetail.hinhAnh})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <CustomCard
          style={{ paddingTop: "150px", minHeight: "120vh" }}
          effectColor="#fff" // required
          color="#fff" // default color is white
          blur={10} // default blur value is 10px
          borderRadius={1} // default border radius value is 10px
        >
          <div className="grid grid-cols-12">
            <div className="col-span-4 col-start-4">
              <div className="grid grid-cols-3">
                <img
                  className="col-span-1"
                  style={{ width: "100%", height: "330px" }}
                  src={filmDetail.hinhAnh}
                  alt={filmDetail.tenPhim}
                />
                <div
                  className="col-span-2 ml-5"
                  style={{ marginTop: "6%" }}
                >
                  <p className="text-base font-thin">
                    Ngày chiếu:{" "}
                    {moment(filmDetail.ngayKhoiChieu).format(
                      "DD.MM.YYYY"
                    )}
                  </p>
                  <p className="text-4xl">
                    {filmDetail.tenPhim}
                  </p>
                  <p>
                    {filmDetail.moTa && (
                      <>
                        <p>
                          {showFullText ? filmDetail.moTa : `${filmDetail.moTa.slice(0, 380)}...`}
                          {filmDetail.moTa.length > 380 && (
                            <span
                              className="ml-2 hover:cursor-pointer"
                              onClick={() => setShowFullText(!showFullText)}
                              style={{ fontSize: '19px', color: '#9a9aea' }}
                            >
                              {showFullText ? 'Ẩn đi' : 'Xem thêm'}
                            </span>
                          )}
                        </p>

                      </>
                    )}
                    {!filmDetail.moTa && <div>Loading...</div>}
                    {/* {filmDetail.moTa && (filmDetail.moTa.slice(0, 430))}
                    {filmDetail.moTa && filmDetail.moTa.length > maxLength && (
                      <span className="ml-1" onClick={() => setShowFullText(!showFullText)}>
                        {showFullText ? 'Ẩn đi' : 'Xem thêm'}
                      </span>
                    )} */}

                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-4 pl-32">
              <h1
                style={{
                  marginLeft: "15%",
                  color: "yellow",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Đánh giá
              </h1>
              <h1
                style={{ marginLeft: "5%" }}
                className="text-green-400 text-2xl"
              >
                <Rate
                  allowHalf
                  value={filmDetail.danhGia / 2}
                  style={{ color: "#78ed78", fontSize: 30 }}
                />
              </h1>
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

          <div className="mt-10 ml-72 w-2/3 container bg-white px-5 py-5">
            <Tabs defaultActiveKey="1" centered>
              <TabPane
                tab="Lịch chiếu"
                key="1"
                style={{ minHeight: 300 }}
              >
                <div>
                  <Tabs tabPosition={"left"}>
                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                      return (
                        <TabPane
                          tab={
                            <div className="flex flex-row items-center justify-center">
                              <img
                                src={htr.logo}
                                className="rounded-full w-full"
                                style={{ width: 50 }}
                                alt="..."
                              />
                              <div className="text-center ml-2">
                                {htr.tenHeThongRap}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          {htr.cumRapChieu?.map(
                            (cumRap, index) => {
                              return (
                                <div
                                  className="mt-5"
                                  key={index}
                                >
                                  <div className="flex flex-row">
                                    <img
                                      style={{
                                        width: 60,
                                        height: 60,
                                      }}
                                      src={cumRap.hinhAnh}
                                      alt="..."
                                    />
                                    <div className="ml-2">
                                      <p
                                        style={{
                                          fontSize: 20,
                                          fontWeight:
                                            "bold",
                                          lineHeight: 1,
                                        }}
                                      >
                                        {cumRap.tenCumRap}
                                      </p>
                                      <p
                                        className="text-gray-400"
                                        style={{
                                          marginTop: 0,
                                        }}
                                      >
                                        {cumRap.diaChi}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="thong-tin-lich-chieu grid grid-cols-12 gap-3 mt-2 mr-5">
                                    {cumRap.lichChieuPhim
                                      ?.slice(0, 12)
                                      .map(
                                        (
                                          lichChieu,
                                          index
                                        ) => {
                                          return (
                                            <Link
                                              to={`/checkout/${lichChieu.maLichChieu}`} state={{ isAuthenticated }}
                                              // onClick={() => navigate(`/checkout/${lichChieu.maLichChieu}`, { isAuthenticated })}
                                              // to={`/checkout/${lichChieu.maLichChieu}`}
                                              key={index}
                                              className="w-24 text-base text-green-400  border px-3 py-1 rounded-lg h-9 transition duration-300 ease-in-out hover:bg-green-400 hover:text-white hover:shadow-md"
                                            ><span>
                                                {moment(
                                                  lichChieu.ngayChieuGioChieu
                                                ).format(
                                                  "hh:mm A"
                                                )}
                                              </span>
                                            </Link>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </TabPane>
                      );
                    })}
                  </Tabs>
                </div>
              </TabPane>
              <TabPane
                tab="Thông tin"
                key="2"
                style={{ minHeight: 300 }}
              >
                Thông tin
              </TabPane>
              <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
                Đánh giá
              </TabPane>
            </Tabs>
          </div>
        </CustomCard>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
