<template>
  <div :style="{ height:bodyHeight + 'px'}" class="backcolorsss" style="font-size: 16px">
    <div class="back1" style="background:rgba(0,0,0,0);">
      <img src="@/assets/2_03.png" alt="" class="back2" style="width: 27px;height: auto" v-on:click="fhui">
    </div>

    <div style="height:70px;"></div>

    <div :style="{width:'100%',height: bodyHeight-47 + 'px',}"
         ref="box" style="padding-top:30px;box-sizing:border-box;">
      <div class="hezi">
        <div class="yiny">
          <div>
            <img :src="tutu" alt="" style="width:32px;margin-top:10px;margin-left:15px;border-radius:6px;">
          </div>
          <div style="line-height:55px;margin-left:15px;font-size:18px;">
            我的邀请链接
          </div>
        </div>

        <!--二维码-->
        <div style="text-align: center;">
          <p style="margin:20px 0;">邀请您使用ULAM矿池</p>
         <div style="display: flex;justify-content: center;align-items: center">
           <div id="qrcode" ></div>
         </div>
        </div>
        <div class="yma">
          <span>{{users.ma}}</span>
          <span v-on:click="copy" :data-clipboard-text="users.ma" :style="{color:icol,float:'right'}"
                class="fuzhi">复制邀请码</span>
        </div>
        <div  v-on:click="fenx" style=" border-radius: 25px;font-weight: 700;letter-spacing: 2px;width: 80%;height: 46px;line-height: 46px;text-align: center;margin-left: 10%;margin-top: 25px;padding: 0 15px;box-sizing: border-box;color: #fff;background-color:  #4955D3;">
          分享
        </div>
        <div style="height:15px;"></div>
      </div>
    </div>
    <loading :show="ss5" text="保存中.."></loading>
    <Toast v-model="ss3" :time="1000" is-show-mask text="复制成功~"></Toast>
  </div>
</template>
<script>
    import html2canvas from 'html2canvas'
    import Clipboard from 'clipboard';
    import QRCode from "qrcodejs2";
    import {Confirm, XHeader, Toast, Loading} from 'vux'

    export default {
        name: "hai",
        components: {Confirm, XHeader, Toast, Loading,QRCode },
        data() {
            return {
                bodyHeight: "", show: false, users: '', tutu: "./static/tx.png", ss3: false, ss5: false,
                link: 'https://download.ulamchain.io/ULAM/#/',
            }
        },
        created() {
            let user = JSON.parse(localStorage.getItem('user'));
            this.link = this.link+"?expand_web="+user.ma;
            this.$nextTick (function () {
                this.qrcode();
            })
        },
        computed: {
            icol() {
                // return this.$store.state.zuli.color;
				return "#4955D3";
            }
        },
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            let that = this
            that.bodyHeight = document.documentElement.clientHeight
            if (window.plus) {
                plus.navigator.setStatusBarBackground("#9a55ff");
            }
            let message = localStorage.getItem('user');
            message = JSON.parse(message)
            if (!message) {
                //跳转登陆
                that.$router.push('/zhu')
                return
            }
            //请求所有币的登陆。拿到总值
            that.users = message
            // 哪去头像
            that.dqtx1()
        },
        methods: {
            qrcode () {
                let that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 170,
                    height: 170,        // 高度
                    text:  this.link,   // 二维码内容
                    // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f',   // 背景色
                    // foreground: '#ff0'    // 前景色
                })
            },






            fhui() {
                this.$router.push('/user')
            },
            fenx() {
                this.ss5 = true;
                let that = this;
                let plus = window.plus;
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                // alert('正在保存到相册')
                setTimeout(() => {
                    html2canvas(that.$refs.box, {scale: 2, logging: false, useCORS: true}).then(function (canvas) {
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
                                        alert("已保存到相册");
                                        bitmap.clear();
                                    },
                                    function () {
                                        alert("保存失败", i);
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
            copy() {
                let clipboard = new Clipboard('.fuzhi')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.ss3 = true
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            },
            dqtx1() {
                let that = this;
                //先检查一下有没有内存
                let txs = localStorage.getItem('tellertx');
                if (txs) {
                    that.tutu = txs
                }
            },
        }
    }
</script>

<style scoped>
  .backcolorsss {
    background: #4955D3;
  }

/*  .anniu {
    border-radius: 6px;
    font-weight: 700;
    letter-spacing: 2px;
    width: 80%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    margin-left: 10%;
    margin-top: 25px;
    padding: 0 15px;
    box-sizing: border-box;
    color: #fff;
	background-color:  #4955D3;
  } */

  .yma {
    border-radius: 6px;
    width: 80%;
    height: 46px;
    line-height: 46px;
    background: #f5f5f5;
    margin-left: 10%;
    margin-top: 20px;
    padding: 0 15px;
    box-sizing: border-box;
  }

  .yiny {
    width: 100%;
    height: 55px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
  }

  .hezi {
    width: 80%;
    margin: auto;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
  }
</style>
