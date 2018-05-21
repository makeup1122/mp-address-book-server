import request from '@/utils/request'

export function fetchList(tablexid) {
    return request({
        url: '/db/members',
        method: 'get',
        params:{
            tablexid
        }
      })
}