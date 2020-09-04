<template>
    <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
      <!--<x-header  :left-options="{backText: ''}">修改登录密码</x-header>-->
<!--      <div class="back1">-->
<!--        <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">-->
<!--      </div>-->

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


<!--      <div style="height:90px;"></div>-->
      <div class="pu cebor">
        <input type="text" class="in2 input-test" v-model = "mi" placeholder="请输入当前登录密码">
      </div>
      <div class="pu cebor">
        <input type="password" class="in2 input-test" v-model = "nmi" placeholder="请输入新登录密码，7~16位字符不可为纯数字">
      </div>
      <div class="pu cebor">
        <input type="password" class="in2 input-test" v-model = "nmi1" placeholder="请再次输入新登录密码">
      </div>
      <div class="pu">
        <div style="float: left;width:65%;">
          <input type="number" class="in2 input-test" v-model = "ma" placeholder="请输入短信验证码">
        </div>
        <div class="quanfa" :style="{ color: quan.color }">
            <p v-if="machu" v-on:click="fayan">发送验证码</p>
            <p v-if="!machu">{{mazi}}s 后再..</p>
        </div>
      </div>
      <div style="height:10px;background:#fff;clear: both;"></div>

      <!--确认按钮-->
      <div style="padding:15px;box-sizing:border-box;margin-top:30px;">
        <div v-on:click="up" class="quanq backcolors" >
          确认
        </div>
        <p style="font-size:12px;color:#E51C23;text-align: center;margin-top:14px;">修改登陆密码24小时内不可提现</p>
      </div>
