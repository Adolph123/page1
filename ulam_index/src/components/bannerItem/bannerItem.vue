<template>
  <div>

    <div class="el-page-header">
      <div class="el-page-header__title" @click="goBack">
        <img src="@/assets/2_03.png" alt="" style="width: 8vw" >
      </div>
      <div class="el-page-header__content">
        <div style="display: flex;justify-content: center;font-size: 0.8rem">
          <span> </span>
        </div>
      </div>
    </div>

<!--    <div class="videoControll">-->
<!--<div style="height: 100px"></div>-->
<!--      <div class="vcTop">-->
<!--        &lt;!&ndash; 播放按钮 &ndash;&gt;-->
<!--        <div class="vcPlayBtn" @click="videoPlay()">{{vcIsPlay?'stop':'play'}}</div>-->
<!--        &lt;!&ndash; 播放时间 &ndash;&gt;-->
<!--        <div class="vcPlayTime">{{vcCurrentTime}}/{{vcTotalTime}}</div>-->
<!--        &lt;!&ndash; 全屏 &ndash;&gt;-->
<!--        <div class="vcFullBtn" @click="showFullScreen()">全屏</div>-->
<!--      </div>-->
<!--      <div class="vcBottom">-->
<!--        &lt;!&ndash; 进度 &ndash;&gt;-->
<!--        <input type="range"  min="0" max="100" class="videoProgress" v-model="vcProgress" :style="{backgroundSize:+ vcProgress*100/100 +'% 100%'}"/>-->
<!--      </div>-->
<!--    </div>-->


    <scroll  class="main-content" >
      <div>
        <div v-if="text" v-html='text' :style="{height:height+'px'}"></div>
        <div v-if="!istext">
          <!--          图片区域-->
          <div >
            <div v-for="(item,index) in image" :key="index">
              <img :src="item" alt="" class="images">
            </div>
          </div>
          <!--          音频区域-->
          <div >
            <div v-for="(item,index) in audio" :key="index" @click="audiopaly = index"
                 style='width: 100%;background-size: 100% 100%;height: 230px;position: relative;margin-bottom: 10px'
                 :style="{background:`url(${item.image}) no-repeat 0 0`}">
              <div style="position: absolute;bottom: 5px;width: 90%;left: 5%;border-radius: 20px;overflow: hidden;">
                <audio :src="item.audio" controls  :autoplay="index == audiopaly" name="media" controlsList="nodownload"
                       class="audios"></audio>
              </div>
            </div>
          </div>
          <!--          视频区域-->
          <div >
            <div v-for="(item,index) in vedio" :key="index" @click="vediopaly = index">
              <video :poster="item.image" v-if="item" controls="" :pause="index == vediopaly" :autoplay="index == vediopaly" name="media"
                     class="videos" controlsList="nodownload">
                <source :src="item.video" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      </div>

    </scroll>
  </div>
</template>

<script>
    import {getdislist} from '@/api/index';
    import Pageheader from "@/base/pageheade/pageheader";
    import scroll from "@/base/scroll/scroll";

    export default {
        name: "bannerItem",
        components: {
            Pageheader, scroll
        },
        data() {
            return {
                text:'',
                istext:true,
                htmltop:0,
                height:0,
                audio: [],
                image: [],
                vedio: [],
                dvdtu: '',
                urlimg: '@/assets/newpage/bg1.png',
                audiopaly: 0,
                vediopaly: 0,
                vcCurrentTime:'00:00',//当前进度
                vcTotalTime:'00:00',//总时长
                vcIsPlay:false,//video是否播放
                vcProgress:0,//video进度
                vcIsFull:false,//是否全屏
            }
        },
        created() {
            this._getdislist()
        },
        mounted(){
            setTimeout(()=>{

            },1000)
        },
        methods: {
            onPlayerPlay() {
                console.log('on player');
            },
            showFullScreen(){

            },
            videoTimeUpdate(){
                let vadios = document.getElementById('vadios');
                var currTime =vadios.currentTime;
                var duration = vadios.duration;
                this.vcCurrentTime = this.getFormatVideoTime(currTime);
                var pre = currTime / duration;
                this.vcProgress = pre*100;

                console.log(duration,currTime,'duration,currTime');
            },
            videoCanPlay(){
                let vadios = document.getElementById('vadios')
                var duration = vadios.duration;
                // console.log('ss',duration)
                this.vcTotalTime = this.getFormatVideoTime(duration);
            },
            //video play or stop
            videoPlay(){
                let vadios = document.getElementsByClassName('vadios');
                console.log('开',nums)
                if(this.vcIsPlay){
                    for(let i=0; i<vadios.length; i++){
                        // if(nums == i){
                            vadios[i].pause();
                        // }
                    }
                    console.log('关',vadios)
                }else{
                    for(let i=0; i<vadios.length; i++){
                        // if(nums == i){
                            vadios[i].play();
                        // }
                    }
                    console.log('开',vadios)
                }
                this.vcIsPlay = !this.vcIsPlay;
            },

            //格式化时间
            getFormatVideoTime(time) {
                var time = time;
                var m = parseInt(time%3600/60),
                    s = parseInt(time%60);
                m = m < 10 ? "0"+m : m;
                s = s < 10 ? "0"+s : s;
                return m+":"+s;
            },
            goBack(){
                this.$router.push('/index')
            },
            _getdislist() {
                let apiurl = this.apiurl+'/get_rotation_id';
                let data = {
                    "id": parseInt(this.$route.query.id)
                };
                this.axios.post(apiurl, data).then(res => {
                    console.log(res, '轮播详情');
                    if(res.data.html == ''){
                        this.istext = false;
                    }else{
                        this.text = `${res.data.html}`;
                        setTimeout(()=>{
                            let height = document.getElementById('box');
                            this.height = height.scrollHeight;

                            let vadios = document.getElementsByClassName('vadios');

                            let ximages = document.getElementsByClassName('ximages');
                            console.log(ximages)
                            for(let i=0; i<ximages.length; i++){
                                // ximages[i].addEventListener('click',this.videoPlay,i);
                            }
                            for(let j=0; j<vadios.length; j++){
                                vadios[j].addEventListener('click',this.videoPlay);
                            }
                        },1000)
                    }

                    this.audio = res.data.audio;
                    this.image = res.data.image;
                    this.vedio = res.data.vedio;




                })
            }
        }
    }
</script>

<style scoped>
  .el-page-header {
    display: flex;
    align-items: center;
    line-height: 1rem;
    padding: 40px 0 1%;
    width: 100vw;
    position: absolute;
    font-size: 0.8rem ;
  }
  .el-page-header__title {
    position: relative;
    z-index: 1;
    text-indent: 0.3rem;
  }
  .el-page-header__content {
    text-align: center;
    color: #303133;
    position: absolute;
    z-index: 0;
    width: 100%;
  }
  .main-content {
    height: 100vh;
    overflow: hidden;
    background: #fff;
    position: relative;
  }

  .videos {
    width: 100%;
    height: auto;
  }

  .audios {
    width: 100%;
    height: 45px;
  }

  .images {
    width: 100%;
    height: auto;
    display: block;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .titleItem {
    text-align: center;
    margin: 0 15px 2px;
    padding: 2px 0 5px;
    font-size: 14px;
    border-bottom: 1.3px solid #fff;
  }

  .active {
    border-bottom: 1.3px solid #9a55ff;
    color: #9a55ff;
    font-weight: 600;
  }

</style>

