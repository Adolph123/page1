<template>
  <div class="allorders">

    <backColor v-if="dialogVisible">
      <el-dialog
        title="请输入支付密码"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <div style="margin: 30px 0">
          <el-input placeholder="请输入密码" v-model="Passwords" show-password></el-input>
        </div>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
        <span class="passwordbtm" style="background: #f5f5f5;color: #888" @click="dialogVisible = false">取 消</span>
        <span class="passwordbtm" @click="toAlipay">确 定</span>
      </span>
      </el-dialog>
    </backColor>

    <backColor v-if="zhiwen">
      <el-dialog
        title="指纹支付"
        :visible.sync="zhiwen"
        width="80%">
        <div style="">
          <img src="@/assets/icos/zw.png" alt="" style="width:80px;height: auto;display: block;margin: 0 auto;">
          <div style="height:10px;"></div>
        </div>
        <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
          <span class="passwordbtm" style="background: #f5f5f5;color: #888" @click="showzhiwens">取 消</span>
          <span class="passwordbtm" @click="taggmima">使用密码</span>
        </div>
      </el-dialog>


    </backColor>

    <backColor v-if="querenshouhuo">
      <el-dialog
        title="请输入支付密码"
        :visible.sync="querenshouhuo"
        width="80%"
      >
        <div style="margin: 30px 0">
          <el-input placeholder="请输入密码" v-model="Passwords" show-password></el-input>
        </div>
        <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
          <span class="passwordbtm" style="background: #f5f5f5;color: #888" @click="querenshouhuo = false">取 消</span>
          <span class="passwordbtm" @click="tagglemima">确 定</span>
        </div>
      </el-dialog>
    </backColor>


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
            <span class="udizhi1 btoms" :data-clipboard-text="uldizhi" @click="copposhop">复制</span>
            <span style="width: 10%"></span>
            <span class="btoms" style="background: #f5f5f5;color: #7f7e7e;" @click="dVisible = false">关 闭</span>
          </span>
      </el-dialog>
    </backColor>

    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

    <Pageheader :content="content" @taggbacks="taggbacks" @heidcomprehen="heidcomprehen"></Pageheader>

    <!--    title-->
    <div style="margin: 0 0 0.5rem">
      <ul class="tab">
        <li v-for="(item,index) in titlelist" :key="index" class="tab-item" :class="{tablink:item.isflag}"
            @click="tagglelist(index)">
          <span>{{item.name}}</span>
        </li>
      </ul>

    </div>
    <Scroll :probeType='probeType' :listenScroll="listenScroll" :pullup="pullup" ref="scroll" @scroll="scrollss"
            id="scroll"      @scrollToend="scrollToend" :data='orderList' class="main-content">
      <div @touchstart.prevent="handleTouchStart"
           @touchmove="handleTouchMove"  id="scrollbox"
           @touchend="handleTouchEnd"     >
        <div v-show="loading" style="text-align: center;padding: 10px 0;transition: all 0.5s">
          <i style="font-size: 16px" class="el-icon-loading"></i>
          <span>下拉刷新  </span>
        </div>
        <!--    订单内容-->
        <span v-show="orderList.length<=0" style="text-align: center;">
          <img src="@/assets/images/orders_03.png" alt="" class="praiseimg">
          <router-link to="/homepage" tag="div" style="margin-top: 2rem">
            <span class="backcolors"
              style="font-size:0.7rem;display: inline-block;padding:6px 2rem;color: #fff;border-radius: 25px">去添加商品</span>
          </router-link>
        </span>
        <div v-show="orderList.length>=0">
          <div class="allordersItem" v-for="(todo,index) in orderList" :key="index">
            <div style="padding: 0.3rem 0.6rem">
              <h1 class="title" @click="toShophome(todo.storeId)"> <span>{{todo.storeName?todo.storeName:''}}</span> <i style="color: #bababa"
                                                                                         class="el-icon-arrow-right"></i>
              </h1>
              <div>
                <div class="ordernum">
                  <span> 订单号：{{todo.orderNo}}</span><span style="color:#F4451A"> {{status[todo.status-1]}}</span>
                </div>
                <div class="ordernum" style="justify-content: end">
                  <span> 下单时间：</span><span> {{formatDateTime(todo.created)}}</span>
                </div>

                <div class="orderimgs" v-for="(item,index) in todo.details" :key="item.detailId">
                  <div @click="toDetails(item.goodsSkuId)" style="width: 30%"><img v-lazy="item.goodsSkuImage" alt=""
                                                                                   class="images"></div>
                  <div class="ordername">
                    <div class="nametext">{{item.goodsSkuName}}</div>
                    <div style="display: flex;justify-content: space-between;">
                      <span style="color: #000"><span
                        style="color:#777">{{item.goodsPrice}}ulam</span></span>
                      <span style="color: #bababa"> × {{item.goodsCount}}</span>
                    </div>

                    <div style="display: flex;justify-content: space-between">
                      <div style="background: #fff;color: #9a55ff;"> 7天退换</div>
                      <div v-if="todo.status != 1" class="orderbut" @click.stop="totuihuan(item,todo.orderNo)"> 退 换
                      </div>
                    </div>

                  </div>
                </div>


                <div class="orderzongjie" style="align-items: center">
                  <div>
                    <span v-if="todo.status == 1" style="color: #cccccc;font-size: 12px;">剩余支付时间 {{showtime(todo.endTimer-timer)}} </span>
                  </div>
                  <div>
                     <span style="color: #ccc;font-size: 12px;">订单金额：
                       <span style="color:#9a55ff">{{todo.totalAmount}} ulam</span>
                     </span>
                  </div>
                </div>
                <!--//'待付款', '已取消', '已过期' ,'待发货','已发货','已完成','已评价'-->

                <div class="order34" v-show="todo.status == 5">
                  <span class="small" @click="getkefulist(todo.details[0].gid)" round>   客 服   </span>
                  <!--                  <el-button size="small" round>补开发票</el-button>-->
                  <span class="small" round @click="confirmreceipt(todo.orderNo)">确认收货</span>
                  <span class="small" round @click="toNewexpress(todo.orderNo)">物流详情</span>
                </div>

                <div class="order14" v-show="todo.status == 6">
                  <span class="small" @click="getkefulist(todo.details[0].gid)" round>   客 服   </span>
                  <!--                  <el-button size="small" round  @click="todetail(todo.details)">再次购买</el-button>-->
                  <span v-if="todo.CanComment"  class="small" round @click="topraise()"> 去评价</span>
                </div>

                <div class="order14" v-show="todo.status == 1">
                  <span class="small" @click="getkefulist(todo.details[0].gid)" round>   客 服   </span>
                  <span @click="toPayment(todo.orderNo)" style="color:#F4451A;border-color:#F4451A" class="small"
                             round>    付 款
                  </span>
                </div>
                <div class="order14" v-show="todo.status == 4">

                  <span class="small" @click="getkefulist(todo.details[0].gid)" round>   客 服</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-if="empty" style="margin: 15px 0;text-align: center;color: #ccc;">
          暂无更多
        </div>

        <div v-show="btomloading" style="text-align: center;padding: 10px 0;transition: all 0.5s;">
          <i style="font-size: 28px" class="el-icon-loading"></i>
        </div>

        <div style="height:35px"></div>
      </div>
    </Scroll>

    <Praisedetail :praiseitems="praiseitems" @tagglePrompt="tagglePrompt" @removepraisedetail="removepraisedetail"
                  v-show="praisedetail"></Praisedetail>
    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>


    <Shouhou v-if="isShouhou" :dialogVisibleItem="dialogVisibleItem" :orderNo="orderNos"
             @dialogVisibleItemshow="dialogVisibleItemshow">

    </Shouhou>


    <loading :show="sh8" text="指纹识别成功正在提交.."></loading>
  </div>

