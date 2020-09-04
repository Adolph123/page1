<template>
    <div class="waper">
      <div class="boders"></div>
      <div class="box">
<!--        {{getdiss}}-->
          <div class="boxIcon" v-for="(item,index) in getdiss" :key="index" @click="toRouters(item.linsk,index)">
            <img v-if="index != flag" :src='item.image' alt="">
            <img v-else :src='item.images' alt="">
            <span :class="{goodnames:index == flag}" >{{item.name}}</span>
          </div>
      </div>
    </div>
</template>

<script>
    let image1=require('@/assets/icon/7_58.png');
    let images1=require('@/assets/icon/2_58.png');
    let image2=require('@/assets/icon/2_60.png');
    let images2=require('@/assets/icon/7_60.png');
    let image3=require('@/assets/icon/2_62.png');
    let images3=require('@/assets/icon/7_62.png');
    let image4=require('@/assets/icon/2_55.png');
    let images4=require('@/assets/icon/7_55.png');


    export default {
        name: "bnavigation",
        props:{
            flag:{
                type:Number,
                default:0
            }
        },
        data(){
            return{
                getdiss:[
                    {
                        name:'好货',
                        image:image1,
                        images:images1,
                        linsk:'/homepage',
                        isflag:true,
                    },
                    {
                        name:'分类',
                        image:image2,
                        linsk:'/classify',
                        images:images2,
                        isflag:false,
                    },
                    {
                        name:'购物车',
                        image:image3,
                        linsk:'/shoppingCart',
                        images:images3,
                        isflag:false,
                    },
                    {
                        name:'我的',
                        linsk:'/myoder',
                        image:image4,
                        images:images4,
                        isflag:false,
                    }]
            }
        },
        created(){

        },
        computed:{
        },
        methods:{
            //点击切换
            toRouters(links,index){
                this.$router.push({
                    path:`${links}`,
                });
            },

        }
    }
</script>

<style scoped lang='stylus'>
  .waper
    width 100vw
    background #fff
    position fixed
    bottom -1px
    height 6.5vh
    z-index 100
    padding-bottom 0.15rem
    border-top 0.35px solid #f3f3f3
    /*.boders*/
    /*  width 100vw*/
    /*  height 2px*/
    /*  position absolute*/
    /*  top 1.5px*/
    /*  z-index 999*/
    /*  background #999999*/
    .box
      width 100%
      display flex
      align-items center
      justify-content space-around
      .boxIcon
        flex 1
        color #999
        text-align center
        img
          width 5.5vw
          height auto
          display block
          margin 0.1rem auto 0.2rem
        span
          line-height 18px
          font-size 12px
          display block
          color #c7c7cc
        .goodnames
          color #9a55ff
          font-weight 100
          font-size 12px

</style>
