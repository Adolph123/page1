const axios = require('axios');

//获取商品数据
export function getdislist(apiurl,data){
  const url = `https://server.ulam.top/shop/api/${apiurl}`;
  // const url = `http://39.98.249.37:10017/api/${apiurl}`;


  let tokens = localStorage.getItem('token');

  return axios.post(url,data,{
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
//修改 ulam 兑换 uem
export function getdislistset(apiurl,data){
  const url = `${this.apiurl}${apiurl}`;
  let tokens = localStorage.getItem('token');
  // console.log(tokens,typeof tokens,'tokens')
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


//获取文章数据  5301
export function getdiswenlist(apiurl,data){
  const url = `https://server.ulam.top/article/api/${apiurl}`;
  let tokens = localStorage.getItem('token');
  // console.log(tokens,typeof tokens,'tokens')
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


//上传图片
export function getdislists(apiurl,data){
  const url = `${this.apiurlShop}/api/${apiurl}`;
  let tokens = localStorage.getItem('token');
  // console.log(tokens,typeof tokens,'tokens')
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

//直播
export function getliveData(apiurl,data){
  const url = `https://server.ulam.top/live/api/${apiurl}`;
  let tokens = localStorage.getItem('token');
  return axios.post(url, data,{
    headers: {
      'content-type': 'application/json',
      "token": tokens
    }
  }).then( (res)=> {
    return Promise.resolve(res.data)
  }).catch((err)=> {
    console.log(err,"@@@@@@@@@@@@@@@@");
  })
}


//上传直播图片
export function getlivesdislists(apiurl,data){
  const url = `http://39.98.249.37:5006/api/${apiurl}`;
  let tokens = localStorage.getItem('token');
  return axios.post(url, data,{
    headers: {
      'content-type': 'application/json',
      "token": tokens
    }
  }).then( (res)=> {
    return Promise.resolve(res.data)
  }).catch((err)=> {
    console.log(err,"@@@@@@@@@@@@@@@@");
  })
}
