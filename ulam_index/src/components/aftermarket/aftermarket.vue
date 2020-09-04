<template>
    <div class="aftermarket">
<!--      //申请退款-->
      <Shouhou v-if="dialogVisible" :dialogVisibleItem="dialogVisibleItem" :orderNo="orderNos"
      @dialogVisibleItemshow="dialogVisibleItemshow"></Shouhou>

<!--      //上传快递信息  -->
      <postman v-if="ispostman" :postmanlist="postmanlist" @postmanshow="postmanshow" ></postman>
<!--        //联系客服-->
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
            <span class="udizhi1 btoms" :data-clipboard-text="uldizhi"  @click="copposhop">复制</span>
            <span style="width: 10%"></span>
            <span class="btoms" style="background: #f5f5f5;color: #7f7e7e;" @click="dVisible = false">关 闭</span>
          </span>
        </el-dialog>
      </backColor>
<!--    取消退货  -->
      <backColor v-if="isremoveaftermarke">
        <el-dialog
          :visible.sync="isremoveaftermarke"
          title="取消退货"
          width="80%"
        >
          <div class="udizhi" style="text-align: center;margin: 20px 0;font-weight: 800;font-size: 18px">
            <span>确定要取消退货吗？</span>
          </div>
          <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between">
            <span class="udizhi1 btoms" @click="removeaftermarke">确 定</span>
            <span style="width: 10%"></span>
            <span class="btoms" style="background: #f5f5f5;color: #7f7e7e;" @click="isremoveaftermarke = false">关 闭</span>
          </span>
        </el-dialog>
      </backColor>

      <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

      <Pageheader :content="content" @taggbacks="taggbacks" @heidcomprehen="heidcomprehen"></Pageheader>
      <!--    title-->
      <div style="margin: 0 0 0.5rem">
        <ul class="tab">
          <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}" @click="tagglelist(index)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <Scroll  id="scroll" :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup"  ref="scroll" @scroll="scrollss" @scrollToend="scrollToend" :data='orderList' class="main-content">
        <div @touchstart.prevent="handleTouchStart"
             @touchmove.prevent="handleTouchMove"  id="scrollbox"
             @touchend.prevent="handleTouchEnd" >
          <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
            <i style="font-size: 16px" class="el-icon-loading" ></i>
            <span>下拉刷新  </span>
          </div>
            <div v-if="islength" style="text-align: center;">
              <img src="@/assets/images/aftem_3.png" alt=""  class="praiseimg">
              <router-link to="/homepage" tag="div" style="margin-top: 2rem">
                <span class="backcolors" style="font-size:0.7rem;display: inline-block;padding: 6px 2rem;color: #fff;border-radius: 25px">去添加商品</span>
              </router-link>
            </div>

            <div v-else>
              <!--      内容  订单-->
<!--              <div v-show="titleindex == 0">-->
<!--                <div v-for="(item,index) in orderList" :key="index" :style="{marginTop:index == 0?'0':'10px'}" class="allordersItem">-->
<!--                  <div style="padding: 0.3rem 0.6rem">-->
<!--                    <h1  @click.stop="toShophome(item.storeId)" class="title"> {{item.storeName}}   <i style="color: #bababa" class="el-icon-arrow-right"></i> </h1>-->
<!--                    <div>-->
<!--                      <div class="ordernum">-->
<!--                        <span> 订单号：{{item.orderNo}}</span><span style="color:#F4451A"> {{status[item.status-1]}}</span>-->
<!--                      </div>-->
<!--                      <div class="ordernum" style="justify-content: end">-->
<!--                        <span> 下单时间：</span><span> {{formatDateTime(item.created)}}</span>-->
<!--                      </div>-->
<!--                      <div class="orderimgs" v-for="(todo,index) in item.details" :key="todo.detailId">-->
<!--                        <div style="width: 30%"><img v-lazy="todo.goodsSkuImage"  alt="" class="images"></div>-->
<!--                        <div class="ordername">-->
<!--                          <div class="nametext">{{todo.goodsSkuName}}</div>-->
<!--                          <div style="display: flex;justify-content: space-between;margin: 0.5rem 0">-->
<!--                            <span style="color: #000">&nbsp<span style="font-size: 0.7rem">{{todo.goodsPrice}}ulam</span></span>-->
<!--                            <span style="padding-right: 0.5rem"> × {{todo.goodsCount}}</span>-->
<!--                          </div>-->
<!--                          <div style="display: flex;justify-content: space-between">-->
<!--                            <div class="orderbut">  7天退换</div>-->
<!--                            <div class="orderbut" @click.stop="toAlipay(todo,item.orderNo)"> 退 换 </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->

