<template>
  <div style="width: 100%">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
    >
      <div>
        <i class="el-icon-plus"></i>
      </div>
    </el-upload>
    <!--    <el-dialog :visible.sync="dialogVisible">-->
    <!--      <img width="100%" :src="dialogImageUrl" alt="">-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "upimage",
        props: {
            Upimagenum:{
                type:Number,
                default:1
            }
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                auto: false,
                headerImage: '',
                picValue: '',
                fromlist:[ 'aaa' ,  'shop-return' , "goods-comment"]
            };
        },
        methods: {
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
                formdata.append('from', this.fromlist[this.Upimagenum]);
                formdata.append('file', file);
                const url = `${this.apiurlShop}/api/auth/uploadOne`;
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

                        that.$emit('addimageslist', image, str);//??

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

<style scoped lang="less">
  .el-upload--picture-card {
    border: 0;
  }
  .el-upload--picture-card{
    width: 78px!important;
    height: 78px!important;
  }
</style>
