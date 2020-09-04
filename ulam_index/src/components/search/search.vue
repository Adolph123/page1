<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-box-wrapper">
      <search-box ref="inputs" @goBack="goBack" @severvalue='severvalue' :placeholder='placeholder'></search-box>
    </div>
    <!-- 热门关键字展示 -->

    <div class="shortcut-wrapper" v-show="!values">

      <!-- 热门搜索历-->
      <div class="shortcut">
        <div class="hot-key">
          <h2 class="title">
            <span style="">热门搜索</span>
<!--            <span class="clear" @click='removePopular'>-->
<!--                  <i class="icon-clear" style="color: #bababa"></i>-->
<!--              </span>-->
          </h2>
          <ul>
            <li class="item" v-for="(item,index) in Popular" :key="index" @click='togglevalus(item)'>
              {{item}}
            </li>
          </ul>
        </div>
      </div>

      <!-- 搜索历史DOM -->
      <div class="shortcut">
        <div class="hot-key">
          <h2 class="title">
            <span style="">搜索历史</span>
            <span class="clear" @click='removeHistory'>
                  <i class="icon-clear" style="color: #bababa"></i>
              </span>
          </h2>
          <ul>
            <li class="item" v-for="(item,index) in History" :key="index" @click='togglevalus(item)'>
              {{item}}
            </li>
          </ul>
        </div>
      </div>


    </div>


    <!-- 搜索结果展示 -->
    <div class="search-result" v-show="values" ref="result">
      <div style="display: flex;justify-content: space-between;align-items: center;width: 94%;margin:0 auto 0.5rem">
        <div style="display: flex;justify-content: space-between;width: 70%">
          <span @click.stop="sousuo(0)" class="titles" :class="{titlesactive:!istitle}">商品搜索</span>
          <span @click.stop="sousuo(1)" class="titles" :class="{titlesactive:istitle}">店铺搜索</span>
        </div>
        <div style="width: 20%;display: flex;justify-content: flex-end" @click.stop="removevalues"><i
          class="el-icon-circle-close" style="font-size: 18px"></i></div>
      </div>


      <!-- 提示正在缓存 -->
      <div v-show="islistsong">
        <div class="loading-container">
          <loadings title="正在加载"></loadings>
        </div>
      </div>
      <!--    搜索结果为空   -->
      <!--      <div v-else>-->
      <!--        <span v-show="listsong.length<=0" style="text-align: center;">-->
      <!--          <img src="@/assets/images/orders_03.png" alt="" class="praiseimg">-->
      <!--        </span>-->
      <!--      </div>-->

      <scroll class="suggest" :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup" ref="scroll"
              id="scroll"     @scroll="scrollss" @scrollToend="scrollToend" :data='listsong'>
        <div @touchstart.prevent="handleTouchStart"
             @touchmove="handleTouchMove"  id="scrollbox"
             @touchend="handleTouchEnd">

          <!--        没有图片 暂时不展示-->

          <span v-show="iscoupons" style="text-align: center;">
           <img src="@/assets/images/shapCar.png" alt="" class="praiseimg">
        </span>




          <ul v-if="!istitle"  class="suggest-list">
            <li class="suggest-item" v-for=" (todo,index) in listsong" :key="todo.id" @click='Timeselect(todo.id,todo)'>
              <div class="orderimgs">
                <div style="width: 25%">
                  <img v-lazy="todo.image" alt="" class="Processingimages">

                </div>
                <div style="width: 72%;position: relative;">
                  <div class="nametext"><span>{{todo.skuName}}</span></div>
                  <div style="color:#9a55ff;position:absolute;right: 0.3rem;bottom: 0.1rem">
                    <span style="font-size: 0.7rem;color:#9a55ff">&nbsp{{todo.price}}</span><span
                    style="font-size: 12px">ulam</span>
                  </div>

                </div>
              </div>
            </li>
          </ul>

          <div v-else v-for="(item,index) in listsong" :key="index" class="shopbox" style=";"
               @click.prevent="$router.push({path:`/shophome/${item.Id}`})">
            <div>
              <img :src="item.Header" alt="" style="width: 50px;height: 50px;display: block;">
            </div>
            <div>
              <span style="margin-left: 0.6rem;font-size:14px">{{item.Name}}</span>
            </div>
          </div>

          <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
            暂无更多
          </div>

          <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
            <i style="font-size: 28px" class="el-icon-loading"></i>
          </div>


          <div style="height: 38px"></div>
        </div>
      </scroll>
    </div>
    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    <!--    <router-view></router-view>-->
  </div>
