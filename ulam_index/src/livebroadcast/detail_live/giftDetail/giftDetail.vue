<template>
    <div  style="position: fixed;bottom: 0;width: 100%;background: #222;text-align: center;color: #999;font-size: 12px">
      <div style="height: 30px;"></div>
      <div style="font-size: 14px">
        <span style="color: #ccc;">钱包余额：</span>
        <span style="color: #1cc6e2;">{{Math.round(yue*100)/100 }}ulam</span>
      </div>
      <div style="height: 20px;border-bottom: 0.5px solid #444"></div>
      <div style="height: 10px;"></div>
      <div style="padding: 0 10px;font-size: 0;text-align: left">
        <div style="display: inline-block;;width: 25%;text-align: center"  v-for="(item,index) in giftDetails"
             :key="index" :style="{background:isflag == item.Id?'#000':''}" @click="isflag = item.Id">
          <div><img :src="item.Logo" alt="" style="width: 50%;height: auto;display: block;margin: 0 auto"></div>
          <div style="font-size: 12px;color: #fff">{{item.Name}}</div>
          <div style="font-size: 10px;color: #ccc">{{item.Price}}ULAM</div>
        </div>
      </div>

      <div style="height: 15px;"></div>
      <div @click="huaqian"
        style="border-radius: 20px;border: 1px solid #e23f5b;width: 60%;margin: 0 auto;line-height: 30px;color: #e23f5b">
        打赏
      </div>
      <div style="height: 15px;"></div>
    </div>
</template>

<script>
    export default {
        name: "giftDetail",
        props:{
            giftDetails:{
                type:Array,
                default:()=>{
                    return[]
                }
            }
        },
        data(){
            return{
                yue:0,
                isflag:0,
            }
        },
        mounted(){
          this.yue = JSON.parse(localStorage.getItem('wals')).balance;
        },
        methods:{
            huaqian(){
                this.giftDetails.map(item=>{
                    if(item.Id == this.isflag){
                        console.log(item)
                        this.$emit('myhuaqian',item)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
