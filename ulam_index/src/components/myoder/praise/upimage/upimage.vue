<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handleRemove"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList"
    list-type="picture">
<!--    <el-button size="small" type="primary"></el-button>-->
    <span style="font-size: 14px;" class="but">点击上传图片</span>
  </el-upload>

</template>

<script>
    const axios = require('axios');
    export default {
        data() {
            return {
                fileList: [],
                imagearr:[]
            };
        },
        watch:{
            fileList(fileList,newfileList){
                console.log(fileList,'@@',newfileList);
                this.handlePreview()
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            //
            beforeAvatarUpload(file) {
                console.log(file,'1111111111');
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 / 1024 < 3;

                if (!isJPG) {
                    this.$message.error('上传评论图片只能是 `JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!');
                }

                let formdata = new FormData();
                formdata.append('from',"goods-comment");
                formdata.append('file',file);
                const url =  `${this.apiurlShop}/api/auth/uploadOne`;
                console.log(formdata,'@@@@@');
                let tokens = localStorage.getItem('token');
                axios.post(url, formdata,{
                    headers: {
                        'content-type': 'application/json',
                        "token": tokens
                    }
                }).then( (res)=> {
                    console.log(res.data,"@@@@@@@@@@@@@@@@");
                    let image = res.data.data;
                    let imgarr = this.imagearr;
                    imgarr.push(image.name);

                    this.imagearr = imgarr;

                    this.$emit('addimageslist',this.imagearr);
                    console.log(imgarr)
                });

                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped lang="stylus">
  .but
    display inline-block
    line-height 0.8rem
    color #ffffff
    font-size 14px
    padding 0.1rem 0.5rem
    text-align center
    background #9a55ff
    border-radius 25px
</style>
