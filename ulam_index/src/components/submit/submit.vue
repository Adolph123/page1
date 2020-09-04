<template>
  <div class="submitBox">
    <loading :show="sh8" text="指纹识别成功正在提交.."></loading>

    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

    <loading :show="ss9" text="订单提交中.."></loading>

    <backColor v-if="dialogVisible">
      <el-dialog
        title="请输入支付密码"
        :visible.sync="dialogVisible"
        width="85%"
      >
        <div style="margin: 30px 0">
          <el-input placeholder="请输入密码" v-model="Password" show-password></el-input>
        </div>

        <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
          <span class="passwordbtm" style="background: #f5f5f5;color: rgb(127, 126, 126)"
                @click="showtoAlipay">取 消</span>
          <span class="passwordbtm" @click="toAlipay">确 定</span>

        </div>
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

    <!--      头部返回-->
    <Pageheader :content="content" @heidcomprehen="heidcomprehen"></Pageheader>

    <Scroll class="main-content">
      <div class="submitContent">
        <!--      地址-->
        <div v-if="address" class="submitlist submitDz" @click="taggleAddresskai">
          <div style="line-height: 1.4rem;padding-right: 0.55rem;color: #000;">
            <div><span style="font-size: 0.6rem;font-weight: 700">{{address.name}}</span><span
              style="padding-left: 0.6rem;color: #bababa">{{address.phone}}</span></div>
            <div style="line-height: 0.8rem;">
              <!--                <span style="background: blue" class="fangkuai"> {{address.remark}} </span>-->
              <span> {{address.area}}</span> <span>{{address.detail}} </span>
            </div>

          </div>
          <div style="margin-right: -2px;">
            <i class="el-icon-arrow-right" style="font-size: 0.8rem;color: #bababa"></i>
          </div>
        </div>

        <div v-else class="submitlist submitDz" @click="taggleAddresskai">
          <div>
            请选择收货地址
          </div>
          <div style="margin-right: -2px;">
            <i class="el-icon-arrow-right" style="font-size: 0.8rem;color: #bababa"></i>
          </div>
        </div>

        <!--      支付方式-->
        <div class="submitBoxwo submitlist">
          <span style="color: #000">在线支付</span><span style="color: #bababa"> 现仅ulam支付 </span>
        </div>

        <!--      商品详情-->
        <div class="submitlist" v-for="(item,index) in goods" :key="item.storeId">
          <h2
            style="margin-bottom: 0.3rem;line-height: 1rem;font-size: 0.65rem;width: 100%;display: flex;justify-content: space-between"
            @click="$router.push({path:`/shophome/${item.storeId}`})"
          >
            <span style="font-weight: 700;color: #000;">{{item.storeName}}</span>
            <i class="el-icon-arrow-right" style="color: #bababa"></i>
          </h2>
          <div class="ordernum">
            <!--            <span> 订单号：{{item.orderNo}}</span>-->
          </div>
          <div>
            <div style="">
              <div style="display: flex;margin: 0.3rem 0;width: 100%;position: relative"
                   v-for="(todo,nums) in item.carts" :key="todo.skuId">

                <div>
                  <img :src="todo.image" alt="" class="image">
                </div>
                <div style="line-height: 1.1rem;width: 71%">
                  <div class="skuName"><span>{{todo.skuName}}</span></div>
                  <div style="display: flex;justify-content: space-between;align-items: center">
                      <span style="color: #000;font-size: 0.6rem;">
                        <span style="font-size:0.5rem;display: none;">{{integral   ? '积分':'&nbsp'}}</span>
                        {{integral?todo.score:todo.price}}<span style="font-size: 14px">ulam</span>
                      </span>
                    <span style="color: #bababa">× {{todo.count}}</span>
                  </div>
                  <div style="position: absolute;bottom: 3px">
                      <span
                        style="color: #9a55ff;background: rgb(246, 226, 255);font-size: 0.5rem;padding: 0.1rem 0.2rem;border-radius: 5px">
                        发货时间付款后48小时以内
                      </span>
                  </div>
                </div>
              </div>

            </div>


            <div class="huise">
              <!--              <span>预计    9月28日[今天]</span>-->
            </div>

            <div class="submitBoxwo">
              <span>优惠券</span>
              <span v-if="integral" style="display: none"> 积分商品不能使用优惠券</span>
              <span v-else @click="tgcouponsItem(item.storeId)" style="color: #bababa">
                {{item.coupon?item.coupon.desc:'暂无可用'}}
                <i class="el-icon-arrow-right" style="color: #bababa;padding-left: 0.3rem"></i>
              </span>
            </div>
          </div>

        </div>


        <!--      发票优惠--->
        <!--        <div class="submitlist">-->
        <!--          &lt;!&ndash;            <div class="submitBoxwo"><span>发票</span><span> <span>电子</span>(商品明细-个人)<i class="el-icon-more"></i></span></div>&ndash;&gt;-->
        <!--          <div class="submitBoxwo">-->
        <!--            <span>优惠券</span>-->
        <!--            <span v-if="integral" style="display: none"> 积分商品不能使用优惠券</span>-->
        <!--            <span v-else @click="tgcouponsItem" style="color: #bababa">{{desc}}<i class="el-icon-arrow-right" style="color: #bababa;padding-left: 0.3rem"></i></span>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--    金额运费  -->
        <div class="submitlist">
          <div class="submitBoxwo">
            <span>商品金额</span><span style="color:#F4451A">
              <span style="font-size: 0.5rem;display: none">{{integral?'积分':'&nbsp'}}</span>
              <span style="font-size: 0.6rem">{{contentList.totalAmount}}<span style="font-size: 14px">ulam</span></span>
            </span>
          </div>
          <div class="submitBoxwo">
            <span>运费(总重: {{contentList.totalWeight}})</span>
            <span v-if="integral">包邮</span>
            <span v-else style="color:#F4451A;font-size: 0.6rem">
                <span style="font-size: 0.5rem">{{parseInt(contentList.postAmount)==0? '': '&nbsp'}}</span>
                {{parseInt(contentList.postAmount)==0? '包邮': contentList.postAmount}}
              </span>
          </div>
          <div class="submitBoxwo">
            <span>已优惠</span>
            <span v-if="integral">0</span>
            <span v-else style="color:#F4451A">  -&nbsp<span
              style="font-size: 0.6rem">{{contentList.totalDiscount}}</span></span>
          </div>
        </div>

        <div style="height: 30px;">

        </div>

      </div>
    </Scroll>


    <!-- 底部-->
    <div class="shoppingBotm">
      <div class="shoppingBotmbox">
        <div>
          <span
            style="padding-left: 0.7rem;color:#F4451A;font-size: 0.7rem;line-height: 1rem;display: none">&nbsp; </span>
          <span style="font-weight: 700;font-size: 0.8rem;color:#F4451A;">{{contentList.currentAmount}}<span
            style="font-size: 16px">ulam</span > </span>
        </div>
        <div @click="toPayment">
          <button class="shoppingBotmbtn backcolors"> 提交订单</button>
        </div>
      </div>
    </div>

    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>
    <!--      更改地址-->
    <Myaddress @taggleAddress="taggleAddress" @modifyaddressget="modifyaddressget" v-show="istaggleAddress"></Myaddress>
    <!--      更改优惠券-->
    <Couponall :couponstorId="couponstorId" @couponsItem="couponsItem" @remlincoupon="remlincoupon" :coupons="coupons"
               v-show="iscouponsItem"></Couponall>
  </div>
