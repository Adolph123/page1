<template>
  <div class="collection">

    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>


    <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>
    <div style="margin: 0.5rem 0 0">
      <ul class="tab">
        <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}"
            @click="tagglelist(index)">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>


    <Scroll :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
            id="scroll"     @scrollToend="scrollToend" :data='goodslist' class="main-content">
      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"  id="scrollbox"
           @touchend="handleTouchEnd">
<!--下拉刷新-->
        <div v-show="loading" style="text-align: center;padding: 30px 0 5px;transition: all 0.5s">
          <i style="font-size: 16px" class="el-icon-loading"></i>
          <span>下拉刷新  </span>
        </div>
        <!--      店铺列表-->
        <div v-if="!isflag">
          <h2 class="title"> 店铺({{total}})</h2>
          <div v-if="goodslist.length" v-for="(item,index) in goodslist" :key="index" class="shopbox" style=";"
               @click.prevent="$router.push({path:`/shophome/${item.id}`})">
            <div>
              <img :src="item.header" alt="" style="width: 50px;height: 50px;display: block;">
            </div>
            <div>
              <span style="margin-left: 0.6rem;font-size:14px">{{item.name}}</span>
            </div>
            <div @click.stop="removeshop(item.id)" style="position: absolute;right: 0.2rem;">
              <i class="el-icon-delete" style="color: #bababa;font-size: 0.75rem;"></i>
            </div>
          </div>
        </div>
        <!--      商品列表-->
        <div v-else>
          <h2 class="title"> 宝贝({{total}})</h2>
          <span v-show="goodslist.length<=0" style="text-align: center;">
            <img src="@/assets/images/shapCar.png" alt="" class="praiseimg">
            <router-link to="/homepage" tag="div" style="margin-top: 2rem">
              <span class="backcolors"
                style="font-size:0.7rem;display: inline-block;padding:6px 2rem;color: #fff;border-radius: 25px">去添加商品</span>
            </router-link>
        </span>
          <div v-for="(item,index) in goodslist" :key="index" style="padding: 0.3rem 0.4rem">
            <div class="orderimgs">
              <div style="padding: 0 0.4rem 0 0;" @click="$router.push({path:`/details/${item.skuId}`})">
                <img :src="item.image" alt="" class="images">
              </div>
              <div class="ordername">
                <!--                  商品名-->
                <div class="nametext" @click.prevent="$router.push({path:`/details/${item.skuId}`})">{{item.skuName}}</div>
                <!--           收藏人数       -->
                <div style="color: #ccc;font-size: 0.5rem" @click="$router.push({path:`/details/${item.skuId}`})">
                  <span>{{ }}人已收藏<span style="margin: 0 0.3rem">|</span>{{ }}人已推荐</span>
                </div>
                <!--                  价格-->
                <div style="display: flex;margin: 0.2rem 0;color:#F4451A;"
                     @click="$router.push({path:`/details/${item.skuId}`})">
                  &nbsp
                  <span style="font-size: 0.7rem">{{item.price}}</span>
                </div>
                <!--                  相似-->
                <div
                  style="width: 100%;display: flex;justify-content: flex-end;margin-right: 0.3rem;position: absolute;bottom: 1px;right: 0.2rem">
                  <span class="collbut" @click.stop="removegoods(item.skuId)">取消收藏</span>

                  <span class="collbut" @click.stop="toSearch(item.skuName)">找相似</span>


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

        <div style="height: 40px;"></div>
      </div>
    </Scroll>


    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

  </div>
</template>

