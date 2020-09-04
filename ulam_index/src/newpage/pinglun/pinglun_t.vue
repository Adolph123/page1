<template>
  <div class="rapbox">

    <!--测试下拉刷新-->
    <div class="weui" ref="scrollBox" :style="style" @touchstart="touchStart"
         @touchmove="touchMove" @touchend="touchEnd" >
      <scroll class="main-content">
        <div style=" margin-bottom: 7%;">
          <!--获取图片可用的宽度-->
          <flexbox :gutter="0" >
            <flexbox-item :span="1.7">
              <div></div>
            </flexbox-item>
            <flexbox-item :span="10">
              <div ref="pictu">

              </div>
            </flexbox-item>
          </flexbox>

          <div style="clear: both;"></div>



          <div style="margin-top: 3%">
            <span style="margin-left: 4%;font-size: 16px;font-size: 14px;color: #bababa">全部评论({{wenzhang_info.commentCount}})</span>
          </div>
          <!--循环流-->
          <div >
            <div v-for="(todo,index) in shuju" style="padding: 4% ;border-bottom: 0.5px solid #f5f5f5" >
<!--&lt;!&ndash;              头像名字 时间&ndash;&gt;-->
              <div style="display: flex;align-items: center;">
                <div><img :src=todo.userHeader alt="" style="width:38px;border-radius:50px;display: block"></div>
                <div style="width: 15px;"></div>
                <div style="font-size: 12px">
                  <p style="font-size: 14px">{{todo.username}}</p>
                  <p style="color:#acacac "> {{timestampToTime(todo.created)}}·</p>
                </div>
              </div>
<!--              内容    -->
              <div class="hh" @click="shuru_pinlun1(todo)" style="margin-top:9px;font-size: 14px;margin-left: 50px">
                {{todo.commentContent}}
              </div>
<!--              2级回复-->
              <div v-if="todo.replyCount > 0" style="margin-left: 50px;">
                <div style="height: 25px;"></div>
                <div style="background: #f5f5f5;padding:6px 10px;">
                  <div v-for="(tos,num) in todo.reply" :key="num">
                    <div style="display: flex;font-size: 14px" @click="towContent(tos)">
                      <div style="color: rgb(136, 136, 136)"> {{tos.username}}:</div>
                      <div>
                        {{tos.commentContent}}
                      </div>
                    </div>
<!--                3级回复          -->
<!--                    {{tos.replyCount}}-->
                    <div v-if="tos.replyCount > 0" style="margin-left: 15px;">
                          <div  v-for="(it,nums) in todo.reply" :key="nums" style="margin-bottom: 5px">
                            <div style="font-size: 14px;word-break: break-all">
                              <span  style="color:#9a55ff;white-space:nowrap;"> {{it.username}}</span>
                              <span style="color: #222222;white-space:nowrap;">&nbsp;回复&nbsp;</span>
                              <span  style="color: rgb(136, 136, 136);white-space:nowrap;">{{it.replyUserNick}}:</span>
                              <span>{{it.commentContent}}</span>
                            </div>
                          </div>
                    </div>

                  </div>
                </div>

              </div>


              <div style="height: 25px;"></div>
<!--        点赞  评论      -->
              <div style="display: flex;align-items: center;justify-content: flex-end">

                <div style="display: flex;align-items: center">
                  <p @click="shuru_pinlun1(todo)" style="display: inline;color: #000">
                    <img src="@/assets/wen/xinxi1.png" alt="" style="width:15px;height: auto;display: block">
                  </p>
                  <p style="width: 5px;"></p>
                  <p class="zanse">
                      {{todo.replyCount}}
                  </p>
                </div>

                <div style="width: 10px;"></div>
                <div v-if="!todo.isThumb" style="display: flex;align-items: center" @click.stop="commentthumb(todo.id)">
                  <img src="@/assets/wen/zan1.png" alt="" style="width:15px;height: auto;display: block">
                  <p style="width: 4px"></p>
                  <span class="zanse" >{{todo.thumbCount}}</span>
                </div>
                <div  v-else  style="" @click.stop="commentthumb1(todo.id)">
                  <img src="@/assets/wen/zan2.png" alt="" style="width:15px;height: auto;display: block">
                  <p style="width: 4px"></p>
                  <span class="zanse" >{{todo.thumbCount}}</span>
                </div>
              </div>

              <div style="height: 76px;"></div>
<!--              具体动态-->
<!--              <flexbox :gutter="4" align="flex-start" class="zanxian">-->
<!--                <flexbox-item :span="1.7">-->
<!--                  <div>-->
<!--                    <img :src=todo.userHeader alt="" style="width:80%;border-radius:50px;">-->
<!--                  </div>-->
<!--                </flexbox-item>-->

