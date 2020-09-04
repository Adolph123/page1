<template>
    <div class="praise">
      <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>
      <!-- 口碑 -->
      <Pageheader :content="content" @heidcomprehen="heidcomprehen" @taggbacks="taggbacks"></Pageheader>
<!--      -->
      <div class="praisetitle">
        <div class="praisetitleitem" :class="{'praiseBorder':ispraisel}" @click="ispraiseltag(true)"><span>待填写</span></div>
        <div class="praisetitleitem" :class="{'praiseBorder':!ispraisel}" @click="ispraiseltag(false)" ><span>已填写/追加</span></div>
      </div>
<!--      -->
      <Scroll :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
              id="scroll"      @scrollToend="scrollToend" class="main-content" :data='praiselist'>
          <div @touchstart.prevent="handleTouchStart"
               @touchmove="handleTouchMove"   id="scrollbox"
               @touchend="handleTouchEnd"  style="background: #f5f5f5">
            <span v-show="praiselist.length<=0" style="text-align: center;line-height: 3rem;">
              <img src="@/assets/images/praise2.png" alt="" v-show="ispraisel" class="praiseimg">
              <img src="@/assets/images/praise1.png" alt="" v-show="!ispraisel" class="praiseimg">
            </span>

            <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
              <i style="font-size: 16px" class="el-icon-loading"></i>
              <span>下拉刷新  </span>
            </div>

            <ul>
              <li class="praiseitem" v-for="(item,index) in praiselist" :key="index" :style="{marginBottom:index==praiselist.length-1?'0':'0.5rem'}">

                <div style="padding: 0.3rem 0;display: flex;width: 100%">
                  <!--图片-->
                  <div style="padding: 0.2rem 0.3rem 0.2rem 0.5rem;width: 30%">
                    <img  v-lazy="item.skuImage"   alt="" class="imags">
                  </div>
                  <!-- 文字-->
                  <div style="padding-regiht: 0.5rem;line-height: 1.1rem;position: relative;color: #bababa;width: 63%;">
                    <div style="" class="nametext">
                      <span>{{item.skuName}}</span>
                    </div>
                    <div style="" class="nametext">
                      <span>下单时间：{{item.created}}</span>
                    </div>
                    <div v-show="!ispraisel" style="font-size: 0.5rem;display:flex;justify-content: space-between">
                      <span>商品评价：{{item.goodsStar}} 星</span>
<!--                      <span>快递评价：{{item.expressStar}} 星</span>-->
                    </div>
                    <div v-show="!ispraisel" class="text" >
                      <span>评价详情：{{item.content}}</span>
                    </div>

                    <div v-if="ispraisel" style="">
                      <div  v-show="ispraisel"  >
                        <span class="borderbul" @click="isDialog(item)">填写口碑</span></div>
<!--                      <div  v-show="!item.isAdd == 0" ><span class="borderbul" @click="isDialog(item)">再次评价</span></div>-->
                    </div>

                    <div v-else style="display:flex">
                      <div style="margin-right: 15px"  v-show="item.isAdd == 1" ><span class="borderbul" @click="isDialog(item)">再次评价</span></div>
                      <div> <span class="borderbul" @click="lookDialog(item)">查看评价</span></div>
<!--                      <div  v-show="!item.isAdd == 0" ><span class="borderbul" @click="isDialog(item)">再次评价</span></div>-->
                    </div>

                  </div>
                </div>
              </li>

            </ul>

            <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
              暂无更多
            </div>

            <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
              <i style="font-size: 28px" class="el-icon-loading"></i>
            </div>

            <div style="height: 25px"></div>
          </div>
      </Scroll>
      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
<!--      评价-->
      <Praisedetail :praiseitems="praiseitems" @tagglePrompt="tagglePrompt" @removepraisedetail="removepraisedetail" v-if="praisedetail" ></Praisedetail>
      <!--     查看 评价  -->
      <lookDialog v-if="islookDialog" :lookDialoglist="lookDialoglist" @lookDialogshow="lookDialogshow"></lookDialog>
    </div>
</template>

