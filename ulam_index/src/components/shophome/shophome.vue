<template>
    <div class="shophome">


      <Details v-if="isDetails" :homepageskuid="homepageskuid" @showDetails="showDetails"></Details>

      <!--      分享-->
      <backColor  v-if="isshare">
        <share  :goodsId='goodsId' @showShare="showShare" :store="store"></share>
      </backColor>

      <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

      <rotateImage v-show="isrotateImage" :images="shophometitle.qrCode" @guanbirotateImage="guanbirotateImage"></rotateImage>
<!--      头部-->
      <div class="shophomeheade">
        <div  @click="back">
          <img src="@/assets/icon/2_03.png" alt="" style="width:3vw;height:auto;display:block">
        </div>
        <!--    跳转搜索页面-->
        <router-link to='/search' tag="div" class="inp">
          <img src="@/assets/icon/商城_11.png" alt="" style="width: 6.5vw;height:auto;display:block">
          <span style="margin-top: 1px;">搜索好物</span>
        </router-link>
        <div  @click="heidcomprehen">
          <img src="@/assets/icon/2_11.png" style="width: 6vw;height:auto;display:block" alt="">
        </div>
      </div>
      <!--      店铺名-->
      <div class="shophometitle">
        <div class="shophometitleimage">
          <img :src="shophometitle.header" alt="">
        </div>
        <div style="line-height: 1.3rem;font-size: 0.65rem;">
          <div style="flex: 0.7" >
            <div>
              <span style="font-weight: 900">{{shophometitle.name}}</span>
            </div>
            <div style="font-size: 0.5rem;text-align: left;display: flex;align-items: center">

              <span style="color: #999999;">{{shophometitle.fansCount}}人已关注</span>



            </div>
          </div>
        </div>
        <div style="flex: 0.3">


<!--          <el-button size="small" round @click="followeddianpu(shophometitle.id)"> {{ shophometitle.isFollow ? "取消关注":"关注"}}</el-button>-->
        </div>
      </div>

      <!--店铺分类-->
      <div style="width: 94%;margin:0.3rem auto 0.2rem;position: relative;display: flex;align-items: center;justify-content: space-between;">
        <ul class="tab">
          <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}" @click="tagglelistisItem(index)">
            <span>{{item.name}}</span>
          </li>
        </ul>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <div  style="padding-right: 10px" @click="followeddianpu" v-if="shophometitle.isFollow == 0">
            <img src="@/assets/icon//3_07.png" alt="" style="width: 5.5vw;height: auto;display: block">
          </div>
          <div style="padding-right: 10px"  @click="followeddianpu" v-else>
            <img src="@/assets/icon//9_09.png" alt="" style="width: 5.5vw;height: auto;display: block">
          </div>
          <div @click="isshare = true">
            <img src="@/assets/icon//3_10.png" alt="" style="width: 5.5vw;height: auto;display: block">
          </div>
        </div>
      </div>


      <Scroll class="main-content" >
        <div>
          <!--      详情-->
          <div class="shophomecontent" v-show="isitem">
            <!--     精选   -->
            <div v-show="isgoods" class="contentsp">
              <Song :songarr="contentjx"  @toDetails="toDetails"></Song>

              <!--     精选     -->
