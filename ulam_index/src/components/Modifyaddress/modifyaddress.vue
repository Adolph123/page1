<template>
  <div class="modifyaddress">
    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>
    <Pageheader :content="content" @taggbacks="taggbacks" @heidcomprehen="heidcomprehen"></Pageheader>
    <!--    地址列表  -->
    <Scroll class="main-content" :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
            id="scroll"        @scrollToend="scrollToend"  :data='addlist'>

      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"  id="scrollbox"
           @touchend="handleTouchEnd" >
        <div v-show="loading" style="text-align: center;padding: 5px 0;transition: all 0.5s;font-size: 14px">
          <i style="font-size: 16px" class="el-icon-loading" ></i><span>下拉刷新</span>
        </div>
        <div v-if="islenth" style="text-align: center;">
          <img src="@/assets/images/address_11.png" alt="" class="praiseimg">
          <router-link to="/addresss" tag="div" style="margin-top: 2rem">
            <span class="backcolors"
              style="font-size:0.7rem;display: inline-block;padding: 0.2rem 2rem;color: #fff;border-radius: 25px">去添加地址</span>
          </router-link>
        </div>

        <div v-else>
          <div style="height: 15px"></div>
          <div v-for="(item,index) in addlist" :key="index"
               :class="{modifyaddressItem:item.isDefault,modifyaddressItems:!item.isDefault}"
               @click.prevent="isDefaultflag(item.id)">
            <div style="width: 10%">
              <!--              <i class="radio " :class="{radioshixin:item.isDefault == 1}"></i>-->
              <span style="color: #9a55ff;font-size: 18px"
                    :class="{'el-icon-success':item.isDefault,'radio':!item.isDefault}"></span>
              <!--              <span style="color: #9a55ff;font-size: 0.7rem" :class="{'el-icon-success':radioall,'radio':!radio}" ></span>-->
            </div>
            <div style="width: 94%;font-size: 0.6rem">
              <div style="display: flex;position: relative">
                <span style="font-size: 0.65rem;font-weight: 700">{{item.name}}</span>
                <span style="padding-left: 0.6rem;margin-left: 0.1rem;color: #bababa">{{item.phone}}</span>
                <div v-show="item.isDefault == 1" style="position: absolute;right: 0;">
                  <span class="fangkuai"> {{item.remark}} </span>
                  <span @click.stop="removeaddress(item.id)" class="el-icon-delete"
                        style="float: right;font-size: 0.75rem;"></span>
                </div>

                <div  style="position: absolute;right: 0;">
                  <span @click.stop="removeaddress(item.id)" class="el-icon-delete"
                        style="float: right;font-size: 0.75rem;"></span>
                </div>

              </div>

              <div style="display: flex;margin-top: 0.3rem;position: relative;line-height: 1rem;align-items: flex-end">

                <div style="width: 94%">
                  <span>{{item.area}}{{item.detail}}</span>
                </div>


                <div @click.stop="toAddress(item.id)" style="position: absolute;right: 0;bottom:2px">
                  <i class="el-icon-edit-outline" style="font-size: 0.75rem"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>

        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
          <i style="font-size: 28px" class="el-icon-loading" ></i>
        </div>
          <div style="height: 30px"></div>



      </div>

    </Scroll>
<!--    <div class="paymentBotm" v-show="!islenth">-->
<!--      <router-link to="/addresss" tag="div">-->
<!--        <button class="paymentBotmbtn"> 添加地址</button>-->
<!--      </router-link>-->
<!--    </div>-->


  </div>
</template>

<script>
    import Pageheader from "@/base/HeaderPage/HeaderPage";
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll"

    import {tageshowcomprehen,lyricminshow} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen,lyricminshow],
        name: "modifyaddress",
        created() {
            this._getdislist();
        },
        data() {
            return {
                content: '修改地址',
                islenth: false,
                addlist: []
            }
        },
        methods: {
            //划过结束
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.loading = true;
                    this.empty = false;
                    this.page = 1;
                    this.addlist = [];
                    this._getdislist()
                }
            },

            //滚动监听
            scrollss(pos){
                this.heights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if(this.isscrollflag){
                    if((pos.y * -1)+200 >= this.heights-this.scrollheight ){
                        if(this.total/10 > this.page){
                            this.isscrollflag = false;
                            this.page += 1;
                            this.btomloading = true;
                            this._getdislist();
                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }
            },
            //滑动 优质产品 加载更多
            scrollToend() {
                console.log(this.StartY, '优质产品 加载更多', this.MoveY, this.total / 10, this.page);
                // if (this.StartY > this.MoveY - 250) {
                //
                //     if (this.total / 10 > this.page) {
                //         this.btomloading = true;
                //         this.page += 1;
                //         this._getdislist();
                //     } else {
                //         this.empty = true;
                //         this.btomloading = false;
                //     }
                // }
            },





            taggbacks() {
                this.$router.push('/setup')
            },
            //修改为默认地址
            isDefaultflag(id) {
                let apiurl = 'v1/shop/order/address-default';
                let data = {id};
                getdislist(apiurl, data).then(res => {
                    console.log(res, '设置默认地址数据');
                    this.addlist = [];
                    this._getdislist();
                })
            },
            //修改地址
            toAddress(id) {
                console.log(id)
                this.$router.push({
                    path: '/addresss',
                    query: {id}
                })
            },
            //删除地址39.98.249.37:7000/api/
            removeaddress(id) {
                let apiurl = 'v1/shop/order/address-del';
                let data = {id};
                getdislist(apiurl, data).then(res => {

                    this.addlist = [];
                    console.log(res, '数据');
                    this._getdislist();
                })
            },
            //请求数据
            _getdislist() {
                let apiurl = 'v1/shop/order/address-find';
                let data = {}
                getdislist(apiurl, data).then(res => {
                    console.log(res, '数据');
                    this.isscrollflag = true;
                    this.btomloading = false;

                    this.loading = false;
                    let reslist = res.data;

                    if (reslist) {
                        this.addlist = this.addlist.concat(reslist);
                        this.islenth = false;
                    } else {
                        this.islenth = true;
                        this.addlist = [];
                        this.isscrollflag = false;
                        return
                    }
                })
            },
        },
        components: {
            Pageheader, Scroll
        }
    }
</script>

<style scoped lang="stylus">
  .modifyaddress
    height: 100vh;
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5

    .main-content
      height: 90vh;
      overflow: hidden;
      position: relative;

      .praiseimg
        display block
        width 100vw
        height auto
        margin 0 auto
        margin-top 7vh

    .modifyaddressItem
      width 90%
      display flex
      align-items end
      margin 0 auto 0.6rem
      padding 0.1rem 0
      font-size 14px

    .modifyaddressItems
      width 90%
      margin 0 auto 0.6rem
      padding 0.1rem 0
      display flex
      align-items end
      font-size 14px
      color #bababa

    .radio
      display inline-block
      width 14px
      height 14px
      border-radius 50%
      border 1px solid #bababa

    .radioshixin
      border 1px solid #9a55ff
      background #9a55ff

    .fangkuai
      display inline-block
      padding 0 0.4rem
      line-height 0.7rem
      margin-right 0.6rem
      border-radius 3px
      font-size 0.5rem
      color #9a55ff
      background #f1d2ff

    .paymentBotm
      width 100%
      height 5vh
      padding 0.5rem 0


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
