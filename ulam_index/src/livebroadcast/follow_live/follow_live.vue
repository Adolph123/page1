<template>
    <div class="follow_live" :style="{height:heights+'px'}">

<!--  头部切换  -->
      <div class="title backcolors">
        <div class="itemtitle" :class="{activeItem:istitle == 1}" @click="taggletitle(1)">关注({{total1}})</div>
        <div class="itemtitle" :class="{activeItem:istitle == 2}"  @click="taggletitle(2)">粉丝({{total}})</div>
        <div class="itemtitle" :class="{activeItem:istitle == 3}"  @click="taggletitle(3)">互相关注({{total2}})</div>
      </div>

      <scroll class="main-content" :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup"  ref="scroll" @scroll="scrollss"
              @scrollToend="scrollToend" :data='list' id="scroll" :style="{height:heights-75+'px'}">
        <!--      粉丝   还是 关注-->
        <div   id="scrollbox"  @touchstart.prevent="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend.prevent="handleTouchEnd">
          <div v-if="refreshs" style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px">
            <i class="el-icon-loading" style="font-size: 16px"></i> 刷新中
          </div>
          <div style="height: 10px;"></div>
          <!--      关注  -->
          <div v-if="istitle == 1">

            <div v-for="(item,index) in list" :key="index" style="padding: 0 20px">
              <div style="display: flex;justify-content: space-between;align-items: center;padding: 10px 0;">
                <div style="display: flex;align-items: center">
                  <img @click="toliveorder(item.Uid)" :src="item.Header" alt=""  style="width: 35px;height: 35px;border-radius: 50%;display: block">
                  <div style="width: 15px;"></div>
                  <div style="line-height: 17px;font-size: 14px">
                    <div>{{item.Nick}}</div>
<!--                    <div>性别</div>-->
                  </div>
                </div>

                <div>
                  <span @click="cancelfollow(item.Uid)" class="btoms">取消关注</span>
                </div>
              </div>
            </div>
          </div>
          <!--    粉丝   -->
          <div v-if="istitle == 2">
            <div v-for="(item,index) in list" :key="index" style="padding: 0 20px">
              <div style="display: flex;justify-content: space-between;align-items: center;padding: 10px 0;">
                <div style="display: flex;align-items: center">
                  <img @click="toliveorder(item.Uid)" :src="item.Header" alt=""  style="width: 35px;height: 35px;border-radius: 50%;display: block">
                  <div style="width: 15px;"></div>
                  <div style="line-height: 17px;font-size: 14px">
                    <div>{{item.Nick}}</div>
<!--                    <div>性别</div>-->
                  </div>
                </div>

                <div>
                  <span @click="myfollow(item.Uid)" class="btoms">回 关</span>
                </div>
              </div>
            </div>
          </div>

          <!--    互相关注   -->
          <div v-if="istitle == 3">
            <div v-for="(item,index) in list" :key="index" style="padding: 0 20px">
              <div style="display: flex;justify-content: space-between;align-items: center;padding: 10px 0;">
                <div style="display: flex;align-items: center">
                  <img @click="toliveorder(item.Uid)" :src="item.Header" alt=""  style="width: 35px;height: 35px;border-radius: 50%;display: block">
                  <div style="width: 15px;"></div>
                  <div style="line-height: 17px;font-size: 14px">
                    <div>{{item.Nick}}</div>
