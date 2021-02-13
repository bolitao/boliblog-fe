import axios from 'axios'
import Element from 'element-ui'
import store from './store'

axios.defaults.baseURL = 'http://192.168.79.129:8899'

// TODO

// 前置拦截
axios.interceptors.request.use(config => {
    // 携带 token
    return config
})

// 后置拦截
axios.interceptors.response.use(function (response) {
    let respData = response.data
    if (respData.code === '1') {
        return response;
    } else {
        // http status 为 200，但业务码不为 1 时，提示错误
        Element.Message.error(respData.message == null ? 'ERROR' : respData.message, {duration: 3 * 1000});
    }
}, function (error) {

    // // 判断是否是登陆相关错误
    // if (401 === error.response.status) {
    //     // TODO: 登陆出错则移除登录信息
    //     store.commit('REMOVE_INFO')
    // }

    // 返回后端提示
    Element.Message.error(error.response.data.message, {duration: 3 * 1000});
    return Promise.reject(error.response.data.message);
});
