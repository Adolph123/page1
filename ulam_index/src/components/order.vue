<template>
    <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
      <div  style="position:fixed;top:0px;width:100%;z-index:998;">
        <!--<x-header :left-options="{backText: ''}">订单管理</x-header>-->
        <div class="back1" style="background:#fff;">
          <img src="@/assets/back.png" alt="" class="back2" v-on:click="fhui">
        </div>
        <div style="height:40px;"></div>
        <div style="height:15px;background:#fff;"></div>
        <div>
          <div class="tab" v-on:click="xuan(1)">
            <span v-bind:style="[ bian == 1 ? style1: style2] ">未付款</span>
          </div>
          <div class="tab" v-on:click="xuan(2)">
            <span v-bind:style="[ bian == 2 ? style1: style2] ">未审核</span>
          </div>
          <div class="tab" v-on:click="xuan(3)">
            <span v-bind:style="[ bian == 3 ? style1: style2] ">已完成</span>
          </div>
          <div style="float:left;width:1%;background:#fff;height:40px;"></div>
        </div>
      </div>
      <div style="height:105px;"></div>
      <div style="padding:15px;box-sizing:border-box;background:#F5F5F5;">
        <div v-if="!dingdan" style="margin-top:30%;">
          <divider>暂无订单</divider>
        </div>
        <div v-if="dingdan">
          <div v-for="(todo,index) in dingdan" v-bind:key="todo.id" style="position:relative;border-radius:5px;background:#fff;font-size:14px;">
            <div class="zi1">
              <div class="zi2" :style="{ background: quan.color}">
                 <span style="color:white;">{{
                xian1(tais(todo.confirm,todo.confirm_self))
                  }}</span>
              </div>
            </div>
            <div style="float:left;width:45%;">
              <img src="@/assets/xianka.png" alt="" style="width:95%;border-radius:8px;margin:10%;">
            </div>
            <div style="float:left;margin-left:10px;">
              <div style="height:8px;"></div>
              <p>购买者: {{todo.buyer}}</p>
              <p>矿机数量 ×{{todo.amount}}</p>
              <p style="color:#ff0000;">&nbsp{{huilv(todo.price,todo.amount)}}</p>
              <p style="font-size:12px;color:#A8A6A6;margin-top:5px;">订单号：{{todo.number}}</p>
              <p style="font-size:12px;color:#A8A6A6;">时 间：{{new Date(parseInt(todo.time) * 1000).toLocaleString('chinese',{hour12:false}) }}</p>
            </div>
            <div style="clear:both"></div>
            <div style="text-align:center;" v-if="tai == 2">
              <div v-on:click="shou(todo.buyer,todo.number)" class="zi3" :style="{ background: quan.color }"
              >确认打款</div>
            </div>
            <div style="height:10px;"></div>
            <div style="height:20px;background:#F5F5F5;"></div>
          </div>
        </div>
      </div>
      <div style="height:60px;background:#F5F5F5;"></div>

      <loading :show="ss5" text="加载中.."></loading>
      <loading :show="ss6" text="确认中.."></loading>
      <loading :show="ss1" text="更改中.."></loading>
      <loading :show="shiz" text="识别成功.."></loading>
      <toast v-model="ss7"  :time="2000" is-show-mask text="操作成功!"></toast>
      <toast v-model="ss8"  :time="2000" type="cancel" is-show-mask text="操作失败!" width="12em"></toast>
      <toast v-model="ss2"  :time="2000" type="cancel" is-show-mask text="您的权限不足！要乖乖哦" width="18em"></toast>
      <toast v-model="cuo1" :time="1500" type="cancel" is-show-mask text="资金密码有误！" width="18em"></toast>
      <toast v-model="cuo2" type="cancel" :time="1800" is-show-mask text="未检测到资金密码!请在设置中添加" width="18em"></toast>
      <toast v-model="cuncuo" type="cancel" :time="1800" is-show-mask text="库存不足！请及时充值" width="18em"></toast>
      <popup v-model="ss9" height="300px" is-transparent>
        <div style="width:95%;background-color:#fff;height:280px;margin:0 auto;border-radius:5px;padding-top:10px;">
          <p style="text-align: center;font-size:20px;">更改矿机单价</p>
          <group style="margin-top:40px;">
            <x-input v-model="price" title="矿机单价"  placeholder="人民币" placeholder-align="right" type="number"></x-input>
          </group>
          <div style="padding:20px 15px;margin-top:25px;">
            <x-button  @click.native="zhuan1" :style="{ background: quan.color,color:'#fff' }">确认更改</x-button>
            <x-button @click.native="qu">取消</x-button>
          </div>
        </div>
      </popup>
        <!--确认提示-->
      <confirm v-model="show"
               title="确认提示"
               @on-cancel="onCan1"
               @on-confirm="onCon1"
               @on-show="onShow1"
               @on-hide="onHide1"
               >
        <p style="text-align:center;">是否收到此订单的打款</p>
      </confirm>
      <!--资金密码框-->
      <popup v-model="jintan" height="310px" is-transparent position="top" style="margin-top:10px;z-index:999;" :hide-on-blur="false">
        <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
          <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
            <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
          </div>
          <group>
            <x-input v-model="zimi" title="资金密码" type="password"  placeholder="请输入资金密码"></x-input>
          </group>
          <div style="padding:20px 15px;margin-top:25px;">
            <x-button  @click.native="queda()" :style="{ background: quan.color,color:'#fff',height:'40px' }">确认</x-button>
            <x-button @click.native="buda" style="height:40px;">取消</x-button>
          </div>
        </div>
      </popup>
      <alert v-model="show1" title="请验证指纹" @on-show="onShow" @on-hide="onHide" button-text="取消使用密码">
        <div  style="">
          <div style="height:20px;"></div>
          <img src="@/assets/icos/zw.png" alt="" style="width:80px;">
          <div style="height:10px;"></div>
        </div>
      </alert>
    </div>
