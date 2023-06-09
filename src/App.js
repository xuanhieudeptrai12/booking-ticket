import "./App.css";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeTemplate } from "./teamplates/HomeTemplate/HomeTemplate";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./teamplates/CheckoutTemplate/CheckoutTemplate";
import UserTemplate from "./teamplates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";

export const history = createBrowserHistory();

function App() {
   return (
      <Router>
         <Loading />
         <Routes>
            <Route path="/home" element={<HomeTemplate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<UserTemplate />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomeTemplate />} />
            <Route path="/checkout/:id" element={<CheckoutTemplate />} />
         </Routes>
      </Router>
   );
}

export default App;
