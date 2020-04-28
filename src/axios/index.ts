import axios from 'axios'
import {getStore} from '@/store/storage'

// 统一请求路径
export const basePath = '/meng'

// 超时设定
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => {
    return config;
}, err => {
    alert('请求超时');
    return Promise.resolve(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    if (response.data instanceof Blob) {
        return response;
    }
    const data = response.data;
    // 根据返回的code值来做不同的处理(和后端约定)
    switch (data.code) {
        case 401:
            break;
        case 403:
            break;
        case 500:
            break;
        case 505:
            break;
        default:
            return data;
    }
    return data;
}, (err) => {
    // 返回状态码不为200时候的错误处理
    alert(err.toString());
    return Promise.resolve(err);
});

export const getRequest = (url: string, params: Object) => {
    let token = getStore('token');
    return axios({
        method: 'get',
        url: `${basePath}${url}`,
        params: params,
        headers: {
            'token': token
        }
    });
};

export const postRequest = (url: string, params: Object) => {
    debugger
    let token = getStore('token');
    return axios({
        method: 'post',
        url: `${basePath}${url}`,
        data: params,
        headers: {
            'token': token
        }
    });
}

export const postTransformRequest = (url: string, params: Object) => {
    let token = getStore('token');
    return axios({
        method: 'post',
        url: `${basePath}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': token
        }
    });
};