</template>

<script>
    import searchBox from '@/base/search-box/searchBox';
    // import suggest from './suggest/suggest';
    import searchlist from '@/base/search-list/searchlist';
    import {getdislist} from '@/api/index'
    import {lyricminshow} from '@/common/js/mixin.js';
    import scroll from '@/base/scroll/scroll'
    import loadings from '@/base/loading/loading'
    import noResult from '@/base/no-result/noResult'

    export default {
        mixins: [lyricminshow],
        components: {searchBox, loadings, searchlist, scroll, noResult},
        data() {
            return {
                istitle: false,
                p: 1,
                pullup: true,
                hasMore: true,
                iscoupons: false,
                placeholder: "商品名",
                islistsong: false,
                Popular: [
                    '大米', '小麦', '玉米', '华为',
                ],
                History: [
                    '大米', '小麦', '玉米', '华为',
                ],
                getheatiry: [



                ],
                values: '',
                zhida: true,
                clearOne: '',
                listsong: []
            }
        },

        computed: {},
        created() {
            // this._getdislist();
            this.History = JSON.parse(localStorage.getItem('History'));

            if (this.$route.query.txt) {
                this.severvalue(this.$route.query.txt);
            }


        },
        methods: {
            sousuo(num) {
                this.istitle = num == 0 ? false : true;


                this.listsong = [];

                this.severvalue(this.values);

            },
            //跳商品详情
            Timeselect(id) {
                console.log(id);
                // if (integral) {
                //     this.$router.push({
                //         path: `/details/${id}`,
                //         query: {
                //             id: 1
                //         }
                //     })
                // } else {
                this.$router.push({
                    path: `/details/${id}`,
                })
                // }
            },
            //划过
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.page = 1;
                    this.empty = false;
                    // this.loading = true;
                    // this.listsong = [];

                }
            }
            ,
            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY,'优质产品 加载更多',this.MoveY);
                if (this.StartY > this.MoveY - 250) {
                    console.log(this.total / 10, '>', this.page, 'this.total / 10 > this.page')
                    if (this.total / 10 > this.page) {
                        this.page += 1;

                        this.btomloading = true;

                        this._getdislist();
                    } else {
                        this.btomloading = false;
                        this.empty = true;
                    }
                }
            }
            ,
            goBack(){
                this.$router.push('/homepage')
            },

            //获取历史搜索信息
            _getdislistHistory() {
                // this.History = JSON.parse(localStorage.getItem('History'));
            },
            //获取热门搜索信息
            _getdislistremen() {

                // this.History = JSON.parse(localStorage.getItem('History'));
            },
            //点击搜索历史  实现搜索
            togglevalus(name) {
                //改变value 的值
                this.$refs.inputs.values = name;
                this.severvalue(name);

            }, //点击搜索历史  实现搜索
            searchHitarty() {

            },
            //退出搜索
            removevalues() {
                this.History = JSON.parse(localStorage.getItem('History'));
                this.values = '';
                this.listsong = [];
                this.page = 1;
                this.$refs.inputs.values = '';

            },
            //清空 热门搜索
            removePopular() {
                this.Popular = [];
                let apiurl = '';
                this.removesongs(apiurl);
            },
            // 清空历史搜索
            removeHistory() {
                let arr = [];
                localStorage.setItem('History',JSON.stringify(arr));
                this.History = [];
                let apiurl = '';
                this.removesongs(apiurl);
            },
            //清空搜索历史 和 热门搜索
            removesongs(apiurl) {
                let data = {};
                // getdislist(apiurl,data).then(res => {
                //     console.log(res,'清空搜索');
                // })
            },
            //分页
            _getdislist() {
                let apiurl = 'v1/shop/goods/search';
                let data = {
                    name: this.values,
                    page: this.page
                };
                getdislist(apiurl, data).then(res => {
                    this.islistsong = false;

                    this.btomloading = false;

                    console.log(res, '搜索信息');
                    let reslist = res.data;
                    if (reslist) {
                        this.listsong = this.listsong.concat(reslist);

                    } else {


                    }

                })
            },

            //点击搜索 获取input的 内容
            severvalue(val) {
                this.islistsong = true;
                this.values = val;
                this.addList(val);


                let apiurl;
                if (!this.istitle) {
                    console.log('商品搜索');
                    apiurl = 'v1/shop/goods/search';
                } else {
                    apiurl = 'v1/shop/store/search';
                    console.log('店铺搜索')
                }


                let data = {
                    name: val,
                    page: 1
                };
                getdislist(apiurl, data).then(res => {
                    this.islistsong = false;
                    console.log(res, '搜索商品信息');
                    let reslist = res.data;

                    if (reslist) {
                        this.iscoupons = false;
                        this.listsong = reslist;
                    } else {
                        this.iscoupons = true;
                        this.listsong = [];
                    }
                    this.total = res.total;
                })
            },
            //历史记录添加
            addList(val) {
                let arr = JSON.parse(localStorage.getItem('History'));
                arr.unshift(val);

                function newarr(arr) {
                    return Array.from(new Set(arr))
                }
                console.log(arr,'arr');
                let arrs = newarr(arr);

                console.log(arrs,'arrs');

                if (arrs.length > 10) {
                    arrs.pop()
                }

                console.log(arrs,'arrs@@@');
                localStorage.setItem('History', JSON.stringify(arrs));
            },
            //点击搜索店铺

        }
    }
