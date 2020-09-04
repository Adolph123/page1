<template>
  <div style="background:#f5f5f5;" :style="{ height: bodyHeight + 'px' }">
    <!--测试下拉刷新-->
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
          <p>刷新中
            <inline-loading></inline-loading>
          </p>
          <div style="height:10px;"></div>
        </div>
      </div>
      <img src="@/assets/newpage/newg1.png" alt="" style="width:100%;display:block;height:175px;">
      <div class="bos">
        <div style="height:30px;"></div>
        <!-- 头像 -->
        <div style="text-align:center;">
          <img :src="tutu" alt="" style="width:65px;height:65px;border-radius:50px;" v-on:click="setuser">
          <div><span v-on:click="setuser">
            <span>{{cname()}}</span>
            {{users.name}}</span></div>
        </div>
        <p style="text-align: center;font-size:12px;margin-top:5px;">距离瓜分奖励还剩
          <span v-if="dtime">{{dtime}}</span>
          <span v-else><inline-loading></inline-loading></span>
        </p>
        <p style="text-align: center;font-size:12px;margin-top:5px;">{{stime}}</p>
      </div>
      <div style="background:#fff;">
        <img src="@/assets/newpage/newg2.png" alt="" style="width:100%;">
        <div style="width:80%;margin:-58px  auto 0;height:50px;">
          <flexbox :gutter="0" style="text-align: center;">
            <flexbox-item>
              <div style="line-height: 22px">
                <p class="xishu yinzi">
                  <span style="color: #fff" v-if="xingji">{{xingji.gongxian}}</span>
                  <span v-else><inline-loading></inline-loading></span>
                </p>
                <p class="xizi">个人贡献值</p>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div style="line-height: 22px">
                <p class="xishu yinzi">
                  <span style="color: #fff" v-if="xingji">{{xingji.totle_gongxian}}</span>
                  <span v-else><inline-loading></inline-loading></span>
                </p>
                <p class="xizi">矿池贡献值</p>
              </div>
            </flexbox-item>
            <flexbox-item>
              <div style="line-height: 22px">
                <p class="xishu yinzi">
                  <span style="color: #fff" v-if="xingji">{{xingji.totle_reward}}</span>
                  <span v-else><inline-loading></inline-loading></span>
                </p>
                <p class="xizi">矿池总奖励</p>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <!-- 矿工角色为1 的才能显示充值矿机-->
      <div>
        <div v-if="users.miner !=1" style="height:20px;background:#fff;"></div>
        <div class="kk1" v-on:click="xiaji">
          <p>
          <span style="margin-left:15px;margin-top:1px;">
             <img src="@/assets/newpage/APP1_07.png" alt="" class="icc">
             <span style="margin-left:10px;">我的推广</span>
            </span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>

        <div v-if="hehuoifs" class="kk1" v-on:click="tograde">
          <p>
          <span style="margin-left:15px;margin-top:1px;">
             <img src="@/assets/newpage/mes.png" alt="" class="icc">
             <span style="margin-left:10px;">合伙人</span>
            </span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>

        <div v-if="admin == 1" class="kk1" v-on:click="administrator">
          <p>
          <span style="margin-left:15px;margin-top:1px;">
             <img src="@/assets/newpage/mes.png" alt="" class="icc">
             <span style="margin-left:10px;">管理员</span>
            </span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>


<!--        <div style="height:10px;background:#fff;"></div>-->
        <div style="width:100%;height:5px;background:#f5f5f5;"></div>
<!--        <div style="height:10px;background:#fff;"></div>-->
        <div class="kk1" v-on:click="goset">
          <p>
            <span style="margin-left:15px;">
              <img src="@/assets/newpage/sets.png" alt="" class="icc " style="width: 18px">
              <span style="margin-left:10px;">设置中心</span></span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>
        <div class="kk1" v-on:click="opin1">
          <p>
          <span style="margin-left:15px;margin-top:1px;">
             <img src="@/assets/newpage/tui.png" alt="" class="icc" style="width: 17px">
             <span style="margin-left:10px;">意见反馈</span>
            </span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>
        <div style="clear:both;"></div>


        <!--设置 分享-->
        <div class="kk1" v-on:click="haibao">
          <p>
          <span style="margin-left:15px;margin-top:1px;">
          <img src="@/assets/newpage/fenx.png" alt="" class="icc" style="width: 17px">
            <span style="margin-left:10px;">分享</span>
          </span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>

        <div style="clear:both;"></div>
        <!--设置 申请店铺-->
        <div class="kk1" v-on:click="shimingrenz(confirms,1)">
          <p>
          <span style="margin-left:15px;margin-top:1px;">
          <img src="@/assets/dianpu.png" alt="" class="icc" style="width: 17px">
            <span style="margin-left:10px;">申请店铺</span>
          </span>
            <span>
             <img src="@/assets/you.png" alt="" class="tu1">
             <span style="float: right;padding-right: 10px;color: #9a55ff;">{{stateList[confirms]}}</span>
           </span>
          </p>
        </div>
        <div style="clear:both;"></div>
        <!-- 	auth 	-->
        <!-- 实名认证-->
        <div class="kk1" v-on:click="shimingrenz(auth,2)">
          <p>
	      <span style="margin-left:15px;margin-top:1px;">
	      <img src="@/assets/dianpu.png" alt="" class="icc" style="width: 17px">
	        <span style="margin-left:10px;">实名认证</span>
	      </span>
            <span>
	         <img src="@/assets/you.png" alt="" class="tu1">
	         <span style="float: right;padding-right: 10px;color: #9a55ff;">{{auth==1?'已实名':''}}</span>
	       </span>
          </p>
        </div>
        <div style="clear:both;"></div>


        <!--设置 奖励     v-if="users.miner ==1 || users.miner ==2"  -->


