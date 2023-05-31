//kiểm tra đoạn này sau ádasdasdas

import {
    usePutAPI,
    usePostAPI,
    useGetAPI,
    useDeleteAPI
} from "./baseService";

export const GetBannerFromAPI = () => useGetAPI('/api/QuanLyPhim/LayDanhSachBanner')