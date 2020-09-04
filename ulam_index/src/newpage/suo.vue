<template>
    <div  style="background:#FFF;" :style="{ height: bodyHeight + 'px' }">
      <div class="back1" style="background:#FFF;">
        <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">
      </div>
      <div style="height:75px;"></div>
      <div style="height:70px;padding:5px 0px;box-sizing:border-box;">
        <div style="background:#9a55ff;box-shadow:0px 0px 3px #8b5100;height:50px;line-height:50px;color:#fff;text-align:center;width:100%;">
          如需转出请联系矿池负责人
        </div>
      </div>
      <div style="padding:15px;box-sizing:border-box;background:#fff;">
        <div>
          <div style="float: left;width:50%;">
            <p class="zi1">余额</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2">{{shuju.Balance}}</p>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div>
          <div style="float: left;width:50%;">
            <p class="zi1">打包量</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2">{{shuju.Packing_Number}}</p>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div>
          <div style="float: left;width:50%;">
            <p class="zi1">幸运值</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2">{{shuju.Lucky_Value}}</p>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div>
          <div style="float: left;width:50%;">
            <p class="zi1">打包率</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2">{{(shuju.probability*100).toFixed(5)}}%</p>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div>
          <div style="float:left;width:20%;">
            <p class="zi1">地址</p>
          </div>
          <div style="float:left;width:80%;text-align: right;" v-if="shuju.addr">
            <p class="zi2">{{shuju.addr.substr(0,8)}}……{{shuju.addr.substr(36)}}
              <img src="@/assets/newpage/copy1.png" alt="" style="height:17px;" @click="copy" :data-clipboard-text="shuju.addr" class="dizhi">
            </p>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>
      <!--弹窗-->
      <loading :show="ss1" text="加载中.."></loading>
      <toast v-model="ss3"  :time="1600" is-show-mask text="复制成功~" width="18em"></toast>
    </div>
</template>
<script>
  import Clipboard from 'clipboard';
  import {Loading,Toast}from 'vux'
    export default {
        name: "suo",
      components:{Loading,Toast},
      data(){
        return {
          bodyHeight:"",users:'',ss1:false,shuju:"",ss3:false,
        }
      },
      mounted(){
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        let message = localStorage.getItem('user');
        if(!message){
          //跳转登陆
          that.$router.push('/zhu')
          return
        }
        message = JSON.parse(message)
        //请求所有币的登陆。拿到总值
        that.users = message
        that.ss1 = true
        that.take1()
      },
      computed: {
        ull(){
          return this.$store.state.uri;
        }
      },
      methods:{
        copy(){
          let clipboard = new Clipboard('.dizhi')
          clipboard.on('success', e => {
            console.log('复制成功')
            this.ss3 = true
            // 释放内存
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            // 不支持复制
            console.log('该浏览器不支持自动复制')
            // 释放内存
            clipboard.destroy()
          })
        },
        take1(){
          let that = this
          that.axios.post(that.ull + '/miner_lock_search',
            {
              "mobile":that.users.hu,
              "password":that.users.mima,
            }).then(response => {
            that.ss1 = false
            console.log(response.data)
            if(response.data.length ==0){
              that.$router.push('/user')
              return
            }
            that.shuju = response.data[0]
          }).catch(function (error) {
            that.ss1 = false
          })
        },
        fanhui1(){
          this.$router.push('/user')
        }
      }
    }
</script>

<style scoped>
  .zi1{color:#919090;font-size:14px;margin-top:15px;}
  .zi2{color:#030303;font-size:14px;margin-top:15px;word-wrap:break-word;}
</style>
