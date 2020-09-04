<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <div class="back1" style="text-align:center;height: 70px">
      <div style="color:#171717;line-height:40px;font-size: 18px;margin-top: 30px;" v-on:click="ding">{{jzi}}：{{kc}}</div>
      <router-link to="/"><img src="@/assets/back.png" alt="" style="height:20px;position:absolute;top:39px;left:15px;"></router-link>
    </div>
    <div style="position:fixed;top:5px;right:12px;z-index:999;font-weight: 400;" v-on:click="shua">
      <img src="@/assets/shua1.png" alt="" v-bind:class="[tiao ? 'shua1': 'shua2']">
    </div>
    <div style="height: 80px"></div>
    <div v-show="(weishuju.length != 0 && yunshuju.length != 0) || (yishuju.length != 0 && yunshuju.length != 0) ||(weishuju.length != 0 && yishuju.length != 0)"
         style="display: flex;line-height: 30px;justify-content: center;">
      <div v-show="yunshuju.length != 0" @click="taggletistitle(0)" class="title" :class="{titleactive:istitle == 0}">云矿机</div>
      <div v-show="weishuju.length != 0" @click="taggletistitle(1)" class="title" :class="{titleactive:istitle == 1}">代理矿机</div>
      <div v-show="yishuju.length != 0" @click="taggletistitle(2)" class="title" :class="{titleactive:istitle == 2}">锁仓矿机</div>
    </div>

    <scroll :style="{ height:(weishuju.length != 0 && yunshuju.length != 0) || (yishuju.length != 0 && yunshuju.length != 0) ||(weishuju.length != 0 && yishuju.length != 0)?bodyHeight-106+'px':bodyHeight- 70 + 'px' }" class="main-content">
      <div>
        <div v-if="!kc" style="position: absolute;top:40%;width:80%;margin-left:10%;">
          <divider><span style="color:#999;">暂无矿机</span></divider>
        </div>

        <div style="height: 15px;"></div>
        <div style="padding: 0 10px 10px;box-sizing:border-box;background:#F5F5F5;">
          <div>

            <!--真正的矿机框-->
            <div  v-for="(shuju,index) in shujuz">
              <div class="kj">
                <div style="height:15px;"></div>
                <div>
                  <div style="float:left;width:45%">
                    <img src="@/assets/xianka.png" alt="" style="width:90%;margin:5%;">
                  </div>
                  <div class="shuju">
                    <div style="margin-left:10px;">
                      <p style="font-size:14px;font-weight:700;">矿机</p>
                      <p class="z1">矿机总额(U)：<span class="q3">{{Math.floor(shuju.Balance * 100) / 100}}</span></p>
                      <p class="z1">矿机打包数：<span class="q3">{{shuju.Packing_Number}}</span></p>
                      <p class="z1">矿机幸运值：<span class="q3">{{shuju.Lucky_Value}}</span></p>
                      <p class="z1">矿机打包率：<span class="q3">{{(shuju.probability*100).toFixed(5)}}%</span></p>
                      <p v-if="istitle != 0" class="z1">代理手续费：<span class="q3">{{ parseFloat(shuju.free)*100 }}%</span></p>
                      <p v-if="istitle == 2" class="z1">锁仓时间：<span class="q3">{{fromTimer(parseFloat(shuju.lock))}}</span></p>
                    </div>
                  </div>
                  <div style="clear:both;"></div>
                </div>
                <div style="width:100%;border-top:1px solid #eee;padding-top:6px;display: flex;align-items: center">
                  <div class="zi">地址：<span>{{shuju.addr}}</span></div>
                  <div class="zi2 d1" :data-clipboard-text="shuju.addr">
                    <img src="@/assets/newpage/copy1.png" alt="" style="width:30%;float: right;" @click="fuzhi">
                  </div>
                  <div style="clear: both;"></div>
                </div>
                <!--转出照片-->
                <div class="z6" v-on:click="zhuanji(shuju.addr,index+1,shuju.Balance)" v-if="istitle == 0">
                  点击转出
                  <img src="@/assets/baiyou.png" alt="" style="width:12px;position:relative;top:1.5px;">
                </div>
                <div class="z6" v-on:click="zhuanji(shuju.addr,index+1,shuju.Balance)" v-if="shuju.lock == 0">
                  点击转出
                  <img src="@/assets/baiyou.png" alt="" style="width:12px;position:relative;top:1.5px;">
                </div>
                <div class="z6" style="background: rgba(0,0,0,0);text-align: right;padding-right: 13px" v-if="shuju.lock">
