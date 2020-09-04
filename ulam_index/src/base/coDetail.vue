<template>
  <div class="warp">
    <!--客服提示-->
    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

    <backColor v-if="dVisible">
      <el-dialog
        :visible.sync="dVisible"
        title="联系客服"
        width="80%"
      >
        <div class="udizhi" style="text-align: center;margin: 20px 0;font-weight: 800;font-size: 24px">
          <span>{{uldizhi}}</span>
        </div>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between">
            <span class="udizhi1 btoms" :data-clipboard-text="uldizhi"  @click="copposhop">复 制</span>
            <span style="width: 10%"></span>
            <span class="btoms" style="background: #f5f5f5;color: #7f7e7e;" @click="dVisible = false">关 闭</span>
          </span>
      </el-dialog>
    </backColor>

    <!--      分享-->
    <backColor v-if="isshare" >
      <share v-if="isshare"  :goodsId='contentList.skuId' @showShare="showShare"></share>
    </backColor>

    <!-- 头部 -->
    <header style="background: #fff">
      <Pageheader :content="content" @heidcomprehen="heidcomprehen" @taggbacks="taggbacks"></Pageheader>
    </header>
    <!-- title-->
    <nav style="background: #fff">
      <ul class="tab">
        <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}" @click="tagglelist(index)">
          <span>{{item.name}}</span>
        </li>
      </ul>

    </nav>


    <Scroll class="main-content" ref="scroll">
      <div>

        <div>
          <!--商品介绍-->
          <div class="main_warp" v-show="contentflag == 0">
            <!--      轮播-->
            <div class="img" style="background: #fff;width: 100%;transition: all 0.1s"  :style="{height:widths+'px'}">
              <swiper   v-if="iskeep" :options="swiperOption" ref="mySwiper" >
                <!-- slides -->
                <swiper-slide v-for="(item,index) in bannerimages" :key="index">
                  <p  >
                    <img :src="item" alt="" class="imgswipe"  style="transition: all 0.3s">
                  </p>
                </swiper-slide>

                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
              </swiper>


            </div>
            <!--                   -->
            <div v-if="colorList.length"  style="display: flex;width: 94%;justify-content: center;margin: 0 auto;align-items: center">
              <div style="width: 20%;white-space:nowrap;">有{{colorList.length}}个选择</div>
              <div class="lockYsbox" ref="wrapper">
                <div style="white-space: nowrap;display: flex"  ref="cont">
                  <div v-for="(item,index) in colorList" :key="index"  class="lockYs" @click="tagglecontent(item.skuId)">
                    <div><img :src="item.defaultImg" alt="" class="lockYsimg" :style="{borderColor: isskuid ==item.skuId?'red':'#fff'}"></div>
                  </div>
                </div>
              </div>
            </div>

            <!--          s商品介绍-->
            <div class="main_warp_div">
              <main class="main">
                <div class="Price">

                  <div class="Price_mony">
                    <span style="font-size: 0.6rem;font-weight: 600;display: none">{{integral?'积分':'&nbsp'}}</span>

                  </div>


                </div>

                <div class="appellative">
                  <!--                领优惠券-->
                  <div style="text-align: left;margin: 0.2rem 0;display: flex;justify-content: space-between;align-items: center;">
                    <div>
                        <span style="font-weight: 800;color:#F4451A;font-size: 16px">
                        {{integral? contentList.score:contentList.price}}
                         <span  style="font-size: 14px;font-weight: 800;">ulam</span >

                    </span>
                      <!--                        <span v-for="(item,index) in contentList.flag" :key="index" v-show="index <= 1" class="red"> {{item.name}}</span>-->
                    </div>
                    <span @click="adddetailcoupon" style="color: #e01212;font-size: 14px;">领券 <i class="el-icon-arrow-right"></i></span>
                  </div>

                  <!--                商品名-->
                  <span style="line-height: 0.8rem;color: #333333;font-size: 0.58rem;font-weight: 800;margin-top: 0.5rem;display: inline-block">
                      {{contentList.skuName}}
                    </span>


                  <!--                商品介绍-->
                  <p style="color: rgb(99, 99, 99);font-size: 0.5rem;margin-top: 5px;"><span>{{contentList.skuDesc}}</span></p>
                </div>

                <div class="business">
                  <div>
                    <span>运费:&nbsp;</span>
                    <span>
                        {{contentList.postAmount?'&nbsp':''}}
                        {{contentList.postAmount?contentList.postAmount:'包邮'}}
                      </span>
                  </div>
                  <div>
                    <span>销量:&nbsp;</span>
                    <span>{{contentList.saleCount }}</span>
                  </div>
                  <div>
                    <span>库存：&nbsp;</span>
                    <span>{{contentList.stock }}</span>
                  </div>
                </div>
                <div class="integral" style="display: flex;justify-content: space-between">
                  <!--                    <span>获得信用积分:{{contentList.creditScore}}</span>-->
                  <div style="display: flex">
                    <span class="integralspan" v-for="(item,index) in contentList.tag" :key="index" v-if="index <= 1" style="">{{item.name}}</span>
                  </div>



                  <div class="Price_div">
                      <span class="Price_img" style="margin-top: -1px" @click="collectgoods" v-if="contentList.isFollow == 0">
                        <img src="@/assets/icon//3_07.png" alt="" style="width: 5vw;">
                      </span>
                    <span class="Price_img" style="margin-top: -1px"  @click="collectgoods" v-if="contentList.isFollow == 1">
                        <img src="@/assets/icon//9_09.png" alt="" style="width: 5vw;">
                      </span>
                    <span class="Price_img" @click="isshare = true">
                          <img src="@/assets/icon//3_10.png" style="width: 5vw;" alt="">
                      </span>
                  </div>
                </div>
              </main>
            </div>
            <div class="details">
              <span style="height: 14px"></span>
              <span style="font-weight: 800;font-size: 0.65rem;color: #000">商品详情</span>
            </div>
            <div class="article_img">
              <div  v-html='contentList.content' ></div>
            </div>
          </div>

          <!--      商品详情图  -->
          <article class="article" v-show="contentflag == 2">
            <div class="details">
              <span style="height: 14px"></span>
              <span style="font-weight: 800;font-size: 0.65rem;color: #000">商品详情</span>
            </div>
            <div class="article_img">
              <div  v-html=contentList.content></div>
            </div>
          </article>

          <!--商品评价-->
          <div v-show="contentflag == 1">

            <div class="details">
              <span style="height: 14px"></span>
              <span style="font-weight: 800;font-size: 0.65rem;color: #000">商品评价</span>
            </div>
            <span v-show="goodlistconten.length<=0" style="text-align: center;line-height: 3rem;">
                <img src="@/assets/images/praise1.png" alt=""  class="praiseimg">
              </span>
            <div>
              <div style="display: flex;text-align: left;margin: 0.3rem 0 0.9rem;" v-for="(item,index) in goodlistconten" :key="index" >
                <div style="margin: 0 0.3rem;">
                  <img :src="item.userHeader" alt="" style="width:6vh;border-radius: 50%;overflow: hidden">
                </div>
                <div style="flex: 0.85">
                  <div style="display: flex;justify-content:space-between;align-items: center;font-size: 0.6rem;">
                    <span style="font-weight: 700">{{item.userNick}}</span>
                  </div>
                  <div style="margin: 0.1rem 0 0.2rem;">
                    <span style="color: #bababa">{{item.created}}</span>
                  </div>
                  <div style="font-size: 0.6rem;color: #ccc;display: flex;justify-content:end;align-items: center;margin-left: -2px;">
                    <!--                  <span>商品评价：{{item.goodsStar}} 星</span><span>快递评价：{{item.expressStar}} 星</span>-->
                    <div v-for="item in item.goodsStar">
                      <img src="@/assets/icon/9_09.png"  alt="" style="width: 4vw;">
                      <!--                    <i class="el-icon-star-on" style="font-size:0.8rem;color: orange"></i>-->
                    </div>
                  </div>
                  <!--                    p评论信息-->
                  <div style="margin-top: 0.4rem;font-size: 16px;">{{item.content}}</div>
                  <!--评论图片-->
                  <div style="display: flex;margin-top: 3px" v-if="item.images">
                    <img v-for="(todo,index) in item.images" :key="index" :src="todo" alt=""  @click.stop="taggleimagesdetail(todo)"  style="width:25%;display: inline-block;height: auto;margin-right:7px">
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div style="height: 20px"></div>
      </div>
    </Scroll>
    <!--      领取优惠券-->
    <Lincoupon v-if="islincoupon" :coupons="coupons" @remlincoupon="remlincoupon" @addgoodscoupon="addgoodscoupon"></Lincoupon>

    <!--          选择规格-->
    <Purchase  @tagglePrompt="tagglePrompt" v-if="isPurchase" :contentList="contentList" :integral="integral" :goodsId='goodsId' :movetitle="movetitle" :detailId="detailId" @removepurchase="removepurchase"></Purchase>


    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    <backColor v-if="isrotateImage">
      <rotateImage v-show="isrotateImage" :images="imagesdetail" @guanbirotateImage="guanbirotateImage"></rotateImage>
    </backColor>

    <!--      -->
    <div class="detailbtombox">
      <div  class="detailbtomleft" @click="dVisible = true">
        <div><img src="@/assets/icon/5_03.png" alt="" class="detailbtomimgs"></div>
        <div style="text-align: center"><span style="color: #aaaaaa">客服</span></div>
      </div>
      <div  @click="toshoppingCart" class="detailbtomleft">
        <div><img src="@/assets/icon/5_06.png" alt="" class="detailbtomimgs"></div>
        <div style="text-align: center"><span style="color: #aaaaaa">购物车</span></div>
      </div>

      <div @click="$router.push({path:`/shophome/${contentList.storeId}`})"   class="detailbtomleft">
        <div><img src="@/assets/icon/5_08.png" alt="" class="detailbtomimgs"></div>
        <div style="text-align: center"><span style="color: #aaaaaa">店铺</span></div>
      </div>

      <div class="detailbtomright">
            <span style="background: #9a55ff;display: flex;border-radius: 25px;overflow: hidden;width: 94%">
              <span class="detailbtombtn detailbtombtnleft" @click="purchaseClose(false)">加入购物车</span>
              <span class="detailbtombtn detailbtombtnright" @click="purchaseClose(true)">立即购买</span>
            </span>
      </div>
    </div>
  </div>