<!--                <flexbox-item :span="10" >-->
<!--                  <div style="margin-top:6px">-->
<!--                    <p style="font-weight: 600;font-size: 13px">{{todo.username}}</p>-->
<!--                  </div>-->
<!--                  <div class="hh" @click="shuru_pinlun1(index)" style="margin-top:9px;font-size: 14px">-->
<!--                    {{todo.commentContent}}-->
<!--                  </div>-->

<!--                  <div style="margin-top:12px;;color: #999999">-->
<!--                    <flexbox :gutter="0"  align="flex-end">-->
<!--                      <flexbox-item :span="7">-->
<!--                        <div style="font-size: 10px;">-->
<!--                          <p style="display: inline;"> {{chutime(todo.created)}}·</p>-->
<!--                          <p @click="shuru_pinlun1(index)" style="display: inline;color: #000"> 回复</p>-->
<!--                        </div>-->
<!--                      </flexbox-item>-->

<!--                    </flexbox>-->
<!--                  </div>-->

<!--                  <div style="margin-left: -5%;margin-top: 5%">-->
<!--                    <div v-if="index1<2 || !(zhankai.indexOf(index)===-1)" v-for="(todo1,index1) in todo.reply" style="padding: 4%;margin-top: -5%" >-->
<!--                      <flexbox :gutter="4" align="flex-start" class="zanxian">-->
<!--                        <flexbox-item :span="1.7">-->
<!--                          <div>-->
<!--                            <img :src=todo1.userHeader alt="" style="width:80%;border-radius:50px;">-->
<!--                          </div>-->
<!--                        </flexbox-item>-->
<!--                        <flexbox-item :span="10">-->
<!--                          <div style="margin-top: 5px">-->
<!--                            <p style="font-weight: 600;font-size: 13px">{{todo1.username}}</p>-->

<!--                          </div>-->
<!--                          <div class="hh" style="margin-top:8px;font-size: 14px">-->
<!--                            {{todo1.commentContent}}-->
<!--                          </div>-->
<!--                          <div style="margin-top:12px;color: #999999">-->
<!--                            <flexbox :gutter="0"  align="flex-end">-->
<!--                              <flexbox-item :span="7">-->
<!--                                <div  style="font-size: 10px;">-->
<!--                                  {{chutime(todo1.created)}}-->
<!--                                </div>-->
<!--                              </flexbox-item>-->
<!--                              &lt;!&ndash;点赞&ndash;&gt;-->

<!--                              &lt;!&ndash;评论&ndash;&gt;-->

<!--                            </flexbox>-->
<!--                          </div>-->
<!--                        </flexbox-item>-->
<!--                        <flexbox-item >-->
<!--                          <div style="position: absolute;right: 10px;" >-->
<!--                            <img src="@/assets/wen/zan1.png" alt="" style="width:12px;">-->
<!--                            <span class="zanse">{{todo.thumbCount}}</span>-->
<!--                          </div>-->
<!--                        </flexbox-item>-->
<!--                      </flexbox>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div v-if="todo.replyCount>2 && zhankai.indexOf(index)===-1" style="font-size: 12px;color: #9a55ff" @click.stop="" @click="zhankai_pinlun(index)">点击展开更多</div>-->


<!--                  &lt;!&ndash;点赞，评论&ndash;&gt;-->

<!--                  &lt;!&ndash;评论&ndash;&gt;-->

<!--                </flexbox-item>-->

<!--                <flexbox-item >-->

<!--                </flexbox-item>-->
<!--              </flexbox>-->

            </div>
          </div>


          <div v-if="dijia" style="text-align:center;font-size:14px;color:#999;">
            <div style="height:20px;"></div>
            <p>加载中<inline-loading></inline-loading></p>
          </div>
          <div style="padding:30px 25px;">
            <divider v-if="wuxian"> 已无更多 </divider>
          </div>
          <div style="height: 15px"></div>
        </div>
      </scroll>

      <!--下拉结束-->
    </div>











    <div v-if="!shuru_if" style="position:fixed;bottom:-1px;background-color: #fff;width: 100%;height:50px;border-top: 0.5px solid #eee" >
      <div style="padding: 0 10px;margin-top: 3%;display: flex;justify-content: center">
        <flexbox >
          <!--          评论    -->
          <div style="display: flex;align-items: center;width: 65%;">
            <div @click="shuru_pinlun"
                 style="width: 100%;border-radius: 16px;line-height: 32px;background: rgb(245, 245, 245);display: flex;align-items: center">
              <img src="@/assets/wen/bi.png" alt="" class="images">
              <p style="width: 10px;"></p>
              <span style="color: rgb(136, 136, 136);font-size: 14px">我要评论</span>
            </div>
          </div>
          <!--          评论详情-->
          <div v-if="zhengwen" class="buju" style="margin-left: 3%;" @click="pinlun">
            <flexbox >
              <div>
                <img slot="icon" src="@/assets/wen/xinxi.png" style="width: 25px" class="im pinlun1" >
              </div>
              <div style="margin-left: 5px;font-size: 14px;color: #a3a1a1">
                <p>{{wenzhang_info.commentCount}}</p>
              </div>
            </flexbox>
          </div>
          <!--          评论详情-->
          <div v-if="!zhengwen" class="buju" style="margin-left: 3%;" @click="ding">
            <flexbox >
              <div>
                <img slot="icon" src="@/assets/image/tiezi_28.png" style="width: 25px" class="im pinlun1" >
              </div>

            </flexbox>
          </div>
