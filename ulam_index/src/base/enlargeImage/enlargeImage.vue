<template>
  <div  style="width: 100vw;background:rgba(0,0,0,0.9);overflow:hidden;position: fixed;left: 0;top: 0;z-index: 1000000000000"
       :style="{height:heights?heights+'px':'100vh'}"
       id="enlargeImage"
      >



    <div style="width: 100%;margin: 0 auto;position: relative" :style="{height:heights?heights+'px':'100%'}" >
<!--      <div style="height: 5%"></div>-->
      <div style="position: absolute;width: 96%;height: 100%;left: 2%;z-index: 10">
        <div style="width: 100%;height: 100%;display: flex;justify-content: space-between;align-items: center;color: #fff">
<!--          <div @click="jian1" class="radious" ><i class="el-icon-arrow-left" style="font-size: 16px"></i></div>-->
          <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
               style="width: 100%;height: 95%;margin: 0 auto;display: flex;justify-content: center;align-items: center;">
            <img :src="images[index]" alt="" style="width: 100%;height: auto;display: block;margin: 0 auto;" >
          </div>
<!--          <div @click="add1" class="radious" ><i class="el-icon-arrow-right" style="font-size: 16px"></i></div>-->
        </div>
      </div>
      <div style="width: 100%; color: #fff;text-align: center;display: flex;justify-content: center;align-items: center;
          height: 40px;line-height: 40px;padding-top: 30px;
          position: absolute;z-index: 100;background: rgba(0,0,0,0.5);
      ">
        <div></div>
        <div>{{index+1}}/{{images.length}}</div>
<!--        <div  @click="back"  class="radious"  style="position: absolute;top: 5%;right: 2%;z-index: 100">-->
<!--          <i class="el-icon-close" style="font-size: 16px"></i>-->
<!--        </div>-->
      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "enlargeImage",
        props:{
            imagesList:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            nums:{
                type:Number,
                default: 0
            },
            heights:{
                type:Number,
                default: 0
            }
        },
        created(){
            console.log(this.imagesList,'@@@@@@@@',this.nums);
            let images = this.imagesList;
            this.images = images;
            let index =  this.nums;
            this.index =index
            console.log(this.images,'!!!!!!!!!!',index)
        },
        data(){
            return{
                num:0,
                images:[],
                index:0,
                StartNum:0,
                MoveNum:0,

            }
        },
        methods:{
            touchStart(e){
                console.log(e.targetTouches[0].pageX,'按下');
                this.StartNum = parseInt(e.targetTouches[0].pageX);
                this.MoveNum = parseInt(e.targetTouches[0].pageX);
            },
            touchMove(e){
                console.log(e.targetTouches[0].pageX,'移动');
                this.MoveNum = parseInt(e.targetTouches[0].pageX);
            },
            touchEnd(){
                console.log(this.StartNum-30, '> ',this.MoveNum);
                if (this.StartNum-30 > this.MoveNum ){
                    //左滑
                    this.jian1()
                }
                if (this.StartNum+30 < this.MoveNum){
                    //右滑
                    this.add1()
                }
                if (this.StartNum == this.MoveNum){
                    this.back()
                }
            },
            back(){
                this.$emit('guanbirotateImage')
            },
            goBack(){
                this.$emit('guanbirotateImage')
                //replace替换原路由，作用是避免回退死循环
            },
            rotate(){
                this.num +=1;
            },
            jian1(){
                if (this.index == 0){
                    this.index = this.images.length-1
                }else{
                    this.index -=1;
                }
            },
            add1(){
                if (this.index == this.images.length-1){
                    this.index =0;
                }else{
                    this.index += 1;
                }
            }
        }
    }
</script>

<style scoped>
  .radious{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(0,0,0,.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
