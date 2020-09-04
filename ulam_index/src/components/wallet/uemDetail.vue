<template>
  <div style="background:#f5f5f5;overflow: hidden" :style="{ height: bodyHeight+50 + 'px' }" class="lala">

    <Scroll class="main-content">
      <div>
        <div style="width:100%;">
          <div class="xzhu " style="background: linear-gradient(#76c4ff, #7458fd)">
            <div style="height:70px;display: flex;justify-content: space-between;line-height: 70px;align-items: center">
              <img @click="gobacks" src="@/assets/2_03.png" alt="" style="display: block;width: 26px;height: 26px" >
              <div @click="toexpenses" style="font-size: 12px">收支记录</div>
            </div>
            <flexbox :gutter="0" style="text-align:center;font-size:12px;">
              <flexbox-item>
                <div v-on:click="saodi">
                  <img src="@/assets/newpage/sao.png" alt="" style="width:32px;">
                  <p style="line-height: 30px">扫一扫</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo" v-on:click="abi">
                  <img src="@/assets/newpage/ema.png" alt="" style="width:32px;">
                  <p style="line-height: 30px">二维码</p>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo" v-on:click="tib">
                  <img src="@/assets/newpage/tra.png" alt="" style="width:32px;">
                  <p style="line-height: 30px">转 &nbsp;账</p>
                </div>
              </flexbox-item>
              <flexbox-item >
                <div class="flex-demo" v-on:click="fabao">
                  <img src="@/assets/sort1.png" alt="" style="width:41px;">
                  <p style="line-height: 30px">兑 &nbsp; 换</p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <!--钱包余额-->
          <div style="width:100%;background:#f5f5f5;">
            <div class="bizhong">
              <p class="zis1">总资产</p>
              <div style="height: 5px"></div>
              <p class="zizi" v-if="waljin">{{waljin.toFixed(2)}} <span class="zipan">&nbsp;UEM</span></p>
              <p class="zizi" v-if="!waljin">0.00 <span class="zipan">&nbsp;UEM</span></p>
              <p class="zi1">≈&nbsp{{waljin?chujia(waljin):0}}</p>
            </div>
          </div>

          <div style="clear:both;"></div>
          <div style="width:100%;height:4px;background:#f5f5f5;"></div>
        </div>


        <div style="height: 6px"></div>