<!--收藏-->
<!--          <div  class="buju" style="margin-left: 2%;">-->
<!--            <img v-if="!collect_if" slot="icon" src="@/assets/icon/3_07.png"  class="im pinlun1" style="width: 25px" @click="collect">-->
<!--            <img v-if="collect_if" slot="icon" src="@/assets/icon/9_09.png"  class="im pinlun1" style="width: 25px" @click="collect_cancle">-->
<!--          </div>-->
<!--点赞       style="margin-right: 6%;"       -->
          <div class="buju"  style="margin-left: 5%;" >
            <img v-if="!isdianzan"  @click="dianzan" slot="icon" src="@/assets/wen/zan1.png"  class="im pinlun1" style="width: 22px">
            <img v-else slot="icon" @click="dianzan1" src="@/assets/wen/zan2.png"  class="im pinlun1" style="width: 22px">
            <p style="width: 5px;"></p>
            <span style="font-size: 14px;color: #a3a1a1">{{wenzhang_info.thumbCount}}</span>
          </div>
        </flexbox>
      </div>
    </div>








    <backColor v-if="shuru_if" @heidback="heidback" >
      <popup v-model="shuru_if"  is-transparent >
        <div  @click.stop="" style="position:fixed;bottom:0px;background-color: #fff;width: 100%;height:280px;;" ref="fa_pinlun">
          <div style="padding: 0 20px">
            <div style="height: 20px"></div>
            <div>
              <input slot="icon" type="text" style="background-color: #ececec;border:1px solid #ececec;height: 88px;width: 100%;text-align: left;text-indent: 10px"  placeholder="我要评论"  v-model = "pinlun_comment" >
            </div>
            <div style="height: 40px"></div>
            <div style="display: flex;justify-content: center">
              <button style="border-radius: 15px;border: 1px solid #9a55ff;width: 30%;line-height: 30px;background:#9a55ff;color: #fff;" @click="send_pinlun"  >发送评论</button>
            </div>
          </div>
        </div>
      </popup>
    </backColor>


    <backColor v-if="shuru_if1" @heidback="heidback">
      <popup v-model="shuru_if1"  is-transparent >
        <div  @click.stop="" style="position:fixed;bottom:0px;background-color: #fff;width: 100%;height:300px;" ref="fa_pinlun">

          <div style="padding: 0 20px">
            <div style="height: 20px"></div>
            <div class="texts" style="padding-top: 20px">
              <span style="color: rgb(136, 136, 136);">回复  {{username}}：</span>{{usertext}}
            </div>
            <div style="height: 20px"></div>
            <div>
              <input slot="icon" type="text" style="ext-indent: 10px;background-color: #ececec;border:1px solid #ececec;height: 88px;width: 100%;text-align: left;border-radius: 6px"  :placeholder="'回复'+username"  v-model = "pinlun_comment1">
            </div>

            <div style="height: 40px"></div>
            <div style="display: flex;justify-content: center">
              <button style="border-radius: 15px;border: 1px solid #9a55ff;width: 30%;line-height: 30px;background:#9a55ff;color: #fff;" @click="send_pinlun1"  >发送评论</button>
            </div>
          </div>

        </div>
      </popup>
    </backColor>





    <loading :show="ss1" text="加载中.."></loading>
    <loading :show="ss4" text="删除中.."></loading>
    <toast v-model="send"  :time="1500" is-show-mask width="18em">{{texts}}成功！</toast>
    <toast v-model="send1" type="cancel" :time="1500" is-show-mask width="18em">{{texts}}失败！</toast>


  </div>
