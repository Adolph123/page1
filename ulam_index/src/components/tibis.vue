<template>
  <div style="background:#F5F5F5;font-size: 16px;" :style="{ height: bodyHeight + 'px' }">
    <!--<x-header  :left-options="{backText: ''}" style="background:#f5f5f5;">ULAM转账</x-header>-->
    <div class="back1 " style="background: rgba(0,0,0,0)" >
      <img src="@/assets/back.png" alt="" class="back2" v-on:click="buti">
    </div>
    <div style="height:70px;"></div>
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
        </p>
      </div>
      <!-- 金额-->
      <div style="height:170px;width:100%;background:#fff;border-radius:6px;margin-top:-5px;">
        <div style="padding:15px;">
          <div style="margin-top:30px;">
            <input type="number" class="in1 input-test" v-model = "shu" placeholder="请输入提取金额">
          </div>
          <div style="height:40px;margin-top:40px;border-top:1px solid #eee;line-height:2;">
            <div style="float:left;width:70%;color:#999999;font-size:14px;margin-top:6px;">
              <p>可转出 {{Names == 'ULAM'? bao.balance:bao.balance_uem}}</p>
            </div>
            <div class="quanzi" v-on:click="allji" :style="{ color:quan.color }">
              全部转出
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div style="margin-top:60px;">

        <div @click="queti" class="botmOk">确认</div>
        <div style="height: 15px"></div>
        <div @click="buti" style="background: #fff;" class="botmNO">取消</div>
        <div style="height: 15px"></div>
