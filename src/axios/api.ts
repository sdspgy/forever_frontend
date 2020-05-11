import {
    getRequest,
    postRequest,
    postTransformRequest
} from '../axios/index';

export const login = (params: any) => {
    return postRequest('/sys/login', params)
}

export const getUserInfo = (params: any) => {
    return getRequest('/sys/user/info', params)
}

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

export const queryAllRoles = (params: any) => {
    return postRequest('/sys/role/queryAllRoles', params)
}

export const insertRole = (params: any) => {
    return postTransformRequest('/sys/role/insertRole', params)
}

export const updateRole = (params: any) => {
    return postRequest('/sys/role/updateRole', params)
}

export const deleteRole = (roleId: any, params: any) => {
    return postRequest(`/sys/role/deleteRole/${roleId}`, params)
}

export const queryAllMenuIshave = (roleId: any, params: any) => {
    return postRequest(`/sys/role/queryAllMenuIshave/${roleId}`, params)
}

export const updateRoleMenus = (params: any) => {
    return postTransformRequest('/sys/role/updateRoleMenus', params)
}

export const allUser = (params: any) => {
    return postRequest('/sys/user/allUser', params)
}

export const insertUser = (params: any) => {
    return postTransformRequest('/sys/user/insertUser', params)
}

export const updateUser = (params: any) => {
    return postRequest('/sys/user/updateUser', params)
}

export const deletetUser = (userId: any, params: any) => {
    return postRequest(`/sys/user/deletetUser/${userId}`, params)
}

export const updateUserRoles = (params: any) => {
    return postTransformRequest('/sys/user/updateUserRoles', params)
}

export const changePassword = (params: any) => {
    return postTransformRequest('/sys/user/changePassword', params)
}

export const changeUserHeadUrl = (params: any) => {
    return getRequest('/sys/user/changeUserHeadUrl', params)
}