<!--                    <div>性别</div>-->
                  </div>
                </div>

                <div>
                  <span @click="cancelfollow(item.Uid)" class="btoms">取消关注</span>
                </div>
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
          <div style="height: 25px"></div>
        </div>

      </scroll>


      <!-- 底部导航 -->
      <div style="position: fixed;left: 0;bottom: -1px;border-top: 1px solid rgb(247, 244, 244);width: 100%;height: 50px;background: #fff;z-index: 100">
        <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;height: 48px">

          <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/livebroadcast')">
            <img src="@/assets/lives/1_1.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
            <p style="padding-top: 7px">发现</p>
          </div>

          <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/chatLive')">
            <img src="@/assets/lives/2_2.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
            <p style="padding-top: 8px">信息</p>
          </div>

          <div style="width: 25%;text-align: center;font-size: 12px;color: #999;position: relative" @click="$router.push('/addLive')">
            <img src="@/assets/lives/3.png" alt=""
                 style="
               width:98%;height: auto;display: block;margin: -19px auto 0;position: relative;z-index: 1">
          </div>

          <div style="width: 25%;text-align: center;font-size: 12px;color: #9a55ff" >
            <img src="@/assets/lives/4.png" alt="" style="width: 21px;height: auto;display: block;margin: 0 auto">
            <p style="padding-top:7px">关注</p>
          </div>

          <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/myorderLive')">
            <img src="@/assets/lives/5_5.png" alt="" style="width: 19px;height: auto;display: block;margin: 0 auto">
            <p style="padding-top: 7px">我的</p>
          </div>
        </div>

      </div>

      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    </div>
</template>