<!--                      <div class="orderzongjie" style="">-->
<!--                        <span style="color: #cccccc;padding-right: 0.5rem;">共优惠<span style="font-size: 0.7rem;color:#F4451A"> {{item.discountStore}}ulam </span></span>-->
<!--                        <span style="color: #cccc">订单金额：<span style="color:red;">&nbsp</span><span style="font-size: 0.7rem;color:#F4451A">{{item.totalAmount}}ulam</span></span>-->
<!--                      </div>-->
<!--                      <div class="order34" style="display: none">-->
<!--                        <el-button size="small" @click.stop="getkefulist(item.details[0].gid)"  round>&nbsp;&nbsp;&nbsp;客服&nbsp;&nbsp;&nbsp;</el-button>-->
<!--&lt;!&ndash;                        <el-button size="small" round @click.stop="toAlipay(item)">申请退换</el-button>&ndash;&gt;-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

              <!--  正在处理的  -->
              <div  v-show="titleindex == 1">
                <div class="allordersItem" v-for="(todo,index) in Processing" :key="index" :style="{marginTop:index == 0?'0':'10px'}"  @click.prevent="tocompleteddetail(todo.returnNo)">
                  <div style="padding: 0.3rem 0.5rem">
                    <div class="ordernum">
                      <span>退换单号：{{todo.returnNo}}</span><span style="color:#F4451A"> {{Processingstatus[todo.isYes]}}</span>
                    </div>
                    <div v-show="todo.returnSubmitTime" class="ordernum" style="justify-content: end">
                      <span>申请退换时间：</span><span> {{todo.returnSubmitTime}}</span>
                    </div>
                    <div v-show="todo.handlingTime" class="ordernum" style="justify-content: end">
                      <span>店铺反馈时间：</span><span> {{todo.handlingTime}}</span>
                    </div>
                    <div class="orderimgs" >
                      <div><img :src="todo.skuDefaultImg" alt="" class="Processingimages"></div>
                      <div class="ordername">
                        <div class="nametext">{{todo.skuName}}</div>

                        <div style="display: flex;justify-content: space-between;color: #bababa;">
                          <span style="color: #777">{{todo.goodsPrice}}ulam</span>
                          <span> × {{todo.returnCount}}</span>

                        </div>

                        <div style="font-size:12px;margin-top: 0.3rem;display: flex;justify-content: flex-end;align-items: center">
                          <span>优惠金额 : <span style="color:#F4451A">&nbsp</span><span style="font-size: 13px;color:#333">{{todo.discountAmount}}ulam</span></span>
<!--                          <i class="el-icon-arrow-right" style="color:#F4451A"></i>-->
                        </div>
                        <div style="font-size: 0.6rem;display: flex;justify-content: flex-end;align-items: center">
                          <span>待退金额 : <span style="color:#F4451A">&nbsp</span><span style="font-size: 0.7rem;color:#F4451A">{{todo.returnAmount}}ulam</span></span>
