<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight-100 + 'px' }">

    <!--      <x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="fanhui1" style="position:fixed;width:100%;z-index: 999;">-->
    <!--       -->
    <!--      </x-header>-->
    <scroll class="main-content">
      <div>
        <div style="height:45px;"></div>
        <div>
          <div style="padding: 0 20px">
            <textarea class="textes" v-focus="islode" placeholder="说出此刻的想法..." v-model="newt" :rows="5"></textarea>
          </div>

          <div style="margin-top:10px;padding:15px;box-sizing:border-box;">

            <!--      v-if="ipaths.length>0"    -->
            <div style="font-size: 0;">
              <div style="display: inline-block;margin-right: 5px;margin-bottom: 5px" v-for="(todo,index) in ipaths" :key="index">
                <div style="position:relative;width: 100px;height: 100px;overflow: hidden">
                  <img @click="rotateImage(todo.src)" :src="todo.src" alt=""
                       style="width:200px;overflow:hidden;height:auto;">
                  <img v-on:click="qudt(index)"
                       src="@/assets/wen/heid.png" alt="" style="width:20px;height:auto;position:absolute;top:0px;right:0;">
                </div>
              </div>
              <div style="display: inline-block;margin-right: 5px">
                <div style="display: flex;justify-content: end;align-items: center;"
                     v-if="ipaths.length<9 && !vsrc" v-on:click="xuantu">
                  <img src="@/assets/wen/tu.png" alt="" style="width: 100px;height: 100px;display: block">
                </div>
              </div>
            </div>

            <div style="clear: both;"></div>
            <div v-if="vsrc">
              <div style="height: 200px;overflow: hidden;position: relative">
               <div style="position: absolute;top: 30px;width: 100%">
                 <video id="video" :src="vsrc" width="100%" controls ref="gaoshi" autoplay></video>
               </div>
                <div style="position: absolute;right: 0;top: 0px;">
                  <icon type="cancel" @click.native="deltu" style=""></icon>
                </div>
              </div>


              <flexbox :gutter="0" align="flex-start">
                <flexbox-item :span="pxian?10:7">


                </flexbox-item>
                <flexbox-item>

                </flexbox-item>
              </flexbox>
            </div>
          </div>

          <div style="height: 60px"></div>


          <div slot="right" v-bind:class="[niul ? 'niu2': 'niu1'] " class="backcolors" v-on:click="fatie">
            发表
          </div>
        </div>
        <div style="height:45px;"></div>
      </div>
    </scroll>




    <backColor v-if="videoflag">
<!--          -->
      <div style="width: 85%;margin: 18vh auto 0;background: #fff;border-radius: 6px">
          <div style="padding: 10px 15px">

            <div  style="text-align: center;line-height: 60px;color: #999">
              视频过大是否后台上传?
            </div>

            <div style="height: 25px"></div>

            <div style="display: flex;justify-content: space-between">
              <div class="botmNO"  @click="nobuguan">取 消</div>
              <div style="width: 40px"> </div>
              <div class="botmOk" @click="okshanchuan">确 定</div>
            </div>
            <div style="height: 25px"></div>
          </div>
      </div>
    </backColor>



    <!--弹窗-->
    <actionsheet
      v-model="show7"
      :menus="menu7"
      theme="android"
      style="top:20vh"
      @on-click-menu="click">
    </actionsheet>

    <rotateImage v-if="isrotateImage" :images="rotateImages" @guanbirotateImage="guanbirotateImage"></rotateImage>

    <loading :show="ss6" text="加载中.."></loading>
    <loading :show="ss8" :text="tishi"></loading>
    <loading :show="ss7" :text="tixing" width="15em"></loading>
    <toast v-model="ss1" type="text" :time="1500" is-show-mask width="18em">写点什么吧~</toast>
    <toast v-model="ss2" :time="1500" is-show-mask width="18em">{{tishi}}</toast>
    <toast v-model="ss3" type="cancel" :time="1500" is-show-mask width="18em">{{tishi}}</toast>
    <toast v-model="show67" type="cancel" :time="1500" is-show-mask width="18em">上传失败，图片过大</toast>
  </div>
