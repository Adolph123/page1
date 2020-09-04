<template>
  <div class="canvasbox">

    <div v-show="sh8" style="position: fixed;top: 30vh;width: 100%;left: 0">
      <div  style="width: 50%;margin: 0 auto;background: rgba(0,0,0,0.7);border-radius: 6px;text-align: center;">
        <i class="weui-loading weui-icon_toast" style="font-size: 18px;"></i>
        <p style="color: #fff;line-height: 30px;padding-bottom: 20px">正在保存到相册..</p>
      </div>
    </div>


    <div style="padding: 40px 0 4%">
      <div class="leftsposition">
        <canvas id="canvas" width="800" height="600" ref="canvas"></canvas>
        <div style="display: none">
          <img src="@/assets/icos/teller.png" crossorigin="anonymous" alt="" ref="qrcode" id="qrcode">
          <img src="@/assets/tx.png" crossorigin="anonymous" alt="" id="loge">
        </div>
      </div>
      <div style="position: relative;display: flex;justify-content: center;align-items: center">
        <img src="@/assets/back.png" alt="" @click="removeCanvas" style="position: absolute;left: 5%;font-size: 20px;width: 3vw;height: auto;display: block">
        <span style="font-size: 18px">画报分享</span>
      </div>
    </div>

    <div v-if="!store" ref="box" class="box">
      <div>
        <img :src="contentbox.defaultImg" class="canimage" ref="defaultImg" style="width: 100%" alt="">
      </div>

      <div class="title">
        <div style="line-height: 25px"><span>{{contentbox.storeName}}</span></div>
        <div class="text"><span>{{contentbox.skuName}}</span></div>
      </div>

      <div class="title" style="display: flex;justify-content: space-between;align-items: center;padding-top: 10px;">
        <div style="text-align: center;flex: 1;display: flex;align-items: center">
          <img src="@/assets/icos/kg.png" alt="" class="canimage" style="width: 35%">
          <div style="text-align: left;flex: 1;margin-left: 10px">
            <div style="line-height: 15px"><span>邀请码</span></div>
            <div style="font-size: 16px;color:#F4451A;"><span>{{yaoqingma}}</span></div>
          </div>
        </div>

        <div style="text-align: center;flex: 1">
          <img src="@/assets/tx.png" class="canimage" style="width: 25%;float: right" alt="">
        </div>
      </div>

      <div style="height: 15px"></div>
    </div>

    <div v-else ref="box" class="box">
      <div>
        <img :src="shophometitle.header" class="canimage" ref="defaultImg" style="width: 100%" alt="">
      </div>

      <div class="title">
        <div style="line-height: 25px"><span>{{shophometitle.name}}</span></div>
        <div class="text"><span>品牌：{{shophometitle.brand}}</span></div>
      </div>

      <div class="title" style="display: flex;justify-content: space-between;align-items: center;padding-top: 10px;">
        <div style="text-align: center;flex: 1;display: flex;align-items: center">
          <img src="@/assets/icos/kg.png" alt="" class="canimage" style="width: 35%">
          <div style="text-align: left;flex: 1;margin-left: 10px">
            <div style="line-height: 15px"><span>邀请码</span></div>
            <div style="font-size: 16px;color:#F4451A;"><span>{{yaoqingma}}</span></div>
          </div>
        </div>

        <div style="text-align: center;flex: 1">
          <img src="@/assets/tx.png" class="canimage" style="width: 25%;float: right" alt="">
        </div>
      </div>

      <div style="height: 15px"></div>
    </div>

    <div style="position: fixed;bottom: 24px;width: 100%;">
      <div style="display: flex;justify-content: center;">
        <span class="btom" @click="xiazaiimage">点击保存图片</span>
      </div>
    </div>

  </div>
</template>

