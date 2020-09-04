<template>
  <div class="el-page-header">
<!--    <div class="el-page-header__title" @click="goBack">-->
<!--      <img src="@/assets/icon/3_03.png" alt="" style="width: 8vw" >-->
<!--    </div>-->
<!--    <div class="el-page-header__content">-->
<!--      <div style="display: flex;justify-content: center;font-size: 0.8rem">-->
<!--        <span> {{content}}</span>-->
<!--      </div>-->
<!--    </div>-->
    <div style="display: flex;justify-content: space-between;width: 94%;margin: auto;align-items: center">
      <div @click="goBack"><img src="@/assets/icon/2_03.png" alt="" style="width: 2.5vw" ></div>
      <div><span> {{content}}</span></div>
      <div   @click="heidcomprehen">
        <img src="@/assets/icon/2_11.png" style="width: 6vw" alt="">
      </div>
    </div>

  </div>
</template>
<script>

    export default {
        name: "HeaderPage",
        props:{
            content:{
                type:String,
                default:''
            },
            isflag:{
                type:Boolean,
                default:true
            }
        },
        methods: {
            goBack() {
                this.$emit('taggbacks')
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
  .icons{
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
