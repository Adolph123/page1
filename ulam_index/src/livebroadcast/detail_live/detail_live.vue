<template>
  <div class="detail_live"  :style="{height:heights+'px'}">
    <div class="detail_live" style="background: rgba(0,0,0,0);display: none" :style="{height:heights+'px'}">
      <div style="height: 30px;"></div>
      <!--    头部-->
      <div style="display: flex;justify-content: space-between;padding: 0 20px;z-index: 3000;position: relative;">
        <!--          左边    -->
        <div style="background: rgba(0,0,0,0.5);display: flex;align-items: center;font-size: 12px;border-radius: 15px">
          <div @click="ismydetail = true">
            <img :src="detailsitem.Header" alt="" style="width: 25px;height: auto;display: block;border-radius: 50%">
          </div>
          <div style="width: 5px"></div>
          <div style="line-height: 14px">
            <div>{{detailsitem.Nick}}</div>
            <div>{{count==0?'0':count}}观看</div>
          </div>
          <div style="width: 15px;"></div>
          <div style="display: flex;align-items: center" @click="myfollow(detailsitem.Uid)" v-if="!IsFollow">
            <img src="@/assets/lives/love.png" alt="" style="width: 14px;height: auto;display: block">
            <span style="padding-left: 4px;color: #fff">关注</span>
          </div>
          <div style="color: #fff" @click="cancelfollow(detailsitem.Uid)" v-else>
            <i></i>已关注
          </div>
          <div style="width: 5px;"></div>
        </div>



        <!--          右边      -->
        <div style="font-size: 12px;display: flex;align-items: center;text-align: center;">
          <div style="background: rgba(0,0,0,0.4);border-radius: 6px;overflow: hidden;height: 100%">
            <div style="background: #fff;height: 50%">ULAM直播</div>
            <div style="padding: 0 10px;height: 50%">ID：{{detailsitem.StreamName}}</div>
          </div>
          <div style="width: 10px;"></div>
          <div @click="goback">
            <img src="@/assets/wen/heid.png" alt="" style="width: 30px;height: auto;display: block">
          </div>
        </div>
      </div>
<!--      收到礼物 数量   -->
      <div style="border-radius: 0;padding: 0 20px;position: relative;z-index: 3000;top: 10px;" @click="torecordLive(detailsitem.StreamName)">

        收到打赏{{gift==0?'0':gift}}
      </div>

<!--      礼物效果-->

      <div v-if="isliwudetail" style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;">
        <div style="display: flex;justify-content: center;align-items: center;height: 100%">
          <img   :src="liwudetail.Logo" alt=""   :style="{transform:isliwudetail?'rotateZ(720deg)':'rotateZ(0deg)'}" style="width: 80px;height: auto;transition:all 2s;">
        </div>
      </div>

