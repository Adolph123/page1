<template>
  <div class="list_router">
    <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
    <ul class="tab">
      <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}" @click="tagglelist(index)">
        <span>{{item.name}}</span>
      </li>
    </ul>

    <div class="coupon">

      <div class="item" v-for="(item,index) in orderList" :key="item.id">
        <div class="itemTOP">
          <div>
<!--            <img src="@/assets/images/1_16.png" alt="" style="width: 9vh;display: block;height: auto;">-->
            <img :src="item.image" alt="">
          </div>
          <div>
            <h2>{{item.storeName}}</h2>
            <p>{{item.desc}}</p>
          </div>
          <div>
            <h2>{{item.sale*100}}%</h2>
            <span>优惠</span>
          </div>
        </div>
        <div class="itemBtom">
          <span style="padding-left: 0.8rem;line-height: 2rem;"> 有效期：{{item.endTime}}</span>
        </div>
      </div>


      <div class="item">
        <img src="@/assets/icon/3.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Pageheader from "@/base/pageheade/pageheader";
  import {getdislist} from '@/api/index';
    export default {
        created(){
            this._getdislist();
        },
        data(){
            return {
                content:"优惠券",
                titlelist:[
                    {
                        id:1,
                        name:'未使用',
                        isflag:true,
                    },
                    {
                        id:2,
                        name:'已使用',
                        isflag:false,
                    }, {
                        id:3,
                        name:'已过期',
                        isflag:false,
                    },
                ],
                orderList:[]
            }
        },
        methods:{
            //获取优惠券信息
            _getdislist(){
                let apiurl = 'v1/shop/order/coupon-find-mine';
                let data={
                    page:1
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取优惠券信息');
                    let reslist = res.data;
                    this.orderList = reslist;
                })
            },
            //删除优惠券
            removecoupon(id){
                let apiurl = 'v1/shop/order/coupon-del';
                let data={
                    id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'删除优惠券信息');
                    let reslist = res.data;
                })
            },
            //头部切换
            tagglelist(index){
                this.titlelist.map(item=>{
                    item.isflag = false
                });
                this.titlelist[index].isflag = true;

            },
        },
        components:{
            Pageheader
        }

    }
</script>

<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .list_router
    position relative
    width 100%
    height 100%
    font-size 0.65rem
    margin-bottom 11vh
    .tab
      height :30px
      line-height :0.8rem
      font-size :0.7rem
      padding-top 0.3rem
      display flex
      justify-content space-around
      .tab-item
        text-align :center
        color #000
        display block
      .tablink
        color:#31c27c;
        border-bottom : 3px solid #31c27c
    .coupon
      width 100%
      background #fff
      .item
        width 86%
        height 5rem;
        margin 0.5rem auto
        position: relative
        /*background #e01212*/
        .itemTOP
          display flex
          justify-content space-around
          align-items center
          /*margin 0.3rem 0*/
          height 65%
          width 100%
          background #ff556d
        .itemBtom
          position absolute
          top 65%
          width 100%
          height 30%
          background: #fff
          text-align left
          color #ccc
        .itemBtom:before
          content:''
          position absolute
          width 100%
          height 0.5rem
          display block
          background linear-gradient(  -45deg, transparent 33.33%,
          #ff556d 33.33%, #ff556d 66.66%,
          transparent 66.66%),
                  linear-gradient(45deg, transparent 33.33%,
                  #ff556d 33.33%, #ff556d 66.66%,
                  transparent 66.66%)
          background-size 30px 60px
          transform rotateZ(180deg)
</style>
