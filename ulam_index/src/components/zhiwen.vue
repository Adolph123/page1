<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <!--<x-header :left-options="{backText: ''}">支付方式</x-header>-->
<!--    <div class="back1">-->
<!--      <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">-->
<!--    </div>-->
<!--    <div style="height:70px;"></div>-->

    <div class="backcolors" >
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
          <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff">指纹支付 </span>
          </div>
        </div>

      </div>
    </div>

    <group title="">
      <radio :options="radio001" @on-change="change" v-model="wen"></radio>
    </group>
    <toast v-model="sh1" width="14em" :time="1800">指纹支付已开启！</toast>
    <toast v-model="sh2" width="14em" :time="1800">指纹支付已关闭！</toast>
    <!--资金密码框-->
    <popup v-model="jins" height="310px" is-transparent position="top" style="margin-top:18vh;z-index:1000;" :hide-on-blur="false">
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请确认资金密码</p>
        </div>
        <div style="padding: 0 20px">
          <group>
            <x-input v-model="anmi1"  type="password"  placeholder="请输入资金密码"></x-input>
          </group>
        </div>
        <div style="padding:20px 15px;margin-top:25px;">
          <div class="botmOk" @click="quejin">确定</div>
          <div style="height: 15px"></div>
          <div class="botmNO" @click="bujin">取消</div>
<!--          <x-button  @click.native="quejin" :style="{ background: quan.color,color:'#fff',height:'40px' }">确认</x-button>-->
<!--          <x-button @click.native="bujin" style="height:40px;">取消</x-button>-->
        </div>
      </div>
    </popup>
    <toast v-model="ss1" type="cancel" :time="1500" is-show-mask text="资金密码有误!"  width="12em"></toast>
    <toast v-model="ss2" type="cancel" :time="2600" is-show-mask text="请您先设置资金密码!"  width="18em"></toast>
    <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁"  width="18em"></toast>
    <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask  width="18em">{{tishi}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,XInput,Group,Icon,XButton,Loading,Popup,Cell,Radio} from 'vux'
  export default {
    name: "zhiwen",
    components: {
      XHeader,XInput,Toast,Group,Icon,XButton,Loading,Popup,Cell,Radio
    },
    data(){
      return {
        bodyHeight:'',
        radio001: [ '开启', '关闭' ],
        wen:'',
        wen1:'',
        sh1:false,
        sh2:false,
        jins:false,
        anmi1:'',
        ss1:false,
        ss2:false,
        users:'',
        cjin:false, cjin1:false, tishi:'',
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

      //拿取内存是否 设置过指纹 没有的话就默认是关闭
      let that = this
      that.bodyHeight=document.documentElement.clientHeight
      if(window.plus) {
        plus.navigator.setStatusBarBackground("#f5f5f5");
      }
      // localStorage.removeItem("jinmi");
      let a = localStorage.getItem('zhiwens')
       console.log(a)
      if(!a){
        that.wen = '关闭'
      }else{
        that.wen = '开启'
      }
    //  拿取用户信息
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
      quejin(){
        let that = this
        let a = that.anmi1
        if(a.length <3){
          that.ss1 = true
          that.anmi1 = ''
          return
        }
      //  请接口判断是否一致
        that.axios.post(that.ull+'/verf_password_drawback',
          {
            "mobile":parseInt(that.users.hu),
            "drawback_passwd":a
          }
          ).then(response => {
          console.log(response.data)
          if(response.data == 'password_drawback_error'){
            that.ss1 = true
            that.anmi1 = ''
            return
          }
          if(response.data =='password_drawback_error_null'){
            that.ss2 = true
            that.anmi1 = ''
            setTimeout(() => {
              that.$router.push('/setjin')
            },2800)
           return
          }
          if(response.data == 'succeful'){
            //  经过简单的判断。可以保存资金密码了
              localStorage.setItem('zhiwens','789')
              localStorage.setItem('jinmi',a)
              that.sh1 = true
              that.jins = false
              that.anmi1 = ''
          }

            that.jiemi(response.data);
        }).catch(function (error){
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

            }
  },
      bujin(){
        this.jins = false
        this.anmi1 = ''
        this.wen = '关闭'
      },
      //单选时候触发的change方法
      change(value){
        let that = this
        if(that.wen == value){
          return
        }
        if(value== '关闭'){
          that.sh2 = true
          localStorage.removeItem("zhiwens");
          // localStorage.removeItem("jinmi");
        }else{
          //这里要检测一下是否存在资金密码
          // console.log('开启')
          that.jinmi()
        }
      },
    //  第一次选择开启的时候 要判断是否存储了资金密码
      jinmi(){
        let that = this

          //弹出确认资金的框
          that.jins = true

      }
    }
  }
</script>

<style scoped>

</style>
