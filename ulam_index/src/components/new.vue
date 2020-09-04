<template>
    <div style="background:#FFF;" :style="{ height: bodyHeight + 'px' }">
      <div style="height: 40px"></div>
      <div  style="background:#fff;text-align:center;">
        <div style="color:#171717;font-size:20px;line-height:46px;font-weight:700;">注册</div>
        <router-link  to="/zhu" ><img src="@/assets/back.png" alt=""
        style="height:20px;position:absolute;top:54px;left:15px;"
        ></router-link>
      </div>
      <div style="height:25px;"></div>
      <div style="padding:15px 30px;box-sizing: border-box;">
        <img style="width:25%;" src="@/assets/newpage/lo.png">
        <div style="height:70px;line-height:40px;">
          <p style="color:#2a2a2a;font-size:17px;">欢迎注册ULAM账户</p>
        </div>
        <!--手机号-->
        <div style="border-bottom:1px solid #f1efef;width:100%;height:50px;line-height:50px;font-size:15px;">
          <flexbox>
            <flexbox-item>
              <div>
                <input type="number" class="regtel" v-model = "tel" placeholder="请输入手机号">
              </div>
            </flexbox-item>
            <flexbox-item :span="5">
              <div style="text-align:right;color:#686868;">
                  <span v-on:click="fayan" v-if="machu">获取验证码</span>
                  <span v-if="!machu">{{mazi}}s 后再..</span>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <!--验证码-->
        <label for="male">
        <div style="margin-top:15px;position:relative;">
          <flexbox style="text-align:center;height:50px;line-height:50px;font-size:20px;">
            <flexbox-item>
              <div>
                <div class="haoma">
                  {{yan?yan.substr(0,1):''}}
                </div>
              </div>
            </flexbox-item>
            <flexbox-item>
                <div class="haoma1">

                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="haoma">
                  {{yan?yan.substr(1,1):''}}
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="haoma1">

                </div>
            </flexbox-item>
            <flexbox-item>
              <div class="haoma">
                {{yan?yan.substr(2,1):''}}
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="haoma1">

              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="haoma">
                {{yan?yan.substr(3,1):''}}
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        </label>
        <!--控制4个数字-->
        <input type="number" v-model="yan" id="male" class="yan" oninput="this.value=this.value.length>4?this.value.substr(0,4):this.value;"/>
      <!--密码-->
        <div class="mik">
              <div>
                <input type="password" class="regtel" v-model = "dmima" placeholder="密码（6-20位数字、字母）">
              </div>
        </div>
        <!--推荐人-->
        <div class="mik">
          <div>
            <input type="number" class="regtel" v-model = "yao" placeholder="推荐人邀请码（必填）">
          </div>
        </div>
        <div style="height: 40px"></div>
        <!--注册-->
        <div class="botmOk" style="border-radius:30px" v-on:click="go">
          注册
        </div>
        <!--<group title="">-->
          <!--<x-input title="昵称" v-model="nicheng" :max="9" placeholder="请输入昵称." class="zisi"></x-input>-->
          <!--<x-input title="密码" v-model="dmima"  placeholder="字母+数字组合密码." :min="6" class="zisi"></x-input>-->
          <!--<x-input title="+86"-->
                   <!--@on-change="keyDown" ref="refcode"-->
                   <!--mask="99999999999" v-model="tel" :max="11" is-type="china-mobile" placeholder="请输入手机号." class="zisi">-->
            <!--<x-button slot="right"  mini @click.native="fayan" v-if="machu" :style="{background:icol,color:'#fff'}">发送验证码</x-button>-->
            <!--<x-button slot="right" type="warn" mini @click.native="fayan" v-if="!machu" disabled>{{mazi}}s 后再..</x-button>-->
          <!--</x-input>-->
          <!--<x-input title="验证码" v-model="yan" type="number" class="zisi"></x-input>-->
          <!--<x-input title="邀请码" v-model="yao" type="number" class="zisi"></x-input>-->
        <!--</group>-->
        <!--<div style="margin-top:40px;width:80%;margin-left:10%;">-->
          <!--<x-button  @click.native="go"  :disabled="disabled" :style="{background:icol,color:'#fff'}">确 定</x-button>-->
        <!--</div>-->
        <!-- 短信验证登陆，忘记登陆-->
        <!--<div style="margin-top:40px;" >-->
          <!--&lt;!&ndash; 助记词登陆&ndash;&gt;-->
          <!--<div v-on:click="yanma" style="float:left;">-->
            <!--<span :style="{color:icol}">账户密码登录</span>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <toast v-model="ss1" type="cancel" :time="1500" is-show-mask text="信息不完整~" width="12em"></toast>
      <toast v-model="ss4" :time="1200" is-show-mask text="发送成功"></toast>
      <toast v-model="ss3" type="cancel" :time="1500" is-show-mask text="请输入正确的验证码~" width="12em"></toast>
      <toast v-model="ss2" type="cancel" :time="1500" is-show-mask text="请输入正确的手机号" width="12em"></toast>
      <toast v-model="ss5" type="cancel" :time="2000" is-show-mask text="手机号已注册~" width="12em"></toast>
      <loading :show="ss6" text="注册成功.."></loading>
      <toast v-model="ss7" type="cancel" :time="1200" is-show-mask text="密码需字母数字相结合~" width="12em"></toast>
      <toast v-model="ss8" type="cancel" :time="1200" is-show-mask text="账户密码有误~" width="12em"></toast>
      <toast v-model="ss9" type="cancel" :time="1200" is-show-mask text="您的邀请码有误~" width="12em"></toast>
      <toast v-model="cuo1" type="cancel" :time="1200" is-show-mask text="昵称已被注册~" width="12em"></toast>
      <toast v-model="cuo2" type="cancel" :time="1200" is-show-mask text="请不要频繁发送~" width="12em"></toast>
    </div>
