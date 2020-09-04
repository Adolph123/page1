<template>
  <div style="position: fixed;top: 0;left: 0;background: #fff;z-index: 100000000;width: 100%;height: 100vh;">
    <enlargeImage v-if="iscomprehensive" :imagesList="iscomprehen" :nums = 'enlargeImageindex' :heights="enlargeheight"  @guanbirotateImage="guanbirotateImage"></enlargeImage>
    <!--    顶部返回-->
    <div class="backcolors" >
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="toSetup">
          <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff"> </span>
          </div>
        </div>

      </div>
    </div>
    <!--    -->
    <scroll class="main-content" v-if="">
      <div style="min-height: 100vh;">
        <div>
          <!--头像-->
          <div style="font-size:15px;padding: 0 20px">
            <div style="height: 20px;"></div>
            <!--名称和内存-->
            <div style="display: flex;align-items: center">
              <div style="text-align:center;">
                <img :src=" sqcomment.url.length>2 ?surl+  sqcomment.url:'./static/tx.png'" alt=""
                     style="width:35px;border-radius:50%;margin-top:5px;height: auto">
              </div>
                <p style="width: 10px;"></p>
              <span class="themecolor"
                    style="font-weight: 400; font-size: 14px;color: rgb(68, 68, 70)">{{ sqcomment.name_nick}}</span>
            </div>


            <div style="width:95%;line-height: 20px;color: rgb(68,68,70);margin: 15px 0 10px" v-if="! sqcomment.is_redpacket">
              {{setcont(sqcomment.content)}}
            </div>


            <div v-else style="width:100%;position:relative;">
              <p style="">我发了一个大额糖包，快来领取啊~</p>
              <p style="position:absolute;top:40%;color:#fff;font-weight:700;left:35%;">
                <!--                  v-on:click="lbao( sqcomment)"         -->
                {{ sqcomment.content.substr(18)}}</p>
              <img :src="lredb" alt="" style="width:100%;">

              <!--                v-on:click="lbao( sqcomment)"           -->
            </div>
            <!--图片-->
            <div style="margin-top:15px;">
              <div v-show=" sqcomment.picList.length >= 1">
                <img class="previewer-demo-img" v-for="(item, index) in   sqcomment.picList" :src="surl+item.msrc"
                     :style=" sqcomment.picList.length ==1 ?ptk(item.h,item.w): pdts() "
                     v-on:click="addshowcomprehen(sqcomment.picList,index)">
              </div>
            </div>

            <div style="margin-top:15px;" v-show=" sqcomment.video">
              <div style="position:relative;height: 300px;overflow: hidden">
                <!--进入全屏-->
                <img src="@/assets/icos/vbo.png" alt="" v-bind:class="[ sqcomment.isHorizontal ? 'bof1': 'bof2'] "
                     v-on:click="palyda(surl+ sqcomment.video,surl+ sqcomment.videoImg)">
                <!--退出全屏-->
                <div>
                  <video muted :poster="surl+ sqcomment.videoImg" width="100%"
                         ref="video1" controlsList="nodownload">
                    <source :src="surl+ sqcomment.video" v-if="ios1"/>
                    用这样的浏览器*手机，有出息嘛！
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div style="height: 30px"></div>
          <div style="height: 1px;background: #f5f5f5"></div>

          <div style="padding: 0 20px">
            <div style="margin: 10px 0 15px;font-size: 14px;color: rgb(136, 136, 136);font-weight: 400;;">
              全部评论({{sqcomment.commentCount?sqcomment.commentCount:0}})
            </div>
            <!--评论-->
            <div v-if="sqcomment.commentCount">
              <div>
                <!--小三角-->
                <!--                <div class="jiao"></div>-->
                <div
                  style="background:#fff;border-radius:4px;box-sizing:border-box;font-size:13px;line-height: 20px;margin: 0 auto">
