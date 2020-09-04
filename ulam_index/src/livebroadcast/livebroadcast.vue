<template>
  <div class="livebox" :style="{height:heights+'px'}">

    <!--    搜索  -->
    <div class="backcolors"
         style="box-shadow: 1px 1px 2px rgb(165, 165, 165);height: 45px;padding-top: 35px;width: 100%;position: fixed;left: 0;top: 0;z-index: 10;">
      <div style="display: flex;justify-content: space-between;padding: 0 15px;align-items: center">
        <div @click="$router.push('/searchLive')"
             style="width:80%;display:flex;align-items: center;background: #fff;border-radius: 20px;height: 30px;line-height: 30px">
          <img src="@/assets/icon/商城_11.png" alt="" style="width: 5.5vw;height: auto;display: block;margin-left: 15px">
          <span style="width: 10px"></span>
          <span style="color: rgb(177, 177, 177);font-size: 14px">请输入昵称/ID</span>
        </div>
        <img @click="heidcomprehen" src="@/assets/lives/l13.png" alt="" style="width: 7vw;height: 30px;display: block;">
        <img @click="$router.push('/index')" src="@/assets/lives/l12.png" alt=""
             style="width:24px;height: 24px;display: block;">
      </div>
    </div>
    <div style="height: 79px;background: #9a55ff"></div>

    <scroll class="main-content" :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup" ref="scroll"
            @scroll="scrollss"
            @scrollToend="scrollToend" :data='lives' id="scroll" :style="{height:heights-80+'px'}">
      <div style="position: relative" @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"
           @touchend.prevent="handleTouchEnd" id="scrollbox"

      >
        <div v-if="refreshs"
             style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px">
          <i class="el-icon-loading" style="font-size: 16px"></i> 刷新中
        </div>
        <!--        <div style="background: #fff;height: 110px"></div>-->
        <!--轮播图-->
        <!--        <div style="position: absolute;z-index: 10;top: 0;width: 100%">-->

        <!--          <swiper  auto :interval="huos"  :loop="true"   :show-dots="true" dots-position="center"  height="205px" >-->
        <!--            <swiper-item v-for="(to,index) in banner" v-bind:key="index">-->
        <!--              <div style="margin: 10px 15px 0; ">-->
        <!--                <img :src="to.src" style="width:100%;height:auto;border-radius: 10px;overflow: hidden"  @click="tobar(to)">-->
        <!--              </div>-->
        <!--            </swiper-item>-->
        <!--          </swiper>-->
        <!--        </div>-->
        <!--      直播人员      -->
        <div style="background: #fff;padding: 0 15px">
          <div style="height: 25px"></div>
          <div v-if="lives.length >0" style="font-size: 0">
            <div v-for="(item,index) in lives" :key="index" @click="tolivesDetail(item)"
                 style="position: relative;display: inline-block;overflow: hidden;border-radius: 6px"
                 :style="{width:widths*49-15+'px',marginLeft: (index+1)%2 ==0?2*widths+'px':'0',marginBottom:2*widths+'px'}">
              <div><img  v-lazy="item.Image"  alt="" style="width: 100%;height: auto;display: block;margin: 0 auto"></div>

              <div v-if="item.Status == 1"
                   style="font-size:12px;position: absolute;left: 0px;top: 0px;color: #fff;z-index: 10;height: 22px;line-height:22px;background: rgba(0,0,0,0.4);">
                <div style="display: flex;align-items: center;justify-content: center;">
                  <p style="width: 3px;"></p>
                  <img src="@/assets/lives/l11.png" alt="" style="width: 10px;height: auto;display: block">
                  <p style="width: 6px;"></p>
                  <span style="font-size:9px;font-weight: 100;">直播</span>
                  <p style="width: 6px;"></p>
                  <p style="font-size:9px;font-weight: 100;">{{item.Nick}}</p>
                  <p style="width: 3px;"></p>
                </div>
              </div>

              <div v-if="!(item.Status == 1)"
                   style="font-size:12px;position: absolute;left: 0px;top: 0px;color: #fff;z-index: 10;height: 22px;line-height:22px;background: rgba(0,0,0,0.4);">
                <div style="display: flex;align-items: center;justify-content: center;">
                  <p style="width: 3px;"></p>
                  <img src="@/assets/lives/l111.png" alt="" style="width: 10px;height: auto;display: block">
                  <p style="width: 6px;"></p>
                  <p style="font-size:9px;font-weight: 100;">视频</p>
                  <p style="width: 6px;"></p>
                  <p style="font-size:9px;font-weight: 100;">{{item.Nick}}</p>
                  <p style="width: 3px;"></p>
                </div>
              </div>


              <!--热门-->
              <!-- <div v-if="index == -1" style="font-size: 12px;position: absolute;bottom: 35px;width: 100%;color: #fff;left: 10px">
                 <div style="display: flex;align-items: center;width: 110px;height: 24px;border-radius: 20px;background: rgb(129, 37, 226);justify-content: center">
                   <img src="@/assets/huo.png" alt="" style="width: 16px;height: auto;display: block">
                   <p style="width: 5px;"></p>
                   <span>热门榜第一</span>
                 </div>
               </div> -->


              <div
                style="font-size:12px;position: absolute;bottom: 0px;width: 100%;color: #fff;background: rgba(0,0,0,0.4);">
                <div
                  style="display: flex;justify-content: space-between;padding: 0 5px;align-items: center;height: 25px;line-height: 25px">
                  <p
                    style="color: rgb(236, 233, 233);font-size: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 70%;">
                    {{item.Name}}
                  </p>
                  <div style="display: flex;align-items: center;width: 30%;justify-content: flex-end;">
                    <img src="@/assets/lives/yj.png" alt="" style="width: 13px;height: auto;display: block">
                    <p style="width: 3px;"></p>
                    <span>{{item.Count}}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div v-if="loadings"
               style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px">
            <i class="el-icon-loading" style="font-size: 16px"></i> 加载中
          </div>
          <!--          没有了     -->
          <div v-if="heids"
               style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px;color: #ccc;margin-top: 30px">
            暂无更多
          </div>


          <div style="height: 70px"></div>
        </div>

        <!--        -->
      </div>
    </scroll>

    <!-- 底部导航 -->
    <div
      style="position: fixed;left: 0;bottom: -1px;border-top: 1px solid rgb(247, 244, 244);width: 100%;height: 50px;background: #fff;z-index: 100">
      <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;height: 48px">

        <div style="width: 25%;text-align: center;font-size: 12px;color: #9a55ff">
          <img src="@/assets/lives/1.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 7px">发现</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/chatLive')">
          <img src="@/assets/lives/2_2.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 8px">信息</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999;position: relative"
             @click="$router.push('/addLive')">
          <img src="@/assets/lives/3.png" alt=""
               style="
               width:98%;height: auto;display: block;margin: -19px auto 0;position: relative;z-index: 1">
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/followLive')">
          <img src="@/assets/lives/4_4.png" alt="" style="width: 21px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top:7px">关注</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/myorderLive')">
          <img src="@/assets/lives/5_5.png" alt="" style="width: 19px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 7px">我的</p>
        </div>
      </div>

    </div>
    <!--  直播详情  -->
    <detailLive v-if="isdetailLive" :detailsitem="detailsitem" @heiddetailLives="heiddetailLives"></detailLive>
    <!--  功能直达  -->
    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>
  </div>
