import axios from 'axios'
import router from '../router'
import Vue from 'vue'
let host = this.apiurl
let host1 = 'http://39.98.249.37:5301/api/user/login'
//退出登录缓存
function out() {
    localStorage.removeItem("user");
    localStorage.removeItem("huatx");
    localStorage.removeItem("wallet");
    localStorage.removeItem("jinmi");
    if(router.currentRoute.path == '/login'){
      console.log('无需跳转')
    }else{
      router.push('/login')
    }
}
//登录- 用户个人信息
export const login = params => { return axios.post(`${host}/login`,params).then(response => {
   if(response.status ==201){
     if(response.data == 'password_error' || response.data == 'error'){
       Vue.$vux.toast.show({type:'cancel', text: '账户密码有误~',time:1500})
       setTimeout(() => {out()},1500)
       return
     }
     let a = response.data[0];
     if(a.hasOwnProperty("power") && a.hasOwnProperty("reward")){
       let bs = {
         "drawback_passwd":ss.drawback_passwd,
         'hu':params.mobile,'mima':params.password,  //账户  和 密码
         'admin':a.admin,        //管理员
         'jl': a.reward ,'sl': a.power ,   //奖励  和 算力
         'one':a.level_1 ,'two':a.level_2, //一级  和 二级
         'ren':a.confirm,     //认证
         'name':a.name,'ma':a.expand_num_self, //名字  和 推荐码
         'sma':a.expand_num,   //上级码
         'take':a.drawback,'xl':a.reward_miner  //提取的奖励  和 推荐下级的奖励

       }
       localStorage.setItem("user",JSON.stringify(bs));

       //创建资讯
       localStorage.setItem("community",'');



       if(router.currentRoute.path == '/user'){
         Vue.$vux.toast.show({type:'text', text: '刷新成功', time:1000})
       }
       return 'succ'
     }
   }
     return response
}).catch(error => {
  Vue.$vux.toast.show({type:'text', text: '网络不给力~', time:1000})
})}

export const get_token = params => { return axios.post(`${host1}`,params).then(response => {
   if(response.data.status =='token'){
     if(response.data.status == 'tokenFail'){
       Vue.$vux.toast.show({type:'cancel', text: '账户密码有误~',time:1500})
       setTimeout(() => {out()},1500)
       return
     }
     let a = response.data.token;
       localStorage.setItem("token",a);

       return 'succ'
     }

     return 'succ'
}).catch(error => {
  Vue.$vux.toast.show({type:'text', text: '网络不给力~', time:1000})
})}


