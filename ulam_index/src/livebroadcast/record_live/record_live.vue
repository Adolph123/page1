<template>
<!--    打赏记录    -->
    <div class="record_live" :style="{height:heights+'px'}">
      <!--    顶部返回-->
      <div class="backcolors" >
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100" @click="backs">
            <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
          </div>
          <div style="height: 30px;">
          </div>
          <div style="position: absolute;width: 100%;left: 0;">
            <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
              <span style="font-size: 16px;color: #fff">收到打赏{{money}}ulam</span>
            </div>
          </div>

        </div>
      </div>

      <scroll class="main-content"  :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup"  ref="scroll" @scroll="scrollss"
              @scrollToend="scrollToend" :data='list' id="scroll" :style="{height:heights-64+'px'}">
        <div id="scrollbox"  @touchstart.prevent="handleTouchStart"
             @touchmove="handleTouchMove"
             @touchend.prevent="handleTouchEnd">
<!--           下拉刷新           -->
          <div v-if="refreshs" style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px">
            <i class="el-icon-loading" style="font-size: 16px"></i> 刷新中
          </div>
<!--          记录列表    -->
          <div style="padding: 0 20px" v-if="list.length > 0">
            <div v-for="( item, index ) in list" :key="index" style="display: flex;justify-content: space-between;border-bottom: 0.5px solid #f5f5f5;padding: 15px 0;align-items: center">
              <div style="display: flex;align-items: center">
                <img @click="toliveorder(item.Uid)" :src="item.Header" alt=""  style="width: 32px;height: 32px;border-radius: 50%;display: block">
                <div style="width: 5px;"></div>
                <div style="font-size: 14px">{{item.Nick}}</div>
                <div style="width: 5px;"></div>
<!--                <div style="font-size: 12px"> 性别</div>-->
              </div>
              <div style="font-size: 14px">
                <span style="color:#ccc;">给他打赏</span><span style="color:#3f0082;">&nbsp;{{item.Amount}}ulam</span>
              </div>
            </div>
          </div>


          <div v-if="loadings" style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px">
            <i class="el-icon-loading" style="font-size: 16px"></i> 加载中
          </div>
          <!--          没有了     -->
          <div v-if="heids" style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px;color: #ccc;margin-top: 30px">
            暂无更多
          </div>

          <div style="height: 30px"></div>
        </div>
      </scroll>

    </div>
</template>

<script>
  import {getliveData} from '@/api/index';
  import scroll from "../../base/scroll/scroll";
  import {lyricminshow,} from '@/common/js/mixin.js';
    export default {
        mixins:[lyricminshow],
        name: "record_live",
        components:{
            scroll,
        },
        data(){
            return{
                heights:0,
                list:[],//展示
                total1:0,
                page1:1,
                //下拉刷新
                refreshs:false,
                loadings:false,
                heids:false,
                bodyheights:0,
                money:0,
            }
        },
        created(){
            this.heights = document.documentElement.clientHeight;
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('black')
            }

            console.log(this.$route.query.id)

            if(this.$route.query.id){
                //某场直播的记录
                this._getrecordLives(this.$route.query.id);//请求打赏记录
                this._getrecordgiftotal(this.$route.query.id);//请求打赏记录
                // http://39.98.249.37:5006/api/v1/live/gift-total
                // {"Name":"u1"}
            }else{
                //所有的记录
                this._getrecordLive();//请求打赏记录
                this.money = parseInt(this.$route.query.num)
            }

        },
        methods:{
            //跳转个人主页
            toliveorder(id){
                this.$router.push({
                    path:'/liveorder',
                    query:{
                        id
                    }
                })
            },


            //返回
            backs(){
              this.$router.go(-1)
            },
            //请求打赏记录
            _getrecordLive(){

                let apiurl = 'v1/live/gift-record';
                let data = {
                    Page:1
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'打赏记录');
                    let reslist = res.data;
                    if (reslist){
                        this.list = reslist
                    }else {
                        return
                    }
                    this.total = res.total;
                })
            },
            //一场直播的记录
            _getrecordLives(Name){

                let apiurl = 'v1/live/gift-list';
                let data = {
                    Page:1,
                    Name
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'打赏记录');
                    let reslist = res.data;
                    if (reslist){
                        this.list = reslist
                    }else {
                        return
                    }
                    this.total = res.total;
                })
            },

            _getrecordgiftotal(Name){
                let apiurl = 'v1/live/gift-total';
                let data = {
                    Name
                };
                getliveData(apiurl,data).then(res=>{
                      console.log(res,'!!!!!!!!!!!!');
                      this.money = res.data.Total;
                })
            },


            //滚动监听 上拉加载
            scrollss(pos){
                this.bodyheights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;

                if((pos.y * -1)+200 >= this.bodyheights-this.scrollheight ){
                    if(this.total/10 > this.page) {
                        this.page += 1;
                        this.loadings = true;

                        let apiurl = 'v1/live/gift-record';
                        let data = {
                            Page: 1
                        };
                        getliveData(apiurl, data).then(res => {
                            this.loadings = false;
                            console.log(res, '打赏记录');
                            let reslist = res.data;
                            if (reslist) {
                                this.list = this.list.concat(reslist);
                                this.$refs.scroll.refresh()
                            } else {
                                this.heids = true
                                return
                            }
                            this.total = res.total;
                        })
                    }
                }
            },

            //划过结束 下拉刷新
            handleTouchEnd(){
                if(this.scrollY > 40){
                    this.refreshs = true;
                    this.page = 1;
                    this._getrecordLive()
                }
            },
        }
    }
</script>

<style scoped>
  .record_live{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
  }
  .main-content{
    width: 100%;
    overflow: hidden;
    position: relative;
  }
</style>
