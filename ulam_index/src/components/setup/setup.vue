<template>
  <div>
    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>
    <Pageheader :content="content" @taggbacks="taggbacks" @heidcomprehen="heidcomprehen"></Pageheader>
<!-- 跳转 -->
    <div class="setup">
      <div class="setupItem" @click="toModifyaddress">
        <span>地址列表</span>
        <span style="color: #bababa" class="el-icon-arrow-right"></span>
      </div>
      <div class="setupItem" @click="toAddress">
        <span>添加地址</span>
        <span style="color: #bababa" class="el-icon-arrow-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
    import Pageheader from "@/base/HeaderPage/HeaderPage";

    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name: "setup",
        components:{
            Pageheader
        },
        data(){
            return{
                content:"个人设置"
            }
        },
        methods:{
            taggbacks(){
                this.$router.push('/myoder')
            },
            //跳转添加地址
            toAddress(){
                this.$router.push({
                    path:'/addresss'
                })
            },
            //跳转地址列表
            toModifyaddress(){
                this.$router.push({
                    path:'/modifyaddress'
                })
            },

        }
    }
</script>

<style scoped lang="stylus">
  .setup
    width 92%
    margin 0 auto
    font-size 14px
    .setupItem
      width 100%
      display flex
      justify-content space-between
      align-items center
      line-height 24px
      margin 0 0 12px
    .el-button.is-round
      font-size 0.75rem
      padding 0.5rem 3rem

</style>
