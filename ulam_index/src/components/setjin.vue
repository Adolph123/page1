<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <!--<x-header  :left-options="{backText: ''}">设置资金密码</x-header>-->
    <!--<div style="height:20px;"></div>-->
    <!--<div style="height:10px;background:#fff;"></div>-->
<!--    <div class="back1">-->
<!--      <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">-->
<!--    </div>-->
<!--    <div style="height:90px;"></div>-->


    <div class="backcolors" >
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
          <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff"> </span>
          </div>
        </div>

      </div>
    </div>

    <div class="pu cebor">
      <input type="password" class="in2 input-test" v-model = "mi" placeholder="请输入资金密码">
    </div>
    <div class="pu">
      <input type="password" class="in2 input-test" v-model = "mi1" placeholder="请确认资金密码">
    </div>
    <div style="height:10px;background:#fff;clear: both;"></div>

    <!--确认按钮-->
    <div style="padding:15px;box-sizing:border-box;margin-top:30px;">
      <div v-on:click="she" class="quq backcolors" >
        确认
      </div>
      <p style="font-size:12px;color:#E51C23;text-align: center;margin-top:14px;">资金密码设置后不可更改</p>
    </div>
    <toast v-model="ss1" type="cancel" :time="1500" is-show-mask text="资金密码不少于5位!"  width="12em"></toast>
    <toast v-model="ss2" type="cancel" :time="1500" is-show-mask text="俩次密码不一样!"  width="12em"></toast>
    <loading :show="sh4" text="设置中.."></loading>
    <toast v-model="sh2"  :time="1500" is-show-mask text="设置成功!" width="12em"></toast>
    <toast v-model="sh5" type="cancel" :time="2100" is-show-mask text="不能重复设置资金密码!" width="12em"></toast>
    <toast v-model="sh3" type="cancel" :time="1800" is-show-mask text="设置失败！" width="12em"></toast>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading} from 'vux'
    export default {
        name: "setjin",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading
      },
      data(){
          return {
            bodyHeight:'',
            mi:'',
            mi1:'',
            ss1:false,
            ss2:false,
            sh4:false,
            sh2:false,
            sh5:false,
            sh3:false,
            users:'',
          }
      },
      mounted(){
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('white')
          }

        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        if(window.plus) {
          plus.navigator.setStatusBarBackground("#f5f5f5");
        }
      //  获取个人信息
        let message = localStorage.getItem('user');
        message = JSON.parse(message)
        if(!message){
          //跳转登陆
          that.$router.push('/zhu')
          return
        }
        that.users = message
        // console.log(that.users)
      },
      computed: {
        ull(){
          return this.$store.state.uri;
        },
        quan(){
          return this.$store.state.zuli;
        }
      },
      methods:{
        fanhui1(){
          this.$router.push('/sets')
        },
        she(){
            let that = this
            if(that.mi.length <5){
              that.ss1 = true
              that.mi = ''
              that.mi1 = ''
              return
            }
            if(that.mi != that.mi1){
              that.ss2 = true
              that.mi = ''
              that.mi1 = ''
              return
            }
        //    开始设置
          that.sh4 = true
          that.axios.post(that.ull + '/set_drawback_passwd',
            {
              "drawback_passwd":that.mi,
              "mobile": that.users.hu,
              "password":that.users.mima,
            }
          ).then(response => {
            that.sh4 = false
            console.log(response.data)
            if(response.data == 'success'){
              that.sh2 = true
              //保存资金密码
              localStorage.setItem('jinmi',that.mi)
              that.mi1 = ''
              that.mi = ''
              return
            }
            // type="password"
            if(response.data == 'error_insert'){
              that.sh5 = true
              that.mi1 = ''
              that.mi = ''
              return
            }
            //设置错误提醒
            that.sh3 = true
          }).catch(function (error) {
            that.sh4 = false
            that.sh3 = true
            that.mi1 = ''
            that.mi = ''
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>
  .quq{
    text-align: center;height:38px;line-height:38px;color:white;border-radius:4px;font-size: 16px;
  }
  .pu{
    height:50px;width:100%;background:#fff;padding-left:15px;box-sizing:border-box;line-height:50px;font-size: 14px;
  }
  .cebor{
    border-bottom: 1px solid #F5F5F5;
  }
  .input-test::-webkit-input-placeholder{
    color:#8C8B8B;
  }
  .input-text::-moz-placeholder{
    color: #8C8B8B;
  }
  .input-text:-ms-input-placeholder{
    color:#8C8B8B;
  }
  .in2{
    border:none;outline:none;color: #999;width:100%;
  }

</style>
