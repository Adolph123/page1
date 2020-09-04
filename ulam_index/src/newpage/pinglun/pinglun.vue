<template>
<div class="pinglun">

  <div class="back1 backcolors" style="z-index: 999999999999">
    <img src="@/assets/newpage/钱包_03.png" alt="" style="height: 17px" class="back2" v-on:click="pinlun">

    <div style="text-align: center;font-size: 16px;line-height: 45px;color: #fff">
      {{title}}
    </div>
  </div>
  <div style="height: 80px"></div>
    <!--测试下拉刷新-->


  <div style="position: relative;z-index: 60;height: 85px">
    <div style="height: 20px;"></div>
    <div class="biaoti">
      {{wenzhang_info.title}}
    </div>
    <div style="height: 10px;"> </div>
    <div class="guanzhu" >
      <img :src="wenzhang_info.image" alt="" style="border-radius: 50%;width:30px;height: 30px;display: block">
      <div style="width: 5px"></div>
      <div class="guanzhu" style="line-height: 18px" >
       <div>
         <p style="font-size: 12px">{{wenzhang_info.author}}</p>
         <div class="chuping" >   {{timestampToTime(parseInt(wenzhang_info.created)*1000)}}</div>
       </div>
      </div>
    </div>
  </div>
  <div style="height: 60px;border-bottom: 1px solid #f5f5f5"> </div>
  <div>
    <Pinglun @tagglepinlundetail="tagglepinlundetail"  :wenzhanginfoitem="pinglundetailitem" ></Pinglun>
  </div>

</div>
</template>
<script>
  import pinglun_t from './pinglun_t.vue'
  import { Group,Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer,TransferDom,InlineLoading,XDialog,Popup,Badge,} from 'vux'
    export default{
      name: "pinglun",
      props:{
          pinglundetailitem:{
              type:Number,
              default:0
          }
      },
      directives: {TransferDom},
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer,InlineLoading,XDialog,Popup,Badge,'Pinglun':pinglun_t
      },
      destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
      },
      data(){
        return {
        shuru_if:false,shuru_if1:false,
        title:'',
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
          send:false,send1:false,pinlun_comment:'',wenzhang_info:'',comment_id:0,username:'',pinlun_comment1:'',liwu_if:false
        }
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
          if (window.history && window.history.pushState) {
              history.pushState(null, null, document.URL);
              window.addEventListener('popstate', this.goBack, false);
          }
        this.get_wenzhang()
      },
      watch:{

      },
      methods:{
          goBack(){
              this.$emit('tagglepinlundetail');
          },
          tagglepinlundetail(){
              this.$emit('tagglepinlundetail');
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
            if(scrollTop > 800) {
              that.title = '- 返回顶部 -'
            }else{
              that.title = '资讯评论'
            }
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
        //获取数据
        nashuju(){
          let that = this
          that.ss1 = true
          that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-find",
                {
                    "articleId":parseInt(that.pinglundetailitem),
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
          // this.$router.push({path:'/wenzhang_info',query:{id:that.pinglundetailitem}})
            this.$emit('tagglepinlundetail')
        },
        shuru_pinlun(){
          this.shuru_if = true
        },
        shuru_pinlun1(id){
          console.log(id)
          this.comment_id = id
          this.username = this.shuju[this.comment_id].username
          this.shuru_if1 = true
        },
        send_pinlun(){

          let that = this
          console.log(that.pinlun_comment)
          that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-add",
            {
                "articleId":parseInt(that.pinglundetailitem),
                "content":that.pinlun_comment
            },
            {
              headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
            }
          ).then(response => {

            console.log(response.data)
            if (response.data.status=="success"){
              that.nashuju()
              this.shuru_if = false
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
              console.log(that.users)
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
        send_pinlun1(){

          console.log(this.comment_id)
          let that = this
          console.log(that.pinlun_comment)
          that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-add",
            {
                "articleId":parseInt(that.pinglundetailitem),
                "content":that.pinlun_comment1,
                "replyPid":that.shuju[that.comment_id].id
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
              //that.nashuju()
              if (that.shuju[that.comment_id].reply==null){
                that.shuju[that.comment_id].reply=[{
                   commentContent:that.pinlun_comment1,
                    username:that.users.hu,
                    userHeader: "http://39.98.249.37:5301/api/file/community/groupImage/202002041759301580810370.jpeg",
                    created:(new Date()).valueOf()/1000,
                    thumbCount:0
                }]
                that.shuju[that.comment_id].reply
                this.shuru_if1 = false
                that.send=true
                that.pinlun_comment1=''
                return
              }
              else{
                that.shuju[that.comment_id].reply.unshift(
                {

                    commentContent:that.pinlun_comment1,
                    username:that.users.hu,
                    userHeader: "http://39.98.249.37:5301/api/file/community/groupImage/202002041759301580810370.jpeg",
                    created:(new Date()).valueOf()/1000,
                    thumbCount:0
                })
                that.shuju[that.comment_id].reply
                this.shuru_if1 = false
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
              console.log(that.users)
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
        fanhui1(){
          this.$router.go(-1)
        },
        get_wenzhang(){

              let that = this
              that.axios.post("http://39.98.249.37:5301/api/v1/art/art-get",
                {
                  "id":parseInt(that.pinglundetailitem)
                },
                  {
                      headers: {'token':localStorage.getItem('token'),'Content-Type': 'application/x-www-form-urlencoded' }
                  }
              ).then(response => {

                that.wenzhang_info = response.data.data


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
                  "id":parseInt(that.pinglundetailitem),
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
                console.log(that.users)
                that.bapi.get_token({'username': that.users.hu,"password":that.users.mima})
                this.shuru_if = false
                that.send1=true
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
  .pinglun{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 100000;
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
  .weui{
    height: calc(100vh - 40px);
    margin-top: -40px;
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
    border-radius:15px;
    width: 240px;
    height: 30px;
    line-height: 20px;
}
.pinlun1 {

    border-radius:15px;
    line-height: 20px;
}

.pinlun2 {

    border-radius:15px;

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

}
.im1 {
    width: 60%;

}

.biaoti {
    width: 94%;
    margin:0 auto;
    font-weight: 600;;
    font-size:16px;
    line-height: 23px;

}
.chuping {
   font-size: 12px;
  color:#acacac;
}
.guan {
    color: #ffffff;
    background-color: #1da794;
    border-radius:15px;
    padding:0 15px 0 15px;
    font-size: 11px
}
.guanzhu {
    width: 94%;
    margin:0 auto;
    display: flex;
    align-items: center;
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
</style>
