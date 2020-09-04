<template>
  <div style="font-size: 14px">

    <div id="test"></div>
    <div id="livepusher"></div>

    <div v-if="false">
      <!--    直播前   -->
      <div v-if="islives" style="position: fixed;width: 100%;height: 100vh;z-index: 3000;background:rgba(0,0,0,0.3);">
        <div style="height: 35px"></div>
        <div style="position: fixed;z-index: 2000;width: 100%">
          <div style="display: flex;justify-content: space-between;align-items: center;padding: 0 15px">
            <div></div>
            <div style="display: flex;align-items: center;">
              <p style="width: 3px;"></p>
              <img @click="switchC" src="@/assets/lives/l6.png" alt="" style="width: 33px;height: auto;display: block">
              <p style="width: 18px;"></p>
              <img @click="beauty = !beauty" src="@/assets/lives/l7.png" alt=""
                   style="width: 33px;height: auto;display: block">
              <p style="width: 18px;"></p>
              <i @click="stopPush" class="el-icon-close" style="color: #fff;font-weight: 400;font-size: 30px"></i>
            </div>
          </div>
        </div>
        <div style="height: 100px"></div>
        <div style="padding: 0 20px">

          <div style="overflow: hidden;width: 100%;color: #fff;font-size: 12px">
            添加直播封面
            <div style="height: 10px"></div>

            <div style="display: flex;align-items: center">
              <div style="display: flex;align-items: center">
                <img :src="images" alt="" style="height: 120px;width: 100px;display: inline-block">


                <div style="position: absolute;opacity: 0" :style="{opacity:images==''?1:0}">
                  <upImage @addshopImage="addshopImage"></upImage>
                </div>
              </div>
              <div style="margin: 6px 0;width: 100%">
                <input type="text" v-focus="islode" v-model="livetext" class="inptext" placeholder="有些话想对你说，你不来怎么知道呢？"/>
              </div>
            </div>

            <!--      addshopImage-->
          </div>
        </div>
        <div style="height: 16px"></div>

        <div style="padding: 0 20px;color: #fff;font-size: 12px">
          点击添加直播封面语言
          <div style="height: 6px"></div>
          <div>
            <div v-for="(item,index) in liveList" @click="taggleID(item)"
                 :key="item.Id" class="texItem" :class="{activetexItem:item.Id == livetextId}">
              <span>{{item.Name}}</span>
            </div>
          </div>

        </div>

        <div style="height: 50px;"></div>

        <div class="btoms backcolors" @click="getlivevideo">
          开始直播
        </div>
      </div>

      <!--    直播时-->
      <div v-else style="position: fixed;width: 100%;height: 100vh;z-index: 3000;background:#111">
        <!--个人信息-->
        <backColor v-if="ismydetail" @heidback="heidback">
          <div @click.stop="">
            <mydetail :mydetails="mydetails"></mydetail>
          </div>
        </backColor>
        <!--      简介-->
        <backColor v-if="isAbstract">
          <div style="margin-top: 17vh">
            <div
              style="width: 80%;min-height: 200px;background: #fff;margin: 0 auto;padding: 6px 15px;border-radius: 7px">
              <div
                style="display: flex;justify-content: center;align-items: center;height: 50px;font-size: 16px;"></div>
              <div style="height: 20px"></div>
              <div>
                确定退出直播吗？
              </div>
              <div style="height: 40px"></div>
              <div style="display: flex;justify-content: center;align-items: center;">

                <div class="botmOk" @click="goback">确定</div>
                <div style="width: 25px"></div>
                <div class="botmNO" @click="isAbstract = false">取消</div>

              </div>
            </div>
          </div>
        </backColor>

        <div style="height: 30px"></div>
        <div style="display: flex;justify-content: space-between;padding: 0 20px;z-index: 3000;position: relative;">
          <!--          左边    -->
          <div
            style="background: rgba(0,0,0,0.5);display: flex;align-items: center;font-size: 12px;border-radius: 15px;color: #fff">
            <!--           -->
            <div @click="ismydetail = true">
              <img :src="detailsitem.Header" alt="" style="width: 25px;height: auto;display: block;border-radius: 50%">
            </div>
            <div style="width: 5px"></div>
            <div style="line-height: 12px;font-size: 12px">
              <div style="color: #fff">{{detailsitem.Nick}}</div>
              <div>{{count== 0?'0':count}}观看</div>
            </div>
            <div style="width: 15px;"></div>
          </div>
          <!--          右边      -->
          <div style="font-size: 12px;display: flex;align-items: center;text-align: center;">
            <div style="background: #999;border-radius: 6px;overflow: hidden;">
              <div style="background: #fff;padding: 0 6px">ULAM直播</div>
              <div style="padding: 0 10px">ID：{{streamName}}</div>
            </div>
            <div style="width: 10px;"></div>
            <!--          isAbstract = true -->
            <div @click="confroms()">
              <img src="@/assets/wen/heid.png" alt="" style="width: 30px;height: auto;display: block">
            </div>
          </div>
        </div>
        <div style="height: 10px"></div>
        <div style="padding: 0 20px;color: #fff;" @click="torecordLive(streamName)">
          收到打赏{{gift==0?'0':gift}}
        </div>

        <!--  写弹幕  -->
        <backColor v-if="istxtList" @heidback="istxtList = false">
          <div @click.stop="" v-if="istxtList"
               style="position:fixed;z-index: 10000000;left: 0;bottom: 0;width: 100%;background: #ffff;">
            <textarea type="text" v-model="livetext" @keyup.enter="seartvalus" class="texts"></textarea>
          </div>
        </backColor>
        <!--  弹幕  -->
        <div style="position: fixed;bottom: 60px;width: 100%;z-index: 2000">
          <div style="padding: 0 20px;font-size: 14px">
            <div v-for="(item,index) in txtList" :key="index">
              <span style="color: #ff9500">{{item.nick?item.nick+':':item.nick}}</span>
              <span style="color: #fff">{{item.msg}}</span>
            </div>
          </div>
        </div>
        <!--      功能    -->
        <div style="position: fixed;bottom: 10px;width: 100%;z-index: 3000;height: 40px">
          <div style="display: flex;justify-content: space-between;align-items: center;color: #fff;padding: 0 15px">
            <div @click="istxtList = true" style="display: flex;align-items: center">
              和粉丝互动
            </div>
            <div v-if="issets" @click="issets = false" style="display: flex;align-items: center;">
              <img src="@/assets/lives/l1.png" alt="" style="width: 33px;height: auto;display: block">

            </div>
            <div v-else style="display: flex;">
              <!--            设置摄像头-->
              <p style="width: 3px;"></p>
              <img @click="switchC" src="@/assets/lives/l6.png" alt="" style="width: 33px;height: auto;display: block">
              <p style="width: 3px;"></p>
              <!--            <img src="@/assets/lives/l6.png" alt="" style="width: 33px;height: auto;display: block">-->
              <p style="width: 3px;"></p>
              <img @click="tagglebeauty" src="@/assets/lives/l7.png" alt=""
                   style="width: 33px;height: auto;display: block">
              <p style="width: 3px;"></p>
            </div>
          </div>


        </div>
      </div>
      <!--   直播结束   -->
      <endLive :userIetm="userIetm"></endLive>

    </div>


    <div v-if="isshares"
         style="background: #000;width: 100vw;height: 100vh;position: fixed;z-index:1000;top: 0;left: 0">
      <div>
        <div
          style="display: flex;justify-content: flex-end;position: absolute;width: 100vw;top:6vh;left: 0;z-index: 10;">
          <img src="@/assets/lives/heade00.png" alt=""
               style="width: 6vw;height: auto;display: block;margin-right: 4vw;">
        </div>

        <div id="share" ref="share" style="background: #fff;border-radius: 1vw">
          <div>
            <img :src="detailsitem.Image"
                 alt="" style="width: 100%;height: auto;display: block">
          </div>
          <div style="height: 4vh;"></div>

          <div style="display: flex;justify-content: space-between;padding: 0 3vw">
            <div style="display: flex;font-size: 13px;align-items: center;">
              <div style="width: 27vw;">
                <img src="@/assets/lives/kg.png" alt="" style="width: 25vw;height: 25vw;display: block">
              </div>

              <div style="width: 72vw;">
                <div style="font-weight: 600;width: 90%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
                  {{detailsitem.Name}}
                </div>
                <div style="height: 1vh"></div>
                <div>主播名:{{detailsitem.Nick?detailsitem.Nick:0}}</div>
                <div style="height: 1vh"></div>
                <div>房间号:{{streamName}}</div>
                <div style="height: 1vh"></div>
                <div>邀请码:{{mydetailsId}}</div>
              </div>
            </div>
          </div>
          <div style="height: 7vh;"></div>
        </div>
        <div style="height: 3vh;"></div>

        <div style="position: fixed;bottom: 0vh;width: 100vw;left: 0;border-top: 1px solid #999;">
          <div class="botmOk" style="width: 100%;border-radius: 0;" @click="addshare">保存到相册</div>
        </div>


      </div>
    </div>


    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    <!-- 底部导航 -->
    <div
      style="display: none ;position: fixed;left: 0;bottom: -1px;border-top: 1px solid rgb(247, 244, 244);width: 100%;height: 50px;background: #fff;z-index: 100">
      <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;height: 48px">

        <div style="width: 25%;text-align: center;font-size: 12px;" @click="$router.push('/livebroadcast')">
          <img src="@/assets/lives/1.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto;">
          <p style="padding-top: 7px">发现</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/chatLive')">
          <img src="@/assets/lives/2_2.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 8px">信息</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999;position: relative">
          <img src="@/assets/lives/3.png" alt=""
               style="
               width:98%;height: auto;display: block;margin: -19px auto 0;position: relative;z-index: 1">
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/followLive')">
          <img src="@/assets/lives/4_4.png" alt="" style="width: 21px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top:7px">关注</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/myorderLive')">
          <img src="@/assets/lives/5_5.png" alt="" style="width: 19px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 7px">我的</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import scroll from "../../base/scroll/scroll";
    import upImage from './upImage/upImage';
    import {getliveData} from '@/api/index';
    import {reminder} from '@/common/js/mixin.js';
    import backColor from "../../base/backColor/backColor";
    import endLive from './end_live/end_live'
    import mydetail from '../detail_live/mydetail/mydetail';
    import html2canvas from 'html2canvas'

    export default {
        mixins: [reminder],
        name: "add_live",
        components: {
            scroll, upImage, backColor, endLive, mydetail
        },
        data() {
            return {
                islode: true,
                isshares: false,
                ismydetail: false,
                issets: true,
                userIetm: {},
                mydetails: {},
                islives: true,
                heights: 0,
                liveImage: '',
                images: '',
                pusher: null,
                plusview: null,
                previewr: null,
                livetext: '',
                liveList: [],
                livetextId: 0,
                websocket: null,
                istxtList: false,
                isAbstract: false,
                whiteness: 0,
                mode: 'HD',
                isendLive: false,//直播结束页面
                beauty: false,
                isxuanzemode: false,
                iswhiteness: false,
                detailsitem: '',
                liveID: 0,
                isrecordLive: false,
                IsFollow: false,
                yulanpuls: null,
                zhiboolus: null,
                count: 0,
                gift: 0,
                mydetailsId: 0,
                txtList: []//主播ID，是否关注，观看人数，收到礼物,弹幕
            }
        },
        created() {
            //请求封面语
            // this.liveNames();
            this.mydetailsId = JSON.parse(localStorage.getItem('user')).ma;

            this.heights = document.documentElement.clientHeight;
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('black')
            }
            let detailsitem = {
                Nick: JSON.parse(localStorage.getItem('user')).name,
                Header: localStorage.getItem('tellertx'),
                myHeader: localStorage.getItem('tellertx'),
            }
            this.detailsitem = detailsitem;
            this.createView();
            this.preview();






        },
        mounted() {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goback, false);
            }
            this.widths = document.documentElement.clientWidth;
        },
        destroyed() {
            window.removeEventListener('popstate', this.goback, false);
        },

        methods: {

            createView() {
                let that = this;
                let token = localStorage.getItem('token');
                var w = plus.webview.create('./static/addLives.html', 'test', {
                    background: 'transparent',
                }, {
                    token: token,
                    hu: parseInt(JSON.parse(localStorage.getItem('user')).hu),
                    detailsitem: that.detailsitem,
                });

                w.addEventListener('close', function () {
                    that.isshares = false;
                    w = null;
                    that.goBackssss();


                });

                w.addEventListener('hide', function () {
                    w.show();


                    let h = plus.webview.getWebviewById('addlive');
                    console.log("应用首页Webview窗口：" + h.flag);
                    let flag = h.flag;
                    if (flag == 1) {  //直播开始 点击开始直播


                        // that.islives = false;
                        let streamName = h.streamName;
                        let evt = h.evt;
                        // that.streamName = streamName;
                        // 关闭预览
                        // that.previewr.close();
                        //清除预览
                        // that.previewr = null;
                        //开始直播


                        let  user =  JSON.parse(localStorage.getItem('user'));
                        let  tellertx = localStorage.getItem('tellertx');
                        let  token = localStorage.getItem('token');
                        uni.navigateTo({
                            url: `/pages/lives/lives?username=${user.name}&userhu=${user.hu}&usermima=${user.mima}&userhead=${tellertx}&token=${token}&pushurl=${evt}&streamName=${streamName}`
                        },()=>{
                            h.close();
                            w.close();
                        });


                    } else if (flag == 2) {
                        //切换摄像头
                        that.switchC()
                    } else if (flag == 3) {
                        //切换美颜
                        that.tagglebeauty()
                    } else if (flag == 4) {
                        //保存分享
                        that.addshare()
                    }
                    h.close();
                });


                w.setStyle({top: '0px', width: '100%', height: '100%', left: '0px'});

                w.show(); // 显示窗口

            },
            //分享图片
            addshare() {
                let plus = window.plus;
                plus.nativeUI.toast('正在保存到相册', {verticalAlign: 'center'});
                setTimeout(() => {
                    let that = this;
                    html2canvas(that.$refs.share, {scale: 2, logging: false, useCORS: true}).then(function (canvas) {
                        let type = 'png';
                        let imgData = canvas.toDataURL(type);
                        console.log(imgData)
                        let bitmap = new plus.nativeObj.Bitmap();
                        let filename = "news_picture_" + (new Date()).getTime() + '.' + type;
                        bitmap.loadBase64Data(imgData);
                        bitmap.save(
                            "_doc/" + filename, {overwrite: true},
                            function (i) {
                                plus.gallery.save(
                                    i.target,
                                    function (d) {
                                        that.ss5 = false;
                                        //                     this.fileUrl = "_doc/" + filename;
                                        plus.nativeUI.toast('已保存到相册', {verticalAlign: 'center'});
                                        bitmap.clear();
                                    },
                                    function () {
                                        plus.nativeUI.toast('保存失败', {verticalAlign: 'center'});
                                        bitmap.clear();
                                    }
                                );
                            },
                            function () {
                                bitmap.clear();
                            }
                        );
                    });
                    //保存结束
                }, 500)
            },
            // 美颜
            tagglebeauty() {
                this.beauty = !this.beauty;
                this.issets = true;

                let plus = window.plus;

                if (this.beauty == true) {
                    plus.nativeUI.toast('美颜已打开', {verticalAlign: 'center'});
                } else {
                    plus.nativeUI.toast('美颜已关闭', {verticalAlign: 'center'});
                }


            },


            //直播介绍
            detailLivetex(Id) {
                console.log(Id, '直播介绍');
                let apiurl = 'v1/live/MCInfo';
                let data = {Id};
                getliveData(apiurl, data).then(res => {
                    console.log(res, '直播介绍');
                    this.mydetails = res.data
                })
            },
            goBackssss() {
               this.goback()
            },
            //返回
            goback() {
                if (this.pusher) {
                    this.pusher.pause();
                    this.pusher.stop();
                    this.pusher.close();
                    let h = plus.webview.getWebviewById('test');
                    if (h){
                        h.close();
                    }
                    this.pusher = null;
                }

                if (this.previewr) {
                    this.previewr.pause();
                    this.previewr.stop();
                    this.previewr.close();

                    let h = plus.webview.getWebviewById('test');
                    if (h){
                        h.close();
                    }
                    this.previewr = null;
                }

                setTimeout(() => {
                    this.$router.push({
                        path: '/livebroadcast',
                    });
                }, 300)


            },
            //关闭下级组件
            heidback() {
                this.ismydetail = false;
            },

            //选择美白
            xuanzewhiteness(whiteness) {
                this.whiteness = whiteness;
                this.iswhiteness = false;
            },
            //选择清晰度
            xuanzemode(mode) {
                console.log('!!!');
                this.mode = mode;
                this.isxuanzemode = false;
            },
            //预览
            preview() {
                let plus = window.plus;
                let pusher = null;
                pusher = plus.video.createLivePusher('livepusher', {
                    url: 'rtmp://testlivesdk.v0.upaiyun.com/live/upyunb',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                    'aspect': '9:16',
                    position: 'static',
                    mode: 'HD',//推流视频模式:SD(标清),HD(高清),FHD(超清)
                    beauty: this.beauty == false ? 0 : 1,//是否美颜,0表示不使用美颜;1表示使用美颜
                    whiteness: this.whiteness,//是否美白,0表示不使用美白；1,2,3,4,5值越大美白程度越大
                })
                this.yulanpuls = plus.webview.currentWebview().append(pusher);

                pusher.preview();
                this.previewr = pusher;
            },
            //跳转列表
            torecordLive(id) {
                this.isrecordLive = true;
                this.$router.push({
                    path: '/recordLive',
                    query: {
                        id
                    }
                })
            },


            // 停止直播
            stopPush() {
                this.pusher.stop();
                this.pusher.close();
                this.pusher = null;
                setTimeout(() => {
                    this.$router.push({
                        path: '/livebroadcast',
                    });
                }, 300)
            },
            //切换摄像头
            switchC() {
                this.issets = true;
                if (this.islives) {
                    this.previewr.switchCamera();
                } else {
                    this.pusher.switchCamera();
                }
            },

            //
            startPush() {
                let that = this;
                that.pusher.start(function () {
                    console.log('Start pusher success!');
                    // alert('成功推流')
                }, function (e) {
                    alert('Start pusher failed: ' + JSON.stringify(e))
                    console.log('Start pusher failed: ' + JSON.stringify(e));
                });
            },
            // 创建直播推流控件
            createLivePusher(PushUrl) {
                // alert(PushUrl+'直播地址')
                let plus = window.plus;
                var pusher = null;
                pusher = plus.video.createLivePusher('livepusher', {
                    url: PushUrl,
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                    'aspect': ' 9:16',
                    'min-bitrate': 1000,
                    'max-bitrate': 1000,
                    position: 'static',
                    'auto-focus': true,//自动聚焦
                    mode: 'FHD',//推流视频模式:SD(标清),HD(高清),FHD(超清)
                    beauty: this.beauty == false ? 0 : 1,//是否美颜,0表示不使用美颜;1表示使用美颜
                    whiteness: this.whiteness,//是否美白,0表示不使用美白；1,2,3,4,5值越大美白程度越大
                })
                this.zhiboolus = plus.webview.currentWebview().append(pusher);
                this.pusher = pusher;
                this.startPush()
            },
            //上传图片
            addshopImage(img, str) {
                console.log(img, '?????');
                this.liveImage = img.name;
                this.images = str;
                console.log(str, '!!!');
            },
            //删除图片
            removes() {
                this.liveImage = '';
                this.images = '';
            }

        }
    }
</script>

<style scoped>
  .btoms {
    width: 80%;
    margin: 0 auto;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 25px;
    font-size: 14px;
    /*background: #1cc6e2;/*/
    color: #fff;
  }

  .inptext {
    width: 100%;
    outline: none;
    height: 100px;
    color: #fff;
    border: 0;
    background: rgba(0, 0, 0, 0);
    text-indent: 10px;
    font-size: 14px;
    word-wrap: break-word;
  }

  .inptext::placeholder {
    color: #ccc;
    font-size: 12px;
  }

  .texItem {
    display: inline-block;
    line-height: 20px;
    margin: 5px 10px 5px;
    padding: 0px 3px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #fff;
  }

  .texts {
    width: 100%;
    height: 60px;
    outline: none;
    border: 0;
    background: #fff;
    color: #000;
  }

  .activetexItem {
    color: rgb(154, 85, 255);
    border: 1px solid rgb(154, 85, 255);
  }
</style>
