import { SensorsIndicators } from 'awp-plugin-device-sensors-indicators';
<template>
  <div class="loader">

    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>



    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>
    <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
    <div style="margin:0 0 0.5rem">
      <ul class="tab">
        <li class="tab-item" :class="{tablink:isflag}" @click="tagglelist()">
          <span>优惠券</span>
        </li>
        <li class="tab-item" :class="{tablink:!isflag}" @click="tagglelist()">
          <span>即将失效</span>
        </li>
      </ul>
    </div>

    <Scroll class="main-content" :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
            id="scroll"       @scrollToend="scrollToend" :data="coupons">
      <!--      优惠券列表-->
      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"   id="scrollbox"
           @touchend="handleTouchEnd" >

        <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s;font-size: 14px">
          <i style="font-size: 16px" class="el-icon-loading" ></i><span>下拉刷新</span>
        </div>


        <!--        没有图片 暂时不展示-->
        <span v-show="iscoupons" style="text-align: center;">
          <img src="@/assets/images/coupon.png" alt="" class="praiseimg">
        </span>



        <div v-for="(todo,index) in coupons" :key="todo.storeId"
             style="background: #fff;padding: 0.2rem 0.3rem;border-radius: 6px;margin: 0 0 8px">

          <h1 class="title" @click="toShophome(todo.storeId)">
            <div style="display: flex;align-items: center">
              <img :src="todo.image" alt="" style="width: 8vw;display: block;height: auto;margin-right: 0.3rem">
              {{todo.storeName}}
            </div>
            <i style="color: #bababa" class="el-icon-arrow-right"></i>
          </h1>

          <div v-for="(item,index) in todo.coupons" :key="item.id" class="couponitem">
            <div class="couponitemLeft">
              <div style="width: 35%;text-align: center;display: flex;justify-content: center">
                <span style="font-size: 18px;font-weight: 800;" v-if="item.type == 2">{{item.sale}}折</span>
                <span v-else style="font-size:18px;font-weight: 800;">{{item.value}}</span>
              </div>
              <div class="couponitemLeftbtm">
                <div><span>{{item.desc}}</span></div>
                <div v-show="item.isForever == 1"><span>永久有效</span></div>
                <div v-show="item.isForever != 1" class="startTime" style="display: flex;">
                  <p style="font-size: 10px">{{format(item.startTime)}}</p>--<p style="font-size: 10px">{{format(item.endTime)}}</p>
                </div>
              </div>
            </div>
            <div class="couponitemRigh" @click="toShophome(todo.storeId)">
              立即使用
            </div>
          </div>
        </div>

        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>

        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
          <i style="font-size: 28px" class="el-icon-loading" ></i>
        </div>



        <div style="height: 15px">

        </div>

      </div>
    </Scroll>

  </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader";
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll"
    import {tageshowcomprehen,lyricminshow} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen,lyricminshow],
        created() {
            this._getdislist('v1/shop/order/coupon-find-mine');
        },
        data() {
            return {
                content: '领取卡券',
                isflag: true,
                coupons: [],
                iscoupons:false
            }
        },
        methods: {

            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.loading = true;
                    this.empty = false;
                    this.coupons = [];
                    this.page = 1;
                    let apiurl;
                    if (this.isflag) {
                        //获取优惠券信息
                        apiurl = 'v1/shop/order/coupon-find-mine';
                    } else {
                        //获取即将失效优惠券信息
                        apiurl = 'v1/shop/order/coupon-find-mine-lose';
                    }
                    this._getdislist(apiurl)
                }
            },
            //滑动 优质产品 加载更多
            scrollToend() {
                console.log(this.StartY, '优质产品 加载更多', this.MoveY, this.total / 10, this.page);
                if (this.StartY > this.MoveY - 250) {

                    if (this.total / 10 > this.page) {
                        this.btomloading = true;
                        this.page += 1;

                        let apiurl;
                        if (this.isflag) {
                            //获取优惠券信息
                            apiurl = 'v1/shop/order/coupon-find-mine';
                        } else {
                            //获取即将失效优惠券信息
                            apiurl = 'v1/shop/order/coupon-find-mine-lose';
                        }

                        this._getdislist(apiurl);
                    } else {
                        this.btomloading = false;
                        this.empty = true;
                    }
                }
            },


            format(shijianchuo){
                function  add0(m){return m<10?'0'+m:m };
                // console.log(shijianchuo)
                var time = new Date(parseInt(shijianchuo*1000));
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                // var h = time.getHours();
                // var mm = time.getMinutes();
                // var s = time.getSeconds();
                return y+'.'+add0(m)+'.'+add0(d);//+' '+add0(h)+':'+add0(mm)+':'+add0(s)
            },

            //跳转店铺
            toShophome(storeId){
                this.$router.push({
                    path:`/shophome/${storeId}`}
                    )
            },
            //切换 收藏商品和店铺
            tagglelist() {
                this.isflag = !this.isflag;
                let apiurl;
                if (this.isflag) {
                    //获取优惠券信息
                    apiurl = 'v1/shop/order/coupon-find-mine';
                } else {
                    //获取即将失效优惠券信息
                    apiurl = 'v1/shop/order/coupon-find-mine-lose';
                }
                this.coupons = [];
                this._getdislist(apiurl);
            },
            //获取优惠券信息
            _getdislist(apiurl) {
                let data = {};
                getdislist(apiurl, data).then(res => {
                    console.log(res, '获取优惠券信息');

                    this.loading = false;
                    this.btomloading = false;
                    if(res.status == "tokenFail") {
                        this.tagglePrompt(false, '登录状态失效请重新登录');

                        setTimeout(()=>{
                            localStorage.clear()
                            this.$router.push('/index');
                        },3000)

                    }else{

                        let reslist = res.data;
                        if (reslist) {
                            this.coupons =  this.coupons.concat(reslist)

                            this.iscoupons = false;

                            setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)


                        } else {

                            this.iscoupons = true;

                            this.coupons = [];
                            return
                        }

                    }



                })
            },
        },
        components: {
            Pageheader, Scroll
        }
    }
</script>


<style scoped lang="stylus">
  .loader
    background: #f5f5f5;
    text-align: left;
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 2000;
    font-size: 14px;

    img
      width: 100%;
      display: block;

    .tab
      height: 30px
      line-height: 30px
      font-size 0.65rem
      display flex
      justify-content center

      .tab-item
        margin 0 0.7rem
        text-align: center
        color #bababa
        display block

      .tablink
        color: #9a55ff;
        border-bottom: 3px solid #9a55ff;

    .main-content
      width 92%
      margin 0 auto
      height: 85vh;
      overflow: hidden;
      position: relative;

      .praiseimg
        display block
        width 100vw
        height auto
        margin 0 auto
        margin-top 7vh

      .title
        display flex
        justify-content space-between
        font-size 0.6rem
        font-weight 800
        margin 0.35rem auto 0.6rem

      .couponitem
        display flex
        justify-content space-between
        margin 0.4rem auto
        border-radius 6px
        align-items center
        background #f1e6f7
        color #9a55ff

        .couponitemLeft
          display flex
          justify-content space-between
          align-items center
          line-height 1rem
          padding 0.2rem 0
          margin 0.3rem 0
          width 75%
          border-right 0.5px dashed #b888ff

          .couponitemLeftbtm
            width 70%
            text-align left
            font-size 14px

            .startTime
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;

        .couponitemRigh
          width 25%
          text-align center
          font-size 14px
          font-weight 800

</style>
