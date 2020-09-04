<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <!--<x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="fanhui1">提币</x-header>-->
    <div class="back1" style="background: rgba(0,0,0,0)">
      <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">
    </div>
    <div style="height:70px;"></div>
    <div style="padding:14px;box-sizing:border-box;">
      <!--收款地址-->
      <!-- 资金密码-->
      <div style="padding:15px;box-sizing:border-box;color: #BBBBBB;font-size: 14px">
          当前选中{{kj.id}}号矿机，可转余额为{{kj.jin}}
      </div>
      <div style="padding:15px;box-sizing:border-box;color:#535050;">
        <p style="color:#535050;font-size:14px;font-weight:700;">收款地址 <sub style="color: red">(默认为钱包地址)</sub></p>
      </div>
      <div style="height:40px;width:100%;background:#fff;border-radius:6px;box-sizing:border-box;line-height:40px;margin-top:-5px;">
<!--        <input type="text" class="in2 input-test" style="font-size: 12px"  v-model="dizhi" placeholder="请输入收款地址(ulam)">-->
        <p class="in2 input-test" style="font-size: 12px">{{dizhi}}</p>
      </div>
      <div style="margin-top:90px;">
        <div class="botmOk" @click="queti" >确认转出</div>
        <div style="height: 15px;"></div>
        <div class="botmNO" style="background: #fff" @click="buti" >取消</div>
<!--        <x-button @click.native="queti" style="background:#9a55ff;color:white;">确认转出</x-button>-->
<!--        <x-button @click.native="buti"  style="background:#fff;color:#999;">取消</x-button>-->
      </div>
      <!--<div style="height:65px;"></div>-->
    </div>
    <!--弹窗-->
    <toast v-model="ss1"  type="cancel" :time="2100" is-show-mask text="请确认资金密码!如未设置在我的页面设置" width="18em"></toast>
    <toast v-model="ss2" type="cancel" :time="1500" is-show-mask text="地址错误！"width="12em"></toast>
    <loading :show="ss9" text="提取中.."></loading>
    <toast v-model="ss8" type="cancel" :time="2000" is-show-mask text="矿机已被提取!" width="18em"></toast>
    <toast v-model="ss13"  type="cancel" :time="2800" is-show-mask text="未达到提取要求，不能提取哦！" width="18em"></toast>
    <toast v-model="ss7" :time="1800" is-show-mask text="提取成功！" width="12em"></toast>
    <loading :show="ss3" text="刷新中.."></loading>
    <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
    <toast v-model="s1" type="cancel" :time="1100" is-show-mask text="请输入正确的余额!" width="12em"></toast>
    <toast v-model="s2" type="cancel" :time="1100" is-show-mask text="请输入正确的密码!" width="12em"></toast>
<!--    <toast v-model="s3"  type="cancel" :time="1800" is-show-mask text="提取失败!请确认资金密码" width="16em"></toast>-->
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
    <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁"  width="18em"></toast>
    <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask  width="18em">{{tishi}}</toast>
    <!--资金密码框-->
    <popup v-model="jintan" height="310px" is-transparent position="top" style="margin-top:17vh;z-index:1000;" :hide-on-blur="false">
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
        </div>
       <div style="padding: 0 20px">
         <group>
           <x-input v-model="anmi"  type="password"  placeholder="请输入资金密码"></x-input>
         </group>
       </div>
        <div style="padding:20px 15px;margin-top:25px;">
          <div class="botmOk" @click="qjin()" >确认转出</div>
          <div style="height: 15px;"></div>
          <div class="botmNO" @click="bjin" >取消</div>

          <!--<x-button type="primary" @click.native="zhuan1">确认转出</x-button>   9a55ff    -->