</template>

<script>
    import Pageheader from "@/base/HeaderPage/HeaderPage";
    import Clipboard from 'clipboard';
    import Lincoupon from '@/components/details/lincoupon/lincoupon';
    import Purchase from '@/components/details/purchase/purchase'
    import Scroll from "@/base/scroll/scroll";
    import backColor from "@/base/backColor/backColor";
    import Prompts from "@/base/prompt/prompt";
    import share from '@/components/share/share';

    import {getdislist} from '@/api/index';

    import { Scroller } from 'vux'
    import { Toast, } from 'vux';
    import BScroll from 'better-scroll';
    import rotateImage from "@/base/rotateImage/rotateImage";
    import {createNamespacedHelpers} from 'vuex';
    const bnavigation=createNamespacedHelpers('bnavigation');
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name:'coDetail',
        props:{
            homepageskuid:{
                type:Number,
                default:413,
            },
            isshoppingCart:{
                type:Boolean,
                default: false,
            }
        },
        data(){
            return {
                coupons:[],
                flag:false,
                iscomprehensive:false,
                isrotateImage:false,
                imagesdetail:'',
                dVisible:false,//客服提示
                uldizhi:13838389438,//客服联系方式
                goodsId:this.homepageskuid,
                iskeep:0,
                isskuid:0,
                detailId:0,
                colorList:[],
                contentflag:0,
                isshare:false,//分享
                integral:this.$route.query.id?true:false,//判断是不是积分
                swiperOption:{
                    loop:true,
                    autoplay:4000,
                    pagination:".swiper-pagination",
                },
                titlelist:[
                    {
                        id:1,
                        name:'商品',
                        isflag:true,
                    }, {
                        id:1,
                        name:'评价',
                        isflag:false,
                    }, {
                        id:1,
                        name:'详情',
                        isflag:false,
                    },
                ],
                content:"商品详情",
                size:24,
                bannerimages:[],
                isflags:false,
                contentList:[],
                goodlistconten:[],
                goodlistcontennums:'',
                isPurchase:false,
                islincoupon:false,
                movetitle:false, //false 加入购物车  true 立即购买
                detailId:this.homepageskuid,
                creditScore:0,//购买积分
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                widths:0,
            }
        },
        created(){
            this._getdislist(parseInt(this.homepageskuid));
            this.isskuid  = parseInt(this.homepageskuid);
            this.widths = document.documentElement.clientWidth;

            // this.addgoodsfind()
            // this.lookgoodsfind()
        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            this.widths =document.documentElement.clientWidth;
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        methods:{
            goBack(){
                if(this.isPurchase){
                    return;
                }else if(this.islincoupon){
                    return
                }else if (this.isshare){
                    return;
                }else if (this.isrotateImage){
                    return;
                }else {
                    this.$emit('showDetails');
                }

                //replace替换原路由，作用是避免回退死循环
            },
            taggbacks(){
                console.log('@@@@@@@@@@@@@@@')
                this.$emit('showDetails')
            },

            taggleimagesdetail(url){
                console.log(url,'url')
                this.isrotateImage = true;
                this.imagesdetail = url;
            },


            // 横向滚动
            verScroll () {
                let width = this.colorList.length * 52// 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
                this.$refs.cont.style.width = width + 'px'  // 修改滚动区域的宽度
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.wrapper, {
                            startX: 0,  // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
                            click: true,
                            scrollX: true,
                            scrollY: false,
                            eventPassthrough: 'vertical'
                        })
                    } else {
                        this.scroll.refresh() //如果dom结构发生改变调用该方法
                    }
                })
            },

            //图片放大 关闭
            guanbirotateImage(){
                this.isrotateImage = false;
                this.imagesdetail = '';
            },

            //复制客服联系方式
            copposhop(){
                console.log('复制成功')

                this.dVisible = false;

                var clipboard = new Clipboard('.udizhi1');
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.tagglePrompt(true,'复制成功')
                    // alert(666)
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

            //跳转购物车
            toshoppingCart(){

                console.log('@@@@@@@@@@@','this.isshoppingCart')

                if(this.isshoppingCart){
                    this.taggbacks()
                }else{
                    if(this.integral){
                        //积分购物
                        this.$router.push({
                            path:'/shoppingCart',
                            query: {
                                id: 1
                            }
                        })
                    }else{
                        //正常商品
                        this.$router.push({
                            path:'/shoppingCart'
                        })
                    }
                }



            },

            //获取商品评价
            goodsfind(id){
                let apiurl = 'v1/shop/goods/comment-find';
                let data= {id};
                getdislist(apiurl,data).then(res => {
                    console.log(res,'评价数据');
                    let reslist = res.data;
                    if(reslist){
                        this.goodlistcontennums = res.commentCount;
                        this.goodlistconten = reslist;
                    }else{
                        this.goodlistcontennums = res.commentCount;
                        this.goodlistconten = []
                        return
                    }

                })
            },

            // //收藏商品
            collectgoods(){
                let apiurl = 'v1/shop/goods/follow';

                let data= {id:this.homepageskuid};
                getdislist(apiurl,data).then(res => {
                    console.log(res,'数据');
                    if(res.status == "success"){
                        this._getdislist(this.homepageskuid);
                    }else{
                        this.tagglePrompt(false,res.msg)
                    }

                })
            },
            //关闭分享
            showShare(flag){
                this.isshare = flag;
            },

            //打开订单规格
            purchaseClose(flag){
                this.movetitle = flag;
                this.isPurchase = true;
            },

            //关闭选规格页面
            removepurchase(){
                this.isPurchase = false;
            },

            //商品信息
            _getdislist(cid){
                let apiurl = 'v1/shop/goods/get-sku';
                let data={
                    id:cid
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'商品详情数据');

                    if(res.status == "fail"){
                        this.tagglePrompt(false,res.msg)
                        this.taggbacks()
                    }else{
                        let resList = res.data;
                        this.contentList = resList;
                        this.coupons = resList.coupons?resList.coupons:[]
                        this.bannerimages = resList.images;
                        this.uldizhi = resList.service;
                        this.iskeep = resList.images?resList.images:0;
                        console.log(resList.gid,'gid');
                        this.detailId = resList.gid;
                        this.goodsfind(resList.gid);
                        this._getListattr(resList.gid);
                        setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)
                    }





                    console.log(this.detailId,'this.detailId')
                })
            },
            //请求规格数据
            _getListattr(id){
                let apiurl = 'v1/shop/goods/find-color-attr';
                console.log(parseInt(this.detailId),'detailId');
                let data={
                    id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'商品颜色分类数据');
                    let resList = res.data;
                    if(resList){
                        this.colorList = resList;
                        this.$nextTick(() => {
                            let timer = setTimeout(() => { // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
                                if (timer) {
                                    clearTimeout(timer)
                                    this.verScroll()
                                }
                            }, 100)
                        })
                    }else {
                        this.colorList = []
                    }


                })
            },
            //更换颜色
            tagglecontent(id){

                if(this.isskuid == id){
                    return
                }else{
                    this.isskuid  = id;
                    this.iskeep = false;
                    let apiurl = 'v1/shop/goods/get-sku';
                    let data={
                        id
                    };
                    getdislist(apiurl,data).then(res => {
                        console.log(res,'商品详情数据');
                        let resList = res.data;
                        // this.contentList = resList;
                        this.bannerimages = resList.images;
                        this.uldizhi = resList.service;
                        this.iskeep = resList.images?resList.images:0;
                        console.log(resList.gid,'gid');
                        this.detailId = resList.gid;
                        console.log(this.detailId,'this.detailId')
                    })
                }

            },


            //
            tagglelist(index){
                this.titlelist.map(item=>{
                    item.isflag = false
                });
                this.titlelist[index].isflag = true;

                this.contentflag = index;

            },
            //提示框出现
            tagglePrompt(isflag,text,msg){
                if(isflag){
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }else{
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(()=>{
                    this.isPrompt = false;
                },1500)
            },
            //打开优惠券页面
            adddetailcoupon(){
                this.islincoupon = true;
            },
            //关闭优惠券列表
            remlincoupon(flag){
                this.islincoupon = flag;
            },
            //领取优惠券
            addgoodscoupon(id){
                let apiurl = 'v1/shop/order/coupon';
                let data={
                    id:id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'领取优惠券');
                    if(res.status == "fail"){
                        this.tagglePrompt(false,'领取优惠券失败,',res.msg)
                    }else{
                        this.tagglePrompt(true,'领取优惠券成功')
                    }
                    this.islincoupon = false;
                })
            },




        },
        components:{
            Pageheader,
            rotateImage,
            Scroller,
            Lincoupon,
            Scroll,
            Purchase,
            share,
            Prompts,
            backColor,
            Toast
        }

    }
