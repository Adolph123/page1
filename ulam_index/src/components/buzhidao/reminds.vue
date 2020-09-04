<template>
    <div>
      <div style="background-color: #3e3e3e;height:31px;margin-bottom: -1%"> </div><x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="fanhui1" style="position:fixed;top:0px;width:100%;z-index:999;"
    >消息</x-header>
      <!--获取图片可用的宽度-->
      <flexbox :gutter="0" style="position:absolute;top:-1000px;">
        <flexbox-item :span="2">
        </flexbox-item>
        <flexbox-item :span="7">
        </flexbox-item>
        <flexbox-item  :span="3"><div class="flex-demo" ref="retu"></div></flexbox-item>
      </flexbox>
      <div style="height:45px;"></div>
      <div style="padding:10px;box-sizing:border-box;">
        <div v-for="(todo,index) in shuju" v-bind:key="todo.id" v-if="shuju">
          <flexbox :gutter="0" align="flex-start" style="font-size:14px;">
            <flexbox-item :span="2">
              <div style="padding:5px;box-sizing: border-box;" v-on:click="jinwen(todo.article.id)">
                <!--:src="todo.url.length>2 ?surl+'/img/header/'+ todo.url:'./static/tx.png'"-->
                <img :src="todo.comment.header ? surl+ todo.comment.header:'./static/tx.png'" alt="" style="width:100%;border-radius:4px;">
              </div>
            </flexbox-item>
            <flexbox-item :span="7">
              <div style="padding:0 10px;box-sizing:border-box;"  v-on:click="jinwen(todo.article.id)">
                <p class="themecolor">{{todo.comment.nick}}</p>
                <p style="margin-top:3px;" class="yin">{{todo.comment.content}}</p>
                <p style="margin-top:3px;color:#666;font-size:13px;">{{chutime(todo.comment.created)}}</p>
              </div>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="flex-demo" :style="{width:'100%',height:tuk+'px'}"  v-on:click="jinwen(todo.article.id)">
                <div v-if="!todo.article.image" style="word-break:break-all;font-size:16px;">
                  <div v-if="todo.article.is_redpacket">
                    <img :src="sred" alt="" style="width:100%;border-radius:4px;">
                  </div>
                  <div v-if="!todo.article.is_redpacket">
                    {{chuzi(todo.article.content)}}
                  </div>
                </div>
                <div v-if="todo.article.image">
                  <img :src="surl+todo.article.image" alt="" :style="{width:'100%',height:tuk+'px'}" class="hezi">
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <div style="height:10px;"></div>
          <div style="height:1px;width:100%;background:#eee;"></div>
          <div style="height:15px;"></div>
        </div>
        <div style="padding:30px 25px;" v-if="!shuju">
            <divider> 暂无消息 </divider>
         </div>
      </div>
      <!--弹窗-->
      <loading :show="ss1" text="加载中.."></loading>
      <div class="hezi">
        <!--<img :src="tus" alt="" ref="imgs" v-bind:class="[tu6? 'heightLong': 'widthLong'] ">-->
      </div>
    </div>
</template>

<script>
  import { Group,Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer,InlineLoading} from 'vux'
    export default {
        name: "reminds",
      components:{
        Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,Flexbox, FlexboxItem,Divider,Previewer,InlineLoading
      },
      data(){
          return {
            tus:'./static/hehuo.png',sred:'./static/sred.png',
        users:'',shuju:'',nei:'',ss1:false,surl:this.apiurlCommunity,token:'',shuju1:'',tu6:false,tuk:0,gao:false,
          }
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
        //拿取提醒内存
        // let nei1 = localStorage.getItem('newreminds');
        let nei2 = localStorage.getItem('newtoken');
        if(nei2){
          // that.nei = JSON.parse(nei1)
          console.log('拿取社区新消息缓存')
          // console.log(that.nei)
          that.token = nei2
          that.nashu()
        // 拿取图宽
         that.pkk()
        }else {
          that.$router.push('/shequ1')
        }
      },
      destroyed(){
        let that = this
        if(!that.gao){
          //清楚消息缓存
          this.$store.dispatch('qingneis')
          //具体的消息
          localStorage.removeItem('remashu')
        }
      },
      methods:{
        jinwen(a){
          let that = this
          console.log(a)
          that.shuju = that.shuju.filter(
            function(aa){
              return aa.article.id != a
            }
          )
          if(that.shuju.length ==0){
            console.log('全部看完。删除')
            localStorage.removeItem('remashu')
          }else{
            console.log('还有其他')
            localStorage.setItem("remashu",JSON.stringify(that.shuju));
          }
          that.gao = true
          that.$router.push({ name: 'shequinfo',params:{ id: a } })
        },
        //  处理时间
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
        //处理内容的
        chuzi(a){
          // console.log(a)
          if(a.length>12){
           return a.substr(0,12)+'...'
          }else{
            return a
          }
        },
        pkk(){
          let that = this
          let dom = that.$refs.retu;
          console.log('图片的可用宽：'+dom.offsetWidth)
          that.tuk = dom.offsetWidth
        },
        nashu(){
            let that = this
            let hshu = localStorage.getItem('remashu');
            if(hshu){
              console.log('拿取缓存')
              that.shuju = JSON.parse(hshu)
              console.log(that.shuju)
              return
            }
          console.log('没缓存 自己取')
            that.ss1 = true
            that.axios.post(that.surl+'/getRemindList?'+'token='+that.token).then(response => {
              that.ss1 = false
              console.log(response.data)
              that.shuju = response.data.reverse()
              localStorage.setItem("remashu",JSON.stringify(that.shuju));
            }).catch(function (error) {
              that.ss1 = false
              console.log(error);
            })
          },
        fanhui1(){
          console.log('清楚消息缓存')
            //清楚消息缓存
            this.$store.dispatch('qingneis')
            //具体的消息
            localStorage.removeItem('remashu')
            this.$router.push('/shequ1')
          }
      }
    }
</script>

<style scoped>
.hezi{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.yin{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
