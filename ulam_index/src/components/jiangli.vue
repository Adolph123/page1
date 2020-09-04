<template>
<div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
  <x-header  :left-options="{preventGoBack: true,backText: ''}"  @on-click-back="fanhui1">邀请奖励</x-header>
  <!--<div style="height:15px;"></div>-->
  <!---->
  <div style="height:15px;"></div>
  <div style="height:12px;background:#fff;"></div>
  <div class="kk1 cebor" v-if="!tren" v-on:click="xies">
    <p>
      <span style="margin-left:15px;">上级邀请码</span>
      <span style="color:#9C9B9C;font-size:13px;float:right;margin-right:4%;">请填写上级邀请码
        <img src="@/assets/you.png" alt="" style="width:11px;margin-top:13px;">
      </span>
    </p>
  </div>
  <div class="kk1 cebor" v-if="tren">
    <p>
      <span style="margin-left:15px;">上级邀请码</span>
      <span style="color:#9C9B9C;font-size:13px;float:right;margin-right:4%;">{{tren}}
      </span>
    </p>
  </div>
  <div style="clear:both;"></div>
  <div class="kk1 cebor">
    <p>
      <span style="margin-left:15px;">一级推广人数</span>
      <span class="tu2">{{users.one}}</span>
    </p>
  </div>
  <div style="clear:both;"></div>
  <div class="kk1">
    <p>
      <span style="margin-left:15px;">二级推广人数</span>
      <span class="tu2">{{users.two}}</span>
    </p>
  </div>
  <div style="clear:both;height:50px;"></div>
  <!-- 微信图 -->
  <div style="width:100%;text-align:center;">
    <p :style="{ color: quan.color}">领取奖励请联系矿主微信</p>
    <div style="height:15px;"></div>
    <img :src="zuw" alt="" v-if="zuw" style="width:50%;">
  </div>
  <!--<div class="kk1">-->
    <!--<p>-->
      <!--<span style="margin-left:15px;">算力</span>-->
      <!--<span class="tu2">{{users.sl}}</span>-->
    <!--</p>-->
  <!--</div>-->
  <div style="clear:both;height:12px;"></div>

  <!-- 弹窗-->
  <popup v-model="yao" height="310px" is-transparent>
    <div style="width: 95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
      <divider style="font-size: 18px;">请输入推广人邀请码</divider>
      <!--<p class="li1">&nbsp;&nbsp;认证后才可提交，提交后您上级的算力将提升!</p>-->
      <group>
        <x-input title="邀请码" v-model="tren1" type="number"></x-input>
      </group>
      <div style="padding:20px 15px;margin-top:5px;">
        <x-button :style="{ background: quan.color,color:'#fff' }" @click.native="fama">确定</x-button>
        <x-button @click.native="yaos">取消</x-button>
      </div>
    </div>
  </popup>
  <toast v-model="macuo" type="cancel" :time="1100" is-show-mask text="推广码有误!" width="12em"></toast>
  <toast v-model="ss2" type="cancel" :time="2000" is-show-mask text="请认证后操作!" width="12em"></toast>
  <toast v-model="ss3"  :time="2000" is-show-mask text="提交成功!" width="12em"></toast>
  <toast v-model="ss4" type="cancel" :time="2000" is-show-mask text="提交出错!" idth="12em"></toast>
  <loading :show="ss1" text="刷新中.."></loading>
  <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
