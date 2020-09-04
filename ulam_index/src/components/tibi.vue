<template>
    <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
      <x-header  :left-options="{backText: ''}" >提取奖励</x-header>
      <div style="padding:14px;box-sizing:border-box;">
        <!--收款地址-->
        <!-- 资金密码-->
        <div style="padding:15px;box-sizing:border-box;color:#535050;">
          <p style="color:#535050;font-size:14px;font-weight:700;">收款地址</p>
        </div>
        <div style="height:40px;width:100%;background:#fff;border-radius:6px;padding-left:15px;box-sizing:border-box;line-height:40px;margin-top:-5px;padding-right:15px;">
          <input type="text" class="in2 input-test" v-model = "dizhi" placeholder="请输入收款地址(ulam)">
        </div>
        <div style="padding:15px;box-sizing:border-box;color:#535050;">
          <p style="color:#535050;font-size:14px;font-weight:700;">
            请输入金额
            <span style="font-size:12px;font-weight:700;color:#E51C23; ">
              （提示：奖励达到2000ulam才能提取）
            </span>
          </p>
        </div>
        <!-- 金额-->
        <div style="height:170px;width:100%;background:#fff;border-radius:6px;">
          <div style="padding:15px;border-box;">
            <div style="margin-top:30px;">
              <input type="number" class="in1 input-test" v-model = "shu" placeholder="请输入提取金额">
            </div>
            <div style="height:50px;margin-top:40px;border-top:1px solid #eee;line-height:1.5;">
              <div style="float:left;width:70%;color:#999999;font-size:14px;margin-top:6px;">
                <p>奖励可领取 {{keling}}</p>
                <p style="">已领取 {{users.take}}</p>
              </div>
              <div class="tizi1" :style="{color: quan.color}" v-on:click="allji">
                全部转出
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div style="margin-top:30px;">
          <x-button :style="{ background: quan.color,color:'#fff' }" @click.native="queti">确认</x-button>
          <x-button @click.native="buti" :gradients="['#fff', '#fff']" style="color:#999;">取消</x-button>
        </div>
        <!--<div style="height:65px;"></div>-->
      </div>
