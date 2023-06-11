import React, { useEffect } from "react";
import Checkout from "../../pages/Checkout/Checkout";
import { USER_LOGIN } from "../../util/setting/config";
import { useNavigate } from "react-router-dom";

function CheckoutTemplate() {
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem(USER_LOGIN)) {
         navigate("/login");
      }
   }, []); //hàm navigate là hàm bất đồng bộ nên phải để trong useEffect

   return <Checkout />;
}

export default CheckoutTemplate;
