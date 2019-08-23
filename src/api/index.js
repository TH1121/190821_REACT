import ajax from './ajax'

const BASE = ''
// 登陆
export const reqlogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

//添加用户
export const reqAdd = (user) => ajax(BASE + '/manage/user/add', user ,'POST')