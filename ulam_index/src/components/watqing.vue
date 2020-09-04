<template>
    <div style="background:#fff;" :style="{ height: bodyHeight + 'px' }">
      <div class="back1 backcolors" >
        <img src="@/assets/2_03.png" alt=""   class="back2" v-on:click="fanhui1" style="width: 30px;height: auto;display: block">

      </div>
      <div style="height:70px;"></div>
      <!-- 具体信息-->
      <!--<div style="height:15px;background:#fff;"></div>-->
      <div style="padding:15px;box-sizing:border-box;background:#fff;" v-if="shuju">
          <div style="height:50px;border-bottom:1px solid #f5f5f5;line-height: 50px">
           <div style="float:left;width:50%;font-size: 14px;color: #999">交易金额</div>
           <div style="float:left;width:50%;text-align: right;font-size:18px;margin-top:-7px;color:#000;">
             {{shuju.direction == 'to'? '+'+shuju.value.toFixed(2):'-'+ shuju.value.toFixed(2) }}
           </div>
            <div style="clear: both;"></div>
          </div>
          <p class="zi1" style="font-size: 14px;color: #999">发送地址</p>
        <div style="margin-top:-10px;">
          <p class="zi2" style="color: #000;font-weight: 400;">{{shuju.from}}</p>
        </div>
        <p class="zi1" style="font-size: 14px;color: #999">接收地址</p>
        <div style="margin-top:-10px;">
          <p class="zi2" style="color: #000;font-weight: 400;">{{shuju.to}}</p>
        </div>
        <p class="zi1" style="font-size: 14px;color: #999">交易哈希</p>
        <div style="margin-top:-10px;padding-bottom: 25px">
          <p class="zi2" style="color: #000;font-weight: 400;">{{shuju.tran_hash}}</p>
        </div>



        <div style="height: 30px;border-top: 0.5px solid rgb(245, 245, 245)"></div>


        <div>
          <div style="float: left;width:50%;">
            <p class="zi1" style="font-size: 12px;color:#999 ">区块</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2" style="font-size: 12px;color:#999 ">{{shuju.block}}</p>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div>
          <div style="float: left;width:50%;">
            <p class="zi1" style="font-size: 12px;color:#999 ">备注</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2" style="font-size: 12px;color:#999 ">{{shuju.direction == 'to'?'接收方':'发送方'}}</p>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div>
          <div style="float: left;width:50%;">
            <p class="zi1" style="font-size: 12px;color:#999 ">时间</p>
          </div>
          <div style="float:left;width:50%;text-align: right;">
            <p class="zi2" style="font-size: 12px;color:#999 ">{{new Date(parseInt(shuju.timestamp) * 1000).toLocaleString('chinese',{hour12:false})}}</p>
          </div>
        </div>
        <div style="clear: both;height:30px;background:#fff;"></div>
      </div>
    </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading} from 'vux'
    export default {
        name: "watqing",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading
      },
      data(){
          return {
            shuju:'',
            bodyHeight:'',
            nums:'',
          }
      },
      mounted(){


          if(window.plus){
              window.plus.navigator.setStatusBarStyle('white')
          }
        let that = this
        if(window.plus) {
          plus.navigator.setStatusBarBackground("#FFF");
        }
        let a = that.$route.params.id;
        this.nums = that.$route.params.str;

        if(!a){
          that.$router.push('/wallet')
          return
        }
        that.shuju = a
        console.log(a)
        //  获取当前高度
        that.bodyHeight=document.documentElement.clientHeight
      },
      methods:{
        fanhui1(){
          this.$router.push({
              path:'/watorder',
              query:{
                  id:this.nums
              }
          })
        }
      }
    }
</script>

<style scoped>
.zi1{color:#646363;font-size:14px;margin-top:15px;}
.zi2{color:#999999;font-size:14px;margin-top:15px;word-wrap:break-word;font-weight:300;overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;}
</style>
