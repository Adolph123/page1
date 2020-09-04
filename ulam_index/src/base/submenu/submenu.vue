<template>
  <div class="submenu">
    <Details v-if="isDetails" :homepageskuid="homepageskuid" @showDetails="showDetails"></Details>
<!--    药品页-->
    <div style="padding-bottom: 0.2rem;">
      <!-- 搜索框 -->
      <router-link to="/search" tag="div" class="search-box-wrapper">
        <search-box ref="inputs"  :placeholder="placeholder" ></search-box>
      </router-link>
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
            id="scroll"     @scrollToend="scrollToend" :data='contentList'>
      <div  @touchstart.prevent="handleTouchStart"
            @touchmove="handleTouchMove"  id="scrollbox"
            @touchend="handleTouchEnd" style="width: 96%;margin: 0 auto">
        <!--        没有图片 暂时不展示-->
        <span v-show="contentList.length<=0" style="text-align: center;">
          <img src="@/assets/images/shapCar.png" alt="" class="praiseimg">
        </span>

        <div v-show="loading" style="text-align: center;padding: 5px 0;transition: all 0.5s;font-size: 14px">
          <i style="font-size: 16px" class="el-icon-loading" ></i><span>下拉刷新</span>
        </div>


        <Song :songarr="contentList" :integral="integral"  @toDetails="toDetails"></Song>

        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>

        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
          <i style="font-size: 28px" class="el-icon-loading" ></i>
        </div>

        <div style="height: 40px">

        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
    import searchBox from '@/base/search-box/searchBox';
    import Song from "@/base/song/song";
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll";
    import Details from '@/base/coDetail';
    import {lyricminshow,SearchHistory} from '@/common/js/mixin.js';
    export default {
        mixins: [lyricminshow,SearchHistory],
        name: "submenu",
        components:{
            searchBox,Song,Scroll,Details
        },
        created(){
            console.log(this.$route.query.str,'submenu');

            this._getdislist(parseInt(this.$route.params.id),0);

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

            //划过结束
            handleTouchEnd() {
                console.log('@@@', this.scrollY, '>', 15 && this.StartY, '<', this.MoveY - 15)
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    this.loading = true;
                    this.empty = false;
                    this.page = 1;
                    this.contentList = [];
                    this._getdislist(parseInt(this.$route.params.id),this.titleindex)
                    // this._getdislist()
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
                this.titleindex = index;
                this.titlelist[index].isflag = true;
                this.contentList = [];
                this._getdislist(parseInt(this.$route.params.id),index)
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

                let apiurl = 'v1/shop/goods/find-goods-condition';
                let data={
                    cid:this.$route.query.id ?0:cid,//标题ID
                    "page":1,//页数
                    sort, //price 价格，sale_count 销量 score 积分 position位置  all 全部'
                    "desc":this.titlelist[3].ispice? 0:1,//价格Paiute  1 从高到低  0 从高到底
                    isScore:this.$route.query.id ?1:0,//是否是积分
                }
                getdislist(apiurl,data).then(res => {

                    console.log(res,'数据');
                    let resList = res.data;

                    this.loading = false;
                    this.btomloading = false;
                    this.isscrollflag = true;

                    this.total = res.total;
                    if(resList){
                        this.contentList = this.contentList.concat(resList) ;
                    }else {
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
    .main-content
      height: 83vh;
      overflow: hidden;
      position: relative;
    .tab
      width 92%
      height :30px
      line-height :30px
      font-size 0.65rem
      margin 0 auto
      display flex
      justify-content space-around
      .tab-item
        text-align :center
        color #000
        display block
        position relative
        .three
          position absolute;
          top 38%
          right -15px
          color #bababa
          font-size 0.4rem
      .tablink
        color:#9a55ff;
        border-bottom : 3px solid #9a55ff;
  .praiseimg{
      display block
      width 100vw
      height auto
      margin 0 auto
      margin-top 8vh
  }
</style>
