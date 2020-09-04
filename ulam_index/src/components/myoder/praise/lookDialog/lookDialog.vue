<template>
    <div class="lookDialog">
      <div class="el-page-header">
        <div class="el-page-header__title" @click="goBack">
          <img src="@/assets/icon/3_03.png" alt="" style="width: 8vw" >
        </div>
        <div class="el-page-header__content">
          <div style="display: flex;justify-content: center;font-size: 0.8rem">
            <span> {{content}}</span>
          </div>
        </div>
      </div>
<!--{{lookDialoglist}}-->
      <Scroll class="main-content">
        <div style="padding: 0 15px 30px">
          <div style="background: #fff;border-radius: 6px;margin: 0.4rem auto 0.6rem;padding: 0 15px">
            <!--          商品介绍  -->
            <div style="display: flex;align-items: center;padding-top: 7px">
              <div>
                <img :src="lookDialoglist.skuImage" alt="" style="width: 18vw;display: block;height: auto;border-radius: 10px;">
              </div>
              <div style="line-height: 1.2rem;margin-left: 0.4rem;">
                <div><span class="praisedetailText">{{lookDialoglist.skuName}}</span></div>
<!--                <div><span style="color: #bababa">商品介绍</span></div>-->
              </div>
            </div>
            <!--            评价时间-->
            <div style="display: flex;align-items: center;margin: 0.9rem 0;">
              <span style="margin-right: 0.7rem;font-weight: 700;color: #000">评价时间</span>
              <span style="color: #888">{{lookDialoglist.created}}</span>
            </div>
            <!--            评价星级-->
            <div style="display: flex;align-items: center;margin: 0.9rem 0;">
              <span style="margin-right: 0.7rem;font-weight: 700;color: #000">商品评价</span>
              <div v-for="(item,index) in lookDialoglist.goodsStar" :key="index" style="display: flex;align-items: center;margin-right: 0.3rem" @click="item = index+1">
                <img v-if="item <= index" :src='xing' alt="" style="width: 5vw;display: block;height: auto">
                <img v-else :src='xings' alt="" style="width: 5vw;display: block;height: auto">
              </div>
            </div>
            <!--            文字评价-->
            <div style="margin: 0.9rem 0">
              <p style="margin-bottom: 0.3rem;font-weight: 700;color: #000">评论信息</p>
              <span>{{lookDialoglist.content}}</span>
            </div>
            <!--            图片上传-->
            <div style="text-align: left;margin: 0.9rem 0">
              <p style="padding-bottom: 0.3rem;font-weight: 700;color: #000">评论图片</p>
              <div v-for="(item,index) in lookDialoglist.images" :key="index">
                <img :src="item" alt="" style="display: block;width: 100%;height: auto">
              </div>

            </div>

          </div>
        </div>
      </Scroll>


    </div>
</template>

<script>
    import Scroll from "@/base/scroll/scroll";
    let imgUrls33=require('@/assets/icon/3_07.png');
    let imgUrls44=require('@/assets/icon/9_09.png');
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "lookDialog",
        components:{Scroll},
        props:{
            lookDialoglist:{
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                content:'评论信息',
                xing:imgUrls33 ,
                xings:imgUrls44,
            }
        },

        methods:{

            goBack(){
                this.$emit('lookDialogshow')
            },
        }
    }
</script>

<style scoped lang="stylus">
  .lookDialog{
    height: 100vh;
    width 100vw
    font-size 14px
    position fixed
    top 0
    z-index 10000
    text-align left
    background #f5f5f5
  }
  .el-page-header {
    display: flex;
    align-items: center;
    line-height: 1rem;
    padding: 40px 0 1%;
    width: 100vw;
    position: relative;
    font-size: 0.8rem ;
  }
  .main-content{
    width 100%
    margin 0 auto
    height: 91vh;
    overflow: hidden;
    position: relative;
  }
  .el-page-header__title {
    position: relative;
    z-index: 1;
    text-indent: 0.3rem;
  }
  .el-page-header__content {
    text-align: center;
    color: #303133;
    position: absolute;
    z-index: 0;
    width: 100%;
  }
</style>
