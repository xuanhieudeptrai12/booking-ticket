import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Home from "../../pages/Home/Home";

export const HomeTemplate = (props) => {
   return (
      <>
         <Header />
         <Home />
         <Footer />
      </>
   );
};
