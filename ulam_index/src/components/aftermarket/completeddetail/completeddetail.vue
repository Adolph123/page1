<template>
    <div class="completeddetail">
      <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
<!--      进度-->
      <div class="detailitem" id="detailitem" style="background: 0">
        <el-steps :active="active" finish-status="success" >
          <el-step title="提交申请"></el-step>
          <el-step title="商家审核"></el-step>
<!--          <el-step title="商家收货"></el-step>-->
          <el-step title="审核完成"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
      </div>
<!--      退款金额-->

      <div class="detailitem">
        <div style="padding: 0.3rem 0.5rem">
          <div class="fulx" style="justify-content: space-between">
            <span>退款总金额</span>
            <span style="color:#F4451A;font-size: 14px">&nbsp{{completeddetail.returnAmount}}</span>
          </div>
          <div class="fulx" style="justify-content: space-between">
            <span style="color: #9a55ff">预计1-3个工作日到账</span>
          </div>
        </div>

      </div>
<!--      商品信息-->
      <div class="detailitem">
        <div style="padding: 0.3rem 0.5rem 0.75rem">
          <h2 class="title">商品信息:</h2>
          <div style="display: flex;justify-content: space-between;align-items: flex-end">
            <div style="width: 30%">
              <img :src="completeddetail.skuDefaultImg" alt="" style="display: block;width: 25vw;height: auto">
            </div>
            <div style="line-height: 1rem;font-size: 12px;width: 66%">
              <div ><span style="color:#000;">{{completeddetail.skuName}}</span></div>
              <div style="display: flex;justify-content: space-between;margin: 2px 0">
                <span style="width: 50%;display: inline-block">单价:<span >&nbsp{{completeddetail.goodsPrice}}</span></span>
                <span style="width: 50%;display: inline-block">数量 <span >{{completeddetail.returnCount}}</span></span>
              </div>
              <div style="display: flex;justify-content: space-between;font-size:12px" >
                <span style="width: 50%;display: inline-block">优惠:<span >&nbsp{{completeddetail.totalDiscount}}</span></span>
                <span style="width: 50%;display: inline-block">应退:<span style="color:#F4451A">&nbsp{{completeddetail.returnAmount}}</span></span>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
<!--      服务单号-->
      <div class="detailitem">
        <div style="padding: 0.3rem 0.5rem">
          <div class="fulx"> <span class="huise">服务单号:</span><span>{{completeddetail.returnNo}}</span></div>
          <div  class="fulx"><span class="huise">申请时间:</span><span>{{completeddetail.submitTime}}</span></div>
          <!--        <div  class="fulx"  ><span class="huise">服务类型</span><span>{{completeddetail}}</span></div>-->
          <div  v-if="completeddetail.handlingWay" class="fulx"><span class="huise">退款方式:</span><span>{{options[completeddetail.handlingWay-1].label}}</span></div>
        </div>
      </div>

    </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader";
    import {getdislist} from '@/api/index'
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name: "completeddetail",
        components:{
            Pageheader
        },
        created(){
            this._getdislist();
        },
        data(){
            return{
                content:"服务详情",
                active: 0,
                completeddetail:{},
                options: [
                    {
                        value: '1',
                        label: '只退款'
                    }, {
                        value: '2',
                        label: '退款退货'
                    }, {
                        value: '3',
                        label: '退货入库,重新发货'
                    }, {
                        value: '4',
                        label: '重新发货,不要求归还'
                    }
                ],
            }
        },
        methods:{
            // 获取退单信息
            _getdislist(returnNo){
                let apiurl = 'v1/shop/order/return-get';
                let data={
                    returnNo:this.$route.params.id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取退单信息');
                    let reslist = res.data;
                    if(reslist){

                        this.completeddetail = reslist;
                        this.active = reslist.status-1;
                    }else {
                        this.completeddetail = []
                        return
                    }

                })
            },
            //
        }
    }
</script>

<style scoped lang="stylus">
  .completeddetail
    width 100vw
    height 100vh
    font-size 14px
    background #f5f5f5
    text-align left
    .detailitem
      width 90%
      margin 15px auto
      border-radius 6px
      line-height 1rem;
      font-size 14px
      background #fff
      .title
        margin 5px 0
      .fulx
        display flex;
        padding 2px 0
        font-size 12px
        .huise
          color #cccccc;
          padding-right 5px;
</style>
<style>
  #detailitem .el-step__title.is-process{
    color: rgb(154, 85, 255);
  }
  #detailitem .el-step__head.is-process{
    color: rgb(154, 85, 255);
    border-color: rgb(154, 85, 255);
  }

</style>
