<template>
    <div>
      <scroll class="main-content" :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup"   @scroll="scrollss"
              @scrollToend="scrollToend" :data='wenList' id="scroll" :style="{height:heights-100+'px'}">
        <div @touchstart.prevent="handleTouchStart"
             @touchmove="handleTouchMove"
             @touchend.prevent="handleTouchEnd" id="scrollbox" style="background: #f5f5f5;">
          <div v-if="searchs" style="display: flex;justify-content: center;align-items: center;background: #fff;height: 50px;line-height: 50px">
            <i class="el-icon-loading"></i>
            <span style="font-size: 12px;color: #999">下拉刷新</span>
          </div>
          <div v-for="(item,index) in wenList" :key="index" @click.prevent="towenDetail(item.id)" style="display: flex;padding: 20px 20px;margin: 0 auto 1px;justify-content: space-between;background: #fff;align-items: center">
            <div style="width: 31%;overflow: hidden;border-radius: 6px">
              <img :src="item.image" alt="" style="display: block;width: 100%;height: 75px;border-radius: 6px">
            </div>
            <div style="width: 66%;height: 75px;position: relative">
              <div class="txt" style="position: absolute;top: 0;width: 100%" >{{item.title}}</div>



              <div style="display: flex;justify-content: space-between;align-items: center;position: absolute;bottom: 0;width: 100%">
                <div class="items">
                  <!--                <img src="@/assets/wen/time.png" alt="" style="width: 14px;height: auto;display: block">-->
                  <!--                <span style="width: 2px"></span>-->
                  <span style="font-size: 12px;color: rgb(167, 167, 167);line-height: 20px">{{item.createdText}}</span>
                </div>


                <div class="items" @click.stop="dianzans(item.id,item.isThumb,index)">
                  <img v-if="item.isThumb" src="@/assets/wen/zan2.png" alt=""   style="width: 14px;height: auto;display: block">
                  <img v-else src="@/assets/wen/zan1.png" alt=""   style="width: 14px;height: auto;display: block">
                  <span style="width: 2px"></span>
                  <span :style="{color:'rgba(170,170,170)' }" style="padding-top: -2px;font-size: 12px">{{item.thumbCount}}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="page >= total/10" style="display: flex;justify-content: center;align-items: center;background: #fff;height: 50px;color: #ccc">
            暂无更多
          </div>

          <div style="height: 30px;background: #fff"></div>
        </div>
      </scroll>
    </div>
</template>

<script>
    import {getdiswenlist} from '@/api/index';
    import scroll from "@/base/scroll/scroll";
    import {lyricminshow} from '@/common/js/mixin.js';
    export default {
        mixins: [lyricminshow],
        name: "wenzhang",
        components:{scroll},
        data(){
            return{
                istoOne:true,
                searchs:false,
                wenList:[],
                issearchs:false,
                searlist:[],
                isflag:false,
                page:1,
                total:0,
                heights:0,
                wenzhanginfoitem:0,
            }
        },
        created(){
            this._getdislist();
            this.heights = document.documentElement.clientHeight;
        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        methods:{
            //划过结束
            handleTouchEnd(){
                console.log(this.scrollY,'this.scrollY')
                if(this.scrollY > 60){
                    this.wenList = [];
                    this.searchs = true;
                    this.istoOne = true;
                    this.page = 1;
                    this._getdislist()
                }
            },
            scrollss(pos){
                let heights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if(this.istoOne == false){
                    if((pos.y * -1)+200 >= heights-this.scrollheight ){
                        if(this.total/10 > this.page){

                            this.addList()
                        }
                    }
                }




            },
            //
            scrollToend() {

                // console.log(this.StartY,'优质产品 加载更多',this.MoveY,this.total/10,' >' ,this.page);

            },
            //加载  上拉
            addList(){
                this.page++;
                this._getdislist()
            },
            dianzans(id,flag){
                this.wenzhanginfoitem = id;
                if(flag == true){  //点过赞
                    this.dianzan1();
                }else{
                    //没点
                    this.dianzan()
                }

            },
            dianzan(){
                console.log('点赞');
                let apiurl = 'v1/art/art-thumb';
                let data = {
                    id : parseInt(this.wenzhanginfoitem),
                    status:1
                };
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'点赞');
                    if(res.status == "success"){
                        this.texts = '文章点赞';
                        this.send=true;
                        this._getshualist(parseInt(this.wenzhanginfoitem));
                    }else {
                        this.send1=true;
                        this.texts = '文章点赞';
                    }

                })
            },
//取消点赞
            dianzan1(){
                console.log('取消点赞')
                let apiurl = 'v1/art/art-cancel-thumb';
                let data = {
                    id : parseInt(this.wenzhanginfoitem),
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'取消点赞');
                    if(res.status == "success"){
                        this.texts = '文章取消点赞';
                        // this.send=true;
                        // this.wenList = [];
                        // this.searchs = true;
                        // this.istoOne = true;
                        this._getshualist(parseInt(this.wenzhanginfoitem));
                    }else {
                        this.send1=true;
                        this.texts = '文章取消点赞';
                    }

                })
            },
            //关闭全屏
            goBack(){
                if(this.isflag == false){
                    this.$emit('tagglefid')
                }

            },
            //详情关闭
            taggledetail(){
                this.isflag = false;
                this._getdislist()
            },
            //文章详情
            _getdislist(){
                let apiurl = 'v1/art/art-find-home';
                let data = {
                    page:this.page
                };
                getdiswenlist(apiurl,data).then(res=>{
                    this.searchs = false;
                    this.istoOne = false;
                    this.wenList = this.wenList.concat(res.data);
                    this.total = res.total;
                    console.log(res,'文章详情')
                })
            },
            _getshualist(id){
                let list = JSON.parse(JSON.stringify(this.wenList));
                list.map(item =>{
                    if(item.id == id){
                        item.isThumb = !item.isThumb
                        if(item.isThumb){
                            item.thumbCount +=1;
                        }else{
                            item.thumbCount -=1;
                        }
                    }
                })
                this.wenList = list;

                this.wenzhanginfoitem = 0
            },



            //打开商品详情
            towenDetail(id){
              this.isflag = false;
               this.$emit('towenzhanginfo',id)
            },
        }
    }
</script>

<style scoped>
  .main-content{
    overflow: hidden;
    position: relative;
    z-index: 300;
  }
  .txt{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: rgb(68, 68, 70);
    font-weight: 400;;
  }
  .items{
    display: flex;
    align-items: center;
    line-height: 30px;
    font-size: 14px;
  }
</style>
