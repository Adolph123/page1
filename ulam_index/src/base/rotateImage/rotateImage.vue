<template>
    <div style="width: 100vw;height: 100vh;background:rgba(0,0,0,0.7);position: fixed;left: 0;top: 0;z-index: 1000000000000" @click="back">
      <div style="width: 100%;height: 100%;display: flex;align-items: center">
        <img :src="images" alt="" style="width: 100%;height: auto;display: block;transition: all 0.5s"  :style="{transform:`rotate(${90*num}deg)`,}"  >
      </div>
    </div>
</template>

<script>
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "rotateImage",
        props:{
            images:{
                type:String,
                default:''
            }
        },
        data(){
          return{
              num:0,
          }
        },
        methods:{
            back(){
                this.$emit('guanbirotateImage')
            },
            goBack(){
                this.$emit('guanbirotateImage')
                //replace替换原路由，作用是避免回退死循环
            },
            rotate(){
                this.num +=1;
            }
        }
    }
</script>

<style scoped>
  .btm{
    display: inline-block;
    width: 40%;
    padding: 6px 0;
    text-align: center;
    background:  #3f0082;
    line-height: 20px;
    height: 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    color:#fff;
  }
</style>
