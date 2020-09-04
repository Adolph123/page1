<template>
  <div class="payment">
    <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
    <Scroll class="main-content">
      <div>
        <div class="paymentlist">
          <h1 class="title">支付宝支付</h1>
          <div class="jditem" style="border: 0">
            <span>支付宝支付</span><span>
            <i class="radio " :style="{background:isflag? '#9a55ff':'#fff',borderColor:isflag? '#9a55ff':'#bababa'}"
            ></i>
          </span>
          </div>

          <div class="jditem" >
            <span>支付宝好友支付</span><span><i class="radio"></i></span>
          </div>
        </div>
        <div class="paymentlist">
          <h1 class="title">微信支付</h1>
          <div class="jditem" style="border: 0">
            <span>微信支付</span><span><i class="radio"></i></span>
          </div>

          <div class="jditem" >
            <span>微信好友支付</span><span><i class="radio"></i></span>
          </div>
        </div>
        <div class="paymentlist">
          <h1 class="title">银行卡支付</h1>
          <div class="jditem" style="border: 0">
            <span><i class="el-icon-bank-card icontb"></i>招商银行</span><span> <i class="radio"></i></span>
          </div>
          <div class="jditem" >
            <span><i class="el-icon-bank-card icontb" style="background: orangered"></i>招商银行</span><span><i class="radio"></i></span>
          </div>
          <div class="jditem" >
            <span><i class="el-icon-bank-card icontb" style="background: #2c3e50"></i>招商银行</span><span> <i class="radio"></i></span>
          </div>
          <div class="jditem" style="margin: 0.1rem 0 0.6rem">
            <span>其他付款方式</span><span><span style="color: #ccc">绑定新卡</span> <i class="el-icon-arrow-right" style="color: #bababa"></i></span>
          </div>
        </div>

      </div>
    </Scroll>

<!---->
    <Iframes v-if="isitemurl" :itemurl="itemurl"></Iframes>
<!--    支付提示-->
    <el-dialog
      title="是否支付成功"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <div style="display: flex;justify-content: space-between;padding-bottom: 1rem;">
        <span class="botm" @click="toAllorder">已支付</span>
        <span class="botm"@click="toAllorder">未支付</span>
      </div>

    </el-dialog>



    <div class="paymentBotm">
        <router-link to="/payment" tag="div">
          <button class="paymentBotmbtn" @click="toAlipay"> 确认支付 </button>
          <div v-html="alipayWap" ref="alipayWap">确认支付</div>
        </router-link>
    </div>
  </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader";
    import Iframes from './iframe/iframe';
    import {getdislist} from '@/api/index'
    import Scroll from "@/base/scroll/scroll"
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        data(){
            return{
                content:"支付页",
                dialogVisible:false,
                alipayWap:'',
                isflag:true,
                itemurl:'',
                isitemurl:false,
            }
        },
        created(){
            // this.zhifu()
        },
        methods: {

            //跳转全部订单
            toAllorder(){
                this.$router.push({
                    path:'/allorders'
                })
                this.dialogVisible = false;
            },
            toAlipay(){
                const apiurl = `v1/shop/order/pay`;
                let data = JSON.parse(this.$route.query.OrderNo);
                getdislist(apiurl,data).then(res => {
                    console.log(res,'数据');
                    this.itemurl = res.data;
                    this.isitemurl = true;
                    setTimeout(()=>{
                        this.isitemurl = false;
                        this.dialogVisible = true;

                    },5000)
                })
            },









            /**
             * 支付宝支付
             */
            goAlipay () {

                const data = {
                    /* 自身接口所需的一些参数 */

                        amount: this.price,
                    /* 支付后支付宝return的url */
                    // returnUrl: 'www.baidu.com'
                    returnUrl: window.location.origin + window.location.pathname + '?userParams=' + this.userParams
                  }
                getdislist(
                    this.$apiSetting.alipay,
                    data
                ).then(res => {
                    console.log(res,'aaaaa');
                    if (res.data.statusCode === '000000') {
                        const div = document.createElement('div')
                        /* 此处form就是后台返回接收到的数据 */
                        div.innerHTML = res.data.data.alipayInfo;
                        document.body.appendChild(div);
                        document.forms[0].submit();
                    }
                }, error => {
                    this.$loading.hide()
                    console.log(error)
                })
            }
        },
        components:{
            Pageheader,Scroll,Iframes
        }
    }
</script>
<style>
  .el-dialog__header{
    text-align: center;
  }

</style>

<style scoped lang="stylus">
  .payment
    height: 100vh;
    text-align left
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5
    .main-content
      height: 86vh;
      overflow: hidden;
      position: relative;
    .radio
      display inline-block
      width 0.4rem
      height 0.4rem
      border-radius 50%
      margin-left 0.5rem
      border 1px solid #bababa

    .paymentlist
      width 90%
      margin 0 auto 0.6rem
      background #fff
      border-radius 6px
      .title
        padding 0.6rem 0.7rem
        font-size 0.65rem
        font-weight 700
      .jditem
        display flex
        align-items center
        justify-content space-between
        padding 0.4rem 0.7rem 0.6rem
        .el-icon-bank-card
          font-size 0.9rem
          text-align center
          display inline-block
          color #fff
          border-radius 50%
          background #e01212
        .icontb
          margin-right 0.5rem

    .botm
      padding 0.3rem 1.2rem
      background #9a55ff
      border-radius 30px
      color #fff
    .paymentBotm
      width 100%
      height 5vh
      padding 0.5rem 0
      position fixed
      z-index 1000
      bottom 0
      background #f5f5f5
      .paymentBotmbtn
        width 80%
        margin 0 auto
        border 0
        outline 0
        display block
        font-size 0.65rem
        padding 0.3rem 1.2rem
        background #9a55ff
        border-radius 30px
        color #fff
</style>