<!--兑换UEM矿机-->
        <div v-if="isbodys">
          <div style="width: 86%;margin: 0 auto">
            <div style="padding: 10px 20px;background: #fff;border-radius: 8px;">

              <div style="height: 15px"></div>
              <div style="line-height: 22px;font-size: 12px;">兑换UEM矿机时间
                <br>
                <span style="font-weight: 600;color: #3f0082;font-size: 14px">2020.7.20 10:00 - 2020.7.24 15:00</span>
              </div>
              <div style="height: 15px"></div>
              <input type="text" class="login" style="line-height: 35px;font-size:12px;color:#000;" v-model="dizhis" placeholder="输入UEM地址"/>
              <div style="height: 15px"></div>
              <div style="color: red;font-size: 12px">*请务必填写UEM APP里的钱包地址</div>


              <div style="height: 25px"></div>

              <div class="cz1 backcolors" v-on:click="addkj">确定兑换</div>

              <div style="height: 5px"></div>

            </div>
          </div>
          <div style="width: 86%;margin: 0 auto">
            <div style="line-height: 30px;color: #3f0082;font-size: 12px;" @click="tobiki('http://www.uemtk.com/up.php')">
              <u >点击下载UEM钱包</u>
            </div>
            <div style="height: 10px"></div>
            <div style="line-height: 30px;color: red;font-size: 12px;" >注意：</div>
            <div style="line-height: 22px;color: red;font-size: 12px" >1.每个账户只能兑换一次UEM矿机</div>
            <div style="line-height: 22px;color: red;font-size: 12px" >2.兑换完成后矿机将在第二天发放</div>
            <div style="line-height: 22px;color: red;font-size: 12px" >3.发放的UEM矿机需在UEM钱包查看</div>
          </div>
        </div>

        <div style="text-indent: 15px;padding: 10px 20px;font-size: 14px;line-height: 22px">
          声明：本介绍内容来自于官方项目团队所发布的白皮书等官方资料以便投资者更好地了解币种及其所对应的项目。本文内容以合法渠道获得信息，尽可能保证信息的可靠、准确和完整，但并不完全保证报告所述信息的准确性与完整性。本文内容不能作为投资研究决策的依据，不能作为道义的、责任的和法律的依据或者凭证，无论是否已经明示或者暗示。
        </div>



        <div style="height: 60px"></div>
      </div>
    </Scroll>

    <!--代理矿机-->

    <backColor v-if="isczkj">
      <el-dialog
        :visible.sync="isczkj"
        title="兑换UEM矿机"
        width="80%"
      >
        <div style="background:#fff;">
          <div style="text-align: left;margin: 20px 0;font-weight: 400;font-size: 14px;color: #000;line-height: 22px">
            兑换UEM矿机成功后将扣除  <span style="color: red">500UEM</span> + <span style="color: red">4000ULAM</span>
          </div>

          <div style="height: 20px"></div>
          <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between">
            <span class=" botmOk" style="background: rgb(238, 238, 238);color: #777;" @click="isrenzheng">取消</span>
            <span style="width: 10%"></span>
            <span class="botmOk" @click="renzheng">确定</span>
          </span>
        </div>
      </el-dialog>
    </backColor>

    <!--云矿机购买-->
    <!--充值矿机-->
    <popup v-model="czkj" height="460px" is-transparent>
      <div
        style="background-color:#fff;height:460px;border-top-left-radius:5px;border-top-right-radius:5px;"
      >
        <div style="height:10px;"></div>
        <div style="padding:15px 30px;box-sizing:border-box;">
          <p style="text-align:center;font-size:17px;" class="yinzi">
            钱包余额
            <span
              v-if="qian"
              style="font-size:30px;margin-left:8px;color:#9a55ff;"
            >{{qian?qian.toFixed(2):0}}</span>
          </p>
          <div class="loginke">
            <input type="number" class="login" v-model="shu" placeholder="输入充值矿机数量"/>
          </div>
        </div>
        <div style="padding:15px 30px;">
          <p style="font-size:14px;line-height: 20px">
            <span style="color:#9a55ff;" v-if="addulam">{{addulam}}ulam</span>
            <span style="color:#9a55ff;" v-if="!addulam">
              <inline-loading></inline-loading>ulam
            </span>
            可充值一台矿机，请您根据自己的余额合理输入矿机数量，其中4000ulam进行挖矿，超出4000ulam的部分将作为代挖服务器费用.
          </p>
          <p style="line-height: 20px;color:#ff3d17;font-size:11px;margin-top:10px;">
            备注：
            <br/>1.请最少保留1个ulam来用作官方转账手续费
            <br/>2.成功打包后收取30%作为平台服务费
            <br/>3.矿机内大于4000以上的ULAM将收取30%作为服务费(无论充值还是打包)
          </p>
        </div>
        <div style="padding:30px;box-sizing: border-box;">
          <flexbox :gutter="30">
            <flexbox-item>
              <div class="quean backcolors" v-on:click="quecz">确定</div>
            </flexbox-item>
            <flexbox-item>
              <div class="quan1" v-on:click="bucz">取消</div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </popup>
    <!-- 指纹提醒 -->
    <alert v-model="show1" title="请验证指纹" @on-show="onShow" @on-hide="onHide" button-text="取消使用密码">
      <div style>
        <div style="height:20px;"></div>
        <img src="@/assets/icos/zw.png" alt style="width:80px;"/>
        <div style="height:10px;"></div>
      </div>
    </alert>
    <!--资金密码框-->
    <popup
      v-model="jintan"
      height="310px"
      is-transparent
      position="top"
      style="top:15vh;"
      :hide-on-blur="false"
    >
      <div
        style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;"
      >
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
        </div>
        <div style="padding: 0 15px">
          <group>
            <x-input v-model="anmi1"  type="password" placeholder="请输入资金密码"></x-input>
          </group>
        </div>
        <div style="padding:20px 15px;margin-top:25px;">
          <!--          <x-button-->
          <!--            @click.native="qjin()"-->
          <!--            :style="{ background: quan.color,color:'#fff',height:'40px',fontSize: '14px'}"-->
          <!--          >确认-->
          <!--          </x-button>-->
          <div class="botmOk" @click="qjin()">确 认</div>
          <div style="height: 10px"></div>
          <div class="botmNO"  @click="bjin">取 消</div>
          <!--          <x-button @click.native="bjin" style="height:40px;font-size: 14px;">取消</x-button>-->
        </div>
      </div>
    </popup>

    <!--<div style="height:40px;"></div>-->
    <loading :show="ss1" text="加载中.."></loading>
    <toast v-model="ss3" :time="1000" is-show-mask text="复制成功!"></toast>
    <toast v-model="ss4" type="cancel" :time="2000" is-show-mask text="钱包异常!请重新登录~" width="18em"></toast>
    <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="请输入数量/密码等信息!" width="18em"></toast>
    <toast v-model="ss7" type="cancel" :time="1600" is-show-mask text="资金密码有误!" width="18em"></toast>
    <toast v-model="ss8" type="cancel" :time="1600" is-show-mask text="余额不足!请持有足够金额" width="18em"></toast>
    <toast v-model="ss9" :time="2200" is-show-mask text="恭喜您!生成矿机成功!" width="18em"></toast>
    <!--    <toast v-model="sh9"  type="cancel" :time="2000" is-show-mask text="未检测到资金密码!请在设置中添加" width="18em"></toast>-->
    <toast v-model="cz2" type="cancel" :time="1800" is-show-mask text="资金密码有误！" width="18em"></toast>
    <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁" width="18em"></toast>
    <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask width="18em">{{tishi}}</toast>
    <toast
      v-model="cz3"
      type="cancel"
      :time="2000"
      is-show-mask
      text="未检测到资金密码!请在设置中添加"
      width="18em"
    ></toast>
    <toast v-model="cz4" type="cancel" :time="1500" is-show-mask text="余额不足！请持有足够金额" width="18em"></toast>
    <toast v-model="cz5" :time="2200" is-show-mask text="充值矿机成功!" width="18em"></toast>
    <toast v-model="ss10" type="cancel" :time="1600" is-show-mask text="请求异常!请重新操作" width="18em"></toast>
    <toast v-model="isflash" type="cancel" :time="1600" is-show-mask text="暂未开放." width="18em"></toast>
    <toast v-model="isflashno" type="cancel" :time="1600" is-show-mask text="请填写正确的UEM地址." width="18em"></toast>
    <toast v-model="iserrtext" type="cancel" :time="1600" is-show-mask  width="18em">{{errtext}}</toast>
    <toast v-model="isok"  :time="1600" is-show-mask text="兑换成功！"  width="18em"></toast>
    <!--固定底部按钮-->
    <!--    <bottomNav :flag="0"></bottomNav>-->

  </div>
