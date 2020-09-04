<template>
    <div class="box">
      <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>


      <cDetails v-if="isDetails" :homepageskuid="homepageskuid" @showDetails="showDetails"></cDetails>


      <Scroll class="main-content" :listenScroll="listenScroll" :pullup="pullup" :data='songarr'
              ref="scroll" @scroll="scrollss" @scrollToend="scrollToend"  id="scroll"
      >
        <div  @touchstart.prevent="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd" id="scrollbox"  style="padding-bottom: 6vh;">

          <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
            <i style="font-size: 16px" class="el-icon-loading" ></i>
            <span>下拉刷新  </span>
          </div>
          <!--  头部搜索  -->
          <Heade @heidcomprehen="heidcomprehen"></Heade>
          <Banner></Banner>
          <!-- x选项 -->
          <div style="width: 94%;margin: 0 auto;background: #f5f5f5;padding-top: 15px;">
            <List :listOne="listOne"></List>
            <List :listOne="listTwo"></List>
            <!--  图片    -->
            <div>
<!--              <img src="@/assets/icon/2_51.png"  alt="" />-->
            </div>

            <!--   优质产品   -->
              <div class="title" >
                <div class="lan"></div>
                <h5 style="font-size: 16px;font-weight: 800">优质产品</h5>
              </div>



          </div>

          <div  style="width: 96%;margin: 0 auto;">
            <Song :songarr="songarr"  @toDetails="toDetails"></Song>
          </div>

          <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
            暂无更多
          </div>

          <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
            <i style="font-size: 28px" class="el-icon-loading" ></i>
            <div style="height: 10px;"></div>
          </div>

          <div style="height: 40px"></div>
        </div>
      </Scroll>
      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
      <Bnavigation :flag="flag"></Bnavigation>



    </div>
</template>