<!--   警告   -->
      <div v-if="setTimeo"  style="position: fixed;bottom: 120px;width: 75%;z-index: 2000">
        <div style="padding: 0 20px;font-size: 14px;line-height: 16px;color: #ff9500" >
          直播提倡绿色直播，严谨涉政、 涉恐、涉黄聚众闹事、返现等内容，网警24小时巡查。请勿参与直播间非官方奖励活动、游戏，切勿私下交易，以防受骗
        </div>
      </div>
      <!--  弹幕  -->
      <div  style="position: fixed;bottom: 50px;width: 100%;z-index: 2000">
        <div style="padding: 0 20px;font-size: 14px">
          <div v-for="(item,index) in txtList" :key="index">
            <span style="color: #ff9500">{{item.nick?item.nick+':':item.nick}}</span>
            <span style="color: #ff9500">{{item.msg}}</span>
          </div>
        </div>
      </div>
      <!--  写弹幕  -->
      <backColor v-if="istxtList" @heidback="heidback">
        <div @click.stop="" v-if="istxtList" style="position:fixed;z-index: 10000000;left: 0;bottom: 0;width: 100%;background: #ffff;display: flex">
          <textarea type="text" v-model="livetext" @keyup.enter="seartvalus" class="texts"></textarea>
          <div style="width: 20%;display: flex;align-items: center;justify-content: center" @click="seartvalus">发送</div>
        </div>
      </backColor>

      <!--    底部送礼物 -->
      <div style="position: fixed;bottom: 10px;width: 100%;z-index: 3000">
        <div style="display: flex;justify-content: space-between;align-items: center;color: #fff;padding: 0 15px">
          <div style="display: flex;align-items: center">
            <img @click="toshopDetail" src="@/assets/lives/l10.png" alt="" style="width: 30px;height: auto;display: block">
            <p style="width: 3px;"></p>
            <span  @click="istxtList = true">跟主播聊什么</span>
          </div>
          <div style="display: flex;align-items: center">

            <img src="@/assets/lives/l2.png" alt="" style="width: 33px;height: auto;display: block">
            <p style="width: 3px;"></p>
            <img @click="isgiftDetail = true" src="@/assets/image/tiezi_22.png" alt="" style="width: 33px;height: auto;display: block">
          </div>
        </div>




        <!--个人信息-->
        <backColor v-if="ismydetail" @heidback="heidback">
          <div @click.stop="">
            <mydetail :mydetails="mydetails"></mydetail>
          </div>
        </backColor>
        <!--      商品列表    -->
        <backColor v-if="isshoplist" @heidback="heidback">
          <div @click.stop="">
            <shoplist :shoplistitem="shoplists" ></shoplist>
          </div>
        </backColor>
        <!--礼物-->
        <backColor v-if="isgiftDetail" @heidback="heidback">
          <div @click.stop="">
            <giftDetail :giftDetails="giftDetails" @myhuaqian="myhuaqian"></giftDetail>
          </div>
        </backColor>
        <!--密码框-->
        <backColor v-if="dialogVisible" @heidback="heidback">
          <div @click.stop="" style="position: fixed;bottom: 0;width: 100%">
            <div style="background: #fff;padding: 0 20px;width: 75%;margin: 0 auto;border-radius: 6px">
              <div style="height: 6px"></div>
              <div style="justify-content: center;display: flex;align-items: center">请输入密码</div>
              <div style="margin: 20px 0">
                <el-input placeholder="请输入密码" v-model="Password" show-password></el-input>
              </div>

              <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
             <span class="passwordbtm" style="background: #f5f5f5;color: rgb(127, 126, 126)"
                   @click="dialogVisible = false">取 消</span>
                <span class="passwordbtm" @click="toAlipay">确 定</span>

              </div>
              <div style="height: 10px"></div>
            </div>
          </div>
        </backColor>
        <!-- 指纹  v-if="zhiwen"   -->
        <backColor v-if="zhiwen"  @heidback="heidback">
          <div @click.stop="" style="position: fixed;bottom: 0;width: 100%">
            <div style="background: #fff;padding: 0 20px;width: 75%;margin: 0 auto;border-radius: 6px">
              <div style="height: 6px"></div>
              <div style="justify-content: center;display: flex;align-items: center">指纹支付</div>
              <div style="">
                <img src="@/assets/icos/zw.png" alt="" style="width:80px;height: auto;display: block;margin: 0 auto;">
                <div style="height:10px;"></div>
              </div>
              <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
                <span class="passwordbtm" style="background: #f5f5f5;color: #888" @click="showzhiwens">取 消</span>
                <span class="passwordbtm" @click="taggmima">使用密码</span>
              </div>
              <div style="height: 10px"></div>
            </div>
          </div>

        </backColor>

      </div>

    </div>
<!--{{PlayUrl}}-->


    <div v-show="isshare"  style="background: #000;width: 100vw;height: 100vh;position: fixed;z-index:1000;top: 0;left: 0">
      <div >
        <div style="display: flex;justify-content: flex-end;position: absolute;width: 100vw;top:6vh;left: 0;z-index: 10;">
          <img  src="@/assets/lives/heade00.png" alt="" style="width: 6vw;height: auto;display: block;margin-right: 4vw;">
        </div>

        <div id="share" ref="share"  style="background: #fff;">
          <div>
            <img :src="detailsitem.Image"
                 alt="" style="width: 100%;height: auto;display: block">
          </div>

          <div style="height: 4vh;"></div>
          <div style="display: flex;justify-content: space-between;padding: 0 4vw">
            <div style="display: flex;font-size: 13px;align-items: center;">
              <div style="width: 27vw;">
				  <img src="@/assets/lives/kg.png" alt=""  style="width: 25vw;height: 25vw;display: block">
              </div>
              <div style="width: 72vw;">
					<div style="font-weight: 600;width: 90%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{detailsitem.Name}}</div>
					<div style="height: 1vh"></div>
					<div style="font-size: 12px;">主播名:{{detailsitem.Nick?detailsitem.Nick:0}}</div>
					<div style="height: 1vh"></div>
					<div style="font-size: 12px;">房间号:{{detailsitem.StreamName}}</div>
					<div style="height: 1vh"></div>
					<div style="font-size: 12px;">邀请码:{{mydetailsId}}</div>
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

    <div id="videoplayer"></div>

    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    <loading :show="sh8" text="指纹识别成功正在提交.."></loading>




  </div>
