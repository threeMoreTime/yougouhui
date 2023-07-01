// 存放token
export const setToken=(token)=>{
 localStorage.setItem('TOKEN',token)
}
// 获取token
export const getToken=()=>{
   return localStorage.getItem('TOKEN')
}
// 清除token
export const deleteToken=()=>{
   return localStorage.removeItem('TOKEN')
}