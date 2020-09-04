<!--<template>-->
<!--  <div style="background:#fff;" :style="{ height: bodyHeight + 'px' }" class="lala">-->

<!--    <Scroll class="main-content">-->
<!--      <div>-->
<!--        <div style="width:100%;">-->
<!--          <div class="xzhu">-->
<!--            <div style="height:70px;display: flex;justify-content: space-between;line-height: 70px;align-items: center">-->
<!--              <img @click="gobacks" src="@/assets/2_03.png" alt="" style="display: block;width: 26px;height: 26px" >-->
<!--              <div @click="toexpenses" style="font-size: 12px">收支记录</div>-->
<!--            </div>-->
<!--            <flexbox :gutter="0" style="text-align:center;font-size:12px;">-->
<!--              <flexbox-item>-->
<!--                <div v-on:click="saodi">-->
<!--                  <img src="@/assets/newpage/sao.png" alt="" style="width:32px;">-->
<!--                  <p style="line-height: 30px">扫一扫</p>-->
<!--                </div>-->
<!--              </flexbox-item>-->
<!--              <flexbox-item>-->
<!--                <div class="flex-demo" v-on:click="abi">-->
<!--                  <img src="@/assets/newpage/ema.png" alt="" style="width:32px;">-->
<!--                  <p style="line-height: 30px">二维码</p>-->
<!--                </div>-->
<!--              </flexbox-item>-->
<!--              <flexbox-item>-->
<!--                <div class="flex-demo" v-on:click="tib">-->
<!--                  <img src="@/assets/newpage/tra.png" alt="" style="width:32px;">-->
<!--                  <p style="line-height: 30px">转 &nbsp;账</p>-->
<!--                </div>-->
<!--              </flexbox-item>-->
<!--              <flexbox-item>-->
<!--                <div class="flex-demo" v-on:click="fabao">-->
<!--                  <img src="@/assets/newpage/tang.png" alt="" style="width:32px;">-->
<!--                  <p style="line-height: 30px">糖 &nbsp;包</p>-->
<!--                </div>-->
<!--              </flexbox-item>-->
<!--            </flexbox>-->
<!--          </div>-->
<!--          &lt;!&ndash;钱包余额&ndash;&gt;-->
<!--          <div style="width:100%;background:#f5f5f5;">-->
<!--            <div class="bizhong">-->
<!--              <p class="zis1">总资产</p>-->
<!--              <div style="height: 5px"></div>-->
<!--              <p class="zizi" v-if="waljin">{{waljin.toFixed(2)}} <span class="zipan">&nbsp;ULAM</span></p>-->
<!--              <p class="zizi" v-if="!waljin">0.00 <span class="zipan">&nbsp;ULAM</span></p>-->
<!--              <p class="zi1">≈&nbsp{{waljin?chujia(waljin):0}}</p>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div style="clear:both;"></div>-->
<!--          <div style="width:100%;height:4px;background:#f5f5f5;"></div>-->
<!--        </div>-->
<!--        <div-->
<!--          style="width:100%;height:50px;background:#fff;margin-top:-17px;padding:19px;box-sizing: border-box;"-->
<!--        >-->
<!--          <div class="daili" style="line-height:15px;">-->
<!--            <img src="@/assets/huo.png" alt="" style="width: 20px;height: auto;display: block">-->
<!--            <p style="width: 8px;"></p>-->
<!--            <span style="font-size: 14px;color: #000">代理矿机</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="xkj" class="dai1">-->
<!--          <div class="buylu" v-on:click="kankj">&nbsp;&nbsp;查看矿机</div>-->

<!--          <div style="background: #f5f5f5;margin-top: 10px;padding: 0 20px;border-radius: 6px">-->
<!--            <div class="kuItem">-->
<!--              <div class="flex1">矿机总金额</div>-->
<!--              <div class="flex2">{{zu?zu.toFixed(2):zu}}ulam</div>-->
<!--            </div>-->

<!--            <div class="kuItem">-->
<!--              <div class="flex1">矿机总量</div>-->
<!--              <div class="flex2">{{nums+zs}}台</div>-->
<!--            </div>-->

<!--            <div class="kuItem">-->
<!--              <div class="flex1">矿机总打包数</div>-->
<!--              <div class="flex2">{{kuangjiNum}}个</div>-->
<!--            </div>-->

<!--            <div class="kuItem" style="border-bottom: 0">-->
<!--              <div class="flex1">钱包余额</div>-->
<!--              <div class="flex2">{{waljin?waljin.toFixed(2):waljin}}ulam</div>-->
<!--            </div>-->


<!--          </div>-->


<!--          &lt;!&ndash;充值矿机&ndash;&gt;-->
<!--          <div style="padding:20px 0;box-sizing:border-box;">-->
<!--            <div class="cz1 backcolors" v-on:click="addkj">充值矿机</div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div style="height: 60px"></div>-->
<!--      </div>-->
<!--    </Scroll>-->

<!--    &lt;!&ndash;    <div style="height:3px;background:#F5F5F5;"></div>&ndash;&gt;-->
<!--    &lt;!&ndash;代理矿机&ndash;&gt;-->



<!--    &lt;!&ndash;云矿机购买&ndash;&gt;-->
<!--    &lt;!&ndash;充值矿机&ndash;&gt;-->
<!--    <popup v-model="czkj" height="460px" is-transparent>-->
<!--      <div-->
<!--        style="background-color:#fff;height:460px;border-top-left-radius:5px;border-top-right-radius:5px;"-->
<!--      >-->
<!--        <div style="height:10px;"></div>-->
<!--        <div style="padding:15px 30px;box-sizing:border-box;">-->
<!--          <p style="text-align:center;font-size:17px;" class="yinzi">-->
<!--            钱包余额-->
<!--            <span-->
<!--              v-if="qian"-->
<!--              style="font-size:30px;margin-left:8px;color:#9a55ff;"-->
<!--            >{{qian?qian.toFixed(2):0}}</span>-->
<!--          </p>-->
<!--          <div class="loginke">-->
<!--            <input type="number" class="login" v-model="shu" placeholder="输入充值矿机数量"/>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div style="padding:15px 30px;">-->
<!--          <p style="font-size:14px;line-height: 20px">-->
<!--            <span style="color:#9a55ff;" v-if="addulam">{{addulam}}ulam</span>-->
<!--            <span style="color:#9a55ff;" v-if="!addulam">-->
<!--              <inline-loading></inline-loading>ulam-->
<!--            </span>-->
<!--            可充值一台矿机，请您根据自己的余额合理输入矿机数量，其中4000ulam进行挖矿，超出4000ulam的部分将作为代挖服务器费用.-->
<!--          </p>-->
<!--          <p style="line-height: 20px;color:#ff3d17;font-size:11px;margin-top:10px;">-->
<!--            备注：-->
<!--            <br/>1.请最少保留1个ulam来用作官方转账手续费-->
<!--            <br/>2.成功打包后收取30%作为平台服务费-->
<!--            <br/>3.矿机内大于4000以上的ULAM将收取30%作为服务费(无论充值还是打包)-->
<!--          </p>-->
<!--        </div>-->
<!--        <div style="padding:30px;box-sizing: border-box;">-->
<!--          <flexbox :gutter="30">-->
<!--            <flexbox-item>-->
<!--              <div class="quean backcolors" v-on:click="quecz">确定</div>-->
<!--            </flexbox-item>-->
<!--            <flexbox-item>-->
<!--              <div class="quan1" v-on:click="bucz">取消</div>-->
<!--            </flexbox-item>-->
<!--          </flexbox>-->
<!--        </div>-->
<!--      </div>-->
<!--    </popup>-->
<!--    &lt;!&ndash; 指纹提醒 &ndash;&gt;-->
<!--    <alert v-model="show1" title="请验证指纹" @on-show="onShow" @on-hide="onHide" button-text="取消使用密码">-->
<!--      <div style>-->
<!--        <div style="height:20px;"></div>-->
<!--        <img src="@/assets/icos/zw.png" alt style="width:80px;"/>-->
<!--        <div style="height:10px;"></div>-->
<!--      </div>-->
<!--    </alert>-->
<!--    &lt;!&ndash;资金密码框&ndash;&gt;-->
<!--    <popup-->
<!--      v-model="jintan"-->
<!--      height="310px"-->
<!--      is-transparent-->
<!--      position="top"-->
<!--      style="top:15vh;"-->
<!--      :hide-on-blur="false"-->
<!--    >-->
<!--      <div-->
<!--        style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;"-->
<!--      >-->
<!--        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">-->
<!--          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>-->
<!--        </div>-->
<!--        <div style="padding: 0 15px">-->
<!--          <group>-->
<!--            <x-input v-model="anmi1"  type="password" placeholder="请输入资金密码"></x-input>-->
<!--          </group>-->
<!--        </div>-->
<!--        <div style="padding:20px 15px;margin-top:25px;">-->
<!--          &lt;!&ndash;          <x-button&ndash;&gt;-->
<!--          &lt;!&ndash;            @click.native="qjin()"&ndash;&gt;-->
<!--          &lt;!&ndash;            :style="{ background: quan.color,color:'#fff',height:'40px',fontSize: '14px'}"&ndash;&gt;-->
<!--          &lt;!&ndash;          >确认&ndash;&gt;-->
<!--          &lt;!&ndash;          </x-button>&ndash;&gt;-->
<!--          <div class="botmOk" @click="qjin()">确 认</div>-->
<!--          <div style="height: 10px"></div>-->
<!--          <div class="botmNO"  @click="bjin">取 消</div>-->
<!--          &lt;!&ndash;          <x-button @click.native="bjin" style="height:40px;font-size: 14px;">取消</x-button>&ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
<!--    </popup>-->