<!--        -->
<!--        <x-button :style="{ background: quan.color,color:'#fff' }" @click.native="queti">确认</x-button>-->
<!--        <x-button @click.native="buti" :gradients="['#fff', '#fff']" style="color:#999;">取消</x-button>-->
      </div>
      <!--<div style="height:65px;"></div>-->
    </div>

    <!--弹窗-->
    <!--资金密码框-->
    <popup v-model="jintan" height="330px" is-transparent position="top" style="margin-top:17vh;" :hide-on-blur="false">
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
        </div>
       <div style="padding: 0 20px">
         <group>
           <x-input v-model="anmi"  type="password"  placeholder="请输入资金密码"></x-input>
         </group>
       </div>
        <div style="padding:10px 15px;margin-top:15px;">
          <div @click="qjin()" class="botmOk">确认转出</div>
          <div style="height: 15px"></div>
          <div @click="bjin" class="botmNO">取消</div>
          <div style="height: 15px"></div>

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


    <loading :show="sh8" text="指纹识别成功正在转账.."></loading>
    <toast v-model="ss1"  type="cancel" :time="2100" is-show-mask text="请先在设置中心设置资金密码！" width="18em"></toast>
    <toast v-model="ss2" type="cancel" :time="1500" is-show-mask text="地址错误！"width="12em"></toast>
    <loading :show="ss9" text="提取中.."></loading>
    <toast v-model="ss8" type="cancel" :time="2000" is-show-mask text="提取失败！请确认资金密码和数量" width="18em"></toast>
    <toast v-model="ss13"  type="cancel" :time="2800" is-show-mask text="未达到提取要求，不能提取哦！" width="18em"></toast>
    <toast v-model="ss7" :time="1800" is-show-mask text="提取成功！" width="12em"></toast>
    <loading :show="ss3" text="刷新中.."></loading>
    <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
    <toast v-model="s1" type="cancel" :time="1100" is-show-mask text="请输入正确的余额!" width="12em"></toast>
    <toast v-model="s2" type="cancel" :time="1100" is-show-mask text="请输入正确的密码!" width="12em"></toast>
    <toast v-model="s3" type="cancel" :time="1100" is-show-mask text="资金密码有误!" width="12em"></toast>
    <toast v-model="sh9"  type="cancel" :time="2000" is-show-mask text="未检测到资金密码!请在设置中添加" width="18em"></toast>
    <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁"  width="18em"></toast>
    <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask  width="18em">{{tishi}}</toast>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Alert,Popup} from 'vux'
  export default {
    name: "tibis",
    components:{
      Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Alert,Popup
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
        s3:false,
        sh6:false,
        bao:'',
        allz:false,
        s1:false,
        s2:false,
        sh8:false,
        sh9:false,
        showwen:false,
        jintan:false,
        cjin:false, cjin1:false, tishi:'',usdizhi:'',Names:''
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
      created(){

          if(this.$route.query.str){
              this.dizhi = this.$route.query.str;
          }else {
              this.dizhi = '';
          }


          if(this.$route.query.id == 'ULAM'){
              this.usdizhi = '/ulam_wallet_tran';
              this.Names = 'ULAM'
          }else if (this.$route.query.id == 'UEM'){
              this.Names = 'UEM'
              this.usdizhi = '/ulam_wallet_tran_uem';
          }

          console.log(JSON.stringify(this.$route.query),'@@@@@@@@@@')

      },
    watch:{
      shu(newb,old){
        let that = this
        console.log(newb,old);
        let a =that.Names == 'UEM'?that.bao.balance_uem: that.bao.balance
        if(newb == a){
          console.log('全转')
          that.allz = true
        }else{
          console.log('不全转')
          that.allz = false
        }
      }
    },
    mounted(){
        if(window.plus){
            window.plus.navigator.setStatusBarStyle('dark')
        }
      let that = this;
      //  获取当前高度
      that.bodyHeight=document.documentElement.clientHeight;



      //拿取个人信息
      that.shus()
    },
    methods:{
      qjin(mix){
        let that = this
        if(mix){
          that.anmi = mix
        }
        if(that.anmi.length < 3){
          that.s2 = true
          that.anmi = ''
          return
        }
        //显示加载中
        let a = that.dizhi;
        let jin = parseFloat(that.shu);
        if(!mix){
          that.ss9 = true
        }
        //组装参数
        let can = ''
        //这里判断是不是全部转出
        if(that.allz){
          console.log('全转')
          can =
            {
              "mobile":parseInt(that.users.hu),
              "password":that.users.mima,
              "drawback_passwd":that.anmi,
              "amount":jin,
              "recipient":a,
              "all_balance":1
            }
        }else{
          console.log('不全转')
          can =  {
            "mobile":parseInt(that.users.hu),
            "password":that.users.mima,
            "drawback_passwd":that.anmi,
            "amount":parseFloat(jin),
            "recipient":a
          }
        }
        console.log(JSON.stringify(can),'!!!!!!!!!!!!!!!!!!!',that.usdizhi,'++++');
        //转账开始
        that.axios.post(this.apiurl+that.usdizhi, can).then(response => {
          //  关闭加载状态
          that.ss9 = false;
          that.sh8 = false;
          that.jintan = false;

          //password_drawback_error_null
          if(response.data == 'password_drawback_error_null'){
              this.sh9 = true;
              that.anmi = '';
              return
          }


          if(response.data == 'password_error'){
            that.s2 = true
            that.anmi = ''
            return
          }

          if(response.data == 'success'){
            that.ss7 = true
            that.anmi = ''
            that.shu = ''
            setTimeout(() => {
              this.$router.push('/wallet')
            },2000)
            return
          }else if(response.data.status == 'success'){
              that.ss7 = true
              that.anmi = ''
              that.shu = ''
              setTimeout(() => {
                  this.$router.push('/wallet')
              },2000)
          }
          that.jiemi(response.data);

          // that.ss8 = true
          that.anmi = ''
        }).catch(function (error){
          that.ss9 = false;
          // that.ss8 = true;
          that.jintan = false;
          that.anmi = '';
          console.log(error);
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
                that.ss8 = true
                that.anmi = ''
            }
        },
      bjin(){
        this.jintan = false
        this.shu = ''
        this.dizhi = ''
        this.anmi = ''
      },
      //  转出余额
      queti(){
        let that = this
        let a = that.dizhi
        //拿到的是字符类型
        let jin = parseFloat(that.shu);
          let aa =that.Names == 'UEM'?that.bao.balance_uem: that.bao.balance;
        if(!jin || jin<=0 ||  jin>aa){
          console.log('没有钱')
          that.s1 = true
          that.shu = ''
          return
        }
        if(that.isUlamAddr(a)){
        //  判断是否开启的指纹
          let zw = localStorage.getItem('zhiwens')
          if(zw){
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
        console.log(mis);
        // 调用支付方法 别忘了 sh8 还整加载中
        if(!mis){
          this.sh9 = true;
          //没有密码 提示请进行密码加密在进行转账
          setTimeout(() => {
            this.$router.push('/user')
          },2000)
          return
        }
        //有密码就进行操作楼
        this.qjin(mis)
      },
      //  指纹
      onShow1(){
        // console.log('789')
      },
      onHide1(){
        if(!this.sh8){
          setTimeout(() => {
            this.jintan = true
          }, 300)
        }
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
        //拿钱包信息
        let a  = localStorage.getItem("wals")
        // 获取钱包的内存信息
        that.bao = JSON.parse(a)
      //  检测是否有路由信息
       let didi =  that.$route.params.id;
       if(didi){
         that.dizhi = didi
       }
      },
      buti(){
          if(this.$route.query.id == 'ULAM'){
              this.$router.push('/wallet')
          }else if (this.$route.query.id == 'UEM'){
              this.$router.push('/uemDetail')
          }


      },
      //判断ulam地址
      isUlamAddr(addr){
        // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
        let patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');
        if(patt.test(addr)){
          return true;
        }
        return false;
      },
      //操作后刷新数据
      //  全部提取
      allji(){
        let that = this
          let a =that.Names == 'UEM'?that.bao.balance_uem: that.bao.balance;
        that.shu = a
      },
    }
  }
</script>

<style scoped>
  .quanzi{
    float:left;width:30%;text-align:right;font-size:14px;margin-top:6px;
  }
  .in1{
    border:none;outline:none;color: #999;font-size:24px;width:90%;
  }
  .in2{
    border:none;outline:none;color: #999;width:100%;
  }
</style>
