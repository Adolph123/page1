<template>
    <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">


      <!--    顶部返回-->
      <div class="backcolors" >
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
            <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
          </div>
          <div style="height: 30px;">

          </div>
          <div style="position: absolute;width: 100%;left: 0;">
            <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
              <span style="font-size: 16px;color: #fff">合伙人 </span>
            </div>
          </div>

        </div>
      </div>



      <div style="background:#fff;width:100%;padding:20px 10px 10px;box-sizing:border-box;position:relative;">
<!--        <div style="height:10px;"></div>-->
        <div  class="backcolors" style="position:absolute;top:10px;right:0px;width:100px;height:28px;border-radius:5px;display: flex;align-items: center;justify-content: center;
    text-align:center;line-height:28px;color:white;font-size:14px;" v-on:click="tibi">
          <span>点击提币</span>
          <img src="@/assets/baiyou.png" alt="" style="width:14px;">
        </div>

        <p style="color:#9C9B9C;font-weight: 400;font-size: 14px">可提取奖励</p>

        <div style="margin-top: 5px">
          <p style="font-size:20px;font-weight:700;line-height: 30px">{{yj?yj:0}}<span style="font-size:16px;font-weight: 400;">&nbsp;ULAM</span></p>
        </div>
      </div>
      <!-- 俩个数据-->
      <div style="height:15px;"></div>
      <div style="text-align:center;line-height:32px;position:relative;">
        <div class="jiji">
          <p class="zi1">累计奖励</p>
          <p style="font-weight:700;font-size: 16px" v-if="shuju">{{shuju.info[0].reward}}</p>
        </div>
        <!--未激活的矿机-->
        <div class="weiji">
          <p class="zi1">已领取奖励</p>
          <p style="font-weight:700;font-size: 16px" v-if="shuju">{{shuju.info[0].reward_draw}}</p>
        </div>
        <div style="position:absolute;width:1px;height:40px;border-left:1px solid #f5f5f5;top:25px;left:50%;"></div>
        <div style="clear:both;"></div>
      </div>
<!-- 下面的栏-->
      <div style="height:15px;"></div>
      <div style="height:12px;background:#fff;"></div>
      <div class="kk2 cebor">
        <p>
          <span style="margin-left:15px;font-size: 16px">
            <img src="@/assets/icos/jp.png" alt="" style="width:20px;position:relative;top:4px;">
            合伙人等级
          </span>
          <span class="tu2" style="font-size: 16px" v-if="shuju">- {{cdr(shuju.info[0].level_self)}}</span>
        </p>
        <div style="clear:both;"></div>
        <div style="padding:0 12px;box-sizing:border-box;margin:5px 0;font-size:14px;">
          <p v-if="shuju" style="color:#9C9B9C;word-break:break-all;font-size: 14px">
            &nbsp;&nbsp;&nbsp;{{deng[shuju.info[0].level_self]}}
          </p>
          <p style="text-align:right;font-size:10px;color:#9a55ff;font-size: 12px" v-on:click="lgs">
            了解更多..
          </p>
        </div>
      </div>
      <div style="height:15px;"></div>

      <div style="background: #fff;font-size:14px;height:35px;line-height: 35px;display: flex;justify-content: space-between;
      padding: 5px 15px;"    @click="kanxia">
        <span>一级推广人数</span>
        <p>
          <span style="color:#999 " v-if="shuju">{{shuju.info[0].level_1}}&nbsp;&nbsp;</span>
          <i class="el-icon-arrow-right" style="font-weight: 700;color: #999"></i>
        </p>
      </div>

      <div style="height: 2px;background: #f5f5f5"></div>

      <div  style="background: #fff;font-size:14px;height:35px;line-height: 35px;display: flex;justify-content: space-between;
      padding: 5px 15px;"
            @click="kanxia">
        <span>二级推广人数</span>
        <p>
          <span style="color:#999 " v-if="shuju">{{shuju.info[0].level_2}}&nbsp;&nbsp;</span>
          <i class="el-icon-arrow-right" style="font-weight: 700;color: #999"></i>
        </p>
      </div>

      <div style="clear:both;height:12px;"></div>
      <!--弹窗-->
      <loading :show="ss1" text="加载中.."></loading>
      <toast v-model="xbb" type="cancel" :time="3000" is-show-mask text="您未达到合伙人条件~" width="18em"></toast>
    </div>
</template>

<script>
  import { Toast,Group, Cell,XHeader,XInput,XButton,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading,CellBox} from 'vux'
    export default {
        name: "grade",
      components:{
        Toast, Cell,Group,XHeader, XInput, XButton,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading,CellBox
      },
      mounted(){
      //  拿取个人数据
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        let message = localStorage.getItem('user');
        if(!message){
          that.$router.push('/zhu')
        }else{
          message = JSON.parse(message)
          that.users = message
          that.ss1 = true
          that.login()
        }
      },
      data(){
          return {
            bodyHeight:'',xbb:false,
              users:'',
            ss1:false,
            showContent003:false,
            yj:0.00,
            shuju:'',
            deng:[
              '您当前为白银合伙人可享受一级用户手续费30%返还+二级用户手续费10%返还..',
              '您当前为黄金合伙人可享受一级用户手续费40%返还+二级用户手续费15%返还..',
              '您当前为铂金合伙人可享受一级用户手续费50%返还+二级用户手续费20%返还..',
              '您当前为钻石超级合伙人可享受一级用户手续费60%返还+二级用户手续费25%返还..'
            ]
          }
      },
      methods:{
        kanxia(){
          this.$router.push({ name: 'hexiaji',params:{ shu: this.shuju } })
        },
        fanhui1(){
          this.$router.push('/user')
        },
        //处理等级显示
        cdr(a){
          if(a == 0){
            return '白银'
          }else if(a == 1){
            return '黄金'
          }else if(a == 2){
            return '铂金'
          }else if(a == 3){
            return '钻石'
          }
        },
        tibi(){
          this.$router.push('/tisx')
        },
        lgs(){
          this.$router.push('/rules')
        },
        //处理可提取数据
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
           that.yj = 0
            return
          }
          that.yj = newa
          // return newa
        },
        login(){
          let that = this;
          that.axios.post(this.apiurl+'/hehuo_search',
            {
              "mobile":parseInt(that.users.hu),
              "password":that.users.mima
            }).then(response => {
            that.ss1 = false
              console.log(response.data)
            if(!response.data.info.length){
              that.xbb = true
              setTimeout(() => {
                that.$router.push('/daiwa')
              }, 3000)
            }else {
              that.shuju = response.data
              //总共减去已经领取的
              that.sjiang(that.shuju.info[0].reward,that.shuju.info[0].reward_draw)
            }
          }).catch(function (error) {
            that.ss1 = false
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>
  .sub-item {
    color:#9C9B9C;text-align:right;
  }
  .tu2{
    float:right;margin-right:4%;
  }
  .cebor1{
    border-top: 2px solid #f5f5f5;
  }
  .cebor{
    border-bottom: 1px solid #F5F5F5;
  }
  .kk1{
    height:50px;width:100%;line-height:50px;background:#fff;font-size:14px;
  }
  .kk2{
    height:100px;width:100%;background:#fff;
  }
  .zi1{
    color: #777575;font-size:14px;margin-top:10px;font-weight: 400;;
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