<!--    &lt;!&ndash;<div style="height:40px;"></div>&ndash;&gt;-->
<!--    <loading :show="ss1" text="加载中.."></loading>-->
<!--    <toast v-model="ss3" :time="1000" is-show-mask text="复制成功!"></toast>-->
<!--    <toast v-model="ss4" type="cancel" :time="2000" is-show-mask text="钱包异常!请重新登录~" width="18em"></toast>-->
<!--    <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="请输入数量/密码等信息!" width="18em"></toast>-->
<!--    <toast v-model="ss7" type="cancel" :time="1600" is-show-mask text="资金密码有误!" width="18em"></toast>-->
<!--    <toast v-model="ss8" type="cancel" :time="1600" is-show-mask text="余额不足!请持有足够金额" width="18em"></toast>-->
<!--    <toast v-model="ss9" :time="2200" is-show-mask text="恭喜您!生成矿机成功!" width="18em"></toast>-->
<!--    &lt;!&ndash;    <toast v-model="sh9"  type="cancel" :time="2000" is-show-mask text="未检测到资金密码!请在设置中添加" width="18em"></toast>&ndash;&gt;-->
<!--    <toast v-model="cz2" type="cancel" :time="1800" is-show-mask text="资金密码有误！" width="18em"></toast>-->
<!--    <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁" width="18em"></toast>-->
<!--    <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask width="18em">{{tishi}}</toast>-->
<!--    <toast-->
<!--      v-model="cz3"-->
<!--      type="cancel"-->
<!--      :time="2000"-->
<!--      is-show-mask-->
<!--      text="未检测到资金密码!请在设置中添加"-->
<!--      width="18em"-->
<!--    ></toast>-->
<!--    <toast v-model="cz4" type="cancel" :time="1500" is-show-mask text="余额不足！请持有足够金额" width="18em"></toast>-->
<!--    <toast v-model="cz5" :time="2200" is-show-mask text="充值矿机成功!" width="18em"></toast>-->
<!--    <toast v-model="ss10" type="cancel" :time="1600" is-show-mask text="请求异常!请重新操作" width="18em"></toast>-->

<!--    &lt;!&ndash;固定底部按钮&ndash;&gt;-->
<!--&lt;!&ndash;    <bottomNav :flag="0"></bottomNav>&ndash;&gt;-->

<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--    import Clipboard from 'clipboard';-->
<!--    import Scroll from "@/base/scroll/scroll";-->
<!--    import {-->
<!--        InlineLoading,-->
<!--        Divider,-->
<!--        XHeader,-->
<!--        Toast,-->
<!--        XInput,-->
<!--        Group,-->
<!--        Icon,-->
<!--        XButton,-->
<!--        Loading,-->
<!--        Alert,-->
<!--        Flexbox,-->
<!--        FlexboxItem,-->
<!--        XDialog,-->
<!--        Qrcode,-->
<!--        Popup,-->
<!--        Tabbar,-->
<!--        TabbarItem-->
<!--    } from 'vux'-->

