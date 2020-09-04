<template>
  <div class="search_live" :style="{height:heights+'px'}">
    <div class="backcolors" style="position: fixed;left: 0;top: 0;width: 100%;z-index: 10">
      <searchBox ref="inputs" @goBack="goBack" @severvalue='severvalue' :placeholder='placeholder'
                 :color="color"></searchBox>
    </div>
    <div style="height: 74px"></div>

    <scroll class="main-content" :style="{height:heights-74+'px'}" :listenScroll="listenScroll" :probeType="probeType"
            :pullup="pullup" ref="scroll" @scroll="scrollss"
            @scrollToend="scrollToend" :data='wenList' id="scroll">
      <div id="scrollbox" @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"
           @touchend.prevent="handleTouchEnd">

        <!--          搜索前   -->
        <div v-if="isflag == true">
          <!-- 搜索历史DOM -->
          <div class="shortcut">
            <div v-if="History.length>0" class="hot-key">
              <div style="height: 5px"></div>
              <div class="title">
                <span style="">搜索历史</span>
                <span class="clear" @click='removeHistory'>
                  <i class="icon-clear" style="color: #bababa"></i>
               </span>
              </div>
              <ul>
                <li class="item" v-for="(item,index) in History" :key="index" @click='togglevalus(item)'>
                  {{item}}
                </li>
              </ul>
            </div>
          </div>

        </div>
        <!--          搜索后   -->
        <div v-else>

          <div style="padding: 0 15px">
            <div style="height: 5px"></div>
            <div style="display: flex;align-items: center;justify-content: space-between; ">
              <span>搜索展示</span>
              <span @click="isflag = true" class="el-icon-close"></span>
            </div>
            <div style="height: 10px"></div>


            <div v-if="refreshs"
                 style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px">
              <i class="el-icon-loading" style="font-size: 16px"></i> 加载中
            </div>
            <div v-if="total == 0"
                 style="display: flex;justify-content: center;align-items: center;height: 245px;font-size: 14px">
                 未搜索到相关数据
            </div>

            <div v-if="wenList.length >0" style="font-size: 0">
              <div v-for="(item,index) in wenList" :key="index" @click="tolivesDetail(item)"
                   style="position: relative;display: inline-block;"
                   :style="{width:widths*49-15+'px',marginLeft: (index+1)%2 ==0?2*widths+'px':'0',marginBottom:2*widths+'px'}">
                <div><img :src="item.Image" alt=""
                          style="width: 100%;height: auto;display: block;border-radius: 10px;margin: 0 auto"></div>

                <div
                  style="font-size:12px;position: absolute;left: 10px;top: 10px;color: #fff;z-index: 10;width: 70px;height: 22px;line-height:22px;background: rgba(0,0,0,0.5);border-radius: 20px">
                  <div style="display: flex;align-items: center;justify-content: center">
                    <img src="" alt="">
                    <span>直播</span>
                  </div>
                </div>
                <!--热门-->
                <div v-if="index == -1"
                     style="font-size: 12px;position: absolute;bottom: 35px;width: 100%;color: #fff;left: 10px">
                  <div
                    style="display: flex;align-items: center;width: 110px;height: 24px;border-radius: 20px;background: rgb(129, 37, 226);justify-content: center">
                    <img src="@/assets/huo.png" alt="" style="width: 16px;height: auto;display: block">
                    <p style="width: 5px;"></p>
                    <span>热门榜第一</span>
                  </div>
                </div>


                <div style="font-size:12px;position: absolute;bottom: 10px;width: 100%;color: #fff">
                  <div style="display: flex;justify-content: space-between;color: #000;padding: 0 15px">
                    <span>{{item.Nick}}</span>
                    <span>{{item.Count}}</span>
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
            <div style="height: 30px;"></div>
          </div>
        </div>

      </div>
    </scroll>

    <!--  直播详情  -->
    <detailLive v-if="isdetailLive" :detailsitem="detailsitem" @heiddetailLives="heiddetailLives"></detailLive>

  </div>
</template>

