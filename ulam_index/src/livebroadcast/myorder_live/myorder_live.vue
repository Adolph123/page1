<template>
    <div class="myorder_live"
         :style="{height:heights+'px'}">


      <div style="position: fixed;z-index: 10;width: 100%;background: #3f0082"
           :style="{height:heights-220+'px',}">
        <div @click="addimages" style="position: absolute;opacity: 0;z-index: 1000;width:100%;height:100px" >
          <upImage ref="upImage" @addshopImage="addshopImage"></upImage>
        </div>
        <img :src="images" alt="" style="width: 100%;height: auto;display: block">
      </div>

      <!--    顶部返回-->
      <div v-if="scrollY*-1 > 170" class="backcolors" style="position: fixed;width: 100%;left: 0;top:0;z-index: 101">
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100" @click="backs">
            <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
          </div>
          <div style="height: 30px;">
          </div>
          <div style="position: absolute;width: 100%;left: 0;">
            <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
              <span style="font-size: 16px;color: #fff">{{userIetm.Nick}}</span>
            </div>
          </div>

        </div>
      </div>

  <scroll class="main-content"  :listenScroll="listenScroll" :probeType="probeType" :pullup="pullup"  ref="scroll" @scroll="scrollss"
          @scrollToend="scrollToend" :data='listVideo' :style="{height:heights+'px'}" id="scroll">
    <div  id="scrollbox"  @touchstart.prevent="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend.prevent="handleTouchEnd">
      <div style="height:16vh;" @click="addimages" >
        <div  style="font-size: 12px;height: 60px;display: flex;align-items: flex-end;justify-content: flex-end;color: #ccc;padding: 0 20px 15px;position: relative;">
<!--          <span v-if=" images == '' ">点击添加背景图</span>-->

        </div>
      </div>


      <div v-if="refreshs" style="display: flex;justify-content: center;align-items: center;height: 45px;font-size: 14px;color: #fff">
        <i class="el-icon-loading" style="font-size: 16px"></i> 刷新中
      </div>



<!--      <div style="height: 30px;"></div>-->
      <div style="padding: 0 15px;background: #fff">
        <!--        个人资料-->
        <div >
          <div style="position: relative;display: flex;padding: 0 15px">
            <img :src="userIetm.Header" alt="" style="border-radius: 50%;display: block;position: absolute;width: 70px;height: 70px;top: -30px;background: #fff;padding: 5px;">
            <div @click="$router.push('/midataLive')"
                 style="position: absolute; left: 33%;top: 10px;font-size: 12px;
                     height: 30px;background:rgb(232,217,255);border-radius: 3px;color: #9a55ff;width:46%;line-height: 30px;text-align: center">
              编辑资料 10%
            </div>
<!--   addshopImage('202008141597376131757614342.jpg','http://39.98.249.37:5006/api/file/live/image/202008141597376131757614342.jpg')     -->
            <div @click=""
                 style="position: absolute; right: 0%;top: 10px;font-size: 12px;
                     height: 30px;background:rgb(232,217,255);border-radius: 3px;color: #9a55ff;width: 20%;line-height: 30px;text-align: center">
              +好友
            </div>


          </div>


          <div style="height: 60px;background: #fff"></div>
          <div>
            <div style="font-size: 16px;font-weight: 600;display: flex;justify-content: space-between">
              <span>{{userIetm.Nick}}</span>
              <span style="position: relative; display:none;">