</template>
<script>
    import {getdiswenlist} from '@/api/index';
    import scroll from '@/base/scroll/scroll';
    import backColor from "@/base/backColor/backColor";
    import { Group,Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer,TransferDom,InlineLoading,XDialog,Popup,Badge} from 'vux'
    export default{
        name: "pinglun_t",
        directives: {TransferDom},
        components:{
            backColor,Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer,InlineLoading,XDialog,Popup,Badge,scroll
        },
        data(){
            return {
                shuru_if:false,shuru_if1:false,usertext:'',texts:'',
                isdianzan:false,
                options:{
                    getThumbBoundsFn(index){
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
                },dijia:false,
                muxian:false,muurl:'',tops:0,bigtuH:0,pgao:0,qing:false,ppge:1,wuxian:false,show1:false,delid:'',
                users:"",didi:'',tutu:'./static/tx.png',
                surl:"http://39.98.249.37:5301",

                token:"",ltt:"./static/lt.png",tuk:280,bodyHeight:'',
                //社区提示信息
                shuju:'',title:'资讯评论',huifu:'',ss4:false,
                // reminds:'',
                //完整的数据
                shujus:'',ss1:false,

                swt:'',swt1:'',swtxian:false,
                startY: '',    //保存touch时的Y坐标
                moveDistance: 0,    //保存向下滑动的距离
                moveState: 0,        //开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中
                duration: 0,        //动画持续时间，0就是没有动画
                //评论和回复超出显示控制。
                pnum:7,hnum:5,pshow:true,hshow:true,phazi:'-显示更多评论',hhazi:'-显示更多回复',baoinfo:'',
                luns:[],lunss:30,allp:false,
                borderColor: {borderColor: 'black'},
                send:false,send1:false,pinlun_comment:'',wenzhang_info:'',comment_id:0,username:'',pinlun_comment1:'',liwu_if:false,
                zhengwen:true,collect_if:false,zhankai:[],header_image:''
            }
        },
        props:{
            wenzhanginfoitem:{
                type:Number,
                default:0
            },
            height:{
                type:Number,
                default:0
            },
        },
        computed:{
            style(){
                return{
                    transition: `${this.duration}ms`,
                    transform: `translate3d(0,${this.moveDistance}px, 0)`
                }
            },
            reminds(){
                return this.$store.state.shequinfo;
            }
        },
        mounted(){
            this.is_collect()
            document.querySelector('body').setAttribute('style', 'background-color:#fff;')
            let that = this
            let message = localStorage.getItem('user');


            that.nashuju()
            //  拿取高度
            that.bodyHeight=document.documentElement.clientHeight
            // console.log('当前屏幕宽'+kk)
            that.pkk()
            //监听滑动距离加载新数据
            window.addEventListener("scroll", this.showIcon,false);
            //  检测安卓或者ios
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if(isiOS){
                that.ios1 = true
            } else {
                that.ios1 = false
            }

            that.get_wenzhang()
            that.get_header_image()
        },
        watch:{
            bigtuH(newb,oldb){
                let that = this
                if(newb){
                    if (that.bodyHeight <= newb){

                    }else{
                        that.tops = (that.bodyHeight - newb) / 2
                    }
                    // console.log('距顶部距离：'+that.tops)
                }
            },
            qing(newb,oldb){
                if(newb){
                    console.log('已经滚动到底部！')

                    let that = this
                    that.ppge++;
                    console.log(that.shujus)
                    if(that.ppge >Math.round(that.shujus.total/10)){
                        that.wuxian = true
                        return
                    }
                    that.dijia = true
                    that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-find",
                        {
                            "articleId":parseInt(this.wenzhanginfoitem),
                            "page":that.ppge
                        },
                        {
                            headers: {'token':localStorage.getItem('token')}
                        }
                    ).then(response => {
                        console.log('第'+that.ppge+'页')
                        console.log(response.data)
                        that.dijia = false
                        if (response.data.status == "refresh") {
                            that.token = response.data.code
                            setTimeout(() => {
                                that.nashuju()
                            },50)
                            return
                        }
                        if(response.data.status == 'success'){
                            if(response.data.data == null){
                                that.wuxian = true
                                return
                            }
                            that.shuju = that.shuju.concat(response.data.data)
                            console.log(that.shuju)
                            that.shujus = response.data
                        }
                        setTimeout(() => {
                            that.qing = false
                        },300)
                    }).catch(function (error) {
                        that.dijia = false
                        setTimeout(() => {
                            that.qing = false
                        },300)
                        console.log(error);
                    })
                }
            },

            //这里是给用户操作返回的核心
            moveState(state){
                //我们监听moveState的状态，
                //0意味着开始也意味着结束，这里是结束，并且只有动画生效我们才能 moveDistance 设为0，
                //为什么动画生效才行，因为动画生效意味着手指离开了屏幕，如果不懂去看touchEnd方法，这时
                //我们让距离变为0才会有动画效果。
                if (state === 0 && this.duration === 300) {
                    this.moveDistance = 0
                }
            }
        },
        methods:{


            //评论
            towContent(item){
                this.comment_id = item.id;
                this.username = item.username;
                this.usertext = item.commentContent;

                this.shuru_if1 = true
            },


            heidback(){
                this.pinlun_comment1 = '';
                this.pinlun_comment = '';
                this.shuru_if1 = false;
                this.shuru_if = false;
                this.phfinfo = {};
                this.username = '';
            },
//评论点赞
            commentthumb(id){
                let apiurl = 'v1/art/comment-thumb';
                let data = {
                    id
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'评论点赞');
                    if(res.status == "success"){
                          this.send=true;
                         this.texts = '评论点赞';
                        this.get_wenzhang();
                    }else {
                        this.send1=true;
                        this.texts = '评论点赞';
                    }

                })
            },
