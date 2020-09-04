<template>
  <div class="submenu">
    <Details v-if="isDetails" :homepageskuid="homepageskuid" @showDetails="showDetails"></Details>
    <!--    药品页-->
    <div style="padding-bottom: 0.2rem;">
      <!-- 搜索框 -->
      <!-- 搜索框 -->
      <div class="search-box-wrapper">
        <div class="warp">
          <img  src="@/assets/back.png" alt="" style="width: 3vw;height: auto;" @click="goBack">

          <div class="search-box">
            <img src="@/assets/icon/商城_11.png" alt="" style="width: 6.5vw;margin-top: -1px;">
            <input type="text" ref="ttextarea" class="box"  @click="$router.push('/search')"
                   placeholder="商品名">
          </div>
          <span class="ic-size"  @click="$router.push('/search')">搜索</span>

        </div>
      </div>
      <!--    title-->
      <div>
        <ul class="tab">
          <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}" @click="tagglelist(index)">
            <span>
              {{item.name}}
              <span v-if="index == 3">
                <i class="el-icon-caret-top three" style="top: 15%" :style="{color:item.isflag && item.ispice? '#9a55ff':' #bababa'}" ></i>
                <i class="el-icon-caret-bottom three" :style="{color:item.isflag && !item.ispice? '#9a55ff':' #bababa'}" ></i>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>


    <!--    详细内容-->
    <Scroll class="main-content" :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
            id="scroll"    @scrollToend="scrollToend" :data='contentList'>
      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"   id="scrollbox"
           @touchend="handleTouchEnd" style="width: 96%;margin: 0 auto">


         <span v-show="contentList.length<=0" style="text-align: center;">
          <img src="@/assets/images/shapCar.png" alt="" class="praiseimg">
        </span>

        <div v-show="loading" style="text-align: center;padding: 5px 0;transition: all 0.5s;font-size: 14px">
          <i style="font-size: 16px" class="el-icon-loading" ></i><span>下拉刷新</span>
        </div>

        <Song :songarr="contentList"  @toDetails="toDetails"></Song>

        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>


        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
          <i style="font-size: 28px" class="el-icon-loading" ></i>
        </div>

        <div style="height: 40px"></div>

      </div>
    </Scroll>
  </div>
</template>