<!--         class="z6"         锁仓中-->
                  <img src="@/assets/icos/suo1.png" alt="" style="width:14px;position:relative;top:1.5px;">
                </div>
              </div>
            </div>


          </div>
        </div>
        <div style="height:60px;background:#F5F5F5;"></div>
      </div>
    </scroll>




    <!--弹窗 提示-->
    <toast v-model="ss1" :time="1000" is-show-mask text="复制成功!"></toast>
    <toast v-model="ss5" type="cancel" :time="1500" is-show-mask text="地址错误！"></toast>
    <toast v-model="ss6" :time="2000" is-show-mask text="转账成功！"></toast>
    <toast v-model="ss7" type="cancel" :time="1800" is-show-mask text="提取失败!请确认资金密码" width="16em"></toast>
    <toast v-model="ss11" type="cancel" :time="2100" is-show-mask text="请确认资金密码!如未设置在我的页面设置" width="18em"></toast>
    <toast v-model="ss8" type="cancel" :time="1800" is-show-mask text="矿机已被提取！"></toast>
    <toast v-model="net1" type="cancel" :time="1800" is-show-mask text="网络不给力啊~"></toast>
    <loading :show="ss2" text="加载中.."></loading>
    <loading :show="ss9" text="刷新中.."></loading>
    <loading :show="ss4" text="转出中.."></loading>
  </div>
</template>

