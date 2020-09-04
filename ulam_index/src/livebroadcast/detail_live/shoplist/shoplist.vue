<template>
    <div style="position: fixed;bottom: 0;width: 100%;background: #222;text-align: center;color: #999;font-size: 12px">
      <scroll class="main-content">
        <div>
<!--          商品列表-->
          <div v-for="(item,index) in list" :key="index" @click="toItem(item.SkuId)"
               style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 15px">
<!--            商品图-->
            <div style="width: 33%">
              <img :src="item.Image" alt="" style="width: 90%;margin: 5%;height: auto;display: block">
            </div>
<!--            商品介绍    -->
            <div style="width: 70%;text-align: left">
              <div>{{item.Name}}</div>
              <div> {{item.Price}}ulam</div>
              <div> 抢购 </div>
            </div>
          </div>
        </div>
      </scroll>

      <backColor v-if="isshopItem">
        <shopItem       ></shopItem>
      </backColor>

    </div>
</template>

<script>
    import {getliveData} from '@/api/index';
    import scroll from "../../../base/scroll/scroll";
    import shopItem from './shopItem/shopItem';
    import backColor from "../../../base/backColor/backColor";
    export default {
        name: "shoplist",
        components:{scroll,shopItem,backColor },
        props: {
            shoplistitem: {
                type: String,
                default:''
            }
        },
        created(){
            this._getliveData()
        },
        data(){
            return{
              list:[],
              isshopItem:false,
              shopItemid:'',
            }
        },
        methods:{
            _getliveData(){
                let apiurl = 'v1/live/get_goods';
                let data = {
                    Name:this.shoplistitem,
                };
                getliveData(apiurl,data).then(res=>{
                    console.log('直播商品数据列表',res.data)
                    this.list = res.data;
                })
            },
            toItem(item){
                this.isshopItem = true;
                this.shopItemid = item
            }
        }
    }
</script>

<style scoped>
  .main-content{
    overflow: hidden;
    position: relative;
    height: 55vh;
    background: #fff;
  }
</style>
