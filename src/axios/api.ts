import {
    getRequest,
    postRequest,
    postTransformRequest
} from '../axios/index';

export const getRequestDemo = (params: Object) => {
    return getRequest('/', params)
}
