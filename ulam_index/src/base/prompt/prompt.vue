<template>
    <div class="prompt">
     <div style="position: absolute;top: 35%;width: 100vw;display: flex;justify-content: center">
       <span class="box">
         <img src="@/assets/images/dui.png" alt="" v-show="Promptimage" class="promptimg">
<!--              <span></span>-->
         <br/>
         <span>{{text}}</span><span>{{msg}}</span>
       </span>
     </div>
    </div>
</template>

<script>
    export default {
        name: "prompt",
        props:{
            text:{
                type:String,
                default:''
            },
            msg:{
                type:String,
                default:''
            },
            Promptimage:{
                type:Boolean,
                default:false
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="stylus">
  .prompt
    position fixed
    width 100vw
    height 100vh
    background rgba(0,0,0,0)
    z-index 1000000
    top 0;
    left 0;
    .box
      padding  0 1rem
      background rgba(0,0,0,0.8)
      border-radius 6px
      margin 0 auto
      color #fff
      text-align center
      font-size 16px
      padding 0.5rem 1.2rem 1rem
      .promptimg
        width 1rem
        height 1rem
        display inline-block
        margin 0 auto

</style>
