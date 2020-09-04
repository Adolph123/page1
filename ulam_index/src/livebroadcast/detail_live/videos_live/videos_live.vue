<template>
    <div class="videoplayer">
      <video width="100%" autoplay loop height="100%"
             ref="video6" controlsList="nodownload" id="some-video-id">
        <source :src="PlayUrl"/>
      </video>
    </div>
</template>

<script>
    export default {
        name: "videos_live",
        data(){
          return{
              pusher:null,
              playerOptions:{
                  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                  autoplay: true, //如果true,浏览器准备好时开始回放。
                  muted: false, // 默认情况下将会消除任何音频。
                  loop: false, // 导致视频一结束就重新开始。
                  preload: 'none', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                  language: 'zh-CN',
                  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

                  //hls:true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）
                  techOrder: ['flash'], //播放rtmp必须加
                  poster: "", //你的封面地址
                  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                  controlBar: {
                      timeDivider: true,
                      durationDisplay: true,
                      remainingTimeDisplay: false,
                      fullscreenToggle: true  //全屏按钮
                  }
              }
          }
        },
        props:{
            PlayUrl:{
                type:String,
                default:''
            }
        },
        created(){
            // this.createVideoPlayer(this.PlayUrl);
        },
        mounted(){
            var videojs = require('video.js');
            // console.log(videojs,'videojs!!!!!!!!!')
            require('videojs-flash');
            videojs('some-video-id', {techOrder: ['flash', 'html5']});
        },
        methods:{
            //请求直播地址
            //创建视频播放控件
            // createVideoPlayer(src) {
            //     console.log(src,'!!!!!!!!!请求直播地址')
            //     let that = this;
            //     setTimeout(()=>{
            //         that.setTimeo = false;
            //     },2500)
            //     this.islives = true;
            //     let plus = window.plus;
            //     let player = this.pusher;
            //     if(!player){
            //         player = plus.video.createVideoPlayer('videoplayer', {
            //             src,
            //             top:'0',
            //             left:'0px',
            //             width: '100%',
            //             height: '100%',
            //             'direction': 0,
            //         });
            //         plus.webview.currentWebview().append(player);
            //         player.play();
            //         this.pusher = player;
            //
            //         // player.playbackRate(1.25);
            //     }
            // },
            // //关闭直播
            // heidLives(){
            //     this.islives = false;
            //     this.pusher.stop();
            //     this.pusher.hide();
            //     this.pusher.close();
            // },
        }
    }
</script>

<style scoped>
.videoplayer{
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