</template>

<script>
    import Pageheader from "@/base/HeaderPage/HeaderPage";
    import Clipboard from 'clipboard';
    import Scroll from "@/base/scroll/scroll";
    import {getdislist} from '@/api/index';
    import Prompts from "@/base/prompt/prompt";
    import Praisedetail from '../myoder/praise/praisedetail/praisedetail';
    import backColor from "@/base/backColor/backColor";
    import {lyricminshow, tageshowcomprehen} from '@/common/js/mixin.js';
    import comprehensive from "@/base/comprehensive/comprehensive";
    import Shouhou from "../aftermarket/shouhou/shouhou";
    import { Loading,} from 'vux'
    export default {
        mixins: [lyricminshow, tageshowcomprehen],
        name: "allorders",
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('dark')
            }
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        created() {
            console.log(this.$route.query.id, 'alloder');
            //0 全部  1 待付款   2 待收货
            this.orderList = [];
            if (this.$route.query.id) {
                this.statusnums = parseInt(this.$route.query.id);
                //请求  1 待付款 2 待发货    3待收货
                this.tagglelist(this.statusnums);
            } else {
                //请求全部
                this._getdislist(this.statusnums);
            }

            setInterval(() => {
                this.timer = new Date().getTime() / 1000;
            }, 1000);

        },
        data() {
            return {
                sh8:false,
                dVisible: false,
                timer: 0,
                uldizhi: '13838389438',
                praiseitems: [],//评论
                praisedetail: false,
                isPrompt: false,//提示框的展示与隐藏
                Prompttext: '',//提示框成功或失败
                Promptmsg: '',//提示框成功或者失败原因
                Promptimage: '',//是否展示图片
                listenScroll: true,
                content: '全部订单',
                threeorder: false,
                status: [
                    '待付款', '已取消', '已过期', '待发货', '已发货', '已完成', '已评价'
                ],
                titlelist: [
                    {
                        id: 1,
                        name: '全部',
                        isflag: true,
                    },
                    {
                        id: 2,
                        name: '待付款',
                        isflag: false,
                    }, {
                        id: 3,
                        name: '待发货',
                        isflag: false,
                    }, {
                        id: 4,
                        name: '待收货',
                        isflag: false,
                    }, {
                        id: 5,
                        name: '已完成',
                        isflag: false,
                    },
                ],
                orderList: [],
                dialogVisible: false,
                querenshouhuo: false,
                zhiwen: false,
                Passwords: "",
                statusnums: 0,
                OrderNo: [],
                querenshouhuoorderNo: '',
                dialogVisibleItem: [],
                orderNos: '',
                isShouhou: false
            }
        },
        methods: {
            showzhiwens(){
                if (window.plus) {
                    window.plus.fingerprint.cancel();
                }
                this.zhiwen = false;
            },
            goBack(){
                if(this.isShouhou){
                    return
                }else {
                    this.$router.go(-1);
                }

                //replace替换原路由，作用是避免回退死循环
            },
            dialogVisibleItemshow() {
                console.log('关闭')
                this.isShouhou = false;
                this.dialogVisibleItem = [];
                this.orderNo = '';
                // this._getdislist(0);
            },
            //售后
            totuihuan(item, orderNo) {
                console.log(item, '@@@@@@@@@@@@@@@@@@')
                this.isShouhou = true;
                let arr = [];
                arr.push(item);
                this.dialogVisibleItem = arr;
                this.orderNos = orderNo;
            },
            //倒计时
            showtime(sets) {
                let lefttime = parseInt(sets) * 1000,
                    leftm = Math.floor(lefttime / (1000 * 60) % 60),//计算分钟数
                    lefts = Math.floor(lefttime / 1000 % 60);
                leftm = leftm < 10 ? ('0' + leftm) : leftm;//分钟
                lefts = lefts < 10 ? ('0' + lefts) : lefts;//计算秒数
                return leftm + ":" + lefts;  //返回倒计时的字符串
            },
            //转换时间
            formatDateTime(inputTime) {
                var date = new Date(parseInt(inputTime) * 1000);
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

            //
            getkefulist(id) {
                let apiurl = 'v1/shop/goods/get-service';
                let data = {
                    id
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res, '订单数据列表');
                    this.uldizhi = res.data;
                    this.dVisible = true;
                })
            }
            ,

            //复制客服联系方式
            copposhop() {
                console.log('复制成功');
                this.dVisible = false;
                var clipboard = new Clipboard('.udizhi1');
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.tagglePrompt(true, '复制成功')
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
            }
            ,

            //跳转店铺
            toShophome(storeId) {
                this.$router.push({
                        path: `/shophome/${storeId}`
                    }
                )
            }
            ,
            //划过结束
            handleTouchEnd() {
                if (this.scrollY > 15 && this.StartY < this.MoveY - 15) {
                    console.log('下拉刷新')
                    this.loading = true;
                    this.empty = false;
                    this.orderList = [];
                    this.page = 1;
                    this._getdislist(this.statusnums)
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
                            this._getdislist(this.statusnums)
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
                //         this._getdislist(this.statusnums)
                //     } else {
                //         this.btomloading = false;
                //         this.empty = true;
                //     }
                // }
            }
            ,
            taggmima(){

                if(this.iszhiwen == 0){
                    this.dialogVisible = true;
                }else {
                    this.querenshouhuo = true;
                }
                this.showzhiwens()
            },

            taggbacks() {
                this.$router.push('/myoder')
            },

            //查看物流详情
            toNewexpress(orderNo) {

                this.$router.push({
                    path: '/newexpress',
                    query: {
                        orderNo
                    }
                })
            },

            //点击图片跳转商品详情
            toDetails(id) {
                this.$router.push({
                    path: `/details/${id}`,
                })
            }
            ,

            //查看订单
            _getdislist(status) {

                let apiurl = 'v1/shop/order/find';
                let data = {
                    status
                };
                getdislist(apiurl, data).then(res => {
                    this.loading = false;
                    this.btomloading = false;
                    this.isscrollflag = true;

                    console.log(res, '订单数据列表');


                    if (res.status == "tokenFail") {
                        this.tagglePrompt(false, '登录状态失效请重新登录');

                        setTimeout(() => {
                            localStorage.clear()
                            this.$router.push('/index');
                        }, 3000)

                    } else {
                        let reslist = res.data;
                        if (reslist) {
                            reslist.map(item => {
                                item.endTimer = item.created + 1800;
                                item.getTimeendTimer = new Date().getTime();
                            })
                            this.orderList = this.orderList.concat(reslist);

                            this.total = res.total;

                            setTimeout(()=>{
                                this.$refs.scroll.refresh()
                            },100)

                        } else {
                            this.orderList = [];
                            this.btomloading = false;
                            return
                        }
                    }


                })
            }
            ,

            //title 切换
            tagglelist(index) {
                if (this.$refs.scroll){
                    this.$refs.scroll.scrollTop();
                }


                this.titlelist.map(item => {
                    item.isflag = false
                });
                this.titlelist[index].isflag = true;
                if (index == 2 || index == 3) {
                    this.threeorder == true;
                } else {
                    this.threeorder == false;
                }
                this.statusnums = index;
                this.orderList = [];
                this._getdislist(this.statusnums);
            }
            ,

            //取消订单
            removecancel(orderid) {
                let apiurl = "v1/shop/order/cancel";
                let data = {
                    orderNo: orderid,
                    reason: "不想要了"
                }
                getdislist(apiurl, data).then(res => {
                    console.log(res, '取消订单');
                })
            }
            ,

            //跳转去支付
            toPayment(item) {
                console.log(item, '@@@@@@@@@@@@@@', '什麽鬼');
                this.OrderNo.push(item);
                // this.dialogVisible = true;
                let zw = localStorage.getItem('zhiwens');
                this.iszhiwen = 0;//付款
                if(zw){
                    this.zhiwen = true;
                    this.wenfus()
                }else {
                    this.dialogVisible = true;
                }
            }
            ,
            //提交订单
            toPayments(detail) {
                this.ss9 = true;
                //payMode 支付方式 1在线支付 2 货到付款 3转账。。。
                //addressId 收货地址id  coupons 优惠券id  couponsid
                console.log(this.detail, '提交订单的参数');
                let apiurl = 'v1/shop/order/buy-now';
                let data = {
                    payMode: 1,
                    addressId: 0,//  this.couponsid  //优惠券ID
                    detail,
                };
                getdislist(apiurl, data).then(res => {
                    this.ss9 = false;
                    console.log(res, '提交订单');
                    if (res.status == "fail") {
                        this.tagglePrompt(false, `提交订单失败,${res.msg}`);

                    } else {

                        let arr = [];
                        res.data.map(item => {
                            arr.push(item.OrderNo);
                        })
                        this.OrderNo = arr;
                        this.dialogVisible = true;

                        // this.$router.push({
                        //     path:'/payment',
                        //     query:{
                        //         OrderNo:JSON.stringify(arr)
                        //     }
                        // });
                    }

                })
            }
            ,
            toAlipay() {
                this.dialogVisible = false;
                const apiurl = `v1/shop/order/pay`;
                let data = {
                    OrderNo: this.OrderNo,
                    password: this.Passwords,
                    Mode: 0,// 0 ulam    1 支付宝支付 2.
                };// JSON.parse(this.$route.query.OrderNo);
                console.log(data, '提交订单号');
                getdislist(apiurl, data).then(res => {
                    this.sh8 = false;
                    this.Passwords = '';
                    this.ss9 = false;
                    if (res.status == "fail") {
                        this.tagglePrompt(false, `${res.msg}`);

                    } else {
                        this.tagglePrompt(false, `支付成功`);




                        setTimeout(() => {
                            this.tagglelist(2)
                            // this.$router.push({
                            //     path: "/aftermarket"
                            // })
                        }, 1000)
                    }
                    console.log(res, '数据');

                })
            }
            ,

            //再次购买
            toSubmit(item) {
                let detail = [];
                item.map(todo => {
                    detail.push(todo.goodsSkuId);
                })
                this.$router.push({
                    path: "/submit",
                    query: {
                        detail: JSON.stringify(detail)
                    }
                });
            }
            ,

            //提示框出现
            tagglePrompt(isflag, text, msg) {
                if (isflag) {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                } else {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(() => {
                    this.isPrompt = false;
                }, 1500)
            }
            ,

            //确认收货  v1/shop/order/confirm {"orderNo":"1234567890"}

            confirmreceipt(orderNo) {
                let zw = localStorage.getItem('zhiwens');
                console.log();
                this.iszhiwen = 1;//收货
                if(zw){
                    this.zhiwen = true;
                    this.querenshouhuoorderNo = orderNo;
                    this.wenfus()
                }else {
                    this.querenshouhuo = true;
                    this.querenshouhuoorderNo = orderNo;

                }




            },


            //  真正调用指纹的方法
            wenfus(){
                let _this = this;

                console.log('!!!!!!!!!!!!!!!!!',"开始指纹识别")
                if(!window.plus) return;


                console.log("可以进行开始指纹识别")
                let plus = window.plus;
                // 检查是否支持指纹识别
                if(plus.fingerprint) {
                    if(!plus.fingerprint.isSupport()) {
                        plus.nativeUI.alert('此设备不支持指纹识别');
                        return;
                    }
                    if(!plus.fingerprint.isKeyguardSecure()) {
                        plus.nativeUI.alert('此设备未设置密码锁屏，无法使用指纹识别');
                        return;
                    }
                    if(!plus.fingerprint.isEnrolledFingerprints()) {
                        plus.nativeUI.alert('此设备未录入指纹，请到设置中开启');
                        return;
                    }
                    //开启指纹识别验证()
                    var waiting = null;
                    plus.fingerprint.authenticate(function(){
                        // plus.nativeUI.alert('指纹识别成功');
                        console.log("可以进行开始指纹识别    成功")
                        //开启识别成功的加载状态
                        _this.sh8 = true;
                        // //关掉指纹的样式弹窗
                        _this.zhiwen = false;
                        // //  调用拿取密码的方法
                        _this.wendmi()
                    }, function(e){
                        console.log("可以进行开始指纹识别    失败");
                        switch(e.code){
                            case e.AUTHENTICATE_MISMATCH:
                                plus.nativeUI.toast('指纹匹配失败，请重新输入');
                                _this.fingertext = '指纹匹配失败，请重试';
                                break;
                            case e.AUTHENTICATE_OVERLIMIT:
                                plus.nativeUI.alert('识别次数超出限制，请使用密码进行支付！');
                                //密码弹窗起来 指纹样式下去
                                _this.zhiwen = false;
                                _this.querenshouhuo = true;
                                _this.showFinger = false;
                                break;
                            default:
                                if(e.code == 6){
                                    break;
                                }else {
                                    plus.nativeUI.alert('指纹识别失败(' + e.code + ')，请重试');
                                    _this.fingertext = '指纹识别失败(' + e.code + ')，请重试'
                                    break;
                                }

                        }
                    })

                } else {
                    plus.nativeUI.alert('当前环境不支持指纹识别API，请更新到最新版本');
                }
            },
            //指纹成功后调取的方式
            wendmi(){
                let mis =  localStorage.getItem("jinmi");
                console.log(mis);
                // 调用支付方法 别忘了 sh8 还整加载中
                if(!mis){
                    //没有密码 提示请进行密码加密在进行转账
                    setTimeout(() => {
                        this.$router.push('/sets')
                    },2000)
                    return
                }else {
                    this.Passwords = mis;
                    if (this.iszhiwen == 0){
                        this.toAlipay();//支付
                    }else{

                        this.confitmr();//收货
                    }
                }
//有密码就进行操作楼



            },








            //判断支付密码
            tagglemima() {
                if (this.Passwords == '') {
                    this.tagglePrompt(false, '请输入支付密码');
                } else {
                    this.confitmr();
                }

            },
            //确认收货
            confitmr() {
                let apiurl = "v1/shop/order/confirm";
                let data = {
                    orderNo: this.querenshouhuoorderNo,
                    password: this.Passwords
                }
                getdislist(apiurl, data).then(res => {
                    this.sh8 = false;
                    this.querenshouhuo = false;
                    this.querenshouhuoorderNo = '';
                    this.Passwords = '';
                    console.log(res, '确认收货');
                    if (res.status == "success") {
                        this.tagglePrompt(true, '确认收货成功');
                        this._getdislist(this.statusnums);

                    } else {
                        this.tagglePrompt(false, res.msg);
                    }

                })
            },

            //去评价
            topraise(item) {
                this.$router.push({
                    path: "/praise",
                });
                // let items=[];
                // item.map(todo=>{
                //     items.push({
                //         skuImage:todo.goodsSkuImage,
                //         skuName:todo.goodsSkuName,
                //         gid:todo.gid,
                //         detailId:todo.detailId,
                //         skuId:todo.goodsSkuId,
                //     })
                //
                // })
                // this.praiseitems = items;
                // this.praisedetail= true;
            }
            ,

            //关闭评价页面
            removepraisedetail() {
                this.praisedetail = false;
                this._getdislist(4);
            }
            ,


        },
        components: {
            Pageheader, Scroll, Prompts, Praisedetail, backColor, Shouhou ,Loading
        }
    }
