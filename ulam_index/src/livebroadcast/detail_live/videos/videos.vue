<template>

 <div style="width: 100vw;height: 100vh">
   <video-player  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
   ></video-player>

 </div>

</template>

<script>

    export default {
        name: 'BusImg',
        props:{
            PlayUrl:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                playerOptions:{
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'none', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: 'rtmp/hls',//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc' //this.PlayUrl //url地址
                    }],
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
        mounted() {
            // var videojs = require('video.js');
            // // console.log(videojs,'videojs!!!!!!!!!')
            // require('videojs-flash');
            // videojs('some-video-id', {techOrder: ['flash', 'html5']});
            // console.log(this.PlayUrl,'this.PlayUrl')
            // this.playerOptions.sources[0].src = this.PlayUrl ;
            // this.playerOptions.sources[1].src = this.PlayUrl ;

            const player = this.$refs.videoPlayer.player;
            player.play();
        },
        methods:{
            handleFullScreen(index){
                const player = this.$refs.videoPlayer.player;
                player.requestFullscreen();//调用全屏api方法
                player.isFullscreen(true)
                player.play()
            },
            onPlayerPlay(){
                const player = this.$refs.videoPlayer.player;
                player.play();
            },
            onPlayerPause(){
                const player = this.$refs.videoPlayer.player;
                player.pause();
            },
            onPlayerEnded(){

            }
        }
    }
</script>

<style scoped>
  /*import 'video.js/dist/video-js.css'*/
  /*import 'vue-video-player/src/custom-theme.css'*/




</style>