//取消评论点赞
            commentthumb1(id){
                let apiurl = 'v1/art/comment-cancel-thumb';
                let data = {
                    id
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'取消评论点赞');
                   if(res.status == "success"){
                       this.texts = '取消评论点赞';
                       this.send=true
                       this.get_wenzhang();
                   }else {
                       this.send1=true;
                       this.texts = '取消评论点赞';
                   }
                })
            },
//点赞
            dianzan(){
                console.log('点赞')
                let apiurl = 'v1/art/art-thumb';
                let data = {
                    id : parseInt(this.wenzhanginfoitem),
                    status:1
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'点赞');
                    if(res.status == "success"){
                        this.texts = '文章点赞';
                        this.send=true
                        this.get_wenzhang();
                    }else {
                        this.send1=true;
                        this.texts = '文章点赞';
                    }

                })
            },
//取消点赞
            dianzan1(){
                console.log('取消点赞')
                let apiurl = 'v1/art/art-cancel-thumb';
                let data = {
                    id : parseInt(this.wenzhanginfoitem),
                }
                getdiswenlist(apiurl,data).then(res=>{
                    console.log(res,'点赞');
                    if(res.status == "success"){
                        this.texts = '文章取消点赞';
                        this.send=true
                        this.get_wenzhang();
                    }else {
                        this.send1=true;
                        this.texts = '文章取消点赞';
                    }

                })
            },
            //检查有没有空格
            setcont(a){
                let b =  a.replace(/\\u000A/g,"\n");
                let c =   b.replace(/\\/g,"");
                // console.log(a)
                // console.log(c)
                // a.replace("\\\u003c","<");
                // a.replace("\\\u003e",">");
                // a.replace("\\\u0026","&");
                return c;
            },

            // 处理时间
            chutime(a){
                let mistiming = Math.round((Date.now() - a*1000) / 1000);
                let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
                let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
                for (let i = 0; i < arrn.length; i++) {
                    let inm = Math.floor(mistiming / arrn[i]);
                    if (inm != 0) {
                        return inm + arrr[i] + '前';
                    }
                }
            },

            //测试下拉
            touchStart (e) {
                this.duration = 0 // 关闭动画
                this.moveDistance = 0 // 滑动距离归0
                this.startY = e.targetTouches[0].clientY  // 获得开始Y坐标
            },
            touchMove (e) {    //这里是整个下拉刷新的核心
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
                    if (this.moveDistance >60) {
                        //如果滑动距离大于50 那我就告诉你，释放即可刷新
                        if(this.moveState === 1)
                            return
                        this.moveState = 1
                    }else{
                        //否则 恢复原样
                        if (this.moveState === 0) return
                        this.moveState = 0
                    }
                }
            },
            touchEnd (e) {
                // 只要手指拿开，我都需要加上结束时的动画，这里为300ms
                this.duration = 300
                if (this.moveDistance > 60) {
                    //这里逻辑跟touchMove一样，但是需要真的加载数据了，那moveState变为2 所以加载动画在这出现
                    this.moveState = 2
                    //这里执行
                    this.nashuju()
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
                    },1000)
                } else {
                    //否则 给我老老实实恢复原样
                    this.moveDistance = 0
                }
            },

            ding(){
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                // this.rbxian = false
            },
            //监听滑动距离
            showIcon(e){
                let that = this
                let scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
                let clientHeight = e.target.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
                let scrHeight = e.target.documentElement.scrollHeight || e.target.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
                //这里的意思就是距离底部40 的时候执行操作
                if(scrollTop + clientHeight + 40 >= scrHeight){
                    that.qing = true
                }
                //如果超过多少距离显示返回顶部
                // if(scrollTop > that.height-100) {
                //     that.title = '- 返回顶部 -'
                //     that.zhengwen =false
                // }else{
                //     that.title = '资讯评论'
                //     that.zhengwen = true
                // }
            },

            //判断图片时间显示的高宽
            ptk(a,b){
                let that = this
                //算出缩小后的图宽度，如果宽度还大于现在手机的宽，则设置宽度为100%；
                let c = b*170/a
                // console.log(c)
                if(c >that.tuk){
                    return { width:'93%'}
                }else{
                    return { height:'170px'}
                }
            },
            //拿图可显示的时间宽度
            pkk(){
                let that = this
                let dom = that.$refs.pictu;
                console.log('图片的可用宽：'+dom.offsetWidth)
                that.tuk = dom.offsetWidth
            },
            //获取评论数据
            nashuju(){
                let that = this
                that.ss1 = true
                that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-find",
                    {
                        "articleId":parseInt(this.wenzhanginfoitem),
                        "page":1
                    },
                    {
                        headers: {'token':localStorage.getItem('token')}
                    }
                ).then(response => {
                    that.ss1 = false
                    console.log(response.data)
                    if (response.data.status == "refresh"){
                        that.token = response.data.code
                        setTimeout(() => {
                            that.nashuju()
                            that.get_wenzhang()
                        },500)
                        return
                    }
                    if(response.data.status == 'success'){
                        that.shuju = response.data.data
                        //给图片加url地址

                        that.shujus = response.data
                        console.log(that.shujus)
                    }
                }).catch(function (error) {
                    that.ss1 = false
                    console.log(error);
                })
            },


            pinlun(){
                // if (this.$route.path =="/wenzhang_info")
                // {
                //     this.$router.push({path:'/pinglun',query:{id:this.wenzhanginfoitem}})
                // }else{
                //     this.$router.push({path:'/wenzhang_info',query:{id:this.wenzhanginfoitem}})
                // }
                this.$emit('tagglepinlundetail')

            },
            shuru_pinlun(){
                this.shuru_if = true
            },
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
                return y+'.'+m+'.'+d+ '  '+ h+":"+ minute;
            },
            shuru_pinlun1(item){
                console.log(item)
                this.comment_id = item.id
                this.username = item.username,
                this.usertext = item.commentContent

                this.shuru_if1 = true
            },
            //关闭评论窗口
            remmove(){
                this.comment_id = 0;
                this.username = "";
                this.usertext = "";
                this.shuru_if = false;
                this.shuru_if1 = false;
            },
            send_pinlun(){

                let that = this
                console.log(that.pinlun_comment)
                that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-add",
                    {
                        "articleId":parseInt(this.wenzhanginfoitem),
                        "content":that.pinlun_comment
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data)
                    if (response.data.status=="success"){
                        that.nashuju()
                        that.get_wenzhang()
                        that.remmove()

                        that.texts = '文章评论';
                        that.shuru_if = false
                        that.send=true
                        that.pinlun_comment=''
                        return
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                        that.texts = '文章评论';
                        this.shuru_if = false
                        that.send1=true
                        return
                    }


                }).catch(function (error) {
                    that.texts = '文章评论';
                    that.send1 = false
                    console.log(error);
                })
            },
            send_pinlun1(){

                console.log(this.comment_id)
                let that = this
                console.log(that.pinlun_comment)
                that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-add",
                    {
                        "articleId":parseInt(this.wenzhanginfoitem),
                        "content":that.pinlun_comment1,
                        "replyPid":that.comment_id
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data)
                    if (response.data.status=="success"){
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        that.users = message
                        that.nashuju();
                        that.get_wenzhang();
                        that.remmove();

                        if (that.shuju[that.comment_id].reply==null){
                            that.shuju[that.comment_id].reply=[{
                                commentContent:that.pinlun_comment1,
                                username:that.users.name,
                                userHeader: that.header_image,
                                created:(new Date()).valueOf()/1000,
                                thumbCount:0
                            }]
                            that.shuju[that.comment_id].reply
                            that.shuru_if1 = false
                            that.texts = '回复评论';
                            that.send=true
                            that.pinlun_comment1=''
                            return
                        }
                        else{
                            that.shuju[that.comment_id].reply.unshift(
                                {

                                    commentContent:that.pinlun_comment1,
                                    username:that.users.name,
                                    userHeader: that.header_image,
                                    created:(new Date()).valueOf()/1000,
                                    thumbCount:0
                                })
                            that.shuju[that.comment_id].reply
                            this.shuru_if1 = false
                            that.texts = '回复评论';
                            that.send=true
                            that.pinlun_comment1=''
                            return
                        }
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                        this.shuru_if = false
                        that.texts = '回复评论';
                        that.send1=true
                        return
                    }


                }).catch(function (error) {
                    that.send1 = false
                    that.texts = '回复评论';
                    console.log(error);
                })
            },
            fanhui1(){
                this.$router.go(-1)
            },
            get_wenzhang(){

                let that = this
                that.axios.post("http://39.98.249.37:5301/api/v1/art/art-get",
                    {
                        "id":parseInt(this.wenzhanginfoitem)
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data.data.isThumb,'@@@@@@@@@@@@@@@@@@@@')
                    //let reg=new RegExp('/api','g')//g代表全部
                    //let newMsg=response.data.data.content.replace(reg,"http://39.98.249.37:5301/api");
                    //console.log(newMsg)
                    that.wenzhang_info = response.data.data
                    that.isdianzan = response.data.data.isThumb























                }).catch(function (error) {
                    that.ss1 = false
                    console.log(error);
                })
            },
            liwu(){
                this.liwu_if=true
                console.log("aaa")
            },
            send_liwu(status){
                let that = this

                that.axios.post("http://39.98.249.37:5301/api/v1/art/art-thumb",
                    {
                        "id":parseInt(this.wenzhanginfoitem),
                        "status":status
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data)
                    if (response.data.status=="success"){

                        that.liwu_if = false
                        that.send=true

                        return
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                        this.shuru_if = false
                        that.send1=true
                        return
                    }


                }).catch(function (error) {
                    that.send1 = false
                    console.log(error);
                })
            },
            is_collect(){
                let that=this
                that.axios.post("http://39.98.249.37:5301/api/v1/art/is-collect",
                    {
                        "id":parseInt(this.wenzhanginfoitem),
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {
                    console.log("aaaaaaaaaaaaaaaaa")
                    console.log(response.data)
                    if (response.data.status=="success"){

                        that.collect_if = response.data.data

                        return
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/index')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                        console.log("bbbbbbbbbbbbb")
                        return
                    }


                }).catch(function (error) {
                    that.send1 = false
                    console.log(error);
                })
            },
            collect(){
                let that=this
                that.axios.post("http://39.98.249.37:5301/api/v1/art/art-collect",
                    {
                        "id":parseInt(this.wenzhanginfoitem),
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data)
                    if (response.data.status=="success"){
                        this.texts = '文章收藏';
                        that.collect_if = true
                        that.send=true

                        return
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                        this.shuru_if = false
                        that.send1=true
                        return
                    }


                }).catch(function (error) {
                    that.send1 = false
                    console.log(error);
                })
            },
            collect_cancle(){
                let that=this
                that.axios.post("http://39.98.249.37:5301/api/v1/art/art-cancel-collect",
                    {
                        "id":parseInt(this.wenzhanginfoitem),
                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data)
                    if (response.data.status=="success"){
                        this.texts = '文章取消收藏';
                        that.collect_if = false
                        that.send=true

                        return
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                        this.shuru_if = false.
                        that.send1=true
                        return
                    }


                }).catch(function (error) {
                    that.send1 = false
                    console.log(error);
                })
            },
            chakan_liwu(){
                this.$router.push({path:'/liwu_info',query:{id:this.wenzhanginfoitem}})
            },
            zhankai_pinlun(index){

                this.zhankai.push(index)
                console.log(this.zhankai)

            },
            get_header_image(){
                let that=this
                that.axios.post("http://39.98.249.37:5301/api/auth/userInfo",
                    {

                    },
                    {
                        headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                ).then(response => {

                    console.log(response.data)
                    if (response.data.status=="success"){

                        that.header_image = response.data.data.header
                        console.log(response.data.data.header)
                        return
                    }
                    else {
                        let message = localStorage.getItem('user');
                        message = JSON.parse(message)
                        if(!message){
                            //跳转登陆
                            that.$router.push('/login')
                            return
                        }
                        //请求所有币的登陆。拿到总值
                        that.users = message

                        that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})

                        return
                    }


                }).catch(function (error) {
                    that.send1 = false
                    console.log(error);
                })

            }
        }
    }
