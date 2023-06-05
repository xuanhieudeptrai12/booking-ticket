import React, { useEffect } from "react";
import { Carousel } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";

function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch()

    const contentStyle = {
        height: '700px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    //gọi api 1 lần
    useEffect(() => {
        //tách riêng cái action ra 1 file và dispatch cái action đó
        const action = getCarouselAction()

        // dispatch chỉ dc truyền vào 2 loại
        // loại 1: object => {type: 'tên của case', data (để update state)}
        // loại 2: truyền vào 1 func (phải cài middleware thông qua redux thunk)
        dispatch(action)


        //phần code trong use effect này là
        // gọi hàm getCarouselAction(), hàm này sẽ trả về 1 hàm callback chưa được gọi
        //khi dispatch hoạt động, redux thunk sẽ tự động gọi callback func (ở đây là hàm async)
        //all back này và trả về dữ liệu như logic của hàm rồi đẩy lên reducer xử lí dữ liệu

    }, [])

    return (
        <Carousel effect="fade">
            {arrImg.map((item, id) =>
                <div
                    key={id}
                >
                    <div
                        style={
                            {
                                ...contentStyle,
                                backgroundImage: `url(${item.hinhAnh})`
                            }}>
                        <img
                            src={item.hinhAnh}
                            alt={item.hinhAnh}
                            className="w-full opacity-0"
                        />
                    </div>
                </div>
            )}
        </Carousel>
    );
}

export default HomeCarousel;