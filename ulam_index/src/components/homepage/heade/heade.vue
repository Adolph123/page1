<template>
  <div style="width: 100vw;background:#f5f5f5" >
    <div class="headebox">
      <div  @click="back">
        <img src="@/assets/icon/2_03.png" style="width: 3vw;height: auto;display: block" alt="">
      </div>
      <!--    跳转搜索页面-->
      <router-link to='/search' tag="div" class="inp">
        <img src="@/assets/icon/商城_11.png" alt="" style="width: 6.5vw">
        <span class="text">{{aaa}}</span>
      </router-link>

      <div style="display: flex;flex: 0.15;justify-content: space-between;align-items: center">
        <div @click="xianshi">
          <img src="@/assets/icon/2_11.png" style="width: 5vw;height: auto;display: block" alt="">
        </div>
        <div  @click="back">
          <img src="@/assets/icon/2_07.png" style="width: 5vw;height: auto;display: block"  alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "heade",
        data(){
            return{
                msg:'商品名',
                aaa:'搜索好物'
            }
        },
        methods:{
            back(){
                this.$router.push({
                    path:'/index',
                });
            },
            xianshi(){
                this.$emit('heidcomprehen')
            }
        }
    }
</script>

<style scoped lang='stylus'>
  img
    display block
    width 8vw
    height auto
  .headebox
    padding 10% 0 3%
    width 94%
    margin 0 auto
    display flex
    justify-content space-between
    align-items center
    .icons
      flex 0.1
      color #fff
      justify-content end
    .inp
      background #fff
      display flex
      align-items center
      flex 0.75
      border-radius 20px
      padding 0.1rem 0
      padding-left 0.5rem
      overflow: hidden;
      font-size 14px
      .el-icon-search
        padding-left 0.6rem
        color #999
      .text
        display block
        line-height 0.7rem
        padding-left 0.3rem
        padding-top 4px
        border 0
        outline 0
        font-size 0.65rem
        color #b4b4b4
</style>
