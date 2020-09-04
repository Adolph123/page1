<template>
  <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper" :swipe-options="{direction: 'horizontal'}">
    <div>

<!--      <div style="background:rgb(245, 245, 245);line-height: 30px;padding: 5px 0;position: absolute;width: 100%;z-index: 100" >-->
<!--        <span style="margin-left: 6%;font-size: 14px;color: #888">{{dtime}}</span>-->
<!--      </div>-->

        <div v-if="ss1" >
          <div style="height: 90px"></div>
            <div style="display: flex;justify-content: center;align-items: center">
              <div style="text-align: center">
                <div style="line-height: 30px"><i class="el-icon-loading" style="color: #000;font-size:24px"></i></div>
                <span>加载中...</span>
              </div>
            </div>
        </div>
        <div v-if="ss2" >
          <div style="height: 90px"></div>
            <div style="display: flex;justify-content: center;align-items: center">
              <div style="text-align: center">
                <div style="line-height: 30px"><i class="el-icon-loading" style="color: #000;font-size:24px"></i></div>
                <span>刷新中...</span>
              </div>
            </div>
        </div>

      <div style="height: 20px"></div>
      <div v-if="shuju" style="margin-bottom:4px;background:#fff;">
        <!--里面放内容-->
        <!--循环文章-->
        <div style="height: 40px"></div>
        <div v-for="(todo,index) in shuju1" :key="index" style="font-size:14px;word-break:break-all;">
          <div style="padding: 1px 30px 10px;box-sizing:border-box;position: relative">
            <div style="">
              <div style="width:8px;height:8px;border-radius:50%;float:left;position:absolute;top:13px;left: 5px;z-index: 1000;" class="themebg"></div>
              <div style="position: absolute;height: 100%;left: 8.5px;width: 1px;background: #f5f5f5;top: 20px"></div>
              <div style="font-weight:700;margin-top:3px;">
                <p style="color:#414344;font-weight:400;font-size:12px;line-height: 30px;margin-left: -5px">
                <span style="color: #ccc;">
                    &nbsp;{{ timestampToTime(parseInt(todo.created_at) * 1000) }}
                </span>
                </p>
              </div>
              <div style="float:left;font-weight:700;line-height:20px;margin: 3px 0">
                {{biaoti(todo.content)}}
              </div>
            </div>
            <div style="clear: both"></div>

            <div style="line-height:1.6;padding-top: 5px;color: #888">{{neir(todo.content)}}</div>
            <!--这里是分享-->
            <div style="text-align:right;font-size:14px;margin-top:4px;" class="themecolor">
              <div style="display: flex;align-items: center;justify-content: flex-end;line-height: 25px">
                <img src="@/assets/wen/fen1.png" alt="" style="width:18px;height: 18px;display: block" v-on:click="zoufen(todo)">
<!--                <span style="display: block;font-size: 12px" v-on:click="zoufen(todo)">分享</span>-->
              </div>
            </div>
          </div>
          <!--<div style="height:16px;border-bottom:1px solid #D0CECE;"></div>-->
        </div>
        <!--这里要显示加载状态-->
        <div style="height:40px;text-align:center;line-height:40px;margin-top:-10px;" v-if="limit <180">
          <div v-if="!ss1">
            <div style="line-height: 30px"><i class="el-icon-loading" style="color: #000;font-size:24px"></i></div>
            <span style="position:relative;top:2px;font-size: 14px">加载中</span>
          </div>
        </div>
        <!--<div style="height:40px;text-align:center;line-height:40px;position:fixed;bottom:0px;width:100%;background:#F5F5F5;" v-if="jiaxian">-->
        <!--<p><inline-loading></inline-loading> <span style="position:relative;top:2px;">加载中</span></p>-->
        <!--</div>-->
        <div style="height:40px;text-align:center;line-height:20px;margin-top:-10px;" v-if="limit == 180">
          <p style="font-size:14px;color:#969696;">- 已无更多 -</p>
        </div>
      </div>
      <div style="height:50px;"></div>



      <!--弹窗-->
