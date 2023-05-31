//kiểm tra đoạn này sau

import {
    usePutAPI,
    usePostAPI,
    useGetAPI,
    useDeleteAPI
} from "./baseService";

export const GetBannerFromAPI = () => useGetAPI('/api/QuanLyPhim/LayDanhSachBanner')