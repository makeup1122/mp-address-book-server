import { setCookie} from '@/utils/auth'

export function login(username,password) {
    return new Promise((resolve,reject)=>{
        if(username === 'admin' && password === "123123")
        {
            setCookie(username)
            resolve({name:username})
        }else{
            reject(new Error('账户或密码错误！'))
        }
        
    })
}