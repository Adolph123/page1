<template>
  <div>
    <!--正常的显示-->
    <div>
      <div style="background-color: #3e3e3e;height:31px;margin-bottom: -1%"> </div><x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="fanhui1" style="position:fixed;top:0px;width:100%;z-index:999;"
                 @on-click-title="ding">详情</x-header>
      <div style="height:25px;"></div>
      <!--获取图片可用的宽度-->
      <flexbox :gutter="0" style="position:absolute;top:-1000px;">
        <flexbox-item :span="1.7">
          <div>1</div>
        </flexbox-item>
        <flexbox-item :span="10">
          <div ref="pictu">
            2
          </div>
        </flexbox-item>
      </flexbox>
      <div style="margin-top:20px;">
      </div>
      <div style="height:20px;"></div>
        <!--头像-->
      <flexbox :gutter="0" align="flex-start" v-if="todo">
          <flexbox-item :span="1.7">
            <div style="text-align: center;">
              <img :src="todo.url.length>2 ?surl+'/img/header/'+ todo.url:'./static/tx.png'" alt="" style="width:75%;border-radius:4px;margin-top:5px;">
            </div>
          </flexbox-item>
          <flexbox-item :span="10">
            <div style="word-break:break-all;font-size:15px;">
              <!--名称和内存-->
              <p class="themecolor" style="font-weight:700;">{{todo.name_nick}}</p>
              <p style="margin-top:8px;" v-if="!todo.is_redpacket">{{todo.content}}</p>
              <div v-else="todo.is_redpacket" style="width:100%;position:relative;">
                <p style="margin-top:8px;">我发了一个大额糖包，快来领取啊~</p>
                <p style="position:absolute;top:40%;color:#fff;font-weight:700;left:35%;" v-on:click="lbao(todo.content)">{{todo.content.substr(18)}}</p>
                <img :src="lredb" alt="" style="width:100%;" v-on:click="lbao(todo.content)">
              </div>
              <!--图片-->
              <!--<div style="margin-top:20px;" v-if="todo.picList">-->
                <!--<img class="previewer-demo-img" v-for="(item, index) in  todo.picList" :src="item.msrc" :style="ptk(todo.picH,todo.picW)" v-on:click="show(index)">-->
                <!--<div v-transfer-dom>-->
                  <!--<previewer :list="todo.picList"  ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>-->
                <!--</div>-->
              <!--</div>-->
              <div style="margin-top:15px;" >
                <div v-show="todo.picList.length >= 1">
                  <img class="previewer-demo-img" v-for="(item, index) in  todo.picList" :src="item.msrc" :style="todo.picList.length ==1 ?ptk(item.h,item.w): pdts() " v-on:click="show(index,index1)">
                  <div v-transfer-dom>
                    <previewer :list="todo.picList"  ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                  </div>
                </div>
              </div>
              <div style="margin-top:15px;" v-show="todo.video">
                <div style="position:relative;">
                  <!--进入全屏-->
                  <img src="@/assets/icos/vbo.png" alt="" v-bind:class="[todo.isHorizontal ? 'bof1': 'bof2'] " v-on:click="palyda(surl+todo.video,surl+todo.videoImg)">
                  <!--退出全屏-->
                  <div>
                    <video muted  :poster="surl+todo.videoImg" :width="todo.isHorizontal?'93%':'50%'"
                           ref="video1" controlsList = "nodownload">
                      <source :src="surl+todo.video"  v-if="ios1" />
                      用这样的浏览器*手机，有出息嘛！
                    </video>
                  </div>
                </div>
              </div>
              <!--时间、点赞和评论数-->
              <div style="margin-top:15px;">
                <flexbox :gutter="0">
                  <flexbox-item :span="8">
                    <div style="font-size:13px;color:#666;">
                      {{chutime(todo.time)}}
                      <span v-if="todo.del" style="font-size:12px;" class="themecolor" v-on:click="delpl(todo.feedId)"> &nbsp;&nbsp;删除</span>
                    </div>
                  </flexbox-item>
                  <!--点赞-->
                  <flexbox-item :span="2">
                    <div style="">
                      <img :src="todo.like?'./static/dz1.png':'./static/dz.png'" alt="" style="width:16px;" v-on:click="dz(todo)">
                      <span style="font-size:14px;color:#ccc;">{{todo.thumb}}</span>
                    </div>
                  </flexbox-item>
                  <!--评论-->
                  <flexbox-item :span="2">
                    <div style="">
                      <img :src="ltt" alt="" style="width:19px;position:relative;top:2.5px;" v-on:click="plun(todo)">
                      <span style="font-size:14px;color:#ccc;">{{todo.commentCount}}</span>
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
              <!--评论-->
              <div v-if="todo.commentCount">
                <div>
                  <!--小三角-->
                  <div class="jiao"></div>
                  <div style="width:100%;background:#f5f5f5;border-radius:4px;padding:5px 10px;box-sizing:border-box;font-size:13px;">
                    <div v-for="(to,index) in todo.comment" v-bind:key="to.id">
                      <p>
                        <span class="themecolor">{{to.name_nick}}：</span>
                        <span v-on:click="phf1(to,index,todo.feedId)">{{to.content}}</span>
                      </p>
                      <!--二次循环-->
                      <div v-if="to.child.length >0" v-for="(to1,index3) in to.child" v-bind:key="to1.id">
                        <p>
                          &nbsp;&nbsp;
                          <span class="themecolor">{{to1.name_nick}}</span> 回复
                          <span class="themecolor">{{to1.reply_user_nick}}：</span>
                          <span v-on:click="phf1(to1,index,todo.feedId,index3)">{{to1.content}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      <div style="height:20px;"></div>
      <div style="height:1px;width:100%;background:#eee;"></div>

      <div style="padding:30px 25px;">
        <divider v-if="wuxian"> 已无更多 </divider>
      </div>
    </div>
    <!-- 领取红包的全屏弹窗 -->
    <div v-if="rbxian ==2" class="bao3" @touchmove.prevent>
      <div class="lbao1">
        <p style="text-align:center;color:#fff;text-shadow:0px 3px 0px #3741a4;font-size:22px;">{{beizhu}}</p>
      </div>
      <img :src="baox" alt="" class="bfx" v-on:click="kai">
      <!--&lt;!&ndash; 领红包背景图&ndash;&gt;-->
      <img src="@/assets/redb8.png" alt="" class="tutu1">
      <img src="@/assets/redb2.png" alt="" style="position:absolute;top:75%;right:45%;width:36px;"
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
    <div v-if="dvd"  class="bao4" @touchmove.prevent v-on:click="dvds">
      <video  width="100%" autoplay loop height="100%" :poster="dvdtu"
              ref="video6" controlsList = "nodownload">
        <source :src="dvdsrc"  />
      </video>
    </div>
    <!--固定底部 输入框，牛逼-->
    <div class="srk" v-show="srk1">
      <flexbox :gutter="0" align="flex-end">
        <flexbox-item :span="10">
          <div style="">
            <div style="font-size:10px;color:#666;height:20px;line-height:10px;" v-if="iflun">
              回复{{huiname}}：</div>
            <div contenteditable class="text needsclick"
                 ref="inputs" id="content" @focus="getFocus" @blur="getBlur" style="-webkit-user-select:text" @input="changeVal"
                 v-model="huifu">评论</div>
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
    <!--弹窗-->
    <actionsheet v-model="she4" :menus="{del:'删除评论'}" @on-click-menu="medi2" show-cancel></actionsheet>
    <actionsheet v-model="she5" :menus="{del:'删除回复'}" @on-click-menu="medi3" show-cancel></actionsheet>
    <confirm v-model="show1"
             title="提示"
             @on-cancel="bcan"
             @on-confirm="qdel">
      <p style="text-align:center;">确定删除吗?</p>
    </confirm>
    <loading :show="ss1" text="加载中.."></loading>
    <loading :show="ss4" text="删除中.."></loading>
    <toast v-model="ss2" type="cancel" :time="1500" is-show-mask width="18em">删除失败！</toast>
    <toast v-model="ss3"  :time="1500" is-show-mask width="18em">删除成功！</toast>
    <toast v-model="she1"  :time="1500" is-show-mask width="18em">{{huifutext}}</toast>
    <toast v-model="red1" type="cancel" :time="1800" is-show-mask width="18em">糖包已过期！</toast>
    <toast v-model="red2" type="cancel" :time="1800" is-show-mask width="18em">糖包不存在，可能已被撤回！</toast>
  </div>
</template>
<script>
  import { Group,Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer, TransferDom} from 'vux'
  export default{
    name: "shequinfo",
    directives: {TransferDom},
    components:{
      Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer
    },
    data(){
      return {
        //视频窗  视频路劲
        dvd:false,dvdsrc:'',dvdtu:'',
        //领取红包的参数
        intervalId:0,beizhu:'', rbxian:1,redma:'',exnum:'',red1:false,red2:false,
        baox:'./static/1.png',lredb:'./static/ltb.png',
        list: [{
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400
        }],ppd:[],
        options:{
          getThumbBoundsFn(index){
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
        muxian:false,muurl:'',tops:0,bigtuH:0,pgao:0,qing:false,ppge:1,wuxian:false,show1:false,delid:'',
        users:"",didi:'',tutu:'./static/tx.png',
        surl:this.apiurlCommunity,
        token:"",ltt:"./static/lt.png",tuk:280,bodyHeight:'',
        //只是信息
        shuju:'',title:'泰勒社区',huifu:'',ss4:false,
        //完整的数据
        shujus:'',ss1:false,ss2:false,ss3:false,plx:false,niul:false,srk1:false,she1:false,plinfo:'',pliid:0,she2:false,she3:false,she4:false,she5:false,she6:false,
        menus2: {menu1:'发帖',menu2:'我的帖子',menu3:'刷新社区'},
        //回复评论的接口返回文字
        huifutext:'',phfinfo:'',phfid:0,phftext:'',acid:0,acidd:0,ziids:0,
        //判断是否是评论 还是回复
        iflun:false,huiname:'',iflun1:false,
        //   查看某人的社区帖子
        swt:'',swt1:'',swtxian:false,yous:'',todo:"",wenid:0,ios1:false,
      }
    },
    computed:{
    },
    mounted(){
      let that = this
      let message = localStorage.getItem('user');
      message = JSON.parse(message)
      if(!message){
        that.$router.push('/zhu')
        return
      }
      that.users = message
      //拿取路由值
      that.wenid =  that.$route.params.id
      let nei2 = localStorage.getItem('newtoken');
      if(that.wenid && nei2){
        that.token = nei2
        that.nashuju()
      }else {
        that.$router.push('/shequ1')
      }
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
      huifu(newb,oldb){
        if(newb.length>0){
          this.niul = true
        }else {
          this.niul = false
        }
      }
    },
    methods:{
      //播放指定视频 变成全屏
      palyda(b,c){
        let that = this
        if(that.ios1){
          let vv = that.$refs.video1
          //播放
          vv.play();
          vv.webkitEnterFullscreen()
          //静音
          vv.muted = vv.muted ? false : true;
        }else{
          console.log('路劲:'+b+',缩略图:'+c)
          that.dvdtu = c
          that.dvd = true
          that.dvdsrc = b
        }
      },
      //关闭视频播放弹窗
      dvds(){
        let that = this
        that.dvd = false
        that.dvdsrc = ''
        that.dvdtu = ''
      },
      qubao2(){
        this.rbxian= 1
        this.beizhu = ''
        this.redma = ''
        this.exnum = ''
      },
      //  查看红包领取详情
      qing1(){
        console.log('查看红包领取详情页面')
        this.$router.push({ name: 'mebaoinfo',params:{ bao: this.redma,ren:this.exnum } })
      },
      //  领红包
      kai(){
        let that = this
        let a = 1
        if(that.intervalId == 0){
          that.intervalId = setInterval(() =>{
            if(a > 5 ){
              a = 1;
            }
            a =  a+1
            that.baox = './static/'+ a + '.png'
          },160)
        }
        // return
        setTimeout(() => {
          that.lulam()
        },2200)
      },
      //真正执行领红包
      lulam(){
        let that = this
        that.axios.post(this.apiurl+'/ulam_red_packet_get',
          {
            "mobile":parseInt(that.users.hu),
            "num": that.redma
          }).then(response => {
          // 1S 以后关闭特效 处理结果
          that.guan()
          console.log(response.data)
          if(response.data == 'timeout'){
            that.red1 = true
            setTimeout(() => {
              that.rbxian = 1
            },1700)
            return
          }
          if(response.data == 'error'){
            that.red2 = true
            setTimeout(() => {
              that.rbxian = 1
            },1700)
            return
          }
          // 已经领取完毕 17768200706
          if(response.data == 'null_pack'){
            //显示红包已经被领完的页面
            that.rbxian = 3
            return
          }
          //已经领取过了
          if(response.data == 'finish_get'){
            that.qing1()
            return
          }
          //   这里是真正拿到了红包的数据 监测是否为number类型
          if(typeof response.data == 'number'){
            console.log('领取成功')
            that.$router.push({ name: 'mebao',params:{ bao: that.redma,jine :response.data,ren:that.exnum } })
          }
        }).catch(function (error) {
          that.guan()
          that.red2 = true
          that.rbxian = 1
          console.log(error);
        })
      },
      //  关特效
      guan(){
        clearInterval(this.intervalId)
        this.baox = './static/1.png'
        this.intervalId = 0
      },
      lbao(a){
        let that = this
        that.beizhu = a.substr(18)
        that.redma = a.substr(0,10)
        that.exnum = a.substr(10,8)
        console.log('红包码：'+that.redma)
        console.log('备注：'+that.beizhu)
        console.log('推广码：'+that.exnum)
        that.rbxian = 2
      },
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
      //点击评论 进行回复
      phf1(a,b,c,e){
        // console.log(e)
        // console.log('回复评论的下标:'+b)
        // console.log('回复哪个文章id：'+c)
        let that = this
        //文章的id 和 回复文章的id 和 下标
        that.acid = c
        that.phfid = b
        that.phfinfo = a
        //首先判断一下是否本人，本人只能删除
        if(a.delComment){
          that.srk1 = false
          if(e != undefined){
            //二级回复
            that.ziids = e
            console.log('子类下标'+that.ziids)
            that.she5 = true
          }else{
            console.log('无')
            that.she4 = true
          }
        }else{
          that.huiname = a.name_nick
          that.iflun = true
          that.srk1 = true
          that.$nextTick((x)=>{   //正确写法
            that.$refs.inputs.focus();
            if(that.ios1){
              document.body.scrollTop = document.body.scrollHeight
            }
          })
        }
      },
      //删除自己的评论
      medi2(a){
        let that = this
        if(a == 'del'){
          that.ss4 = true
          // that.axios.post('/shequ/delComment?token='+that.token,
          that.axios.post(that.surl+'/delComment?token='+that.token,
            {
              "comment_id":that.phfinfo.id
            },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response =>{
            console.log(response.data)
            that.ss4 = false
            that.huifutext = response.data.msg
            if(response.data.status == 'del_success'){
              //  同时要加dom元素进入，不需刷新显示数据
              that.todo.comment = that.todo.comment.filter(
                function(a){
                  return a.id != that.phfinfo.id
                }
              )
              that.todo.commentCount--;
              //成功后将回复字清空
              that.$nextTick((x)=>{  //正确写法
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
          }).catch(function (error){
            that.ss4 = false
            console.log(error);
          })
        }
      },
      //删除自己二级的评论
      medi3(a){
        let that = this
        if(a == 'del'){
          that.ss4 = true
          // that.axios.post('/shequ/delComment?token='+that.token,
          that.axios.post(that.surl+'/delComment?token='+that.token,
            {
              "comment_id":that.phfinfo.id
            },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response =>{
            console.log(response.data)
            that.ss4 = false
            that.huifutext = response.data.msg
            if(response.data.status == 'del_success'){
              //  同时要加dom元素进入，不需刷新显示数据
              that.todo.comment[that.phfid].child = that.todo.comment[that.phfid].child.filter(
                function(a){
                  return a.id != that.phfinfo.id
                }
              )
              that.todo.commentCount--;
              //成功后将回复字清空
              that.$nextTick((x)=>{  //正确写法
                that.$refs.inputs.innerText = '';
              })
              that.huifu = ''
              that.phfinfo = ''
              that.phfid = 0
              that.acidd = 0
              that.acid = 0
              that.ziids=0
              that.srk1 = false
            }
            that.she1 = true
          }).catch(function (error){
            that.ss4 = false
            console.log(error);
          })
        }
      },
      // 点击帖子 进行评论
      plun(a,b){
        console.log(a)
        console.log('数据的下标:'+b)
        let that = this
        that.plinfo = a
        that.pliid = b
        that.srk1 = true
        that.iflun = false
        that.$nextTick((x)=>{   //正确写法
          that.$refs.inputs.focus();
          if(that.ios1){
            document.body.scrollTop = document.body.scrollHeight
          }
        })
      },
      // 发送评论-或者回复
      setinfo(){
        let that = this
        if(that.huifu.length ==0){
          that.srk1 = false
          return
        }
        //回复框要显示出来
        that.srk1 = true
        if(that.iflun){
          //  这里是回复
          console.log('回复:'+that.huifu)
          // that.axios.post('/shequ/comment?token='+that.token,
          that.axios.post(that.surl+'/comment?token='+that.token,
            {
              "article_id":that.acid,
              "user":that.users.hu,
              "comment":that.huifu,
              "reply_user":that.phfinfo.name,
              "reply_id":that.phfinfo.id, //回复的哪条评论
            },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response =>{
            console.log(response.data)
            that.huifutext = response.data.msg
            if(response.data.status == 'comment_success'){
              that.todo.commentCount++;
              //  同时要加dom元素进入，不需刷新显示数据
              that.todo.comment[that.phfid].child.push(
                {
                  content:that.huifu,
                  name:that.users.hu,
                  name_nick:that.users.name,
                  delComment:true,
                  id: response.data.data.id,
                  reply_user:that.phfinfo.name,
                  reply_user_nick:that.phfinfo.name_nick
                })
              //成功后将回复字清空
              that.$nextTick((x)=>{  //正确写法
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
          }).catch(function (error){
            console.log(error);
          })
        }else{
          //  这里是评论
          //   that.axios.post('/shequ/comment?token='+that.token,
          that.axios.post(that.surl+'/comment?token='+that.token,
            {
              "article_id":that.plinfo.feedId,
              "user":that.users.hu,
              "comment":that.huifu
            },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response =>{
            console.log(response.data)
            that.huifutext = response.data.msg
            if(response.data.status == 'comment_success'){
              //  同时要加dom元素进入，不需刷新显示数据
              console.log('添加元素')
              //增加评论数
              that.todo.commentCount++;
              that.todo.comment.unshift({
                child:[],
                reated: "1573459706",
                content:that.huifu,
                name:that.users.hu,
                name_nick:that.users.name,
                delComment:true,
                id: response.data.data.id
              })
              //成功后将回复字清空
              that.$nextTick((x)=>{  //正确写法
                that.$refs.inputs.innerText = '';
              })
              that.huifu = ''
              that.plinfo = ''
              that.pliid = 0
              that.srk1 = false
            }
            that.she1 = true
          }).catch(function (error){
            console.log(error);
          })
        }
      },
      getFocus(val){
        console.log('获取焦点！');
        if(!this.inputText){
          val.target.innerText = '';
        }
      },
      getBlur(val){
        setTimeout(() => {
          this.srk1 = false
        },300)
      },
      changeVal(val) {
        this.inputText = val.target.innerText;
        // // console.log('回复：', this.inputText)
        this.huifu = this.inputText
      },
      //处理数据中的图片地址
      chutu(b){
          let that = this
          b.picList.map(function(a){
            a.msrc = that.surl+a.msrc
            a.src = that.surl+a.src
          })
      },
      logIndexChange (arg){
        console.log(arg)
      },
      show(index){
        let that = this
        that.$refs.previewer.show(index)
      },
      bcan(){
        this.delid = ''
        this.show1 = false
      },
      //删除动态
      qdel(){
        let that = this
        // that.axios.post('/shequ/delArticle?token='+that.token,
        that.axios.post(that.surl+'/delArticle?token='+that.token,
          {
            "article_id":that.delid,
          },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response => {
          console.log(response.data)
          if(response.data.status == "del_success"){
            that.ss3 = true
            setTimeout(() => {
              that.$router.push('/reminds')
            }, 1500)
          }else{
            that.delid = ''
            that.ss2 = true
          }
        }).catch(function (error){
          that.ss2 = true
          console.log(error);
        })
      },
      //删除评论
      delpl(a){
        console.log(a)
        this.delid = a
        this.show1 = true
      },
      ding(){document.documentElement.scrollTop = document.body.scrollTop = 0;},
      //监听滑动距离
      showIcon(e){
        let that = this
        let scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
        let clientHeight = e.target.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
        let scrHeight = e.target.documentElement.scrollHeight || e.target.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
        //这里的意思就是距离底部20 的时候执行操作
        //如果超过多少距离显示返回顶部
        if(scrollTop > 800) {
          that.title = '- 返回顶部 -'
        }else{
          that.title = '泰勒社区'
        }
      },
      //多图的样式
      pdts(){
        let that = this
        let hh = Math.floor(that.tuk* 0.32)
        // console.log('总'+that.tuk+'多图宽'+hh)
        return  {width:'32%',marginRight:'1%',height:hh +'px'}
      },
      //判断图片时间显示的高宽
      ptk(a,b){
        let that = this
        //算出缩小后的图宽度，如果宽度还大于现在手机的宽，则设置宽度为100%；
        let c = b*170/a
        // console.log(c)
        if(c >that.tuk){
          return { width:'100%'}
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
      //用户点赞
      dz(a){
        // console.log(a)
        let that = this
        // that.axios.post('/shequ/thumb?token='+that.token,
        that.axios.post(that.surl+'/thumb?token='+that.token,
          {
            "article_id":a.feedId,
            "user":that.users.hu
          },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response => {
          console.log(response.data)
          if(response.data.status == "thumb_success"){
            a.like = true
            a.thumb += 1
          }else if(response.data.status == "cancel_success"){
            a.like = false
            a.thumb -= 1
          }
        }).catch(function (error){
          console.log(error);
        })
      },
      //获取数据
      nashuju(){
        let that = this
        that.ss1 = true
        // that.axios.post('/shequ/articleOne?token='+that.token,{
        that.axios.post(that.surl+'/articleOne?token='+that.token,{
          id:that.wenid
        },{headers:{'Content-Type': 'application/x-www-form-urlencoded'} }).then(response => {
          that.ss1 = false
          console.log(response.data)
          that.todo = response.data
          that.chutu(that.todo)
        }).catch(function (error) {
          that.ss1 = false
          console.log(error);
        })
      },
      fanhui1(){
        let that = this
        let hshu = localStorage.getItem('remashu');
        if(hshu){
          that.$router.push('/reminds')
        }else{
          that.$store.dispatch('qingneis')
          that.$router.push('/shequ1')
        }
      }
    }
  }
</script>
<style scoped>
  .bof1{
    width:40px;position:absolute;bottom:40%;left:40%;z-index:998;
  }
  .bof2{
    width:40px;position:absolute;bottom:40%;left:19%;z-index:998;
  }
  .bao4{
    position:fixed;
    width:100%;
    top:0px;height:100%;
    background-color:#000000;z-index:999;
  }
  video::-webkit-media-controls-play-button {}
  video::-webkit-media-controls-timeline {}
  video::-webkit-media-controls-current-time-display{}
  video::-webkit-media-controls-time-remaining-display {}
  video::-webkit-media-controls-mute-button {}
  video::-webkit-media-controls-toggle-closed-captions-button {}
  video::-webkit-media-controls-volume-slider {}
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
  .srk{
    width:100%;background:#eee;padding:8px 10px;box-sizing:border-box;position:fixed;bottom:0px;border-top:1px solid #ddd;border-bottom:1px solid #ddd;
  }
  .niu1{
    border:1px solid #ddd;font-size:14px;color:#999;text-align:center;border-radius:4px;height:28px;line-height:28px;width:100%;
  }
  .niu2{
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
    background:#fff;padding:5px 10px;box-sizing:border-box;border-radius:4px;
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

</style>