<script>
    import scroll from "../../base/scroll/scroll";
    import detailLive from '../detail_live/detail_live'
    import searchBox from "../../base/search-box/searchBox";
    import {getliveData} from '@/api/index';
    import {lyricminshow} from '@/common/js/mixin'

    export default {
        name: "search_live",
        mixins: [lyricminshow],
        components: {
            scroll,
            searchBox,
            detailLive
        },
        data() {
            return {
                heights: 0, widths: 0, placeholder: "请输入昵称/ID",
                wenList: [],
                color: true,
                values: '',
                isflag: true,
                History: [],
                isdetailLive: false,
                detailsitem: '',
                //下拉刷新
                refreshs: false,
                loadings: false,
                heids: false,
                bodyheights: 0,
            }
        },
        created() {
            this.heights = document.documentElement.clientHeight;
            this.widths = document.documentElement.clientWidth / 100;
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('black')
            }

            this.History = JSON.parse(localStorage.getItem('liveHistory'))


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


                        let apiurl = 'v1/live/search';
                        let data = {
                            Page: 1,
                            Name: val
                        };
                        getliveData(apiurl, data).then(res => {
                            this.refreshs = false;
                            this.loadings = false;
                            console.log(res, '!@!@!@!@@!@@搜索数据');
                            this.wenList = this.wenList.concat(res.data);
                            this.total = res.total;
                            this.$refs.scroll.refresh()
                        })

                    } else {
                        this.heids = true
                    }
                }
            },
            handleTouchEnd() {

            },
            //跳转直播页面
            tolivesDetail(item) {
                this.isdetailLive = true;
                this.detailsitem = item;
            },
            //退出直播
            heiddetailLives() {
                this.isdetailLive = false;
                this.detailsitem = {}
            },
            //清除历史搜索
            removeHistory() {
                let arr = [];
                localStorage.setItem('liveHistory', JSON.stringify(arr));
                this.History = [];
                let apiurl = ''
            },
            //点击搜索历史  实现搜索
            togglevalus(name) {
                //改变value 的值
                this.$refs.inputs.values = name;
                this.severvalue(name);

            },
            //历史记录添加
            addList(val) {
                let arr = JSON.parse(localStorage.getItem('liveHistory'));
                arr.unshift(val);

                function newarr(arr) {
                    return Array.from(new Set(arr))
                }

                console.log(arr, 'arr');
                let arrs = newarr(arr);

                console.log(arrs, 'arrs');

                if (arrs.length > 10) {
                    arrs.pop()
                }

                console.log(arrs, 'arrs@@@');
                localStorage.setItem('liveHistory', JSON.stringify(arrs));


                this.History = JSON.parse(localStorage.getItem('liveHistory'))

            },

            goBack() {
                this.$router.push('/livebroadcast')
            },
            severvalue(val) {
                this.values = val;
                this.isflag = false;
                this.refreshs = true;
                this.seacrhList(val)
            },
            //执行搜索
            seacrhList(val) {
                this.addList(val);
                let apiurl = 'v1/live/search';
                let data = {
                    Page: 1,
                    Name: val
                };
                getliveData(apiurl, data).then(res => {

                    this.refreshs = false;
                    this.total = res.total;
                    console.log(res, '!@!@!@!@@!@@搜索数据');
                    if (res.total == 0){
                        this.wenList = [];
                    }else{
                        this.wenList = res.data;
                    }
                })

            }
        }
    }
</script>

<style scoped>
  .search_live {
    width: 100%;
    background: #fff;
    position: fixed;

  }

  .main-content {
    overflow: hidden;
    position: relative;
  }
</style>

<style scoped lang="stylus">
  .shortcut
    overflow hidden


    .hot-key
      padding 0 20px

    .title
      margin-bottom 10px
      font-size 0.65rem
      text-align left
      display flex
      justify-content space-between
      color #000

    .item
      display inline-block
      float left
      padding 0.3rem 0.7rem
      margin 5px 15px 10px 0
      border-radius 15px
      border 1px solid #bababa
      font-size 0.5rem
      color #000
</style>
