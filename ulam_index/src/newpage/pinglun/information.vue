<template>
  <div style="position:fixed;z-index: 30000;left: 0;top: 0;width: 100%;background: #fff;height: 100vh">
    <!--   头部返回   -->
    <div style="background: #9a55ff">
      <div class="mheaderheader">
        <div style="position: absolute;left: 0;z-index: 100" @click="toSetup">
          <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
        </div>
        <div style="height: 30px;">

        </div>
        <div style="position: absolute;width: 100%;left: 0;">
          <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span @click="isfidBox = true" style="font-size: 16px;color: #fff"
                  :style="{color:isfidBox?'#fff':'rgb(136, 136, 136)'}"> 社区动态 </span>
            <span style="width: 30px;"></span>
            <span @click="isfidBox = false" style="font-size: 16px;color: #fff"
                  :style="{color:!isfidBox?'#fff':'rgb(136, 136, 136)'}"> 应用通知 </span>
          </div>
        </div>

      </div>
    </div>

    <div class="title"
         :style="{boxShadow:isfidBox?'0px 1px 1px #f5f5f5':0,borderBottom:!isfidBox?'1px solid #f5f5f5':0}">
      <div class="titleItem" v-for="item in title" :key="item.id" @click="totitle(item.id)"
           :class="{titleItemactive:titleid == item.id}">{{item.name}}
      </div>
    </div>
    <scroll class="main-content">
      <div>
        <div v-for="(item,index) in article">
          <div style="padding: 0px 20px 15px">
            <div style="display: flex;justify-content: end;align-items: center;margin-bottom: 15px;">
              <img :src="item.comment.header.length>2?surl+item.comment.header:'./static/tx.png'"
                   style="width:35px;border-radius:50%;margin-top:5px;height: auto"
                   alt="">
              <p style="width: 10px"></p>
              <div>
                <div style="color: rgb(68, 68, 70);font-size: 14px;font-weight: 400;;line-height: 20px">
                  {{item.comment.nick}}
                </div>
                <div style="font-size: 10px;color: rgb(167, 167, 167);line-height: 14px">{{
                  timestampToTime(parseInt(item.comment.created)*1000) }}
                </div>
              </div>
            </div>
            <div style="text-indent: 15px">
              {{item.comment.content}}
            </div>
          </div>

        </div>

        <div v-if="article.length == 0" style="line-height: 50px;display: flex;align-items: center;justify-content: center">
          暂无记录
        </div>
      </div>
    </scroll>



  </div>
</template>

<script>
    import scroll from "../../base/scroll/scroll";
    export default {
        name: "information",
        components:{scroll},
        data() {
            return {
                title: [
                    {id: 1, name: '评论'},
                    {id: 2, name: '点赞'},
                    {id: 3, name: '系统'},
                ],
                isfidBox: true,
                titleid: 1,
                article: [

                    {
                        article: {author: "15117948917", content: "，，，，", id: 1183, image: "", is_redpacket: 0},
                        comment: {
                            content: "还差",
                            created: 1591597960,
                            header: "/header/default.jpg",
                            nick: "我管你",
                            user: "13504957445"
                        }
                    },
                    {
                        article: {author: "15117948917", content: "，，，，", id: 1183, image: "", is_redpacket: 0},
                        comment: {
                            content: "S",
                            created: 1591598878,
                            header: "/header/default.jpg",
                            nick: "小胖子",
                            user: "17601077918"
                        }
                    }
                ],
                surl:this.apiurlCommunity,
            }
        },
        created() {
            //请求最新数据列表
            let token = localStorage.getItem('newtoken');
            console.log(this.$route.query, '@@@@@@@@@@@@@@@@@@@')
            if (token) {
                this.token = token
                this.getinformation();

            } else {
                this.natoken()
            }

        }
        ,
        methods: {
            timestampToTime(inputTime){
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
            // 用户登录拿取token
            natoken() {
                let that = this
                that.axios.get(this.apiurlCommunity+'/login/' + that.users.hu + '/' + that.users.mima).then(response => {
                    // console.log(response.data)
                    if (response.data.status == "fail") {
                        alert("登录状态失效 请重新登录")
                        return false
                    } else {
                        that.token = response.data.code
                        localStorage.setItem("newtoken", that.token);
                        //拿取数据
                        that.getinformation()
                        //  拿取用户社区提醒
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
            ,
            //请求最新数据列表
            getinformation() {
                let that = this;
                let data = {};
                that.axios.post(this.apiurlCommunity+'/getRemindList?token=' + that.token, data,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    console.log(res, '刷新数据')
                    if (res.data) {
                        //有数据
                        this.article = res.data
                    } else {
                        //暂无数据
                        this.article = []
                    }

                })
            }
            ,
            //标题切换
            totitle(titleid) {
                this.titleid = titleid;
            }
            ,
            //头部返回
            toSetup() {
                this.$emit('heidinformation')
            }
        }
    }
</script>

<style scoped>
  .main-content{
    overflow: hidden;
    position: relative;
    height: 85vh;
  }
  .mheaderheader {
    padding: 30px 0 1%;
    width: 92%;
    display: flex;
    margin: 0 auto;
    position: relative;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }


  .title {
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 36px;
    padding: 3px auto 2px;
    background: #fff;
  }

  .titleItem {
    border-bottom: 1px solid #fff;
    width: 50%;
    color: rgb(136, 136, 136);
    font-size: 16px;
  }

  .titleItemactive {
    border-bottom: 1px solid #9a55ff;
    color: #9a55ff;
    font-size: 16px;
  }
</style>
