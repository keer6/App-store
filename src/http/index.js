import axios from 'axios'
import qs from 'qs'

// 配置请求基地址
const service = axios.create({
    baseURL: '/'
})

// 添加请求拦截器
service.interceptors.request.use(config => {
    config.data = qs.stringify(config.data)
    return config
}, error => {
    Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        return response.data
    },
    (err) => {
        console.log(err)
    }
)

export default service