<!--                  border-top: 1px solid #f5f5f5     -->
                  <div style="margin-bottom: 20px;border-bottom: 1px solid #f5f5f5;padding-bottom: 25px"
                       v-for="(to,index) in  sqcomment.commentChild" v-bind:key="to.id" v-show="index < pnum">
                    <div style="display: flex;justify-content: end;align-items: center;margin-bottom: 15px;">
                      <img :src="to.header.length>2?surl+to.header:'./static/tx.png'"
                           style="width:35px;border-radius:50%;margin-top:5px;height: auto"
                           alt="">
                      <p style="width: 10px"></p>
                     <div>
                       <div style="color: rgb(68, 68, 70);font-size: 14px;font-weight: 400;;line-height: 20px">{{to.name_nick}}</div>
                       <div style="font-size: 10px;color: rgb(167, 167, 167);line-height: 14px">{{ timestampToTime(parseInt(to.created)*1000) }}</div>
                     </div>

                    </div>


                    <div style="padding-left: 40px;">
                      <!--          padding-left: 30px;          内容    -->
                      <div style="color: rgb(68, 68, 70);">
                        <span @click="phf1(to,index, sqcomment.feedId,index)">{{to.content}}</span>
                      </div>

                      <!--二次循环-->
                      <div  v-if="to.commentChild?to.commentChild.length >0:false" style="margin-top: 20px;background: #f5f5f5;padding: 6px 0">
                        <div v-for="(to1,index3) in to.commentChild" v-bind:key="to1.id"
                             v-show="index3 < hnum">
                          <p style="padding-left: 15px"  @click="addcoments(to1)">