<script>
  import {getliveData} from '@/api/index';
  import scroll from "../../base/scroll/scroll";
  import {lyricminshow,reminder} from '@/common/js/mixin.js';
    export default {
        name: "follow_live",
        mixins:[lyricminshow,reminder],
        components:{
            scroll,
        },
        data(){
            return{
                heights:0,widths:0,
                istitle:1,//头部 判断
                follow:[],//关注
                fans:[],//粉丝
                list:[],//展示
                total1:0,
                page1:1,
                total2:0,
                page2:1,
                followdoubles:[],
                //下拉刷新
                refreshs:false,
                loadings:false,
                heids:false,
                bodyheights:0,
            }
        },
        created(){
            this.heights = document.documentElement.clientHeight;
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('black')
            }

            this._getfans();
            this._getfollow();
            this.followdouble();
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
            //互相关注
            followdouble(){
                let apiurl = 'v1/live/follow_double';
                let data = {
                    Page:1
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'互相关注');
                    this.total2 = res.total;
                    let reslist = res.data;
                    if(reslist){
                        this.followdoubles = res.data;

                        if (this.istitle == 3){
                            //关注
                            this.list = reslist;
                        }
                    }else {
                        this.list =[];
                        return
                    }


                })
            },
            //滚动监听 上拉加载
            scrollss(pos){
                this.bodyheights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                let apiurl;
                let data;

                if (this.istitle == 1){
                    if((pos.y * -1)+200 >= this.bodyheights-this.scrollheight ){
                        if(this.total1/10 > this.page1){
//关注
                            this.loadings = true;
                            this.Page1+=1;
                            apiurl = 'v1/live/my_follow';
                            data = {
                                Page:this.Page1
                            };
                            getliveData(apiurl,data).then(res=>{
                                this.loadings = false;
                                console.log(res,'关注')
                                this.list  =  this.list .concat(res.data);
                                this.follow  =  this.follow .concat(res.data);
                                this.total = res.total;
                                this.$refs.scroll.refresh()
                            })

                        }else{
                            this.heids = true
                        }
                    }
                }else if(this.istitle == 2){
                    if((pos.y * -1)+200 >= this.bodyheights-this.scrollheight ){
                        if(this.total/10 > this.page){
                            //粉丝
                            this.loadings = true;
                            this.page += 1;
                            apiurl = 'v1/live/follow_me';
                            data = {
                                Page: this.page
                            };
                            getliveData(apiurl,data).then(res=>{
                                this.loadings = false;
                                console.log(res,'粉丝')
                                this.list  =  this.list .concat(res.data);
                                this.fans  =  this.fans .concat(res.data);
                                this.total = res.total;
                                this.$refs.scroll.refresh()
                            })

                        }else{
                            this.heids = true
                        }
                    }
                }else if(this.istitle == 3){
                    if((pos.y * -1)+200 >= this.bodyheights-this.scrollheight ){
                        if(this.total2/10 > this.page2){
                            //互相关注
                            this.loadings = true;
                            this.page2 += 1;
                            apiurl = 'v1/live/follow_me';
                            data = {
                                Id:this. Id,
                                Page: this.page2
                            };
                            getliveData(apiurl,data).then(res=>{
                                this.loadings = false;
                                console.log(res,'粉丝');
                                this.followdoubles = this.followdoubles.concat(res.data);
                                this.list  =  this.list .concat(res.data);
                                this.total2 = res.total;
                                this.$refs.scroll.refresh()
                            })
                        }else{
                            this.heids = true
                        }
                    }
                }

            },

            //划过结束 下拉刷新
            handleTouchEnd(){
                if(this.scrollY > 40){
                    this.refreshs = true;
                    this.page = 1;
                    let user = JSON.parse(localStorage.getItem('user'));
                    if (this.istitle == 1){
                        //关注
                        this._getfollow()
                    }else if(this.istitle == 2){
                        //粉丝
                        this._getfans()
                    }
                }
            },

            //切换
            taggletitle(num){
                this.istitle = num;
                if (this.istitle == 1){
                    //关注
                    this.list = this.follow;
                }else if(this.istitle == 2){
                    //粉丝
                    this.list = this.fans;
                }else if(this.istitle == 3){
                    //粉丝
                    this.list = this.followdoubles;
                }
            },
            //粉丝数据
            _getfans(){
                let apiurl = 'v1/live/follow_me';
                let data = {
                    Page:1
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'粉丝数据');
                    this.total = res.total;
                    let reslist = res.data;
                    if(reslist){
                        this.fans = res.data;
                        if (this.istitle == 2){
                            //关注
                            this.list = reslist
                        }
                    }else {
                        this.list =[]
                        return
                    }


                })
            },

            //关注数据
            _getfollow(){
                let apiurl = 'v1/live/my_follow';
                let data = {
                    Page:1
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'关注数据');
                    this.total1 = res.total;
                    let reslist = res.data;
                    if(reslist){
                        this.follow = reslist;

                        if (this.istitle == 1){
                            //关注
                            this.list = reslist
                        }


                    }else {
                        this.list =[]
                        return
                    }


                })
            },
            //取消关注
            cancelfollow(Id){
                let apiurl = 'v1/live/cancel_follow';
                let data = {
                    Id
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'取消关注')
                    if(res.status == "fail"){
                        this.tagglePrompt(false,'取消关注失败')
                    }else{
                        this.tagglePrompt(true,'取消关注成功')
                    }
                    this._getfans();
                    this._getfollow()
					this.followdouble();
                })
            },
            //关注粉丝
            myfollow(Id){
                let apiurl = 'v1/live/follow';
                let data = {
                    Id
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'取消关注')
                    if(res.status == "fail"){
                        this.tagglePrompt(false,'关注粉丝失败')
                    }else{
                        this.tagglePrompt(true,'关注粉丝成功')
                    }
                    this._getfans();
                    this._getfollow();
                    this.followdouble();
                })
            }
        }
    }
</script>

<style scoped>
  .follow_live{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
  }
  .title{
    display: flex;
    padding: 35px 20px 10px;
    align-items: flex-end;
    justify-content: space-between;
    box-shadow: 1px 1px 2px rgb(165, 165, 165);
  }
  .itemtitle{
    font-size: 12px;
    height: 30px;
    display: flex;
    align-items: flex-end;
    padding: 0 20px;
    color: #e9d9f9;
  }
  .activeItem{
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    padding: 0 20px;
    display: flex;
    align-items: flex-end;
  }
  .main-content{
    position: relative;
    overflow: hidden;
  }
  .btoms{

    display: block;
    height: 24px;
    padding: 0 15px;
    background: rgb(232, 217, 255);
    color: rgb(154, 85, 255);
    font-size: 12px;
    border-radius: 3px;
    line-height: 24px;
  }
</style>