<script>
  const axios = require('axios');
  import Banner from "./banner/banner";
  import Bnavigation from '../bnavigation/bnavigation';
  import {getdislist} from '@/api/index';
  import List from "@/base/list/list";
  import Song from "@/base/song/song";
  import Scroll from "@/base/scroll/scroll";
  import Heade from './heade/heade';
  import Prompts from "@/base/prompt/prompt";

  import cDetails from '@/base/coDetail'

  import comprehensive from "@/base/comprehensive/comprehensive";
  import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name: "homepage",
        mounted(){
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }
            setTimeout(()=>{
                let user = JSON.parse(localStorage.getItem('user'));
                if (user){
                    const username = user.hu+'';
                    const password = user.mima;
                    console.log(username,password,'!!!!!!!数据');
                    let token = localStorage.getItem('token');
                    if(!token){
                        this._getdislisttoken(username,password);
                    }

                }


                this._getdislist();//获取精品推荐数据
                this._getclassifyList();//请求分类信息
            },100)
        },
        data(){
            return{
                empty:false,
              isDetails:false,
              homepageskuid:413,
              btomloading:false,
              iscomprehen:false,
              macuo:true,
              loading:false,
              flag:0,
              page:1,
              listenScroll:true,
              pullup:true,
              listOne:[],
              listTwo:[],
              songarr:[],
              dialogImageUrl: '',
              dialogVisible: false,
              StartY:0,
              MoveY:0,
              scrollY:0,
              isPrompt:false,//提示框的展示与隐藏
              Prompttext:'',//提示框成功或失败
              Promptmsg:'',//提示框成功或者失败原因
              Promptimage:'',//是否展示图片
              total :0,
              isscrollflag:false
            }
        },
        created(){

        },
        methods:{
            //打开商品详情
            toDetails(id){
                console.log(id,'商品详情')
                this.homepageskuid = id;
                this.isDetails = true;
            },
            //关闭页面
            showDetails(){
                this.homepageskuid = 0;
                this.isDetails = false;
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
//请求token
            //请求token
            _getdislisttoken(username,password){

                let apiurl = this.apiurlShop+'/api/user/login';

                let data={
                    username,password
                };
                axios.post(apiurl, data).then((res)=> {

                    console.log(JSON.stringify(res),'成功');
                    localStorage.setItem('token',res.data.token)
                }).catch((err)=> {
                    console.log(JSON.stringify(err),"失败");
                    console.log(err.status+'错误码');
                    console.log(err.headers);
                })
            },
            //请求优质产品
            _getdislist(){
                let apiurl = 'v1/shop/goods/find-goods-condition';
                let data={
                    page:this.page,
                };
                getdislist(apiurl,data).then(res => {

                    this.loading = false;
                    this.btomloading = false;
                    this.total = res.total;
                    let reslist = res.data;
                    if(reslist){
                        this.songarr = this.songarr.concat(reslist);
                        setTimeout(()=>{
                            this.isscrollflag = true;
                        },50)

                    }else {
                        this.songarr =[]
                        return
                    }
                    // console.log(JSON.stringify(res.data),'成功');
                })
            },

            //请求分类
            _getclassifyList(){
                let apiurl = 'v1/shop/goods/find-home-category';
                let data={};
                getdislist(apiurl,data).then(res => {
                    console.log(res,'请求分类');
                    let reslist = res.data;
                    if(reslist){
                        let one = [];
                        let two = [];
                        reslist.map((item,index) =>{
                            if(index <= 3){
                                one.push(item);
                                this.listOne= one;
                            }else {
                                two.push(item);
                                this.listTwo = two;
                            }
                        })
                        // this.songarr = [...reslist];

                    }else {
                        // this.songarr = [];
                    }
                })
            },
            //下啦刷新
            //使scroll  重启
            refresh(){
                this.$refs.scroll.refresh()
            },
            //划过结束
            handleTouchEnd(){
                if(this.scrollY > 15 && this.StartY < this.MoveY-15){
                    this.loading = true;
                    this.isscrollflag = false;
                    this.songarr =[]
                    this.page = 1;
                    this.empty = false;
                    this._getdislist()
                    console.log('@22222222222222222222222222')
                }
            },
            //划过事件
            handleTouchMove(e){
                this.MoveY = e.touches[0].pageY;
                // console.log(e.touches[0].pageY,'划过事件')
            },
            //按下事件
            handleTouchStart(e){
                this.StartY = e.touches[0].pageY;
                // console.log(e.touches[0].pageY,'按下事件')
            },
            //滑动 优质产品 加载更多
            scrollToend() {
                console.log(this.StartY,'优质产品 加载更多',this.MoveY);
                if(this.StartY > this.MoveY){
                    if(this.total/10 > this.page){
                        this.page += 1;
                        console.log('@22222222222222222222222222')
                        // this.btomloading = true;
                        // this.refresh();
                        // this._getdislist()
                    }else{
                       this.btomloading = false;
                       this.empty = true;
                    }
                }
            },
            //滚动监听
            //滚动监听
            scrollss(pos){
                this.heights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if(this.isscrollflag){
                    if((pos.y * -1)+200 >= this.heights-this.scrollheight ){
                        if(this.total/10 > this.page){
                            // console.log('22222222222222222222222222222222')
                            this.isscrollflag = false;
                            this.page += 1;
                            this.btomloading = true;
                            this._getdislist()
                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }



            },


        },
        components:{
            Heade,
            comprehensive,
            Banner,
            List,
            Song,
            Scroll,
            Bnavigation,
            Prompts,
            cDetails
        }
    }
</script>

<style scoped lang='stylus'>
  .box
    height: 93.5vh;
    width 100vw
    position: absolute;
    font-size 14px
    background #f5f5f5
    .main-content
      height: 100vh;
      overflow: hidden;
      position: relative;
      top -1px
    .title
      display flex
      width 94vw
      margin 0.8rem 0 0
      align-items center
      .lan
        width 3px
        background #9a55ff
        border-radius 6px
        height 16px
        margin-right 8px
    img
      width 92%
      height auto
      display block
      margin 0 auto
      padding 0.1rem 0

</style>
