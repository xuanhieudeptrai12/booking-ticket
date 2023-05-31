// kiểm tra đoạn này sau

import Axios from "axios"
import { DOMAIN, TOKEN } from "../util/setting/config"



//put json về phía backend
export const usePutAPI = async (url, model) => {
    return await Axios({
        url: `${DOMAIN}${url}`,
        method: 'PUT',
        data: model,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
    })
}

export const usePostAPI = async (url, model) => {
    return await Axios({
        url: `${DOMAIN}${url}`,
        method: 'POST',
        data: model,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
    })
}

export const useGetAPI = async (url) => {
    return await Axios({
        url: `${DOMAIN}${url}`,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    })
}

export const useDeleteAPI = async (url) => {
    return await Axios({
        url: `${DOMAIN}${url}`,
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    })
}

