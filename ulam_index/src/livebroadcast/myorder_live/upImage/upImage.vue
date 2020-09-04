<template>
  <div style="width: 100%" id="upimg">
<!--    <el-upload-->
<!--      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--      list-type="picture-card"-->
<!--      :on-preview="handlePictureCardPreview"-->
<!--      :on-remove="handleRemove"-->
<!--      :before-upload="beforeAvatarUpload"-->
<!--    >-->
<!--      <div>-->
<!--        <i class="el-icon-plus"></i>-->
<!--      </div>-->
<!--    </el-upload>-->


<!--    上传 直播图片 -->
<!--    <imgCut  @callback="callback" :height="height" :width="width" style="width:80px;height:80px;color:white;background: #ccc;display: flex;justify-content: center;align-items: center;position: relative">-->
<!--      <div style="position: absolute;width: 100%;display: flex;align-items: center;justify-content: center">-->
<!--        <i class="el-icon-plus" style="font-size: 30px"></i>-->
<!--      </div>-->
<!--    </imgCut>-->
  </div>
</template>

<script>
    import {imgCut} from 'vue-imgcut'
    const axios = require('axios');
    export default {
        name: "upImage",
        components:{
            imgCut
        },
        props: {
            Upimagenum:{
                type:Number,
                default:1,

            }
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                auto: false,
                headerImage: '',
                picValue: '',
                width:300,
                height:420,
            };
        },
        methods: {


            //选图片
            xuanqu1() {
                let that = this;
                let plus = window.plus;
                plus.gallery.pick(function (path) {

                        var timestamp = Date.parse(new Date());
                        that.compressImage1(path,timestamp)
                    }, function (err) {
                        console.log('相册选取失败: ' + err.message);
                    },
                    //第三个参数 为选取什么，none 是都可以选择
                    {
                        filter: "image",
                    })
            },
            // 请求图片名
            //压缩图片
            compressImage1(url, filename) {
                let that = this;
                let plus = window.plus;
                let name = "_doc/upload/" + filename;
                plus.zip.compressImage({
                        src: url,  //src: (String 类型 )压缩转换原始图片的路径
                        dst: name, //压缩转换目标图片的路径
                        quality: 40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                        overwrite: true,//overwrite: (Boolean 类型 )覆盖生成新文件width
                        width:'600px',
                        height:'1000px'
                    },
                    function (zip) {

                        //上传图片
                        var timestamp = Date.parse(new Date());
                        that.getBase64FromImageURL(zip.target,(res)=>{
                            that.getimageItem(that.getFileFromBase64(res,timestamp));
                        })


                    }, function (error) {
                        plus.nativeUI.toast("压缩图片失败，请稍候再试");
                    });
            },
            //转换base4
            getBase64FromImageURL(url, callback) {
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    img = new Image;
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    canvas.height = img.height;
                    canvas.width = img.width;
                    ctx.drawImage(img, 0, 0);
                    var base64URL = canvas.toDataURL('image/png');
                    callback(base64URL);
                    canvas = null;
                };
                img.src = url;
            },
            /* 将base64转换为file类型 */
            getFileFromBase64(base64URL, filename) {
                var arr = base64URL.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            },









            //读取头像文件的方法
            isImgStyle3(e){
                let that = this
                //获取并记录图片的base64编码
                // let newima = new Blob([e],{type:'image/jpeg'})
                let reader = new FileReader();
                reader.readAsDataURL(e); // 读出 base64
                reader.onload = function() {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
                    that.tutu = reader.result;//base64
                };
            },
            //裁剪头像的组件
            callback(img){
                console.log(img,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                let file =  this.dataURItoBlob(img);
                this.uploadSectionFile(file)
            },
            //将base64 转化为二进制文件
            dataURItoBlob(dataURI){
                let byteString = atob(dataURI.split(',')[1]);
                // let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                let ab = new ArrayBuffer(byteString.length);
                let ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++){
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab],{type: 'image/jpeg'});
            },

















            handleRemove(file, fileList) {

                console.log(file, fileList);

            },
            handlePictureCardPreview(file) {
                console.log(file, 'fordate');
                this.$emit('addshopImage', file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file) {

                console.log(file, 'fordateattttttttttttt');

                this.uploadSectionFile(file)


                return false
            },
            getimageItem(file) {
                var str = URL.createObjectURL(file);
                let formdata = new FormData();
                formdata.append('from', 'live-background');
                formdata.append('file', file);
                const url = `http://39.98.249.37:5006/api/auth/uploadOne`;
                console.log(formdata, '@@@@@');
                let tokens = localStorage.getItem('token');
                let that = this;
                axios.post(url, formdata, {
                    headers: {
                        'content-type': 'application/json',
                        "token": tokens
                    }
                })
                    .then((res) => {
                        console.log(res.data, "@@@@@@@@@@@@@@@@");
                        let image = res.data.data;
                        that.$emit('addshopImage', image, str);  //上传企业资质图

                    });
            },

            uploadSectionFile(file) { //	附件上传
                let f = {file: file}
                let self = this;
                let Orientation;
                let ndata;

                if (f.file.size <= 1 * 1024 * 1024) {
                    //判断图片是否大于1M,是就直接上传
                    console.log('直接上传');
                    ndata = f.file;
                    self.getimageItem(ndata);

                } else {
                    //反之压缩图片
                    let reader = new FileReader();
                    // 将图片2将转成 base64 格式
                    reader.readAsDataURL(f.file);
                    console.log(reader)
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        let result = this.result;
                        let img = new Image();
                        img.src = result;
                        img.onload = function () {
                            let data = self.compress(img, Orientation);
                            self.headerImage = data;
                            ndata = self.compress(img, Orientation);

                            //BASE64转图片
                            var arr = ndata.split(','), mime = arr[0].match(/:(.*?);/)[1],
                                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                            while (n--) {
                                u8arr[n] = bstr.charCodeAt(n);
                            }
                            ndata = new File([u8arr], f.file.name, {type: mime});

                            self.getimageItem(ndata);


                        }
                    }
                }
            },
            compress(img, Orientation) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    // console.log("大于400万像素")
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                // 		铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制
                let count;
                if ((count = width * height / 1000000) > 1) {
                    // console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                    //            计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //修复ios上传图片的时候 被旋转的问题
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            this.rotateImg(img, 'left', canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            this.rotateImg(img, 'right', canvas);
                            break;
                        case 3://需要180度旋转
                            this.rotateImg(img, 'right', canvas);//转两次
                            this.rotateImg(img, 'right', canvas);
                            break;
                    }
                }
                //进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.8);

                // console.log('压缩前：' + initSize);
                // console.log('压缩后：' + ndata.length);
                // console.log("ndata:"+ndata)
                //
                // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;


                return ndata;
            }

        }
    }
</script>

<style  >
  .el-upload--picture-card {
    border: 0;
  }
  #upimg .el-upload{
    width: 100%;
    height: 80px!important;
    line-height: 80px;
  }
</style>
