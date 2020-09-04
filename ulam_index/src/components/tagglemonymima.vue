<template>
  <div :style="{ height: bodyHeight + 'px',background:'linear-gradient(#76c4ff, #7458fd)', position:'absolute',width: '100%' }">
    <div style="margin-top: 6%"></div>
    <x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="hui1"
               style="background:transparent;">
      更改资金密码
    </x-header>
    <div class="waib">

      <div v-if="statu ==1">
        <div style="height: 8vh"></div>
        <!--输入框-->
        <div class="loginke">
          <input type="number" class="login inputlogin" v-model = "tel" placeholder="输入手机号">
        </div>
        <div style="height:30px;"></div>
        <div class="logins" v-on:click="fayan">
          立即验证
        </div>
      </div>
      <div v-if="statu ==2">
        <div style="height: 8vh"></div>
        <!--输入框-->
        <div class="loginke" >
          <input type="number" class="login inputlogin"  v-model = "code" placeholder="请输入验证码">
        </div>
        <div style="height:30px;"></div>
        <div class="logins" v-on:click="tijiao">
          提交验证码
        </div>
        <div style="height:55px;line-height:55px;text-align: center;font-size:14px;">
          验证短信已发送到{{haoma(tel)}}
        </div>
      </div>
      <div v-if="statu ==3">
        <div style="height: 4vh"></div>
        <!--输入框-->
        <div class="loginke">
          <input type="password" class="login inputlogin" v-model = "mima" placeholder="输入新资金密码">
        </div>
        <div style="height:30px;"></div>
        <div class="loginke">
          <input type="password" class="login inputlogin" v-model = "mima1" placeholder="确认新资金密码">
        </div>

        <div style="height: 3vh"></div>
        <div style="height:30px;"></div>
        <div class="logins" v-on:click="titi">
          确认
        </div>
      </div>
    </div>
    <div style="width:90%;margin-left:5%;" v-if="statu ==3">
<!--      <div style="text-align:center;font-size:12px;color:#fff;height:50px;line-height:50px;margin-top:10px;">-->
<!--        密码长度8-32位，须包含数字、字母、符号至少2种或以上元素-->
<!--      </div>-->
    </div>

    <!--弹窗-->
    <toast v-model="ss1" type="cancel" :time="1500" is-show-mask text="请输入正确的手机号" width="18em"></toast>
    <toast v-model="ss2" type="cancel" :time="1800" is-show-mask text="手机号已注册！" width="18em"></toast>
    <toast v-model="ss3" type="cancel" :time="1500" is-show-mask text="请输入正确的验证码！" width="18em"></toast>
    <toast v-model="su1" :time="1200" is-show-mask text="发送成功"></toast>
    <loading :show="lo1" text="修改中.."></loading>
    <toast v-model="ss4" type="cancel" :time="1200" is-show-mask text="俩次密码不一致！" width="18em"></toast>
    <toast v-model="ss5" type="cancel" :time="1200" is-show-mask text="密码强度不合格！" width="18em"></toast>
    <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="发送失败!请不要频繁发送" width="18em"></toast>
    <toast v-model="lo2" :time="2000" is-show-mask text="更改密码成功！" width="18em"></toast>
  </div>
</template>
<script>
    import { Toast,Loading,XHeader } from 'vux'
    import {isTel,isYma} from "../../pf/allCall";
    export default {
        name: "tagglemonymima",
        components:{Toast,Loading,XHeader},
        data(){
            return {
                bodyHeight:"",code:"",statu:1,tel:'',mima:"",mima1:'',timer: null,
                ss1:false, ss2:false,ss3:false,ss4:false,ss5:false,ss6:false,
                su1:false,
                lo1:false,lo2:false,
            }
        },
        mounted(){
            let that = this
            that.bodyHeight=document.documentElement.clientHeight;

            this.tel = this.$route.query.id;
            this.statu =1;
            // this.fayan();
        },
        computed:{
            icolor(){
                return 'rgb(154, 85, 255)'
            },
            iurl(){return  this.apiurl},

        },
        methods:{
            yanzheng(){
                this.statu = 2
            },
            xuan(a){
                this.statu = a
            },
            //隐藏手机号
            haoma(a){
                let c = a.toString()
                let b =   c.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                return  b
            },
            // 发送验证码
            fayan(){
                let that = this
                //如果手机验证通过才能发送验证码
                if(isTel(that.tel)){
                    that.zhenfa()
                }else {
                    that.ss1 = true
                }
            },
            zhenfa(){
                let that = this
                let newt = parseInt(that.tel)
                console.log('注册的手机号为:'+ newt)
                that.axios.post(that.iurl+'/send_mail',
                    {
                        'mobile': newt,
                        "password_drawback":1
                    }).then(response => {
                    console.log(response.data)
                    if(response.data =='succeful'){
                        that.su1 = true
                        that.statu = 2
                        return
                    }else if(response.data =='error_mobile_repeat'){
                        that.ss2 = true
                        that.tel = ''
                        return
                    }
                    that.ss6 = true
                }).catch(function (error){
                    console.log(error);
                    alert('发送验证码出错!请重新请求')
                })
            },
            //提交验证码
            tijiao(){
                let that = this
                if(isYma(that.code)){
                    that.statu = 3
                }else {
                    that.ss3 = true
                }
            },
            titi(){
                let that = this
                if(!isYma(that.code)){
                    that.ss3 = true;
                    return
                }
                let mi = that.mima
                //检测是否合格
                // let regNumber = /\d+/;
                // let regString = /[a-zA-Z]+/;
                // if(regNumber.test(mi) && regString.test(mi) && mi.length >7){
                //     console.log('密码：验证成功');
                // }else{
                //     that.ss5 = true
                //     that.mi = ''
                //     return
                // }
                let mi1 = that.mima1
                if(mi != mi1){
                    console.log('俩次密码不对')
                    that.ss4 = true
                    that.mi1 = ''
                    return
                }
                //执行更改
                let newt = parseInt(that.tel)
                that.lo1 = true
                that.axios.post(that.iurl+'/password_drawback_1',
                    {
                        'mobile': newt,
                        'password':mi,
                        "ver_code":parseInt(that.code)
                    }
                ).then(response => {
                    that.lo1 = false
                    console.log(response.data)
                    if(response.data == 'success'){
                        //返回登录页面
                        that.lo2 = true
                        setTimeout(() => {
                            that.hui1()
                        },2000)
                    }else{
                        alert('更改失败!请核对验证码是否正确')
                        that.code = ''
                    }
                }).catch(function (error){
                    that.lo1 = false
                    console.log(error);
                    alert('网络出现问题!请重新操作')
                })
            },
            hui1(){
                this.$router.push('/sets')
            }
        }
    }
</script>
<style scoped>
  .yanz{
    color:#4cd964;height:28px;line-height:28px;border:1px solid #4cd964;
    float:right;padding-left:8px;padding-right:8px;box-sizing:border-box;margin-top:8.5px;
  }
  .zico{
    color:#4cd964;
  }
  .delu1{
    background:#4cd964;margin-top:15px;
    height:40px;width:100%;color:#fff;text-align: center;line-height:40px;letter-spacing:1px;
  }
  .delu{
    background:#4cd964;margin-top:20px;
    height:40px;width:100%;color:#fff;text-align: center;line-height:40px;letter-spacing:1px;
  }
  .in2{
    border:none;outline:none;color:#999;width:100%;
  }
</style>

