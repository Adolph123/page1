<template>
    <div style="background:#fff;font-size: 16px" :style="{ height: bodyHeight + 'px' }">
      <x-header  :left-options="{preventGoBack: true,backText: ''}" style="position:fixed;top:0px;width:100%;z-index:999;background:#ff4f3d;"
                 @on-click-title="ding"  @on-click-back="fanhui1"
      ><span style="">{{bi}}</span> 糖包提取记录</x-header>
      <div style="height:60px;"></div>
      <div style="background:#fff;">
        <div class="yi" v-for="(todo,index) in shujus" v-bind:key="todo.id" v-on:click="zoukan(todo)">
          <div style="float:left;width:50%;">
            <div style="line-height:1.6;">
              <p class="zz1 zou">{{(todo.tx_hash).substr(0,20)+'...'}}</p>
              <p class="zz2 zou">
                {{ new Date(parseInt(todo.time) * 1000).toLocaleString('chinese',{hour12:false}) }}
              </p>
            </div>
          </div>
          <div style="float:left;width:50%;text-align:right;line-height:42px">
            <p class="zz1 you">
              {{todo.balance}}
              <img src="@/assets/you2.png" alt="" style="width:11px;">
            </p>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
      <div v-if="shujus.length == 0" style="padding:15px;box-sizing:border-box;margin-top:100px;">
        <divider> <span style="color:#999;">暂无提取记录</span> </divider>
      </div>
      <!--弹窗-->
      <loading :show="ss1" text="加载中.."></loading>
    </div>
</template>

<script>
  import {Divider,Group,Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,InlineLoading} from 'vux'
    export default {
        name: "tanglus",
      components:{
        Divider,Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,InlineLoading
      },
      data(){
        return {
          bi1:'', bi:'', ss1:false, users:'', shujus:'', bodyHeight:'',
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
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        if(window.plus) {
          plus.navigator.setStatusBarBackground("#ff4f3d");
        }
        that.bi1 = that.$route.params.bi
        if(that.bi1=='ulamerc'){
          that.bi = 'ULAM'
        }else  if(that.bi1 == 'ulam'){
          that.bi = 'ULAM'
        }else  if(that.bi1 == 'caos'){
          that.bi = 'CAOS'
        }
        //币的金额是多少
        that.bishu = that.$route.params.jin
      //  开始调取方式
        let message = localStorage.getItem('user');
        if(!message){
          that.$router.push('/zhu')
        }else{
          message = JSON.parse(message)
          that.users = message
          // console.log(that.users)
          // 调取红包记录
          that.diaolu()
        }
      },
      methods:{
          //去看一下提取详情
        zoukan(a){
          let that = this
          that.$router.push({ name: 'titlus',params:{bi:that.bi1 ,jin:that.bishu,shuju:a} })
        },
          diaolu(){
            let that = this
            that.ss1 = true
            that.axios.post(
             that.ull+ "/drawback_search",
              {
                "password":that.users.mima,
                "mobile":parseInt(that.users.hu),
                "erc20":that.bi1
              }
            ).then(response =>{
              that.ss1 = false
              console.log(response.data)
              that.shujus = response.data.reverse()
            }).catch(function (error){
              that.ss1 = false
              console.log(error);
            })
          },
        //  返回方法
        fanhui1(){
          let that = this
          that.$router.push({ name: 'tanglu',params:{bi:that.bi1 ,jin:that.bishu} })
        },
        //回到顶部
        ding(){
          document.documentElement.scrollTop = document.body.scrollTop =0;
        },
      }
    }
</script>

<style scoped>
  .you{margin-right:15px;color:#E51C23;}
  .zz2{
    margin-top:5px;
    color:#999;
    font-size:12px;
  }
  .zz1{
    font-weight:700;
    font-size:14px;
  }
  .zou{margin-left:15px;}
  .yi{
    width:100%;margin-top:10px;border-bottom:0.5px solid #eee;padding-bottom:12px;
  }
</style>