</script>

<style scoped lang='stylus'>
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .titles {
    color #000;
    padding-bottom 3px
    font-size 16px
    font-weight 500px
    border-bottom 2px solid #f5f5f5;
    transition all 0.3s
  }

  .titlesactive {
    ont-size 16px
    font-weight 500px
    padding-bottom 3px
    border-bottom 2px solid #9a55ff;
    color #9a55ff;
  }

  .search
    height: 100%
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5

    .search-box-wrapper
      margin 0

    .shortcut-wrapper
      position absolute
      top 80px
      bottom 0
      width 100%

      .list-scroll
        width 100%
        position relative
        left 0%
        top 0
        overflow hidden
        margin-bottom 3vh

        .title
          display flex
          align-items center
          padding 0.3rem 0.6rem
          font-size 0.65rem

          .text
            flex 1
            font-size 0.75rem
            font-weight 600
            color #000
            text-align left

          .clear
            extend-click()

            .icon-clear
              font-size 0.75rem
              color #000

        .search-history-scroll
          width 100%

      .shortcut
        overflow hidden


        .hot-key
          margin 0.5rem 0
          padding 0 0.6rem

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

    .search-result
      font-size 0.65rem
      position fixed
      width 100%
      top 80px
      bottom 0

  .suggest
    height 93%
    overflow hidden
    width 94%
    margin 0 auto
    .shopbox
      display flex
      padding 0.3rem 0
      margin 0 auto 10px
      border-radius 6px
      background #fff
      align-items center
      font-size 0.5rem
      position: relative;

  .suggest-list
    width 100%
    .suggest-item
      display flex
      justify-content space-between
      margin-bottom 8px
      text-align left
      font-size 0.5rem
      line-height 1rem
      background #fff
      .orderimgs
        width 100%
        display flex
        justify-content space-between
        margin 0 auto

        .ordername
          position: relative;

        .nametext
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-bottom 1rem

        .images
          width 22vw
          height auto
          display block

        .Processingimages
          width 22vw
          height auto
          display block

  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)

    .loading-container
      position absolute
      width 100%
      top 15%
      transform translateY(-50%)

  .praiseimg {
    display block
    width 100%
    height auto
    margin 0 auto
    margin-top 7vh
  }
</style>