<!--          -->
        <div style="clear:both;"></div>
        <div class="kk1" v-on:click="kg1"  v-if="users.miner ==1" >
          <p>
          <span style="margin-left:15px;margin-top:1px;">
          <img src="@/assets/newpage/mes.png" alt="" style="width:20px;position:relative;top:2px;">
            <span style="margin-left:10px;">我的矿主</span>
          </span>
            <span><img src="@/assets/you.png" alt="" class="tu1"></span>
          </p>
        </div>
        <div style="clear:both;"></div>
        <div style="height:80px;background:rgb(245, 245, 245);">
        </div>
      </div>
    </div>


    <!--测试下拉刷新-->
    <loading :show="ss1" text="刷新数据中.."></loading>
    <loading :show="ss9" text="加载中.."></loading>
    <loading :show="sh4" text="设置中.."></loading>
    <loading :show="shiz" text="识别成功.."></loading>
    <toast v-model="macuo" type="cancel" :time="1100" is-show-mask text="推广码有误!" width="12em"></toast>
    <toast v-model="sh1" type="cancel" :time="1100" is-show-mask text="密码不安全!" width="12em"></toast>
    <toast v-model="ss2" type="cancel" :time="2000" is-show-mask text="请认证后操作!" width="12em"></toast>
    <toast v-model="ss3" :time="2000" is-show-mask text="上级提交成功!" width="12em"></toast>
    <toast v-model="zhiwens" :time="2000" is-show-mask text="指纹验证成功!" width="12em"></toast>
    <toast v-model="sh2" :time="1500" is-show-mask text="设置成功!" width="12em"></toast>
    <toast v-model="ss4" type="cancel" :time="2000" is-show-mask text="提交有误!"></toast>
    <toast v-model="sh5" type="cancel" :time="2100" is-show-mask text="不能重复设置资金密码!" width="12em"></toast>
    <toast v-model="ss11" type="cancel" :time="2100" is-show-mask text="请确认资金密码!如未设置在我的页面设置" width="18em"></toast>
    <toast v-model="ss13" type="cancel" :time="2100" is-show-mask text="奖励不足2000，不能提取哦！" width="18em"></toast>
    <toast v-model="ss6" type="cancel" :time="1500" is-show-mask text="地址错误！" width="12em"></toast>
    <toast v-model="ss7" :time="1800" is-show-mask text="提取成功！" width="12em"></toast>
    <toast v-model="ss8" type="cancel" :time="2000" is-show-mask text="提取失败!请确认密码和数量" width="16em"></toast>
    <toast v-model="sh3" type="cancel" :time="1800" is-show-mask text="设置失败！" width="12em"></toast>
    <toast v-model="sh6" type="cancel" :time="1800" is-show-mask text="账户异常！请重新登录" width="18em"></toast>
    <toast v-model="xxx" type="cancel" :time="1800" is-show-mask text="暂未开启！" width="18em"></toast>
    <toast v-model="cz2" type="cancel" :time="1800" is-show-mask text="资金密码有误！" width="18em"></toast>
    <toast v-model="isauth" :time="1800" is-show-mask text="您已认证成功~" width="13em"></toast>
    <toast v-model="iscamear" type="cancel" :time="3000" is-show-mask text="您未开启摄像头权限，请到应用管理中开启权限~" width="18em"></toast>
    <toast v-model="cz1" type="cancel" :time="1500" is-show-mask text="请输入正确的数量!" width="18em"></toast>
    <toast v-model="cz3" type="cancel" :time="2000" is-show-mask text="未检测到资金密码!请在设置中添加" width="18em"></toast>
    <toast v-model="cz4" type="cancel" :time="1500" is-show-mask text="余额不足！请持有足够金额" width="18em"></toast>
    <toast v-model="cz5" :time="2200" is-show-mask text="充值矿机成功!" width="18em"></toast>
    <toast v-model="ss10" type="cancel" :time="1600" is-show-mask text="请求异常!请重新操作" width="18em"></toast>
    <toast v-model="dj1" type="cancel" :time="1600" is-show-mask text="请输入正确格式的手机号" width="18em"></toast>
    <toast v-model="dj2" type="cancel" :time="1600" is-show-mask text="请输入1-7内的有效数字" width="18em"></toast>
    <toast v-model="dj3" :time="1600" is-show-mask text="设置成功！" width="18em"></toast>
    <!--资金密码框-->
    <popup v-model="jintan" height="310px" is-transparent position="top" style="margin-top:10px;" :hide-on-blur="false">
      <div
        style="width:95%;background-color:#fff;height:290px;margin:0 auto;border-radius:5px;padding:10px;box-sizing: border-box;">
        <div style="width:90%;margin-left:5%;height:60px;line-height:60px;">
          <p style="font-size:18px;font-weight:700;text-align:center;">请输入资金密码</p>
        </div>
        <group>
          <x-input v-model="anmi1" title="资金密码" type="password" placeholder="请输入资金密码"></x-input>
        </group>
        <div style="padding:20px 15px;margin-top:25px;">
          <x-button @click.native="qjin()" :style="{ background: quan.color,color:'#fff',height:'40px'}">确认</x-button>
          <x-button @click.native="bjin" style="height:40px;">取消</x-button>
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
    <!--充值矿机-->
    <popup v-model="czkj" height="460px" is-transparent>
      <div style="width:95%;background-color:#fff;height:440px;margin:0 auto;border-radius:5px;padding-top:10px;">
        <div style="width:90%;margin-left:5%;">
          <p style="font-size:20px;font-weight:700;text-align: center;">充值矿机</p>
        </div>
        <div style="padding:10px;box-sizing: border-box;margin-top:15px;">
          <!--v-if="quan.yaoqing != 2"-->
          <div>
            <span style="font-weight:700;font-size:14px;">提示：</span>
            <span style="font-size:14px;">2000ULAM可充值一台矿机，请根据自己余额合理输入矿机数量</span>
            <span style="font-size:12px;color:red;font-weight:700;"> (备注：请最少保留1个ULAM来用做官网的手续费，例：充值5台矿机钱包余额要有10001个ULAM，不能只有10000整)</span>
          </div>
          <!--<div v-if="quan.yaoqing == 2">-->
          <!--<span style="font-weight:700;font-size:14px;">提示：</span>-->
          <!--<span style="font-size:14px;">3000ULAM可充值一台矿机，请根据自己余额合理输入矿机数量</span>-->
          <!--<span style="font-size:12px;color:red;font-weight:700;"> (备注：请最少保留1个ULAM来用做官网的手续费，例：充值2台矿机钱包余额要有6001个ULAM，不能只有6000整)</span>-->
          <!--</div>-->
          <div style="height:14px;"></div>
          <p>钱包余额： <span style="font-size:18px;">{{ ulam ?ulam.toFixed(4):0}}</span></p>
        </div>
        <group style="margin-top:-8px;">
          <x-input v-model="shu" title="矿机数量" type="number" placeholder="输入充值矿机数量"></x-input>
        </group>
        <div style="padding:20px 15px;margin-top:25px;">
          <!--<x-button type="primary" @click.native="zhuan1">确认转出</x-button>-->
          <x-button @click.native="quecz" :style="{ background: quan.color,color:'#fff' }">确认</x-button>
          <x-button @click.native="bucz">取消</x-button>
        </div>
      </div>
    </popup>