</template>

<script>
    import scroll from "../base/scroll/scroll";
    import detailLive from './detail_live/detail_live'
    import {Swiper, SwiperItem,} from "vux";
    import {getliveData} from '@/api/index';
    import comprehensive from "@/base/comprehensive/comprehensive";
    import {lyricminshow, tageshowcomprehen} from '@/common/js/mixin.js';

    export default {
        mixins: [lyricminshow, tageshowcomprehen],
        name: "livebroadcast",
        components: {scroll, Swiper, SwiperItem, detailLive, comprehensive},
        data() {
            return {

                heights: 0, widths: 0, bodyheights: 0,
                huos: 5000,//轮播时间
                banner: [
                    {src: 'http://img4.imgtn.bdimg.com/it/u=2165365120,1839181050&fm=26&gp=0.jpg'},
                    {src: 'http://img4.imgtn.bdimg.com/it/u=2165365120,1839181050&fm=26&gp=0.jpg'},
                    {src: 'http://img4.imgtn.bdimg.com/it/u=2165365120,1839181050&fm=26&gp=0.jpg'},
                ],
                lives: [],
                isdetailLive: false,
                detailsitem: '',
                //下拉刷新
                refreshs: false,
                loadings: false,
                heids: false,
            }
        },
        created() {
            this.heights = document.documentElement.clientHeight;
            this.widths = document.documentElement.clientWidth / 100;
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            this._getliveList();
        },
        methods: {
            //滚动监听 上拉加载
            scrollss(pos) {
                this.bodyheights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;

                if ((pos.y * -1) + 200 >= this.bodyheights - this.scrollheight) {
                    if (this.total / 10 > this.page) {
                        this.page += 1;
                        this.loadings = true;
                        let apiurl = 'v1/live/list';
                        let data = {
                            Page: this.page
                        };
                        getliveData(apiurl, data).then(res => {
                            this.loadings = false;
                            console.log(res, '请求直播数据')
                            this.lives = this.lives.concat(res.data);
                            this.total = res.total;
                            this.$refs.scroll.refresh()
                        })
                    } else {
                        this.heids = true
                    }
                }
            },

            //划过结束 下拉刷新
            handleTouchEnd() {
                if (this.scrollY > 40) {
                    this.refreshs = true;
                    this.page = 1;
                    this._getliveList();
                }
            },
            // //跳转直播页面
            tolivesDetail(item) {
                this.isdetailLive = true;
                this.detailsitem = item;
            },
            //跳转直播
            // tolivesDetail(item){
            //     let user = localStorage.getItem('user');
            //     console.log('!@!@!@!@!@!')
            //     uni.navigateTo({
            //         url: `/pages/lives/lives?user=${user}&item=${item}`
            //     });
            // },
            //


            //请求直播数据
            _getliveList() {
                let apiurl = 'v1/live/list';
                let data = {
                    Page: 1
                };
                getliveData(apiurl, data).then(res => {
                    this.refreshs = false;
                    console.log(res, '请求直播数据')
                    if (res.total == 0) {
                        this.lives = [];
                    } else {
                        this.lives = res.data;

                    }
                    this.total = res.total;
                })
            },


            //退出直播
            heiddetailLives() {
                this.isdetailLive = false;
                this.detailsitem = {}
            },

            //轮播跳转
            tobar(id) {
                console.log(id, '!@@@@')
            },

        }
    }
</script>

<style scoped>
  .livebox {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }

  .main-content {
    background: #fff;
    overflow: hidden;
    position: relative;
  }
</style>