</div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Divider,Alert} from 'vux'
    export default {
        name: "jiangli",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Divider,Alert
      },
      data(){
          return {
            bodyHeight:'',
            users:'',
            yanxian:false,
          //  是否有上级邀请码
            tren:'',
            tren1:'',
            yao:false,
            macuo:false,
            ss1:false,
            ss2:false,
            ss3:false,
            ss4:false,
            sh6:false,
            newli:0,
            yj:0,
            zuw:'',
          }
      },
      mounted(){
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
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
        //  处理人民币价格
        chujia(e){
          //  拿取缓存eth的价格
          let a = localStorage.getItem('jia');
          a = JSON.parse(a)
          // //处理价格转化为字符
          let b =  a.ulam*e
          // console.log(a.ulam)
          return  b.toFixed(2)
        },
          //提取奖励
        tibi(){
          this.$router.push('/tibi')
        },
        shus(){
            let that = this
            let message = localStorage.getItem('user');
            message = JSON.parse(message)
            console.log(message)
            if(!message){
              //跳转登陆
              that.$router.push('/zhu')
              return
            }
            that.ss1 = false
            that.users = message
            //奖励
            that.yj = that.accAdd(that.users.jl,that.users.xl)
            //上级邀请码
            let sma = that.users.sma
            if(sma){
              that.tren = sma
            }
            //组长微信二维码
            that.zuw = 'http://test.ulamchain.io/wxtu/'+ that.users.group_miner +'.png'
          },
        //  每次操作完后 都要刷新一下数据 15403901
        shua(){
          let that = this
          //开启加载状态
          that.ss1 = true
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
            let ss = response.data[0];
            let bs = {
              'sl': 999 ,'ren':1,'take':0,'confirm':ss.confirm,admin:ss.admin,"drawback_passwd":ss.drawback_passwd,
              'jl': ss.reward ,'xl':ss.reward_miner,           //奖励和下级奖励
              'one':ss.level_1 ,'two':ss.level_2,              //1级 2级
              'hu':a,'mima':b,'name':ss.name,  //账户 密码 名字
              'ma':ss.expand_num_self,'sma':ss.expand_num,    //自己的邀请码  --上级码
              'miner':ss.miner,'group_miner':ss.group_miner    //矿工角色  --- 哪个组
            }
            localStorage.setItem("user",JSON.stringify(bs));
            //调取数据的方法
            that.shus()
          }).catch(function (error){
            console.log(error);
            setTimeout(() => {
              that.ss1 = false
            },500)
          })
        },
        //  发送邀请码
        fama(){
          let that = this
          if(that.tren1.length <7){
            that.macuo = true
            that.tren1 = ''
            return
          }
          console.log('发送推广码')
          that.axios.post(this.apiurl+'/expand',{"mobile":parseInt(that.users.hu),"expand_num":parseInt(that.tren1)}).then(response => {
            console.log(response.data)
            if(response.data == 'error_confirm'){
              //用户还未认证
              that.tren1 = ''
              that.ss2 = true
              that.yao = false
            }else if(response.data == 'succeful'){
              //填写推广人成功
              that.ss3 = true
              that.yao = false
              setTimeout(() => {
                that.shua()
              },400)
            }else if(response.data == 'error'){
              //请求错误
              that.tren1 = ''
              that.ss4 = true
              that.yao = false
            }
          }).catch(function (error) {
            console.log(error);
            that.ss4 = true
            that.yao = false
          })
          // this.yao = false
        },
        //取消发送邀请码
        yaos(){
          this.yao = false
          this.tren1 = ''
        },
        //  填写上级
        xies(){
          this.yao = true
        },
        xianyan(){
          // console.log('789')
          this.yanxian = !this.yanxian
        },
        fanhui1(){
          this.$router.push('/user')
        },
        //  精度加法  奖励和下级奖励相加
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
          return this.newli;
        },
      }
    }
</script>

<style scoped>
  .tbb1{
    position:absolute;top:0px;right:0px;width:100px;height:28px;border-radius:5px;text-align:center;line-height:28px;color:white;font-size:15px;
  }
  .li1{
    margin-top:5px;font-size:14px;color:red;
  }
  .tu2{
    float:right;margin-right:4%;
  }
  .tu1{
    width:13px;float:right;margin-top:13px;margin-right:4%;
  }
  .cebor{
    border-bottom: 1px solid #F5F5F5;
  }
  .kk1{
    height:40px;width:100%;line-height:40px;background:#fff;font-size:14px;
  }
  .zi1{
    color: #777575;font-size:14px;margin-top:10px;
  }
  .jiji{
    float:left;width:50%;
    background:#fff;
    height:85px;font-weight:700;font-size:17px;
  }
  .weiji{
    float:left;width:50%;background:#fff;height:85px;font-weight:700;font-size:17px;
  }
</style>