<script>
    import {
        Divider,
        XHeader,
        Toast,
        XInput,
        Group,
        Icon,
        XButton,
        Loading,
        Alert,
        Confirm,
        Popup,
        Cell,
        Tab,
        TabItem
    } from 'vux'
    import Clipboard from 'clipboard';
    import scroll from "../base/scroll/scroll";
    export default {
        name: "wgeji",
        components: {
            scroll,Divider, XHeader, XInput, Toast, Group, Icon, XButton, Loading, Alert, Confirm, Popup, Cell, Tab, TabItem
        },
        data() {
            return {
                bodyHeight: '',
                //真正遍历的数据
                shujuz: [],
                //全部矿机
                shujus: [],
                //锁仓矿机
                shuju1: '',
                //未锁仓矿机
                shuju2: '',
                ss1: false,
                ss2: false,
                //选中矿机时需要的参数，弹窗，地址和 第一个
                ss3: false,
                ss4: false,
                ss5: false,
                ss6: false,
                ss7: false,
                ss8: false,
                ss9: false,
                ss11: false,
                kj: 0,
                kaddr: '',
                jine: 0,
                //接收的地址
                shou: '',
                users: '',
                tiao: false,
                anmi: '',
                jzi: '矿机总量',
                kc: 0,
                net1: false,
                istitle:0,
                weishuju:[],
                yishuju:[],
                yunshuju:[],
                isOne:true,
            }
        },
        computed: {
            ull() {
                return this.$store.state.uri;
            }
        },
        mounted() {
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }
            let that = this;
            //  获取当前高度
            that.bodyHeight = document.documentElement.clientHeight
            if (window.plus) {
                plus.navigator.setStatusBarBackground("#f5f5f5");
            }
            let message = localStorage.getItem('user');
            if (!message) {
                that.$router.push('/zhu')
            } else {
                that.ss2 = true;
                message = JSON.parse(message);
                that.users = message;
                that.diaoges();



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
            panduanzhuans(){
                this.isOne = false;
                if(this.yunshuju.length >= 1){
                    this.taggletistitle(0);
                }else if(this.weishuju.length >= 1){
                    this.taggletistitle(1);
                }else if(this.yishuju.length >= 1){
                    this.taggletistitle(2);
                }
            },

            //时间转换
            fromTimer(timer){
                var date = new Date(timer*1000);
                let Y,M,D,h,m,s;
                Y = date.getFullYear() + '.';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                D = date.getDate() ;
                return Y+M+D
            },
            //头部切换
            taggletistitle(nums){
                this.istitle = nums;

                if(nums == 0){
                    this.shujuz = this.yunshuju;
                    this.jzi = '云矿机总量'
                    this.kc  = this.yunshuju.length;
                }else if(nums == 1){
                    //未锁仓
                    this.shujuz = this.weishuju;
                    this.jzi = '代理矿机总量'
                    this.kc  = this.weishuju.length;
                }else if(nums == 2){
                    //已经锁仓
                    this.shujuz = this.yishuju;
                    this.jzi = '锁仓矿机总量'
                    this.kc  = this.yishuju.length;
                }

            },
            //请求云矿机数据
            diaoges(){
                let that = this
                //主网
                that.axios.post(that.ull + '/search_miner',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(response => {

                    //将个人矿机数据遍历
                    console.log(response.data,'云矿机数据遍历')

                    if (response.data[0]) {
                        this.yunshuju = response.data;
                        this.shujuz = response.data;
                    }else {
                    }
                    that.diaoge();
                })
            },

            //  回到顶部
            ding() {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
            chutime(a) {
                let b = new Date(a).toLocaleString('chinese', {hour12: false})
                let c = b.indexOf(" ")
                // console.log(c)
                return b.substr(0, c)
            },
            //选择状态
            onItemClick(e) {
                let that = this
                if (e == 1) {
                    that.jzi = '代理矿机总量'
                    that.shujuz = that.shujus
                } else if (e == 2) {
                    //锁仓
                    that.jzi = '锁仓矿机量'
                    that.shujuz = that.shuju1
                } else if (e == 3) {
                    //未锁仓
                    that.jzi = '未锁仓矿机量'
                    that.shujuz = that.shuju2
                }
            },
            //刷新
            shua() {
                let that = this;
                that.tiao = true;
                that.ss2 = true;
                that.diaoges();
                that.tiao = false;
                setTimeout(() => {

                    that.taggletistitle(that.istitle)

                }, 300)
            },
            diaoge() {
                let that = this
                //主网
                that.axios.post(that.ull + '/search_miner_tg',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(response => {
                    that.ss2 = false;
                    //将个人矿机数据遍历
                    console.log(response.data,'将个人矿机数据遍历')
                    if (response.data == 'miner_error') {
                        return
                    }
                    if (response.data[0]) {
                        that.shujus = response.data;
                        // that.shujuz = that.shujus;
                        that.kc = that.shujuz.length;
                        that.chukj(that.shujus);
                        let arr = response.data;
                        let list = [];
                        let list1 = [];
                        arr.map(item =>{
                                //lock == 0 为未锁仓
                                if(item.lock  == 0){
                                    list.push(item)
                                }
                                if(item.lock > 0){
                                    list1.push(item)
                                }

                        });
                        this.weishuju = list;
                        this.yishuju = list1;
                    }

                    if (this.isOne){
                        that.panduanzhuans();
                    }


                }).catch(function (error) {
                    that.ss2 = false
                    if (error.response.status === 429) {
                        that.net1 = true
                    }
                })
            },
            //处理数据方法
            chukj(a) {
                let that = this
                let ws = []
                let sc = []
                a.map((item) => {
                    if (item.lock == 0) {
                        ws.push(item)
                    } else {
                        sc.push(item)
                    }
                })
                //锁仓
                that.shuju1 = sc
                //未锁仓
                that.shuju2 = ws
            },
            //正则ulam地址
            isUlamAddr(addr) {
                // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
                let patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');
                if (patt.test(addr)) {
                    return true;
                }
                return false;
            },
            //转出选中 弹窗
            zhuanji(e, a, b) {
                //  【这里是新的 测试】
                console.log('第' + a + '个矿机,地址是:' + e + '金额:' + b);
                let ac
                if(this.istitle == 0){
                    //云矿机
                    ac = {id: a, addr: e, jin: b, who: 'yun'}
                }else {
                    ac = {id: a, addr: e, jin: b, who: 'tuo'}
                }

                this.$router.push({name: 'tij', params: {ti: ac}})
            },
            qu() {
                let that = this
                that.ss3 = false
                that.kj = 0
                that.kaddr = ''
                that.jine = 0
                that.shou = ''
                that.anmi = ''
            },
            //  复制
            fuzhi() {
                let clipboard = new Clipboard('.d1')
                clipboard.on('success', e => {
                    console.log('复制成功')
                    this.ss1 = true
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
            //  返回
            fanhui1() {
                this.$router.push('/wallet')
            }
        }
    }
</script>

<style scoped>
  .z6 {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 80px;
    height: 22px;
    background: #9a55ff;
    color: white;
    text-align: center;
    font-size: 12px;
    font-weight: 400;;
    line-height: 22px;
    border-radius: 4px;
  }
  .main-content{
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .z7 {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 80px;
    height: 22px;
    background: #5E66F2;
    color: white;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    border-radius: 4px;
    line-height: 22px;
  }

  .shua2 {
    margin-top: 30px;
    width: 25px;
  }

  .shua1 {
    margin-top: 30px;
    width: 25px;
    transition: all 3s;
    transform: rotate(1440deg);
  }

  .li1 {
    margin-top: 10px;
    font-size: 16px;
    color: #666;
  }

  .li2 {
    color: #c23631;
    font-size: 20px;
  }

  .q1 {
    color: #c23631;
    font-weight: 550;
  }

  .q2 {
    color: #ffc107;
    font-weight: 550;
  }

  .q3 {
    color: #583b84;
    font-weight: 550;
  }

  .q4 {
    color: #93c54b;
    font-weight: 550;
  }

  .zhu {
    background: #eee;
  }

  .shuju {
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .z1 {
    font-size: 12px;
    line-height: 23px;
    color: #707070;
  }

  .kj {
    background: #fff;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 12px;
    position: relative;
  }

  .zi {
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    float: left;
    line-height: 2;
  }

  .zi2 {
    width: 15%;
    float: left;
  }

  .title{
    width: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    padding-bottom: 4px;
    border-bottom: 1px solid #eee;
    transition: all 0.1s;
    color: #888;
  }
  .titleactive{
    border-bottom: 1px solid #9a55ff;
    color: #9a55ff;
  }
</style>


