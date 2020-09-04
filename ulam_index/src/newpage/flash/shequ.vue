<template>
  <div>


    <enlargeImage v-if="iscomprehensive" :imagesList="iscomprehen" :nums='enlargeImageindex' :heights="enlargeheight"  @guanbirotateImage="guanbirotateImage"></enlargeImage>


    <div style="background-color: #3e3e3e; width: 100%; z-index: 0; position: fixed; top: 0px;">
    </div>
    <!--测试下拉刷新-->

    <div  class="weui" ref="scrollBox" :style="style" @touchstart="touchStart"
          @touchmove="touchMove" @touchend="touchEnd">

      <div  style="position: relative">
        <div v-if="moveState < 2" style="text-align:center;position: absolute;width: 100%;" :style="{top:moveState < 2?'-80px':'40px'}">
          <!--                  {{ moveState === 0 ? '下拉即可刷新...' : '释放即可刷新...' }}-->
        </div>
        <div v-else style="text-align:center;">

          <p style="font-size: 14px">刷新中
            <inline-loading></inline-loading>
          </p>
        </div>
      </div>
      <!--下拉结束-->
    </div>



      <div id="scrollbox">

        <!--<div style="height:10px;"></div>-->
        <!--获取图片可用的宽度-->
        <!--          <flexbox :gutter="0" style="height: 22px">-->
        <!--            <flexbox-item :span="1.7">-->
        <!--              <div></div>-->
        <!--            </flexbox-item>-->
        <!--            <flexbox-item :span="10">-->
        <div ref="pictu">

        </div>
        <!--            </flexbox-item>-->
        <!--          </flexbox>-->

        <div v-if="reminds.remindCount >0">
          <div class="remind" v-on:click="newre">
            <p>
              <img :src="reminds.headerImg?surl+'/img/header/'+ reminds.headerImg:'./static/tx.png'" alt=""
                   style="width:28px;border-radius:4px;float:left;">
              {{reminds.remindCount}}条新消息
            </p>
          </div>
        </div>
        <!--循环流-->

        <div v-for="(todo,index1) in shuju" v-bind:key="todo.id" style="width: 100%;">
          <div style="height:35px;"></div>
          <!--头像-->
          <div style="font-size:15px;width: 100%">
            <!--名称和内存-->
            <div style="display: flex;align-items: center;padding: 0 20px">
              <div style="text-align:center;">
                <img :src="todo.url.length>2 ?surl+ todo.url:'./static/tx.png'" alt=""
                     style="width:33px;border-radius:50%;height: auto;display: block"
                     v-on:click="swho(todo)">
              </div>
              <p style="width: 10px;"></p>
              <div style="color: rgb(68,68,70);font-size: 14px;font-weight: 400;" v-on:click="swho(todo)">
                {{todo.name_nick}}
              </div>
            </div>


            <!--       发表内容      -->
            <div style="font-size: 14px;padding: 10px 20px 0;color:rgb(68,68,70);line-height: 20px;"
                 v-if="!todo.is_redpacket">
              {{setcont(todo.content)}}
            </div>


            <div v-else style="padding: 0 20px;">
              <p style="line-height: 40px">我发了一个大额糖包，快来领取啊~</p>
              <div style="position:relative;">
                <img :src="lredb" alt="" style="width:100%;height: auto;display: block;margin-top: 10px" v-on:click="lbao(todo)">

                <p style="position:absolute;top:30%;color:#fff;font-weight:700;left:35%;" v-on:click="lbao(todo)">
                  {{todo.content.substr(18)}}</p>

              </div>
            </div>
            <!--图片-->
            <div style="margin-top:15px;padding: 0 20px">
              <div v-show="todo.picList.length > 0">
                <img class="previewer-demo-img" v-for="(item, index) in  todo.picList" :key="index"
                     :src="surl+item.msrc" @touchstart="start($event)"
                     @touchend.stop.prevent="addshowcomprehen($event,todo.picList,index)"
                     :style="todo.picList.length ==1 ?ptk(item.h,item.w): pdts() "
                >
              </div>
            </div>
            <div style="margin-top:15px;padding: 0 20px" v-show="todo.video">
              <div style="position:relative;height: 300px;overflow: hidden;z-index: 20000">
                <!--进入全屏-->
                <img src="@/assets/icos/vbo.png" alt="" v-bind:class="[todo.isHorizontal ? 'bof1': 'bof2'] "
                     v-on:click="palyda(index1,surl+todo.video,surl+todo.videoImg)">
                <!--退出全屏-->
                <div style="position: relative;z-index: 50000">
                  <video muted :poster="surl+todo.videoImg" width="100%"

                         ref="video1" controlsList="nodownload">
                    <source :src="surl+todo.video" v-if="ios1"/>
                    用这样的浏览器*手机，有出息嘛！
                  </video>
                </div>
              </div>
            </div>
            <!--时间、点赞和评论数-->

            <div style="padding:0 20px;margin-top:20px;display: flex;justify-content: space-between">
              <!--                      发表时间-->
              <div style="font-size:12px;color:rgb(167,167,167);">
                {{chutime(todo.time)}}
                <span v-if="todo.del" style="font-size:12px;color:rgb(167,167,167)" class="themecolor"
                      v-on:click="delpl(todo.feedId)"> &nbsp;&nbsp;删除</span>
              </div>

              <div style="display: flex">
                <!--评论-->
                <div style="display: flex;align-items: center" @click="showcomment(todo)">
                  <img src="@/assets/wen/xinxi1.png" alt="" style="width:18px;height: auto;display: block">
                  <p style="width: 2px"></p>
                  <span style="font-size:12px;color:rgb(167,167,167);padding-top: -1px">{{todo.commentCount}}</span>
                </div>

                <div style="width: 13px"></div>
                <!--点赞-->
                <div style="cursor:pointer;display: flex;align-items: center" >
                  <img v-if="!todo.like" src="@/assets/wen/zan1.png" alt="" style="width:18px;height: auto;display: block"
                       @touchstart="start($event)" @touchend.stop.prevent="dz(todo)">

                  <img v-else src="@/assets/wen/zan2.png" alt="" style="width:18px;height: auto;display: block"
                       @touchstart="start($event)" @touchend.stop.prevent="dz(todo)">
                  <p style="width: 2px;"></p>
                  <span :style="{color:todo.like>0?'#9a55ff':'rgb(167,167,167)'}" style="font-size:12px;padding-top: -1px">{{todo.thumb}}</span>
                </div>



              </div>
            </div>
            <!--评论-->
            <div v-if="false">
              <div>
                <!--小三角-->
                <div class="jiao"></div>
                <div
                  style="width:94%;background:#f5f5f5;border-radius:4px;padding:5px 10px;box-sizing:border-box;font-size:13px;line-height: 20px">
                  <div v-for="(to,index) in todo.commentChild" v-bind:key="to.id" v-show="index < pnum">
                    <p>
                      <span class="themecolor">{{to.name_nick}}：</span>
                      <span v-on:click="phf1(to,index,todo.feedId,index1)">{{to.content}}</span>
                    </p>
                    <!--二次循环-->
                    <div>
                      <div v-if="to.commentChild.length >0" v-for="(to1,index3) in to.commentChild" v-bind:key="to1.id"
                           v-show="index3 < hnum">
                        <p>
                          &nbsp;&nbsp;
                          <span class="themecolor">{{to1.name_nick}}</span> 回复
                          <span class="themecolor">{{to1.reply_user_nick}}：</span>
                          <span v-on:click="phf1(to1,index,todo.feedId,index1,index3)">{{to1.content}}</span>
                        </p>
                      </div>
                      <div v-if="to.commentChild.length >5" style="font-size:10px;color:#7d83ed;text-align:right;">
                        <p v-on:click="dianshou1(index1,to.commentChild.length)">
                          {{hhazi}}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div v-if="todo.commentChild.length >7" style="font-size:10px;color:#7d83ed;text-align:right;">
                    <p v-on:click="dianshou(index1,todo.commentChild.length)" style="color: #ccc">
                      {{phazi}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<flexbox-item ><div class="flex-demo"></div></flexbox-item>-->
          <div style="height:20px;"></div>
          <div style="height:1px;width:100%;background:#f5f5f5;"></div>
        </div>


        <div v-if="dijia" style="text-align:center;font-size:14px;color:#999;">
          <div style="height:20px;"></div>
          <p>加载中
            <inline-loading></inline-loading>
          </p>
        </div>
        <div style="padding:30px 25px;">
          <divider v-if="wuxian"> 已无更多</divider>
        </div>

      </div>





    <backColor v-if="show1">
      <div v-show="show1"
           style="position: fixed;top: 20vh;width: 82%;left: 9%;background: #fff;padding: 10px;border-radius: 6px;">
        <div style="height: 30px"></div>
        <h5 style="text-align: center">提示</h5>
        <div style="height: 30px"></div>
        <p style="text-align:center;">确定删除吗?</p>
        <div style="height: 30px"></div>
        <div style="display: flex;justify-content: space-between">
          <span class="btoms" style="background: #f5f5f5;color:rgb(167, 167, 167)" @click="bcan">取消</span>
          <span class="btoms" @click="qdel">确定</span>
        </div>
      </div>
    </backColor>

    <x-dialog v-model="seetx" class="dialog-demo">
      <div style="padding:15px;box-sizing: border-box;" v-if="swt1">
        <p>{{swt1.name_nick}}</p>
        <div style="height:10px;"></div>
        <img :src="surl+ swt1.url" alt="用户暂未上传" style="width:90%;">
      </div>
      <div @click="clertx">
        <span class="vux-close">
          <x-icon type="ios-close-empty" size="40"></x-icon>
        </span>
      </div>
    </x-dialog>


    <div style="display: none">
      <actionsheet v-model="she2" :menus="menus2" @on-click-menu="medi" show-cancel></actionsheet>
      <actionsheet v-model="she3" :menus="{tx:'他的头像',who:swt}" @on-click-menu="medi1" show-cancel></actionsheet>
      <actionsheet v-model="she4" :menus="{del:'删除评论'}" @on-click-menu="medi2" show-cancel></actionsheet>
      <actionsheet v-model="she5" :menus="{del:'删除回复'}" @on-click-menu="medi3" show-cancel></actionsheet>
    </div>


    <!--    <confirm v-model="show11"-->
    <!--             title="提示"-->
    <!--             @on-cancel="bcan"-->
    <!--             @on-confirm="qdel">-->
    <!--      <p style="text-align:center;">确定删除吗?</p>-->
    <!--    </confirm>-->


    <div>
      <!-- 领取红包的全屏弹窗 -->
      <div v-if="rbxian ==2" class="bao3" @touchmove.prevent>
        <div class="lbao1">
          <p style="text-align:center;color:#fff;text-shadow:0px 3px 0px #3741a4;font-size:22px;">{{beizhu}}</p>
        </div>
        <img :src="baox" alt="" class="bfx" v-on:click="kai">
        <!--&lt;!&ndash; 领红包背景图&ndash;&gt;-->
        <img src="@/assets/redb8.png" alt="" class="tutu1">
        <img src="@/assets/redb2.png" alt="" style="position:absolute;top:75%;right:45%;width:36px;z-index: 500"
             v-on:click="qubao2">
      </div>
      <div v-if="rbxian ==3" class="bao3" @touchmove.prevent>
        <img src="@/assets/red31.png" alt="" class="tutu1">
        <div style="position:absolute;top:25%;color:#fff;width:100%;text-align:center;font-size:20px;font-weight:700;">
          <p v-on:click="qing1" style="margin-left:2%;">- 领取详情 -</p>
        </div>
        <img src="@/assets/redb2.png" alt="" style="position:absolute;top:75%;right:45%;width:36px;"
             v-on:click="qubao2">
      </div>
      <!--点击播放视频-->
      <div v-if="dvd" class="bao4" @touchmove.prevent v-on:click="dvds">
        <video width="100%" autoplay loop height="100%" :poster="dvdtu"
               ref="video6" controlsList="nodownload">
          <source :src="dvdsrc"/>
        </video>
      </div>
    </div>


    <!--固定底部 输入框，牛逼   v-show="srk1"   -->
    <div class="srk" v-show="srk1" style="bottom:40vh">
      <flexbox :gutter="0" align="flex-end">
        <flexbox-item :span="10">
          <div style="">
            <div style="font-size:10px;color:#666;height:20px;line-height:10px;" v-if="iflun">
              回复{{huiname}}：
            </div>
            <div contenteditable class="text needsclick"
                 ref="inputs" id="content" @focus="getFocus" @blur="getBlur" style="-webkit-user-select:text"
                 @input="changeVal"
                 v-model="huifu">评论
            </div>
          </div>
        </flexbox-item>
        <flexbox-item :span="2">
          <div style="width:80%;margin-left:20%;">
            <div v-bind:class="[niul ? 'niu2': 'niu1'] " v-on:click="setinfo">
              {{ niul ? '发送':'取消'}}
            </div>
            <div style="height:3px;"></div>
          </div>
        </flexbox-item>
      </flexbox>


    </div>
    <!--查看头像弹窗-->


    <loading :show="ss1" text="加载中.."></loading>
    <loading :show="ss4" text="删除中.."></loading>
    <toast v-model="ss2" type="cancel" :time="1500" is-show-mask width="18em">删除失败！</toast>
    <toast v-model="ss3" :time="1500" is-show-mask width="18em">删除成功！</toast>
    <toast v-model="she1" :time="1500" is-show-mask width="18em">{{huifutext}}</toast>
    <toast v-model="red1" type="cancel" :time="1800" is-show-mask width="18em">糖包已过期！</toast>
    <toast v-model="red2" type="cancel" :time="1800" is-show-mask width="18em">糖包不存在，可能已被撤回！</toast>
  </div>
</template>
<script>

    import scroll from "../../base/scroll/scroll";
    import {lyricminshow,} from '@/common/js/mixin.js';
    import {
        Group,
        Cell,
        XHeader,
        XInput,
        XButton,
        Toast,
        Confirm,
        Actionsheet,
        Loading,
        Flexbox,
        FlexboxItem,
        Divider,
        Previewer,
        TransferDom,
        InlineLoading,
        XDialog
    } from 'vux'
    import backColor from "../../base/backColor/backColor";


    import enlargeImage from '@/base/enlargeImage/enlargeImage'

    export default {
        mixins:[lyricminshow],
        name: "shequ1",
        directives: {TransferDom},
        components: {
            enlargeImage,
            scroll,
            backColor,
            Cell,
            Group,
            XHeader,
            XInput,
            XButton,
            Toast,
            Confirm,
            Actionsheet,
            Loading,
            Flexbox,
            FlexboxItem,
            Divider,
            Previewer,
            InlineLoading,
            XDialog
        },
        data() {
            return {
                iscomprehen: '',
                enlargeImageindex:0,
                enlargeheight:0,
                iscomprehensive: false,
                //领取红包的参数
                height: 0,
                isflages: false,
                intervalId: 0,
                beizhu: '',
                rbxian: 1,
                redma: '',
                exnum: '',
                red1: false,
                red2: false,
                gding: null,
                ios1: false,
                seetx: false,
                baox: './static/1.png',
                lredb: './static/ltb.png',
                list: [{
                    msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
                    src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
                    w: 800,
                    h: 400
                }],
                ppd: [],
                wgaos: 0,
                wgaos1: 0,
                options: {
                    getThumbBoundsFn(index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                },
                dijia: false,
                muxian: false,
                muurl: '',
                tops: 0,
                bigtuH: 0,
                pgao: 0,
                qing: false,
                ppge: 2,
                wuxian: false,
                show1: false,
                delid: '',
                users: "",
                didi: '',
                tutu: './static/tx.png',
                surl: this.apiurlCommunity,
                token: "",
                ltt: "./static/lt.png",
                tuk: 280,
                bodyHeight: '',
                //社区提示信息
                shuju: '',
                title: 'ULAM社区',
                huifu: '',
                ss4: false,
                // reminds:'',
                //完整的数据
                shujus: '',
                ss1: false,
                ss2: false,
                ss3: false,
                plx: false,
                niul: false,
                srk1: false,
                she1: false,
                plinfo: '',
                pliid: 0,
                she2: false,
                she3: false,
                she4: false,
                she5: false,
                she6: false,
                menus2: {menu1: '发帖', menu2: '我的帖子'},
                //回复评论的接口返回文字
                huifutext: '',
                phfinfo: '',
                phfid: 0,
                phftext: '',
                acid: 0,
                acidd: 0,
                ziids: 0,
                //判断是否是评论 还是回复
                iflun: false,
                huiname: '',
                iflun1: false,
                //   查看某人的社区帖子
                swt: '',
                swt1: '',
                swtxian: false,
                startY: '',    //保存touch时的Y坐标
                moveDistance: 0,    //保存向下滑动的距离
                moveState: 0,        //开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中
                duration: 0,        //动画持续时间，0就是没有动画
                //评论和回复超出显示控制。
                pnum: 7,
                hnum: 5,
                pshow: true,
                hshow: true,
                phazi: '-显示更多评论',
                hhazi: '-显示更多回复',
                baoinfo: '',
                luns: [],
                lunss: 30,
                allp: false,
                //视频窗  视频路劲
                dvd: false,
                dvdsrc: '',
                dvdtu: '',
                //评论详情
                issqcomment: false,
                sqcomment: {},
            }
        },
        computed: {
            style() {
                return {
                    transition: `${this.duration}ms`,
                    transform: `translate3d(0,${this.moveDistance}px, 0)`
                }
            },
            reminds() {
                return this.$store.state.shequinfo;
            }
        },
        mounted(){



            //
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            document.querySelector('body').setAttribute('style', 'background-color:#fff;');
            this.height = document.documentElement.clientHeight;

            console.log(this.height,'height@@@@@@@@@@@')
            let that = this
            let message = localStorage.getItem('user');
            message = JSON.parse(message)
            if (!message) {
                that.$router.push('/zhu')
                return
            }else{


                that.shuju = JSON.parse(localStorage.getItem('community'));
                that.shujus = JSON.parse(localStorage.getItem('community'));

            } // 获取token
            // that.natoken()
            console.log(that.reminds)
            that.users = message
            //拿取路由值
            that.didi = this.$route.params.id

            //  拿取高度
            that.bodyHeight = document.documentElement.clientHeight;
            // console.log('当前屏幕宽'+kk)
            that.pkk();
            //监听滑动距离加载新数据
            window.addEventListener("scroll", that.showIcon, false);
            //  检测安卓或者ios
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isiOS) {
                that.ios1 = true
            } else {
                that.ios1 = false
            }
            //拿取赞美词
            that.zanmei()
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        watch: {
            bigtuH(newb, oldb) {
                let that = this
                if (newb) {
                    if (that.bodyHeight <= newb) {

                    } else {
                        that.tops = (that.bodyHeight - newb) / 2
                    }
                    // console.log('距顶部距离：'+that.tops)
                }
            },
            qing(newb, oldb) {
                console.log(newb,'已经滚动到底部！')
                if (newb) {
                    console.log('已经滚动到底部！')
                    let that = this;
                    that.ppge++;
                    if (that.ppge > that.shujus.totalPage) {
                        that.wuxian = true
                        return
                    }
                    that.dijia = true;
                    that.axios.get(that.surl + '/article?user=' + that.users.hu + '&token=' + that.token + '&page=' + that.ppge).then(response => {
                        console.log('第' + that.ppge + '页')
                        console.log(response.data)
                        that.dijia = false
                        if (response.data.status == "refresh") {
                            that.token = response.data.code
                            setTimeout(() => {
                                that.nashuju()
                            }, 50)
                            return
                        }
                        if (response.data.status == 'success') {
                            that.shuju = that.shuju.concat(response.data.data)
                            that.chutu(response.data.data)

                            console.log(that.shuju)
                            that.shujus = response.data;

                            this.$nextTick(()=>{
                                that.$refs.scroll.refresh()
                            })

                        }
                        setTimeout(() => {
                            that.qing = false
                        }, 30)
                    }).catch(function (error) {
                        that.dijia = false
                        setTimeout(() => {
                            that.qing = false
                        }, 30)
                        console.log(error);
                    })
                }
            },
            huifu(newb, oldb) {
                if (newb.length > 0) {
                    this.niul = true
                } else {
                    this.niul = false
                }
            },
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
            goBack(){
                if(this.issqcomment == false){
                    this.$emit('tagglefid')
                }
            },
            taggleissqcomment(){
                this.issqcomment = false
            },

            guanbirotateImage() {
                this.iscomprehensive = false;
                this.iscomprehen = ''
            },
            addshowcomprehen($event, item ,num) {
                this.enlargeheight = this.height;
                console.log(item, '@@@@@@@@@@@@@@@@@@@@@@');
                const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
                if (moving > 20) return
                this.startY = 0
                this.iscomprehensive = true;
                this.enlargeImageindex = num;
                let arr = []
                item.map(todo=>{
                    arr.push(this.surl+todo.msrc)
                })
                this.iscomprehen = arr
            },

            // //关闭
            // heidsqcomment(){
            //     this.sqcomment = {};
            //     this.issqcomment = false;
            // },

            //打开正文
            showcomment(item) {
                this.issqcomment = true;
                this.$emit('showcomments', item)

            },


            //检查有没有空格
            setcont(a) {
                let b = a.replace(/\\u000A/g, "\n");
                let c = b.replace(/\\/g, "");
                // console.log(a)
                // console.log(c)
                // a.replace("\\\u003c","<");
                // a.replace("\\\u003e",">");
                // a.replace("\\\u0026","&");
                return c;
            },

            zanmei() {
                let that = this;
                that.axios.get('http://ulamchain.io/ganxie.php').then(response => {
                    console.log(response.data)
                    that.luns = response.data.data
                    that.lunss = response.data.num
                }).catch(function (error) {
                    console.log('请求错误');
                })
            },
            //点击隐藏显示评论
            dianshou(a, b) {
                this.pshow = !this.pshow;
                this.pnum = this.pshow ? 7 : b;
                this.phazi = this.pshow ? '-显示更多评论' : '-收起'
            },
            //点击隐藏显示回复
            dianshou1(a, b) {
                this.hshow = !this.hshow
                this.hnum = this.hshow ? 5 : b
                this.hhazi = this.hshow ? '-显示更多回复' : '-收起'
            },
            qubao2() {
                this.rbxian = 1
                this.beizhu = ''
                this.redma = ''
                this.exnum = ''
            },
            //  查看红包领取详情
            qing1() {
                console.log('查看红包领取详情页面')
                this.$router.push({name: 'mebaoinfo', params: {bao: this.redma, ren: this.exnum}})
            },
            //  领红包
            kai() {
                let that = this
                let a = 1
                if (that.intervalId == 0) {
                    that.intervalId = setInterval(() => {
                        if (a > 5) {
                            a = 1;
                        }
                        a = a + 1
                        that.baox = './static/' + a + '.png'
                    }, 160)
                }
                //点击红包的同时进行点赞
                if (!that.baoinfo.like) {
                    that.dz(that.baoinfo)
                }


                that.suijip()
                setTimeout(() => {
                    that.lulam()
                }, 1800)
            },
            //点红包的时候 随机评论
            suijip() {
                let that = this
                //开始随机评论
                let ns = Math.ceil(Math.random() * (6 - 1 + 1)) + (1 - 1)
                let ps = Math.ceil(Math.random() * (that.lunss - 1 + 1)) + (1 - 1)
                console.log('第' + ps + '个赞美词！')
                if (ns != 5) {
                    return
                }
                console.log('抽中评论')
                that.axios.post(that.surl + '/comment?token=' + that.token,
                    {
                        "article_id": that.baoinfo.feedId,
                        "user": that.users.hu,
                        "comment": that.luns[ps]
                    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                    console.log(response.data)
                }).catch(function (error) {
                    console.log(error);
                })
            },
            //真正执行领红包
            lulam() {
                let that = this
                that.axios.post(this.apiurl+'/ulam_red_packet_get',
                    {
                        "mobile": parseInt(that.users.hu),
                        "num": that.redma
                    }).then(response => {
                    // 1S 以后关闭特效 处理结果
                    that.guan()
                    console.log(response.data)
                    if (response.data == 'timeout') {
                        that.red1 = true
                        setTimeout(() => {
                            that.rbxian = 1
                        }, 1700)
                        return
                    }
                    if (response.data == 'error') {
                        that.red2 = true
                        setTimeout(() => {
                            that.rbxian = 1
                        }, 1700)
                        return
                    }
                    // 已经领取完毕 17768200706
                    if (response.data == 'null_pack') {
                        //显示红包已经被领完的页面
                        that.rbxian = 3
                        return
                    }
                    //已经领取过了
                    if (response.data == 'finish_get') {
                        that.qing1()
                        return
                    }
                    //   这里是真正拿到了红包的数据 监测是否为number类型
                    if (typeof response.data == 'number') {
                        console.log('领取成功')
                        that.$router.push({
                            name: 'mebaoinfo',
                            params: {bao: that.redma, jine: response.data, ren: that.exnum}
                        })
                    }
                }).catch(function (error) {
                    that.guan()
                    that.red2 = true
                    that.rbxian = 1
                    console.log(error);
                })
            },
            //  关特效
            guan() {
                clearInterval(this.intervalId)
                this.baox = './static/1.png'
                this.intervalId = 0
            },
            //点击红包
            lbao(a) {
                let that = this
                that.baoinfo = a
                that.beizhu = a.content.substr(18)
                that.redma = a.content.substr(0, 10)
                that.exnum = a.content.substr(10, 8)
                console.log('红包码：' + that.redma)
                console.log('备注：' + that.beizhu)
                console.log('推广码：' + that.exnum)
                that.rbxian = 2
            },
            // 处理时间
            chutime(a) {
                let mistiming = Math.round((Date.now() - a * 1000) / 1000);
                let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
                let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
                for (let i = 0; i < arrn.length; i++) {
                    let inm = Math.floor(mistiming / arrn[i]);
                    if (inm != 0) {
                        return inm + arrr[i] + '前';
                    }
                }
            },
            //去看新消息
            newre() {
                this.$router.push('/reminds')
            },
            //测试下拉
            touchStart(e) {
                this.duration = 0 // 关闭动画
                this.moveDistance = 0 // 滑动距离归0
                this.startY = e.targetTouches[0].clientY  // 获得开始Y坐标
            },
            touchMove(e) {    //这里是整个下拉刷新的核心
                console.log(this.scrollY,'@@@@@@@@@@@');
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //首先判断我们有没有滚动条，如果有，我们下拉刷新就不能启用。
                if (scrollTop > 0) return;
                let move = e.targetTouches[0].clientY - this.startY;
                //判断手指滑动的距离，只有为正数才代表用户下拉了。
                if (move > 0 && this.scrollY > 60) {
                    //阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
                    e.preventDefault();
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
                this.duration = 300;
                if (this.moveDistance > 60) {
                    //这里逻辑跟touchMove一样，但是需要真的加载数据了，那moveState变为2 所以加载动画在这出现
                    this.moveState = 2;
                    //这里执行
                    this.nashuju();
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
            //点击评论 进行回复
            phf1(a, b, c, d, e) {
                let that = this
                //文章的id 和 回复文章的id 和 下标
                that.acid = c
                that.phfid = b
                that.acidd = d
                that.phfinfo = a
                //首先判断一下是否本人，本人只能删除
                if (a.delComment) {
                    that.srk1 = false
                    if (e != undefined) {
                        //二级回复
                        that.ziids = e
                        console.log('子类下标' + that.ziids)
                        that.she5 = true
                        that.isflages = true;
                    } else {
                        console.log('无')
                        that.she4 = true
                        that.isflages = true
                    }
                } else {
                    that.huiname = a.name_nick
                    that.iflun = true
                    that.srk1 = true
                    that.$nextTick((x) => {   //正确写法
                        that.$refs.inputs.focus();
                        if (that.ios1) {
                            document.body.scrollTop = document.body.scrollHeight
                        }
                    })
                }
            },
            //查看用户的帖子
            swho(a) {
                let that = this;
                console.log(a);
                that.swt = '查看' + a.name_nick + '的帖子';
                that.swt1 = a;
                that.she3 = true;
                that.isflages = true;

            },
            clertx() {
                console.log('清除')
                this.seetx = false
                this.swt1 = ''
            },
            //查看社区用户帖子
            medi1(b) {
                if (b == 'who') {
                    this.$router.push({
                        name: 'shequuser',
                        params: {
                            token: this.token,
                            name: this.swt1.name,
                            name1: this.swt1.name_nick
                        }
                    })
                }
                if (b == 'tx') {
                    console.log('看头像')
                    this.seetx = true
                } else {
                    console.log('清除')
                    this.swt1 = ''
                }
            },
            //我的操作
            medi(b) {
                if (b == 'menu1') {
                    this.$router.push('/shequadd')
                } else if (b == 'menu2') {
                    console.log('查看我的帖子')
                    this.$router.push({
                        name: 'shequuser', params: {
                            token: this.token,
                            name: this.users.hu,
                            name1: '我'
                        }
                    })
                }
            },
            //删除自己的评论
            medi2(a) {
                let that = this
                if (a == 'del') {
                    that.ss4 = true
                    // that.axios.post('/shequ/delComment?token='+that.token,
                    that.axios.post(that.surl + '/delComment?token=' + that.token,
                        {
                            "comment_id": that.phfinfo.id
                        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                        console.log(response.data)
                        that.ss4 = false
                        that.huifutext = response.data.msg
                        if (response.data.status == 'del_success') {
                            //  同时要加dom元素进入，不需刷新显示数据
                            that.shuju[that.acidd].commentChild = that.shuju[that.acidd].commentChild.filter(
                                function (a) {
                                    return a.id != that.phfinfo.id
                                }
                            )
                            that.shuju[that.acidd].commentCount--;
                            //成功后将回复字清空
                            that.$nextTick((x) => {  //正确写法
                                that.$refs.inputs.innerText = '';
                            })
                            that.huifu = ''
                            that.phfinfo = ''
                            that.phfid = 0
                            that.acidd = 0
                            that.acid = 0
                            that.srk1 = false
                        }
                        that.she1 = true
                    }).catch(function (error) {
                        that.ss4 = false
                        console.log(error);
                    })
                }
            },
            //删除自己二级的评论
            medi3(a) {
                let that = this
                if (a == 'del') {
                    that.ss4 = true
                    // that.axios.post('/shequ/delComment?token='+that.token,
                    that.axios.post(that.surl + '/delComment?token=' + that.token,
                        {
                            "comment_id": that.phfinfo.id
                        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                        console.log(response.data)
                        that.ss4 = false
                        that.huifutext = response.data.msg
                        if (response.data.status == 'del_success') {
                            //  同时要加dom元素进入，不需刷新显示数据
                            that.shuju[that.acidd].commentChild[that.phfid].commentChild = that.shuju[that.acidd].commentChild[that.phfid].commentChild.filter(
                                function (a) {
                                    return a.id != that.phfinfo.id
                                }
                            )
                            that.shuju[that.acidd].commentCount--;
                            //成功后将回复字清空
                            that.$nextTick((x) => {  //正确写法
                                that.$refs.inputs.innerText = '';
                            })
                            that.huifu = ''
                            that.phfinfo = ''
                            that.phfid = 0
                            that.acidd = 0
                            that.acid = 0
                            that.ziids = 0
                            that.srk1 = false
                        }
                        that.she1 = true
                    }).catch(function (error) {
                        that.ss4 = false
                        console.log(error);
                    })
                }
            },
            // 点击帖子 进行评论
            plun(a, b) {
                console.log(a)
                console.log('数据的下标:' + b)
                let that = this
                that.plinfo = a
                that.pliid = b
                that.srk1 = true
                that.iflun = false
                that.$nextTick((x) => {   //正确写法
                    that.$refs.inputs.focus();
                    if (that.ios1) {
                        document.body.scrollTop = document.body.scrollHeight
                    }
                })
            },
            // 发送评论-或者回复
            setinfo() {
                let that = this
                if (that.huifu.length == 0) {
                    that.srk1 = false
                    return
                }
                //回复框要显示出来
                that.srk1 = true
                if (that.iflun) {
                    //  这里是回复
                    console.log('回复:' + that.huifu)
                    // that.axios.post('/shequ/comment?token='+that.token,
                    that.axios.post(that.surl + '/comment?token=' + that.token,
                        {
                            "article_id": that.acid,
                            "user": that.users.hu,
                            "comment": that.huifu,
                            "reply_user": that.phfinfo.name,
                            "reply_id": that.phfinfo.id, //回复的哪条评论
                        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                        console.log(response.data)
                        that.huifutext = response.data.msg
                        if (response.data.status == 'comment_success') {
                            //  同时要加dom元素进入，不需刷新显示数据
                            that.shuju[that.acidd].commentChild[that.phfid].commentChild.push(
                                {
                                    content: that.huifu,
                                    name: that.users.hu,
                                    name_nick: that.users.name,
                                    delComment: true,
                                    id: response.data.data.id,
                                    reply_user: that.phfinfo.name,
                                    reply_user_nick: that.phfinfo.name_nick
                                })
                            //成功后将回复字清空
                            that.$nextTick((x) => {  //正确写法
                                that.$refs.inputs.innerText = '';
                            })
                            that.huifu = ''
                            that.phfinfo = ''
                            that.phfid = 0
                            that.acidd = 0
                            that.acid = 0
                            that.srk1 = false
                        }
                        that.she1 = true
                    }).catch(function (error) {
                        console.log(error);
                    })
                } else {
                    //  这里是评论
                    //   that.axios.post('/shequ/comment?token='+that.token,
                    that.axios.post(that.surl + '/comment?token=' + that.token,
                        {
                            "article_id": that.plinfo.feedId,
                            "user": that.users.hu,
                            "comment": that.huifu
                        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                        console.log(response.data)
                        that.huifutext = response.data.msg
                        if (response.data.status == 'comment_success') {
                            //  同时要加dom元素进入，不需刷新显示数据
                            console.log('添加元素')
                            //增加评论数
                            that.shuju[that.pliid].commentCount = that.shuju[that.pliid].commentChild.length + 1
                            that.shuju[that.pliid].commentChild.unshift({
                                commentChild: [],
                                reated: "1573459706",
                                content: that.huifu,
                                name: that.users.hu,
                                name_nick: that.users.name,
                                delComment: true,
                                id: response.data.data.id
                            })
                            console.log(that.shuju[that.pliid])
                            //成功后将回复字清空
                            that.$nextTick((x) => {  //正确写法
                                that.$refs.inputs.innerText = '';
                            })
                            that.huifu = ''
                            that.plinfo = ''
                            that.pliid = 0
                            that.srk1 = false
                        }
                        that.she1 = true
                    }).catch(function (error) {
                        console.log(error);
                    })
                }
            },
            getFocus(val) {
                console.log('获取焦点！');
                if (!this.inputText) {
                    val.target.innerText = '';
                }
            },
            getBlur(val) {
                // console.log('失去焦点!');
                // if(val.target.innerText == ''){
                //   val.target.innerText = '评论';
                //   // this.placeholderText = '请输入文字';
                // }
                setTimeout(() => {
                    this.srk1 = false
                }, 300)
            },
            changeVal(val) {
                this.inputText = val.target.innerText;
                // // console.log('回复：', this.inputText)
                this.huifu = this.inputText
            },
            //处理数据中的图片地址
            chutu(b) {
                let that = this
                // for (let i = 0; i < b.length; i++) {
                //     b[i].picList.map(function (a) {
                //         a.msrc = that.surl + a.msrc
                //         a.src = that.surl + a.src
                //     })
                // }
                that.dijia = false
                // console.log(b)
            },
            logIndexChange(arg) {
                console.log(arg)
            },
            //播放指定视频 变成全屏
            palyda(a, b, c) {
                let that = this;
                if (that.ios1) {
                    let vv = that.$refs.video1[a]
                    //播放
                    vv.play();
                    vv.webkitEnterFullscreen()
                    //静音
                    vv.muted = vv.muted ? false : true;
                } else {
                    console.log('选中的视频' + a + ',路劲:' + b + ',缩略图:' + c)
                    that.dvdtu = c
                    that.dvd = true
                    that.dvdsrc = b
                }
            },
            //关闭视频播放弹窗
            dvds() {
                let that = this
                that.dvd = false
                that.dvdsrc = ''
                that.dvdtu = ''
            },
            show(index, b) {
                // let that = this
                // that.$refs.previewer[b].show(index)
            },
            bcan() {
                this.delid = ''
                this.show1 = false
                this.isflages = false
            },
            //删除动态
            qdel() {
                let that = this;
                // that.axios.post('/shequ/delArticle?token='+that.token,
                that.axios.post(that.surl + '/delArticle?token=' + that.token,
                    {
                        "article_id": that.delid,
                    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                    console.log(response.data)
                    if (response.data.status == "del_success") {
                        that.ss3 = true
                        let as = that.shuju.filter(
                            function (aa) {
                                return aa.feedId != that.delid
                            }
                        )
                        that.shuju = as
                        that.delid = ''
                    } else {
                        that.delid = ''
                        that.ss2 = true
                    }
                    this.show1 = false;
                }).catch(function (error) {
                    that.ss2 = true
                    console.log(error);
                })
            },
            //删除评论
            delpl(a) {
                console.log(a)
                this.delid = a
                this.show1 = true
                this.isflages = true
            },
            //点击头像
            upshe() {
                this.she2 = true;
                this.isflages = true;
            },
            ding() {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                // this.rbxian = false
            },
            //监听滑动距离
            //滚动监听
            scrollss(pos) {
                this.heights = document.getElementById('scrollbox').clientHeight;
                this.scrollheight = document.getElementById('scroll').clientHeight;
                this.scrollY = pos.y;
                if (!this.qing) {
                    console.log('加载。。。。。。。。。。。')
                    if ((pos.y * -1) + 200 >= this.heights - this.scrollheight) {
                        this.qing = true;
                    }
                }

            },
            handleTouchEnd() {
                // this.$refs.scroll.refresh()
            },

            scrollToend() {

            },
            showIcon(e) {
                // console.log(e, '@@@@@@@@@@@@@@@@@@')
                let that = this;
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
                let scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
                //这里的意思就是距离底部40 的时候执行操作

                if (scrollTop + clientHeight + 60 >= scrHeight) {
                }


                //如果超过多少距离显示返回顶部
                // if (scrollTop > 800) {
                //     that.title = '- 返回顶部 -'
                // } else {
                //     that.title = 'ULAM社区'
                // }
            },
            //多图的样式
            pdts() {
                let that = this
                let hh = Math.floor(that.tuk * 0.32)
                // console.log('总'+that.tuk+'多图宽'+hh)
                return {width: '32%', marginRight: '1%', height: hh + 'px'}
            },
            //判断图片时间显示的高宽
            ptk(a, b) {
                let that = this
                //算出缩小后的图宽度，如果宽度还大于现在手机的宽，则设置宽度为100%；
                let c = b * 170 / a
                // console.log(c)
                if (c > that.tuk) {
                    return {width: '93%'}
                } else {
                    return {height: '170px'}
                }
            },
            //拿图可显示的时间宽度
            pkk() {
                let that = this
                let dom = that.$refs.pictu;
                // console.log('图片的可用宽：' + dom.offsetWidth)
                that.tuk = dom.offsetWidth
            },
            start($event) {

                this.startY = $event.touches[0].pageY

            },
            //用户点赞
            dz( a) {


                // const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
                // if (moving > 20) return
                this.startY = 0

                console.log(a, '!!!!!!!!!!!')
                let that = this;
                that.axios.post(that.surl + '/thumb?token=' + that.token,
                    {
                        "article_id": a.feedId,
                        "user": that.users.hu
                    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                    console.log(response.data)
                    if (response.data.status == "thumb_success") {
                        a.like = true
                        a.thumb += 1
                    } else if (response.data.status == "cancel_success") {
                        a.like = false
                        a.thumb -= 1
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            // 用户登录拿取token
            natoken() {
                let that = this
                that.axios.get(that.surl + '/login/' + that.users.hu + '/' + that.users.mima).then(response => {
                    // console.log(response.data)
                    if (response.data.status == "fail") {
                        alert("登录状态失效 请重新登录")
                        return false
                    } else {
                        that.token = response.data.code
                        localStorage.setItem("newtoken", that.token);
                        //拿取社区数据
                        that.nashuju()
                        //  拿取用户社区提醒
                        //   that.remind()
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            //获取数据
            nashuju() {
                let that = this;
                that.ss1 = true;

                that.axios.get(that.surl + '/article?user=' + that.users.hu + '&token=' + that.token).then(response => {
                    that.ss1 = false
                    console.log(response.data)
                    if (response.data.status == "refresh") {
                        that.token = response.data.code
                        setTimeout(() => {
                            that.nashuju()
                        }, 500)
                        return
                    }
                    if (response.data.status == 'success') {
                        that.shuju = response.data.data
                        //给图片加url地址
                        that.chutu(that.shuju);
                        that.shujus = response.data;


                    }
                }).catch(function (error) {
                    that.ss1 = false
                    console.log(error);
                })
            },
            //拿取本地头像
            tx1() {
                let that = this
                let txs = localStorage.getItem('tellertx');
                if (txs) {
                    that.tutu = txs
                }
            },
            fanhui1() {
                if (this.didi) {
                    this.$router.push('/user')
                } else {
                    this.$router.push('/index')
                }
            },
        }
    }
</script>
<style scoped lazy="less">
  .dialog-demo {

    overflow: hidden;
  }

  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;

  }

  .dialog-title {
    line-height: 30px;
    color: #666;
  }

  .img-box {
    padding: 20px;
    box-sizing: border-box;
    height: 300px;
    text-align: center;
  }

  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .bof1 {
    width: 60px;
    height: auto;
    position: absolute;
    bottom: 40%;
    left: 40%;
    z-index: 3000010;
  }

  .bof2 {
    width: 60px;
    height: auto;
    position: absolute;
    bottom: 40%;
    left: 40%;
    z-index: 3000010;
  }

  /*是否显示video全屏控件 */
  /*video::-webkit-media-controls-fullscreen-button {*/
  /*display: none;*/
  /*}*/
  video::-webkit-media-controls-play-button {
  }

  video::-webkit-media-controls-timeline {
  }

  video::-webkit-media-controls-current-time-display {
  }

  video::-webkit-media-controls-time-remaining-display {
  }

  video::-webkit-media-controls-mute-button {
  }

  video::-webkit-media-controls-toggle-closed-captions-button {
  }

  video::-webkit-media-controls-volume-slider {
  }

  .srk {
    width: 100%;
    background: #eee;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 8px 10px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
  }

  .content {
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
    /*position:fixed;top: 0;left: 0;*/
    /*bottom:60px; !*距离底部的距离为底部盒子的高度，自己也可以设置*!*/
    /*overflow-y: scroll;width: 100%;height: auto;*/
    /*-webkit-overflow-scrolling: touch;   !*这句是为了滑动更顺畅*!*/
  }

  .content1 {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0px; /*距离底部的距离为底部盒子的高度，自己也可以设置*/
    overflow-y: scroll;
    width: 100%;
    height: auto;
    -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  }

  .vux-x-icon {
    fill: #7d83ed;
  }

  /*分享的字*/
  .lbao1 {
    position: absolute;
    top: 50%;
    font-weight: 700;
    font-size: 20px;
    width: 100%;
    z-index: 999;
  }

  .bfx {
    position: absolute;
    top: 27%;
    right: 36%;
    width: 26%;
    z-index: 999;
  }

  .tutu1 {
    width: 100%;
    position: absolute;
    top: 30px;

  }

  .bao3 {
    position: fixed;
    width: 100%;
    top: 0px;
    height: 100%;
    z-index: 5000;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .bao4 {
    position: fixed;
    width: 100%;
    top: 0px;
    height: 100%;
    background-color: #000000;
    z-index: 50000;
  }

  .remind {
    height: 38px;
    width: 40%;
    margin-left: 30%;
    background: #3e3e3e;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    line-height: 28px;
    font-size: 14px;
    border-radius: 4px;
  }

  .rapbox {
    overflow-y: scroll;
  }

  .weui {
    min-height: 100vh;
    position: absolute;
    z-index: 100;
  }

  .box {
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    color: #999999;
  }


  .weui-actionsheet {
    bottom: -0vh;
  }

  .niu1 {
    cursor: pointer;
    z-index: 999;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #999;
    text-align: center;
    border-radius: 4px;
    height: 28px;
    line-height: 28px;
    width: 100%;
  }

  .niu2 {
    cursor: pointer;
    z-index: 999;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    background: #1aad19;
    height: 28px;
    line-height: 28px;
    width: 100%;
  }

  .text {
    width: r(670);
    height: auto;
    min-height: r(160);
    max-height: r(200);
    /*border: r(1) solid #cecece;*/
    font-size: r(24);
    text-align: justify;
    overflow-y: auto;
    outline: none;
    margin: 0 auto;
    margin-top: r(100);
    background: #fff;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    word-break: break-all;
  }

  .input-test::-webkit-input-placeholder {
    color: #8C8B8B;
  }

  .input-text::-moz-placeholder {
    color: #8C8B8B;
  }

  .input-text:-ms-input-placeholder {
    color: #8C8B8B;
  }

  .in2 {
    border: none;
    outline: none;
    color: #999;
    width: 100%;
    height: 34px;
    border-radius: 4px;
  }

  .jiao {
    width: 0;
    height: 0;
    overflow: hidden;
    margin-left: 10px;
    line-height: 0;
    border-width: 7px;
    border-style: solid dashed dashed dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
    border-color: transparent transparent #f5f5f5 transparent;
  }

  .pcc {
    background: black;
  }

  .btoms {
    background: #9a55ff;
    color: #fff;
    display: block;
    line-height: 30px;
    padding: 2px 0;
    width: 48%;
    text-align: center;
    border-radius: 6px;
  }

  .main-content {
    overflow: hidden;
    position: relative;
    z-index: 300;
  }

</style>
