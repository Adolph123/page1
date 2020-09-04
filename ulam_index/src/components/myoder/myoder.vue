<template>
  <div class="box">

    <Details v-if="isDetails" :homepageskuid="homepageskuid" @showDetails="showDetails"></Details>

    <div class="mheaderheader">
      <div style="padding-right: 0.2rem" @click="toSetup">
        <i class="el-icon-setting" style="font-size: 1rem"></i>
      </div>


      <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 30%">
        <span> {{content}}</span>
      </div>


      <div class="" @click="heidcomprehen">
        <img src="@/assets/icon/2_11.png" style="width: 6vw" alt="">
      </div>

    </div>

    <Scroll class="main-content" :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup"  ref="scroll" @scroll="scrollss"
            @scrollToend="scrollToend" :data='songarr' id="scroll">

      <div  @touchstart.prevent="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend.prevent="handleTouchEnd" id="scrollbox"
      >
        <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
          <i style="font-size: 16px" class="el-icon-loading" ></i>
          <span>下拉刷新  </span>
        </div>
        <!--  收藏足迹  -->
<!--        background-image: linear-gradient(#f4cb1a, #ff7b17)-->
        <ul class="shoucanglistbox" style="">
          <li class="shoucanglist" @click="toCollection(0,0)">
            <p style="color: #000;font-size: 14px;line-height: 20px">{{ordercount.GoodsFollow?ordercount.GoodsFollow:0}}</p>
            <p style="color: #999;font-size: 12px;line-height: 20px">收藏商品</p>
          </li>

          <li class="shoucanglist" @click="toCollection(0,1)">
            <p style="color: #000;font-size: 14px;line-height: 20px">{{ordercount.StoreFollow?ordercount.StoreFollow:0}}</p>
            <p style="color: #999;font-size: 12px;line-height: 20px">收藏店铺</p>
          </li>

          <li class="shoucanglist" @click="toCollection(1)">
            <p style="color: #000;font-size: 14px;line-height: 20px">{{ordercount.Coupon?ordercount.Coupon:0}}</p>
            <p style="color: #999;font-size: 12px;line-height: 20px">红包卡券</p>
          </li>
        </ul>

        <!--  会员倒计时  -->
        <!--  <div class="urervip" style="color: #fff;">-->
        <!--          <div style="padding: 0 0.5rem;display: flex;justify-content: space-between;align-items: center;">-->
        <!--            <span style="font-weight: 700;padding-left: 0.4rem"> V 金卡会员 &nbsp;</span>-->
        <!--            <span style="padding-right: 3rem">&nbsp;&nbsp;倒计时{{}}天</span>-->
        <!--            <span style="font-size: 0.5rem;color: #f0f0f0;padding-left: 0.3rem;">升级会员<i class="el-icon-arrow-right"></i></span>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--  订单列表  -->
        <div class="myoderlist">


          <router-link tag="div" to="/allorders" class="title">
            <div><span style="color:#000;font-weight:700;font-size: 0.65rem;padding-left: 0.2rem">我的全部订单</span></div>
            <span style="color:#bababa;font-size: 0.7rem"> <i class="el-icon-arrow-right"></i></span>
          </router-link>

          <ul class="tab">
            <li class="tab-item" v-for="(item,index) in listOne" :key="index" @click.stop="tiaozhuanly(index,item.url)">
              <div style="position: relative;">
<!--                -->
                <p class="tab-item-radios" v-if="item.nums > 0">
                  <span style="display: inline-block;font-size: 10px;font-weight: 400;;padding: 0 4px">{{item.nums}}</span>
                </p>
                <img :src="item.imgurl" alt="">
              </div>
              <span class=" tab-link">{{item.name}} </span>
            </li>
          </ul>
          <div class="caritem" v-show="isaddDetails" @click.stop="$router.push({path:'/newexpress',query:{orderNo:addDetails.order_no} })">
            <div>
              <div style="text-align: left;padding: 0.1rem 0.6rem 0.3rem 0.6rem;font-size: 14px">
                <span style="color: #777">最新物流</span>
              </div>
            </div>
            <div class="caritemBtom">
              <div class="caritemLeft">
                <img :src="addDetails.defaultImg" alt="" style="width: 15vw">
              </div>
              <div class="caritemRight">
                <div style="display: flex;align-items: center;">
                  <img src="@/assets/icon/登陆2_12.png" alt="" style="width: 4.5vw">
                  <p style="margin-left: 0.3rem;font-size: 0.5rem;color: #9a55ff;margin-top: 3px"> 运输中</p>
                </div>
                <div style="margin: 3px 0">
                  <span style="font-size: 0.5rem;color: #777">快件发往[{{addDetails.address_area+addDetails.detail}}]</span>
                </div>
              </div>

            </div>
          </div>

        </div>
        <!--  物流信息  -->


        <!--  精品推荐  -->
        <div>
          <!--  推荐标题    -->
          <h1 style="background: #fafafa;padding: 0.5rem ;display: flex;justify-content: center;align-items: center">
            <img src="@/assets/icon/xin_6.png" alt="" style="width: 3vw;height: auto">
            <span style="margin:0 0.4rem;font-size: 0.65rem;color: #000">精品推荐</span>
            <img src="@/assets/icon/xin_6.png" alt="" style="width: 3vw;height: auto">
          </h1>
          <!--   推荐内容   -->


          <div class="recommend">

            <Song :songarr="songarr"  @toDetails="toDetails" ></Song>

          </div>
        </div>


        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>


        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;margin-bottom: 20px">
          <i style="font-size: 28px" class="el-icon-loading" ></i>
        </div>

        <div style="height: 30px"></div>
      </div>
    </Scroll>

    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    <Bnavigation :flag="flag"></Bnavigation>



    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

  </div>
</template>

<script>
    import List from "@/base/list/list";
    import Song from "@/base/song/song";
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll"
    import Bnavigation from '../bnavigation/bnavigation';
    let imgUrls = require('@/assets/icon/登陆2_03.png');
    let imgUrls1 = require('@/assets/icon/登陆2_05.png');
    let imgUrls2 = require('@/assets/icon/登陆2_12.png');
    let imgUrls3 = require('@/assets/icon/登陆2_07.png');
    let imgUrls4 = require('@/assets/icon/登陆2_09.png');
    import {lyricminshow,tageshowcomprehen,SearchHistory} from '@/common/js/mixin.js';
    import comprehensive from "@/base/comprehensive/comprehensive";
    import Details from '@/base/coDetail';
    export default {
        mixins: [lyricminshow,tageshowcomprehen,SearchHistory],
        mounted(){
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }
        },
        data() {
            return {
                page: 1,
                flag: 3,
                content: "  我的",
                shoucanglist: [
                    {
                        name: '收藏商品',
                        nums: 223
                    },
                    {
                        name: '红包卡卷',
                        nums: 22
                    },
                    {
                        name: '收藏店铺',
                        nums: 2400
                    }
                ],
                isaddDetails:false,
                listOne: [
                    {
                        imgurl: imgUrls,
                        url: 'allorders',
                        name: '待付款'
                    },
                    {
                        imgurl: imgUrls1,
                        url: 'allorders',
                        name: '待发货'
                    }, {
                        imgurl: imgUrls2,
                        url: 'allorders',
                        name: '待收货'
                    }, {
                        imgurl: imgUrls3,
                        url: 'praise',
                        name: '填口碑'
                    }, {
                        imgurl: imgUrls4,
                        url: 'aftermarket',
                        name: '退换/售后'
                    }
                ],
                recommendList: [

                ],
                songarr: [],
                addDetails:{},
                ordercount:{},//数量
                heights:500,
                isscrollflag:true,
                scrollheight:0
            }
        },
        created() {
            this._getdislist();//请求优质产品
            this._getaddDetailst();//请求最新物流
            this._getordercount();

        },
        methods: {
            //请求最新物流
            _getordercount() {
                let apiurl = 'v1/shop/order/count';
                let data = {};
                getdislist(apiurl, data).then(res => {
                    console.log(res, '请求各个订单数据');
                    this.ordercount = res.data;
                    this.listOne.map((item,index)=>{
                        if(index == 0){
                            item.nums = res.data.OrderPending
                        }
                        if(index == 1){
                            item.nums = res.data.OrderPayed
                        }
                        if(index == 2){
                            item.nums = res.data.OrderShipped
                        }
                        if(index == 3){
                            item.nums = res.data.OrderFinish
                        }
                        if(index == 4){
                            item.nums = res.data.OrderReturn
                        }
                    })
                })
            },



            //划过结束
            handleTouchEnd(){
                console.log('@@@',this.scrollY ,'>' ,15 && this.StartY ,'<', this.MoveY-15)
                if(this.scrollY > 15 && this.StartY < this.MoveY-15){
                    this.loading = true;
                    this.songarr = [];
                    this.isscrollflag = false;
                    this.page = 1;
                    this._getdislist()
                }
            },

            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY,'优质产品 加载更多',this.MoveY,this.total/10,' >' ,this.page);
                if(this.StartY > this.MoveY - 250){
                    if(this.total/10 > this.page){
                        // this.page += 1;
                        // this.btomloading = true;
                        // this._getdislist()
                    }else{
                        this.btomloading = false;
                        this.empty = true;
                    }
                }
            },



            //请求最新物流
            _getaddDetailst() {
                let apiurl = 'v1/shop/order/first';
                let data = {};
                getdislist(apiurl, data).then(res => {
                    console.log(res, '请求最新物流');
                    let reslist = res.data;
                    if (reslist) {
                        this.addDetails = reslist;
                        this.isaddDetails  = true;

                    } else {
                        this.addDetails = 0;
                        this.isaddDetails  = false;
                        return
                    }
                })
            },
            //请求优质产品
            _getdislist() {
                let apiurl = 'v1/shop/goods/find-goods-condition';
                let data = {
                    page: this.page,
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '精品推荐数据');
                    this.loading = false;
                    this.btomloading = false;


                    let reslist = res.data;

                    this.total = res.total;

                    if (reslist) {
                        this.songarr = this.songarr.concat(reslist);
                        setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            this.isscrollflag = true;
                            },100)
                    } else {
                        return
                    }
                })
            },
            //跳转设置
            toSetup() {
                this.$router.push({
                    path: '/setup'
                })
            },

            //跳转收藏
            toCollection(index,id) {
                if (index == 0) {
                    this.$router.push({
                        path: `/collection`,
                        query:{
                            id
                        }
                    })
                }
                if (index == 1) {
                    this.$router.push({
                        path: `/cardcoupon`,
                    })
                }
            },
            //跳转订单列表页
            tiaozhuanly(index, url) {
                if (index <= 2) {
                    console.log(index, 'myoder');
                    this.$router.push({
                        path: `/${url}`,
                        query: {
                            id: index + 1
                        }
                    })
                } else {
                    this.$router.push({
                        path: `/${url}`,
                    })
                }

            },
            //回退
            goBack() {
                this.$router.go(-1)
            }

        },
        components: {
            List, Song, Scroll, Bnavigation,comprehensive,Details
        }

    }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/variable'


  .box
    width 100vw
    height: 93.5vh;
    background #f5f5f5
    font-size 14px

    .main-content
      height: 85.5vh;
      overflow: hidden;
      position: relative;

    .urervip
      background #9a55ff
      width: 94%
      padding: 0.4rem 0
      color #fff
      margin: 0 auto
      border-radius: 6px
      margin-bottom: 0.6rem

    .images
      width 84%
      height auto
      display block
      margin 0.3rem auto
      padding 0.3rem 0

    .shoucanglistbox
      display flex
      width 94%
      margin 0.6rem auto 0rem
      border-radius 6px

      padding 0.5rem 0

      .shoucanglist
        flex 1
        text-align center
        line-height 0.85rem


    .myoderlist
      width 94%
      margin 0.2rem auto 0.3rem
      padding 0.3rem 0 0.4rem
      border-radius 6px
      background #fff

      .title
        display flex
        justify-content space-between
        width 94%
        margin 0.1rem auto
        border-bottom 0.3px solid #f5f5f5
        padding 0.5rem 0

      .tab
        line-height 1rem
        font-size 16px
        display flex
        width 100%
        margin 0.6rem auto 0.2rem
        justify-content space-between

        .tab-item
          flex: 1
          text-align: center
          .tab-item-radios
            position: absolute;
            left: 40px;
            top -3px;
            display: flex;
            min-width: 15px;
            background #9a55ff;
            height: 14px;
            justify-content center;
            align-items center;
            font-size 12px
            color: #fff;
            border-radius: 15px;
            padding: 0px;
            text-align: center;
          img
            display block
            width 40%
            height: auto;
            margin 3px auto

          .tab-link
            color #3f3f3f
            display block
            font-size 0.5rem
            margin-top 0.2rem

    .caritem
      width 94%
      background #f5f5f5
      border-radius 8px
      margin 0 auto
      padding 0.25rem 0
      margin-bottom 0.2rem

      .caritemBtom
        display flex
        padding 0 0.6rem 0.2rem
        align-items center
        .caritemLeft
          margin-right 0.3rem
        img
          display block

      .caritemRightTop
        display flex

        img
          height auto
          width 2rem

    .recommend
      width 96%
      margin 0 auto

      .title
        text-align left
        line-height 1rem
        font-size 14px

      .recommendItem
        width 31%
        margin 0.2rem 1%
        display inline-block
        font-size 14px

        .recommendItemimages
          border-top-left-radius 4px
          border-top-right-radius 4px
          overflow hidden

          img
            display block
            width 100%
            height auto

        .baule
          background #9a55ff
          line-height 0.6rem
          border-radius 5px
          padding 0.05rem 0.2rem
          color #fff
          font-size 0.5rem

</style>

<style>
  .mheaderheader {
    padding: 40px 0 1%;
    width: 92%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }

</style>