<script>
    import searchBox from '@/base/search-box/searchBox';
    import Song from "@/base/song/song";
    import {getdislist} from '@/api/index';
    import Details from '@/base/coDetail';
    import Scroll from "@/base/scroll/scroll";
    import {lyricminshow,SearchHistory} from '@/common/js/mixin.js';
    export default {
        name: "submentus",
        mixins: [lyricminshow,SearchHistory],
        components:{
            searchBox,Song,Scroll,Details
        },
        created(){
            console.log(this.$route.query.id,'submenu');

            this._getdislist(this.$route.query.id,0);

        },
        data(){
            return{
                titleindex:0,
                placeholder:"商品名",
                titlelist:[
                    {
                        name:'综合',
                        sort:'all',
                        id:1,
                        isflag:true,
                    },
                    {
                        name:'销量',
                        sort:'sale_count',
                        id:1,
                        isflag:false,
                    },{
                        name:'好评',
                        sort:'all',
                        id:1,
                        isflag:false,
                    },{
                        name:'价格',
                        sort:'price ',
                        id:1,
                        isflag:false,
                        ispice:false
                    },
                ],
                contentList:[],
                integral:this.$route.query.id?true:false
            }
        },
        methods:{
            goBack() {
                console.log('@@@@@@')
                this.$router.push('/homepage')
            },
            toDetails(id){
                this.$router.push({
                    path:`/details/${id}`
                })
            },
            //划过结束
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.loading = true;
                    this.empty = false;
                    this.page = 1;
                    this.contentList = [];
                    this._getdislist(parseInt(this.$route.params.id),this.titleindex)
                }
            },
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
                            this._getdislist()
                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }
            },
            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY, '优质产品 加载更多', this.MoveY, this.total / 10, this.page);
                // if (this.StartY > this.MoveY - 250) {
                //
                //     if (this.total / 10 > this.page) {
                //         this.btomloading = true;
                //         this.page += 1;
                //         this._getdislist();
                //     } else {
                //         this.btomloading = false;
                //         this.empty = true;
                //     }
                // }
            },

            tagglelist(index){

                if (this.$refs.scroll){
                    this.$refs.scroll.scrollTop();
                }

                this.isscrollflag = false

                if(index == 3){
                    this.titlelist[index].ispice = !this.titlelist[index].ispice;
                }
                this.titlelist.map(item=>{
                    item.isflag = false;
                })
                this.contentList = [];

                this.titleindex = index;
                this.titlelist[index].isflag = true;
                this._getdislist(this.$route.query.id,index)
            },
            //请求数据
            _getdislist(cid,index){
                console.log(index,'二级')
                let sort;
                switch (index) {
                    case 0:
                        sort= 'all';
                        break;
                    case 1:
                        sort= 'sale_count';
                        break;
                    case 2:
                        sort= 'position';
                        break;
                    case 3:
                        sort= 'price';
                        break;
                        break;
                    default:
                        break;
                }

                console.log(this.$route.query.id ? 'true' :'false','ssssssssssssssss')
                let apiurl = 'v1/shop/goods/find-home-by-category';
                let data={
                    cids:JSON.parse(this.$route.query.id),//标题ID
                    page:this.page,//页数
                    sort, //price 价格，sale_count 销量 score 积分 position位置  all 全部'
                    "desc":this.titlelist[3].ispice? 0:1,//价格Paiute  1 从高到低  0 从高到底
                }
                getdislist(apiurl,data).then(res => {
                    console.log(res,'数据');
                    let resList = res.data;

                    this.loading = false;
                    this.btomloading = false;

                    this.total = res.total;
                    if(resList){
                        this.contentList = this.contentList.concat(resList) ;
                    }else {
                        this.empty =false;
                        this.contentList = [];
                    }

                })
            },


        }
    }
</script>

<style scoped lang="stylus">
  .submenu
    width 100vw
    height 100vh
    position: absolute;
    font-size 0.5rem
    z-index 10000
    background #f5f5f5

  .warp
    display flex
    align-items center
    justify-content space-between
    padding 37px 0 1%
    width 94%
    height 35px
    margin 0 auto

    img
      display block
      height auto

  .icon-back
    font-size $font-size-medium
    color #000
    line-height 5vh
    padding 0 0.5rem

  .search-box
    display flex
    align-items center
    box-sizing border-box
    font-size 0.5rem
    width 70%
    padding 10px
    height 30px
    background #fff
    border-radius 20px

    .icon-search
      font-size 24px
      color #999

    .box
      margin 0 5px
      width 65%
      outline none
      background #fff
      color #999
      font-size 14px

      font-size
      &:：placeholder
        color $color-text-d

  .ic-size
    font-size 15px
    line-height: 5vh;
    padding-right 0.3

  .btoms {
    display: block;
    margin: 0 auto;
    text-align: center;
    background: #1da794;
    font-size: 16px;
    line-height: 30px;
    color: #fff;
    border-radius: 6px;
    width: 85%;
    padding: 2px 0;
  }

  .main-content
    height: 83vh;
    overflow: hidden;
    position: relative;

  .tab
    width 92%
    height: 30px
    line-height: 30px
    font-size 0.65rem
    margin 0 auto
    display flex
    justify-content space-around

    .tab-item
      text-align: center
      color #000
      display block
      position relative

      .three
        position absolute;
        top 44%
        right -15px
        color #bababa
        font-size 12px

    .tablink
      color: #1da794;
      border-bottom: 3px solid #1da794;

  .praiseimg {
    display block
    width 50vw
    height auto
    margin 0 auto
    margin-top 8vh
  }
</style>