<script>
    import Pageheader from "@/base/pageheade/pageheader";
    import {getdislist} from '@/api/index'
    import Scroll from "@/base/scroll/scroll"
    import comprehensive from "@/base/comprehensive/comprehensive";
    import {tageshowcomprehen,lyricminshow} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen,lyricminshow],
        name: "collection",
        components: {Pageheader, Scroll,comprehensive},
        created() {
            console.log(parseInt(this.$route.query.id));
            this.titleindex = parseInt(this.$route.query.id);
            if(parseInt(this.$route.query.id) == 0){
                this._getdislist('v1/shop/goods/follow-list');
            }else{
                this.isflag = false
                this._getdislist('v1/shop/store/follow-list');
                this.titlelist.map(item => {
                    item.isflag = false
                });
                this.titlelist[1].isflag = true;
            }

        },
        data() {
            return {
                content: "我的收藏",
                isflag: true,
                total: 1,
                titlelist: [
                    {
                        id: 1,
                        name: '商品',
                        isflag: true,
                    },
                    {
                        id: 2,
                        name: '店铺',
                        isflag: false,
                    },
                ],
                goodslist: [

                ],
                page:1,
                titleindex:0
            }
        },
        methods: {
            //找相似
            toSearch(txt){
                this.$router.push({
                    path:'/search',
                    query:{
                        txt
                    }
                })
            },


            //划过结束
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.loading = true;
                    this.empty = false;
                    this.page = 1;
                    this.goodslist = [];
                    let apiurl;
                    if (this.titleindex == 0) {
                        apiurl = 'v1/shop/goods/follow-list';
                        this.isflag = true;
                    } else {
                        apiurl = 'v1/shop/store/follow-list';
                        this.isflag = false;
                    }
                    this._getdislist(apiurl);


                }
            }
            ,

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
                            let apiurl;
                            if (this.titleindex == 0) {
                                apiurl = 'v1/shop/goods/follow-list';
                                this.isflag = true;
                            } else {
                                apiurl = 'v1/shop/store/follow-list';
                                this.isflag = false;
                            }
                            this._getdislist(apiurl);

                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }



            },
            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY,'优质产品 加载更多',this.MoveY);
                // if (this.StartY > this.MoveY - 250) {
                //     console.log(this.total / 10 ,'>', this.page,'this.total / 10 > this.page')
                //     if (this.total / 10 > this.page) {
                //         this.page += 1;
                //         this.btomloading = true;
                //
                //         if(parseInt(this.$route.query.id) == 0){
                //             this._getdislist('v1/shop/goods/follow-list');
                //         }else{
                //             this.isflag = false;
                //             this._getdislist('v1/shop/store/follow-list');
                //             this.titlelist.map(item => {
                //                 item.isflag = false
                //             });
                //             this.titlelist[1].isflag = true;
                //         }
                //     } else {
                //         this.btomloading = false;
                //         this.empty = true;
                //     }
                // }
            },


            //我的收藏商品列表39.98.249.37:7000/api/
            _getdislist(apiurl) {
                let data = {
                    page: this.page
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '收藏列表');
                    let reslist = res.data;
                    this.loading = false;
                    this.btomloading = false;
                    this.isscrollflag = true;

                    if (reslist){
                        this.total = res.total;
                        this.goodslist = this.goodslist.concat(reslist) ;

                        setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)

                    }else{
                        this.goodslist = [];
                        this.isscrollflag = false;
                        this.total = res.total;
                    }

                })
            },
            //切换 收藏商品和店铺
            tagglelist(index) {

                if (this.$refs.scroll){
                    this.$refs.scroll.scrollTop();
                }

                this.isscrollflag = true;


                this.titlelist.map(item => {
                    item.isflag = false
                });
                this.titlelist[index].isflag = true;
                let apiurl;
                this.goodslist = []
                this.titleindex = index;
                this.page = 1;
                this.total=0;
                if (index == 0) {
                    apiurl = 'v1/shop/goods/follow-list';
                    this.isflag = true;
                } else {
                    apiurl = 'v1/shop/store/follow-list';
                    this.isflag = false;
                }
                this._getdislist(apiurl);
            },
            //取消关注 的店铺
            removeshop(id) {
                let apiurl = "v1/shop/store/follow";
                let data = {
                    id
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '删除关注店铺');
                    this.goodslist = [];
                    if(res.status =  "success"){
                        this.tagglePrompt(true, '取消关注成功')
                        this._getdislist('v1/shop/store/follow-list');
                    }else{
                        this.tagglePrompt(false, res.msg)
                    }


                })
            },
            //取消商品关注
            removegoods(id) {
                let apiurl = "v1/shop/goods/follow";
                let data = {
                    id
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '删除关注店铺');

                    if(res.status =  "success"){
                        this.tagglePrompt(true, '取消关注成功');
                        this.goodslist = [];
                        this._getdislist('v1/shop/goods/follow-list');
                    }else{
                        this.tagglePrompt(false, res.msg)
                    }


                })
            }
        }
    }
</script>

<style scoped lang="stylus">
  .collection
    height: 100vh;
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5
    text-align left

    .main-content
      height: 82.5vh;
      overflow: hidden;
      position: relative;

    .title
      font-size 0.61rem;
      font-weight 700
      margin 0.6rem auto 0.4rem
      width 90%
    .praiseimg
        display block
        width 100vw
        height auto
        margin 0 auto
        margin-top 7vh
    .shopbox
      display flex
      padding 0.3rem 0.3rem
      margin 0.3rem 0.8rem 0
      border-radius 6px
      background #fff
      align-items center
      font-size 0.5rem
      position: relative;

    .tab
      height: 30px
      line-height: 30px
      font-size 0.65rem
      display flex
      justify-content center
      .tab-item
        margin 0 0.7rem
        text-align: center
        color #636363
        display block
      .tablink
        color: #9a55ff;
        border-bottom: 3px solid #9a55ff;

    .orderimgs
      display flex
      justify-content space-between
      padding 0.2rem
      background #fff
      border-radius 6px

      .images
        width 4.5rem
        height auto
        display block

    .orderbut
      border-radius 15px
      color #9a55ff
      background #9ee0d7
      width 30%
      text-align center
      font-size 14px
      padding 0.1rem 0.4rem

    .ordername
      width 66%
      position: relative;
      line-height 1rem

      .collbut
        border 1px solid #bababa;
        display inline-block
        line-height 0.7rem
        border-radius 15px
        margin 0 0.1rem
        color: #606266;
        font-size: 0.5rem
        padding: 0.1rem 0.5rem

      .nametext
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size 0.6rem
</style>
