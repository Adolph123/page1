<template>
  <div id="app">
      <router-view></router-view>
<!--    </keep-alive>-->


    <!--<transition :name="transitionName">-->
    <!--<router-view></router-view>-->
    <!--</transition>-->
  </div>
</template>

<script>
// import {Tabbar,TabbarItem}from 'vux'
const axios = require('axios');
export default {
  name: "app",
  // components:{ Tabbar,TabbarItem},
  data() {
    return {
      transitionName: "",
      xian: true,
      to: false,
      x: true,
      token:'',
    };
  },
  mounted() {

  },
  watch: {
    // $route(to,from) {
    //   //如果to索引大于from索引,判断为前进状态,反之则为后退状态
    //   if(to.meta.index > from.meta.index){
    //     //设置动画名称
    //     this.transitionName = 'slide-left';
    //   }else{
    //     this.transitionName = 'slide-right';
    //   }
    // }
  },
  created(){
      //创建资讯
      let arr = [];
      localStorage.setItem('liveHistory',JSON.stringify(arr));
        let user = JSON.parse(localStorage.getItem('user'));
        if (user){
            const username = user.hu;
            const password = user.mima;
            this._getdislist(username,password);
            this.natoken()
        }
        window.addEventListener('touchmove', function(e) {
            var target = e.target;
            if (target && target.tagName === 'TEXTAREA') {//textarea阻止冒泡  
                e.stopPropagation();
            }
            if (target && target.tagName === 'LI') {//textarea阻止冒泡  
                e.stopPropagation();
            }
            if (target && target.tagName === 'UL') {//textarea阻止冒泡  
                e.stopPropagation();
            }
        }, true)

        this.diao(100)
    },
  methods:{
        _getdislist(username,password){
            let apiurl = this.apiurlShop+'/api/user/login';
            let data={
                username,password
            };
            axios.post(apiurl, data).then( (res)=> {
                localStorage.setItem('token',res.data.token)
            })
        },
        // 执行调用 请求资讯 7*24
        diao(b){
            let that = this;

            let urls = '/v4/live/list?limit='+b+'&reading=false&source=web&sort=&flag=down&id=99999999';
            // 打包要换成 没dev的 -- 这里that.baseURL 代表了https://api.biki.com/open/api/market域名

            // 本地测试 要换成下面访问请求  或者 that.baseURL +'/dev/open/api/market'
            // that.axios.get('/dev'+urls).then(response =>{
                that.axios.get('https://api.jinse.com' + urls).then(response =>{
                    console.log('资讯', response.data.list[0].lives);
                    let arr = response.data.list[0].lives;
                    localStorage.setItem("timeInfo",JSON.stringify(arr));

            }).catch(function (error){
                that.ss1 = false;
                that.limit = 180;
                console.log(error);
            })
        },

        // 用户登录拿取  社区token
        natoken() {
            let that = this;
            let users = JSON.parse(localStorage.getItem('user'));
            that.axios.get( this.apiurlCommunity+'/login/' + users.hu + '/' + users.mima).then(response => {
                // console.log(response.data)
                if (response.data.status == "fail") {
                    alert("登录状态失效 请重新登录")
                    return false
                } else {
                    that.token = response.data.code
                    localStorage.setItem("newtoken", that.token);
                    //拿取社区数据
                    that.nashuju()
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        //请求 社区 数据
        nashuju(){
            let that = this;
            let users = JSON.parse(localStorage.getItem('user'));
            that.axios.get(this.apiurlCommunity+'/article?user=' + users.hu + '&token=' + that.token).then(response => {
                //
                console.log(response.data,'社区数据！！！！！！！')
                if (response.data.status == "refresh") {
                    that.token = response.data.code
                    setTimeout(() => {
                        that.nashuju()
                    }, 500)
                    return
                }
                if (response.data.status == 'success') {

                    //给图片加url地址
                    let shujus = response.data.data;
                    localStorage.setItem("community",JSON.stringify(shujus));
                }
            })
        },
    }
};
</script>

<style>

  .el-dialog__header{
    text-align: center;
  }
  .el-dialog__headerbtn{
    display: none!important;
  }
  .el-dialog__headerbtn .el-dialog__closen{
    display: none;
  }
</style>
<style lang="less">
/*@import "./style/reset.less";*/
@import "../pf/quanju.css";
*{
  margin: 0;
  padding: 0;
}
body {
  background-color: #f5f5f5;
  font-size: 16px;
}
.vux-tap-active:active {
  background-color: #ececec;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.fontcolor{
  background-image: linear-gradient(135deg, #f1d2ff , #9a55ff);
  -webkit-background-clip: text;
  color: transparent;
}



.mheaderheader {
  padding: 30px 0 1%;
  width: 94%;
  display: flex;
  margin: 0 auto;
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.backcolors{
  background: linear-gradient(to bottom right, #dd8fff , #9a55ff);
}
  .battomImage{
    width: 5.5vw;
    height: auto;
    display: block;
    margin: 0.1rem auto 0.2rem;
  }
  .botmOk{
    width: 94%;
    line-height: 35px;
    padding: 2px 0;
    text-align: center;
    background: linear-gradient(to bottom right, #dd8fff , #9a55ff);
    font-size: 14px;
    color: #fff;
    margin: 0 auto;
    border-radius: 6px;
  }
.botmNO{
  width: 94%;
  line-height: 35px;
  padding: 2px 0;
  text-align: center;
  background: #e9e9e9;
  font-size: 14px;
  color: #8A8787;
  margin: 0 auto;
  border-radius: 6px;
}
</style>
