<template>
  <div class="sharewaper" @click.prevent="removeshare">
    <div class="sharebox" @click.stop="">
      <!--     分享布局   -->
<!--      <ul class="tab">-->
<!--        <li class="tab-item" v-for="(item,index) in strands" :key="index" @click="shareitem(index)" >-->
<!--          <div> <img :src="item.imgurl" alt=""></div>-->
<!--          <span class=" tab-link">{{item.name}} </span>-->
<!--        </li>-->
<!--      </ul>-->

      <ul class="tab" style="justify-content: end">
        <li class="tab-item" v-for="(item,index) in sharelist" style="width: 20%" :key="index" @click="tiaozhuanly(index)">
          <div> <img :src="item.imgurl" alt=""></div>
          <span class=" tab-link">{{item.name}} </span>
        </li>
      </ul>

      <Canva v-if="isCanvas" @showCanvas="showCanvas"  :store="store" :goodsId="goodsId"></Canva>

      <div @click="removeshare" class="removebtn">
        <div style="display: flex;justify-content: center">
          <span @click="removeshare">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    let imgUrls1=require('@/assets/icon/4_1.png');
    let imgUrls2=require('@/assets/icon/4_2.png');
    let imgUrls3=require('@/assets/icon/4_3.png');
    let imgUrls4=require('@/assets/icon/4_4.png');
    let imgUrls5=require('@/assets/icon/4_5.png');
    let imgUrls6=require('@/assets/icon/4_6.png');
    let imgUrls7=require('@/assets/icon/4_7.png');
    let imgUrls8=require('@/assets/icon/4_8.png');



    import Canva from './canvas/canvase'
    export default {

        name: "share",
        components:{Canva},
        props:{
            goodsId:{
                type:Number,
                default:0
            },
            store:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return{
                strands:[
                    {
                        name:'微信好友',
                        url:'',
                        imgurl:imgUrls7
                    },
                    {
                        name:'朋友圈',
                        url:'',
                        imgurl:imgUrls5
                    },
                    {
                        name:'QQ',
                        url:'',
                        imgurl:imgUrls4
                    },
                    {
                        name:'QQ空间',
                        url:'',
                        imgurl:imgUrls8
                    },
                    {
                        name:'新浪微博',
                        url:'',
                        imgurl:imgUrls6
                    },
                ],
                sharelist:[
                    // {
                    //     name:'复制链接',
                    //     url:'',
                    //     imgurl:imgUrls1
                    // },
                    {
                        name:'画报分享',
                        url:'',
                        imgurl:imgUrls2
                    }
                ],
                isCanvas:false,
            }
        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.togoBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.togoBack, false);
        },
        methods: {
            togoBack() {
                this.$emit('showShare',false)
            },
            //点击   复制链接 或者  跳转canvas
            tiaozhuanly(index){
                // if(index == 0){//复制链接
                //
                // }else{
                    //canvas


                        //分享店铺
                        this.isCanvas = true;
                        //分享商品




                // }

            },
            //跳转
            shareitem(index){
              if(index == 0){
                  //分享微信好友

              }
              if(index == 1){
                  //分享朋友圈
              }
              if(index == 2){
                  //分享到QQ
                this.shareToQQ()
              }
              if(index == 3){
                  //分享到QQ空间
                this.shareToRoom()
              }
              if(index == 4){
                  //分享到微博
                  this.shareToMicroblog()
              }
            },
            //关闭CANvas 页面
            showCanvas(){
                this.isCanvas = false;
            },
            //关闭页面
            removeshare(){
              this.$emit('showShare',false)
            },
            wxShare(index) {
                // let msg = {};
                // msg.type = 'web';
                // msg.title = 'XX软件名';
                // msg.content = '这里填一些分享信息，是在好友还未点进去看到的信息';
                // msg.thumbs = ['@/assets/img/alert/logo.png'];               //打包进app的本地applogo
                // msg.href = 'https://www.baidu.com/';                         //好友点进去需要跳转的连接
                // if (index == 0) {
                //     msg.extra = {scene: "WXSceneSession"}                      //好友分享
                // } else if (index == 1) {
                //     msg.extra = {scene: "WXSceneTimeline"}                     //朋友圈分享
                // }
                // plus.share.getServices(function (e) {                            //移动端获取服务，这里的plus方法只能在移动端有效，在pc端运行会报plus错误，下一步就该打包检验
                //     this.shareData = e　　　　　　　　                       //这个回调函数的参数 e 就包含了所有对象的数组
                //     for (var i in e) {
                //         if ('weixin' == e[i].id) {
                //             this.sharewx = e[i]
                //         }
                //     }
                // })
                // // 使用send发起分享
                // this.sharewx.send(msg, function () {
                //     alert('分享成功')
                // }, function (error) {
                //     alert('分享失败')
                // })
            },
            //分享到QQ好友(可用)
            shareToQQ() {
                //此处分享链接内无法携带图片
                const share = {
                    title: "东金秀财",
                    desc: "描述",
                    share_url: "https://xiucai.neafex.com/#/"
                };
                location.replace(
                    "https://connect.qq.com/widget/shareqq/index.html?url=" +
                    encodeURIComponent(share.share_url) +
                    "&title=" +
                    share.title +
                    "&desc=" +
                    share.desc
                );
            },
            //分享到QQ空间(可用)
            shareToRoom() {
                //自定义内容
                const share = {
                    title: "博瑞昊康",
                    desc: "描述",
                    image_url: ["https://xxx.jpeg"],
                    share_url: "https://地址"
                };
                let image_urls = share.image_url.map(function(image) {
                    return encodeURIComponent(image);
                });
                //跳转地址
                location.replace(
                    "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
                    encodeURIComponent(share.share_url) +
                    "&title=" +
                    share.title +
                    "&pics=" +
                    image_urls.join("|") +
                    "&summary=" +
                    share.desc
                );
            },
            //分享到微博(可用)
            shareToMicroblog() {
                //自定义内容
                const share = {
                    title: "东金秀财",
                    image_url: ["https://xxx.jpeg"],
                    share_url: "https://地址"
                };
                //跳转地址
                location.replace(
                    "https://service.weibo.com/share/share.php?url=" +
                    encodeURIComponent(share.share_url) +
                    "&title=" +
                    share.title +
                    "&pic=" +
                    share.image_url +
                    "&searchPic=true"
                );
            }
        }
    }
</script>

<style scoped lang="stylus">
  .sharewaper
    width 100%
    height 100vh
    position fixed
    z-index 3000
    bottom 0
    left 0
    background rgba(0,0,0,0)
  .sharebox
    width 100%
    height 36%
    border-top-right-radius 6px
    border-top-left-radius 6px
    position absolute
    z-index 100
    bottom 0
    left 0
    background #f5f5f5
    .tab
      line-height 1rem
      font-size 16px
      display flex
      width 94%
      margin 0.6rem auto 0.1rem
      justify-content space-around
      margin-bottom 0.15rem
      .tab-item
        width 20%
        text-align :center
        .radius
          width 1.7rem
          height 1.7rem
          display flex
          margin 0 auto
          font-size 0.7rem
          align-items center
          justify-content center
          border-radius 50%
          background #fff
        img
          display block
          width 56%
          height: auto;
          margin 3px auto
        .tab-link
          color #444
          display block
          line-height 1.3rem
          font-size 0.5rem
    .removebtn
      position absolute
      bottom 3vh
      width 100%
      span
        display inline-block
        line-height 1rem
        color #ffffff
        font-size 14px
        font-weight 800
        text-align center
        width 92%
        padding 6px 0
        background #9a55ff
        border-radius 25px

</style>