</script>

<style scoped lang="stylus">
  .allorders
    height: 100vh;
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5
    .small
      padding 2px 15px
      color #696b6e
      border 1px solid #DCDFE6
      border-radius 20px
      font-size 14px
      line-height 20px
      text-align center
      margin-left 10px
    .passwordbtm
      width 47%
      display block
      text-align center
      border-radius 6px
      font-size 16px
      background #9a55ff
      line-height 30px
      color #fff

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
      height: 30px
      line-height: 30px
      font-size 0.65rem
      display flex
      justify-content space-around

      .tab-item
        text-align: center
        color #bababa
        font-size 0.65rem
        padding-bottom 0.2rem
        display block

      .tablink
        color: #9a55ff;
        border-bottom: 3px solid #9a55ff;

    .allordersItem
      width 92%
      background #fff
      border-radius 6px
      margin 14px auto
      text-align left

      .title
        width 100%
        display flex
        justify-content space-between
        font-size 0.6rem
        font-weight 800
        margin 0.35rem 0 0.6rem

      .ordernum
        display flex
        justify-content space-between
        align-items center
        margin 0.3rem 0
        color #bababa

      .orderbut
        border-radius 5px
        color #9a55ff
        height 0.8rem
        line-height 0.8rem
        background #f1d2ff
        width 30%
        text-align center
        font-size 0.5rem

      .order34
        margin 0.7rem 0 0.2rem
        display flex
        justify-content flex-end
        padding-bottom 0.3rem

      .order14
        display flex
        justify-content flex-end
        margin-top 0.3rem
        padding-bottom 0.3rem

      .orderzongjie
        display flex;
        justify-content space-between
        /*border-bottom: 1px solid #ccc*/
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
        align-items center
        margin 0.7rem 0

        .images
          width 25vw
          height auto
          display block

  .btoms {
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