<!--实名提示-->
    <backColor v-if="dVisible">
      <el-dialog
        :visible.sync="dVisible"
        title="实名认证"
        width="80%"
      >
         <div class="udizhi" style="text-align: left;margin: 20px 0;font-weight: 400;font-size: 14px;color: #000">
           实名认证需要扣除<span style="font-size: 16px;color: red;font-weight: 600;">{{give_auth}}ulam</span>的费用,请确保钱包余额，余额不足会造成认证失败
         </div>
         <div style="height: 30px"></div>
         <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between">
            <span class=" botmOk" style="background: rgb(238, 238, 238);color: #777;" @click="dVisible = false">取消</span>
            <span style="width: 10%"></span>
            <span class="botmOk" @click="renzhenglives(auth)">确定</span>
          </span>
      </el-dialog>
    </backColor>
<!--实名认证2-->
    <backColor v-if="dVisibleaaa">
      <el-dialog
        :visible.sync="dVisibleaaa"
        title="实名认证"
        width="80%"
      >
          <div v-if="confirms == 0" style="text-align: left;margin: 20px 0;font-weight: 400;font-size: 14px;color: #000">
            实名认证需要扣除<span style="font-size: 16px;color: red;font-weight: 600;">{{give_auth}}ulam</span>的费用,请确保钱包余额，余额不足会造成认证失败
          </div>
          <div style="text-align: left;margin: 20px 0;font-weight: 400;font-size: 14px;color: #000">
            友情提示认证成功会收取 <span style="font-size: 16px;color: red;font-weight: 600;">{{give_jifen}}ulam</span>
            的保证金,请确保钱包余额，余额不足会造成认证失败,确定认证吗？(保证金可退还)
          </div>
          <div style="height: 30px"></div>
          <span slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between">
            <span class=" botmOk" style="background: rgb(238, 238, 238);color: #777;" @click="dVisibleaaa = false">取消</span>
            <span style="width: 10%"></span>
            <span class="botmOk" @click="renzheng">确定</span>
          </span>
      </el-dialog>
    </backColor>



    <bottomNav :flag="3"></bottomNav>


  </div>