<!--    export default {-->
<!--        name: "ulamDetail",-->
<!--        components: {-->
<!--            Divider,-->
<!--            InlineLoading,-->
<!--            XHeader,-->
<!--            XInput,-->
<!--            Toast,-->
<!--            Group,-->
<!--            Icon,-->
<!--            XButton,-->
<!--            Loading,-->
<!--            Alert,-->
<!--            Flexbox,-->
<!--            FlexboxItem,-->
<!--            XDialog,-->
<!--            Qrcode,-->
<!--            Popup,-->
<!--            Tabbar,-->
<!--            TabbarItem,-->
<!--            Scroll-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                cz2: false,-->
<!--                cz3: false,-->
<!--                cz4: false,-->
<!--                cz5: false,-->
<!--                cjin: false, cjin1: false, tishi: '', nums: 0,-->
<!--                zs: 0,-->
<!--                qian: 0,-->
<!--                jintan: false,-->

<!--                addulam: 0,-->
<!--                xkj: true,-->
<!--                czkj: false,-->
<!--                zu: 0,-->
<!--                maishu: "",-->
<!--                //个人信息-->
<!--                users: '',-->
<!--                //  个人钱包-->
<!--                wal: '',-->
<!--                waljin: '',-->
<!--                ss1: false,-->
<!--                ss2: false,-->
<!--                ss3: false,-->
<!--                ss4: false,-->
<!--                ss5: false,-->
<!--                ss6: false,-->
<!--                ss7: false,-->
<!--                ss8: false,-->
<!--                ss9: false,-->
<!--                ss10: false,-->
<!--                wtel: '',-->
<!--                //  当前交易记录的变量-->
<!--                zshu: 0,-->
<!--                jishu: 0,-->
<!--                shuju3: '',-->
<!--                jiaoxian: false,-->
<!--                ghuan: './static/up.png',-->
<!--                ghuan1: './static/down.png',-->
<!--                shuju: '',-->
<!--                shuju1: '',-->
<!--                shuju2: '',-->
<!--                //页数-->
<!--                yys: 1,-->
<!--                ayin: false,-->
<!--                xiao: false,-->
<!--                show2: false,-->
<!--                menus2: {m1: '发糖包',},-->
<!--                anmi1: '',-->
<!--                shu: '',-->
<!--                bodyHeight: '',-->
<!--                train: 1,-->
<!--                dizhi: '',-->
<!--                loadings: false,-->
<!--                zhenprice: 0,-->
<!--                show1: false,-->
<!--                kuangjiNum:0-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            if (window.plus) {-->
<!--                window.plus.navigator.setStatusBarStyle('white')-->
<!--            }-->
<!--            let that = this-->
<!--            //  获取当前高度-->
<!--            that.bodyHeight = document.documentElement.clientHeight-->
<!--            let message = localStorage.getItem('user');-->
<!--            if (!message) {-->
<!--                that.$router.push('/zhu')-->
<!--                return-->
<!--            } else {-->
<!--                message = JSON.parse(message);-->
<!--                that.users = message;-->
<!--                // that.ss1 = true;-->
<!--                this.loadings = true;-->
<!--                that.diaoqu();-->
<!--                console.log('!!!!!!!!!!!!!!!!!!!!!!!')-->
<!--                //请求这个代理矿机-->


<!--                // that.diaoges();-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            ull() {-->
<!--                return this.$store.state.uri;-->
<!--            },-->
<!--            quan() {-->
<!--                return this.$store.state.zuli;-->
<!--            }-->
<!--        },-->

<!--        methods: {-->
<!--            //指纹弹窗消失和隐藏-->
<!--            onHide() {-->
<!--                let that = this;-->
<!--                if (!that.shiz) {-->
<!--                    that.czkj = false;-->
<!--                    that.jintan = true;-->
<!--                }-->
<!--            },-->
<!--            onShow() {-->
<!--            },-->
<!--            maiji() {-->
<!--                let that = this;-->
<!--                let shu = that.maishu;-->
<!--                if (shu <= 0) {-->
<!--                    that.ss4 = true;-->
<!--                    return;-->
<!--                }-->
<!--                that.ss5 = true;-->
<!--                that.go2(that.zhenprice);-->
<!--            },-->
<!--            addkj() {-->
<!--                this.czkj = true;-->
<!--                // 同时请求文字-->
<!--                this.buybiin();-->
<!--            },-->
<!--            diaoge1() {-->
<!--                let that = this;-->
<!--                //主网-->
<!--                that.axios-->
<!--                    .post(that.ull + "/search_miner_tg", {-->
<!--                        mobile: parseInt(that.users.hu),-->
<!--                        password: that.users.mima-->
<!--                    })-->
<!--                    .then(response => {-->

<!--                        // console.log(response.data);-->
<!--                        if (response.data == "miner_error") {-->
<!--                            return;-->
<!--                        }-->

<!--                        //将个人矿机数据遍历-->
<!--                        if (response.data.length > 0) {-->
<!--                            let a = response.data;-->
<!--                            //  算矿机数量-->
<!--                            that.zs = a.length;-->
<!--                            let b = 0;-->
<!--                            let c = 0;-->
<!--                            //   console.log('@@@@@@@@@@@@@@@@@@@@@@');-->
<!--                            a.map(item => {-->

<!--                                b = b + item.Balance;-->
<!--                                c = c + item.Packing_Number;-->
<!--                            });-->
<!--                            //得出总数-->
<!--                            console.log(b, '总价',c)-->
<!--                            that.zu += b;-->
<!--                            that.kuangjiNum += c;-->

<!--                        } else {-->
<!--                            console.log("没有");-->
<!--                        }-->

<!--                        that.diaoges()-->

<!--                    })-->
<!--                    .catch(function (error) {-->

<!--                        that.diaoges()-->
<!--                    });-->


<!--            },-->
<!--            //请求云矿机数据-->
<!--            diaoges() {-->
<!--                let that = this;-->
<!--                //主网-->
<!--                that.axios.post(that.ull + '/search_miner',-->
<!--                    {-->
<!--                        "mobile": parseInt(that.users.hu),-->
<!--                        "password": that.users.mima-->
<!--                    }-->
<!--                ).then(response => {-->
<!--                    //将个人矿机数据遍历-->
<!--                    console.log(response, '云矿机')-->
<!--                    let a = response.data;-->
<!--                    //  算矿机数量-->
<!--                    // that.zs += a.length;-->
<!--                    let b = 0;-->
<!--                    let c = 0;-->
<!--                    a.map(item => {-->
<!--                        b = b + item.Balance;-->
<!--                        c = c + item.Packing_Number-->
<!--                    });-->
<!--                    //得出总数-->
<!--                    console.log(b, '总价',c,'总数', that.kuangjiNum)-->
<!--                    that.zu += b;-->
<!--                    that.kuangjiNum += c;-->

<!--                    this.nums = response.data ? response.data.length : 0;-->
<!--                })-->
<!--            },-->
<!--            //多少ulam充值代理框架-->
<!--            buybiin() {-->
<!--                let that = this;-->
<!--                that.axios-->
<!--                    .get(that.ull + "/miner_tg_price")-->
<!--                    .then(response => {-->
<!--                        console.log(response.data);-->
<!--                        that.addulam = response.data;-->
<!--                    })-->
<!--                    .catch(function (error) {-->
<!--                        console.log(error);-->
<!--                    });-->
<!--            },-->
<!--            //确认输入密码  充值代理矿机-->
<!--            qjin(xmi) {-->
<!--                let that = this;-->
<!--                if (xmi) {-->
<!--                    that.anmi1 = xmi;-->
<!--                }-->
<!--                if (that.anmi1.length < 3) {-->
<!--                    that.cz2 = true;-->
<!--                    that.anmi1 = "";-->
<!--                    return;-->
<!--                }-->
<!--                if (!xmi) {-->
<!--                    that.kuxian = true;-->
<!--                }-->
<!--                //拿取账户密码。拿去新的值-->
<!--                let a = that.users.hu;-->
<!--                let b = that.users.mima;-->
<!--                that.axios-->
<!--                    .post(that.ull + "/miner_tg", {-->
<!--                        mobile: parseInt(a),-->
<!--                        password: b,-->
<!--                        drawback_passwd: that.anmi1,-->
<!--                        amount: parseInt(that.shu),-->
<!--                        price_miner: that.addulam-->
<!--                    })-->
<!--                    .then(response => {-->
<!--                        console.log(response.data);-->
<!--                        that.kuxian = false;-->
<!--                        that.shiz = false;-->

<!--                        if (response.data == "password_drawback_error") {-->
<!--                            that.cz2 = true;-->
<!--                            that.anmi1 = "";-->
<!--                            return;-->
<!--                        }-->

<!--                        if(response.data == 'password_drawback_error_null'){-->
<!--                            that.cz3 = true;-->
<!--                            that.anmi1 = "";-->
<!--                            that.shu = "";-->
<!--                            that.jintan = false;-->
<!--                            return-->
<!--                        }-->
<!--//矿机数不足-->
<!--                        if (response.data == "amount_error" || response.data == "error") {-->
<!--                            that.cz4 = true;-->
<!--                            that.anmi1 = "";-->
<!--                            that.shu = "";-->
<!--                            that.jintan = false;-->
<!--                            return;-->
<!--                        }-->
<!--                        if (response.data == "success") {-->
<!--                            that.cz5 = true;-->
<!--                            that.anmi1 = "";-->
<!--                            that.shu = "";-->
<!--                            that.jintan = false;-->
<!--                            //充值成功重新刷新钱包数据-->
<!--                            that.diaoge1();-->
<!--                            return;-->
<!--                        }-->
<!--                        that.jiemi(response.data);-->

<!--                        that.ss10 = true;-->
<!--                        that.anmi1 = "";-->
<!--                    })-->
<!--                    .catch(function (error) {-->
<!--                        that.kuxian = false;-->
<!--                        that.shiz = false;-->
<!--                        that.ss10 = true;-->
<!--                        that.anmi1 = "";-->
<!--                        // console.log(error);-->
<!--                    });-->
<!--            },-->
<!--            jiemi(a) {-->
<!--                let that = this-->
<!--                let na = a.substr(0, 12)-->
<!--                // console.log(na)-->
<!--                if (na == 'sk_error_num') {-->
<!--                    let ti = a.substr(13)-->
<!--                    console.log('截取的是:' + ti)-->
<!--                    if (ti == '0') {-->
<!--                        that.cjin = true-->
<!--                        that.anmi = ''-->
<!--                        return-->
<!--                    }-->
<!--                    that.tishi = '资金密码错误！还有' + ti + '次机会'-->
<!--                    that.cjin1 = true-->
<!--                    that.anmi = ''-->
<!--                } else {-->

<!--                }-->
<!--            },-->
<!--            //取消输入资金密码-->
<!--            bjin() {-->
<!--                let that = this;-->
<!--                that.jintan = false;-->
<!--                that.anmi1 = "";-->
<!--            },-->
<!--            wenfus() {-->
<!--                let _this = this;-->
<!--                console.log("开始指纹识别");-->
<!--                if (!window.plus) return;-->
<!--                // 检查是否支持指纹识别-->
<!--                if (plus.fingerprint) {-->
<!--                    if (!plus.fingerprint.isSupport()) {-->
<!--                        plus.nativeUI.alert("此设备不支持指纹识别");-->
<!--                        return;-->
<!--                    }-->
<!--                    if (!plus.fingerprint.isKeyguardSecure()) {-->
<!--                        plus.nativeUI.alert("此设备未设置密码锁屏，无法使用指纹识别");-->
<!--                        return;-->
<!--                    }-->
<!--                    if (!plus.fingerprint.isEnrolledFingerprints()) {-->
<!--                        plus.nativeUI.alert("此设备未录入指纹，请到设置中开启");-->
<!--                        return;-->
<!--                    }-->
<!--                    //开启指纹识别验证()-->
<!--                    var waiting = null;-->
<!--                    plus.fingerprint.authenticate(-->
<!--                        function () {-->
<!--                            // plus.nativeUI.alert('指纹识别成功');-->
<!--                            //开启识别成功的加载状态-->
<!--                            _this.shiz = true;-->
<!--                            // //关掉指纹的样式弹窗-->
<!--                            _this.show1 = false;-->
<!--                            // //  调用拿取密码的方法-->
<!--                            _this.wendmi();-->
<!--                        },-->
<!--                        function (e) {-->
<!--                            switch (e.code) {-->
<!--                                case e.AUTHENTICATE_MISMATCH:-->
<!--                                    plus.nativeUI.toast("指纹匹配失败，请重新输入");-->
<!--                                    _this.fingertext = "指纹匹配失败，请重试";-->
<!--                                    break;-->
<!--                                case e.AUTHENTICATE_OVERLIMIT:-->
<!--                                    plus.nativeUI.alert("识别次数超出限制，请使用密码进行支付！");-->
<!--                                    //密码弹窗起来 指纹样式下去-->
<!--                                    _this.show1 = false;-->
<!--                                    _this.jintan = true;-->
<!--                                    _this.showFinger = false;-->
<!--                                    break;-->
<!--                                default:-->
<!--                                    plus.nativeUI.alert("指纹识别失败(" + e.code + ")，请重试");-->
<!--                                    _this.fingertext = "指纹识别失败(" + e.code + ")，请重试";-->
<!--                                    break;-->
<!--                            }-->
<!--                        }-->
<!--                    );-->
<!--                } else {-->
<!--                    plus.nativeUI.alert("当前环境不支持指纹识别API，请更新到最新版本");-->
<!--                }-->
<!--            },-->
<!--            //指纹成功后调取的方式-->
<!--            wendmi() {-->
<!--                let mis = localStorage.getItem("jinmi");-->
<!--                if (!mis) {-->
<!--                    this.cz3 = true;-->
<!--                    setTimeout(() => {-->
<!--                        this.$router.push("/user");-->
<!--                    }, 2000);-->
<!--                    return;-->
<!--                }-->
<!--                this.qjin(mis);-->
<!--            },-->
<!--            //取消-->
<!--            bucz() {-->
<!--                this.czkj = false;-->
<!--                this.shu = "";-->
<!--            },-->
<!--            //确定充值-->
<!--            quecz() {-->
<!--                let that = this;-->
<!--                if (!that.shu || that.shu < 1) {-->
<!--                    that.cz1 = true;-->
<!--                    return;-->
<!--                }-->
<!--                //当地址 金额 通过验证后 首先判断开启了指纹支付没有-->
<!--                let zw = localStorage.getItem("zhiwens");-->
<!--                if (zw) {-->
<!--                    //  弹出指纹样式-->
<!--                    that.show1 = true;-->
<!--                    //  下面是真正的指纹方法-->
<!--                    that.wenfus();-->
<!--                } else {-->
<!--                    //没有开启指纹 弹出密码框-->
<!--                    that.jintan = true;-->
<!--                    that.czkj = false;-->
<!--                }-->
<!--            },-->
<!--            //查看矿机-->
<!--            kankj() {-->
<!--                this.$router.push("/wjis");-->
<!--            },-->
<!--            saodi() {-->
<!--                this.$router.push({-->
<!--                    path:'/sao',-->
<!--                    query:{-->
<!--                        id:'ULAM'-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            toexpenses() {-->
<!--                this.$router.push({-->
<!--                    path:'/watorder',-->
<!--                    query:{-->
<!--                        id:'ULAM'-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            xuanze(e) {-->
<!--                let that = this-->
<!--                if (e == 1) {-->
<!--                    //全部-->
<!--                    that.train = 1-->
<!--                    that.shuju = that.shuju3-->
<!--                } else if (e == 2) {-->
<!--                    //收入-->
<!--                    that.train = 2-->
<!--                    this.shuju = that.shuju1-->
<!--                } else if (e == 3) {-->
<!--                    //支出-->
<!--                    that.train = 3-->
<!--                    this.shuju = that.shuju2-->
<!--                }-->
<!--            },-->
<!--            // 跳转糖包记录-->
<!--            tlu1() {-->
<!--                // console.log('查看糖包记录') 同时将红包金额过去-->
<!--                this.$router.push({name: 'tanglu', params: {bi: 'ulam', jin: this.waljin}})-->
<!--            },-->
<!--            tib() {-->
<!--                this.$router.push({-->
<!--                    path:'/tibis',-->
<!--                    query:{-->
<!--                        id:'ULAM'-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            //充币-->
<!--            abi() {-->
<!--                this.$router.push({name: 'addbi', params: {id: 'ulam'}})-->
<!--            },-->
<!--            fabao() {-->
<!--                this.$router.push('/bag')-->
<!--            },-->
<!--            //  查看记录-->
<!--            zhilu() {-->

<!--                this.$router.push({-->
<!--                    path:'/watorder',-->
<!--                    id:'ULAM'-->
<!--                })-->
<!--            },-->
<!--            //进入详情-->
<!--            yiqing(e) {-->
<!--                this.$router.push({name: 'watqing', params: {id: e}})-->
<!--            },-->
<!--            jj1() {-->
<!--                this.gotra(this.jishu + 1)-->
<!--            },-->
<!--            //  去上-->
<!--            ganshang() {-->
<!--                // document.documentElement.scrollTop = document.body.scrollTop = 0;-->
<!--                let that = this-->
<!--                console.log(789)-->
<!--                //元素加载完后，始终置右-->
<!--                that.$nextTick(() => {-->
<!--                    let dom = that.$refs.sbox;-->
<!--                    dom.marginTop = 400-->
<!--                });-->
<!--            },-->
<!--            fanhui1() {-->
<!--                this.$router.push('/wallet')-->
<!--            },-->
<!--            //  转账-->
<!--            zhuan1() {-->
<!--                this.$router.push('/tra')-->
<!--            },-->
<!--            //  复制地址-->
<!--            copy() {-->
<!--                let clipboard = new Clipboard('.zi4')-->
<!--                clipboard.on('success', e => {-->
<!--                    console.log('复制成功')-->
<!--                    this.ss3 = true-->
<!--                    // 释放内存-->
<!--                    clipboard.destroy()-->
<!--                })-->
<!--                clipboard.on('error', e => {-->
<!--                    // 不支持复制-->
<!--                    console.log('该浏览器不支持自动复制')-->
<!--                    // 释放内存-->
<!--                    clipboard.destroy()-->
<!--                })-->
<!--            },-->
<!--            //  处理人民币价格-->
<!--            chujia(e) {-->
<!--                let a = localStorage.getItem('jia');-->
<!--                a = JSON.parse(a)-->
<!--                let b = parseFloat(a.ulam) * e-->
<!--                return b.toFixed(2)-->
<!--            },-->
<!--            diaoqu() {-->

<!--                let that = this-->
<!--                let a = that.users.hu-->
<!--                let b = that.users.mima-->
<!--                console.log('手机:' + a + ',密码:' + b)-->
<!--                //主网钱包ip-->
<!--                that.axios.post(that.ull + '/ulam_wallet',-->
<!--                    {-->
<!--                        "mobile": parseInt(a),-->
<!--                        "password": b-->
<!--                    }).then(response => {-->
<!--                    that.ss1 = false;-->
<!--                    that.loadings = false;-->
<!--                    console.log(response.data)-->
<!--                    if (response.data[0]) {-->
<!--                        that.wal = response.data[0];-->
<!--                        that.waljin = response.data[0].balance;-->
<!--                        //获取到钱包信息 地址和余额-->
<!--                        localStorage.setItem("wals", JSON.stringify(that.wal));-->
<!--                        //拿到地址查交易情况-->
<!--                        that.dizhi = that.wal.addr;-->
<!--                        //  调用查看方法-->
<!--                        that.gotra(1)-->
<!--                        return-->
<!--                    }-->
<!--                    that.ss4 = true-->
<!--                    setTimeout(() => {-->
<!--                        localStorage.removeItem("user");-->
<!--                        //删除钱包数据-->
<!--                        localStorage.removeItem("wals");-->
<!--                        //头像-->
<!--                        localStorage.removeItem("tellertx");-->
<!--                        //资金密码-->
<!--                        localStorage.removeItem("jinmi");-->
<!--                        //是否开启指纹-->
<!--                        localStorage.removeItem('zhiwens')-->
<!--                        this.$router.push('/zhu')-->
<!--                    }, 2000)-->
<!--                }).catch(function (error) {-->
<!--                    that.ss1 = false-->
<!--                    that.ss4 = true-->
<!--                    console.log(error);-->
<!--                })-->


<!--                that.diaoge1();-->
<!--            },-->
<!--            kanjl() {-->
<!--                // this.$router.push('/jilu');-->
<!--                this.$router.push({name: "jilu", params: {id: "index"}});-->
<!--            },-->
<!--            gotra(b) {-->
<!--                // let that = this-->
<!--                // //显示加载-->
<!--                // if (b > 1) {-->
<!--                //     that.ss1 = true-->
<!--                // }-->
<!--                // that.axios.post('http://47.92.225.161:5000/get_account', {-->
<!--                //     "account": that.dizhi,-->
<!--                //     "Page": b-->
<!--                // }).then(response => {-->
<!--                //     let das = response.data-->
<!--                //     let la = das[0].Num-->
<!--                //     if (la == 0) {-->
<!--                //         that.ss1 = false-->
<!--                //         that.jiaoxian = false-->
<!--                //         console.log('没有记录')-->
<!--                //         return;-->
<!--                //     }-->
<!--                //     that.jiaoxian = true-->
<!--                //     that.zshu = la-->
<!--                //     //赋值当前页数-->
<!--                //     that.jishu = b-->
<!--                //     //判断是否存在数据-->
<!--                //     if (that.shuju3) {-->
<!--                //         that.shuju3 = that.shuju3.concat(das.slice(1))-->
<!--                //     } else {-->
<!--                //         that.shuju3 = das.slice(1);-->
<!--                //     }-->
<!--                //     //处理数据,增加 转出 和转入  在方法内赋值真正的内容，因为要考虑到在转出和接收页面时点击下一页，不会影响整个数据流-->
<!--                //     that.lishuju(that.shuju3)-->
<!--                //     //判断尾部 到底显示什么-->
<!--                //     if (la < 31) {-->
<!--                //         that.yys = 1-->
<!--                //     } else {-->
<!--                //         let yu = Math.ceil(la / 30)-->
<!--                //         //得出总页数-->
<!--                //         that.yys = yu-->
<!--                //         if (b >= that.yys) {-->
<!--                //             // console.log('已经是最后一页')  判断当前第几页了-->
<!--                //             that.ayin = false-->
<!--                //             that.xiao = true-->
<!--                //         } else {-->
<!--                //             that.ayin = true-->
<!--                //         }-->
<!--                //     }-->
<!--                // }).catch(function (error) {-->
<!--                //     that.ss1 = false-->
<!--                //     console.log(error)-->
<!--                //     if (error.response.status === 429) {-->
<!--                //         console.log('频率快')-->
<!--                //     }-->
<!--                // })-->
<!--            },-->
<!--            gobacks(){-->
<!--                this.$router.push('/wallet')-->
<!--            },-->
<!--            //  处理数据-->
<!--            lishuju(e) {-->
<!--                //接收的数据 &#45;&#45;转出的数据-->
<!--                let shu1 = []-->
<!--                let shu2 = []-->
<!--                //  拿到当前的数据 进行处理 ee为子元素-->
<!--                e.map(function (ee) {-->
<!--                    if (ee.direction == 'to') {-->
<!--                        shu1.push(ee);-->
<!--                    } else {-->
<!--                        shu2.push(ee)-->
<!--                    }-->
<!--                })-->
<!--                //将数据保存-->
<!--                this.shuju1 = shu1-->
<!--                this.shuju2 = shu2-->
<!--                //  判断当前所选择的状态 进行真正的复制信息 that.shuju = that.shuju3-->
<!--                if (this.train == 3) {-->
<!--                    // console.log('转出')-->
<!--                    this.shuju = shu2-->
<!--                } else if (this.train == 2) {-->
<!--                    // console.log('接收')-->
<!--                    this.shuju = shu1-->
<!--                } else {-->
<!--                    // console.log('全部')-->
<!--                    this.shuju = this.shuju3-->
<!--                }-->
<!--                //执行完毕后 加载结束-->
<!--                this.ss1 = false-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--  .zis1 {-->
<!--    color: #676666;-->
<!--    font-size: 15px;-->
<!--  }-->

<!--  .main-content {-->
<!--    width: 100%;-->
<!--    height: 100vh;-->
<!--    overflow: hidden;-->
<!--    position: relative;-->
<!--  }-->

<!--  ::-webkit-scrollbar {-->
<!--    width: 0;-->
<!--    height: 0;-->
<!--    background-color: transparent;-->
<!--  }-->

<!--  .lala {-->
<!--    overflow-y: auto;-->
<!--  }-->

<!--  .hongzi {-->
<!--    color: #9a55ff;-->
<!--  }-->

<!--  .daili {-->
<!--    color: #9a55ff;-->
<!--    font-size: 16px;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    justify-content: end;-->
<!--  }-->

<!--  .kuItem {-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    justify-content: space-between;-->
<!--    border-bottom: 1px solid #e2e2e2;-->
<!--    padding: 5px 0;-->
<!--    height: 40px;-->
<!--    line-height: 40px;-->
<!--  }-->

<!--  .yun {-->
<!--    color: #919090;-->
<!--    line-height: 54px;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .arrow-up {-->
<!--    width: 0;-->
<!--    height: 0;-->
<!--    border-left: 5px solid transparent;-->
<!--    border-right: 5px solid transparent;-->
<!--    border-bottom: 10px solid #f5f5f5;-->
<!--    position: relative;-->
<!--    top: -10px;-->
<!--  }-->

<!--  .zi1 {-->
<!--    text-align: right;-->
<!--    margin-top: -7px;-->
<!--    color: #919090;-->
<!--    font-size: 15px;-->
<!--  }-->

<!--  .zizi {-->
<!--    font-size: 26px;-->
<!--    font-weight: 700;-->
<!--    color: #9a55ff;-->
<!--  }-->

<!--  .zipan {-->
<!--    font-size: 12px;-->
<!--    color: #919090;-->
<!--    font-weight: 400;;-->
<!--  }-->

<!--  .bizhong {-->
<!--    box-shadow: 0 0 4px #e9e2dd;-->
<!--    border-radius: 8px;-->
<!--    background: #fff;-->
<!--    position: relative;-->
<!--    width: 86%;-->
<!--    margin: 0 auto;-->
<!--    padding: 10px 20px 10px;-->
<!--    box-sizing: border-box;-->
<!--  }-->

<!--  .lala {-->
<!--    overflow-y: auto;-->
<!--  }-->

<!--  .hezi {-->
<!--    height: 40px;-->
<!--    width: 100%;-->
<!--    background: #f5f5f5;-->
<!--    border-radius: 6px;-->
<!--    padding-left: 15px;-->
<!--    box-sizing: border-box;-->
<!--    line-height: 40px;-->
<!--    margin-top: -5px;-->
<!--    padding-right: 15px;-->
<!--  }-->

<!--  .in2 {-->
<!--    border: none;-->
<!--    outline: none;-->
<!--    color: #999;-->
<!--    width: 100%;-->
<!--    background: #f5f5f5;-->
<!--    text-align: center;-->
<!--    font-size: 18px;-->
<!--    letter-spacing: 2px;-->
<!--  }-->

<!--  .heizi {-->
<!--    color: #030303;-->
<!--    font-size: 15px;-->
<!--    letter-spacing: 1px;-->
<!--  }-->

<!--  .flex3 {-->
<!--    font-size: 16px;-->
<!--    color: #F4451A;-->
<!--  }-->

<!--  .cz1 {-->
<!--    color: #fff;-->
<!--    text-align: center;-->
<!--    letter-spacing: 2px;-->
<!--    height: 38px;-->
<!--    line-height: 38px;-->
<!--    font-size: 18px;-->
<!--    border-radius: 7px;-->
<!--    margin-top: 10px;-->
<!--  }-->

<!--  .dai1 {-->
<!--    padding: 0 20px;-->
<!--  }-->

<!--  .buylu {-->
<!--    height: 20px;-->
<!--    color: #c0bfc4;-->
<!--    background: #fff;-->
<!--    text-align: center;-->
<!--    line-height: 20px;-->
<!--    font-size: 12px;-->
<!--    letter-spacing: 1px;-->
<!--    border-top-left-radius: 50px;-->
<!--    box-shadow: 2px 2px 1px #c0bfc4;-->
<!--    border-bottom-left-radius: 50px;-->
<!--    float: right;-->
<!--    margin-right: -19px;-->
<!--    margin-top: -45px;-->
<!--  }-->

<!--  .flex1 {-->
<!--    color: #919090;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .flex2 {-->
<!--    text-align: right;-->
<!--    color: #030303;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .xzhu {-->
<!--    width: 100%;-->
<!--    height: 200px;-->
<!--    padding: 20px;-->
<!--    box-sizing: border-box;-->
<!--    color: #fff;-->
<!--    background: linear-gradient(#76c4ff, #7458fd);-->
<!--  }-->

<!--  .wenwang {-->
<!--    margin-top: 20px;-->
<!--    border: 1px solid #9a55ff;-->
<!--    color: #9a55ff;-->
<!--    font-size: 14px;-->
<!--    width: 70px;-->
<!--    text-align: center;-->
<!--    border-radius: 4px;-->
<!--    height: 24px;-->
<!--    line-height: 24px;-->
<!--    float: right;-->
<!--  }-->

<!--  .szi2 {-->
<!--    font-size: 14px;-->
<!--    font-weight: 700;-->
<!--  }-->

<!--  .shengji {-->
<!--    width: 100%;-->
<!--    height: 40px;-->
<!--    background: #1cc6e2;-->
<!--    border-bottom-left-radius: 6px;-->
<!--    border-bottom-right-radius: 6px;-->
<!--  }-->

<!--  .yi {-->
<!--    width: 100%;-->
<!--    margin-top: 10px;-->
<!--    border-bottom: 0.5px solid #eee;-->
<!--    padding-bottom: 12px;-->
<!--  }-->

<!--  .zz2 {-->
<!--    margin-top: 5px;-->
<!--    color: #999;-->
<!--    font-size: 12px;-->
<!--  }-->

<!--  .zz1 {-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .zi2 {-->
<!--    color: #9b9b9b;-->
<!--    margin-top: 20px;-->
<!--  }-->

<!--  .zi3 {-->
<!--    color: #9b9b9b;-->
<!--  }-->

<!--  .zi4 {-->
<!--    margin-top: 20px;-->
<!--    padding: 10px;-->
<!--    background: #11bcd8;-->
<!--    width: 40%;-->
<!--    border-radius: 20px;-->
<!--    box-sizing: border-box;-->
<!--    color: white;-->
<!--    margin-left: 30%;-->
<!--  }-->

<!--  /*.buylu {*/-->
<!--  /*  height: 20px;*/-->
<!--  /*  color: #fff;*/-->
<!--  /*  background: #c0bfc4;*/-->
<!--  /*  text-align: center;*/-->
<!--  /*  line-height: 20px;*/-->
<!--  /*  font-size: 12px;*/-->
<!--  /*  letter-spacing: 1px;*/-->
<!--  /*  border-top-left-radius: 50px;*/-->
<!--  /*  border-bottom-left-radius: 50px;*/-->
<!--  /*  float: right;*/-->
<!--  /*  margin-right: -19px;*/-->
<!--  /*  margin-bottom: 10px;*/-->
<!--  /*}*/-->

<!--  .flex1 {-->
<!--    color: #919090;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .flex2 {-->
<!--    text-align: right;-->
<!--    color: #030303;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .arrow-up {-->
<!--    width: 0;-->
<!--    height: 0;-->
<!--    border-left: 5px solid transparent;-->
<!--    border-right: 5px solid transparent;-->
<!--    border-bottom: 10px solid #f5f5f5;-->
<!--  }-->

<!--  .dai1 {-->
<!--    width: 100%;-->
<!--    background: #fff;-->
<!--    padding: 15px 19px;-->
<!--    box-sizing: border-box;-->
<!--    position: relative;-->
<!--  }-->

<!--  .daili {-->
<!--    font-size: 16px;-->
<!--    color: #9a55ff;-->
<!--  }-->

<!--  .yun {-->
<!--    color: #8e8e8e;-->
<!--    margin-top: -8px;-->
<!--    /*color:#919090;line-height:38px;*/-->
<!--  }-->

<!--  .bizhong {-->
<!--    box-shadow: 0 0 2px #e1d2f7;-->
<!--    border-top-left-radius: 6px;-->
<!--    border-top-right-radius: 6px;-->
<!--    background: #fff;-->
<!--    position: relative;-->
<!--    width: 86%;-->
<!--    margin: 0 auto;-->
<!--    top: -32px;-->
<!--  }-->

<!--  .quean {-->
<!--    width: 100%;-->
<!--    color: #fff;-->
<!--    border-radius: 5px;-->
<!--    padding: 5px 10px;-->
<!--    height: 30px;-->
<!--    line-height: 30px;-->
<!--    text-align: center;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .quan1 {-->
<!--    width: 100%;-->
<!--    background: #f5f5f5;-->
<!--    padding: 5px 10px;-->
<!--    color: #7f7e7e;-->
<!--    border-radius: 5px;-->
<!--    font-size: 14px;-->
<!--    height: 30px;-->
<!--    line-height: 30px;-->
<!--    text-align: center;-->
<!--  }-->

<!--  .login {-->
<!--    letter-spacing: 1px;-->
<!--    border: none;-->
<!--    outline: none;-->
<!--    color: #7f7e7e;-->
<!--    width: 100%;-->
<!--    text-align: center;-->
<!--    background: #f5f5f5;-->
<!--    font-size: 15px;-->
<!--  }-->

<!--  .loginke {-->
<!--    height: 42px;-->
<!--    background: #f5f5f5;-->
<!--    margin: 20px auto;-->
<!--    padding-left: 15px;-->
<!--    box-sizing: border-box;-->
<!--    line-height: 42px;-->
<!--    padding-right: 15px;-->
<!--    border-radius: 8px;-->
<!--  }-->

<!--  .login::-webkit-input-placeholder {-->
<!--    color: #b0b1b3;-->
<!--  }-->

<!--  ::-webkit-scrollbar {-->
<!--    width: 0;-->
<!--    height: 0;-->
<!--    background-color: transparent;-->
<!--  }-->

<!--  .lala {-->
<!--    overflow-y: auto;-->
<!--  }-->

<!--  .hezi {-->
<!--    height: 40px;-->
<!--    width: 100%;-->
<!--    background: #f5f5f5;-->
<!--    border-radius: 6px;-->
<!--    padding-left: 15px;-->
<!--    box-sizing: border-box;-->
<!--    line-height: 40px;-->
<!--    margin-top: -5px;-->
<!--    padding-right: 15px;-->
<!--  }-->

<!--  .in2 {-->
<!--    border: none;-->
<!--    outline: none;-->
<!--    color: #999;-->
<!--    width: 100%;-->
<!--    background: #f5f5f5;-->
<!--    text-align: center;-->
<!--    font-size: 18px;-->
<!--    letter-spacing: 2px;-->
<!--  }-->

<!--  /*@import '../../pf/quanju.css';*/-->
<!--  .banzi {-->
<!--    font-size: 16px;-->
<!--    color: #666;-->
<!--    background: white;-->
<!--    border: 1px solid white;-->
<!--    line-height: 1.5;-->
<!--    height: 80px;-->
<!--    width: 94%;-->
<!--    resize: none;-->
<!--  }-->

<!--  .z3 {-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .z1 {-->
<!--    color: #9a55ff;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .z2 {-->
<!--    color: #9a55ff;-->
<!--    font-size: 18px;-->
<!--    margin-top: 3px;-->
<!--  }-->
<!--</style>-->





<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight+50 + 'px' }">
    <toast v-model="s1" type="cancel" :time="1800" is-show-mask text="暂未开启!请在具体代币中操作" width="18em"></toast>
    <loading :show="s2" text="刷新数据中.."></loading>
    <div class="weui" ref="scrollBox" :style="style" @touchstart="touchStart"
         @touchmove="touchMove" @touchend="touchEnd">
      <div class="box">
        <div v-if="moveState < 2" style="text-align:center;">
          <div style="height:10px;"></div>
          {{ moveState === 0 ? '下拉即可刷新...' : '释放即可刷新...' }}
          <div style="height:10px;"></div>
        </div>
        <div v-else style="text-align: center;">
          <div style="height:10px;"></div>
          <p>刷新中...</p>
          <inline-loading></inline-loading>
          <div style="height:10px;"></div>
        </div>
      </div>
      <!--测试下拉-->


      <div
        style="background:linear-gradient(#76c4ff, #7458fd);width:100%;color:#000;padding:15px;box-sizing:border-box;margin-top:-2px;">
        <div style="height: 60px;display: flex;align-items: flex-end">
          <img @click="gobacks" src="@/assets/2_03.png" alt="" style="display: block;width: 26px;height: 26px;margin-left: -5px" >
        </div>
        <div style="height: 16px">

        </div>
        <p style="color:#fff;font-weight:700;font-size:18px;">总资产折合
          <span style="margin-left:5px;" v-on:click="xianyan">
        <img src="@/assets/yan.png" alt="" style="width:22px;position:relative;top:3.5px;" v-if="!yanxian">
        <img src="@/assets/biyan.png" alt="" style="width:22px;position:relative;top:3.5px;" v-if="yanxian">
      </span>
        </p>
        <div v-if="!yanxian">
          <p style="font-size:26px;margin-top:8px;"><span style="font-size:16px;color:#fff">≈ ￥{{zongzi}}</span></p>
          <!--<p style="font-size:14px;">≈ ￥0.93-->
          <!--&lt;!&ndash;<span style="color:#777575;float: right;">累计收益￥0.9</span>&ndash;&gt;-->
          <!--</p>-->
        </div>
        <div v-if="yanxian">
          <p style="font-size:26px;margin-top:8px;"><span style="font-size:16px;color:#fff">******</span></p>
          <!--<p style="font-size:14px;">≈ ￥****-->
          <!--&lt;!&ndash;<span style="color:#777575;float: right;">累计收益￥****</span>&ndash;&gt;-->
          <!--</p>-->
        </div>
      </div>



      <div style="height:10px;"></div>
      <!-- 币种 -->
      <div style="background:#fff;">
        <div style="height:10px;"></div>
        <!--ULAM-->
        <div v-if="false" style="height:75px;width:100%;padding:12px;box-sizing:border-box;border-bottom: 1px solid #F5F5F5;"
             v-on:click="qubao1">
          <div style="float:left;width:50%;">
            <img src="@/assets/l1.png" alt="" style="width:30px;position: relative;top:7px;">
            <span style="margin-left:8px;">ULAM</span>
          </div>
          <div style="float: left;width:50%;text-align:right;line-height:1.8">
            <div v-if="uy">
              <p style="font-size:14px;">{{ulam.toFixed(3)}}</p>
              <p style="font-size:12px;color:#8A8787">≈ ￥ {{ulamj.toFixed(2)}}</p>
            </div>
            <div v-if="!uy">
              <inline-loading></inline-loading>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>

        <!--      UEM-->
        <div style="height:75px;width:100%;padding:12px;box-sizing:border-box;border-bottom: 1px solid #F5F5F5;"
             v-on:click="towalletuem">
          <div style="float:left;width:50%;">
            <img src="@/assets/UEM.png" alt="" style="width:30px;position: relative;top:7px;">
            <span style="margin-left:8px;">UEM</span>
          </div>
          <div style="float: left;width:50%;text-align:right;line-height:1.8">
            <div v-if="uy">
              <p style="font-size:14px;">{{balance_uem.toFixed(3)}}</p>
              <p style="font-size:12px;color:#8A8787">≈ ￥ {{caosj.toFixed(2)}}</p>
            </div>
            <div v-if="!uy">
              <inline-loading></inline-loading>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>


      </div>
      <!--测试下拉-->
    </div>

<!--    <bottomNav :flag="0"></bottomNav>-->

  </div>
</template>

<script>
    import {Group, Cell, XHeader, XInput, XButton, Toast, Confirm, Actionsheet, Loading, InlineLoading} from 'vux'
    // import bottomNav from "./bnavigation/bottomNav";
    export default {
        name: "ulamDetail",
        components: {
            Cell, Group, XHeader, XInput, XButton, Toast, Confirm, Actionsheet, Loading, InlineLoading,
            // bottomNav
        },
        data() {
            return {
                startY: '',    //保存touch时的Y坐标
                moveDistance: 0,    //保存向下滑动的距离
                moveState: 0,        //开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中
                duration: 0,        //动画持续时间，0就是没有动画
                bodyHeight: '',
                yanxian: true,
                jias: '',
                s1: false,
                s2: false,
                //获得币数量
                ulam: 0,
                uerc: 0,
                eth: 0,
                xlf: 0,
                zongzi: 0,
                users: '',
                //单个价格
                ulamj: 0,
                uercj: 0,
                ethj: 0,
                xlfj: 0,
                caosbi: 0,
                caosj: 0,
                //  判断4个数据的全部来了没有
                uy: false,
                ey: false,
                by: false,
                usy: false,
                caoy: false,
                balance_uem: '',
            }
        },
        created(){
            this.najia();
        },
        mounted() {
            let that = this
            //  获取当前高度
            that.bodyHeight = document.documentElement.clientHeight
            //  拿取用户信息
            let message = localStorage.getItem('user');
            message = JSON.parse(message)
            that.users = message

        },
        computed: {
            style() {
                return {
                    transition: `${this.duration}ms`,
                    transform: `translate3d(0,${this.moveDistance}px, 0)`
                }
            }
        },
        watch: {
            //这里是给用户操作返回的核心
            moveState(state) {
                //我们监听moveState的状态，
                //0意味着开始也意味着结束，这里是结束，并且只有动画生效我们才能 moveDistance 设为0，
                //为什么动画生效才行，因为动画生效意味着手指离开了屏幕，如果不懂去看touchEnd方法，这时
                //我们让距离变为0才会有动画效果。
                if (state === 0 && this.duration === 300) {
                    this.moveDistance = 0
                }
            }
        },
        methods: {
            gobacks(){
                this.$router.push('/index')
            },
            towalletuem() {
                this.$router.push('/uemDetail')
            },
            caos1() {
                this.$router.push('/caos')
            },
            nans() {
                let that = this
                // 拿取代理的ustd价格
                // 拿取ulam
                that.du()

            },
            //测试下拉
            touchStart(e) {
                this.duration = 0 // 关闭动画
                this.moveDistance = 0 // 滑动距离归0
                this.startY = e.targetTouches[0].clientY  // 获得开始Y坐标
            },
            touchMove(e) {    //这里是整个下拉刷新的核心
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                //首先判断我们有没有滚动条，如果有，我们下拉刷新就不能启用。
                if (scrollTop > 0) return
                let move = e.targetTouches[0].clientY - this.startY
                //判断手指滑动的距离，只有为正数才代表用户下拉了。
                if (move > 0) {
                    //阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
                    e.preventDefault()
                    //增加滑动阻力的感觉
                    this.moveDistance = Math.pow(move, 0.8)
                    if (this.moveDistance > 60) {
                        //如果滑动距离大于50 那我就告诉你，释放即可刷新
                        if (this.moveState === 1)
                            return
                        this.moveState = 1
                    } else {
                        //否则 恢复原样
                        if (this.moveState === 0) return
                        this.moveState = 0
                    }
                }
            },
            touchEnd(e) {
                // 只要手指拿开，我都需要加上结束时的动画，这里为300ms
                this.duration = 300
                if (this.moveDistance > 60) {
                    //这里逻辑跟touchMove一样，但是需要真的加载数据了，那moveState变为2 所以加载动画在这出现
                    this.moveState = 2
                    //这里执行
                    //  执行数据？？
                    this.nans()
                    this.s2 = true
                    //因为还没加载完，我得让加载动画显示着，所以这里移动距离为50
                    this.moveDistance = 60
                    // this.$emit('refresh', () => {
                    //   //这里就是成功后的回调了，如果该函数被调用，那就以为着加载数据完成，所以状态要回到0，当然需要在父组件调用。
                    //   this.moveState = 0
                    //   this.go = false
                    // })
                    //上面的不懂 所有自己设置了关闭的方法
                    setTimeout(() => {
                        this.moveState = 0
                        this.s2 = false
                    }, 1000)
                } else {
                    //否则 给我老老实实恢复原样
                    this.moveDistance = 0
                }
            },
            du() {
                let that = this;
                //拿取账户密码。拿去新的值
                let a = that.users.hu
                let b = that.users.mima
                console.log('手机:' + a + ',密码:' + b)
                //主网钱包ip
                that.axios.post(this.apiurl+'/ulam_wallet',
                    {
                        "mobile": parseInt(a),
                        "password": b
                    }).then(response => {

                        console.log(response,'主网钱包ip')

                    if (response.data[0]) {
                        that.ulam = response.data[0].balance;
                        that.balance_uem = response.data[0].balance_uem;
                        console.log('ulam:' + that.ulam);
                        that.uy = true
                        that.gaoshi()
                        return
                    }
                }).catch(function (error) {
                })
            },

            gaoshi() {
                let that = this
                //获取到价格
                let gou = that.jias;
                console.log(gou, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                let a = gou.ulam * that.ulam;
                let e = gou.uem * that.balance_uem;
                that.jiashu(a, e)
            },
            jiashu(a, e) {
                // let a1 = parseFloat(a)
                let a1 =0;
                // this.ulamj = a1
                this.ulamj = 0; //ulam 总价

                let e1 = parseFloat(e)
                this.caosj = e1;
                this.zongzi = (a1 + e1).toFixed(2)
            },
            wei() {
                this.s1 = true
            },
            //去掉小数点
            qdian(e) {
                let str = e.replace(/,/g, "");//取消字符串中出现的所有逗号
                return parseFloat(str);
            },
            //拿到真实的币数量
            chuj(e, b) {
                if (b == 1) {
                    let ne = parseInt(e) / 1000000
                    return ne.toFixed(3)
                }
                let ne = parseInt(e) / 1000000000000000000
                return ne.toFixed(3)
            },
            najia() {
                let that = this;
                let a = localStorage.getItem('jia');
                if (a) {
                    that.jias = JSON.parse(a);
                    console.log(that.jias)
                }
                that.axios.get(this.apiurl+'/token_price_all').then(response => {
                    //  获取到的全都是人民币价格
                    console.log(response.data);
                    //以太坊
                    let e = that.qdian(response.data[0].eth)
                    // console.log('以太坊当前交易所价格：'+e)
                    //比特
                    let b = that.qdian(response.data[0].btc)
                    // console.log('btc当前交易所价格：'+b)
                    //获取bnb
                    let bn = that.qdian(response.data[0].bnb)
                    // console.log('bnb当前交易所价格：'+bn)
                    //ulam
                    let ss = that.qdian(response.data[0].ulam)
                    // console.log('ulam当前交易所价格：'+ss)
                    //usdt
                    let us = that.qdian(response.data[0].usdt);

                    let uem = that.qdian(response.data[0].uem);
                    // console.log('usdt当前交易所价格：'+us)
                    that.jias = {'ulam': ss, 'eth': e, 'btc': b, 'bnb': bn, 'usdt': us, 'uem': uem}

                    localStorage.setItem("jia", JSON.stringify(that.jias));
                    that.nans()

                }).catch(function (error) {
                    console.log(error);
                })
            },
            //  ulamerc20
            ulam20() {
                this.$router.push('/ulamerc')
            },
            //usdt（erc20）
            uerc1() {
                this.$router.push('/uerc')
            },
            //  xlf
            xlf1() {
                this.$router.push('/erc')
            },
            //  以太坊
            yitai() {
                this.$router.push('/etc')
            },
            qubao1() {
                //跳转ulam 详情

                this.$router.push('/wallet')

            },
            xianyan() {
                this.yanxian = !this.yanxian
            },
            //  返回方法
            fanhui1() {
                this.$router.push('/user')
            },
        }
    }
</script>

<style scoped>
  .weui {
    height: calc(100vh - 50px);
    margin-top: -50px;

  .box {
    text-align: center;
    line-height: 80px;
    height: 80px;
    font-size: 14px;
    color: #999999;
    margin-bottom: 20px;
  }

  }
  .szi2 {
    font-size: 14px;
    font-weight: 700;
  }
</style>
