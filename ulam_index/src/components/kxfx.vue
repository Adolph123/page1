<template>
  <div style="position: fixed;width: 100%;left: 0;top: 0;z-index: 25100;background: #fff;min-height: 100vh">
    <div style="position: absolute;top: 0;left: 0;background: rgba(0,0,0,0);z-index: 100" >
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="goBack">
          <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff"> </span>
          </div>
        </div>

      </div>
    </div>

    <scroll class="main-content">
      <div>
        <div class="kxbg" ref="box">
          <div>
            <img src="@/assets/quanxun.png" alt="" style="width:100%;">
          </div>
          <!--文章信息-->
          <div class="nk" v-if="shuju">
            <!--标题-->
            <div style="width:100%;font-weight:700;line-height: 20px;font-size: 16px">
              <p style="color: rgb(68,68,70);font-weight: 700">{{biaoti(shuju.content)}}</p>
            </div>
            <!--时间-->
            <div style="margin:20px 0;">
              <p style="color:#888;font-weight:400;font-size:12px;">
            <span style="color: rgb(167, 167, 167)">
                <!--{{ new Date(parseInt(shuju.created_at) * 1000).toLocaleString('chinese',{hour12:false}) }}-->
                {{timestampToTime(parseInt(shuju.created_at) * 1000)}}
             </span>
                <rater v-model="date" :font-size="18" disabled style="float: right;"></rater>
              </p>
            </div>
            <div style="clear: both;"></div>
            <!--内容    class="text"       neir(shuju.content)   -->
            <div style="margin-top:13px;color:#414344;font-size:14px;line-height:1.4;">
              <p style="color: rgb(68,68,70)">{{shuju.content}}</p>
            </div>


            <div class="content" style="margin-top: -80px">
              <div style="height: 120px"></div>
              <div class="contentbox">

                <div style="margin-top: 5px">
                  <div style="color: rgb(143,142,142);font-size: 14px;position: absolute;bottom:0;line-height: 15px">
                    分享来自ULAM矿池APP
                  </div>


                </div>
                <!--下载二维码-->
                <div style="width:80px;text-align: center;z-index:997;">
                  <img src="@/assets/icos/teller.png" alt="" style="width:80px;">
                  <div style="font-size:10px;color: rgb(167,167,167);line-height: 15px">下载了解更多</div>
                </div>
              </div>
              <div style="color: #9a55ff;font-size: 14px;margin-top: 10px">
                ULAM,达成共识竟如此简单!
              </div>
              <div style="height: 20px"></div>
            </div>

            <div style="height: 20px"></div>
          </div>

        </div>
        <div style="height: 140px"></div>
      </div>
    </scroll>






    <Loading v-model="loadings" text="正在保存到相册"></Loading>

    <!--底部导航-->
    <div
      style="position:fixed;bottom:0;width:100%;z-index:998;font-size: 12px;background: #fff;height: 130px;border-top: 0.5px solid #f5f5f5">
      <div style="height: 10px"></div>
      <div style="line-height: 16px;padding: 0 15px;color: #000">
        ULAM是由清华大学密码学博士研发的底层共识算法创新项目，是即POW，POS，DPOS, PBFT类共识算法之后的第五个在共识算法上有重大创新的区块链项目。
      </div>
      <div style="line-height: 30px;padding: 0 15px;color: #000">
        项目网站：http://www.ulamchain.io
      </div>

      <div @click="save1"
           style="font-weight: 400;border-top: 1px solid #f5f5f5;color: #9a55ff;font-size: 15px;display: flex;align-items: center;justify-content: center;height: 40px">
        点击保存分享快讯
      </div>
    </div>
  </div>
</template>

<script>
    import html2canvas from 'html2canvas'
    import {Group, Cell, XHeader, XInput, XButton, Confirm, Actionsheet, Loading, Popup, Divider, Rater} from 'vux'
    import scroll from "../base/scroll/scroll";
    export default {
        name: "kxfx",
        components: {
            Cell, Group, XHeader, XInput, XButton, Confirm, Actionsheet, Loading, Popup, Divider, Rater,scroll
        },
        props:{
            flashDetailitem:{
                type:Object,
                default:()=>{
                    return {}
                }
            }
        },
        data() {
            return {
                shuju: '',
                date: 0,
                list: [3, 3.5, 4, 4.5, 5],
                loadings: false
            }
        },
        mounted() {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            //  拿取参数
            let that = this
            that.shuju = that.flashDetailitem
            console.log(that.shuju)
            that.suishu()
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        methods: {
            goBack(){
              this.$emit('heidflashDetail')
            },
            timestampToTime(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '.' + m + '.' + d + '  ' + h + ":" + minute;
            },
            //  随机数字
            suishu() {
                // 只需要0-4的数字
                let a = Math.ceil(Math.random() * (4 - 0 + 1)) + (0 - 1)
                console.log(a)
                this.date = this.list[a]
            },
            save1() {
                this.loadings = true;
                let that = this;
                let plus = window.plus;
                setTimeout(() => {
                    //保存开始
                    // let canvas = document.getElementById("main");
//======第一
                    html2canvas(this.$refs.box, {scale: 2, logging: false, useCORS: true}).then(function (canvas) {
                        let type = 'png';
                        let imgData = canvas.toDataURL(type);
                        let bitmap = new plus.nativeObj.Bitmap();
                        let filename = "news_picture_" + (new Date()).getTime() + '.' + type;
                        bitmap.loadBase64Data(imgData);
// 保存Bitmap图片
                        bitmap.save(
                            "_doc/" + filename, {overwrite: true},
                            function (i) {
                                that.loadings = false
//保存到系统相册
                                plus.gallery.save(
                                    i.target,
                                    function (d) {
//销毁Bitmap图片
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
                            function () {
                                bitmap.clear();
                            }
                        );
                    });
                    //保存结束
                }, 500)
            },
            biaoti(a) {
                // console.log(a)
                let b = a.indexOf('】')
                return a.substr(1, b - 1)
            },
            neir(a) {
                let b = a.indexOf('】')
                let c = a.substr(b + 1).length
                if (c <= 260) {
                    return a.substr(b + 1)
                } else {
                    return a.substr(b + 1, 260) + ' . . .'
                }
            }
        }
    }
</script>

<style scoped>
  .main-content{
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .text {
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 9;*/
    /*-webkit-box-orient: vertical;*/
  }
  .mheaderheader {
    padding: 30px 0 1%;
    width: 94%;
    display: flex;
    margin: 0 auto;
    position: relative;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }
  .nk {
    padding: 15px;
    box-sizing: border-box;
    word-break: break-all;

  }

  .kxbg {
    width: 100%;
  }

  .content {
    width: 100%;
    background: url('../assets/wen/bg.png');
    background-size: 100%;
  }

  .contentbox {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
  }
</style>
