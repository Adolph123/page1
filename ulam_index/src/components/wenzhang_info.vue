<template>
  <div class="wenzhangbox" style="background:#fff;overflow-y: scroll;" :style="{ height: bodyHeight + 'px',letterSpacing:'1px' }">
    <div class="back1 backcolors" >
      <img src="@/assets/newpage/钱包_03.png" alt="" style="height: 17px" class="back2" v-on:click="whui">

      <div style="text-align: center;font-size: 16px;line-height: 45px;color: #fff">
        文章详情
      </div>
    </div>

<!--    <div style="height: 70px"></div>-->

    <scroll class="main-content">
      <div ref="header">
        <div style="height: 20px;"></div>
        <div class="biaoti">
          {{wenzhang_info.title}}
        </div>
        <div style="height: 10px;"></div>

        <div style="display: flex;align-items: center;padding: 0 15px">
          <img :src="wenzhang_info.header" alt="" style="border-radius: 50%;width: 30px;height: 30px;display: block">

          <div style="width: 10px"></div>

          <div class="guanzhu" style="line-height: 18px" >
            <p style="font-size: 12px">{{wenzhang_info.author}}</p>
            <div class="chuping" >   {{timestampToTime(parseInt(wenzhang_info.created)*1000)}}</div>
          </div>


        </div>
        <div class="htmlls" style="position: relative;  padding: 6%;background:#fff;overflow-x: hidden;width: 88%;font-size: 14px" v-html="wenzhang">
          <!--        <span>{{wenzhang}}</span>-->
        </div>
        <div style="height: 34px"></div>
      </div>
    </scroll>









   <div style="height: 61px;overflow: hidden">
     <pinglun :wenzhanginfoitem="wenzhanginfoitem" @tagglepinlundetail="tagglepinlundetail" :height="gao" ref="pinglun_1"></pinglun>
   </div>

    <pinglundetail v-if="ispinglundetail" @tagglepinlundetail="tagglepinlundetail" :pinglundetailitem="pinglundetailitem" ></pinglundetail>


    <popup v-model="shuru_if"  is-transparent >
      <div  style="position:fixed;bottom:0px;background-color: #fff;width: 100%;height:20%;padding: 17px 0px 3px 7px;z-index: 10000" ref="fa_pinlun">
            <div>
              <input slot="icon" type="text" style="background-color: #ececec;border:1px solid #ececec;
              height: 88px;width: 95%;text-align: left;"  placeholder="我要评论" autofocus>
            </div>
            <div>
              <button style="right: 3%;position: fixed;
              margin-top: 4%;border-radius: 15px;border: 1px solid #3cc51f;width: 18%;height: 4%;background:#1da794;color: #fff;">发送评论</button>
            </div>

      </div>
    </popup>

  </div>


