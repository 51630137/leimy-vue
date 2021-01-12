import axios from 'axios'
import { Message } from 'element-ui';
const service = axios.create({
  baseURL: '/',
  timeout: 10000 // 默认请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Message({
      type:'error',
      message:'系统异常，请及时联系管理员'
    })
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code ===200){
      return res
    }
    else{
      //非200表示接口异常 认为报错
      Message({
        type:'error',
        message:res.msg
      })
      this.$message.error(res.msg)
    }
    
  },
  error => {
    //接口请求报错（http）
  }
)

export default service
