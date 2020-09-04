<template>
  <div class="waper">
    <div class="boders"></div>
    <div class="box">
      <!--        {{getdiss}}-->
      <div class="boxIcon" v-for="(item,index) in getdiss" :key="index" @click="toRouters(item.linsk,index)">
        <img v-if="index != flag" :src='item.image' alt="">
        <img v-else :src='item.images' alt="">
        <p :class="{goodnames:index == flag}" >{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    let image1=require('@/assets/newpage/wen.png');
    let images1=require('@/assets/newpage/wen.png');
    let image2=require('@/assets/sc.png');
    let images2=require('@/assets/sc.png');
    let image3=require('@/assets/newpage/kj.png');
    let images3=require('@/assets/newpage/kj1.png');
    let image4=require('@/assets/newpage/me.png');
    let images4=require('@/assets/newpage/me1.png');


    export default {
        name: "bottomNav",
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
                        name:'首页',
                        image:image1,
                        images:images1,
                        linsk:'/index',
                        isflag:true,
                    },
                    {
                        name:'兑换',
                        image:image3,
                        linsk:'/wallet',
                        images:images3,
                        isflag:false,
                    },

                    {
                        name:'权益',
                        image:image2,
                        linsk:'/homepage',
                        images:images2,
                        isflag:false,
                    },

                    {
                        name:'商城',
                        linsk:'/user',
                        image:image4,
                        images:images4,
                        isflag:false,
                    },
					{
					    name:'我的',
					    linsk:'/user',
					    image:image4,
					    images:images4,
					    isflag:false,
					}
					]
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
          width 5.2vw
          height auto
          display block
          margin 0.1rem auto 0.2rem
        p
          line-height 18px
          font-size 10px
          display block
          color #c7c7cc
        .goodnames
          color #9a55ff
          font-weight 100
          font-size 10px

</style>