</template>
<script>
import pinglun_t from '../newpage/pinglun/pinglun_t.vue';
import pinglundetail from '../newpage/pinglun/pinglun.vue';
import scroll from "../base/scroll/scroll";
import {Icon,Loading,Alert,Flexbox,Tabbar, FlexboxItem,TabbarItem,Popup} from 'vux'
export default {
    name: "wenzhang_info",
    props:{
        wenzhanginfoitem:{
            type:Number,
            default:0
        }
    },
    components: {Tabbar,TabbarItem,Icon,Loading,Alert,Flexbox, FlexboxItem,Popup,'Pinglun':pinglun_t,scroll,pinglundetail},
      data(){
          return {
            wenzhang:'',bodyHeight:'',comment:'',url_wenzhang:"http://39.98.249.37:7000",pinglun_totle:'',shuru_if:false,wenzhang_info:'',gao:100000,
            ispinglundetail:false,pinglundetailitem:0,
          }
      },
      watch:{
        sear(newb,oldb){
          if(newb){
            this.sou = false
          }else{
            this.sou = true
          }
        }
      },
      computed:{
        //是否显示动画
        gif(){
          return this.$store.state.gifhua;
        },
      },
      mounted(){
          if (window.history && window.history.pushState) {
              history.pushState(null, null, document.URL);
              window.addEventListener('popstate', this.goBack, false);
          }
        window.scrollTo(0, 0);
        window.addEventListener("scroll", this.showIcon,false);
        this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
        })
        //document.querySelector('body').setAttribute('style', 'background-color:#fff;')
        let that = this
        that.bodyHeight=document.documentElement.clientHeight
        that.get_wenzhang()
        that.get_comment()

      },
    destroyed(){
        window.removeEventListener('popstate', this.goBack, false);
    },
      methods:{
          goBack(){
              if(!this.ispinglundetail ){
                  this.$emit('heidwenzhanginfo')
              }
          },
          //评论详情出现与隐藏
          tagglepinlundetail(){
              this.ispinglundetail = !this.ispinglundetail;
              this.pinglundetailitem = this.wenzhanginfoitem
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

        showIcon(e){
            let that = this
            let scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;

          //如果超过多少距离显示返回顶部
            if(scrollTop > 100) {

              let dom = this.$refs.header;

              try{
                that.gao=dom.offsetHeight
              }catch(e){
                that.gao=99999999
              }

            }else{
              that.title = '资讯评论'
            }
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
        get_comment(){
          let that = this
              that.axios.post("http://39.98.249.37:5301/api/v1/art/comment-find",
                {
                    "articleId":parseInt(that.wenzhanginfoitem),
                    "page":1
                },
                {
                  headers: {'token':localStorage.getItem('token')}
                }
              ).then(response => {

                console.log(response.data.data)
                that.comment = response.data.data
                that.pinglun_totle = response.data.total

              }).catch(function (error) {
                that.ss1 = false
                console.log(error);
              })
        },
        get_wenzhang(){
              let that = this
              that.axios.post("http://39.98.249.37:5301/api/v1/art/art-get",
                {
                  "id":parseInt(that.wenzhanginfoitem)
                },
                  {
                      headers: {'token':localStorage.getItem('token')}
                  }
              ).then(response => {

                //console.log(type(response.data.data.content))
                //let reg=new RegExp('/api','g')//g代表全部
                //let newMsg=response.data.data.content.replace(reg,"http://39.98.249.37:5301/api");
                //console.log(newMsg)
                that.wenzhang_info = response.data.data
                console.log(response.data.data)
                that.wenzhang=response.data.data.content


              }).catch(function (error) {
                that.ss1 = false
                console.log(error);
              })
          },
       whui(){
           this.$emit('heidwenzhanginfo')
        },
        pinlun(){
          // this.$router.push({path:'/pinglun',query:{id:this.$route.query.id}})
        },
        shuru_pinlun(){
          this.shuru_if = true
        }
      }
    }
</script>
<style scoped>
  .wenzhangbox{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100000;
  }
  .main-content{
    height: 93vh;
    overflow: hidden;
    position: relative;
  }
.imgbox{
  width:500px;
  /*height:500px;*/
  border-radius:999px;
  background-clip:padding-box;
  border-top-left-radius: 999px;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
  border-bottom-left-radius: 999px;
}

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
    width: 240px;
    height: 20px;
    line-height: 20px;
}
.buju {
    display: flex;
    margin: 0;
    padding: 0;
}
.buju span {
    color: #000000;
    font-size: 14px;
}
.im {
    width: 50%;

}
.biaoti {
    width: 94%;
    margin:80px auto 0;
    font-weight: 600;;
    font-size: 16px;
}
.chuping {
   font-size: 12px;
   color:#acacac;
}
.guan {
    color: #ffffff;
    background-color: #1da794;
    border-radius: 15px;
    padding: 0 15px 0 15px;
    font-size: 15px;
    line-height: 22px;
    height: 25px;
}
.guanzhu {
    width: 94%;
}

</style>
