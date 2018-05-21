import Cookies from 'js-cookie'

const TokenKey = 'AddressToken'

export function setCookie(value)
{   
    return Cookies.set(TokenKey,value)
}
export function getCookie()
{
    return Cookies.get(TokenKey)
}
export function removeCookie()
{
    return Cookies.remove(Tokenkey)
}