</template>
<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Loading,Flexbox, FlexboxItem  } from 'vux'
    export default {
        name: "new",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Loading,Flexbox, FlexboxItem
      },
      data(){
        return {
          bodyHeight:'',
          //验证码倒计时 计时器
          timer: null,
          //显示验证码按钮
          machu:true, mazi:60, ss1:false, ss2:false, ss3:false, tel:'', yan:'', disabled:true,cuo2:false,
          nicheng:'', dmima:'', ss4:false, ss5:false, ss6:false, ss7:false, ss8:false, ss9:false, yao:"", cuo1:false,
        }
      },
      mounted(){
          if(window.plus){
              window.plus.navigator.setStatusBarStyle('dark')
          }
        this.bodyHeight=document.documentElement.clientHeight
        if(window.plus) {
          plus.navigator.setStatusBarBackground("#FFF");
        }
      },
      computed:{
        ull(){
          return this.$store.state.uri;
        },
        icol(){
          return this.$store.state.zuli.color
        }
      },
      methods:{
         // 发送验证码
         fayan(){
           let that = this
           if(!that.isTel(that.tel)){
             that.ss2 = true
             that.tel = ''
             return
           }
           //  开始发送验证码
           that.zhenfa()
           //  按钮倒计时
           that.machu = false
           if(that.timer == null){
             that.timer = setInterval(() => {
               if(that.mazi < 1){
                 clearInterval(that.timer);
                 that.timer = null
                 that.machu = true
                 that.mazi = 60
                 return
               }
               that.mazi--
             },1000);
           }
         },
        zhenfa(){
           let that = this
           let newt = parseInt(that.tel)
          console.log('注册的手机号为:'+ newt)
          that.axios.post(that.ull +'/send_mail',{'mobile': newt }).then(response => {
             console.log(response.data)
            if(response.data =='succeful'){
              that.ss4 = true
            }else if(response.data == 'error_time_short'){
              that.cuo2 = true
            }else if(response.data =='error_mobile_repeat'){
              that.ss5 = true
              that.tel = ''
              that.yan = ''
              that.nicheng = ''
              that.dmima = ''
              return
            }
          }).catch(function (error){
            console.log(error);
            alert('发送验证码出错!请重新请求')
          })
        },
        //  验证手机号正确才能进入 点击按钮
        keyDown() {
          if(this.$refs.refcode.valid == true && this.tel != '') {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        },
        fanhui1(){
          this.$router.push('/zhu')
        },
       isTel(val){
          if(/^1[3456789]\d{9}$/.test(val)){
            return true;
          }
          return false;
        },
        //验证码
        isYma(val) {
          if( /^\d{4}$/.test(val) ){
            return true;
          }
          return false;
        },
        //邀请码
        isYao(val) {
          if( /^\d{8}$/.test(val) ){
            return true;
          }
          return false;
        },
        go(){
          let that = this
          let a = that.yan
          //验证码 密码
          if(!a || !that.dmima || !that.yao || !that.tel){
            that.ss1 = true
            return
          }
          if(!that.isYma(parseInt(a))){
            that.ss3 = true
            that.yan = ''
            return
          }
          //验证密码是否有字母和数字
          let regNumber = /\d+/;
          let regString = /[a-zA-Z]+/;
          if (regNumber.test(that.dmima) && regString.test(that.dmima)) {
            console.log('密码：验证成功');
          }else{
            that.ss7 = true
            that.dmima = ''
            return
          }
          //验证邀请码
          if(!that.isYao(parseInt(that.yao))){
            that.ss9 = true
            that.yao = ''
            return
          }
          console.log('信息都正确 进行注册')
        //开始执行注册信息了
          let newt = parseInt(that.tel)
          that.axios.post(that.ull +'/reg',
            {
              'mobile': newt,
              'name':'ULAM矿工',
              'password':that.dmima,
              "ver_code":parseInt(a),
              "expand_num":parseInt(that.yao)
            }
            ).then(response => {
            console.log(response.data)
            if(response.data == 'succeful'){
              //显示加载状态
              that.ss6 = true
              //进入登陆方法
              that.regd(newt,that.dmima)
              return
            }else if(response.data == 'error_mobile_repeat'){
              that.ss5 = true
              that.tel = ''
              that.yan = ''
              return
            }else if(response.data == 'error_uid_repeat'){
              that.cuo1 = true
              that.nicheng = ''
            }else if(response.data == 'error_expand_num'){
              alert('错误的邀请码~')
              that.yao = ''
            }else {
              alert('注册失败!请检查验证码或者重新注册')
              that.yan = ''
            }
          }).catch(function (error){
            console.log(error);
            alert('注册出现问题!请重新操作')
          })
        },
        regd(a,b){
           let that = this
          that.axios.post(that.ull +'/login',{'mobile': a,"password":b}).then(response => {
             //返回用户信息
            that.ss6 = false
             console.log(response.data)
            if(response.data == 'password_error'){
              that.ss8 = true
              that.$router.push('/index')
              return
            }
            let ss = response.data[0];
              if(ss.hasOwnProperty("miner") && ss.hasOwnProperty("group_miner")){
              let bs = {
                'sl': 999 ,'ren':1,'take':0,'confirm':ss.confirm,admin:ss.admin,"drawback_passwd":ss.drawback_passwd,
                'jl': ss.reward ,'xl':ss.reward_miner,           //奖励和下级奖励
                'one':ss.level_1 ,'two':ss.level_2,              //1级 2级
                'hu':a,'mima':b,'name':ss.name,                   //账户 密码 名字
                'ma':ss.expand_num_self,'sma':ss.expand_num,     //自己的邀请码  --上级码
                'miner':ss.miner,'group_miner':ss.group_miner    //矿工角色  --- 哪个组
              }
              //保存个人信息
              localStorage.setItem("user",JSON.stringify(bs));
              that.$router.push('/user')
            }
          }).catch(function (error){
            console.log(error);
            alert('自动登录出错，请自行登录!')
            that.$router.push('/index')
          })
        },
        //返回主页
        yanma(){
          this.$router.push('/zhu')
        }
      }
    }
</script>

<style scoped>
  .yan{border:none;outline:none;width:100%;position:absolute;top:-700px;height:34px;}
  .niu{color:white;border:none;}
  .zisi{height:35px;font-size:14px;}
  .haoma{color:#7f7e7e;height:50px;border-bottom:1px solid #f1efef;}
</style>