<!--                设置背景-->
                <div style="position: absolute;left: 0;top:0;opacity: 0">
                  <upImage @addshopImage="addshopImage"></upImage>
                </div>
              </span>
            </div>
            <div style="font-size: 12px;color: rgb(125, 125, 125);margin: 4px 0 20px">ID:{{userIetm.Id}}</div>
            <div @click="$router.push('/midataLive')" style="font-size: 13px">{{userIetm.Abstract?userIetm.Abstract:'您还没有填写个人简介，点击添加...'}}</div>
          </div>
          <div style="height: 15px"></div>
          <div style="display: flex;color: rgb(197, 197, 197)">
            <div v-if="userIetm.Birthday" style="font-size: 10px;height: 20px;background:rgb(243, 243, 243);line-height: 20px;text-align: center;padding: 0 4px">{{userIetm.Birthday}}</div>
            <p style="width: 2px;"></p>
            <div v-if="userIetm.Area" style="font-size: 10px;height: 20px;background:rgb(243, 243, 243);line-height: 20px;text-align: center;padding: 0 4px">{{userIetm.Area.length>7?userIetm.Area.substr(0,5)+'...':userIetm.Area}}</div>
            <p style="width: 2px;"></p>
            <div v-if="userIetm.School" style="font-size: 10px;height: 20px;background:rgb(243, 243, 243);line-height: 20px;text-align: center;padding: 0 4px">{{userIetm.School.length>7?userIetm.School.substr(0,5)+'...':userIetm.School}}</div>
          </div>

          <div style="height: 15px"></div>
          <div  style="display: flex;;font-size:12px ">
            <div @click="tomyFollowLive(1)"><span style="font-weight: 600">{{userIetm.Follow}}</span><span style="color: rgb(125, 125, 125)">关注</span></div>
            <p style="width: 10px;"></p>
            <div @click="tomyFollowLive(2)"> <span style="font-weight: 600">{{userIetm.Fans}}</span><span style="color: rgb(125, 125, 125)">粉丝</span>  </div>
            <p style="width: 10px;"></p>
            <div @click="$router.push({path:'/recordLive',query:{num:userIetm.Receive}})"> <span style="font-weight: 600">{{userIetm.Receive}}</span><span style="color: rgb(125, 125, 125)">打赏</span></div>
            <p style="width: 10px;"></p>
            <div> <span style="font-weight: 600">{{userIetm.Friend}}</span><span style="color: rgb(125, 125, 125)">好友</span></div>
          </div>
        </div>


        <!--          直播回放  -->
        <div >
          <div style="height: 25px"></div>
          <div style="font-size: 14px;position: relative">
            直播回放
            <p style="width: 60px;height: 2px;background: rgb(154, 85, 255);margin-top: 6px"></p>
          </div>


          <div style="background: #fff;min-height: 30vh">
            <div style="height: 15px"></div>
            <div v-if="listVideo.length >0" style="font-size: 0">
              <div v-for="(item,index) in listVideo" :key="index"  @click="tolivesDetail(item)"
                   style="position: relative;display: inline-block;" :style="{width:widths*49-15+'px',marginLeft: (index+1)%2 ==0?2*widths+'px':'0',marginBottom:2*widths+'px'}">
                <div> <img  v-lazy="item.Image" alt=""
                           style="width: 100%;height: auto;display: block;border-radius: 6px;margin: 0 auto"></div>

                <div style="font-size:12px;position: absolute;bottom: 0px;width: 100%;color: #fff;background: rgba(0,0,0,0.4)">
                  <div style="display: flex;color: #fff;padding: 6px 15px;align-items: center;">
                    <img src="@/assets/lives/l14.png" alt="" style="width: 12px;height: auto;display: block;">
                    <div style="width: 5px;"></div>
                    <span>{{item.Count}}</span>
                  </div>
                </div>
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

      </div>



      <div style="height: 70px;background:#fff"></div>
    </div>
  </scroll>


  <!--  直播详情  -->
  <div  v-if="isdetailLive" style="position: fixed;left: 0;top:0;width: 100%;z-index: 110">
    <detailLive :detailsitem="detailsitem" @heiddetailLives="heiddetailLives"></detailLive>
  </div>


  <!-- 底部导航 -->
  <div style="position: fixed;left: 0;bottom: -1px;border-top: 1px solid rgb(247, 244, 244);width: 100%;height: 50px;background: #fff;z-index: 100">
    <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;height: 48px">

      <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/livebroadcast')" >
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

      <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/followLive')">
        <img src="@/assets/lives/4_4.png" alt="" style="width: 21px;height: auto;display: block;margin: 0 auto">
        <p style="padding-top:7px">关注</p>
      </div>

      <div style="width: 25%;text-align: center;font-size: 12px;color: #9a55ff" >
        <img src="@/assets/lives/5.png" alt="" style="width: 19px;height: auto;display: block;margin: 0 auto">
        <p style="padding-top: 7px">我的</p>
      </div>
    </div>

  </div>

</div>
</template>

