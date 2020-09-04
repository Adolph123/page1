<template>
  <div class="modifyaddress">
    <div class="el-page-header">
      <div class="el-page-header__title" @click="goBack">
        <i class="el-icon-arrow-left" style="font-size: 0.9rem;font-weight: 600;"></i>
      </div>
      <div class="el-page-header__content">
        <div style="display: flex;justify-content: center">
          <span> {{content}}</span>
        </div>
      </div>
    </div>
    <!--    地址列表  -->
    <Scroll class="main-content" :data='addlist'>
      <div>
        <div v-for="(item,index) in addlist" :key="index" :class="{modifyaddressItem:item.isDefault,modifyaddressItems:!item.isDefault}" @click.prevent="modifyaddressItems(item.id)">
          <div style="width: 10%">
            <i class="radio " :class="{radioshixin:item.isDefault == 1}"></i>
          </div>
          <div style="width: 94%;font-size: 0.6rem">
            <div style="display: flex;position: relative">
              <span style="font-size: 0.65rem;font-weight: 700">{{item.name}}</span>
              <span style="padding-left: 0.6rem;margin-left: 0.1rem;color: #bababa">{{item.phone}}</span>

              <div v-show="item.isDefault == 1"  style="margin-left: 0.6rem">
                <span  class="fangkuai"> {{item.remark}} </span>
              </div>

              <span @click.stop="removeaddress(item.id)" class="el-icon-delete" style="float: right;font-size: 0.65rem;position: absolute;right: 0"></span>
            </div>

            <div style="display: flex;margin-top: 0.3rem;position: relative;line-height: 1rem;align-items: center">

              <div>
                <span>{{item.area}}{{item.detail}}</span>
              </div>



              <div @click.stop="toAddress(item.id)" style="position: absolute;right: 0;">
                <i class="el-icon-edit-outline" style="font-size: 0.65rem"></i>
              </div>
            </div>
          </div>
        </div>



      </div>
    </Scroll>

    <div class="paymentBotm">
      <router-link to="/addresss" tag="div">
        <button class="paymentBotmbtn"> 添加地址 </button>
      </router-link>
    </div>

  </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader"
    import {getdislist} from '@/api/index'
    import Scroll from "@/base/scroll/scroll";
    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
        name: "modifyaddress",
        created(){
            this._getdislist();
        },
        data(){
            return{
                content:'我的地址',
                addlist:[

                ]
            }
        },
        methods:{
            //返回订单详情
            goBack(){
                this.$emit('modifyaddressget',false);
            },
            //传递选择的参数
            modifyaddressItems(itemid){

               this.$emit('taggleAddress',itemid);
            },
            //修改地址
            toAddress(arr){

            },
            //删除地址39.98.249.37:7000/api/
            removeaddress(id){
                let apiurl = 'v1/shop/order/address-del';
                let data = {id};
                getdislist(apiurl,data).then(res => {
                    console.log(res,'数据');
                    this._getdislist();
                })
            },
            //请求数据
            _getdislist(){
                let apiurl = 'v1/shop/order/address-find';
                let data = {}
                getdislist(apiurl,data).then(res => {
                    console.log(res,'地址列表数据');
                    let reslist = res.data;
                    this.addlist = reslist;
                })
            },
        },
        components:{
            Pageheader,Scroll
        }
    }
</script>

<style scoped lang="stylus">
  .modifyaddress
    width 100vw
    height 100vh
    position fixed
    top 0
    z-index 10000
    background #fff
    font-size 0.75rem
    .modifyaddressItem
      width 90%
      display flex
      align-items end
      margin 0 auto 0.6rem
      padding 0.1rem 0
      font-size 14px
    /*border-top 1px solid #ccc*/
    .modifyaddressItems
      width 90%
      margin 0 auto 0.6rem
      display flex
      align-items end
      font-size 14px
      color #bababa
    /*border-top 1px solid #ccc*/
    .radio
      display inline-block
      width 0.35rem
      height 0.35rem
      border-radius 50%
      border 1px solid #bababa
    .radioshixin
      border 1px solid #9a55ff
      background #9a55ff
    .fangkuai
      display inline-block
      padding 0 0.4rem
      line-height 0.7rem
      margin-right 0.3rem
      border-radius 3px
      font-size 0.5rem
      color #9a55ff
      background #f1d2ff
    .paymentBotm
      width 100%
      height 5vh
      padding 0.5rem 0
      position fixed
      z-index 1000
      bottom 0
      .paymentBotmbtn
        width 80%
        margin 0 auto
        border 0
        outline 0
        display block
        font-size 0.75rem
        padding 0.3rem 1.2rem
        background #9a55ff
        border-radius 30px
        color #fff
</style>
