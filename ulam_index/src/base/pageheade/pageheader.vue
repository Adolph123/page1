<template>
  <div class="el-page-header">

    <div style="display: flex;justify-content: space-between;width: 94%;margin: 0 auto">
      <div class="el-page-header__title" @click="goBack">
        <img src="@/assets/back.png" alt="" style="width: 3vw;height: auto;display: block" >
      </div>
      <div style="display: flex;justify-content: center;font-size: 0.8rem">
        <span> {{content}}</span>
      </div>
      <div class="" @click="heidcomprehen">
        <img src="@/assets/icon/2_11.png" style="width: 6vw" alt="">
      </div>
    </div>

 </div>
</template>
<script>
    export default {
        props:{
            content:{
                type:String,
                default:''
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            heidcomprehen(){
                this.$emit('heidcomprehen')
            }
        }
    }
</script>

<style>
  @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
  .el-page-header {
    display: flex;
    align-items: center;
    line-height: 1rem;
    padding: 40px  0 1%;
    width: 100vw;
    position: relative;
    font-size: 0.8rem ;
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