<!--弹窗-->
      <toast v-model="ss1" type="cancel" :time="1500" is-show-mask text="当前登录密码有误!"  width="12em"></toast>
      <toast v-model="ss2" type="cancel" :time="1500" is-show-mask text="请输入当前登录密码!"  width="12em"></toast>
      <toast v-model="ss3" type="cancel" :time="1500" is-show-mask text="验证码有误!"  width="12em"></toast>
      <toast v-model="ss4" type="cancel" :time="1800" is-show-mask text="请设置字母+数字组合的密码!"  width="18em"></toast>
      <toast v-model="ss5" type="cancel" :time="1800" is-show-mask text="俩次密码不一致!"  width="12em"></toast>
      <toast v-model="ss6" type="cancel" :time="1800" is-show-mask text="请输入修改信息!"  width="12em"></toast>
      <toast v-model="ss7" type="cancel" :time="2000" is-show-mask text="设置密码超时!请重新操作" width="18em"></toast>
      <toast v-model="ss8" type="cancel" :time="1500" is-show-mask text="验证码有误!" ></toast>
      <toast v-model="ss9" :time="2500" is-show-mask text="设置密码成功！即将退出.." width="18em"></toast>
      <toast v-model="s1" :time="1200" is-show-mask text="发送成功"></toast>
      <toast v-model="s2" type="cancel" :time="1500" is-show-mask text="当前手机号未注册!" ></toast>
      <toast v-model="s3" type="cancel" :time="1500" is-show-mask text="发送失败!请不要频繁发送" width="18em"></toast>
    </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading} from 'vux'
    export default {
        name: "upmi",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading
      },
      data(){
        return{
          timer: null,
          bodyHeight:'',
          mi:'',
          nmi:'',
          nmi1:'',
          ma:'',
          machu:true,
          mazi:10,
          users:'',
          ss1:false,
          ss2:false,
          ss3:false,
          ss4:false,
          ss5:false,
          ss6:false,
          ss7:false,
          ss8:false,
          ss9:false,
          s1:false,
          s2:false,
          s3:false,
        }
      },
      computed:{
        ull(){
          return this.$store.state.uri;
        },
        quan(){
          return this.$store.state.zuli;
        }
      },
      mounted(){
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('white')
          }

        let that = this
        that.bodyHeight=document.documentElement.clientHeight
      //  拿取用户信息--手机号
        let message = localStorage.getItem('user');
        message = JSON.parse(message)
        if(!message){
          //跳转登陆
          that.$router.push('/zhu')
          return
        }
        that.users = message
      },
      methods:{
        fanhui1(){
          this.$router.push('/sets')
        },
         up(){
             let that = this
           //3个信息全部检查一遍
           if(!that.nmi || !that.ma || !that.mi || !that.nmi1){
             that.ss6 = true
             return
           }
           //检查密码
           if(!that.mima(that.nmi)){
             that.ss4 = true
             that.nmi = ''
             that.nmi1 = ''
             return
           }
         //  检查密码是否一致
           if(that.nmi != that.nmi1){
             that.ss5 = true
             that.nmi = ''
             that.nmi1 = ''
             return
           }
           let a = that.ma
           //检查 验证码
           if(a.length != 4){
             that.ss3 = true
             that.ma = ''
             return
           }
          console.log('通过验证可以进行')
           that.axios.post(that.ull + '/password_drawback',
             {
               'mobile':parseInt(that.users.hu) ,
               "password":that.nmi,
               "ver_code":parseInt(that.ma)
             }
           ).then(response => {
             console.log(response.data)
             if(response.data == 'error'){
               that.ss7 = true
               that.ma = ''
               return
             }
             //error_mobile_repeat
             if(response.data == 'error_mobile_repeat'){
               that.ss8 = true
               that.ma = ''
               return
             }
             if(response.data =='succeful'){
               that.ss9 = true
               setTimeout(() => {
                 localStorage.removeItem("user");
                 //删除钱包数据
                 localStorage.removeItem("wals");
                 //头像
                 localStorage.removeItem("tellertx");
                 //资金密码
                 localStorage.removeItem("jinmi");
                 //是否开启指纹
                 localStorage.removeItem('zhiwens')
                 that.$router.push('/zhu')
               }, 2500)
               return
             }
           }).catch(function (error){
             console.log(error);
             alert('请求异常!请重新操作')
           })
         },
        //  验证密码格式
        mima(e){
          let regNumber = /\d+/;
          let regString = /[a-zA-Z]+/;
          if(regNumber.test(e) && regString.test(e)){
            return true
          }else{
            return false
          }
        },
        fayan(){
          let that = this
          //进行一个简单的判断。输入的当前密码是否正确
          let a = that.mi
          let b = that.users.mima
          if(a.length < 3){
            that.mi = ''
            that.ss2 = true
            return
          }
          if(a != b){
           that.mi = ''
           that.ss1 = true
           return
          }
          //验证成功
          that.go()
          //倒计时
          that.machu = false
          if(that.timer == null){
            that.timer = setInterval(() => {
              if(that.mazi < 1){
                clearInterval(that.timer);
                that.timer = null
                that.machu = true
                that.mazi = 10
                return
              }
              that.mazi--
            },1000);
          }
        },
        go(){
          let that = this
          let newt = parseInt(that.users.hu)
          console.log('注册的手机号为:'+ newt)
          that.axios.post(that.ull +'/send_mail',
            {
              'mobile': newt ,
              "password_drawback":1
            }
          ).then(response => {
            console.log(response.data)
            if(response.data =='succeful'){
              that.s1 = true
              return
            }
            if(response.data =='error_mobile'){
              that.s2 = true
              return
            }
            that.s3 = true
            that.ma = ''
          }).catch(function (error){
            console.log(error);
            alert('发送验证码出错!请重新请求')
          })
        },
      }
    }
</script>

<style scoped>
  .quanfa{
    float: left;width:35%;font-size:14px;text-align:center;
  }
  .quanq{
    text-align: center;height:38px;line-height:38px;color:white;border-radius:4px;font-size: 16px;
  }

  .pu{
    height:50px;width:100%;background:#fff;padding-left:15px;box-sizing:border-box;line-height:50px;
    font-size: 14px;
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