<!--                          <i class="el-icon-arrow-right" style="color:#F4451A"></i>-->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="display:flex;width: 100%">
                    <div style="width:100% ">
                      <span class="btomsss" style="background: #f1d2ff;color: #9a55ff" @click.stop="aftermarke(todo)">取消退换</span>
                    </div>
                    <div style="width:100% " v-if="todo.isYes == 1">
                      <span class="btomsss" @click.stop="topostman(todo)">上传快递信息</span>
                    </div>
                  </div>

                </div>
              </div>

              <!--   已经处理完的-->
              <div  v-show="titleindex == 2">
                <div class="allordersItem" v-for="(todo,index) in Processing" :key="todo.detailId" :style="{marginTop:index == 0?'0':'10px'}" @click="tocompleteddetail(todo.returnNo)">
                  <div style="padding: 0.3rem 0.5rem">
                    <div class="ordernum">
                      <span style="font-size: 12px">退换单号：{{todo.returnNo}}</span><span style="color:#F4451A;font-size: 12px">{{Processingstatus[todo.isYes]}} </span>
                    </div>
                    <div v-show="todo.returnSubmitTime" class="ordernum" style="justify-content: end">
                      <span>申请退换时间：</span><span> {{todo.returnSubmitTime}}</span>
                    </div>
                    <div v-show="todo.handlingTime" class="ordernum" style="justify-content: end">
                      <span>店铺反馈时间：</span><span> {{todo.handlingTime}}</span>
                    </div>
                    <div class="orderimgs" >
                      <div style="padding: 0.3rem 0.4rem 0.4rem 0;"><img :src="todo.skuDefaultImg" alt="" class="Processingimages"></div>
                      <div class="ordername">
                        <div class="nametext">{{todo.skuName}}</div>
                        <div style="display: flex;justify-content: space-between;margin: 0.2rem 0;color: rgb(186, 186, 186);">
                          <span>&nbsp{{todo.goodsPrice}}ulam</span>
                          <span style="padding-right: 0.5rem"> × {{todo.returnCount}}</span>
                        </div>

                        <div style="font-size: 0.6rem;margin-top: 0.9rem;display: flex;justify-content: flex-end;align-items: center">
                          <span>{{todo.isYes == 1?"已退金额":"金额"}} : <span style="color:#F4451A">&nbsp</span><span style="font-size: 0.7rem;color:#F4451A">{{todo.returnAmount}}ulam</span></span>
<!--                          <i class="el-icon-arrow-right" style="color:#F4451A"></i>-->
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
            暂无更多
          </div>



            <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
              <i style="font-size: 28px" class="el-icon-loading" ></i>
            </div>

            <div style="height:35px">

            </div>
          </div>
      </Scroll>

      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    </div>
</template>

