import { request } from '../utils/request'
export function getRecommend(data) {
  return request({
    url: '/v3/homepage/vertical',
    method: 'get',
    data // 都是data，没有params
  })
}

export function getAlbum(data) {
  return request({
    url: '/v1/wallpaper/album',
    method: 'get',
    data
  })
}

export function getCategory() {
  return request({
    url: '/v1/vertical/category',
    method: 'get'
  })
}