</script>



<style scoped lang="stylus" >
  .warp {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30000;
    font-size: 14px;
    background: #f5f5f5;
  }
  .main-content{
    height: 80vh;
    overflow: hidden;
    background: #fff;
    position: relative;
  }
  .praiseimg{
    display: block;
    width: 80vw;
    height: auto;
    margin:3vh auto 0;
  }


  .nav {
    display: flex;
  }
  .nav > div {
    padding: 0.2rem 0.3rem;
    margin: 0.3rem 0.4rem;
    font-size: 0.85rem;
    color: #999999;
  }
  .nav > div:nth-child(1) {
    border-bottom: 1px solid #9a55ff;
    color: #9a55ff;
  }
  .nav_warp {
    display: flex;
    justify-content: center;
  }

  .main_warp {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .main_warp_div {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 0.5rem solid #f2f2f2;
    padding-bottom: 0.5rem;
  }
  .main {
    width: 94%;
  }
  .img {
    width: 100%;

  }
  .imgswipe {
    width: 100%;
    height: auto;
    display: block;
  }
  .Price {
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Price_div {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
  .Price_mony {
    font-size: 0.8rem;
    color:#F4451A;
  }
  .Price_img {
    width: 1rem;
    height: 1rem;
    margin: 0 0.1rem;
  }
  .Price_img > img {
    width: 5.5vw;
    height: auto;
    display: block;
  }
  .appellative {
    text-align: left;
    color: #333333;
    line-height: 0.8rem;
    font-size: 0.6rem
    font-weight: 600;
  }
  .business {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #bababa;
    margin: 0.3rem 0;
    padding: 0.3rem 0;
  }
  .integral {
    width: 100%;
    margin-bottom: 0.3rem;
    text-align: left;
  }
  .integralspan {
    display: inline-block;
    padding: 0.08rem 0.3rem;
    line-height: 0.7rem;
    height: 0.7rem;
    border-radius: 4px;

    font-size:12px;
    background: #9a55ff;
    margin-right 5px;
    color: #ffffff;
  }
  .article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .article_img {
    width: 94%;
    height:auto;
    text-align: left;
    color: #333;
    line-height: 0.8rem;
    overflow: hidden;
  }
  .article_img > p{
    font-size 0
  }
  .article_img div p br {
    margin 0;
    padding:0;
    height: 0 !important;
    display: block;
  }
  .article_img div p img {
    width: 30%;
    height: auto;
    display: block;
  }


  .details {
    width: 94%;
    display: flex;
    margin: 0.6rem auto;
    align-items: center;
  }
  .details > span:nth-child(1) {
    width: 3px;
    background: #9a55ff;
    border-radius: 3px;
    margin-right: 0.5rem;
  }
  .detailbtombox{
    position: fixed;
    bottom: -1px;
    background: #fff;
    width: 100%;
    height: 7vh;
    padding-bottom: 0.1rem;
    border-top: 0.3px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content:space-around;
  }
  .detailbtomleft{
    font-size: 0.5rem;
    font-weight: 200;
    width: 12%;
  }
  .detailbtomimgs{
    display: block;
    width: 6vw;
    height: auto;
    margin: 0.1rem auto 0.2rem;
  }
  .detailbtomright{
    font-size: 0;
    width: 66%;
    display: flex;

  }
  .detailbtombtn{
    width: 50%;
    text-align: center;
    display: block;
    background: #9a55ff;
    font-size: 0.6rem;
    font-weight: 700;
    line-height:20px;
    height: 20px;
    color: #fff;
    padding: 5px 0.4rem;
  }
  .detailbtombtnleft{
    background: #f1d2ff;
    padding-left: 0.5rem;
    color: #9a55ff;
  }
  .detailbtombtnright{
    padding-right: 0.5rem;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-left: -1px;
  }
  .swiper-pagination-bullet{
    background: #ccc
  }

  .swiper-pagination-bullet-active{
    background: aqua
  }

  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom:1.1rem;
    left: 0;
    width: 100%;
  }
  .btoms{
    display: block;
    margin: 0 auto;
    text-align: center;
    background: #9a55ff;
    line-height: 30px;
    color: #fff;
    border-radius: 6px;
    font-size: 16px;
    width: 85%;
    padding: 2px 0;
  }
  .red{
    float: left;
    font-size: 0.5rem;
    line-height: 0.7rem;
    display: inline-block;
    border: 1px solid red;
    color:#F4451A;
    padding: 0 0.2rem;
    border-radius: 3px;
    margin-right: 0.4rem;
  }
  .lockYsbox{
    height: 50px;
    position: relative;
    width: 80%;
    overflow: hidden;
    font-size: 0;
  }
  .lockYsimg{
    height: 40px;
    width: auto;
    display: inline-block;
    margin: 5px;
    border: 1px solid #fff;
  }
  .lockYs{
    display: inline-block;
    font-size: 0;
  }

</style>


<style scoped lang="stylus">
  .tab
    height :30px
    line-height :30px
    font-size 0.65rem
    display flex
    width 60%
    margin 0 auto
    justify-content space-around
    .tab-item
      text-align :center
      color rgb(99, 99, 99)
      display block
    .tablink
      color:#9a55ff;
      border-bottom : 3px solid #9a55ff
</style>
