<template>
  <div class="" style="margin-top: 0">
    <ul>
      <li v-for="(item,index) in songarr" :key="item.skuId" class="item"  :style="{margin:julis+'px'}" @click='reserall(item.skuId)'>
        <div class="text">
          <div class="dvimg">
            <img v-lazy="item.image" alt="">
          </div>
          <div style="padding: 0 0.3rem">
            <p class="name">{{item.skuName}}</p>
            <p class="desc">
              <span style="font-size: 0.6rem;display: none;display: none">{{integral? '积分':''}}</span>

              <span style="font-size: 14px;font-weight: 600;white-space:nowrap;color: rgb(154, 85, 255)">  {{ integral?item.score:item.price }}
                <span  style="font-size: 14px;font-weight: 400;;">{{$store.state.money}}</span >
              </span>
              <!--            <span style="font-size: 0.8rem"> <span style="font-size: 0.7rem">{{integral? '积分':''}}</span>  {{ integral?'10000':item.price }}</span>-->
              <!--            <span style="font-size: 0.5rem;color: #ccc;">{{}}人收货</span>-->
            </p>
            <div style="display: flex;justify-content: space-between;padding-right: 0.2rem;padding-bottom: 0.5rem;">
              <!--           <span class="red" v-for="(todo,index) in item.flag" :key="index"  v-show="index<1">{{todo.name}}</span>-->
            </div>
          </div>

        </div>
      </li>

    </ul>

  </div>
</template>

<script>
    export default {
        props: {
            songarr: {
                type: Array,
                default: []
            },
            integral: {
                type: Boolean,
                default: false,
            }

        },
        data() {
            return {
                num: 1,
                julis:0
            }
        },
        mounted(){
         let wid = document.getElementsByTagName('body')[0];
         this.$nextTick(()=>{
             this.julis = wid.clientWidth*0.96*0.01
         })

        },
        methods: {
            //跳转商品详情
            reserall(id) {

                this.$emit('toDetails',id)


                console.log(id);
                // if (this.integral) {
                //     //积分商品跳转详情
                //     this.$router.push({
                //         path: `/details/${id}`,
                //         query: {
                //             id: 1
                //         }
                //     })
                // } else {
                //     //正常商品跳转详情
                //     this.$router.push({
                //         path: `/details/${id}`,
                //     })
                // }

            }
        }
    }
</script>

<style scoped lang='stylus'>
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .title
    display flex
    width 94vw
    line-height 30px
    margin 0.3rem 3vw 0.1rem

    .lan
      width 6px
      height 30px
      background #9a55ff
      border-radius 6px
      margin-right 15px

  ul
    padding-top 5px
    text-align left
    font-size 0
    .item
      display inline-block
      background #ffffff
      border-radius 6px
      overflow hidden
      width 48%
    .text
      font-size 0.7rem
      line-height 0.7rem

      .dvimg
        position relative

        .level
          position absolute
          font-size 12px
          top 0
          left 0
          padding 0.05rem 0.1rem
          font-weight 100
          background #23a892
          color #fff
          border-radius 3px
          z-index 10

        img
          width 100%
          height auto
          display block
          margin-bottom 0.3rem

      .name
        font-size 12px
        line-height 24px
        color #010101
        white-space nowrap
        overflow hidden
        text-overflow ellipsis

      .desc
        width 90%
        font-size 14px
        margin 10px 0 0
        text-align left
        color rgb(154, 85, 255)

      .red
        float left
        font-size 0.5rem
        height 0.7rem
        line-height 0.8rem
        display inline-block
        border 1px solid red
        color red
        padding 0.05rem 0.3rem
        border-radius 3px
        margin-right 0.6rem
</style>