</template>

<script>
    import {Loading,} from 'vux'
    import Pageheader from "@/base/pageheade/pageheader";
    import backColor from "@/base/backColor/backColor";

    import Myaddress from "./myaddress/myaddress"
    import Couponall from "./couponall/couponall"
    import {getdislist} from '@/api/index'
    import Scroll from "@/base/scroll/scroll"
    import Prompts from "@/base/prompt/prompt";
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name: "submit",
        created() {
            if (this.$route.query.detail) {
                this._getdislistCare(this.$route.query.detail);//购物车
            } else {
                this._getdislist();//单个商品
            }
        },

        data() {
            return {
                sh8:false,
                iszhiwen: 0,
                zhiwen:false,
                content: "订单详情",
                ss9: false,//提交订单loader
                contentList: [],
                dialogVisible: false,//支付密码弹出
                couponsid: '',
                coupons: [],//优惠劵列表
                couponstorId: 0,
                address: {},
                addressid: 1,//地址ID
                goods: [],
                couponIds: [],//
                integral: this.$route.query.id ? true : false,//判断是不是积分
                istaggleAddress: false,
                iscouponsItem: false,
                desc: '暂无可用',
                detail: [],//提交订单的参数
                isPrompt: false,//提示框的展示与隐藏
                Prompttext: '',//提示框成功或失败
                Promptmsg: '',//提示框成功或者失败原因
                Promptimage: '',//是否展示图片
                Password: '',//支付密码
                skuId:'',
            }
        },
        mounted(){
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('dark')
            }
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.tgoBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.tgoBack, false);
        },
        methods:{
            tgoBack(){
                if (this.$route.query.detail) {
                    this.$router.push('/shoppingCart');//购物车
                } else {
                    this.$router.push({path:`/details/${parseInt(this.$route.query.skuId)}`});//单个商品
                }
            },
            showzhiwens(){
                if (window.plus) {
                    window.plus.fingerprint.cancel();
                }
                this.zhiwen = false;
            },
            taggmima(){
                this.dialogVisible = true;

                this.zhiwen = false;

                this.showzhiwens()
            },
            //  真正调用指纹的方法
            wenfus() {
                let _this = this;
                console.log('!!!!!!!!!!!!!!!!!', "开始指纹识别")
                if (!window.plus) return;
                console.log("可以进行开始指纹识别")
                let plus = window.plus;
                // 检查是否支持指纹识别
                if (plus.fingerprint) {
                    if (!plus.fingerprint.isSupport()) {
                        plus.nativeUI.alert('此设备不支持指纹识别');
                        return;
                    }
                    if (!plus.fingerprint.isKeyguardSecure()) {
                        plus.nativeUI.alert('此设备未设置密码锁屏，无法使用指纹识别');
                        return;
                    }
                    if (!plus.fingerprint.isEnrolledFingerprints()) {
                        plus.nativeUI.alert('此设备未录入指纹，请到设置中开启');
                        return;
                    }
                    //开启指纹识别验证()
                    var waiting = null;
                    plus.fingerprint.authenticate(function () {
                        // plus.nativeUI.alert('指纹识别成功');
                        console.log("可以进行开始指纹识别    成功")
                        //开启识别成功的加载状态
                        _this.sh8 = true;
                        // //关掉指纹的样式弹窗
                        _this.zhiwen = false;
                        // //  调用拿取密码的方法
                        _this.wendmi()
                    }, function (e) {
                        console.log("可以进行开始指纹识别    失败");
                        switch (e.code) {
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
            wendmi() {
                let mis = localStorage.getItem("jinmi");
                console.log(mis);
                // 调用支付方法 别忘了 sh8 还整加载中
                if (!mis) {
                    this.tagglePrompt(false,'未设置支付密码。。。');
                    //没有密码 提示请进行密码加密在进行转账
                    setTimeout(() => {
                        this.$router.push('/sets')
                    }, 2000)
                    return
                } else {
                    this.Password = mis;

                    this.toAlipay();//支付
                }
//有密码就进行操作楼





            },


            //关闭优惠券列表
            remlincoupon() {
                this.iscouponsItem = false
            },
            //关闭收货地址列表
            modifyaddressget() {
                this.istaggleAddress = false;
            },
            //提交订单
            toPayment() {
                this.ss9 = true;
                //payMode 支付方式 1在线支付 2 货到付款 3转账。。。
                //addressId 收货地址id  coupons 优惠券id  couponsid
                console.log(this.detail, '提交订单的参数');
                let apiurl = 'v1/shop/order/buy-now';
                let data = {
                    payMode: 1,
                    addressId: this.addressid,//  this.couponsid  //优惠券ID
                    detail: this.detail,
                };
                getdislist(apiurl, data).then(res => {
                    this.ss9 = false;
                    console.log(res, '提交订单');
                    if (res.status == 'stockLess') {
                        this.goods.map(item => {
                            item.carts.map(todo => {
                                if (todo.skuId == res.data[0]) {
                                    this.tagglePrompt(false, `提交订单失败,${todo.skuName}'库存不足'`);
                                }
                            })
                        })
                    } else {
                        if (res.status == "fail") {
                            this.tagglePrompt(false, `提交订单失败,${res.msg}`);
                        } else {
                            let arr = [];
                            res.data.map(item => {
                                arr.push(item.OrderNo);
                            })
                            this.OrderNo = arr;//传订单


                            let zw = localStorage.getItem('zhiwens');
                            if(zw){
                                this.zhiwen = true;
                                this.wenfus()
                            }else {
                                this.dialogVisible = true;

                            }

                            // this.$router.push({
                            //     path:'/payment',
                            //     query:{
                            //         OrderNo:JSON.stringify(arr)
                            //     }
                            // });
                        }
                    }


                })
            },
            //
            showtoAlipay() {
                this.dialogVisible = false;
                setTimeout(() => {
                    this.$router.push({
                        path: "/allorders",
                        query: {
                            id: 1
                        }
                    })
                }, 500)
            },
            toAlipay(OrderNo) {
                this.dialogVisible = false;

                if (this.Password == '') {
                    this.tagglePrompt(false, `请输入密码`);
                } else {

                    const apiurl = `v1/shop/order/pay`;
                    let data = {
                        OrderNo: this.OrderNo,
                        password: this.Password,
                        Mode: 0,// 0 ulam    1 支付宝支付 2.
                    };// JSON.parse(this.$route.query.OrderNo);
                    console.log(data, '提交订单号');
                    getdislist(apiurl, data).then(res => {
                        this.sh8 = false;
                        this.Password = '';
                        this.ss9 = false;
                        if (res.status == "fail") {
                            this.tagglePrompt(false, `${res.msg}`);
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/allorders",
                                    query: {
                                        id: 1
                                    }
                                })
                            }, 2000)
                        } else {
                            this.tagglePrompt(true, `支付成功`);
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/allorders",
                                    query: {
                                        id: 2
                                    }
                                })
                            }, 2000)
                        }
                        console.log(res, '数据');

                    })
                }


            },
            //初次单个商品订单数据
            _getdislist() {
                //提交订单的参数
                let apiurl = 'v1/shop/order/order-settlement-now';
                let data = {
                    skuId: parseInt(this.$route.query.skuId),
                    count: parseInt(this.$route.query.count),
                    couponIds: this.couponIds,
                    isScore: this.integral ? 1 : 0
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res.data, '订单数据');
                    let resList = res.data;
                    this.contentList = resList;
                    this.address = resList.address;//地址DOM
                    this.addressid = resList.address.id;//确认地址ID
                    this.goods = resList.goods;//店铺商品ID
                    this.coupons = resList.coupons?resList.coupons:[];//优惠券列表DOM
                    this.couponIds.push(resList.discountDetail[0] ? resList.discountDetail[0].id : []);//优惠券ID
                    this.desc = resList.discountDetail[0] ? resList.discountDetail[0].desc : '暂无可用';//优惠券展示DOM
                    //提交订单的 参数
                    resList.goods.map(item => {
                        item.carts.map(todo => {
                            this.detail.push({
                                skuId: todo.skuId,
                                count: todo.count,
                            })
                        })
                    })

                })
            },
            //初次购物车订单数据
            _getdislistCare(detail) {
                let apiurl = 'v1/shop/order/order-settlement';
                let data = {
                    cart: JSON.parse(detail),
                    coupons: this.couponIds
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res.data, '订单数据');
                    let resList = res.data;
                    this.contentList = resList;
                    this.address = resList.address;//地址DOM
                    this.addressid = resList.address.id;//确认地址ID
                    this.goods = resList.goods;//店铺商品ID
                    this.coupons = resList.coupons;//优惠券列表DOM
                    this.couponIds.push(resList.discountDetail[0] ? resList.discountDetail[0].id : []);//优惠券ID
                    this.desc = resList.discountDetail[0] ? resList.discountDetail[0].desc : '暂无可用';//优惠券展示DOM
                    //提交订单的 参数
                    resList.goods.map(item => {
                        item.carts.map(todo => {
                            this.detail.push({
                                skuId: todo.skuId,
                                count: todo.count,
                            })
                        })
                    })
                })
            },

            //更改优惠券请求单个商品订单数据
            _getdislistall() {
                //提交订单的参数
                let apiurl = 'v1/shop/order/order-settlement-now';
                let data = {
                    skuId: parseInt(this.$route.query.skuId),
                    count: parseInt(this.$route.query.count),
                    couponIds: this.couponIds
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res.data, '改优惠券订单数据');
                    let resList = res.data;
                    this.contentList = resList;//用来改变总价
                })
            },

            //更改优惠券请求购物车订单数据
            _getdislistCareall(detail) {
                let apiurl = 'v1/shop/order/order-settlement';
                let data = {
                    cart: JSON.parse(detail),
                    coupons: this.couponIds
                };
                getdislist(apiurl, data).then(res => {
                    console.log(res.data, '订单数据');
                    let resList = res.data;
                    this.contentList = resList;//用来改变总价
                })
            },

            //打开收获地址
            taggleAddresskai() {
                this.istaggleAddress = true;
            },

            //确认更改收货地址
            taggleAddress(addid) {
                this.istaggleAddress = false;
                this.addressid = addid;
                let apiurl = 'v1/shop/order/address-find';
                let data = {};
                getdislist(apiurl, data).then(res => {
                    console.log(res, '收获地址');
                    if (res.status == "fail") {
                        this.tagglePrompt(true, '更改收获地址失败,', res.msg)
                    } else {
                        //缺 判断重复地址
                        let reslist = res.data;
                        reslist.map(item => {
                            if (item.id == addid) {
                                this.address = item;
                            }

                        });
                        this.tagglePrompt(true, '更改收获地址成功')
                    }

                })
            },

            //提示框出现
            tagglePrompt(isflag, text, msg) {
                if (isflag) {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.isPrompt = true;
                    this.Promptimage = isflag;
                } else {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(() => {
                    this.isPrompt = false;
                }, 1000)
            },

            //更改优惠券id
            couponsItem(couponId, couponstorId) {
                this.iscouponsItem = false;//关闭优惠券页

                let list = JSON.parse(JSON.stringify(this.goods));

                list.map((item, index) => {
                    console.log(item, couponId, couponstorId);
                    if (item.storeId == couponstorId) {
                        list[index].coupon = couponId;
                        this.tagglePrompt(true, '更改优惠券成功');
                    }

                });
                let couponIds = [];
                list.map(item => {
                    if (item.coupon) {
                        couponIds.push(item.coupon.id)
                    } else {
                        return
                    }

                });


                this.couponIds = couponIds
                this.goods = list;
                if (this.$route.query.detail) {
                    this._getdislistCareall(this.$route.query.detail);//购物车
                } else {
                    this._getdislistall();//单个商品
                }


            },
            //打开更改优惠券
            tgcouponsItem(storId) {
                console.log(storId, 'storId')
                this.iscouponsItem = true;
                this.couponstorId = storId;
            }
        },
        components: {
            Pageheader, Myaddress, Couponall, Scroll, Prompts, Loading, backColor ,Loading
        }
    }
