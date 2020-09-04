<template>
  <div @click.prevent="purchaseClose" style="position: fixed;;height: 100vh;z-index: 10000;top: 0;background: rgba(0,0,0,0.3)">
    <div class="purchase" @click.stop="">
      <p style="font-size: 0.75rem;color: #000;line-height: 2rem;text-align: center">当前优惠</p>

      <Scroll class="main-content" :data="coupons">
        <!--      优惠券列表-->
        <div style="margin-top: .3rem;">

        <span v-if="coupons.length == 0" style="text-align: center;">
          <img src="@/assets/images/coupon.png" alt="" class="praiseimg">
        </span>

          <div v-for="(item,index) in coupons" :key="item.id" class="couponitem">
            <div class="couponitemLeft">
              <div style="width: 30%;text-align: center;display: flex;justify-content: center;align-items: flex-end">
                <span v-show="item.type == 1 " style="line-height: 0.95rem">&nbsp<span style="font-size:18px;font-weight: 700">{{item.value}}</span></span>
                <span  v-show="item.type == 2"  style="font-size:18px;font-weight: 700">{{parseFloat(item.sale)}}折</span>
              </div>
              <div class="couponitemLeftbtm">
                <div><span>{{item.desc}}</span></div>
                <div v-show="item.isForever == 1"><span>永久有效</span></div>
                <div v-show="item.isForever != 1"><span>{{format(item.startTime)}}</span>--<span>{{format(item.endTime)}}</span></div>
              </div>
            </div>
            <div class="couponitemRigh" @click="addcoupon(item.id)">
              立即领取
            </div>
          </div>
        </div>
      </Scroll>

      <!--      关闭页面-->
      <div class="purchaseguanbi">
        <span class="backcolors" @click="purchaseClose" >关闭</span>
      </div>

    </div>
  </div>
</template>

<script>
    import Scroll from "@/base/scroll/scroll";
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "purchase",
        components:{Scroll},
        props:{
            coupons:{
                type:Array,
                default:[]
            }
        },
        created(){
        },
        data(){
            return{

            }
        },
        methods:{
            goBack(){
                this.$emit('remlincoupon', false)
                //replace替换原路由，作用是避免回退死循环
            },
            format(shijianchuo){
                function  add0(m){return m<10?'0'+m:m };
                console.log(shijianchuo)
                var time = new Date(parseInt(shijianchuo*1000));
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                // var h = time.getHours();
                // var mm = time.getMinutes();
                // var s = time.getSeconds();
                return y+'.'+add0(m)+'.'+add0(d);//+' '+add0(h)+':'+add0(mm)+':'+add0(s)
            },
            //点击领取优惠券
            addcoupon(id){
                this.$emit('addgoodscoupon', id)
            },
            //关闭页面
            purchaseClose(){
               this.$emit('remlincoupon', false)
            }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../../common/stylus/variable";
  .purchase
    width 100vw
    position relative
    top 31vh
    height 69vh
    z-index 2000
    background #fff
    font-size 14px
    border-top-left-radius 15px
    border-top-right-radius 15px
    .main-content
      height: 50vh;
      overflow: hidden;
      position: relative;
    .purchaseguanbi
      position absolute
      bottom 1rem
      width 100%
      display flex
      justify-content center
      span
        display inline-block
        line-height 1rem
        color #ffffff
        font-size 14px
        font-weight 800
        text-align center
        width 92%
        padding 6px 0
        border-radius 25px
    .praiseimg
      display block
      width 100%
      height auto
      margin 0 auto
      margin-top 7vh
    .couponitem
      width 92%
      display flex
      justify-content space-between
      align-items center
      margin 0.4rem auto
      border-radius 6px
      background #f1d2ff
      color #9a55ff
      .couponitemLeft
        display flex
        justify-content space-between
        align-items center
        padding 0.2rem 0
        margin 0.3rem 0
        width 75%
        border-right 0.5px dashed #9a55ff
        .couponitemLeftbtm
          width 66%
          line-height 0.8rem
          text-align left
          font-size 14px
      .couponitemRigh
        width 25%
        text-align center
        font-weight 750
        font-size 16px


</style>