<!--弹窗-->
      <toast v-model="ss1"  type="cancel" :time="2100" is-show-mask text="请确认资金密码!如未设置在我的页面设置" width="18em"></toast>
      <toast v-model="ss2" type="cancel" :time="1500" is-show-mask text="地址错误！"width="12em"></toast>
      <loading :show="ss9" text="提取中.."></loading>
      <toast v-model="ss8" type="cancel" :time="2000" is-show-mask text="提取失败!请确认密码和数量" width="18em"></toast>
      <toast v-model="ss13"  type="cancel" :time="2800" is-show-mask text="未达到提取要求，不能提取哦！" width="18em"></toast>
      <toast v-model="ss7" :time="1800" is-show-mask text="提取成功！" width="12em"></toast>
      <loading :show="ss3" text="刷新中.."></loading>
      <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
      <toast v-model="s2" type="cancel" :time="1100" is-show-mask text="请输入正确的密码!" width="12em"></toast>
      <!--资金密码框-->
      <popup v-model="jintan" height="310px" is-transparent position="top" style="margin-top:10px;" :hide-on-blur="false">
        <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
          <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
            <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
          </div>
          <group>
            <x-input v-model="anmi" title="资金密码" type="password"  placeholder="请输入资金密码"></x-input>
          </group>
          <div style="padding:20px 15px;margin-top:25px;">
            <!--<x-button type="primary" @click.native="zhuan1">确认转出</x-button>-->
            <x-button  @click.native="qjin()" :style="{ background: quan.color,color:'#fff' }">确认转出</x-button>
            <x-button @click.native="bjin" style="height:40px;">取消</x-button>
          </div>
        </div>
      </popup>
      <!--指纹谈起-->
      <alert v-model="showwen" title="请验证指纹" @on-show="onShow1" @on-hide="onHide1" button-text="取消使用密码">
        <div  style="">
          <div style="height:20px;"></div>
          <img src="@/assets/icos/zw.png" alt="" style="width:80px;">
          <div style="height:10px;"></div>
        </div>
      </alert>
      <loading :show="sh8" text="指纹识别成功.."></loading>
      <toast v-model="sh9"  type="cancel" :time="2000" is-show-mask text="未检测到资金密码!请这设置中添加" width="18em"></toast>
    </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Alert} from 'vux'
    export default {
        name: "tibi",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Alert
      },
      data(){
          return {
            bodyHeight:'',
            shu:'',
            anmi:'',
            dizhi:'',
            users:'',
            //全部奖励
            newli:0,
          //  可领取奖励
            keling:0,
            ss1:false,
            ss2:false,
            ss9:false,
            ss8:false,
            ss7:false,
            ss13:false,
            ss3:false,
            sh6:false,
            sh8:false,
            sh9:false,
            s2:false,
            //资金密码弹窗
            jintan:false,
          //  指纹样式弹窗
            showwen:false,
          }
      },
      mounted(){
          let that = this
        //  获取当前高度
          that.bodyHeight=document.documentElement.clientHeight
        //拿取个人信息
        that.shus()
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
        //  指纹
        onShow1(){
          // console.log('789')
        },
        onHide1(){
          // console.log('消失')
          if(!this.sh8){
            setTimeout(() => {
              this.jintan = true
            }, 300)
          }
        },
         // 真正的发送提币请求
         qjin(ms){
           let that = this
           //简单的资金密码验证
           if(ms){
             that.anmi = ms
           }
           if(that.anmi.length < 3){
             console.log('没有密码')
             that.s2 = true
             that.anmi = ''
             return
           }
           console.log(that.anmi)
           //显示加载中
           that.ss9 = true
           let jin = that.shu
           that.axios.post(that.ull +'/drawback_reward',
             {
               "recipient":that.dizhi,
               "mobile":that.users.hu,
               "password":that.users.mima,
               "amount":parseFloat(jin),
               "drawback_passwd":that.anmi
             }
           ).then(response => {
             that.ss9 = false
             that.sh8 = false
             console.log(response.data)
             if(response.data == 'error_amount_low'){
               that.ss13 = true
               that.bjin()
               return
             }
             if(response.data[0].status == 'success'){
               //提取成功
               that.ss7 = true
               //取消数据，取消资金密码弹窗
               that.bjin()
               that.shua()
               return
             }
             if(response.data == 'password_drawback_error'){
               //资金密码错误
               that.s2 = true
               //取消资金密码
               that.anmi = ''
               return
             }
             //显示提取失败
             that.ss8 = true
             that.bjin()
           }).catch(function (error) {
             that.ss9 = false
             that.ss8 = true
             that.bjin()
             console.log(error);
           })
         },
        //取消输入密码弹窗 并消失数据
        bjin(){
          this.shu = ''
          this.dizhi = ''
          this.anmi = ''
          this.jintan = false
        },
        //  真正调用指纹的方法
        wenfus(){
          let _this = this
          console.log("开始指纹识别")
          if(!window.plus) return;
          // 检查是否支持指纹识别
          if(plus.fingerprint) {
            if(!plus.fingerprint.isSupport()) {
              plus.nativeUI.alert('此设备不支持指纹识别');
              return;
            }
            if(!plus.fingerprint.isKeyguardSecure()) {
              plus.nativeUI.alert('此设备未设置密码锁屏，无法使用指纹识别');
              return;
            }
            if(!plus.fingerprint.isEnrolledFingerprints()) {
              plus.nativeUI.alert('此设备未录入指纹，请到设置中开启');
              return;
            }
            //开启指纹识别验证()
            var waiting = null;
            plus.fingerprint.authenticate(function(){
              // plus.nativeUI.alert('指纹识别成功');
              //开启识别成功的加载状态
               _this.sh8 = true
              // //关掉指纹的样式弹窗
               _this.showwen = false
              // //  调用拿取密码的方法
              _this.wendmi()
            }, function(e){
              switch(e.code){
                case e.AUTHENTICATE_MISMATCH:
                  plus.nativeUI.toast('指纹匹配失败，请重新输入');
                  _this.fingertext = '指纹匹配失败，请重试'
                  break;
                case e.AUTHENTICATE_OVERLIMIT:
                  plus.nativeUI.alert('识别次数超出限制，请使用密码进行支付！');
                  //密码弹窗起来 指纹样式下去
                  _this.showwen = false
                  _this.jintan = true
                  _this.showFinger = false;
                  break;

                  default:
                      if(e.code == 6){
                          break;
                      }else {
                          plus.nativeUI.alert('指纹识别失败(' + e.code + ')，请重试');
                          _this.fingertext = '指纹识别失败(' + e.code + ')，请重试'
                          break;
                      }
              }
            })

          } else {
            plus.nativeUI.alert('当前环境不支持指纹识别API，请更新到最新版本');
          }
        },
        //指纹成功后调取的方式
        wendmi(){
          let mis =  localStorage.getItem("jinmi");
          console.log(mis)
          // 调用支付方法 别忘了 sh8 还整加载中
          if(!mis){
            this.sh9 = true
            //没有密码 提示请进行密码加密在进行转账
            setTimeout(() => {
              this.$router.push('/user')
            },2000)
            return
          }
          //有密码就进行操作楼
          this.qjin(mis)
        },
        //  计算还可领取的方式
        sjiang(arg1, arg2){
          let that = this
          let r1, r2, m, n;
          try {
            r1 = arg1.toString().split(".")[1].length;
          }
          catch (e) {
            r1 = 0;
          }
          try {
            r2 = arg2.toString().split(".")[1].length;
          }
          catch (e) {
            r2 = 0;
          }
          m = Math.pow(10, Math.max(r1, r2));
          //last modify by deeka
          //动态控制精度长度
          n = (r1 >= r2) ? r1 : r2;
          let newa = ((arg1 * m - arg2 * m) / m).toFixed(n);
          if(newa <= 0){
            that.nzhuan = 0
            return 0
          }
          that.nzhuan = 1
          return newa
        },
        //整理数据
        shus(){
          let that = this
          let message = localStorage.getItem('user');
          message = JSON.parse(message)
          if(!message){
            //跳转登陆
            that.$router.push('/zhu')
            return
          }
          that.ss3 = false
          that.users = message
          //全部奖励，下级奖励+矿池奖励
          that.accAdd(that.users.jl,that.users.xl)
        // 可领取奖励
          that.keling = that.sjiang(that.newli,that.users.take)
        },
        accAdd(arg1,arg2){
          // console.log('开始了')
          let r1, r2, m;
          try {
            r1 = arg1.toString().split(".")[1].length;
          }
          catch (e) {
            r1 = 0;
          }
          try {
            r2 = arg2.toString().split(".")[1].length;
          }
          catch (e) {
            r2 = 0;
          }
          m = Math.pow(10, Math.max(r1, r2));
          this.newli = (arg1 * m + arg2 * m) / m;
          // return this.newli;
        },
          buti(){
            // this.shu = ''
            // this.dizhi = ''
            // this.anmi = ''
            this.$router.push('/jiangli')
          },
        //  转出余额
        queti(){
          let that = this
          let a = that.dizhi
          //拿到的是字符类型
          let jin = that.shu
          if(!jin || jin<=0){
            console.log('没有钱')
            that.shu = ''
            return
          }
          if(that.isUlamAddr(a)){
          //当地址 金额 通过验证后 首先判断开启了指纹支付没有
            let zw = localStorage.getItem('zhiwens')
            if(zw){
            //  开启就弹出指纹样式 并拿取资金密码
            //  console.log(zw)
            //  弹出指纹样式
              that.showwen = true
              //  下面是真正的指纹方法
              that.wenfus()
            }else {
              //没有开启指纹 弹出密码框
              that.jintan = true
            }
          }else{
            that.ss2 = true
            that.dizhi = ''
          }
        },
        //判断ulam地址
        isUlamAddr(addr) {
          // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
          let patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');
          if(patt.test(addr)){
            return true;
          }
          return false;
        },
        //操作后刷新数据
        shua(){
          let that = this
          //开启加载状态
          that.ss3 = true
          //拿取账户密码。拿去新的值
          let a = that.users.hu
          let b = that.users.mima
          that.axios.post(that.ull + '/login',{"mobile":parseInt(a),"password":b}).then(response => {
            console.log(response.data)
            if(response.data == 'password_error' || response.data == 'error'){
              that.sh6 = true
              setTimeout(() => {
                localStorage.removeItem("user");
                this.$router.push('/zhu')
              },1800)
              return
            }
            //开始拿新的值
            let ss = response.data[0]
            let bs = {
                "drawback_passwd":ss.drawback_passwd,
              'jl': 999 ,'sl': 999 ,'ren':1,'take':102,'xl':66,'confirm':ss.confirm,admin:ss.admin,
              'one':ss.level_1 ,'two':ss.level_2,              //1级 2级
              'hu':a,'mima':b,'name':ss.name,                 //账户 密码 名字
              'ma':ss.expand_num_self,'sma':ss.expand_num,     //自己的邀请码  -- 上级码
              'miner':ss.miner,'group_miner':ss.group_miner    //矿工角色  -- 哪个组
            }
            localStorage.setItem("user",JSON.stringify(bs));
            //调取数据的方法
            that.shus()
          }).catch(function (error){
            console.log(error);
            setTimeout(() => {
              that.ss3 = false
            },500)
          })
        },
        //  全部提取
        allji(){
          let that = this
          that.shu = that.keling
        },
      }
    }
</script>

<style scoped>
  .tizi1{
    float:left;width:30%;text-align:right;font-size:14px;margin-top:6px;
  }
  .input-test::-webkit-input-placeholder{
    color:#BBBBBB ;
  }
  .input-text::-moz-placeholder{
    color: #BBBBBB;
  }
  .input-text:-ms-input-placeholder{
    color:#BBBBBB;
  }
  .in1{
    border:none;outline:none;color: #999;font-size:24px;width:90%;
  }
  .in2{
    border:none;outline:none;color: #999;width:100%;
  }
</style>
