<template>
  <div>
    <div style="position: fixed;top:0px;width:100%;z-index:999;">
      <div style="height:25px;"></div>

      <div class="back1" style="background: rgba(0,0,0,0)">
        <router-link  to="/" >
          <img src="@/assets/2_03.png" alt="" class="back2" style="width: 30px;height: auto">
        </router-link>
      </div>
<!--      <x-header style="background:transparent">-->
<!--      </x-header>-->



    </div>
    <div class="bg3" :style="{ height: bodyHeight + 'px' }">
      <div style="padding:5px;box-sizing:border-box;">
        <!--头像-->
        <div style="text-align:center;margin-top:95px;display: none">
          <p class="b1" style="font-size:36px;font-weight:700;text-shadow:0px 5px 0px #d60000;">发糖包</p>
          <p style="margin-top:10px;">
            <span style="font-size:14px;color:white;">
            {{baozi1}}
            <span style="color: #f8e352;" v-on:click="gai">{{baozi}}</span>
          </span>
          </p>
        </div>

        <div style="height: 170px"></div>




        <div style="padding:20px 20px 10px;box-sizing:border-box;font-size:14px;margin-top:10px;">
          <div >
            <p class="zi1" style="color:white;margin-top:20px;">&nbsp;&nbsp;&nbsp;余额：<span
              style="color:#f8e352; font-size:14px;font-weight: 400;">{{waljin.toFixed(2)}}积分</span></p>
          </div>
          <div style="height:14px;"></div>
          <!--糖包金额 -->
          <div class="kuai">
            <div style="float:left;">
              <p style="font-size: 14px">&nbsp;&nbsp;&nbsp;{{baozi2}}</p>
            </div>
            <div style="float:right;">
              <p style="color:#3f0082;">
                <input type="number" class="in1" v-model="shu" placeholder="0.0">
                枚&nbsp;&nbsp;&nbsp;
              </p>
            </div>
          </div>
          <div style="clear: both;"></div>
          <div style="height:30px;">
          </div>
          <!--糖包数量 -->
          <div class="kuai">
            <div style="float:left;">
              <p>&nbsp;&nbsp;&nbsp;糖包个数</p>
            </div>
            <div style="float:right;">
              <p style="color:#3f0082;">
                <input type="number" class="in1" v-model="shu1" placeholder="填写个数">
                个&nbsp;&nbsp;&nbsp;
              </p>
            </div>
          </div>
          <div style="clear: both;"></div>
          <!-- 糖包祝福语-->
          <div style="margin-top:30px;">
              <textarea max="20" v-model="yu1" rows="3" maxlength="10"
                        style="width:100%;border:none;background:rgba(92,109,204,1);padding:10px;box-sizing:border-box;color:white;
                border-radius:8px;outline:none;resize:none;"
              ></textarea>
            <p style="color:#e43184;font-size:12px;text-align:center;">
              未领取的红包，将于24小时后退回到您的账户中
            </p>

          </div>
          <!-- 显示选出的金额 -->
          <div>
            <div style="height: 15px"></div>

            <div style="text-align:center;margin-top:30px;width:100%;height:36px;color:#fff;
            line-height:36px;font-size:16px;font-weight:600;border-radius:30px;"
                 class="backcolors"
                 v-on:click="fa">发糖包
            </div>
          </div>
        </div>

      <div style="display: flex;flex-direction: row;justify-content: flex-end;padding-right: 20px;">

   <!--     <div style="text-align:center;display: flex;align-items: center;height: 30px">
          <input type="checkbox" v-model="txuan" checked="checked" style="width: 15px;height: 15px;display: block"/>
          <div style="width: 5px;"></div>
          <span style="position:relative;top:-2px;color: #fff;font-size: 14px">同步到社区</span>
        </div>
 -->
        <div style="text-align:center;" v-on:click="kanlu">
          <span style="padding-bottom:0px; border-bottom:1px solid #fff;font-size: 14px;color: #FFFFFF;">查看糖包发放记录</span>
        </div>

      </div>

        <!--包裹结束-->
      </div>
      <!-- 发送红包成功后显示的 -->
      <div v-if="!xianshi" class="bao3">
        <!--<div class="bao3">-->
        <div class="baor">
          <!--头像-->
          <!--取消红包小时-->
          <img src="@/assets/redb2.png" alt="" style="position:absolute;top:80vh;right:43%;width:36px;z-index:30 "
               v-on:click="qubao1">
          <div style="position:absolute;top:40%;font-weight:700;text-align:center;width:92%;font-size:17px;z-index: 100">
            <p>{{yu1}}</p>
          </div>

          <img src="@/assets/redb4.png"class="bfx" v-on:click="fenxiang" :data-clipboard-text="hongbaoma" alt="" style="width:100%;">
        </div>
        <div style="height:96px;"></div>
      </div>
    </div>
    <!--弹窗-->
    <toast v-model="ss1" type="cancel" :time="1500" is-show-mask text="请填写糖包信息！" width="12em"></toast>
    <toast v-model="ss3" type="cancel" :time="1100" is-show-mask text="请输入正确的资金密码!" width="12em"></toast>
    <loading :show="ss4" text="生成中.."></loading>
    <toast v-model="ss5" type="cancel" :time="1800" is-show-mask text="红包生成失败!" width="12em"></toast>
    <toast v-model="ss6" type="cancel" :time="1800" is-show-mask text="红包金额不能少于1！" width="18em"></toast>
    <toast v-model="ss7" :time="1800" is-show-mask text="分享链接复制成功!可以直接粘贴给朋友" width="18em"></toast>
    <toast v-model="ss8" :time="1800" is-show-mask text="未设置资金密码!" width="18em"></toast>
    <toast v-model="cz3" type="cancel" :time="2000" is-show-mask text="未检测到资金密码!请在设置中添加" width="18em"></toast>
    <!--资金密码 -->
    <popup v-model="ss2" height="290px" style="top: 17vh" is-transparent>
      <div style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <div style="width:90%;margin-left:5%;">
          <p style="font-size:20px;font-weight:700;text-align: center;">请输入资金密码</p>
        </div>
        <div style="padding: 0 20px">
          <group>
            <x-input v-model="anmi" placeholder="请输入资金密码" type="password"></x-input>
          </group>
        </div>
        <div style="font-size:12px;padding:10px 20px;">
          <p style="color:red;">未领取的红包，将于24小时后退回到您的账户中</p>
        </div>
        <div style="padding:20px 15px;">
          <div style="height: 5px"></div>
          <div @click="quefa()" class="botmOk">确认</div>
          <div style="height: 15px"></div>
          <div @click="bufa" class="botmNO">取消</div>
          <div style="height: 15px"></div>
        </div>
      </div>
    </popup>
    <!-- 指纹提醒 -->
    <alert v-model="show1" title="请验证指纹" @on-show="onShow" @on-hide="onHide" button-text="取消使用密码">
      <div style="">
        <div style="height:20px;"></div>
        <img src="@/assets/icos/zw.png" alt="" style="width:80px;">
        <div style="height:10px;"></div>
      </div>
    </alert>
    <loading :show="shiz" text="识别成功.."></loading>
    <toast v-model="cjin" type="cancel" :time="3000" is-show-mask text="账户已被锁定！24小时后解锁" width="18em"></toast>
    <toast v-model="cjin1" type="cancel" :time="3000" is-show-mask width="18em">{{tishi}}</toast>






    <toast v-model="tixian" :time="3000" is-show-mask width="18em">已同步到社区</toast>
  </div>
