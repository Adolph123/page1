<template>
    <div class="zhu">
<!--      <div style="background-color: #3e3e3e;height:31px;margin-bottom: -1%"> </div>-->
      <x-header  :left-options="{preventGoBack: true,backText: ''}"
                 @on-click-back="fanhui1"
                 style="position:fixed;top:30px;width:100%;z-index:999;background:rgba(0,0,0,0);"></x-header>

    </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading} from 'vux'
    export default {
        name: "rules",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading
      },
      data(){
          return {
            bodyHeight:'',
          }
      },
      mounted(){
        let that = this
        //  获取当前高度
        that.bodyHeight=document.documentElement.clientHeight
      },
      methods:{
        fanhui1(){
          this.$router.push('/grade')
        },
      }
    }
</script>

<style scoped>
.zhu{
  background-size:  100% 100%;
  height: 100%;
  position: fixed;
  width: 100%
}
</style>
