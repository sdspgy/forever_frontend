import {
    getRequest,
    postRequest,
    postTransformRequest
} from '../axios/index';

export const queryMenuRouter = (params:any) => {
    return getRequest('/sys/menu/menuRouter', params)
}