<script>
    import html2canvas from 'html2canvas';
    import {Loading} from 'vux'

    import {getdislist} from '@/api/index';

    export default {
        name: "canvase",
        components: {Loading},
        props: {
            goodsId: {
                type: Number,
                default: 0
            },
            store:{
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
                backgroundUrl: imga1,
                sh8: false,
                context: {}, // canvas对象
                contentbox: {},
                yaoqingma: 0,
                bodyHeight: '',
                bodyWidth: '',
                canvasurlimage: '',
                shophometitle:{}
            }
        },
        created() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.yaoqingma = user.ma
            }
            console.log(this.goodsId,'this.goodsId')
            if(this.store){
                //店铺
                this._getstodislist(this.goodsId)
            }else{
                //商品
                this._getdislist(this.goodsId)
            }

        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.tgoBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.tgoBack, false);
        },
        methods: {
            tgoBack() {
                this.$emit('showCanvas', false);
            },
            //点击下载图片
            xiazaiimage() {
                this.sh8 = true;
                let that = this;
                document.documentElement.scrollTop = document.body.scrollTop = 0;

                setTimeout(() => {
                    //保存开始
                    html2canvas(that.$refs.box, {scale: 2, logging: false, useCORS: true}).then(function (canvas) {
                        let type = "image/png";
                        let imgData = canvas.toDataURL(type);
                        console.log(imgData);
                        that.saveImp(imgData)
                    });
                    //保存结束
                }, 800)


            },

            // 测试保存到相册
            saveImp(base64) {
                this.sh8 = false;
                let bitmap = new plus.nativeObj.Bitmap();
                let type = 'png';
                let filename = "news_picture_" + (new Date()).getTime() + '.' + type;
                bitmap.loadBase64Data(base64);
// 保存Bitmap图片
                bitmap.save(
                    "_doc/" + filename,{overwrite:true},
                    function (i) {
//保存到系统相册
                        plus.gallery.save(
                            i.target,
                            function (d) {
//销毁Bitmap图片
                                console.log(filename);
                                alert("已保存到相册");
                                bitmap.clear();
                            },
                            function () {
                                alert("保存失败", i);
//销毁Bitmap图片
                                bitmap.clear();
                            }
                        );
                    },






















                //
                //
                // let bitmap = new window.plus.nativeObj.Bitmap("image");
                // var timestamp = Date.parse(new Date());
                //
                // bitmap.loadBase64Data(
                //     base64,
                //     function (i) {
                //         bitmap.save(
                //             "TEXT.jpg", {
                //                 overwrite: true
                //             },
                //             function (event) {
                //                 console.log(event.target);
                //                 window.plus.gallery.save(event.target, function () {
                //                     alert("保存图片到相册成功");
                //                     let tarbitmap = new window.plus.nativeObj.Bitmap.getBitmapById(
                //                         "image"
                //                     );
                //                     tarbitmap.clear();
                //                 });
                //             },
                //             function (err) {
                //                 window.plus.nativeUI(err);
                //             }
                //         );
                //     },
                    function (err) {
                        window.plus.nativeUI(err);
                    }
                );
            },
            // 初始化画布  商品
            initDraw() {
                let canvas = this.$refs.canvas;
                let ctx = canvas.getContext('2d');
                console.log(canvas)
                const contentbox = this.contentbox;
                let bodyWidth = document.documentElement.clientWidth;
                let bodyHeight = document.documentElement.clientHeight;
                let titlehtight = 50;
                let titleY = bodyWidth + 20;
                let headerwidth = 50;
                let qrcodewidth = 80;
                // 		铺底色
                canvas.width = bodyWidth;
                canvas.height = bodyHeight - bodyHeight * 0.16;
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);


                //商品图片
                let img = new Image();
                img.crossOrigin = "anonymous"; //关键 跨越
                img.src = contentbox.defaultImg;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, bodyWidth, bodyWidth);
                };

                // // 用户头像
                // let userimg = new Image(); // 头像
                // userimg.crossOrigin="anonymous";
                // let userimage = localStorage.getItem('tellertx');
                // userimg.src = userimage;
                // userimg.onload=()=>{
                //     ctx.drawImage(userimg, 15,bodyWidth+5, headerwidth,headerwidth);
                // }

                // 邀请码
                let qrcodeimg = new Image();
                qrcodeimg.src = 'http://39.98.249.37:5300/api/file/default/ulam.png';
                console.log(qrcodeimg, 'qrcode');
                qrcodeimg.crossOrigin = "anonymous";
                qrcodeimg.onload = () => {
                    ctx.drawImage(qrcodeimg, 15, bodyWidth + headerwidth + 20, qrcodewidth, qrcodewidth);
                }

                //APP  loge 图片
                ctx.arc(bodyWidth - 15 - qrcodewidth, bodyWidth + headerwidth + 20, qrcodewidth / 2, 0, 0, true);

                let loge = document.getElementById('loge');
                loge.crossOrigin = "anonymous";
                console.log(loge);
                ctx.drawImage(loge, bodyWidth - 15 - qrcodewidth, bodyWidth + headerwidth + 20, qrcodewidth, qrcodewidth);


                ctx.strokeStyle = '#000';
                ctx.font = "normal  normal 400  14px Arial";
                //商品名
                let str1 = contentbox.skuName;
                console.log(str1, str1.length)
                if (str1.length > 29) {
                    str1 = str1.substr(0, 28) + "...";
                    console.log(str1)
                }
                ctx.strokeText(str1, 15, titleY + 25);
                //店铺名
                let str2 = contentbox.storeName;
                ctx.strokeText(str2, 15, titleY);

                let user = JSON.parse(localStorage.getItem('user'));
                //邀请码
                let str4 = '邀请码';
                ctx.strokeText(str4, 45 + qrcodewidth + 10 + 2, bodyWidth + headerwidth + 30 + 20);
                ctx.strokeStyle = 'red';
                let str3 = user.ma;
                ctx.strokeText(str3 + 5, 45 + qrcodewidth, bodyWidth + headerwidth + 50 + 20);


                //  下载 图片


                console.log(canvas.toDataURL("image/jpeg", 1.0), 'canvas@@@@@@@@@');
                // ctx.save();
                // ctx.stroke();
                setTimeout(() => {

                    this.canvasurlimage = canvas.toDataURL("image/jpeg", 1.0);
                    console.log(this.canvasurlimage)
                }, 600)


            },
            //关闭页面
            removeCanvas() {
                this.$emit('showCanvas', false);
            },
            _getdislist(cid) {
                console.log(cid, 'this.detailId');
                let apiurl = 'v1/shop/goods/get-sku';
                let data = {
                    id: cid ? cid : 204
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '商品详情数据');
                    let resList = res.data;

                    this.contentbox = resList;
                    console.log(resList, '商品详情数据');
                    // this.initDraw()
                })
            },
            //获取店铺信息
            _getstodislist(id){
                let apiurl = 'v1/shop/store/get';
                let data={
                    id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'获取店铺信息');
                    let reslist = res.data;
                    this.shophometitle = reslist;
                    // this.initDrawstor();
                })
            },
            // 初始化画布  店铺
            // initDrawstor() {
            //     let canvas = this.$refs.canvas;
            //     let ctx = canvas.getContext('2d');
            //     console.log(this.shophometitle,'this.shophometitle')
            //     const contentbox = this.shophometitle;
            //     let bodyWidth = document.documentElement.clientWidth;
            //     let bodyHeight = document.documentElement.clientHeight;
            //     let titlehtight = 50;
            //     let titleY = bodyWidth + 20;
            //     let headerwidth = 50;
            //     let qrcodewidth = 80;
            //     // 		铺底色
            //     canvas.width = bodyWidth;
            //     canvas.height = bodyHeight - bodyHeight * 0.16;
            //     ctx.fillStyle = "#fff";
            //     ctx.fillRect(0, 0, canvas.width, canvas.height);
            //
            //
            //     //店铺头像
            //     let img = new Image();
            //     img.crossOrigin = "anonymous"; //关键 跨越
            //     img.src = contentbox.header;
            //     img.onload = () => {
            //         ctx.drawImage(img, 0, 0, bodyWidth, bodyWidth);
            //     };
            //
            //     // // 用户头像
            //     // let userimg = new Image(); // 头像
            //     // userimg.crossOrigin="anonymous";
            //     // let userimage = localStorage.getItem('tellertx');
            //     // userimg.src = userimage;
            //     // userimg.onload=()=>{
            //     //     ctx.drawImage(userimg, 15,bodyWidth+5, headerwidth,headerwidth);
            //     // }
            //
            //     // 邀请码
            //     let qrcodeimg = new Image();
            //     qrcodeimg.src = 'http://39.98.249.37:5300/api/file/default/ulam.png';
            //     console.log(qrcodeimg, 'qrcode');
            //     qrcodeimg.crossOrigin = "anonymous";
            //     qrcodeimg.onload = () => {
            //         ctx.drawImage(qrcodeimg, 15, bodyWidth + headerwidth + 20, qrcodewidth, qrcodewidth);
            //     }
            //
            //     //APP  loge 图片
            //     ctx.arc(bodyWidth - 15 - qrcodewidth, bodyWidth + headerwidth + 20, qrcodewidth / 2, 0, 0, true);
            //
            //     let loge = document.getElementById('loge');
            //     loge.crossOrigin = "anonymous";
            //     console.log(loge);
            //     ctx.drawImage(loge, bodyWidth - 15 - qrcodewidth, bodyWidth + headerwidth + 20, qrcodewidth, qrcodewidth);
            //
            //
            //     ctx.strokeStyle = '#000';
            //     ctx.font = "normal  normal 400  14px Arial";
            //     //店铺名
            //     let str1 = contentbox.name;
            //     if (str1.length > 29) {
            //         str1 = str1.substr(0, 28) + "...";
            //         console.log(str1)
            //     }
            //     ctx.strokeText(str1, 15, titleY + 25);
            //     //店铺名
            //     // let str2 = contentbox.storeName;
            //     // ctx.strokeText(str2, 15, titleY);
            //
            //     let user = JSON.parse(localStorage.getItem('user'));
            //     //邀请码
            //     let str4 = '邀请码';
            //     ctx.strokeText(str4, 45 + qrcodewidth + 10 + 2, bodyWidth + headerwidth + 30 + 20);
            //     ctx.strokeStyle = 'red';
            //     let str3 = user.ma;
            //     ctx.strokeText(str3 + 5, 45 + qrcodewidth, bodyWidth + headerwidth + 50 + 20);
            //
            //
            //     //  下载 图片
            //
            //
            //     console.log(canvas.toDataURL("image/jpeg", 1.0), 'canvas@@@@@@@@@');
            //     // ctx.save();
            //     // ctx.stroke();
            //     setTimeout(() => {
            //
            //         this.canvasurlimage = canvas.toDataURL("image/jpeg", 1.0);
            //         // console.log(this.canvasurlimage)
            //     }, 600)
            //
            //
            // },
        }

    }
</script>

<style scoped lang="stylus">
  .leftsposition {
    position fixed
    left 20000px
    top 8%
  }

  .box {
    background #fff;
    margin 0 15px 5px
    border-radius 8px
  }

  .title {
    padding 5px 15px;
    background #fff
  }

  .text {
    color: #888;
    font-size: 12px;
  }

  .canimage {
    height auto;
    display block;
  }

  .images {
    width 90%;
    height auto;
    display block;
    margin 0 auto;
    border-radius 8px
  }

  .canvasbox
    width 100vw
    height 100vh
    position fixed
    z-index 4000
    bottom 0
    left 0
    background #f5f5f5

  .btom
    border 0
    outline 0
    display inline-block
    font-size 0.65rem
    text-align center
    padding 6px 0
    width 80%
    background #9a55ff
    border-radius 30px
    color #fff
</style>