<script>
    import Pageheader from "@/base/HeaderPage/HeaderPage";
    import Upimage from './upimage/upimage';
    import {getdislist} from '@/api/index';
    import Scroll from "@/base/scroll/scroll";
    import Praisedetail from './praisedetail/praisedetail'
    import lookDialog from './lookDialog/lookDialog'
    import Prompts from "@/base/prompt/prompt";
    import {tageshowcomprehen,lyricminshow} from '@/common/js/mixin.js';
    import comprehensive from "@/base/comprehensive/comprehensive";
    export default {
        mixins: [tageshowcomprehen,lyricminshow],
        data(){
            return {
                content:"编写口碑",
                ispraisel:true,
                dialogVisible:false,
                Content:'',
                goodsStar:0,
                imageIds:[],
                ExpressStar:0,
                size:24,
                praiselist:[
                ],
                praisedetail:false,
                praiseitems:[],
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                islookDialog:false,//查看评论
                lookDialoglist:{},//评论数据
            }
        },
        created(){
            this.lookgoodsfind();
        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },

        methods:{
            goBack(){
                if (this.praisedetail){
                    return
                }else {
                    this.$router.go(-1);
                }

                //replace替换原路由，作用是避免回退死循环
            },
            //划过结束
            handleTouchEnd() {
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    console.log('下拉刷新')
                    this.loading = true;
                    this.empty = false;
                    this.page = 1;
                    this.praiselist = [];
                    if(this.ispraisel){
                        this.lookgoodsfind();
                    }else{
                        this.lookgoodsfindmine();
                    }
                }
            }
            ,

            //滚动监听
            scrollss(pos){
                this.heights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if(this.isscrollflag){
                    if((pos.y * -1)+200 >= this.heights-this.scrollheight ){
                        if(this.total/10 > this.page){
                            this.isscrollflag = false;
                            this.page += 1;
                            this.btomloading = true;
                            if(this.ispraisel){
                                this.lookgoodsfind();
                            }else{
                                this.lookgoodsfindmine();
                            }
                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }



            },
            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.StartY,'优质产品 加载更多',this.MoveY);
                // if (this.StartY > this.MoveY) {
                //     console.log(this.total / 10, '>', this.page, 'this.total / 10 > this.page')
                //     if (this.total / 10 > this.page) {
                //         this.page += 1;
                //
                //         this.btomloading = true;
                //
                //         if(this.ispraisel){
                //             this.lookgoodsfind();
                //         }else{
                //             this.lookgoodsfindmine();
                //         }
                //     } else {
                //         this.btomloading = false;
                //         this.empty = true;
                //     }
                // }
            }
            ,



            taggbacks(){
              console.log('关闭页面');
                this.$router.push('/myoder');
            },
            //关闭评价页面
            removepraisedetail(flag){
                this.praisedetail = false;
                this.ispraiseltag(flag);
            },
            //查看评论
            lookDialog(item){
                console.log(item);
                this.islookDialog = true;
                this.lookDialoglist = item;
            },
            //
            lookDialogshow(){
                this.islookDialog = false;
            },
            //打开评论页面
            isDialog(item){
                let arr = [];
                arr.push(item);
                this.praiseitems = arr;
                console.log(this.praiseitems);
                this.praisedetail= true;
                // this.dialogVisible
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
            //切换
            ispraiseltag(flag){

                if (this.$refs.scroll){
                    this.$refs.scroll.scrollTop();
                }

                this.ispraisel = flag;
                this.praiselist = [];
                if(this.ispraisel){
                    this.lookgoodsfind();
                }else{
                    this.lookgoodsfindmine();
                }
            },
            //评价图片添加
            addimageslist(imgarr){
                console.log('添加图片');
                this.imageIds = imgarr;
            },
            //获取我的评论列表
            lookgoodsfindmine(){
                let apiurl = 'v1/shop/goods/comment-find-mine';
                let data= {};
                getdislist(apiurl,data).then(res => {
                    this.loading = false;
                    this.btomloading = false;
                    this.isscrollflag = true;
                    console.log(res,'获取我的评论列表');
                    let reslist = res.data;
                    this.total = res.total;
                    if(reslist){
                        this.praiselist = this.praiselist.concat(reslist);
                        setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)
                    }else {
                        this.praiselist = [];
                        return
                    }
                })
            },
            //查看我的待评论列表
            lookgoodsfind(){
                let apiurl = 'v1/shop/order/goods-nocomment-find';
                let data= {};
                getdislist(apiurl,data).then(res => {
                    this.loading = false;
                    this.btomloading = false;
                    this.isscrollflag = true;
                    console.log(res,'查看我的待评论列表');
                    let reslist = res.data;
                    this.total = res.total;
                    if(reslist){

                        this.praiselist = this.praiselist.concat(reslist);

                        setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)
                    }else {
                        this.praiselist = [];

                        return
                    }
                })
            },

        },
        components:{
            Pageheader,Upimage,Scroll,Praisedetail,Prompts,lookDialog,comprehensive
        }

    }
</script>

<style scoped lang="stylus">
  .praise
    height: 100vh;
    width 100vw
    font-size 14px
    position absolute
    z-index 2000
    background #f5f5f5
    .main-content
      height: 86vh;
      overflow: hidden;
      position: relative;
      .praiseimg
        display block
        width 80vw
        height auto
        margin 0 auto
        margin-top 7vh
    .praisetitle
      display flex
      justify-content center
      font-size 0.65rem
      margin 0 auto 0.1rem
      .praisetitleitem
        margin 0 0.7rem
        line-height 30px
        height 30px
        color #bababa
      .praiseBorder
        color #9a55ff
        border-bottom 3px solid #9a55ff
    .praiseitem
      width 92%
      margin 0 auto 0.7rem
      background #fff
      border-radius 6px
      padding 0.2rem 0
      display flex
      font-size 0.54rem
      text-align left
      .nametext
        color: #222222;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      .text{
        white-space: nowrap;      /*超出的空白区域不换行*/
        overflow: hidden;         /*超出隐藏*/
        text-overflow: ellipsis;
      }
      .borderbul
        border 1px solid #9a55ff
        padding 0.1rem 0.3rem
        font-size 13px
        line-height 0.95rem
        border-radius 15px
        color #9a55ff
    .imags
      width 4.5rem
      height auto

</style>

<style>
  .el-dialog__header{
    text-align: center
  }

  .el-dialog__body{
    padding: 0 20px
  }

</style>
