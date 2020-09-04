<template>
    <div class="shopdetail">

      <div style="height: 5rem;background: #9a55ff;margin-bottom: 2rem;position: relative;">
        <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
        <div class="headers">
          <div class="shopdetailhead">
            <div class="shophometitleimage">
              <img :src="shophometitle.header" alt="">

            </div>
            <div style="line-height: 1.3rem;font-size: 0.65rem">
              <div style="flex: 0.7" >
                <router-link tag="div" div to="/shopdetail" >
                  <span style="font-weight: 900">{{shophometitle.name}} <i class="el-icon-arrow-right"></i></span>
                </router-link>
                <div style="font-size: 0.6rem;text-align: left">
                  <span class="shophometitleflag">{{shophometitle.flag}}</span>
                  <span style="color: #999999;margin-left: 0.3rem">{{shophometitle.fansCount}}人已关注</span>
                </div>
              </div>
            </div>
            <div style="flex: 0.3">
              <el-button round> {{ shophometitle.isFollow ? "已关注":"未关注"}}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 94%;margin: 0 auto">
        <div class="shopdetailconent">
          <div>
            <span>用户评价</span>
            <span class="textcolor" style="margin: 0 0.6rem">9.46 分</span>
            <span class="textcolor">高</span>
          </div>
          <div>
            <span>物流履约</span>
            <span class="textcolor" style="margin: 0 0.6rem">9.46 分</span>
            <span class="textcolor">高</span>
          </div>
          <div>
            <span>售后服务</span>
            <span class="textcolor" style="margin: 0 0.6rem">9.46 分</span>
            <span class="textcolor">高</span>
          </div>
        </div>
        <!--证件信息-->
        <div class="shopdetailconent" style="display: flex;justify-content: space-between;align-items: center">
          <span class="shtitle">证件信息</span>
          <img :src="shophometitle.qrCode" alt="" style="width: 2rem;display: block;height: auto;">
          <span><i class="el-icon-notebook-1"></i></span>
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
      </div>

    </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader"
    import {getdislist} from '@/api/index';
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        created(){
            this._getdislist();
        },
        data(){
            return{
                content:"店铺详情",
                shophometitle:{
                    storeName:'Apple京东自营旗舰店',
                    storeId:1,
                    flag:"1级好店",
                    guanzhunamme:3323,
                    isguanzhu:true,
                },
            }
        },
        methods:{
            //获取店铺信息
            _getdislist(){
                let apiurl = 'v1/shop/store/get';
                let data={
                    id:4
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取店铺信息');
                    let reslist = res.data;
                    this.shophometitle = reslist;
                })
            },
        },
        components:{
            Pageheader
        }
    }
</script>

<style scoped lang="stylus">
  .shopdetail
    width 100%
    height 90vh
    background #f0f0f0
    font-size 0.75rem
    line-height 1rem
    text-align left
    .headers
      position absolute
      top 70%
      .shopdetailhead
        width 92%
        background #fff
        margin 0 auto
        display flex
        justify-content space-around
        align-items center
        .shophometitleimage
          width 20%
          img
            width 80%
            height auto
            margin 10%
            display block
    .shopdetailconent
      margin 0.9rem auto
      padding 0.2rem 0.3rem
      line-height 1.5rem
      border-radius 5px
      color #ccc
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

