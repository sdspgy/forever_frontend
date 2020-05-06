import {
    getRequest,
    postRequest,
    postTransformRequest
} from '../axios/index';

export const queryMenuRouter = (params: any) => {
    return getRequest('/sys/menu/menuRouter', params)
}

export const queryMenuTree = (params: any) => {
    return getRequest('/sys/menu/menuTree', params)
}

export const login = (params: any) => {
    return postRequest('/admin/sys/login', params)
}
