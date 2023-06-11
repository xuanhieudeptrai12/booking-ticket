import React from "react";
import { useSelector } from "react-redux";
import loadingIcon from "../../assets/image/loadingIcon.gif";

function Loading() {
   const { isLoading } = useSelector((state) => state.LoadingReducer);
   return (
      <>
         {isLoading ? (
            <div
               style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 99,
               }}
            >
               {/* <div className="text-4xl text-white">Loading ...</div> */}
               <img src={loadingIcon} alt="123" />
            </div>
         ) : (
            ""
         )}
      </>
   );
}

export default Loading;