</template>

<script>
  import {Divider,XHeader,Loading,InlineLoading,XButton,Toast,Flexbox, FlexboxItem,XNumber,Tab,TabItem,Popup,XInput,Group,Confirm,Alert}from 'vux'
    export default {
        name: "order",
      components:{ Divider,XHeader,Loading,InlineLoading,XButton,Toast,Flexbox, FlexboxItem,XNumber,Tab,TabItem,Popup,XInput,Group,Confirm,Alert},
      data(){
          return{
            bodyHeight:'',
            dingdan:[],
            jine:'',
            tai:1,
            users:'',
            ss5:false,
            ss6:false,
            ss7:false,
            ss8:false,
            ss9:false,
            ss1:false,
            ss2:false,
            price:'',
            show:false,
            buyuser:'',
            shuliang:'',
            bian:1,
            zimi:'',
            zimi1:'',
            jintan:false,
            cuo1:false,
            cuo2:false,
            show1:false,
            shiz:false,
            cuncuo:false,
          }
      },
      computed: {
        ull(){
          return this.$store.state.uri;
        },
        quan(){
          return this.$store.state.zuli;
        },
        style1() {
          return {
            color: this.quan.color,
            paddingBottom:'16px',
            borderBottom:'3px solid'+this.quan.color
          }
        },
        style2() {
          return {
            color:'#999'
          }
        },
      },
      methods:{
        fhui(){
          this.$router.push('/user')
        },
        queda(){
          let that = this
          if(that.zimi.length < 3){
            that.cuo1 = true
            that.zimi = ''
            return
          }
          that.gaozhuan(this.buyuser,this.shuliang)
        },
        buda(){
          this.jintan = false
          this.zimi = ''
          this.buyuser = ''
          this.shuliang = ''
        },
        //指纹弹窗消失和隐藏
        onHide(){
          let that = this
          if(!that.shiz){
            that.jintan = true
          }
        },
        onShow(){
        },
        onHide1(){
          // console.log('on hide')
        },
        onShow1(){
          // console.log('on show')
        },
        onCon1(){
        // 在弹出资金密码框
        //   this.gaozhuan(this.buyuser,this.shuliang)
          let that = this
          let zw = localStorage.getItem('zhiwens')
          if(zw){
            //  弹出指纹样式
            that.show1 = true
            //  下面是真正的指纹方法
            that.wenfus()
          }else{
            //没有开启指纹 弹出密码框
            that.jintan = true
          }
        },
        onCan1(){
        //  取消打款
          console.log('取消打款')
          let that = this
          that.buyuser = ''
          that.shuliang = ''
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
              _this.shiz = true
              // //关掉指纹的样式弹窗
              _this.show1 = false
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
                  _this.show1 = false
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
        //拿取资金密码
        //指纹成功后调取的方式
        wendmi(){
          let mis =  localStorage.getItem("jinmi");
          console.log(mis)
          // 调用支付方法 别忘了 shiz 还整加载中
          if(!mis){
            setTimeout(() => {
              this.$router.push('/user')
            },2000)
            return
          }
          this.zimi = mis
          this.gaozhuan(this.buyuser,this.shuliang)
        },
        //  确定更改价格
        zhuan1(){
          let that = this
          if(!that.price){
            console.log('请输入价格')
            return;
          }
          // console.log(parseFloat(that.price))
          // console.log(typeof  parseFloat(that.price))
          that.ss1 = true
          that.axios.post(that.ull+'/price',
            {
              "price":parseFloat(that.price),
              "admin":that.users.hu,
              "password":that.users.mima
            }).then(response => {
            that.ss1 = false
            // console.log(response.data)
            if(response.data == 'error'){
              that.$router.push('/user')
              return
            }
            //反转一下订单数据
            if(response.data == 'success'){
              that.ss7 = true
              that.price = ''
              that.ss9 = false
              return
            }
            //操作失败
            that.ss8 = true
          }).catch(function (error){
            that.ss1 = false
            that.ss8 = true
            console.log(error);
          })
        },
        //  取消
        qu(){
          this.price = ''
         this.ss9 = false
        },
        //  更改价格
        prices(){
          this.ss9 = true
        },
        //  确认
        shou(a,b){
          let that = this
          that.buyuser = a
          that.shuliang = b
          that.show = true
        },
        //真正确认
        gaozhuan(a,b){
          let that = this
          that.ss6 = true
          that.axios.post(that.ull+'/confirm_buy_admin',
            {
              "buyer":parseInt(a),
              "admin":that.users.hu,
              "password":that.users.mima,
              "number":parseInt(b),
              "drawback_passwd":that.zimi
            }).then(response => {
            that.ss6 = false
            that.shiz = false
            // console.log(response.data)
            if(response.data == 'success'){
              that.ss7 = true
              that.buda()
              that.dings(2)
              return
            }
            if(response.data == 'error_amount'){
              that.cuncuo = true
              that.buda()
              return
            }
            if(response.data == 'password_drawback_error'){
              that.cuo1 = true
              that.zimi = ''
              return
            }
            if(response.data == 'password_drawback_error_null'){
              that.cuo2 = true
              that.zimi = ''
              return
            }
            that.ss8 = true
          }).catch(function (error){
            that.shiz = false
            that.ss6 = false
            that.ss8 = true
            console.log(error);
          })
        },
        // 算出每笔订单到底多少钱
        huilv(e,m){
          let a =  e*m
          return a.toFixed(2)
        },
        dings(e){
          // console.log(e)
          let that = this
          that.ss5 = true
          let aa = 0
          let bb = 0
          if(e == 1){
            aa = 0
            bb = 0
            that.tai =1
          }else if(e == 2){
            aa = 1
            bb = 0
            that.tai = 2
          }else if(e == 3){
            aa = 1
            bb = 1
            that.tai = 3
          }
          that.axios.post(that.ull+'/search_order',
            {
              "admin":that.users.hu,
              "password":that.users.mima,
              "confirm_self":aa,
              "confirm":bb
            }).then(response => {
            that.ss5 = false
            // console.log(response.data)
            if(response.data == 'error' || response.data == 'error_null'){
              that.ss2 = true
              setTimeout(() => {
                that.$router.push('/user')
              }, 2100)
              return
            }
            //反转一下订单数据
            that.dingdan = response.data.reverse()
            if(that.dingdan.length ==0){
              that.dingdan = ''
              return
            }
          }).catch(function (error) {
            that.ss5 = false
            console.log(error);
            that.dingdan = ''
            return
          })
        },
        xuan(e){
          let that = this
          if(e == 1){
            //全部
            that.bian = 1
            this.dings(e)
          }else if(e == 2){
            //收入
            that.bian = 2
            this.dings(e)
          }else if(e == 3){
            //支出
            that.bian = 3
            this.dings(e)
          }
        },
        //选择状态
        onItemClick(e){
          console.log('订单的状态'+ e)
          this.dings(e)
        },tais(e,m){
          let that = this
          //  e是官方确认  m 是用户确认
          // console.log(typeof e,typeof m)
          if(m == 0 && e == 0){
            return  1
          }else if(m == 1 && e == 0){
            return 2
          }else if(m == 1 && e == 1){
            return 3
          }
        },
        //真正显示状态的方法 真不容易
        xian1(e){
          if(e == 1){
            return '订单待付款'
          }else if(e == 2){
            return '订单待审核'
          }else if(e == 3){
            return '订单已完成'
          }
        }
      },
     mounted(){
       let that = this
       that.bodyHeight=document.documentElement.clientHeight
       document.documentElement.scrollTop = document.body.scrollTop = 0;
       let message = localStorage.getItem('user');
       if(!message){
         //跳转登陆
         that.$router.push('/zhu')
         return
       }
       message = JSON.parse(message)
       that.users = message
       that.dings(1)
     }
    }
</script>

<style scoped>
  .tab{
    float:left;width:33%;text-align:center;height:40px;background:#fff;
  }
  .zi3{
    height:35px;width:40%;color:white;line-height:35px;margin-left:30%;border-radius:5px;
  }
  .anniu{
    background:#9c4eee;
  }
  .zi1{
    height:30px;
  }
  .zi2{
    float:right;padding:5px;box-sizing:border-box;line-height:1.2;text-align:center;width:100px;
    border-radius:5px;
  }
</style>