</script>
<style scoped>
  .main-content{
    height: 80vh;
    position: relative;
    overflow: hidden;
  }
  .dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    padding:20px;
    box-sizing: border-box;
    height:300px;
    text-align: center;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  }
  .bof1{
    width:40px;position:absolute;bottom:40%;left:40%;z-index:999;
  }
  .bof2{
    width:40px;position:absolute;bottom:40%;left:19%;z-index:999;
  }
  /*是否显示video全屏控件 */
  /*video::-webkit-media-controls-fullscreen-button {*/
  /*display: none;*/
  /*}*/
  video::-webkit-media-controls-play-button {}
  video::-webkit-media-controls-timeline {}
  video::-webkit-media-controls-current-time-display{}
  video::-webkit-media-controls-time-remaining-display {}
  video::-webkit-media-controls-mute-button {}
  video::-webkit-media-controls-toggle-closed-captions-button {}
  video::-webkit-media-controls-volume-slider {}
  .srk{
    width:100%;
    background:#eee;border-top:1px solid #ddd;border-bottom:1px solid #ddd;
    padding:8px 10px;box-sizing:border-box;position:fixed;bottom:0px;
  }
  .content{
    background-size:100% 100%;
    height: 100%;
    position:absolute;
    width: 100%;
    /*position:fixed;top: 0;left: 0;*/
    /*bottom:60px; !*距离底部的距离为底部盒子的高度，自己也可以设置*!*/
    /*overflow-y: scroll;width: 100%;height: auto;*/
    /*-webkit-overflow-scrolling: touch;   !*这句是为了滑动更顺畅*!*/
  }
  .content1{
    position:fixed;top: 0;left: 0;
    bottom: 0px; /*距离底部的距离为底部盒子的高度，自己也可以设置*/
    overflow-y: scroll;width: 100%;height: auto;
    -webkit-overflow-scrolling: touch;   /*这句是为了滑动更顺畅*/
  }
  .vux-x-icon {
    fill:#7d83ed;
  }
  /*分享的字*/
  .lbao1{
    position:absolute;top:43%;
    font-weight:700;font-size:20px;width:100%;z-index:999;
  }
  .bfx{
    position:absolute;top:27%;right:36%;
    width:26%;z-index:999;
  }
  .tutu1{
    width:100%;position:absolute;top:0px;
  }
  .bao3{
    position:fixed;
    width:100%;
    top:0px;height:100%;
    background-color:rgba(0,0,0,0.6);
  }
  .bao4{
    position:fixed;
    width:100%;
    top:0px;height:100%;
    background-color:#000000;z-index:999;
  }
  .remind{
    height:38px;width:40%;margin-left:30%;background:#3e3e3e;padding:5px;box-sizing:border-box;text-align:center;color:#fff;line-height:28px;
    font-size:14px;border-radius:4px;
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
  .weui{
    height: calc(100vh - 40px);
    /*margin-top: -40px;*/
  .box{
    text-align:center;
    line-height:40px;
    height:40px;
    font-size:14px;
    color:#999999;
  }
  }
  .niu1{
    cursor:pointer;z-index:999;
    border:1px solid #ddd;font-size:14px;color:#999;text-align:center;border-radius:4px;height:28px;line-height:28px;width:100%;
  }
  .niu2{
    cursor:pointer;z-index:999;
    font-size:14px;color:#fff;text-align:center;border-radius:4px;background:#1aad19;height:28px;line-height:28px;width:100%;
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
    background:#fff;padding:5px 10px;box-sizing:border-box;border-radius:4px;word-break:break-all;
  }
  .input-test::-webkit-input-placeholder{
    color:#8C8B8B;
  }
  .input-text::-moz-placeholder{
    color:#8C8B8B;
  }
  .input-text:-ms-input-placeholder{
    color:#8C8B8B;
  }
  .in2{
    border:none;outline:none;color: #999;width:100%;height:34px;border-radius:4px;
  }
  .jiao{
    width:0;height:0;overflow:hidden;margin-left:10px;
    line-height: 0;border-width:7px;
    border-style:solid dashed dashed dashed;/*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
    border-color:transparent transparent #f5f5f5 transparent;
  }
  .pcc{
    background: black;
  }
  .goBack {  position: absolute;  width: 12px;  height: 12px;  border-style: solid;  border-color: white;  border-width: 1px 0 0 1px;  -webkit-transform: rotate(315deg);  transform: rotate(315deg);  }


  .tab {
    color: #fff;
    height: 35px;
    padding-top: 10px;
  }
  .pinlun {
    background-color:#ececec;

    width: 240px;
    height: 30px;
    line-height: 20px;
  }
  .pinlun1 {
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:center;
    line-height: 20px;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    text-align: left;
    font-size: 14px;
    text-indent: 10px;
    caret-color:#9a55ff;
  }
  .zanse{
    color: #bababa;
    font-size: 13px;
  }
  .pinlun2 {
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:center;


    line-height: 20px;
  }
  .buju {
    display: flex;
    margin: 0;
    padding: 0;
  }
  .buju span {

  }
  .im {
    width: 70%;
    height: 70%;
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:center;

  }
  .im1 {
    width: 60%;
    height: 60%;

  }

  .biaoti {
    width: 94%;
    margin:0 auto;
    margin-top: 10px;
    font-weight: 600;
    font-size: 20px;

  }
  .chuping {
    font-size: 11px;
    color:#9a55ff;
  }
  .guan {
    color: #ffffff;
    background-color: #9a55ff;
    border-radius:15px;
    padding:0 15px 0 15px;
    font-size: 11px
  }
  .guanzhu {
    width: 94%;
    margin:0 auto;

    display: flex;
    justify-content: space-between;
  }
  .liwu {
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:center;
  }
  .liwu_zi{
    font-size: 13px
  }
  .liwu_zi1{
    font-size: 10px
  }
  .vux-badge{
    position: fixed;
    margin-top: -2%;
    margin-left: 2%;

  }
  input:focus{

    outline: none;
  }
  .images {
    width: 15px;
    height: auto;
    display: block;
    margin-left: 13%;
  }
</style>
