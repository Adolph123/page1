<template>
    <div style="background:#fff;" :style="{ height: bodyHeight + 'px' }">
      <x-header  :left-options="{preventGoBack: true,backText: ''}"  @on-click-back="fanhui1">商品详情</x-header>
      <div style="padding:15px;box-sizing:border-box;position:relative;margin-bottom:-10px;">
        <img src="@/assets/xianka.png" alt="" style="width:70%;margin-left:15%;">
        <div class="jier" :style="{ background: quan.color }">
          ULAM云矿机
        </div>
      </div>
      <div style="height:10px;background:#F5F5F5;"></div>
      <!--具体信息-->
      <div>
          <div style="height:15px;"></div>
          <div style="padding:15px;box-sizing:border-box;position:relative;">
            <div class="zi1" :style="{ background: quan.color }">
            8年期
            </div>
            <div class="buylu" v-on:click="kanlu1">
               &nbsp;&nbsp;购买记录
               <img src="@/assets/you2.png" alt="" style="width:11px;">
            </div>
            <!--文字介绍-->
            <p style="margin-top:10px;font-weight:700;">ULAM云矿机</p>
            <div style="margin-top:10px;font-size:12px;color:#3E3E3E;">
              <p>
                ULAM云矿机是指包含2000ulam（可自由提取，但是至少每台矿机至少有2000ulam才能进行挖矿），无需购买硬件矿机即可获得挖矿服务，且不需要额外服务费。售价参照交易所价格进行浮动。
              </p>
            </div>
             <p class="quanzi" :style="{ color: quan.color }">
               预计净收益回报=挖出的ULAM都属于净收益
             </p>
              <p style="font-size:28px;margin-top:10px;">
                {{zhenprice}} <span style="font-size:12px;color:#8C8B8B;">&nbsp/台</span>
                <span style="float:right;font-size:13px;margin-top:18px;">库存：{{kucun}}</span>
              </p>
              <p style="font-size:14px;color: #E81018;">
                <!--推荐购买一级用户返4%ulam；二级用户返2%ulam-->
              </p>
          </div>
      </div>
      <div style="height:50px;"></div>
      <!--固定底部-->
        <div style="position:fixed;bottom:0px;width:100%;border-top:0.2px solid #eee;">
          <div style="float:left;width:50%;background:#fff;height:56px;">
              <x-number v-model="shu" button-style="round" :min="0" fillable  width="55%"
              style="margin-top:8px;"></x-number>
          </div>
          <div class="mai1" v-on:click="buy1" :style="{ background: quan.color }">
              确定购买
          </div>
          <div style="clear: both;"></div>
        </div>
      <!--弹窗-->
      <toast v-model="ss4" type="cancel" :time="1100" is-show-mask text="请选择购买数量!" width="12em"></toast>
      <loading :show="ss5" text="请求中.."></loading>
      <loading :show="kuxian" text="加载中.."></loading>
      <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="请求发生错误!" width="12em"></toast>
      <toast v-model="ss7" type="cancel" :time="1500" is-show-mask text="超出库存量!" width="12em"></toast>
    </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,XNumber} from 'vux'
    export default {
        name: "buyji",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,XNumber
      },
      data(){
        return {
          bodyHeight:'',
          zhenprice:0,
          shu:0,
          ss4:false,
          ss5:false,
          ss6:false,
          ss7:false,
          users:'',
          tt:'',
          kucun:0,
          kuxian:false,
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
        //  获取当前高度
        that.bodyHeight=document.documentElement.clientHeight
        that.seeprice()
        let message = localStorage.getItem('user');
        if(message){
          message = JSON.parse(message)
          that.users = message
          console.log(that.users)
        //查看组库存
          that.kuxian = true
          that.chazu(that.users.group_miner)
        }else{
          that.$router.push('/zhu')
        }
      //  拿取路由值
        that.tt = that.$route.params.id
        // console.log(that.tt)
      },
      methods:{
        chazu(a){
          let that = this
          that.axios.post(that.ull+'/search_num_miner',
            {
              "group_miner":a
            }).then(response => {
            console.log('第'+a+'组,库存:'+response.data)
            that.kuxian = false
              that.kucun = response.data
          }).catch(function (error) {
            that.kuxian = false
            console.log(error);
          })
        },
        //  看购买记录
        kanlu1(){
          // this.$router.push('/jilu')
          this.$router.push({ name: 'jilu',params:{ id: this.tt } })
        },
        //购买矿机
        buy1(){
          let that = this
          let shu = that.shu
          if(shu <=0){
            that.ss4 = true
            return
          }
          if(shu > that.kucun){
            that.ss7 = true
            that.shu = 0
           return
          }
          that.ss5 = true
          that.go2(that.zhenprice)
        },
        go2(e){
          let that = this
          let shu = that.shu
          console.log('当前购买量'+ shu)
          that.axios.post(that.ull+'/buy',
            {
              "buyer": parseInt(that.users.hu),
              "password":that.users.mima,
              "amount": shu
            }).then(response => {
            that.ss5 = false
            console.log('当前订单号为:'+response.data)
            if(response.data == 'error_price'){
              //提示价格有误  请重新请求
              that.ss6 = true
              return
            }
            //返回订单单号
            let danhao = response.data
            let bu = parseFloat(e) * shu
            // console.log('当前订单总价：'+bu)
            // console.log(typeof bu)
            bu = bu.toFixed(2)
            // return
            //  成功获得订单号 然后才能跳转
            // 传值后跳转确定付款页面
            that.$router.push({ name: 'buy',params:{ ll : shu,jin:bu,hao :danhao  } })
          }).catch(function (error) {
            that.ss5 = false
            that.ss6 = true
            console.log(error);
          })
        },
        //  查看价格
        seeprice(){
          let that = this
          that.axios.get(that.ull+'/get_price').then(response => {
            let ac =  response.data.substr(2);
            ac = ac.substr(0, ac.length - 1);
            // console.log(typeof ac)
            //  console.log(ac)
            that.zhenprice = ac
          }).catch(function (error) {
            console.log(error);
          })
        },
        //  返回方法
        fanhui1(){
          let that = this
          if(that.tt == 'q'){
            that.$router.push('/user')
          }else if(that.tt == 'k'){
            that.$router.push({ name: 'meji',params:{ id: 'k' } })
          }else {
            that.$router.push('/wallet')
          }
        },
      }
    }
</script>

<style scoped>
  .quanzi{
    margin-top:12px;font-size:14px;
  }
  .mai1{
    float:left;width:50%;height:56px;color:#fff;font-size:18px;
    text-align: center;line-height:56px;
  }
  .buylu{
    width:95px;height:22px;font-size:14px;color:#666;background:#c0bfc4;text-align: center;line-height:22px;
    border-top-left-radius:50px;border-bottom-left-radius:50px;
    position:absolute;top:14px;right:0px;
  }
.jier{
  color:#fff;width:104px;height:25px;font-size:14px;line-height:25px;text-align: center;border-radius:4px;
  position:absolute;top:70%;right:5%;
}
  .zi1{
    width:70px;height:22px;font-size:14px;color:white;text-align: center;border-radius:4px;line-height:22px;
  }
</style>