<!--      <loading :show="ss1" text="加载中.."></loading>-->

    </div>
  </v-touch>
</template>

<script>
    // import { wScrollUp } from 'wade-ui'
    import { Group, Cell,XHeader,XInput,XButton,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading,Tabbar,TabbarItem} from 'vux'
    export default {
        name: "flash",
        components:{
           Cell,Group,XHeader, XInput, XButton,Confirm,Actionsheet,Loading,Popup,Divider,InlineLoading,Tabbar,TabbarItem
        },
        data(){
            return {
                dtime:'',
                limit:100, shuju:'',shuju1:'', jiaxian:false, zi:'加载中',
                // baseURL:'https://api.jinse.com',
                jin:false, ss1:false, ceshi:[], ceshi1:{created_at: 1571396839,
                content:"【动态 | 测试一波测试一波】就是牛逼,牛逼牛逼牛逼....."},
                ss2:false,
            }
        },
        mounted(){


            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            let arr = JSON.parse(localStorage.getItem('timeInfo'));
            if (arr.length > 0){
                this.ss1 = false;
                this.shuju1 =arr;
                this.limit = arr.length;
                this.shuju = arr;
            }else {
                this.dzacti()
            }


            document.querySelector('body').setAttribute('style', 'background-color:#ffffff;height:85%');

            //请求的文章的路劲
            //https://api.jinse.com/v4/live/list?limit=20&reading=false&source=web&sort=&flag=down&id=99999999
            let that = this;
            that.countTime();
            //回到顶部
            that.ding()
            //  监听页面滚动高度
            window.addEventListener("scroll", this.showIcon,false);




        },
        created(){
            // this.diaos(100);
            //  调取自己编的文章
            // this.dzacti()
        },
        watch:{
            ceshi(newb,oldb){
                let that = this
                if(newb && that.shuju){
                    that.ss1 = false;
                    that.sai()
                }
            },
            limit(newb,oldb){
                let that = this
                if(newb > 40 && that.shuju && that.ceshi){
                    console.log(that.shuju)
                    that.sai()
                }
            },
            jin(newb,oldb){
                let that = this;
                if(newb){
                    let a =  that.limit + 80
                    setTimeout(() => {
                        that.jin = false
                    },5000)
                    if(a >= 180){
                        that.limit = 180
                    }else{
                        setTimeout(() => {
                            that.diao(a)
                        },500)
                    }
                }
            }
        },
        destroyed(){
            window.removeEventListener('scroll',this.showIcon)
            this.limit = 40;
            this.jin = false;
            window.removeEventListener('popstate', this.goBack, false);

        },
        beforeRouteEnter(to, form, next) {

            next();
            this.diaos(100);
        },
        methods:{
            //
            jiazai(){
                this.jin = true
            },
            shuaxin(){
                this.ss2 = true;
                this.dzacti()
            },
            //
            goBack(){
                this.$emit('tagglefid')
            },
            // 执行调用
            diaos(b){
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                let that = this;

                let urls = '/v4/live/list?limit='+b+'&reading=false&source=web&sort=&flag=down&id=9999';
                // 打包要换成 没dev的 -- 这里that.baseURL 代表了https://api.biki.com/open/api/market域名

                // 本地测试 要换成下面访问请求  或者 that.baseURL +'/dev/open/api/market'
                // that.axios.get('/dev'+urls).then(response =>{
                that.axios.get('https://api.jinse.com' + urls).then(response =>{
                    console.log('资讯@@@@@@@@@@@@@@@', response.data.list[0].lives);
                    let arr = response.data.list[0].lives;
                    localStorage.setItem("timeInfo",JSON.stringify(arr));

                }).catch(function (error){
                    that.ss1 = false;
                    that.limit = 180;
                    console.log(error);
                })
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
                return h+":"+ minute;
            },

            //获取时间
            countTime(){
                let that = this
                //获取当前时间
                let time = new Date();
                console.log(time.getDay())
                let nowTime = time.getTime()
                let week = time.getDay()
                let year = time.getFullYear(); //获取年份
                let day = time.getDate(); //获取几号
                let month = time.getMonth()+1;
                let sec = time.getSeconds();
                let fullday=0;//定义一个月多少天
                let week_h = '';
                switch(week){
                    case 1:week_h = '星期一'; break;
                    case 2:week_h = '星期二';break;
                    case 3:week_h = '星期三';break;
                    case 4:week_h = '星期四';break;
                    case 5:week_h = '星期五';break;
                    case 6:week_h = '星期六';break;
                    case 0:week_h = '星期日';break;}

                that.dtime='今天   '+month+'月'+day+'日'+'   '+week_h;

            },
            dzacti(){
                let that = this;
                that.axios.get(this.apiurl+'/kuaixun_search').then(response => {
                    console.log(response.data);
                    if(response.data.length ==0){
                        that.ss1 = false;
                        that.ss2 = false;
                        that.shuju1 = that.shuju
                    }else{
                        that.ceshi = response.data
                    }
                }).catch(function (error){
                })
                that.diao(that.limit)
            },
            sai(){
                let that = this
                let newa =  that.ceshi.concat(that.shuju);
                let bc = newa.sort(function(a,b) {
                    return b.created_at - a.created_at
                })
                that.shuju1 = bc
            },
            swiperleft(){
                // this.$router.push('/user')
            },
            swiperright(){
                this.$router.push('/user')
            },
            //  进入分享
            zoufen(item){
                console.log(item,'@@@@@@@@@')
                this.$emit('toflashDetail',item)

                // this.$router.push({ name: 'kxfx',params:{ id: a } })
            },
            //  回到顶部
            ding(){
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
            // 监听页面的方法
            showIcon(e){
                let that = this
                //页面滑动的高度
                let scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
                let clientHeight = e.target.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
                let scrHeight = e.target.documentElement.scrollHeight || e.target.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
                if(scrollTop + clientHeight + 30 >= scrHeight){
                    that.jin = true
                    // if(that.jin){
                    //   // that.jiaxian = true
                    //   let a =  that.limit + 20
                    //   that.jin = false
                    //   if(a == 180){
                    //     that.limit = 180
                    //     // console.log('消失加载中')
                    //     // that.jiaxian = false
                    //   }else {
                    //     setTimeout(() => {
                    //       that.diao(a)
                    //     },500)
                    //   }
                    // }
                }
            },
            biaoti(a){
                // console.log(a)
                let b = a.indexOf('】')
                return a.substr(1,b-1)
            },
            neir(a){
                let b = a.indexOf('】')
                return a.substr(b+1)
            },
            // 执行调用
            diao(b){
                let that = this;
                console.log('第'+b+'页',that.baseURL);

                that.limit = b;
                let urls = '/v4/live/list?limit='+b+'&reading=false&source=web&sort=&flag=down&id=99999999';
                // 打包要换成 没dev的 -- 这里that.baseURL 代表了https://api.biki.com/open/api/market域名

                // 本地测试 要换成下面访问请求  或者 that.baseURL +'/dev/open/api/market'
                // that.axios.get('/dev'+urls).then(response =>{
                that.axios.get(that.baseURL + urls).then(response =>{
                    that.jiaxian = false;
                    that.ss1 = false;
                    that.ss2 = false;
                    console.log(response.data.list,'response.data.list')
                    if(response.data.list){
                        that.shuju = response.data.list[0].lives;
                    }

                    setTimeout(() => {
                        that.jin = true
                    },1000)
                    // }
                }).catch(function (error){
                    that.ss1 = false
                    that.limit = 180
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>
