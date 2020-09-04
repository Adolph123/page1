const axios = require('axios');

//获取商品详情
export function getdislist(apiurl,data){
  const url = `${this.apiurlShop}/api/${apiurl}`;
  let tokens = localStorage.getItem('token');
  // console.log(url)
  return axios.post(url, data,{
    headers: {
      'content-type': 'application/json',
      "token": tokens
    }
  }).then( (res)=> {
    // console.log(res.data,"@@@@@@@@@@@@@@@@");
    return Promise.resolve(res.data)
  }).catch((err)=> {
    console.log(err,"@@@@@@@@@@@@@@@@");
  })
}