</script>

<style scoped lang="stylus">
  .submitBox
    height: 100vh;
    text-align left
    width 100vw
    position: absolute;
    z-index 10000
    font-size 14px
    background #f5f5f5

    .passwordbtm
      width 45%
      display block
      text-align center
      border-radius 6px
      font-size 16px
      padding 2px 0
      background #9a55ff
      line-height 30px
      color #fff

    .main-content
      height: 84vh;
      overflow: hidden;
      position: relative;

    .image
      width 3.5rem
      height auto
      display block
      margin-right: 0.5rem

    .el-icon-more
      color #999

    .submitContent
      width 94%
      margin 0 auto

      .fangkuai
        display inline-block
        line-height 1rem
        padding 0 0.5rem
        margin-right 0.3rem
        color #fff

      .submitDz
        display flex
        align-items center
        justify-content space-between
        line-height 1rem

      .submitlist
        margin 0 0 0.35rem
        padding 0.4rem 0.3rem
        background #ffffff
        border-radius 6px

        .ordernum
          display flex
          justify-content space-between
          align-items center
          margin 0.5rem 0
          color #999

        .skuName
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

      .submitBoxwo
        display flex
        justify-content space-between
        line-height 1.3rem

    .huise
      color #999
      margin 0.3rem 0
      line-height 1rem

    .shoppingBotm
      width 100%
      padding 0.5rem 0
      position fixed
      z-index 1000
      bottom 0vh
      background #fff

      .shoppingBotmbox
        width 94%
        height 5vh
        margin 0 auto
        display flex
        align-items center
        justify-content space-between

      .shoppingBotmbtn
        border 0
        outline 0
        display block
        font-size 0.65rem
        padding 0.3rem 1.2rem
        border-radius 30px
        color #fff
</style>

<style>
  .el-input__inner {
    border-color: #9a55ff !important;
  }
</style>