<!--                            <span class="themecolor">{{to1.name_nick}}</span> 回复-->
                            <span style="color: rgb(136, 136, 136);font-size: 14px;font-weight: 400;;line-height: 20px" >{{to1.name_nick}}:</span>
                            <span style="color: rgb(68, 68, 70);">{{to1.content}}</span>
                            <!--           v-on:click="phf1(to1,index, sqcomment.feedId,index,index3)"                  -->
                          </p>

                          <div style="padding-left: 15px" v-if="to1.commentChild?to1.commentChild.length >0:false">
                            <div v-for="(to2,index) in to1.commentChild" :key="index">
                              <p style="padding-left: 15px;word-break: break-all"  @click="addcoments(to2)" >
                                <span class="themecolor" style="white-space:nowrap;font-size: 14px">{{to2.name_nick}}</span> 回复
                                <span style="color: rgb(136, 136, 136);font-size: 14px;font-weight: 400;;line-height: 20px;white-space:nowrap;" >{{to2.name_nick}}:</span>
                                <span style="color: rgb(68, 68, 70);">{{to2.content}}</span>
                                <!--           v-on:click="phf1(to1,index, sqcomment.feedId,index,index3)"                  -->
                              </p>
                            </div>
                          </div>
                        </div>
                        <div v-if="to.commentChild.length >5" style="font-size:10px;color:#7d83ed;text-align:right;">
                          <p v-on:click="dianshou1(index,to.commentChild.length)">
                            {{hhazi}}
                          </p>
                        </div>
                      </div>

                      <div style="height: 10px"></div>

                      <!--   点赞评论   -->
                      <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
                        <!--  评论  -->
                        <div style="display: flex;align-items: center">
                          <img @click="addcoments(to)" src="@/assets/wen/xinxi.png" alt="" class="images">
                          <p style="width: 5px;"></p>
                          <span style="color:rgb(167,167,167);font-size: 12px;">{{to.commentChild?to.commentChild.length:0}}</span>
                        </div>
                        <!--           点赞           -->
                        <div style="display: flex;align-items: center">
                          <img @click="commentThumb(to.id)" v-if="!to.is_thumb" src="@/assets/wen/zan1.png" alt=""
                               class="images">
                          <img @click="commentThumb(to.id)" v-else src="@/assets/wen/zan2.png" alt="" class="images">
                          <p style="width: 5px;"></p>
                          <span style="color:rgb(167,167,167);font-size: 12px">{{to.thumb_count}}</span>
                        </div>
                      </div>

                    </div>

                  </div>


                  <div v-if=" sqcomment.commentChild.length >7" style="font-size:10px;color:#7d83ed;text-align:right;">
                    <p v-on:click="dianshou(0, sqcomment.commentChild.length)" style="color: #ccc">
                      {{phazi}}
                    </p>
                  </div>


                </div>
              </div>
            </div>
          </div>

          <div style="height:70px;"></div>
          <!--        <div style="height:1px;width:100%;background:#eee;"></div>-->

        </div>

      </div>
    </scroll>

    <backColor v-if="shuru_if" @heidback="heidback">
      <popup v-model="shuru_if" is-transparent>
        <div @click.stop=""
             style="position:fixed;bottom:0px;background-color: #fff;width: 100%;height:300px;z-index: 10000"
             ref="fa_pinlun">

         <div style="padding: 0 20px">

           <div style="height: 20px"></div>
           <div>

             <input slot="icon" type="text"
                    style="background-color: #ececec;border:1px solid #ececec;height: 88px;width: 100%;text-align: left;font-size: 14px;text-indent: 10px;"
                    placeholder="我要评论" v-model="pinlun_comment">
           </div>
           <div style="height: 40px"></div>

           <div style="display: flex;justify-content: center">
             <p
               style="border-radius: 15px;border: 1px solid #9a55ff;width: 40%;height: 30px;background:#9a55ff;color: #fff;text-align: center;line-height: 30px"
               @click="send_pinlun">发送评论
             </p>
           </div>
         </div>



        </div>
      </popup>
    </backColor>

    <backColor v-if="shuru_if1" @heidback="heidback">
      <popup v-model="shuru_if1" is-transparent>
        <div @click.stop=""
             style="position:fixed;bottom:0px;background-color: #fff;width: 100%;height:320px;z-index: 10000"
             ref="fa_pinlun">
          <div style="padding:0 20px">
            <div class="texts" style="padding-top: 20px">
              <span style="color: rgb(136, 136, 136);">回复  {{username}}：</span>{{usertext}}
            </div>
            <div style="height: 20px"></div>
            <input slot="icon" type="text"
                   style="background-color: #ececec;border:1px solid #ececec;height: 88px;width: 100%;text-align: left;border-radius: 6px;font-size: 14px;
   text-indent: 10px;"
                   placeholder="回复评论" v-model="pinlun_comment1">
          </div>
          <div style="height: 40px"></div>
          <div style="display: flex;justify-content: center">
            <p
              style="border-radius: 15px;border: 1px solid #9a55ff;width: 40%;height: 30px;background:#9a55ff;color: #fff;text-align: center;line-height: 30px"
              @click="send_pinlun1">发送评论
            </p>
          </div>

        </div>
      </popup>
    </backColor>


    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>


    <!--   底部固定栏-->
    <div style="position: fixed;bottom: -1px;height: 61px;background: #fff;width: 100%;border-top: 1px solid #f5f5f5">

      <div style="display: flex;align-items: center;width: 90%;margin: 0 auto;height: 60px">
        <!--      评论-->
        <div style="display: flex;align-items: center;width: 70%;">
          <div @click="shuru_if = true"
               style="width: 94%;border-radius: 16px;line-height: 32px;background: rgb(245, 245, 245);display: flex;align-items: center">
            <img src="@/assets/wen/bi.png" alt="" class="images" style="margin-left: 13%">
            <p style="width: 10px;"></p>
            <span style="color: rgb(136, 136, 136);font-size: 14px">我要评论</span>
          </div>
        </div>
        <!--     评论 -->
        <div style="display: flex;align-items: center;width: 15%;justify-content: center">
          <img @click="shuru_if = true" src="@/assets/wen/xinxi.png" alt="" class="images"
               style="margin: 0;width: 26px">
          <p style="width: 5px;"></p>
          <span style="color:rgb(167,167,167);font-size: 14px;margin-top: 1px">{{sqcomment.commentCount}}</span>
        </div>
        <!--  赞    -->
        <div style="display: flex;align-items: center;width: 15%;justify-content: flex-end">
          <img v-if="!sqcomment.like" src="@/assets/wen/zan1.png" @click="dianzan(sqcomment)" alt="" class="images" style="margin: 0;width: 23.5px">
          <img v-else src="@/assets/wen/zan2.png" alt=""  @click="dianzan(sqcomment)"  class="images" style="margin: 0;width: 23.5px">
          <p style="width: 5px;"></p>
          <span style="color:rgb(167,167,167);font-size: 14px;margin-top: 1px">{{sqcomment.thumb}}</span>
        </div>
      </div>

    </div>

    //
  </div>
