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

export const insertMenu = (params: any) => {
    return postRequest('/sys/menu/insertMenu', params)
}

export const updateMenu = (params: any) => {
    return postRequest('/sys/menu/updateMenu', params)
}

export const deleteMenu = (params: any) => {
    return postTransformRequest('/sys/menu/deleteMenu', params)
}

export const login = (params: any) => {
    return postRequest('/admin/sys/login', params)
}