<!--              <div v-for="(item,index) in contentjx " :key="item.id" class="contentjxbox">-->
<!--                <div @click="toDetail(item.skuId)">-->
<!--                  <img :src="item.image" alt="">-->
<!--                </div>-->
<!--                <div class="contentjxtext">-->
<!--                  <div class="text">-->
<!--                    <span>{{item.skuName}}</span>-->
<!--                  </div>-->
<!--                  <div style="color:#F4451A;;display: flex;justify-content: end;align-items: center;line-height: 0.7rem;margin-top: 0.5rem">-->
<!--                    <span style="margin-top: 3px">&nbsp</span><span style="font-size: 0.7rem;margin-right: 0.5rem">{{item.price}}</span>-->
<!--&lt;!&ndash;                    <span style="font-size: 0.6rem">{{item.isScore? '积分':'&nbsp'}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span style="font-size: 0.8rem">  {{ item.isScore?item.score:item.price }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span style="background: 0;border: 1px solid red;font-size: 0.5rem;padding: 0 0.2rem;">满减</span>&ndash;&gt;-->
<!--                  </div>-->
<!--&lt;!&ndash;                  <div style="color: #cccccc;font-size: 0.5rem;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <span>{{item.commentCount}}万+条评论</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span>{{item.commentRate}}好评</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span style="color:#F4451A"><i class="el-icon-shopping-cart-2"></i></span>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--                </div>-->
<!--              </div>-->

            </div>
            <!--     商品   -->
            <div v-show="!isgoods" class="contentsp">
              <Song :songarr="contentjx"  @toDetails="toDetails"></Song>
<!--              <div v-for="(item,index) in contentjx " :key="item.skuId" class="contentspbox" :style="{margin:(index ==0? 0:'')}">-->
<!--                <div style="width:20%;margin-right: 0.5rem" @click="toDetail(item.skuId)">-->
<!--                  <img :src="item.image" alt="">-->
<!--                </div>-->
<!--                <div style="width: 70%;position: relative">-->

<!--                  <div class="text">-->
<!--                    <span>{{item.skuName}}</span>-->
<!--                  </div>-->

<!--                  <div style="color:#F4451A;margin-top: 0.6rem;line-height: 0.7rem;display: flex;align-items: center;font-size: 0.5rem;">-->
<!--                    <span style="margin-top: 3px">&nbsp</span><span style="font-size: 0.7rem">{{item.price}}</span>-->
<!--                  </div>-->

<!--                  <div style="color: #cccccc;position: absolute;bottom: 1px;">-->
<!--&lt;!&ndash;                    <span>{{item.pingjia}}万+条评论</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span style="padding: 0 0.4rem">{{item.haoping}}好评</span>&ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
            </div>

            <div style="height: 25px"></div>
          </div>

          <div v-show="!isitem">
            <div style="width: 94%;margin: 0 auto">
              <div class="shopdetailconent">
                <div>
                  <span>用户评价</span>
                  <span class="textcolor" style="padding-left: 1rem;padding-right: 0.5rem">{{Math.round(shophometitle.goodsStar*100) / 100}} 分</span>
<!--                  <span class="textcolor">高</span>-->
                </div>
                <div>
                  <span>物流履约</span>
                  <span class="textcolor" style="padding-left: 1rem;padding-right: 0.5rem">{{Math.round(shophometitle.expressStar*100) / 100}} 分</span>
<!--                  <span class="textcolor">高</span>-->
                </div>
                <div>
                  <span>售后服务</span>
                  <span class="textcolor" style="padding-left: 1rem;padding-right: 0.5rem">{{Math.round(shophometitle.afterStar*100) / 100}} 分</span>
<!--                  <span class="textcolor">高</span>-->
                </div>
              </div>

              <!--      开店时间-->
              <div class="shopdetailconent">
                <span class="shtitle">开店时间</span>
                <span class="shhuise">{{shophometitle.created}}</span>
              </div>
              <!--      销售品牌-->
              <div class="shopdetailconent">
                <span class="shtitle">销售品牌</span>
                <span class="shhuise">{{shophometitle.brand}}</span>
              </div>

              <!--证件信息-->
              <div class="shopdetailconent" style="display: flex;align-items: center;">
                <span class="shtitle">店铺二维码</span>
                <img :src="shophometitle.qrCode" alt="" @click="isrotateImage = true" style="width: 2rem;display: block;height: auto;margin-left: 1rem">
              </div>

            </div>
          </div>
        </div>
      </Scroll>



    </div>
</template>

<script>
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll";
    import backColor from "@/base/backColor/backColor";
    import Song from "@/base/song/song";
    import rotateImage from "@/base/rotateImage/rotateImage";
    import share from '../share/share';
    import Details from '@/base/coDetail';
    import {tageshowcomprehen,SearchHistory} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen,SearchHistory],
        name: "shophome",
        components:{Scroll,share,rotateImage,backColor,Song,Details},
        created(){
            console.log(parseInt(this.$route.params.id))

            const id = parseInt(this.$route.params.id);
            this.goodsId =  parseInt(this.$route.params.id);
            this.getgoodsList(id,1,1);
            this._getdislist(id);
        },
        data(){
            return{
                goodsId:0,
                store:true,
                isitem:true,
                isshare:false,//分享
                titlelist:[
                    {
                        id:1,
                        name:'精选',
                        isflag:true,
                    }, {
                        id:2,
                        name:'商品',
                        isflag:false,
                    }, {
                        id:3,
                        name:'商家',
                        isflag:false,
                    },
                ],
                shophometitle:{
                        storeName:'Apple京东自营旗舰店',
                        storeId:1,
                        flag:"1级好店",
                        guanzhunamme:3323,
                        isguanzhu:true,
                    },
                contentjx:[
                    {
                        imgurl:'',
                        id:115,
                        name:'这个东西看起来像个杯子/又像饮料到底是什么我也不清楚',
                        pic:'49.99',
                        pingjia:'3.6',
                        haoping:'85%'
                    },
                    {
                        imgurl:'',
                        id:116,
                        name:'这个东西看起来像个杯子/又像饮料到底是什么我也不清楚',
                        pic:'49.99',
                        pingjia:'3.6',
                        haoping:'85%'
                    },
                    {
                        imgurl:'',
                        id:117,
                        name:'这个东西看起来像个杯子/又像饮料到底是什么我也不清楚',
                        pic:'49.99',
                        pingjia:'3.6',
                        haoping:'85%'
                    },
                    {
                        imgurl:'',
                        id:118,
                        name:'这个东西看起来像个杯子/又像饮料到底是什么我也不清楚',
                        pic:'49.99',
                        pingjia:'3.6',
                        haoping:'85%'
                    }
                ],
                isgoods:true,
                isrotateImage:false,//图片放大
            }
        },
        methods:{
            toDetail(id){
                this.$router.push({
                    path:`/details/${id}`,
                })
            },
            //图片放大 关闭
            guanbirotateImage(){
                this.isrotateImage = false
            },
            //分享店铺
            showShare(){

            },
            //关闭分享
            showShare(flag){
                this.isshare = flag;
            },
            // 关注店铺  和取消关注
            followeddianpu(id){
                let apiurl = 'v1/shop/store/follow';
                let data={
                    id:parseInt(this.$route.params.id)
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'关注店铺和取消关注');
                    let reslist = res.data;
                    this._getdislist(parseInt(this.$route.params.id));
                })
            },
            //获取店铺信息
            _getdislist(id){
                let apiurl = 'v1/shop/store/get';
                let data={
                    id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取店铺信息');
                    let reslist = res.data;
                    this.shophometitle = reslist;
                })
            },
            //返回
            back(){
                this.$router.go(-1)
            },
            //精选  商品  切换
            tagglelistisItem(index){
                this.titlelist.map(item=>{
                    item.isflag = false
                });
                this.titlelist[index].isflag = true;
                this.contentflag = index;
                const id = parseInt(this.$route.params.id);
                const page = 1;
                let status = 0;
                if(index == 2){
                    //请求店铺评价
                    this.isitem = false;
                    this._getdislist(id)
                }else {
                    //index 等于1 或0  请求商品 或者 精选
                    this.isitem = true;
                    if(index == 0){
                        this.isgoods = true
                    }else {
                        this.isgoods = false
                    }
                    status += index+1;
                    this.getgoodsList(id,page,status)
                }

            },
            //获取店铺信息
            _getdislist(id){
                let apiurl = 'v1/shop/store/get';
                let data={
                    id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取店铺信息');
                    let reslist = res.data;
                    this.shophometitle = reslist;
                })
            },
            //请求商品
            getgoodsList(id,page,status){
                //status 1 精选商品  2 商品
                let apiurl = 'v1/shop/goods/find-goods-store';
                let data= {
                    id,
                    page,
                    status
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取店铺商品');
                    let reslist = res.data;
                    this.contentjx = reslist;
                })
            }

        }
    }