</template>
<script>
    import Clipboard from 'clipboard';
    import Scroll from "@/base/scroll/scroll";
    import {
        InlineLoading,
        Divider,
        XHeader,
        XInput,
        Group,
        Icon,
        XButton,
        Loading,
        Alert,
        Flexbox,
        FlexboxItem,
        XDialog,
        Qrcode,
        Popup,
        Tabbar,
        Toast,
        TabbarItem
    } from 'vux'

    import backColor from "@/base/backColor/backColor";
    export default {
        name: "uemDetail",
        components: {
            backColor,
            Divider,
            InlineLoading,
            XHeader,
            XInput,
            Toast,
            Group,
            Icon,
            XButton,
            Loading,
            Alert,
            Flexbox,
            FlexboxItem,
            XDialog,
            Qrcode,
            Popup,
            Tabbar,
            TabbarItem,
            Scroll
        },
        data() {
            return {
                isflash: false,
                isbodys: false,
                isok: false,
                iserrtext: false,
                errtext:'',
                isflashno: false,
                isczkj: false,
                cz2: false,
                cz3: false,
                cz4: false,dizhis:'',
                cz5: false,
                cjin: false, cjin1: false, tishi: '', nums: 0,
                zs: 0,
                qian: 0,
                jintan: false,

                addulam: 0,
                xkj: true,
                czkj: false,
                zu: 0,
                maishu: "",
                //个人信息
                users: '',
                //  个人钱包
                wal: '',
                waljin: '',
                ss1: false,
                ss2: false,
                ss3: false,
                ss4: false,
                ss5: false,
                ss6: false,
                ss7: false,
                ss8: false,
                ss9: false,
                ss10: false,
                wtel: '',
                //  当前交易记录的变量
                zshu: 0,
                jishu: 0,
                shuju3: '',
                jiaoxian: false,
                ghuan: './static/up.png',
                ghuan1: './static/down.png',
                shuju: '',
                shuju1: '',
                shuju2: '',
                //页数
                yys: 1,
                ayin: false,
                xiao: false,
                show2: false,
                menus2: {m1: '发糖包',},
                anmi1: '',
                shu: '',
                bodyHeight: '',
                train: 1,
                dizhi: '',
                loadings: false,
                zhenprice: 0,
                show1: false,
                kuangjiNum:0
            }
        },
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            this.gettimers()
            let that = this;
            //  获取当前高度
            that.bodyHeight = document.documentElement.clientHeight
            let message = localStorage.getItem('user');
            if (!message) {
                that.$router.push('/zhu')
                return
            } else
                {
                message = JSON.parse(message);
                that.users = message;
                // that.ss1 = true;
                this.loadings = true;
                that.diaoqu();
                console.log('!!!!!!!!!!!!!!!!!!!!!!!')
                //请求这个代理矿机


                // that.diaoges();
            }

        },
        computed: {
            ull() {
                return this.$store.state.uri;
            },
            quan() {
                return this.$store.state.zuli;
            }
        },

        methods: {
            gettimers(){
                this.axios.get(this.apiurl+'/act_time').then(res=>{
                    console.log(res.data,'结束');
                    if(res.data.status == "success"){
                        this.isbodys = true;
                    }else{
                        this.isbodys = false;
                    }
                })
            },
            //取消
            isrenzheng(){
                this.isczkj = false;
                this.dizhis = '';
            },
            //兑换uem矿机
            renzheng(){
                this.isczkj = false;
                let that = this;
                //当地址 金额 通过验证后 首先判断开启了指纹支付没有
                let zw = localStorage.getItem("zhiwens");
                if (zw) {
                    //  弹出指纹样式
                    that.show1 = true;
                    //  下面是真正的指纹方法
                    that.wenfus();
                } else {
                    //没有开启指纹 弹出密码框
                    that.jintan = true;
                    that.czkj = false;
                }
            },
              //uem下载地址
            tobiki(str) {
                void window.plus.runtime.openURL(str);
            },
            //指纹弹窗消失和隐藏
            onHide() {
                let that = this;
                if (!that.shiz) {
                    that.czkj = false;
                    that.jintan = true;
                }
            },
            onShow() {
            },
            maiji() {
                let that = this;
                let shu = that.maishu;
                if (shu <= 0) {
                    that.ss4 = true;
                    return;
                }
                that.ss5 = true;
                that.go2(that.zhenprice);
            },
            addkj() {
                if(this.isUlamAddr(this.dizhis)){
                    //地址正确
                    this.isczkj = true;
                }else{
                    //地址错误
                    this.isflashno = true;
                }

                // 同时请求文字
                // this.buybiin();
            },
            //判断ulam地址
            isUlamAddr(addr){
                // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
                let patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');
                if(patt.test(addr)){
                    return true;
                }
                return false;
            },
            diaoge1() {
                let that = this;
                //主网
                that.axios
                    .post(that.ull + "/search_miner_tg", {
                        mobile: parseInt(that.users.hu),
                        password: that.users.mima
                    })
                    .then(response => {

                        // console.log(response.data);
                        if (response.data == "miner_error") {
                            return;
                        }

                        //将个人矿机数据遍历
                        if (response.data.length > 0) {
                            let a = response.data;
                            //  算矿机数量
                            that.zs = a.length;
                            let b = 0;
                            let c = 0;
                            //   console.log('@@@@@@@@@@@@@@@@@@@@@@');
                            a.map(item => {

                                b = b + item.Balance;
                                c = c + item.Packing_Number;
                            });
                            //得出总数
                            console.log(b, '总价',c)
                            that.zu += b;
                            that.kuangjiNum += c;

                        } else {
                            console.log("没有");
                        }

                        that.diaoges()

                    })
                    .catch(function (error) {

                        that.diaoges()
                    });


            },
            //请求云矿机数据
            diaoges() {
                let that = this;
                //主网
                that.axios.post(that.ull + '/search_miner',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(response => {
                    //将个人矿机数据遍历
                    console.log(response, '云矿机')
                    let a = response.data;
                    //  算矿机数量
                    // that.zs += a.length;
                    let b = 0;
                    let c = 0;
                    a.map(item => {
                        b = b + item.Balance;
                        c = c + item.Packing_Number
                    });
                    //得出总数
                    console.log(b, '总价',c,'总数', that.kuangjiNum)
                    that.zu += b;
                    that.kuangjiNum += c;

                    this.nums = response.data ? response.data.length : 0;
                })
            },
            //多少ulam充值代理框架
            buybiin() {
                // let that = this;
                // that.axios
                //     .get(that.ull + "/miner_tg_price")
                //     .then(response => {
                //         console.log(response.data);
                //         that.addulam = response.data;
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            },
            //确认输入密码  充值代理矿机
            qjin(xmi) {
                let that = this;
                //拿取账户密码。拿去新的值
                let users = JSON.parse(localStorage.getItem('user'));
                that.axios
                    .post(this.apiurl+"/miner_uem", {
                        mobile: parseInt(users.hu),
                        password: users.mima,
                        drawback_passwd: that.anmi1,
                        uem_addr: that.dizhis,
                    })
                    .then(response => {
                        console.log(response.data);
                        that.kuxian = false;
                        that.shiz = false;
                        that.jintan = false;
                        that.dizhis = '';

                        if (response.data.status == "error"){
                            that.errtext = response.data.data;
                            that.iserrtext = true;
                        }else{
                            that.isok = true;

                        }


                        that.anmi1 = "";
                    })
                    .catch(function (error) {

                    });
            },
            jiemi(a) {
                let that = this
                let na = a.substr(0, 12)
                // console.log(na)
                if (na == 'sk_error_num') {
                    let ti = a.substr(13)
                    console.log('截取的是:' + ti)
                    if (ti == '0') {
                        that.cjin = true
                        that.anmi = ''
                        return
                    }
                    that.tishi = '资金密码错误！还有' + ti + '次机会'
                    that.cjin1 = true
                    that.anmi = ''
                } else {

                }
            },
            //取消输入资金密码
            bjin() {
                let that = this;
                that.jintan = false;
                that.anmi1 = "";
                that.dizhis = "";
            },
            wenfus() {
                let _this = this;
                console.log("开始指纹识别");
                if (!window.plus) return;
                // 检查是否支持指纹识别
                if (plus.fingerprint) {
                    if (!plus.fingerprint.isSupport()) {
                        plus.nativeUI.alert("此设备不支持指纹识别");
                        return;
                    }
                    if (!plus.fingerprint.isKeyguardSecure()) {
                        plus.nativeUI.alert("此设备未设置密码锁屏，无法使用指纹识别");
                        return;
                    }
                    if (!plus.fingerprint.isEnrolledFingerprints()) {
                        plus.nativeUI.alert("此设备未录入指纹，请到设置中开启");
                        return;
                    }
                    //开启指纹识别验证()
                    var waiting = null;
                    plus.fingerprint.authenticate(
                        function () {
                            // plus.nativeUI.alert('指纹识别成功');
                            //开启识别成功的加载状态
                            _this.shiz = true;
                            // //关掉指纹的样式弹窗
                            _this.show1 = false;
                            // //  调用拿取密码的方法
                            _this.wendmi();
                        },
                        function (e) {
                            switch (e.code) {
                                case e.AUTHENTICATE_MISMATCH:
                                    plus.nativeUI.toast("指纹匹配失败，请重新输入");
                                    _this.fingertext = "指纹匹配失败，请重试";
                                    break;
                                case e.AUTHENTICATE_OVERLIMIT:
                                    plus.nativeUI.alert("识别次数超出限制，请使用密码进行支付！");
                                    //密码弹窗起来 指纹样式下去
                                    _this.show1 = false;
                                    _this.jintan = true;
                                    _this.showFinger = false;
                                    break;
                                default:
                                    plus.nativeUI.alert("指纹识别失败(" + e.code + ")，请重试");
                                    _this.fingertext = "指纹识别失败(" + e.code + ")，请重试";
                                    break;
                            }
                        }
                    );
                } else {
                    plus.nativeUI.alert("当前环境不支持指纹识别API，请更新到最新版本");
                }
            },
            //指纹成功后调取的方式
            wendmi() {
                let mis = localStorage.getItem("jinmi");
                if (!mis) {
                    this.cz3 = true;
                    setTimeout(() => {
                        this.$router.push("/user");
                    }, 2000);
                    return;
                }
                this.anmi1 = mis;
                this.qjin(mis);
            },
            //取消
            bucz() {
                this.czkj = false;
                this.shu = "";
            },
            //确定充值
            quecz() {
                let that = this;
                if (!that.shu || that.shu < 1) {
                    that.cz1 = true;
                    return;
                }
                //当地址 金额 通过验证后 首先判断开启了指纹支付没有
                let zw = localStorage.getItem("zhiwens");
                if (zw) {
                    //  弹出指纹样式
                    that.show1 = true;
                    //  下面是真正的指纹方法
                    that.wenfus();
                } else {
                    //没有开启指纹 弹出密码框
                    that.jintan = true;
                    that.czkj = false;
                }
            },
            //查看矿机
            kankj() {
                this.$router.push("/wjis");
            },
            saodi() {
                this.$router.push({
                    path:'/sao',
                    query:{
                        id:'UEM'
                    }
                })
            },
            toexpenses() {
                this.$router.push({
                    path:'/watorder',
                    query:{
                        id:'UEM'
                    }

                })
            },
            xuanze(e) {
                let that = this
                if (e == 1) {
                    //全部
                    that.train = 1
                    that.shuju = that.shuju3
                } else if (e == 2) {
                    //收入
                    that.train = 2
                    this.shuju = that.shuju1
                } else if (e == 3) {
                    //支出
                    that.train = 3
                    this.shuju = that.shuju2
                }
            },
            // 跳转糖包记录
            tlu1() {
                // console.log('查看糖包记录') 同时将红包金额过去
                this.$router.push({name: 'tanglu', params: {bi: 'ulam', jin: this.waljin}})
            },
            tib() {
                this.$router.push({
                    path:'/tibis',
                    query:{
                        id:'UEM'
                    }
                })
            },
            //充币
            abi() {
                this.$router.push({name: 'addbi', params: {id: 'ulam'}})
            },
            fabao() {

                // this.isflash = true;

                this.$router.push({
                    path:"/flash",
                })
            },
            //  查看记录
            zhilu() {
                this.$router.push('/watorder')
            },
            //进入详情
            yiqing(e) {
                this.$router.push({name: 'watqing', params: {id: e}})
            },
            jj1() {
                this.gotra(this.jishu + 1)
            },
            //  去上
            ganshang() {
                // document.documentElement.scrollTop = document.body.scrollTop = 0;
                let that = this
                console.log(789)
                //元素加载完后，始终置右
                that.$nextTick(() => {
                    let dom = that.$refs.sbox;
                    dom.marginTop = 400
                });
            },
            fanhui1() {
                this.$router.push('/index')
            },
            //  转账
            zhuan1() {
                this.$router.push('/tra')
            },
            addkjtosuff(){
                this.$router.push({
                    path:'/successful',
                    query:{
                        id:3
                    }
                })
            },
            //  复制地址
            copy() {
                let clipboard = new Clipboard('.zi4')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.ss3 = true
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
            //  处理人民币价格
            chujia(e) {
                let a = localStorage.getItem('jia');
                a = JSON.parse(a)
                let b = parseFloat(a.uem) * e
                return b.toFixed(2)
            },
            diaoqu() {

                let that = this
                let a = that.users.hu
                let b = that.users.mima
                console.log('手机:' + a + ',密码:' + b)
                //主网钱包ip
                that.axios.post(that.ull + '/ulam_wallet',
                    {
                        "mobile": parseInt(a),
                        "password": b
                    }).then(response => {
                    that.ss1 = false;
                    that.loadings = false;
                    console.log(response.data)
                    if (response.data[0]) {
                        that.wal = response.data[0];
                        that.waljin = response.data[0].balance_uem;
                        //获取到钱包信息 地址和余额
                        localStorage.setItem("wals", JSON.stringify(that.wal));
                        //拿到地址查交易情况
                        that.dizhi = that.wal.addr;
                        //  调用查看方法
                        that.gotra(1)
                        return
                    }
                    that.ss4 = true
                    setTimeout(() => {
                        localStorage.removeItem("user");
                        //删除钱包数据
                        localStorage.removeItem("wals");
                        //头像
                        localStorage.removeItem("tellertx");
                        //资金密码
                        localStorage.removeItem("jinmi");
                        //是否开启指纹
                        localStorage.removeItem('zhiwens')
                        this.$router.push('/zhu')
                    }, 2000)
                }).catch(function (error) {
                    that.ss1 = false
                    that.ss4 = true
                    console.log(error);
                })


                that.diaoge1();
            },
            kanjl() {
                // this.$router.push('/jilu');
                this.$router.push({name: "jilu", params: {id: "index"}});
            },
            gotra(b) {
                // let that = this
                // //显示加载
                // if (b > 1) {
                //     that.ss1 = true
                // }
                // that.axios.post('http://47.92.225.161:5000/get_account', {
                //     "account": that.dizhi,
                //     "Page": b
                // }).then(response => {
                //     let das = response.data
                //     let la = das[0].Num
                //     if (la == 0) {
                //         that.ss1 = false
                //         that.jiaoxian = false
                //         console.log('没有记录')
                //         return;
                //     }
                //     that.jiaoxian = true
                //     that.zshu = la
                //     //赋值当前页数
                //     that.jishu = b
                //     //判断是否存在数据
                //     if (that.shuju3) {
                //         that.shuju3 = that.shuju3.concat(das.slice(1))
                //     } else {
                //         that.shuju3 = das.slice(1);
                //     }
                //     //处理数据,增加 转出 和转入  在方法内赋值真正的内容，因为要考虑到在转出和接收页面时点击下一页，不会影响整个数据流
                //     that.lishuju(that.shuju3)
                //     //判断尾部 到底显示什么
                //     if (la < 31) {
                //         that.yys = 1
                //     } else {
                //         let yu = Math.ceil(la / 30)
                //         //得出总页数
                //         that.yys = yu
                //         if (b >= that.yys) {
                //             // console.log('已经是最后一页')  判断当前第几页了
                //             that.ayin = false
                //             that.xiao = true
                //         } else {
                //             that.ayin = true
                //         }
                //     }
                // }).catch(function (error) {
                //     that.ss1 = false
                //     console.log(error)
                //     if (error.response.status === 429) {
                //         console.log('频率快')
                //     }
                // })
            },
            gobacks(){
                this.$router.push('/ulamDetail')
            },
            //  处理数据
            lishuju(e) {
                //接收的数据 --转出的数据
                let shu1 = []
                let shu2 = []
                //  拿到当前的数据 进行处理 ee为子元素
                e.map(function (ee) {
                    if (ee.direction == 'to') {
                        shu1.push(ee);
                    } else {
                        shu2.push(ee)
                    }
                })
                //将数据保存
                this.shuju1 = shu1
                this.shuju2 = shu2
                //  判断当前所选择的状态 进行真正的复制信息 that.shuju = that.shuju3
                if (this.train == 3) {
                    // console.log('转出')
                    this.shuju = shu2
                } else if (this.train == 2) {
                    // console.log('接收')
                    this.shuju = shu1
                } else {
                    // console.log('全部')
                    this.shuju = this.shuju3
                }
                //执行完毕后 加载结束
                this.ss1 = false
            }
        }
    }
</script>

<style scoped>
  .zis1 {
    color: #676666;
    font-size: 15px;
  }

  .main-content {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }

  .lala {
    overflow-y: auto;
  }

  .hongzi {
    color: #9a55ff;
  }

  .daili {
    color: #9a55ff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .kuItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e2e2;
    padding: 5px 0;
    height: 40px;
    line-height: 40px;
  }

  .yun {
    color: #919090;
    line-height: 54px;
    font-size: 14px;
  }

  .arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #f5f5f5;
    position: relative;
    top: -10px;
  }

  .zi1 {
    text-align: right;
    margin-top: -7px;
    color: #919090;
    font-size: 15px;
  }

  .zizi {
    font-size: 26px;
    font-weight: 700;
    color: #9a55ff;
  }

  .zipan {
    font-size: 12px;
    color: #919090;
    font-weight: 400;;
  }

  .bizhong {
    box-shadow: 0 0 4px #e9e2dd;
    border-radius: 8px;
    background: #fff;
    position: relative;
    width: 86%;
    margin: 0 auto;
    padding: 10px 20px 10px;
    box-sizing: border-box;
  }

  .lala {
    overflow-y: auto;
  }

  .hezi {
    height: 40px;
    width: 100%;
    background: #f5f5f5;
    border-radius: 6px;
    padding-left: 15px;
    box-sizing: border-box;
    line-height: 40px;
    margin-top: -5px;
    padding-right: 15px;
  }

  .in2 {
    border: none;
    outline: none;
    color: #999;
    width: 100%;
    background: #f5f5f5;
    text-align: center;
    font-size: 18px;
    letter-spacing: 2px;
  }

  .heizi {
    color: #030303;
    font-size: 15px;
    letter-spacing: 1px;
  }

  .flex3 {
    font-size: 16px;
    color: #F4451A;
  }

  .cz1 {
    color: #fff;
    text-align: center;
    letter-spacing: 2px;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    border-radius: 7px;
    margin: 10px auto;
    width: 80%;
  }

  .dai1 {
    padding: 0 20px;
  }

  .buylu {
    height: 20px;
    color: #c0bfc4;
    background: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    border-top-left-radius: 50px;
    box-shadow: 2px 2px 1px #c0bfc4;
    border-bottom-left-radius: 50px;
    float: right;
    margin-right: -19px;
    margin-top: -45px;
  }

  .flex1 {
    color: #919090;
    font-size: 14px;
  }

  .flex2 {
    text-align: right;
    color: #030303;
    font-size: 14px;
  }

  .xzhu {
    width: 100%;
    height: 200px;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;
  }

  .wenwang {
    margin-top: 20px;
    border: 1px solid #9a55ff;
    color: #9a55ff;
    font-size: 14px;
    width: 70px;
    text-align: center;
    border-radius: 4px;
    height: 24px;
    line-height: 24px;
    float: right;
  }

  .szi2 {
    font-size: 14px;
    font-weight: 700;
  }

  .shengji {
    width: 100%;
    height: 40px;
    background: #1cc6e2;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .yi {
    width: 100%;
    margin-top: 10px;
    border-bottom: 0.5px solid #eee;
    padding-bottom: 12px;
  }

  .zz2 {
    margin-top: 5px;
    color: #999;
    font-size: 12px;
  }

  .zz1 {
    font-size: 14px;
  }

  .zi2 {
    color: #9b9b9b;
    margin-top: 20px;
  }

  .zi3 {
    color: #9b9b9b;
  }

  .zi4 {
    margin-top: 20px;
    padding: 10px;
    background: #11bcd8;
    width: 40%;
    border-radius: 20px;
    box-sizing: border-box;
    color: white;
    margin-left: 30%;
  }

  /*.buylu {*/
  /*  height: 20px;*/
  /*  color: #fff;*/
  /*  background: #c0bfc4;*/
  /*  text-align: center;*/
  /*  line-height: 20px;*/
  /*  font-size: 12px;*/
  /*  letter-spacing: 1px;*/
  /*  border-top-left-radius: 50px;*/
  /*  border-bottom-left-radius: 50px;*/
  /*  float: right;*/
  /*  margin-right: -19px;*/
  /*  margin-bottom: 10px;*/
  /*}*/

  .flex1 {
    color: #919090;
    font-size: 14px;
  }

  .flex2 {
    text-align: right;
    color: #030303;
    font-size: 14px;
  }

  .arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #f5f5f5;
  }

  .dai1 {
    width: 100%;
    background: #fff;
    padding: 15px 19px;
    box-sizing: border-box;
    position: relative;
  }

  .daili {
    font-size: 16px;
    color: #9a55ff;
  }

  .yun {
    color: #8e8e8e;
    margin-top: -8px;
    /*color:#919090;line-height:38px;*/
  }

  .bizhong {
    box-shadow: 0 0 2px #e1d2f7;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background: #fff;
    position: relative;
    width: 86%;
    margin: 0 auto;
    top: -32px;
  }

  .quean {
    width: 100%;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
  }

  .quan1 {
    width: 100%;
    background: #f5f5f5;
    padding: 5px 10px;
    color: #7f7e7e;
    border-radius: 5px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .login {
    letter-spacing: 1px;
    border: none;
    outline: none;
    color: #7f7e7e;
    width: 100%;
    text-align: center;
    background: #f5f5f5;
    font-size: 15px;
  }

  .loginke {
    height: 42px;
    overflow: hidden;
    background: #f5f5f5;
    margin: 20px auto;
    padding-left: 15px;
    box-sizing: border-box;
    line-height: 42px;
    padding-right: 15px;
    border-radius: 8px;
  }

  .login::-webkit-input-placeholder {
    color: #b0b1b3;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }

  .lala {
    overflow-y: auto;
  }

  .hezi {
    height: 40px;
    width: 100%;
    background: #f5f5f5;
    border-radius: 6px;
    padding-left: 15px;
    box-sizing: border-box;
    line-height: 40px;
    margin-top: -5px;
    padding-right: 15px;
  }

  .in2 {
    border: none;
    outline: none;
    color: #999;
    width: 100%;
    background: #f5f5f5;
    text-align: center;
    font-size: 18px;
    letter-spacing: 2px;
  }

  /*@import '../../pf/quanju.css';*/
  .banzi {
    font-size: 16px;
    color: #666;
    background: white;
    border: 1px solid white;
    line-height: 1.5;
    height: 80px;
    width: 94%;
    resize: none;
  }

  .z3 {
    font-size: 14px;
  }

  .z1 {
    color: #9a55ff;
    font-size: 14px;
  }

  .z2 {
    color: #9a55ff;
    font-size: 18px;
    margin-top: 3px;
  }
</style>
