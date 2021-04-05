import { request } from '../utils/request'
export function getAlbumDetail(data, id) {
  return request({
    url: `/v1/wallpaper/album/${id}/wallpaper`,
    method: 'get',
    data // 都是data，没有params
  })
}