<template>
    <div>
      <div  style="position:fixed;top:0px;width:100%;z-index:998;">
        <x-header :left-options="{preventGoBack: true,backText: ''}"  @on-click-back="fanhui1">购买记录</x-header>
        <!--<tab>-->
          <!--<tab-item selected @on-item-click="onItemClick(1)">未付款</tab-item>-->
          <!--<tab-item @on-item-click="onItemClick(2)">未核实</tab-item>-->
          <!--<tab-item @on-item-click="onItemClick(3)">已完成</tab-item>-->
        <!--</tab>-->
        <div style="height:15px;background:#fff;"></div>
        <div>
          <div class="tab" v-on:click="xuan(1)">
            <span v-bind:style="[ bian == 1 ? style1: style2] ">未付款</span>
          </div>
          <div class="tab" v-on:click="xuan(2)">
            <span v-bind:style="[ bian == 2 ? style1: style2] ">未核实</span>
          </div>
          <div class="tab" v-on:click="xuan(3)">
            <span v-bind:style="[ bian == 3 ? style1: style2] ">已完成</span>
          </div>
          <div style="float:left;width:1%;background:#fff;height:40px;"></div>
        </div>
      </div>
      <div style="height:105px;"></div>
      <div style="padding:15px;box-sizing: border-box;">
          <div v-if="!dingdan" style="margin-top:30%;">
            <divider>暂无订单</divider>
          </div>
          <div v-if="dingdan">
            <div v-for="(todo,index) in dingdan" v-bind:key="todo.id" >
              <div style="position:relative;background:#fff;box-shadow:0px 0px 4px #ccc;border-radius:4px;">
              <div class="zi1">
                <span class="zi3" :style="{ background: quan.color }">{{
                  xian1(tais(todo.confirm,todo.confirm_self))
                  }}</span>
              </div>
              <div style="float:left;width:40%;">
                <img src="@/assets/xianka.png" alt="" style="width:100%;border-radius:8px;">
              </div>
              <div style="float:left;margin-left:20px;width:52%;margin-bottom:20px;">
                <p style="font-size:14px;font-weight:700">个人矿机 ×{{todo.amount}}</p>
                <p style="font-weight:70;color:#ff0000;">&nbsp{{huilv(todo.price,todo.amount)}}</p>
                <p style="font-size:12px;color:#A8A6A6;margin-top:5px;">订单号：{{todo.number}}</p>
                <p style="font-size:12px;color:#A8A6A6;">购买时间：{{new Date(parseInt(todo.time) * 1000).toLocaleString('chinese',{hour12:false}) }}</p>
              </div>
              <div style="position:absolute;top:60px;right:10px;" v-if="tai == 1"
                   v-on:click="tiao(todo.amount,huilv(todo.price,todo.amount),todo.number)">
                <img src="@/assets/duo.png" alt="" width="30">
              </div>
               <div style="clear:both;"></div>
              </div>
              <div style="height:20px;"></div>
            </div>
          </div>
      </div>
      <div style="height:60px;"></div>
      <loading :show="ss5" text="加载中.."></loading>
    </div>
</template>

<script>
  import {Divider,XHeader,Loading,InlineLoading,XButton,Toast,Flexbox, FlexboxItem,XNumber,Tab, TabItem}from 'vux'
    export default {
        name: "jilu",
      components:{ Divider,XHeader,Loading,InlineLoading,XButton,Toast,Flexbox, FlexboxItem,XNumber,Tab, TabItem},
      data(){
        return {
          dingdan:[],
          jine:'',
          tai:1,
          users:'',
          ss5:false,
          t1:'',
          bian:1,
        }
      },
      computed:{
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
      mounted(){
        let that = this
        let message = localStorage.getItem('user');
        if(!message){
          //跳转登陆
          that.$router.push('/zhu')
          return
        }
        console.log(that.quan)
        //获取路由参数
        that.t1 = that.$route.params.id
        message = JSON.parse(message)
        that.users = message
        that.dings(1)
      },
      methods:{
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
        //  返回方法
        fanhui1(){
          // this.$router.push({ name: 'buyji',params:{ id: this.t1 } })
          this.$router.push({ name: 'index',params:{ id: this.t1 } })
        },
          //请求订单
        dings(e){
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
          that.axios.post(that.ull+'/search_buy',
            {
              "buyer": that.users.hu,
              "password":that.users.mima,
              "confirm_self": aa,
              "confirm":bb
            }).then(response => {
            that.ss5 = false
            console.log(response.data)
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
          //选择状态
        onItemClick(e){
          console.log('订单的状态'+ e)
          this.dings(e)
        },
          //真正显示状态的方法 真不容易
          xian1(e){
            if(e == 1){
              return '请完成付款'
            }else if(e == 2){
              return '请联系客服'
            }else if(e == 3){
              return '订单已完成'
            }
          },
          //由订单跳转到具体支付页面
          tiao(a,b,c){
            //数量  金额  单号 状态
            this.$router.push({ name: 'buy',params:{ ll : a,jin:b,hao :c} })
            // that.$router.push({ name: 'buy',params:{ ll : shu,jin:bu,hao :danhao  } })
          },
          // 算出每笔订单到底多少钱
          huilv(e,m){
          //  根据购买的价格 以及现在的货率 算出实际的人民币价格
          //  1 美元/6.8707人民币  = e /?
          let a =  e*m
          return a.toFixed(2)
          },
      //  判断当前订单 是什么状态
        tais(e,m){
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
        }
      }
    }
</script>

<style scoped>
.zi3{
  color:white;float:right;height:22px;line-height:22px;text-align:center;width:90px;font-size:12px;border-radius:4px;
}
.zi1{
  height:30px;
}
.tab{
  float:left;width:33%;text-align:center;height:40px;background:#fff;
}
</style>
