import {
    getRequest,
    postRequest,
    postTransformRequest,
    getRequestBlob
} from '../axios/index';

export const login = (params: any) => {
    return postRequest('/sys/login', params)
}

export const logout = (params: any) => {
    return getRequest('/sys/logout', params)
}

export const getUserInfo = (params: any) => {
    return getRequest('/sys/user/info', params)
}

export const getActuatorHealth = (params: any) => {
    return getRequest('/actuator/health', params)
}

export const getExele = (params: any) => {
    return getRequestBlob('/expor', params)
}

/------菜单------/
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

/------角色-----/
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

/--------用户------/
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

/-------定时任务-------/
export const quaryAllTask = (params: any) => {
    return getRequest('/sys/task/quaryAllTask', params)
}
export const startTask = (params: any) => {
    return postRequest('/sys/task/startTask', params)
}
export const pauseTask = (params: any) => {
    return postTransformRequest('/sys/task/pauseTask', params)
}
export const resumeTask = (params: any) => {
    return postTransformRequest('/sys/task/resumeTask', params)
}
export const deleteTask = (params: any) => {
    return postTransformRequest('/sys/task/deleteTask', params)
}
export const modifyTask = (params: any) => {
    return postRequest('/sys/task/modifyTask', params)
}

/------七牛云------/
export const uploadQiniu = () => {
    return window.location.origin + '/meng/sys/qiniu/upload'
}
export const quaryAllPicture = (params: any) => {
    return getRequest('/sys/picture/quaryAllPicture', params)
}