</script>

<style scoped lang="stylus">
  .shophome
    height: 100vh;
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5
    .main-content
      height: 73.5vh;
      overflow: hidden;
      position: relative;
    .shophometitleflag
      display inline-block
      line-height 1rem
      padding 0 0.5rem
      color #fff
      background rgb(29, 166, 147)
    .shophomeheade
      width 94%
      padding 10% 0 1%
      margin 0 auto
      display flex
      justify-content space-between
      align-items center
      color #bababa
      .icons
        flex 0.1
      .inp
        background #fff
        display flex
        align-items center
        flex 0.8
        border-radius 20px
        padding 0.1rem 0
        overflow: hidden;
        font-size 0.6rem
        img
          padding 0 0.3rem 0 1rem
    .tab
      height :30px
      line-height :30px
      font-size 0.65rem
      display flex

      .tab-item
        text-align :center
        color #999
        margin 0 0.9rem 0 0
        display block
      .tablink
        color:#9a55ff;
        border-bottom : 3px solid #9a55ff
    .shophometitle
      width 94%
      display flex
      align-items center
      margin 0.3rem auto
      .shophometitleimage
        width 20vw
        img
          width 60px
          height 60px
          display block
    .shophomelist
      display flex
      justify-content left
      align-items center
      font-size 0.65rem
      .shophomelistItem
        margin 0.2rem 0.4rem
        padding 0.2rem 0.2rem
      .shophomelistisItem
        border-bottom 2px solid #9a55ff
      .shophomelistisItemcu
        font-weight 700
    .shophomecontent
      .contentjx
        img
          width 100%
          height auto
          display: block;
        .contentjxbox
          width 45%
          display inline-block
          background #fff
          margin 1% 2%
          float left
          line-height 1rem
          border-radius 6px
          .contentjxtext
            text-align left
            padding 0.2rem 0.1rem 0.5rem
            .text
              line-height 0.6rem
              font-size 14px
              margin-top 0.3rem
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;

      .contentsp
        width 96%
        margin 0 auto
        .contentspbox
          width 100%
          font-size 0.5rem
          text-align left
          line-height 1rem
          display flex
          justify-content space-between
          align-items center
          margin 0.5rem 0
          padding 0.1rem 0
          background #ffffff
          border-radius 5px
          img
            width 100%
            height auto
            display block
          .text
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size 14px

    .shopdetailconent
      text-align left
      margin 0 auto 0.25rem
      padding 0.2rem 0.3rem
      line-height 1.5rem
      border-radius 5px
      color rgb(153, 153, 153)
      background #fff
      .textcolor
        color red
      .shhuise
        color #999
        padding-left 1rem
      .shtitle
        font-weight 900
        color #000
</style>