<script>
    import {getliveData} from '@/api/index';
    import detailLive from '../detail_live/detail_live'
    import scroll from "../../base/scroll/scroll";
    import {lyricminshow,} from '@/common/js/mixin.js';
    import upImage from './upImage/upImage';
    export default {
        name: "myorder_live",
        mixins:[lyricminshow],
        components:{
            scroll,detailLive,upImage
        },
        data(){
            return{
                heights:0,widths:0,
                userIetm:{},
                listVideo:[],
                isdetailLive:false,
                detailsitem:'',
                //下拉刷新
                refreshs:false,
                loadings:false,
                heids:false,
                bodyheights:0,
                images:'',
            }
        },
        created(){
            this.heights = document.documentElement.clientHeight;
            this.widths = document.documentElement.clientWidth/100;



            let str = localStorage.getItem('backImage');
            this.images = str;

            if(window.plus){
                window.plus.navigator.setStatusBarStyle('white')
            }
            let user = JSON.parse(localStorage.getItem('user'));

            if(user){
                //信息
                this.getlivevideo(parseInt(user.hu));

                //直播回放
                this.liverecord(parseInt(user.hu));

            }
        },
        methods:{
            addimages(){
                this.$refs.upImage.xuanqu1();
            },
            //上传图片
            addshopImage(img, str) {
                console.log(img, '?????');
                // this.liveImage = img.name;
                this.images = str;

                localStorage.setItem('backImage',str);




                let apiurl = 'v1/live/user_edit';
                let data = {Background:img.name};
                getliveData(apiurl, data).then(res => {
                    console.log(JSON.stringify(res),'!!!!!!!!!!!!!!!!!!!!!!');
                })


            },
            //返回
            backs(){
              this.$router.push('/livebroadcast')
            },
            //跳转关注 粉丝
            tomyFollowLive(id){
                let user = JSON.parse(localStorage.getItem('user'));
                this.$router.push({
                    path:'/myFollowLive',
                    query:{
                        id,
                        num:parseInt(user.hu)
                    }
                })
            },
            //滚动监听 上拉加载
            scrollss(pos){
                this.bodyheights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if((pos.y * -1)+200 >= this.bodyheights-this.scrollheight ){
                    if(this.total/10 > this.page){
                        this.page += 1;
                        this.loadings = true;
                        let user = JSON.parse(localStorage.getItem('user'));
                        let apiurl = 'v1/live/live-record';
                        let data = {
                            Page:this.page,Id:parseInt(user.hu)
                        };
                        getliveData(apiurl,data).then(res=>{
                            this.loadings = false;
                            console.log(res,'请求直播数据')
                            this.listVideo  =  this.listVideo .concat(res.data);
                            this.total = res.total;
                            this.$refs.scroll.refresh()
                        })
                    }else{
                        this.heids = true
                    }
                }
            },

            //划过结束 下拉刷新
            handleTouchEnd(){
                if(this.scrollY > 40){
                    this.refreshs = true;
                    this.page = 1;
                    let user = JSON.parse(localStorage.getItem('user'));
                    this.getlivevideo(parseInt(user.hu));
                    this.liverecord(parseInt(user.hu))
                    let str = localStorage.getItem('backImage');
                    this.images = str;
                }
            },


            //信息
            getlivevideo(Id){
                let apiurl = 'v1/live/MCInfo';
                let data = {Id};
                getliveData(apiurl, data).then(res => {
                    console.log(JSON.stringify(res), '信息');
                    this.userIetm = res.data;
                    // this.images = res.data.Background
                })
            },
            //直播回放
            liverecord(Id){
                let apiurl = 'v1/live/live-record';
                let data = {Id, Page:1};
                getliveData(apiurl, data).then(res => {
                    this.refreshs = false;
                    console.log(res, '直播回放');
                    let reslist = res.data;
                    if(reslist){
                        this.listVideo = reslist;
                    }else{
                        return
                    }

                })
            },
            //跳转直播页面
            tolivesDetail(item){
                this.isdetailLive = true;
                this.detailsitem = item;
            },
            //退出直播
            heiddetailLives(){
                this.isdetailLive = false;
                this.detailsitem = {}
            },
        }
    }
</script>

<style scoped>
  .myorder_live{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background:#fff;
  }
  .main-content{
    position: absolute;
    overflow: hidden;
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    /*background: #fff;*/
  }
</style>