</template>

<script>
    import HeaderPage from "../HeaderPage/HeaderPage";
    import backColor from "../backColor/backColor";
    import scroll from "../scroll/scroll";
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
        Popup,
        XDialog
    } from 'vux'
    import {reminder} from '@/common/js/mixin.js';
    import enlargeImage from '@/base/enlargeImage/enlargeImage'
    export default {
        name: "sqcomment",
        mixins: [reminder],
        components: {
            enlargeImage,
            backColor,
            scroll,
            Popup,
            HeaderPage,
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
        },
        props: {
            sqcommentItem: {
                type: Object,
                default: () => {
                    return {}
                }
            },

        },
        created() {
            this.height = document.documentElement.clientHeight;
            this.token = localStorage.getItem('newtoken');

            this.users = JSON.parse(localStorage.getItem('user'));
            this.sqcomment = this.sqcommentItem;


            //  检测安卓或者ios
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isiOS) {
                this.ios1 = true
            } else {
                this.ios1 = false
            }
        },
        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
        },
        data() {
            return {
                iscomprehen: '',
                enlargeImageindex:0,
                enlargeheight:0,
                iscomprehensive: false,
                sqcomment:[],
                pinlun_comment: '',
                username: '',
                usertext:'',
                pinlun_comment1: '',
                shuru_if: false,
                shuru_if1: false,
                content: '正文',
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
                ppge: 1,
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
            }
        },
        methods: {
            dianzan(a){
                let that= this;
                that.axios.post(that.surl + '/thumb?token=' + that.token,
                    {
                        "article_id": a.feedId,
                        "user": JSON.parse(localStorage.getItem('user')).hu
                    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                    console.log(response.data)
                    if (response.data.status == "thumb_success") {
                        //点赞成功
                    } else if (response.data.status == "cancel_success") {
                       //点赞取消
                    }

                    that.getList(a.feedId)
                }).catch(function (error) {
                    console.log(error);
                })
            },
            goBack(){
                this.$emit('heidsqcomment');
            },
            guanbirotateImage() {
                this.iscomprehensive = false;
                this.iscomprehen = ''
            },
            addshowcomprehen( item ,num) {
                this.enlargeheight = this.height;
                console.log(item, '@@@@@@@@@@@@@@@@@@@@@@');
                this.startY = 0
                this.iscomprehensive = true;
                this.enlargeImageindex = num;
                let arr = []
                item.map(todo=>{
                    arr.push(this.surl+todo.msrc)
                })
                this.iscomprehen = arr
            },

            //刷刷新数据
            getList(id) {
                let that = this;
                let data = {
                    id
                }
                that.axios.post(that.surl + '/articleOne?token=' + that.token,
                    data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(res => {
                    console.log(res, '刷新数据')
                    that.sqcomment = res.data;
                })
            },
            //关闭页面
            heidback() {
                this.hidepinluncomment()
            },
            //回复评论
            addcoments(item) {
                console.log(item);
                this.shuru_if1 = true;
                this.acid = this.sqcomment.feedId;
                this.phfinfo = {
                    id: parseInt(item.id),
                    name: item.name
                }
                this.username = item.name_nick;
                this.usertext = item.content;
            },
            //关闭评论框
            hidepinluncomment() {
                this.pinlun_comment1 = '';
                this.pinlun_comment = '';
                this.shuru_if1 = false;
                this.shuru_if = false;
                this.phfinfo = {};
                this.username = '';
            },
            //回复评论
            send_pinlun1() {
                let that = this;
                let data = {
                    "article_id": that.sqcomment.feedId,//文章ID
                    "user": that.users.hu,//账号
                    "comment": that.pinlun_comment1,//评论详情
                    "reply_user": that.phfinfo.name,//n ame  被回复人电话
                    "reply_id": that.phfinfo.id, //回复的哪条评论
                }
                that.axios.post(that.surl + '/comment?token=' + that.token,
                    data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    console.log(res, '回复评论')
                    that.hidepinluncomment()
                    if (res.data.status == "comment_success") {
                        that.tagglePrompt(true, res.data.msg);
                        this.getList(that.sqcomment.feedId);
                    } else {
                        that.tagglePrompt(false, res.data.msg)
                    }

                })
            },
            //发送评论
            send_pinlun() {
                let that = this;
                let data = {
                    "article_id": that.sqcomment.feedId,
                    "user": that.users.hu,
                    "comment": that.pinlun_comment,
                };
                that.axios.post(that.surl + '/comment?token=' + that.token, data,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    console.log(res, '发送评论')
                    that.hidepinluncomment()
                    if (res.data.status == "comment_success") {
                        that.tagglePrompt(true, res.data.msg);
                        this.getList(that.sqcomment.feedId)
                    } else {
                        that.tagglePrompt(false, res.data.msg)
                    }
                })
            },
            //评论点赞
            commentThumb(id) {
                let that = this;
                let data = {
                    id
                }
                that.axios.post(that.surl + '/comment-thumb?token=' + that.token, data,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    console.log(res, '评论点赞')
                    if (res.data.status == "success") {
                        that.tagglePrompt(true, res.data.msg);
                        this.getList(that.sqcomment.feedId)
                    } else {
                        that.tagglePrompt(false, res.data.msg)
                    }
                })
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
            //时间
            timestampToTime(inputTime) {
                var date = new Date(inputTime);
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
                return y + '.' + m + '.' + d + '  ' + h + ":" + minute;
            },
            //关闭页面
            toSetup() {
                console.log('sqcomment');
                this.$emit('heidsqcomment');
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
            logIndexChange(arg) {
                console.log(arg)
            },
            //播放指定视频 变成全屏
            palyda( b, c) {
                let that = this
                if (that.ios1) {
                    let vv = that.$refs.video1
                    //播放
                    vv.play();
                    vv.webkitEnterFullscreen()
                    //静音
                    vv.muted = vv.muted ? false : true;
                } else {
                    console.log('选中的视频' +  + ',路劲:' + b + ',缩略图:' + c)
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
                let that = this
                that.$refs.previewer[b].show(index)
            },
            bcan() {
                this.delid = ''
                this.show1 = false
                this.isflages = false
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
                console.log('图片的可用宽：' + dom.offsetWidth)
                that.tuk = dom.offsetWidth
            },
            start($event) {

                this.startY = $event.touches[0].pageY

            },
        }
    }
</script>

<style scoped>


  .main-content {
    overflow: hidden;
    position: relative;
    height: 90vh;
  }

  .images {
    width: 15px;
    height: auto;
    display: block;
    margin-left: 13px;
  }

  input:focus {

    outline: none;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    text-align: left;
    font-size: 14px;
    text-indent: 10px;
    caret-color:#9a55ff;
  }
  .texts{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
    color: rgb(68,68,70);
  }



  .bof1 {
    width: 60px;
    height: auto;
    position: absolute;
    bottom: 40%;
    left: 40%;
    z-index: 999;
  }

  .bof2 {
    width: 60px;
    height: auto;
    position: absolute;
    bottom: 40%;
    left: 40%;
    z-index: 999;
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

</style>
