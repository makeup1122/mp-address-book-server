import request from '@/utils/request'

export function fetchList() {
    return request({
        url: '/db/classes',
        method: 'get'
      })
}