<!--          <x-button  @click.native="qjin()" style="background:#9a55ff;color:white;height:40px;">确认转出</x-button>-->
<!--          <x-button @click.native="bjin" style="height:40px;">取消</x-button>-->
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Alert} from 'vux'
  export default {
    name: "tij",
    components:{
      Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Loading,Popup,Alert
    },
    data(){
      return {
        bodyHeight:'',
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
        cjin:false, cjin1:false, tishi:'',
        s3:false,
        sh6:false,
        bao:'',
        allz:false,
        s1:false,
        s2:false,
        kj:'',
        sh8:false,
        sh9:false,
        showwen:false,
        jintan:false,
        whos:'',
      }
    },
    mounted(){
        if(window.plus){
            window.plus.navigator.setStatusBarStyle('dark')
        }
      let that = this;

      let wals = JSON.parse(localStorage.getItem('wals'));
      that.dizhi = wals.addr;

      //  获取当前高度
      that.bodyHeight=document.documentElement.clientHeight
      if(window.plus) {
        plus.navigator.setStatusBarBackground("#f5f5f5");
      }
      //拿取个人信息
      that.shus()
    //  接收参数
      that.kj = this.$route.params.ti;
      console.log(that.kj)
      that.whos = that.kj.who
      console.log(that.whos)
    },
    computed:{
      ull(){
        return this.$store.state.uri;
      },
      quan(){
        return this.$store.state.zuli;
      }
    },
    methods:{
      fanhui1(){
        let that = this
        if(that.whos == 'yun'){
          //返回云矿机页面
          that.$router.go(-1)
        }else{
          //返回托管矿机页面
          that.$router.push('/wjis')
        }
      },
      //真正提取
      qjin(mix){
        let that = this
        if(mix){
          that.anmi = mix
        }
        if(that.anmi.length < 3){
          // console.log('没有密码')
          that.s2 = true
          that.anmi = ''
          return
        }
      // 简单的验证后开始
        if(!mix){
          that.ss9 = true
        }
//转账开始
        let a = that.dizhi
        let url = ''
        if(that.whos == 'yun'){
          //云矿机
          console.log('云矿机提起')
          url = '/drawback_miner'
        }else{
          //托管矿机
          console.log('托管矿机提起')
          url = '/drawback_miner_tg'
        }
        that.axios.post(that.ull+ url,
          {
            "recipient":a,
            "mobile": parseInt(that.users.hu),
            "password":that.users.mima,
            "miner_addr":that.kj.addr,
            "drawback_passwd":that.anmi
          }
        ).then(response => {
          console.log(response.data)
          that.ss9 = false
          that.sh8 = false
          if(response.data == 'amount_error'){
            that.ss8 = true
            that.anmi = ''
            return
          }

          if(response.data[0].status == 'success'){
            that.ss7 = true
            that.anmi = ''
            that.dizhi = ''
            setTimeout(() => {
              that.fanhui1()
            },2000)
            return;
          }


          that.jiemi(response.data);

          that.s3 = true
          that.anmi = ''
        }).catch(function (error) {
          console.log(error);
          that.ss9 = false
          that.sh8 = false
          that.s3 = true
          that.anmi = ''
        })
      },
      jiemi(a){
            let that = this
            let na = a.substr(0,12)
            // console.log(na)
            if(na == 'sk_error_num'){
                let ti = a.substr(13)
                console.log('截取的是:'+ti)
                if(ti == '0'){
                    that.cjin = true
                    that.anmi = ''
                    return
                }
                that.tishi = '资金密码错误！还有'+ti+'次机会'
                that.cjin1 = true
                that.anmi = ''
            }else {

            }
        },
      bjin(){
        let that = this
        that.jintan = false
        that.anmi = ''
        that.dizhi = ''
      },
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
        // console.log(that.users)
      },
      buti(){
        this.fanhui1()
      },
      //  转出余额
      queti(){
        let that = this
        let a = that.dizhi
        if(that.isUlamAddr(a)){
          //地址正确胡判断是否指纹
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
      //判断ulam地址
      isUlamAddr(addr) {
        // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
        let patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');
        if(patt.test(addr)){
          return true;
        }
        return false;
      }
    }
  }
</script>

<style scoped>
  .input-test::-webkit-input-placeholder{
    color:#BBBBBB ;
    font-size: 12px;
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