<script>
    import Pageheader from "@/base/HeaderPage/HeaderPage";
    import Scroll from "@/base/scroll/scroll";
    import Shouhou from "./shouhou/shouhou";
    let imgUrls = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3095847979,50443286&fm=26&gp=0.jpg";
    import {getdislist} from '@/api/index';
    import postman from './postman/postman';
    import backColor from "@/base/backColor/backColor";
    import Clipboard from 'clipboard';
    import {lyricminshow,tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [lyricminshow,tageshowcomprehen],
        name: "aftermarket",
        created(){

            // this._getdislist(5);
            // this.removegoodsList()
            this.removegoodsList(1)
        },
        data(){
            return{
                dVisible:false,
                uldizhi:'13838389438',
                orderNos:'',
                content:"退换/售后",
                islength:false,
                ispostman:false,//上传快递信息
                postmanlist:{},//快递信息数据
                titlelist:[
                    // {
                    //     id:1,
                    //     name:'申请退款',
                    //     isflag:true,
                    // },
                    {
                        id:2,
                        name:'处理中',
                        isflag:true,
                    }, {
                        id:3,
                        name:'退换记录',
                        isflag:false,
                    }
                ],
                probeType:3,
                orderList:[],
                status:[
                    '待付款', '已取消', '已过期' ,'待发货','已发货','已完成','已评价'
                ],
                Processingstatus:['审核中','商家已同意','商家已拒绝','已取消'],
                Processing:[],
                completed:[],
                titleindex:1,
                dialogVisible:false,
                dialogVisibleItem:{},
                statusnums:1,
                removeaftermarkereturnNo:0,
                isremoveaftermarke:false,
            }
        },
        methods:{
//转换时间
            formatDateTime(inputTime) {
                var date = new Date(parseInt(inputTime)*1000);
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
                return y + '.' + m + '.' + d + ' ' + h + ':' + minute;
            },
            //划过结束
            handleTouchEnd(){
                console.log('@@@',this.scrollY ,'>' ,15 && this.StartY ,'<', this.MoveY-15)
                if(this.scrollY > 15 && this.StartY < this.MoveY-15){
                    this.loading = true;
                    this.orderList = [];
                    this.page = 1;
                    this.Processing = [];
                    // if(this.titleindex == 0){
                    //     this._getdislist(this.statusnums)
                    // }else{
                    //     this.removegoodsList(this.statusnums)
                    // }
                    this.removegoodsList(this.statusnums)
                }
            },

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
                            this.removegoodsList(this.statusnums)
                            setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)
                        }else{
                            this.btomloading = false;
                            this.empty = true;
                        }
                    }
                }



            },
            //滑动 优质产品 加载更多
            scrollToend() {
                // console.log(this.titleindex,'this.titleindex');
                // if(this.StartY > this.MoveY - 250){
                //
                //     if(this.total/10 > this.page){
                //         console.log('@@@@@@@@@@@@@');
                //         this.btomloading = true;
                //         this.page += 1;
                //
                //         this.removegoodsList(this.statusnums)
                //         // if(this.titleindex != 0){
                //         //
                //         //     this.removegoodsList(this.statusnums)
                //         // }else{
                //         //     this._getdislist(this.statusnums);
                //         // }
                //
                //
                //
                //
                //     }else{
                //         this.btomloading = false;
                //         this.empty = true;
                //     }
                // }
            },




            //复制客服联系方式
            copposhop(){
                console.log('复制成功');
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

            taggbacks(){
                this.$router.push('/myoder')
            },
            //跳转店铺
            toShophome(storeId){
                this.$router.push({
                    path:`/shophome/${storeId}`}
                )
            },
            //
            aftermarke(item){
                console.log(item,'需要退货单号');
                this.isremoveaftermarke = true;
                this.removeaftermarkereturnNo = item.returnNo;
            },
            //取消退货
            removeaftermarke(item){
                let apiurl =  'v1/shop/order/return-cancel';
                let data = {
                    returnNo:this.removeaftermarkereturnNo
                }
                getdislist(apiurl,data).then(res => {
                    this.isremoveaftermarke = false;
                    this.removeaftermarkereturnNo = '';
                        console.log(res,'取消退货');
                        if (res. status == "fail"){
                            this.tagglePrompt(false,res.msg)
                        }else {
                            this.tagglePrompt(true,'操作成功');
                            this.Processing =[];
                            setTimeout(()=>{
                                this.removegoodsList(this.statusnums)
                            },1000)
                        }

                    // this.uldizhi = res.data;
                    // this.dVisible = true;
                })


            },


            //打开上传快递信息
            topostman(item){
                console.log('打开上传快递信息',item);
                this.ispostman = true;
                this.postmanlist = item;
            },
            //快递信息 关闭
            postmanshow(){
                this.ispostman = false;
            },





            //退还页面 关闭
            dialogVisibleItemshow(){
                this.dialogVisible = false;
                this.orderList = [];
                this.orderNo = ''
                this._getdislist(5);
            },

            //退换弹框
            toAlipay(item,orderNo){
                console.log(item,'@@@@@@@@@@@@@@@@@@');
                this.dialogVisible = true;
                let arr = [];
                arr.push(item);
                this.dialogVisibleItem = arr;
                this.orderNos = orderNo;
            },

            //title 切换
            tagglelist(num){
                if (this.$refs.scroll){
                    this.$refs.scroll.scrollTop();
                }

                let index = num +1;
                this.total = 0;
                this.titlelist.map(item=>{
                    item.isflag = false
                })
                this.titlelist[num].isflag = true;
                this.titleindex = index;
                this.orderList = [];
                this.Processing = [];

                // if(index != 0){
                    if(index == 1){

                        console.log(index,'@@@@@@')

                        this.statusnums = 1;
                    }else if(index == 2){
                        this.statusnums = 3;
                        console.log(index,'@@@@@@!!!!!!!!')
                    }
                    this.removegoodsList(this.statusnums)
                // }else{
                //     this.statusnums = 5;
                //     this._getdislist(this.statusnums);
                // }


            },
            getkefulist(id){
                let apiurl = 'v1/shop/goods/get-service';
                let data={
                    id
                };
                getdislist(apiurl,data).then(res => {
                    console.log(res,'订单数据列表');
                    this.uldizhi = res.data;
                    this.dVisible = true;
                })
            },

            //查看订单
            _getdislist(status){
                console.log(status,'@@@@@@@@@@@@@@@@')
                let apiurl = 'v1/shop/order/find';
                let data={
                    status
                };
                getdislist(apiurl,data).then(res => {
                    this.loading = false;
                    this.btomloading = false;
                    console.log(res,'订单数据列表');


                    if(res.status == "tokenFail") {
                        this.tagglePrompt(false, '登录状态失效请重新登录');

                        setTimeout(()=>{
                            localStorage.clear();
                            this.$router.push('/index');
                        },3000)

                    }else{
                        let reslist = res.data;
                        if(reslist){

                            this.orderList = this.orderList.concat(reslist);
                            this.islength = false;
                            this.total = res.total;
                        }else {
                            this.orderList = [];
                            this.islength = true;
                            this.total = res.total;
                            return
                        }

                    }







                })
            },

            //跳转已退款详情
            tocompleteddetail(id){
                console.log(id,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                this.$router.push({
                    path:`/completeddetail/${id}`
                })
            },
            //请求正在退货中数据
            removegoodsList(status){
                console.log(status,'status');
                let apiurl = 'v1/shop/order/return-find';//return-
                let data={
                    page:this.page,
                    status
                };
                getdislist(apiurl,data).then(res => {
                    this.btomloading = false;
                    this.loading = false;
                    this.isscrollflag = true;
                    console.log(res,'正在退货中数据');
                    let reslist = res.data;

                    this.total = res.total;

                    if(reslist){

                        this.Processing = this.Processing.concat(reslist);
                        this.islength = false;
                    }else {
                        this.Processing =[];
                        this.islength = true;
                        return
                    }
                })
            }
            //
    //status 状态 1申请中 2 商家审核，正在退货 3 完成
        },
        mounted(){
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }
        },
        components:{
            Pageheader,Scroll,Shouhou,postman,backColor
        }

    }
