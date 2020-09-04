// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
Vue.use(VueAxios, axios);

import router from './router'
import FastClick from 'fastclick';
FastClick.attach(document.body);
import App from './App';


import VueAxios from 'vue-axios';


import Vue2OrgTree from 'vue2-org-tree';
Vue.use(Vue2OrgTree);


import Vuex from 'vuex';
Vue.use(Vuex)


// 设置app物理键返回退出
import Back from '../pf/back';


import 'vue-area-linkage/dist/index.css';
import {pcaa} from "area-data-vue";
Vue.prototype.$pcaa = pcaa;
import AreaLinkageVue from 'vue-area-linkage';
Vue.use(AreaLinkageVue);
//引入ElementUI；
import ElementUI from 'element-ui';
Vue.use(ElementUI);







 //全局初始化//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

// //图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  loading: require('./assets/1.gif'),
});



//配置反向代理 真正上线所需要的api
let base = process.env.NODE_ENV === 'production' ? 'https://api.jinse.com' : 'https://api.jinse.com';
Vue.prototype.baseURL = base;
//配置反向代理
import datePicker from 'multifunctional-datepicker';
Vue.prototype.$datepicker = datePicker;
//主体
Vue.prototype.apiurl = 'https://pool.ulam.top';
//文章
Vue.prototype.apiurlArticle = 'https://server.ulam.top/article';
//商城
Vue.prototype.apiurlShop = 'https://server.ulam.top/shop';
//社区
Vue.prototype.apiurlCommunity = 'https://server.ulam.top/community';


Vue.config.productionTip = false;



const store = new Vuex.Store({
  //state 中申明变量
  state: {
    uri: 'https://pool.ulam.top',
    zuli: { color: '#9a55ff' },
    money:'ulam',
    wens:'',sulam:'',reddian:true,gif2:true,rewared:'',ssk:7,
    //  查询社区回复信息
    shequinfo:{'remindCount':0},
  },
  mutations: {
    goc(state, todos) {
      todos.color = '#9a55ff';
      state.zuli = todos;
    },
    get_todos_list(state,todos) {
      state.wens = todos;
    },
    bian1(state){
      state.reddian = false;
    },
    xxl(state){
      state.shequinfo = {'remindCount':0}
    },
    gif1(state){
      state.gif2 = false;
    },
    churewa(state,todo){
      state.rewared = todo;
    },
    getsulam(state,todos){
      Vue.axios.get(todos.url).then(response => {
        console.log(response.data)
      })
    },
    tixing(state,todos){
      state.shequinfo = todos;
    },
  },
  actions: {
    naquan(store, a) {
      Vue.axios.post(this.state.uri + '/group_gongneng',
        {
          "group_miner": a
        }).then(response => {
          // console.log(response.data)
          store.commit('goc', response.data[0])
        }).catch(function (error) {
        })
    },
    qudian(store){
      store.commit('bian1')
    },
    quhua1(store){
      store.commit('gif1')
    },
    getTodos(store){
      Vue.axios.get(this.apiurl+'/notice_search').then(response => {
        console.log(response.data)
        store.commit('get_todos_list',response.data)
      })
    },
//    获取推广奖励ulam的数额
    getreward(store){
      Vue.axios.get(this.apiurl+'/get_reward_cloud').then(response => {
        store.commit('churewa',response.data[0])
      }).catch(function (error) {
        console.log(error);
      })
    },
    //查询调用文章
    getulam(store){
      Vue.axios.get(this.apiurl+'/url_s').then(response => {
        console.log(response.data)
        store.commit('getsulam',response.data[0])
      })
    },
    getSocket(store,b){
      let that = this
      const socket = new ReconnectingWebSocket('wss://server.ulam.top/community/remind',null,{debug: true, reconnectInterval:5000});
      that.state.ssk =socket
      let bbc = '{"user":"'+b+'"}'
      socket.onopen = function (event) {
        //想要验证是否连接成功可以给后台发一个消息
        socket.send(bbc);
        // 这个事件监听，可以监听后台返回来给你的消息，即str就是
        socket.onmessage = function (str) {
          if (str.data != "pong") {
            let data = JSON.parse(str.data)
            // console.log('有新消息，保存内存')
            //  console.log(data)
            if (data.change) {
              if (data.remindCount){
                store.commit('tixing', data)
                // localStorage.setItem("newreminds",JSON.stringify(data));
                if (window.plus) {
                  let mess = '泰勒社区有' + data.remindCount + '条新消息!'
                  plus.push.createMessage(mess);
                  //  产生角标
                  //   plus.runtime.setBadgeNumber(data.remindCount,{
                  //     "title":"张婷婷","content":"想你啦.."
                  //   });
                }
              }
            }
          }
        };
        socket.onerror = function(str){
          console.log("意外断开，正在重连");
        },
          socket.onclose = function(str){
            console.log("主页真正的断开");
          }
      }
    },
    guansoc(){
      if(this.state.ssk !=7){
        console.log('退出账户，关闭线程')
        this.state.ssk.close()
        this.state.ssk = 7
        // console.log(this.state.ssk)
      }
    },
//   清楚缓存提醒信息
    qingneis(store){
      store.commit('xxl')
    }
  }
});



//全局方法
import bapi from './bapi/api';
import indexdb from './bapi/indexdb';

Vue.prototype.bapi=bapi;
Vue.prototype.indexdb=indexdb;

import WebSql from './bapi/WebSql';
Vue.use(WebSql);





/* eslint-disable no-new */
new Vue({
  router,
  store,
  axios,
  Back,
  render: h => h(App)
}).$mount('#app-box');
