import React, { memo, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

function HomeMenu(props) {
   //thấy thông tin tên rạp từ props
   const { heThongRapChieu } = props;

   return (
      <>
         <Tabs tabPosition={"left"} className="border">
            {heThongRapChieu.map((rap, index) => {
               return (
                  <TabPane
                     tab={
                        <div
                           style={{
                              width: "60px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                           }}
                        >
                           <img
                              src={rap.logo}
                              className="rounded-full"
                              width="50"
                              alt=""
                           />
                           <br />
                           <div
                              style={{
                                 width: "100%",
                                 height: "1px",
                                 backgroundColor: "#e5e7eb",
                              }}
                           />
                        </div>
                     }
                     key={index}
                  >
                     <Tabs tabPosition={"left"}>
                        {rap.lstCumRap?.slice(0, 8).map((cumRap, id) => (
                           <TabPane
                              key={id}
                              style={{
                                 height: "700px",
                                 overflow: "scroll",
                                 overflowX: "hidden",
                                 minHeight: "710px",
                              }}
                              className="my-scrollbar"
                              tab={
                                 <div className="flex flex-col">
                                    <div
                                       style={{
                                          width: "300px",
                                          display: "flex",
                                          alignItems: "center",
                                       }}
                                    >
                                       <img
                                          src={cumRap.hinhAnh}
                                          className="rounded-full"
                                          width="50"
                                          alt="123"
                                       />
                                       <br />
                                       <div className="text-left ml-2">
                                          {cumRap.tenCumRap}
                                          <p className="text-red-200">
                                             Chi tiet
                                          </p>
                                       </div>
                                    </div>
                                    <div
                                       style={{
                                          width: "100%",
                                          height: "1px",
                                          backgroundColor: "#e5e7eb",
                                          marginTop: "14px",
                                       }}
                                    />
                                 </div>
                              }
                           >
                              {cumRap.danhSachPhim?.map((phim, index) => (
                                 <Fragment key={index}>
                                    <div
                                       className="my-5"
                                       style={{
                                          display: "flex",
                                          flexDirection: "column",
                                       }}
                                    >
                                       <div style={{ display: "flex" }}>
                                          <img
                                             style={{
                                                width: "100px",
                                                height: "100px",
                                             }}
                                             src={phim.hinhAnh}
                                             alt={phim.tenPhim}
                                          />
                                          <div className="ml-2">
                                             <h1 className="ml-2 text-2xl text-green-700">
                                                {phim.tenPhim}
                                             </h1>
                                             <p className="ml-2">
                                                {cumRap.diaChi}
                                             </p>
                                          </div>
                                       </div>
                                       <div className="grid grid-cols-9 gap-3 mt-2 mr-5">
                                          {phim.lstLichChieuTheoPhim
                                             ?.slice(0, 12)
                                             .map((lichChieu, index) => (
                                                <NavLink
                                                   key={index}
                                                   to="/detail"
                                                   className="w-24 text-base text-green-400  border px-3 py-1 rounded-lg h-9 transition duration-300 ease-in-out hover:bg-green-400 hover:text-white hover:shadow-md"
                                                >
                                                   {/* <button></button> */}
                                                   <span>
                                                      {moment(
                                                         lichChieu.ngayChieuGioChieu
                                                      ).format("hh:mm A")}
                                                   </span>
                                                </NavLink>
                                             ))}
                                       </div>
                                       <hr className="mt-2" />
                                    </div>
                                 </Fragment>
                              ))}
                           </TabPane>
                        ))}
                     </Tabs>
                  </TabPane>
               );
            })}
         </Tabs>
      </>
   );
}

export default memo(HomeMenu);
