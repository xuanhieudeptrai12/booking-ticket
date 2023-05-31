
import { Fragment } from 'react'
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel'
import Home from '../../pages/Home/Home'

export const HomeTemplate = (props) => {

    return <>
        <Header />
        <HomeCarousel />
        <Home />
        <Footer />
    </>


}

