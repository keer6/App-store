import request from './../http'


// 获取app列表接口
export function getAppList(params) {
  return request({
    url: 'appListData',
    params,
    method: 'get'
  })
}
// 获取推荐app列表接口
export function getRecomendList(params) {
  return request({
    url: 'recomendData',
    params,
    method: 'get'
  })
}