</template>

<script>
    import bottomNav from '@/components/bnavigation/bottomNav';
    import backColor from "../base/backColor/backColor";
    import {
        Rater,
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        XButton,
        Confirm,
        Icon,
        Loading,
        Popup,
        Divider,
        XInput,
        Toast,
        Alert,
        Tabbar,
        TabbarItem,
        InlineLoading
    } from 'vux'

    export default {
        name: "user",
        components: {
            backColor,
            bottomNav,
            Rater,
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            XButton,
            Confirm,
            Icon,
            Loading,
            Popup,
            Divider,
            XInput,
            Toast,
            Alert,
            Tabbar,
            TabbarItem,
            InlineLoading
        },
        data() {
            return {
                dj1: false,
                dj2: false,
                dj3: false,
                dj4: false,
                iscamear: false,
                dtime: '',
                stime: '',
                auth: '',
                admin: 0,
                //设置会员等级的接口
                zimi: '',
                huiyuan: '',
                setdji: '',
                dengxian: false,
                xing2: 1,
                xing3: 7,
                xingji: '',
                cz1: false,
                cz2: false,
                cz3: false,
                cz4: false,
                cz5: false,
                czkj: false,
                shu: '',

                dVisible: false,
                give_auth: 0,
                give_jifen: 0,
                dVisibleaaa: false,
                isauth: false,


                bodyHeight: '',
                startY: '',    //保存touch时的Y坐标
                moveDistance: 0,    //保存向下滑动的距离
                moveState: 0,        //开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中
                duration: 0,        //动画持续时间，0就是没有动画
                show1: false,
                money: 1058,
                users: '',
                show: false,
                ji: '',
                con: false,
                ss1: false,
                tiao: false,
                tren: '',
                tren1: '',
                yao: false,
                macuo: false,
                ss2: false,
                ss3: false,
                ss4: false,
                ss5: false,
                ss6: false,
                ss7: false,
                ss8: false,
                ss9: false,
                ss10: false,
                ss11: false,
                ss12: false,
                xxx: false,
                ss13: false,
                //  提取矿池奖励的接受地址
                shou: '',
                //用户提取奖励的金额
                zhuane: '',
                //实际能提取的金额
                nzhuan: 0,
                zhiwens: false,
                anmi1: '',
                anmi2: '',
                sh1: false,
                sh2: false,
                sh3: false,
                sh4: false,
                sh5: false,
                sh6: false,
                yanxian: true,
                zhengzi: '未认证',
                //  真正应得的奖励
                newli: 0,
                //获得币数量
                ulam: 0,
                jias: '',
                zongzi: 0,
                tutu: './static/tx.png',
                jintan: false,
                shiz: false,
                jugao: 180,
                gredeme: '',
                stateList: ['', '审核通过', '审核中', '审核未通过'],//<!-- 1 通过  2 待审核  3 拒绝 -->
                confirms: 1,
                hehuoifs: 0,
            }
        },
        computed: {
            style() {
                return {
                    transition: `${this.duration}ms`,
                    transform: `translate3d(0,${this.moveDistance}px, 0)`
                }
            },
            ull() {
                return this.$store.state.uri;
            },
            quan() {
                return this.$store.state.zuli;
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
        mounted() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
            this._get_give_jifen()

            this.shua();
            this.bodyHeight = document.documentElement.clientHeight;
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            let user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            this.confirms = user.confirm;
            this.admin = user.admin;
            this.auth = user.auth;



            this.shuju();
            this.countTime();

            this.hehuoif()
            // that.test()
        },
        methods: {
            shimingrenz(flag, isflag) {



                if (isflag == 1) {//店铺认证
                    if (flag == 1) {
                        this.$router.push('/dianpuok')
                    } else {
                        this.dVisibleaaa = true
                    }

                } else if (isflag == 2) {//实名认证
                    if (flag == 1) {
                        this.isauth = true;
                    } else {
                        this.dVisible = true;
                    }
                }
            },


            _get_give_jifen() {
                let config = {};
                let param = {};
                this.axios.get(this.apiurl+'/get_give_jifen', param, config).then(res => {

                    console.log(res.data.give_jifen, '保证金');
                    this.give_jifen = res.data.give_jifen;
                })
                this.axios.get(this.apiurl+'/get_shiming_ulam', param, config).then(res => {

                    console.log(res.data.give_jifen, '扣除');
                    this.give_auth = res.data.data;
                })

            },
            //判断是不是合伙人
            hehuoif() {
                let user = JSON.parse(localStorage.getItem('user'));
                this.axios.post(this.ull + '/hehuo_if',
                    {
                        'mobile': parseInt(user.hu),
                        'password': user.mima
                    }
            ).then(res => {
                    console.log(res, '!!!!!!!!!!!!!!')
                    this.hehuoifs = res.data.data;
                })
            },
            kg1() {
                this.$router.push('/mkg')
            },
            tuiguang_day_info() {
                this.$router.push('/tuiguang_day_info')
            },
            // suo1() {
            //     this.$router.push('/suo')
            // },
            countTime() {
                let that = this
                //获取当前时间
                let time = new Date();
                console.log(time.getDay())
                let nowTime = time.getTime()
                let week = time.getDay()
                let year = time.getFullYear(); //获取年份
                let day = time.getDate(); //获取几号
                let month = time.getMonth() + 1;
                let fullday = 0;//定义一个月多少天
                //判断是否是闰年
                if (!(year % 4)) {//可以整除，是闰年
                    //判断月份是30天还是31天
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        fullday = 31;
                    } else if (month == 2) {
                        fullday = 29;
                    } else {
                        fullday = 30;
                    }
                } else {//不可以整除，不是闰年
                    //判断月份是30天还是31天
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        fullday = 31;
                    } else if (month == 2) {
                        fullday = 28;
                    } else {
                        fullday = 30;
                    }
                }
                //根据今天周几来判断距离下一次周1还有几天
                let distance_day = 0;
                switch (week) {
                    case 1:
                        distance_day = 0;
                        break;
                    case 2:
                        distance_day = 6;
                        break;
                    case 3:
                        distance_day = 5;
                        break;
                    case 4:
                        distance_day = 4;
                        break;
                    case 5:
                        distance_day = 3;
                        break;
                    case 6:
                        distance_day = 2;
                        break;
                    case 0:
                        distance_day = 1;
                        break;
                }
                //计算下一个周1的年月日
                let end_time = '';
                if (day + distance_day > fullday) {
                    let next_distance = Math.abs(fullday - (day + distance_day)); //计算超过本月下周二是下个月的几号
                    end_time = year + '/' + (month + 1) + '/' + next_distance + ' 20:00:00';
                } else {
                    end_time = year + '/' + month + '/' + (day + distance_day) + ' 20:00:00';
                }
                //倒计时
                let endtime_sjc = Date.parse(end_time); //计算时间戳
                // console.log('old1：'+endtime_sjc)
                let time_distance = (endtime_sjc - nowTime) / 1000; //计算现在到结束时间的时间戳
                function countTime(time_distance) {
                    time_distance--;
                    if (time_distance > 0) {
                        let getDay = Math.floor(time_distance / (60 * 60 * 24));//天
                        let getHour = Math.floor((time_distance - getDay * 60 * 60 * 24) / (60 * 60));//小时
                        let getMinute = Math.floor((time_distance - getDay * 60 * 60 * 24 - getHour * 60 * 60) / 60);//分钟
                        let getSecond = Math.floor(time_distance - getDay * 60 * 60 * 24 - getHour * 60 * 60 - getMinute * 60);//秒
                        that.dtime = getDay + '天' + getHour + '时' + getMinute + '分' + getSecond + '秒'
                    } else {
                        that.dtime = '奖励正在发放中..';
                    }
                    setTimeout(function () {
                        countTime(time_distance);
                    }, 1000);
                }

                countTime(time_distance);
            },
            test() {
                let now = new Date().getTime();
                //设置截止时间
                let str = "2020/1/20 20:00:00";
                let endDate = new Date(str);
                let end = endDate.getTime();
                // console.log('old2：'+end)
                //时间差
                let leftTime = end - now;
                //定义变量 d,h,m,s保存倒计时的时间
                let d, h, m, s;
                if (leftTime >= 0) {
                    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    m = Math.floor(leftTime / 1000 / 60 % 60);
                    s = Math.floor(leftTime / 1000 % 60);
                }
                //将倒计时赋值到div中
                this.stime = d + "天" + h + "时" + m + "分" + s + "秒"
                setTimeout(this.test, 1000);
            },
            cname() {
                let that = this
                if (that.users.miner == 1) {
                    return '矿池 -'
                } else if (that.users.miner == 2) {
                    return '矿主 -'
                }
            },
            opin1() {
                this.$router.push('/faad')
            },
            isTel(val) {
                if (/^1[3456789]\d{9}$/.test(val)) {
                    return true;
                }
                return false;
            },

            //等级弹窗
            setji() {
                this.dengxian = true
            },
            //取消设置等级
            qudeng() {
                this.zimi = ''
                this.huiyuan = ''
                this.setdji = ''
                this.dengxian = false
            },
            //查看下级
            xiaji() {
                this.$router.push('/xiaji')
            },
            //合伙人
            tograde() {
                this.$router.push('/grade')
            },
            //跳转管理员
            administrator() {
                this.$router.push('/administrators')

            },
            //指纹弹窗消失和隐藏
            onHide() {
                let that = this
                if (!that.shiz) {
                    that.czkj = false
                    that.jintan = true
                }
            },
            onShow() {
            },
            //确认输入密码  充值矿机
            qjin(xmi) {
                let that = this
                if (xmi) {
                    that.anmi1 = xmi
                }
                if (that.anmi1.length < 3) {
                    that.cz2 = true
                    that.anmi1 = ''
                    return
                }
                if (!xmi) {
                    that.ss9 = true
                }
                //拿取账户密码。拿去新的值
                let a = that.users.hu
                let b = that.users.mima
                that.axios.post(that.ull + '/recharge',
                    {
                        "mobile": parseInt(a),
                        "password": b,
                        "drawback_passwd": that.anmi1,
                        "amount": parseInt(that.shu)
                    }).then(response => {
                    that.ss9 = false
                    that.shiz = false
                    // console.log(response.data)
                    if (response.data == 'password_drawback_error') {
                        that.cz2 = true
                        that.anmi1 = ''
                        return
                    }
                    if (response.data == 'password_drawback_error_null') {
                        that.cz3 = true
                        that.anmi1 = ''
                        return
                    }
                    //矿机数不足
                    if (response.data == 'amount_error' || response.data == 'error') {
                        that.cz4 = true
                        that.anmi1 = ''
                        that.shu = ''
                        that.jintan = false
                        return
                    }
                    if (response.data == 'success') {
                        that.cz5 = true
                        that.anmi1 = ''
                        that.shu = ''
                        that.jintan = false
                        //充值成功重新刷新钱包数据
                        that.du()
                        return
                    }
                    that.ss10 = true
                    that.anmi1 = ''
                }).catch(function (error) {
                    that.ss9 = false
                    that.shiz = false
                    that.ss10 = true
                    that.anmi1 = ''
                    // console.log(error);
                })
            },
            //取消输入资金密码
            bjin() {
                let that = this
                that.jintan = false
                that.anmi1 = ''
            },
            //确定充值
            quecz() {
                let that = this
                if (!that.shu || that.shu < 1) {
                    that.cz1 = true
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
                    that.jintan = true
                    that.czkj = false
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
                                _this.jintan = true
                                _this.showFinger = false;
                                break;

                            default:
                                if (e.code == 6) {
                                    break;
                                } else {
                                    plus.nativeUI.alert('指纹识别失败(' + e.code + ')，请重试');
                                    _this.fingertext = '指纹识别失败(' + e.code + ')，请重试'
                                    break;
                                }
                                ;
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
                // console.log(mis)
                // 调用支付方法 别忘了 shiz 还整加载中
                if (!mis) {
                    this.cz3 = true
                    setTimeout(() => {
                        this.$router.push('/user')
                    }, 2000)
                    return
                }
                this.qjin(mis)
            },
            bucz() {
                this.czkj = false
                this.shu = ''
            },
            //充值矿机弹窗
            cckk() {
                this.czkj = true
            },
            //买矿机
            maijis() {
                this.$router.push({name: 'buyji', params: {id: 'q'}})
            },
            //发糖包
            fabaos() {
                this.$router.push('/bag')
            },
            //提币
            tibb() {
                this.$router.push('/tibis')
            },
            gaoshi() {
                // console.log('开始算总价')
                let that = this
                //获取到价格
                let gou = that.jias
                //价格乘以数量
                let a = gou.ulam * that.ulam
                that.zongzi = a.toFixed(2)
            },
            //去掉小数点
            qdian(e) {
                let str = e.replace(/,/g, "");//取消字符串中出现的所有逗号
                return parseFloat(str);
            },
            djia() {
                let that = this
                let a = localStorage.getItem('jia');
                if (a) {
                    that.jias = JSON.parse(a)
                    // console.log(that.jias)
                }
                that.axios.get(this.apiurl+'/token_price_all').then(response => {
                    //  获取到的全都是人民币价格
                    //比特
                    let b = that.qdian(response.data[0].btc)
                    // console.log('btc当前交易所价格：'+b)
                    //ulam
                    let ss = that.qdian(response.data[0].ulam)
                    // console.log('ulam当前交易所价格：'+ss)
                    //全部存入内存
                    that.jias = {'ulam': ss, 'btc': b}
                    localStorage.setItem("jia", JSON.stringify(that.jias));
                }).catch(function (error) {
                    console.log(error);
                })
            },
            //  集中调用使用的方法
            shuju() {
                let that = this
                let message = localStorage.getItem('user');
                message = JSON.parse(message)
                if (!message) {
                    //跳转登陆
                    that.$router.push('/zhu')
                    return
                }
                //请求所有币的登陆。拿到总值
                that.users = message
                console.log(that.users)
                // 调取头像
                that.dqtx()
                //获取价格
                that.djia()
                //拿取权限
                console.log('第几组：' + that.users.group_miner)
                that.$store.dispatch('naquan', that.users.group_miner)
                that.dengji()
            },
            //查看用户贡献值
            dengji() {
                let that = this
                //拿取账户密码。拿去新的值
                let a = that.users.hu
                let b = that.users.mima
                that.axios.post(that.ull + '/search_expand_self',
                    {
                        "mobile": parseInt(a),
                        "password": b
                    }).then(response => {
                    console.log(response.data)
                    that.xingji = response.data
                }).catch(function (error) {
                })
            },
            //拿取ulam数量
            du() {
                let that = this
                //拿取账户密码。拿去新的值
                let a = that.users.hu
                let b = that.users.mima
                // console.log('手机:'+a +',密码:'+b)
                //主网钱包ip
                that.axios.post(that.ull + '/ulam_wallet',
                    {
                        "mobile": parseInt(a),
                        "password": b
                    }).then(response => {
                    // console.log(response.data)
                    if (response.data[0]) {
                        that.ulam = response.data[0].balance
                        // console.log('ulam:'+that.ulam)
                        let wal = response.data[0]
                        localStorage.setItem("wals", JSON.stringify(wal));
                        that.gaoshi()
                    }
                }).catch(function (error) {
                })
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
                    this.shua()
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
                    }, 1000)
                } else {
                    //否则 给我老老实实恢复原样
                    this.moveDistance = 0
                }
            },
            //看转账
            kanzz() {
                this.$router.push('/watorder')
            },
            //  设置
            goset() {
                this.$router.push('/sets')
            },
            //  去看奖励
            jiang() {
                this.$router.push('/jiangli')
            },
            //  去看奖励 查时间段的奖励
            jiang1() {
                this.$router.push('/jiangli1')
            },
            // 扫一扫
            shequ1() {
                this.$router.push('/sao')
            },
            //去充值
            gobao() {
                // this.$router.push('/wats')
                this.$router.push({name: 'addbi', params: {id: 'ulam'}})
            },
            //  进入设置个人
            setuser() {
                this.$router.push('/setuser')
            },
            //  点击眼睛显示金额
            xianyan() {
                this.yanxian = !this.yanxian
            },
            //订单

            //审核
            shenhe() {
                this.$router.push('/shen')
            },
            //实名认证
            renzheng() {
                this.dVisibleaaa = false;
                // <!-- 1 通过  2 待审核  3 拒绝 0 未点击 confirm-->
                if (this.confirms == 1) {
                    this.$router.push('/dianpuok')
                } else if (this.confirms == 2) {
                    return
                } else {
                    this.$router.push({
                        path: '/successful',
                        query: {
                            id: 1
                        }
                    })
                }

            },
            // 实名认证
            renzhenglives(flag) {
                this.dVisible = false;

                let that = this;
                plusReady();




                function plusReady() {
                    var Build = plus.android.importClass("android.os.Build");
                    var Manifest = plus.android.importClass("android.Manifest");
                    var MainActivity = plus.android.runtimeMainActivity();
                    //var context=main.getApplicationContext(); //未用到,在此仅供参考

                    var ArrPermissions = [
                        Manifest.permission.CAMERA
                    ];

                    function PermissionCheck(permission) {
                        if (Build.VERSION.SDK_INT >= 23) {
                            if (MainActivity.checkSelfPermission(permission) == -1) {
                                return false;
                            }
                        }
                        return true;
                    }

                    function PermissionChecks(Arr) {
                        var HasPermission = true;
                        for (var index in Arr) {
                            var permission = Arr[index];
                            //如果此处没有权限,则是用户拒绝了
                            if (!PermissionCheck(permission)) {
                                HasPermission = false;
                                break;
                            }
                        }
                        return HasPermission;
                    }

                    function PermissionRequest(Arr) {
                        var REQUEST_CODE_CONTACT = 101;
                        if (Build.VERSION.SDK_INT >= 23) {
                            MainActivity.requestPermissions(Arr, REQUEST_CODE_CONTACT);
                        }
                    }

                    //如果没有权限，则申请
                    if (!PermissionChecks(ArrPermissions)) {
                        that.iscamear = true;
                        //没权限
                        // PermissionRequest(ArrPermissions);
                    } else { //如果拥有权限，那么干点啥吧^_^
                        //需要认证
                        if (flag == 0) {
                            that.$router.push({
                                path: '/successful',
                                query: {
                                    id: 2
                                }
                            })
                        } else if (flag == 1) {
                            that.isauth = true;
                        }

                    }
                }

                if (window.plus) {
                    plusReady();
                } else {
                    document.addEventListener('plusready', plusReady, false);
                }








            },
            //  先进入 邀请 奖励活动页面
            haibao() {
                let that = this
                that.$router.push('/hai')
            },
            dqtx() {
                let that = this
                let txs = localStorage.getItem('tellertx');
                if (txs) {
                    that.tutu = txs
                    return
                }
                that.axios.post(that.ull + '/get_head_image',
                    {
                        "password": that.users.mima,
                        "mobile": parseInt(that.users.hu)
                    }, {responseType: 'blob'}
                ).then(response => {
                    // console.log(response.data)
                    if (response.data.size == 4) {
                        // console.log('未设置头像')
                    } else {
                        that.isImgStyle3(response.data)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            //读取头像文件的方法
            isImgStyle3(e) {
                let that = this
                //获取并记录图片的base64编码
                // let newima = new Blob([e],{type:'image/jpeg'})
                let reader = new FileReader();
                reader.readAsDataURL(e); // 读出 base64
                reader.onload = function () {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
                    that.tutu = reader.result;//base64
                    localStorage.setItem("tellertx", that.tutu);
                };
            },
            //刷新数据
            shua() {
                let that = this
                //开启加载状态
                that.ss1 = true;
                //拿取账户密码。拿去新的值
                let users = JSON.parse(localStorage.getItem('user'));
                let a = users.hu;
                let b = users.mima;
                that.axios.post(that.ull + '/login', {"mobile": parseInt(a), "password": b}).then(response => {
                    console.log(response.data)
                    if (response.data == 'password_error' || response.data == 'error') {
                        that.sh6 = true
                        setTimeout(() => {
                            localStorage.removeItem("user");
                            this.$router.push('/zhu')
                        }, 1800)
                        return
                    }
                    //开始拿新的值
                    let ss = response.data[0];
                    this.confirms = ss.confirm;
                    this.admin = ss.admin;
                    this.auth = ss.auth;
                    let bs = {
                        "drawback_passwd":ss.drawback_passwd,
                        'sl': 999, 'ren': 1, 'take': 0, 'confirm': ss.confirm, 'auth': ss.auth, admin: ss.admin,
                        'jl': ss.reward, 'xl': ss.reward_miner,           //奖励和下级奖励
                        'one': ss.level_1, 'two': ss.level_2,              //1级 2级
                        'hu': a, 'mima': b, 'name': ss.name,                  //账户 密码 名字
                        'ma': ss.expand_num_self, 'sma': ss.expand_num,     //自己的邀请码  --上级码
                        'miner': ss.miner, 'group_miner': ss.group_miner    //矿工角色  --- 哪个组
                    }
                    localStorage.setItem("user", JSON.stringify(bs));
                    that.ss1 = false
                    //调取数据的方法
                    that.shuju()

                }).catch(function (error) {
                    console.log(error);
                    setTimeout(() => {
                        that.ss1 = false
                    }, 500)
                })
            },
            //认证
            zheng() {
                this.$router.push('/zheng')
            },
        }
    }
</script>

<style scoped>
  .xishu {
    font-size: 14px;
    color: #863a01;
    font-weight: 700;
  }

  .xizi {
    font-size: 12px;
    color: #f7f7f7;
  }

  .icc {
    width: 20px;
    position: relative;
    top: 4px;
  }

  .bos {
    color: #fff;
    padding: 7px 15px;
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    top: 50px;
    font-size: 15px;
  }

  .quanc {
    line-height: 35px;
    font-size: 12px;
    font-weight: 700;
    margin-right: 15px;
  }

  .lanlan {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
  }

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
  .cebor {
    border-bottom: 1px solid #F5F5F5;
  }

  .tu1 {
    width: 13px;
    float: right;
    margin-top: 22px;
    margin-right: 4%;
  }

  .tu2 {
    width: 13px;
    margin-top: 13px;
  }

  .kk1 {
    height: 55px;
    width: 100%;
    line-height: 55px;
    background: #fff;
    font-size: 14px;
  }

  .szi {
    font-size: 14px;
    margin-top: 4px;
  }

  .szi2 {
    font-size: 10px;
  }

  cell {
    font-size: 13px;
  }

  .li1 {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
  }

  .li2 {
    color: #c23631;
    font-size: 18px;
  }

  .bg1 {
    position: absolute;
    z-index: -2;
    height: 170px;
    width: 100%;
    background: #11bcd8;
    border-bottom-left-radius: 26px;
    border-bottom-right-radius: 26px;
  }

  .flex3 {
    width: 80%;
    margin-left: 7%;
    background: #9c4eee;
    border-radius: 20px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: white;
  }

  .flex-demo {

  }

  .shua2 {
    width: 25px;
  }

  .shua1 {
    width: 25px;
    transition: all 3s;
    transform: rotate(1440deg);
  }

  .zi2 {
    font-size: 20px;
    font-weight: 700;
  }

  .zi3 {
    font-size: 16px;
    font-weight: 700;
  }

  .zheng {
    margin-top: 20px;
    border: 1px solid #ffbe00;
    width: 40%;
    text-align: center;
    height: 30px;
    border-radius: 6px;
  }

  .getu {
    /**/
    /*background-size:cover;*/
    border-radius: 10px;
    /*border:1px solid #ccc;*/
    background: white;
    box-shadow: 0px 0px 5px #ccc;
    margin-top: 10px;
  }
</style>