</template>

<script>
    import {getliveData} from '@/api/index';
    import html2canvas from 'html2canvas'
    import mydetail from './mydetail/mydetail';
    import backColor from "../../base/backColor/backColor";
    import giftDetail from './giftDetail/giftDetail';
    import shoplist from './shoplist/shoplist';
    import {reminder} from '@/common/js/mixin.js';
    // import videosLive from "./videos_live/videos_live";
    // import videos from "./videos/videos";
    import {Loading,} from 'vux';
    export default {
        name: "detail_live",
        mixins:[reminder],
        components: {mydetail, backColor, giftDetail,Loading,shoplist,},
        props: {
            detailsitem: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                isshoplist:false,
                isshare:false,
                shoplists:'',
                istxtList:false,
                txtList:[],//弹幕
                livetext:'',//弹幕信息
                islives:false,
                isliwudetail:false,
                dialogVisible:false,//密码框
                zhiwen:false,//密码框 ——指纹
                heights: 0,
                widths:0,
                ismydetail: false,
                mydetails: {},
                giftDetail: [],
                isgiftDetail: false,
                liwudetail:{},
                giftDetails:[],
                Password:'',
                sh8:false,
                setTimeo:true,
                pusher:'',//视频
                websocket:{},PlayUrl:'',
                liveID:0,IsFollow:false,count:0,gift:0,//主播ID，是否关注，观看人数，收到礼物
                view_live:null,mydetailsId:0
            }
        },
        created() {
            this.mydetailsId = JSON.parse(localStorage.getItem('user')).ma;

            this.heights = document.documentElement.clientHeight;
            this.widths = document.documentElement.clientWidth;
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            // this.liwudetail = {
            //     Logo:'http://img0.imgtn.bdimg.com/it/u=1703314445,3483893441&fm=26&gp=0.jpg'
            // }


            console.log()


            this.isliwudetail=true;
            setTimeout(()=>{
                this.isliwudetail=false;
                this.isshare=true;
            },1500);



            // //请求直播地址

            this.liveplay();


            // //请求 直播收到 礼物列表
            // this._getgiftlist(this.detailsitem.StreamName);
            // // 直播介绍
            // this.detailLivetex(this.detailsitem.Uid);
            // // 请求礼物列表
            // this._getliwu();
            // this.getinformationList();


        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            this.createView()


        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        methods: {

            createView(){
                let that = this;

                that.detailsitem.myHeader = localStorage.getItem('tellertx');

                let token = localStorage.getItem('token');
                let plus = window.plus;
                var w = plus.webview.create('./static/detail.html','test', {
                        background: 'transparent',
                },{
                    monty:JSON.parse(localStorage.getItem('wals')).balance,
                    _steId:that.detailsitem,
                    _token:token,
                    _Header:that.detailsitem.Header,


                });

                w.addEventListener('close', function(){
                    that.heidLives();
                    that.goback();
                    w=null;
                });

                w.addEventListener('hide', function(){
                    w.show();
                    that.addshare();
                });


                w.setStyle({top:'0px',width:'100%',height:'100%',left:'0px'});

                w.show(); // 显示窗口

            },
            //分享图片
            addshare(){
                let plus = window.plus;
                plus.nativeUI.toast('正在保存到相册',{verticalAlign:'center'});
                let that = this;
                setTimeout(() => {
                    html2canvas(that.$refs.share,{scale:2,logging:false,useCORS:true}).then(function(canvas) {
                        let type = 'png';
                        let imgData = canvas.toDataURL(type);
                        console.log(imgData)
                        let bitmap = new plus.nativeObj.Bitmap();
                        let filename = "news_picture_" + (new Date()).getTime() + '.' + type;
                        bitmap.loadBase64Data(imgData);
                        bitmap.save(
                            "_doc/" + filename,{overwrite:true},
                            function (i) {
                                plus.gallery.save(
                                    i.target,
                                    function (d) {
                                        that.ss5 = false;
//                     this.fileUrl = "_doc/" + filename;
                                        plus.nativeUI.toast('已保存到相册',{verticalAlign:'center'});
                                        bitmap.clear();
                                    },
                                    function () {
                                        plus.nativeUI.toast('保存失败',{verticalAlign:'center'});
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

            //跳转列表
            torecordLive(id){
                if(this.pusher){
                    this.pusher.stop();
                    this.pusher.hide();
                    this.pusher.close();
                }


                this.$router.push({
                    path:'/recordLive',
                    query:{
                        id
                    }
                })
            },
            //商品列表展开
            toshopDetail(){
                // this.isshoplist = true;
                // this.shoplists = this.detailsitem.StreamName;
            },

            //发送弹幕
            seartvalus(){
              console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                if(this.livetext){
                    this.addliveChat()
                }
            },
            //发送弹幕
            addliveChat(){

                let that = this;
                let date = {"code":10019,"streamName":that.detailsitem.StreamName,"msg":that.livetext};
                this.websocket.send(JSON.stringify(date));
                this.livetext = '';
                this.istxtList = false;
                this. websocket.onmessage = function (evt) {
                    console.log('弹幕信息' + evt.data);
                    if(evt.data == 'ping'){
                        that.txtList.push({
                            msg:'',
                            nick:'',
                        });
                        if(that.txtList.length > 7){
                            that.txtList.shift(7,1)
                        }
                        return
                    }else {
                        let obj = JSON.parse(evt.data);
                        that.count = obj.count;
                        that.gift = obj.gift;
                        console.log(obj,'!!!!!!!!!!!!!!!!')
                        if(obj.code == 10006){
                            that.txtList.push(obj);
                            if(that.txtList.length > 7){
                                that.txtList.shift(7,1)
                            }
                        }
                    }

                };
            },
            //请求弹幕
            getinformationList(){
                var wsServer = 'ws://39.98.249.37:5006/liveChat';
                var websocket = new WebSocket(wsServer);
                let that = this;
                websocket.onopen = function (evt) {
                    let a = localStorage.getItem('token');
                    var remind = `{"token":"${a}","streamName":"${that.detailsitem.StreamName}"}`;
                    websocket.send(remind);
                };

                websocket.onclose = function (evt) {
                    console.log("Disconnected");
                };
                websocket.onmessage = function (evt) {
                    console.log('弹幕信息' + evt.data);


                        if(evt.data == 'ping'){
                            console.log('!!!!!!!!!!!!!!!!');

                            that.txtList.push({
                                msg:'',
                                nick:'',
                            });
                            if(that.txtList.length > 7){
                                that.txtList.shift(7,1)
                            }
                            return
                        }else {
                            let obj = JSON.parse(evt.data);
                            that.count = obj.count;
                            that.gift = obj.gift;
                            console.log(obj,'!!!!!!!!!!!!!!!!')
                            if(obj.code == 10006){
                                that.txtList.push(obj);
                                if(that.txtList.length > 7){
                                    that.txtList.shift(7,1)
                                }
                            }

                        }



                };
                websocket.onerror = function () {
                    that.reconnect()
                };
                this.websocket = websocket;
            },
            //重连
            reconnect(url) {
                let that = this;
                setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                    var ws =  that.websocket;
                    ws.onclose = function () {
                        that.reconnect()
                    };
                    ws.onerror = function () {
                        that.reconnect()
                    };
                }, 2000);
            },





            //请求直播地址
            liveplay(){
                let apiurl = 'v1/live/play';
                let data = {
                    Name:this.detailsitem.StreamName
                } ;
                getliveData(apiurl, data).then(res => {
                    console.log(res.data, '请求直播地址');
                    this.liveID = res.data.ID;
                    this.count = res.data.Count;
                    this.IsFollow = res.data.IsFollow;
                    this.PlayUrl = res.data.PlayUrl;
                    //$refs.videosLive
                    this.createVideoPlayer(res.data.PlayUrl)
                })
            },
            //创建视频播放控件
            createVideoPlayer(src) {
                let that = this;
                setTimeout(()=>{
                    that.setTimeo = false;
                },2500)
                this.islives = true;
                let plus = window.plus;
                let player = this.pusher;
                if(!player){
                    let ledts = this.widths*0.15;
                    player = plus.video.createVideoPlayer('videoplayer', {
                        src,
                        top:'0px',
                        left: -ledts+"px",
                        width: this.widths*1.3 + "px",
                        height: this.heights+"px",
                        position: 'static',
                        'direction': 90,
                        objectFit:'contain',
                        poster:this.detailsitem.Image,//视频封面
                    });
                    plus.webview.currentWebview().append(player);
                    plus.webview.currentWebview().append(this.view_live);
                    player.play();
                    this.pusher = player;

                    // player.playbackRate(1.25);
                }
            },
            //关闭直播
            heidLives(){
                this.islives = false;
                this.pusher.stop();
                this.pusher.hide();
                this.pusher.close();
            },
            //使用密码
            toAlipay(){
                if(this.Password == ''){
                    this.tagglePrompt(false,'请输入支付密码')
                }else{
                    this.addgiftitem()
                }
            },
            //  真正调用指纹的方法
            wenfus() {
                let _this = this;
                console.log('!!!!!!!!!!!!!!!!!', "开始指纹识别")
                if (!window.plus) return;
                console.log("可以进行开始指纹识别")
                let plus = window.plus;
                // 检查是否支持指纹识别
                if (plus.fingerprint) {
                    if (!plus.fingerprint.isSupport()) {
                        plus.nativeUI.alert('此设备不支持指纹识别');
                        return;
                    }
                    if (!plus.fingerprint.isKeyguardSecure()) {
                        plus.nativeUI.alert('此设备未设置密码锁屏，无法使用指纹识别');
                        return;
                    }
                    if (!plus.fingerprint.isEnrolledFingerprints()) {
                        plus.nativeUI.alert('此设备未录入指纹，请到设置中开启');
                        return;
                    }
                    //开启指纹识别验证()
                    var waiting = null;
                    plus.fingerprint.authenticate(function () {
                        // plus.nativeUI.alert('指纹识别成功');
                        console.log("可以进行开始指纹识别    成功")
                        //开启识别成功的加载状态
                        _this.sh8 = true;
                        // //关掉指纹的样式弹窗
                        _this.zhiwen = false;
                        // //  调用拿取密码的方法
                        _this.wendmi()
                    }, function (e) {
                        console.log("可以进行开始指纹识别    失败");
                        switch (e.code) {
                            case e.AUTHENTICATE_MISMATCH:
                                plus.nativeUI.toast('指纹匹配失败，请重新输入',{verticalAlign:'center'});
                                _this.fingertext = '指纹匹配失败，请重试';
                                break;
                            case e.AUTHENTICATE_OVERLIMIT:
                                plus.nativeUI.alert('识别次数超出限制，请使用密码进行支付！',{verticalAlign:'center'});
                                //密码弹窗起来 指纹样式下去
                                _this.zhiwen = false;
                                _this.querenshouhuo = true;
                                _this.showFinger = false;
                                break;

                            default:
                                if(e.code == 6){
                                    break;
                                }else {
                                    plus.nativeUI.alert('指纹识别失败(' + e.code + ')，请重试');
                                    _this.fingertext = '指纹识别失败(' + e.code + ')，请重试'
                                    break;
                                }
                        }
                    })

                } else {
                    plus.nativeUI.alert('当前环境不支持指纹识别API，请更新到最新版本');
                }
            },
            //指纹成功后调取的方式
            wendmi() {
                let mis = localStorage.getItem("jinmi");
                console.log(mis);
                // 调用支付方法 别忘了 sh8 还整加载中
                if (!mis) {
                    this.tagglePrompt(false,'未设置支付密码。。。');
                    //没有密码 提示请进行密码加密在进行转账
                    setTimeout(() => {
                        this.$router.push('/sets')
                    }, 2000)
                    return
                } else {
                    this.Password = mis;

                    this.addgiftitem();//支付
                }
//有密码就进行操作楼
            },
            //关闭指纹
            showzhiwens(){
                if (window.plus) {
                    window.plus.fingerprint.cancel();
                }
                this.zhiwen = false;
            },
            //使用密码
            taggmima(){
                this.dialogVisible = true;

                this.zhiwen = false;

                this.showzhiwens()
            },
            //选择打赏  开启密码
            myhuaqian(item){
                this.isgiftDetail = false;
                this.liwudetail = item;
                let zw = localStorage.getItem('zhiwens');
                if(zw){//设置指纹 使用
                    this.zhiwen = true;
                    this.wenfus()
                }else {//未设置指纹 使用密码
                    this.dialogVisible = true;

                }
            },
            //关闭下级组件
            heidback() {
                this.ismydetail = false;
                this.dialogVisible = false;
                this.istxtList = false;
                this.zhiwen = false;
                this.isgiftDetail = false;
                this.isshoplist = false;
            },
            //退出
            goback() {
                // this.$refs.videosLive.heidLives();
              let thst = this;
              thst.websocket.onclose=function(e){
                  thst.websocket.close(); //关闭TCP连接
              };

                if(thst.pusher){
                    thst.pusher.stop();
                    thst.pusher.hide();
                    thst.pusher.close();
                }
                thst.$emit('heiddetailLives')
            },
            //取消关注
            cancelfollow(Id){
                let plus = window.plus
                let apiurl = 'v1/live/cancel_follow';
                let data = {
                    Id
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'取消关注')
                    if(res.status == "fail"){
                        plus.nativeUI.toast('取消关注失败',{verticalAlign:'center'});
                        // this.tagglePrompt(false,'取消关注失败')
                    }else{
                        plus.nativeUI.toast('取消关注成功',{verticalAlign:'center'});
                        // this.tagglePrompt(true,'取消关注成功');
                        this.IsFollow = false

                    }

                })
            },
            //关注主播
            myfollow(Id){
                let plus = window.plus;
                let apiurl = 'v1/live/follow';
                let data = {
                    Id,
                    Name:this.detailsitem.StreamName
                };
                getliveData(apiurl,data).then(res=>{
                    console.log(res,'取消关注')
                    if(res.status == "fail"){
                        plus.nativeUI.toast('关注主播失败',res.msg);
                        // this.tagglePrompt(false,'关注主播失败',res.msg)
                    }else{
                        plus.nativeUI.toast('关注主播成功');
                        // this.tagglePrompt(true,'关注主播成功');
                        this.IsFollow = true;
                    }

                })
            },
            //请求 直播收到 礼物列表
            _getgiftlist(Name) {
                let apiurl = 'v1/live/gift-list';
                let data = {
                    "Page": 1,
                    Name
                };
                getliveData(apiurl, data).then(res => {
                    console.log(res, '!@!@!@,请求礼物列表')
                })
            },
            //送礼物
            addgiftitem() {
                let plus = window.plus;
                let apiurl = 'v1/live/gift';
                let data = {"Name": this.detailsitem.StreamName, "Status": this.liwudetail.Id, "Password": this.Password}
                getliveData(apiurl, data).then(res => {
                    this.heidback();
                    console.log(res, '送礼物');
                    alert(res.status)
                    if(res.status == "fail"){

                        plus.nativeUI.toast(`${this.liwudetail.Name}打赏失败,${res.msg}`,{verticalAlign:'center'});
                        // this.tagglePrompt(false,`${this.liwudetail.Name}打赏失败,${res.msg}`);

                    }else{
                        this.isliwudetail = true;
                        setTimeout(()=>{
                            this.isliwudetail = false;
                        },2000)
                        plus.nativeUI.toast(`${this.liwudetail.Name}打赏成功`,{verticalAlign:'center'});
                        // alert(`${this.liwudetail.Name}打赏成功`)
                        // this.tagglePrompt(true,`${this.liwudetail.Name}打赏成功`)
                    }
                })

            },

            //直播介绍
            detailLivetex(Id) {
                let apiurl = 'v1/live/MCInfo';
                let data = {Id};
                getliveData(apiurl, data).then(res => {
                    console.log(res, '直播介绍');
                    this.mydetails = res.data
                })
            },
            //礼物详情
            _getliwu() {
                let apiurl = 'v1/live/gifts';
                let data = {};
                getliveData(apiurl, data).then(res => {
                    console.log(res, '礼物详情');
                    this.giftDetails = res.data;

                    // this.$router.push('/detailText')

                })
            },
        }
    }
</script>

<style scoped>
  .detail_live {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #ccc;
    z-index: 100;
  }
  .texts{
    width: 100%;
    height: 60px;
    outline: none;
    border: 0;
    background: #fff;
    color: #000;
  }
</style>

<style scoped lang="stylus">
  .passwordbtm
    width 45%
    display block
    text-align center
    border-radius 6px
    font-size 16px
    padding 2px 0
    background #9a55ff
    line-height 30px
    color #fff
</style>