</template>

<script>
  let vidao = ''
    import {
        Group,
        Cell,
        XHeader,
        XInput,
        Toast,
        Loading,
        XTextarea,
        Actionsheet,
        Icon,
        XButton,
        Flexbox,
        FlexboxItem
    } from 'vux'
    import rotateImage from "../../base/enlargeImage/enlargeImage";
    import scroll from "../../base/scroll/scroll";
    import backColor from "../../base/backColor/backColor";
    export default {
        name: "shequadd",
        components: {
            scroll,
            backColor,
            Cell,
            Group,
            XHeader,
            XInput,
            Toast,
            Loading,
            XTextarea,
            Actionsheet,
            Icon,
            XButton,
            Flexbox,
            FlexboxItem,
            rotateImage
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    console.log(el, {value})
                    if (value) {
                        el.focus();
                    }
                }
            },
        },
        data() {
            return {
                lodinglv: './static/lodinglv.gif',
                isrotateImage: false,
                videoflag:false,
                islode: false,
                show67:false,
                rotateImages: '',
                newt: '',
                addtu: '',
                show7: false,
                menu7: {me1: "拍照", me2: "从相册选择",me3:'15s小视频'},
                ss6: false,
                niul: false,
                ss1: false,
                ss7: false,
                ss8: false,
                users: '',
                tishi: '',
                ss2: false,
                ss3: false,
                bodyHeight: '',
                cmr: '',
                vsrc: '',
                neirong: '等待上传.',
                vpath: '',
                tixing: '链接中..',
                ipath: '',

                surl: this.apiurlCommunity,
                pxian: false,
                ipaths: [
                    ],
            }
        },
        mounted() {

            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }

            let that = this
            that.bodyHeight = document.documentElement.clientHeight
            let message = localStorage.getItem('user');
            message = JSON.parse(message)
            if (!message) {
                that.$router.push('/zhu')
                return
            }
            that.users = message


        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        watch: {
            //  监听帖子内容
            newt(newb, oldb) {
                let that = this
                if (newb.length > 0) {
                    that.niul = true
                } else {
                    that.niul = false
                }
            },
            show67(){
                setTimeout(()=>{
                    this.show67 = false;
                },1200)
            }
        },

        methods: {
            blur(){
                this.islode = false;
                document.activeElement.blur();
                console.log('@@@@@@@@@@@@@@@,执行')
            },
            //继续上传
            nobuguan(){
                this.ss7 = true;
                this.videoflag = false;
            },
            //后台上传
            okshanchuan(){
                this.ss7 = false;
                this.videoflag = false;
                this.$emit('totitle', 3)
            },
            //返回
            goBack(){
               this.$emit('tagglefid')
            },
            //图片关闭
            guanbirotateImage() {
                this.rotateImages = '';
                this.isrotateImage = false;
            },
            //图片放大
            rotateImage(src) {
                this.rotateImages = src;
                this.isrotateImage = true;
            },
            //删除指定多图
            qudt(a) {
                console.log('删除的图为:' + a)
                this.ipaths.splice(a, 1);
            },
            //去除图片
            deltu() {
                this.addtu = ''
                this.vsrc = ''
                this.neirong = ''
                this.vpath = ''
            },
            //发帖
            fatie() {
                console.log( '这个是个什么玩意');
                let that = this;
                this.islode = false;
                document.activeElement.blur()
                let plus = window.plus;
                if (that.niul) {
                    //还需要判断是否有视频
                    that.ss7 = true;
                    let task = plus.uploader.createUpload(that.surl + '/create-article',
                        {method: "POST", priority: 100, retry: 3},
                        function (t, status) {
                            that.ss7 = false;
                            console.log(t, '这个是个什么玩意');
                            let resp = JSON.parse(t.responseText)
                            that.tishi = resp.msg;
                            // 上传完成

                            if (resp.status == 'success') {
                                alert('您的最新动态已上传')
                                that.ss2 = true;
                                setTimeout(() => {
                                    that.$emit('totitle', 3)

                                    that.ipaths = [];
                                    that.newt = '';
                                    that.vsrc = ''

                                }, 600)
                            } else {
                                if (!that.tishi) {
                                    that.tishi = '网络出错！请重新出错'
                                }
                                that.ss3 = true
                                that.show67 = true
                            }
                        }
                    );

                    if (that.ipaths.length > 0) {
                        for (let i in that.ipaths) {
                            let nnm = "file" + (parseInt(i) + 1)
                            task.addFile(that.ipaths[i].src, {key: nnm});
                        }
                    } else if (that.vpath) {
                        task.addFile(that.vpath, {key: "video"});
                        task.addData("isHorizontal", that.pxian ? "true" : "false");
                    }
                    task.addData("user", that.users.hu);
                    task.addData("password", that.users.mima);
                    task.addData("content", that.newt);
                    task.addData("isRedpacket", "false");
                    //采用监听
                    task.addEventListener("statechanged", onStateChanged, false);
                    task.start();

                    //2.监听方法
                    function onStateChanged(upload, status) {
                        switch (upload.state) {
                            case 2:
                                that.tixing = '上传中..';
                                break;
                            case 3:
                                let ck = Math.floor((upload.uploadedSize / upload.totalSize) * 100);
                                console.log(ck,'@@@@@@@@@@@@@@')
                                if (ck == 100) {
                                    that.tixing = "上传" + ck + "%";
                                    setTimeout(() => {
                                        that.videoflag = true;
                                        that.tixing = "正在上传到服务器..";
                                    }, 2200)
                                } else {
                                    that.tixing = "上传" + ck + "%";
                                }
                                break;
                        }
                    }
                } else {
                    that.ss1 = true
                }
            },
            //选择图片
            click(key) {
                let that = this
                if (key == 'me1') {
                    console.log("拍照")
                    that.getImage1()
                } else if (key == 'me2') {
                    console.log("相册")
                    that.xuanqu1()
                } else if (key == 'me3') {
                    console.log("短视频")
                    that.sc1()
                }
            },
            //拍视频
            sc1() {
                let that = this;
                let plus = window.plus;
                that.cmr = plus.camera.getCamera(); // 初始化摄像头  调用的关键
                let gos = that.cmr.supportedVideoResolutions.length
                let res = that.cmr.supportedVideoResolutions[gos - 2];   // 获取手机支持的视频分辨率，默认获取第一个(这样写的情况下)
                let fmt = that.cmr.supportedVideoFormats[0];  // 获取手机支持的视频格式，默认获取第一个(这样写的情况下)
                // alert("分辨率: " + res);
                that.cmr.startVideoCapture(
                    function (path) {
                        // plus.nativeUI.toast("拍摄视频成功: " + path);
                        //通过路劲查询文件
                        plus.io.resolveLocalFileSystemURL(path,
                            function (entry) {
                                that.vsrc = entry.toLocalURL();
                                entry.file(function (file) {
                                    let fileSize = file.size / 1024;
                                    // that.newt = "视频文件:"+ (fileSize/1024).toFixed(2) +'MB,时长:' + file.duration
                                    // for(let i in file){
                                    //   let property=file[i];
                                    //   that.newt+=i+" = "+property+"\n";
                                    // }
                                    // alert(that.newt)
                                    if (fileSize > 81920) {
                                        alert("视频文件超过了80MB，请重新拍摄或选择！");
                                    } else {
                                        // 压缩视频为zip
                                        that.compressvideo(entry.toLocalURL(), entry.name)
                                    }
                                })
                                // 画布一下视频
                                setTimeout(() => {
                                    let vi = that.$refs.gaoshi
                                    let ww = vi.offsetWidth
                                    let hh = vi.offsetHeight
                                    if (hh > ww) {
                                        that.pxian = false
                                    } else {
                                        that.pxian = true
                                    }
                                    // plus.nativeUI.toast("宽:"+ ww +',高:'+hh);
                                }, 600)
                            },
                            function (e) {
                                alert("读取视频错误：" + e.message);
                            });
                    },
                    function (error) {
                        // alert( "拍摄视频失败: " + error.message );
                    },
                    // 指定参数
                    {resolution: res, format: fmt, index: 1, videoMaximumDuration: 15}
                );
            },
            //【第一张  调用手机摄像头并拍照
            getImage1() {
                let that = this;
                let plus = window.plus;
                let cmr = plus.camera.getCamera();
                cmr.captureImage(function (p) {
                    that.ss6 = true
                    // alert('原始路劲：'+ p)
                    plus.io.resolveLocalFileSystemURL(p, function (entry) {
                        // that.addtu = entry.toLocalURL()
                        that.compressImage1(entry.toLocalURL(), entry.name);
                    }, function (e) {
                        plus.nativeUI.toast("读取拍照文件错误：" + e.message);
                        that.ss6 = false
                    });
                }, function (e) {
                }, {
                    filter: 'image'
                });
            },
            //压缩视频文件尝试
            compressvideo(url) {
                let that = this;
                let plus = window.plus;
                let name = "_doc/upload/" + Date.now() + '.zip';
                plus.zip.compress(
                    url,  //压缩转换原始文件的路径
                    name, //压缩转换目标图片的路径
                    function () {
                        plus.nativeUI.toast("压缩文件成功！"+name);
                        that.vpath = name;
                        that.niul = true;
                    }, function (error) {
                        plus.nativeUI.toast("压缩图片失败，请稍候再试");
                        that.ss6 = false,
                        that.show67 = true
                    });
            },
            //压缩图片
            compressImage1(url, filename) {
                let that = this;
                let plus = window.plus;
                let name = "_doc/upload/" + filename;
                plus.zip.compressImage({
                        src: url,  //src: (String 类型 )压缩转换原始图片的路径
                        dst: name, //压缩转换目标图片的路径
                        quality: 40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                        overwrite: true//overwrite: (Boolean 类型 )覆盖生成新文件
                    },
                    function (zip) {
                        that.ss6 = false
                        //页面显示图片
                        that.ipaths.push({'src': zip.target, 'up': name});

                        if(that.ipaths.length > 0){
                            that.niul = true;
                        }

                    }, function (error) {
                        plus.nativeUI.toast("压缩图片失败，请稍候再试");
                        that.ss6 = false
                    });
            },
            //图片显示
            showPics1(url) {
                let that = this;
                let plus = window.plus;
                //另外加的保存圖片
                plus.io.resolveLocalFileSystemURL(url, function (entry) {
                    entry.file(function (file) {
                        //原来的
                        let fileReader = new plus.io.FileReader();
                        fileReader.readAsDataURL(file);     // 读出 base64
                        fileReader.onloadend = function (e) {
                            that.ss6 = false
                            let picUrl = e.target.result.toString(); // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
                            that.addtu = picUrl
                        }
                    });
                });
            },
            // 相冊选取
            xuanqu1() {
                let that = this;
                let plus = window.plus
                plus.gallery.pick(function (path) {
                        that.ss6 = false;
                        that.panxuan(path)
                    }, function (err) {
                        that.ss6 = false
                        console.log('相册选取失败: ' + err.message);
                    },
                    //第三个参数 为选取什么，none 是都可以选择
                    {
                        filter: "none", multiple: true, maximum: 9,
                        onmaxed: function () {
                            plus.nativeUI.alert('最多只能选择9张图片');
                        }
                    })
            },
            //判断是视频还是图
            panxuan(a) {
                let plus = window.plus;
                let that = this
                //拿到的就是数组
                let nfils = a.files
                let cca = nfils.length
                let arr = []
                //循环值
                for (let i in nfils) {
                    arr.push(that.dxpan(nfils[i]))
                }
                //循环判断的值
                let ak = arr.indexOf("shi");
                if (ak > -1 && cca == 1) {
                    // 判断为视频。多选只能选择一个
                    //   plus.nativeUI.toast("相册选择了视频"); 如果之前选择的相片，就清除
                    if (that.ipaths.length > 0) {
                        that.ipaths = []
                    }
                    that.xuanshi(nfils[0])
                } else if (ak > -1 && cca > 1) {
                    //  不合格
                    plus.nativeUI.toast("视频不能进行多选!");
                } else {
                    // plus.nativeUI.toast("相册选择了图片");
                    // that.ipaths = []
                    for (let i in nfils) {
                        let zzs = that.dxpan2(nfils[i])
                        if (zzs == '.gif' || zzs == '.GIF') {
                            that.ipaths.push({'src': nfils[i], 'up': Date.now() + i + zzs})

                            that.niul = true;

                        } else {
                            that.compressImage2(nfils[i], Date.now() + i + zzs)

                        }
                    }
                }
            },
            //返回文件的后缀
            dxpan2(a) {
                let ac = a.lastIndexOf('.')
                return a.substr(ac)
            },
            compressImage2(url, filename) {
                let that = this;
                let plus = window.plus;
                let name = "_doc/upload/" + filename;
                plus.zip.compressImage({
                        src: url,  //src: (String 类型 )压缩转换原始图片的路径
                        dst: name, //压缩转换目标图片的路径
                        quality: 40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                        overwrite: true//overwrite: (Boolean 类型 )覆盖生成新文件
                    },
                    function (zip) {
                        that.ipaths.push({'src': zip.target, 'up': name})
                        that.niul = true;
                    }, function (error) {
                        plus.nativeUI.toast("压缩图片失败，请稍候再试");
                        that.ss6 = false
                    });
            },
            //相册多选判断
            dxpan(a) {
                let ac = a.lastIndexOf('.')
                let ntu = a.substr(ac + 1)
                let data = ['jpeg', 'png', 'gif', 'jpg', 'JPEG', 'PNG', 'GIF', 'JPG'];
                let bj = data.indexOf(ntu);
                //0为视频
                if (bj < 0) {
                    return 'shi'
                } else {
                    return 1
                }
            },
            //相册选择视频
            xuanshi(path) {
                let that = this
                let plus = window.plus;
                plus.io.resolveLocalFileSystemURL(path,
                    function (entry) {
                        that.ss6 = false
                        entry.file(function (file) {
                            let fileSize = file.size / 1024;
                            if (fileSize >43100) {
                                alert("视频文件超过了42MB，请重新拍摄或选择！");
                                that.vsrc = ''
                                return
                            }
                            that.vsrc = entry.toLocalURL();
                            // 画布一下视频
                            setTimeout(() => {
                                let vi = that.$refs.gaoshi
                                let ww = vi.offsetWidth
                                let hh = vi.offsetHeight
                                if (hh > ww) {
                                    that.pxian = false
                                } else {
                                    that.pxian = true
                                }
                            }, 600)
                            // 压缩视频为zip
                            that.compressvideo(entry.toLocalURL(), entry.name)
                        })
                    },
                    function (e) {
                        alert("读取错误：" + e.message);
                    });
            },
            xuantu() {
                this.show7 = true
            },
            fanhui1() {
                this.$router.push('/index')
            }
        }
    }
</script>

<style scoped>
  .main-content{
    height: 86vh;
    overflow: hidden;
    position: relative;
  }
  .weui-skin_android .weui-actionsheet {
    top: 43%
  }

  .sc {
    height: 45px;
    width: 50%;
    background: #7d83ed;
    color: #fff;
    line-height: 45px;
    text-align: center;
  }

  .sc1 {
    height: 45px;
    width: 50%;
    background: red;
    color: #fff;
    line-height: 45px;
    text-align: center;
    float: right;
  }

  .niu1 {
    font-size: 14px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    height: 30px;
    line-height: 30px;
    width: 80%;
    padding: 2px 0;
    margin: 25px auto 0;
  }

  .niu2 {
    width: 80%;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    height: 30px;
    line-height: 30px;
    padding: 2px 0;
    margin: 25px auto 0;
  }

  .textes {
    border: 0;
    outline: 0;
    width: 100%;
    background: #f5f5f5;
    line-height: 20px;
    font-size: 16px;
    caret-color: #9a55ff;
  }

  textarea::-webkit-input-placeholder {
    color: rgb(136, 136, 136);
    line-height: 20px;
    font-size: 16px;
  }
</style>