</template>

<script>
    import Clipboard from 'clipboard';
    import {
        XHeader,
        Toast,
        Loading,
        Alert,
        Popup,
        XInput,
        Group,
        XButton,
        PopupPicker,
        Tabbar,
        TabbarItem,
        Flexbox,
        FlexboxItem
    } from 'vux'

    export default {
        name: "bag",
        components: {
            XHeader, Toast, Loading, Alert, Popup, XInput, Group, XButton, PopupPicker, Flexbox, FlexboxItem
        },
        data() {
            return {
                cz3: false,
                show1: false,
                value5: ['ULAM'],
                cjin: false,
                cjin1: false,
                tishi: '',
                txuan: false,
                tixian:false,
                //选择币种
                // list: [['ULAM','ULAM(erc20)']],
                list: [['ULAM']],
                //选择支付方式 默认是钱包，当选择其他uerc时候 会增加糖包余额
                list1: [['钱包']],
                value1: ['钱包'],
                whofu: 'wallet',
                shu: '',
                shu1: '',
                shu2: '0.0',
                yu: '恭喜发财，大吉大利',
                yu1: '恭喜发财，大吉大利',
                //判断是那种币
                whobi: 0,
                //判断是拼手气 还是普通红包
                bao: true,
                baozi: '改为普通糖包',
                baozi1: '当前为拼手气糖包，',
                baozi2: '糖包总金额',
                ss1: false,
                ss2: false,
                ss3: false,
                ss4: false,
                ss5: false,
                ss6: false,
                ss7: false,
                ss8: false,
                anmi: '',
                users: '',
                // 红包生成成功后显示
                xianshi: true,
                hongbaoma: '',
                bodyHeight: '',
                shiz: false,
                wal: '',
                waljin: 0,
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
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            //  拿取用户数据
            let that = this
            that.bodyHeight = document.documentElement.clientHeight
            let message = localStorage.getItem('user');
            if (message) {
                that.users = JSON.parse(message)
                // 拿取钱包数据
                let qi = localStorage.getItem("wals");
                if (qi) {
                    qi = JSON.parse(qi)
                    that.waljin = qi.balance
                } else {
                    that.$router.push('/wallet ')
                }
            } else {
                that.$router.push('/zhu')
            }
        },
        methods: {
            diaoqu() {
                let that = this
                let a = that.users.hu
                let b = that.users.mima
                //主网钱包ip
                that.axios.post(that.ull + '/ulam_wallet',
                    {
                        "mobile": parseInt(a),
                        "password": b
                    }).then(response => {
                    console.log(response.data)
                    if (response.data[0]) {
                        that.wal = response.data[0]
                        that.waljin = response.data[0].balance
                        //获取到钱包信息 地址和余额
                        localStorage.setItem("wals", JSON.stringify(that.wal));
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            kanlu() {
                // ('查看糖包记录') 同时将红包金额过去
                this.$router.push({name: 'tanglu', params: {bi: 'ulam', jin: this.waljin}})
            },
            onHide() {
                let that = this
                if (!that.shiz) {
                    that.ss2 = true
                }
            },
            onShow() {
            },
            //糖包记录
            tlu() {
                console.log(789)
            },
            //选择币种
            xbi(e) {
                let that = this
                if (e[0] == 'ULAM') {
                    that.whobi = 0
                }
            },
            qubao1() {
                this.xianshi = true
            },
            //红包记录
            baojilu() {
                console.log("查看红包记录")
                this.$router.push('/baoinfo')
            },
            fenxiang() {
                console.log('分享了')
                //bfx
                let clipboard = new Clipboard('.bfx')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.ss7 = true
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
            //  发红包 信息正确后 弹窗资金密码
            fa() {
                // 判断shu  和 shu1 有没有 获取到的都是字符对象
                let that = this
                let ze = that.shu
                let ge = that.shu1
                if (!ze || !ge) {
                    that.ss1 = true
                    return
                }
                //当地址 金额 通过验证后 首先判断开启了指纹支付没有
                let zw = localStorage.getItem('zhiwens')
                if (zw) {
                    //  弹出指纹样式
                    that.show1 = true
                    //  下面是真正的指纹方法
                    that.wenfus()
                } else {
                    //没有开启指纹 弹出密码框
                    that.ss2 = true
                }
            },
            //  真正调用指纹的方法
            wenfus() {
                let _this = this
                console.log("开始指纹识别")
                if (!window.plus) return;
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
                        //开启识别成功的加载状态
                        _this.shiz = true
                        // //关掉指纹的样式弹窗
                        _this.show1 = false
                        // //  调用拿取密码的方法
                        _this.wendmi()
                    }, function (e) {
                        switch (e.code) {
                            case e.AUTHENTICATE_MISMATCH:
                                plus.nativeUI.toast('指纹匹配失败，请重新输入');
                                _this.fingertext = '指纹匹配失败，请重试'
                                break;
                            case e.AUTHENTICATE_OVERLIMIT:
                                plus.nativeUI.alert('识别次数超出限制，请使用密码进行支付！');
                                //密码弹窗起来 指纹样式下去
                                _this.show1 = false
                                _this.ss2 = true
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
            //拿取资金密码
            //指纹成功后调取的方式
            wendmi() {
                let mis = localStorage.getItem("jinmi");
                console.log(mis)
                // 调用支付方法 别忘了 shiz 还整加载中
                if (!mis) {
                    this.cz3 = true
                    setTimeout(() => {
                        this.$router.push('/user')
                    }, 2000)
                    return
                }
                this.quefa(mis)
            },
            //确认资金密码后 真正发
            quefa(ab) {
                let that = this
                if (ab) {
                    that.anmi = ab
                }
                if (that.anmi.length < 3) {
                    that.ss3 = true
                    that.anmi = ''
                    return
                }
                if (!ab) {
                    that.ss4 = true
                }
                //这是发ulam的
                that.xuanfa()
            },
            //发ulam红包
            xuanfa() {
                let that = this
                console.log('发ulam')
                //判断红包类型  0是随机  1 是固定
                let c = 0
                if (that.bao) {
                    c = 0
                } else {
                    c = 1
                }
                that.axios.post(that.ull + '/ulam_red_packet',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima,
                        "amount": parseInt(that.shu1),
                        "balance": parseInt(that.shu),
                        "type": c,
                        "drawback_passwd": that.anmi,
                        "beizhu": that.yu1
                    }
                ).then(response => {
                    //停止加载
                    that.ss4 = false
                    that.shiz = false;

                    if (response.data == 'password_drawback_error_null') {
                        that.ss8 = true
                        that.anmi = ''
                        return
                    }
                    that.jiemi(response.data);
                    if (response.data == 'amount_error') {
                        that.anmi = ''
                        that.shu = ''
                        that.ss6 = true
                        that.ss2 = false
                        return
                    }
                    console.log(response.data)
                    if (response.data.length == 10) {
                        //关闭 密码窗 充值密码
                        that.ss2 = false
                        that.anmi = ''
                        that.shu = ''
                        that.shu1 = ''
                        //将分享页面显示出来
                        that.xianshi = false
                        that.pinred(response.data)

                        if (that.txuan) {
                            console.log('发帖到社区')
                            that.fafat(response.data, that.yu1)
                        }


                        //  重新刷新下数据
                        that.diaoqu()
                    }


                })
                //     .catch(function (error) {
                //     that.ss4 = false
                //     that.shiz = false
                //     //提示生成红包错误
                //     that.ss5 = true
                //     that.anmi = ''
                //     console.log(error);
                // })
            },
            //调用发帖
            fafat(re, b) {
                let that = this;
                let plus = window.plus;
                let task = plus.uploader.createUpload(this.apiurlCommunity+'/create-article',
                    {method: "POST", priority: 100, retry: 3},
                    function (t, status) {
                        let resp = JSON.parse(t.responseText)
                        // 上传完成 社区同步
                        if (resp.status == 'success') {
                            that.tixian = true
                        }
                    }
                );
                task.addData("user", that.users.hu);
                task.addData("password", that.users.mima);
                task.addData("content", re + that.users.ma + b);
                task.addData("isRedpacket", "true");
                task.start();
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
            //拼接分享红包链接
            pinred(e) {
                let that = this
                let bc = 'ULAM'
                let dc = 'u'
                that.hongbaoma = '我刚刚发了一个大额' + bc + '糖包儿，快试试你的手气,http://ulamchain.io/open/#/bao/' + e + '&' + that.users.ma + dc
            },
            //取消发红包
            bufa() {
                this.ss2 = false
                this.anmi = ''
            },
            //  更改红包类型 拼手气 还是普通
            gai() {
                let that = this
                that.bao = !that.bao
                if (that.bao) {
                    that.baozi = '改为普通糖包'
                    that.baozi1 = '当前为拼手气糖包，'
                    that.baozi2 = '糖包总金额'
                } else {
                    that.baozi = '改为拼手气糖包'
                    that.baozi1 = '当前为普通糖包，'
                    that.baozi2 = '单个金额'
                }

            }
        }
    }
</script>

<style scoped>
  .vux-cell-value {
    color: red;
  }

  .b1 {
    color: white;
  }

  .bao3 {
    position: absolute;
    width: 100%;
    top: 0px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .bg3 {
    background: url(../assets/baob.png);
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .bfx {
    /*margin-top:50px;width:85px;*/
    position: absolute;
    left: 0;
    top:0px;
    z-index: 10;
    /*bottom: 30%;*/
    /*right: 37%;*/
    /*width: 23%;*/
  }

  .yuan {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #e44645;
    box-shadow: 0 2px 0 #666;
    border-radius: 50%;
    text-align: center;
    /*background: linear-gradient(transparent 50%, black 50%)*/
  }

  .baor {
    height: 400px;
    width: 100%;
    color: #f9d63f;
    border-radius: 8px;
  }

  .an {
    height: 36px;
    width: 150px;
    color: #fff;
    background: #ef4e4c;
    border: none;
    border-radius: 4px;
  }

  .an1 {
    height: 36px;
    width: 150px;
    color: #fff;
    background: #ef4e4c;
    border: none;
    border-radius: 4px;
    opacity: 0.6;
  }

  .in1 {
    border: none;
    outline: none;
    text-align: right;
    width: 140px;
  }

  .in3 {
    border: none;
    outline: none;
    text-align: right;
    background: #fff;
    width: 52%;
    font-size: 30px;
    font-weight: 700;
  }

  .in2 {
    border: none;
    outline: none;
    height: 52px;
    font-size: 16px;
  }

  .kuai {
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border-bottom:1px solid #eee;*/
    background: #fff;
    border-radius: 30px;
    /*padding-left:20px;*/
    /*padding-right: 20px;*/
    /*box-sizing:border-box;*/
  }

  .zi1 {
    font-size: 14px;
    font-weight: 400;;
    /*margin-left:20px;*/
  }
</style>