</script>

<style scoped lang="stylus">
  .aftermarket
    height: 100vh;
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5
    .main-content
      height: 86vh;
      overflow: hidden;
      position: relative;
      .praiseimg
        display block
        width 100vw
        height auto
        margin 0 auto
        margin-top 7vh
    .tab
      height :30px
      line-height :30px
      font-size 14px
      display flex
      justify-content space-around
      .tab-item
        text-align :center
        color #bababa
        display block
        font-size 0.65rem
      .tablink
        color:#9a55ff;
        border-bottom : 3px solid #9a55ff
    .allordersItem
      width 92%
      margin 14px auto
      border-radius 6px
      background #fff
      text-align left
      overflow hidden
      .btomsss
        display block
        width 100%
        background #9a55ff
        line-height: 30px;
        color #fff
        font-size: 16px;
        text-align center
        padding 3px 0
      .title
        width 100%
        display flex
        justify-content space-between
        font-size 0.65rem
        font-weight 800
        margin 0.3rem 0
      .ordernum
        display flex
        justify-content space-between
        align-items center
        margin 0.2rem 0
        font-size 12px
        color #999
      .orderbut
        border-radius 5px
        color  #9a55ff
        height 0.8rem
        line-height 0.8rem
        background #f1d2ff
        width 30%
        text-align center
        font-size 0.5rem
      .order34
        display flex
        justify-content flex-end
        margin-top 0.3rem
        padding-bottom 0.3rem
      .orderzongjie
        display flex;
        align-items center
        justify-content: space-between
        padding 0.5rem 0
      .ordername
        line-height 1rem
        margin-left 0.4rem
        width 70%
        .nametext
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
      .orderimgs
        display flex
        margin 0.3rem 0
        .images
          width 25vw
          height auto
          display block
        .Processingimages
          width 25vw
          height auto
          display block
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
</style>
