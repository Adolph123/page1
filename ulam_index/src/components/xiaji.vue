<template>
  <div style="background:#F5F5F5;position: fixed;z-index: 1" :style="{ height: bodyHeight + 'px' }">
    <div style="position:fixed;top:0px;width:100%;z-index: 1">

      <!--    顶部返回-->
      <div  >
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100;left: 12px" @click="fanhui1">
            <img src="@/assets/back.png" alt="" style="width: 11px;height: auto;display: block">
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









<!--      <div style="height:70px;"></div>-->
      <div>
        <div style="display: flex;width: 100%;justify-content: space-between;background: #fff">
          <div class="title" :class="{activetitle:zongliang==1}" @click="onItemClick(1)">全部推广</div>
<!--          <div class="title"  :class="{activetitle:zongliang==2}" @click="onItemClick(2)">推广贡献值</div>-->
          <div class="title" :class="{activetitle:zongliang==3}" @click="onItemClick(3)">直推矿主奖励</div>
        </div>

<!--        <tab bar-active-color="#9a55ff" active-color="#9a55ff">-->
<!--          <tab-item selected @on-item-click="onItemClick(1)">全部推广</tab-item>-->
<!--&lt;!&ndash;                    <tab-item @on-item-click="onItemClick(2)">推广贡献值</tab-item>&ndash;&gt;-->
<!--          <tab-item @on-item-click="onItemClick(3)">直推矿主奖励</tab-item>-->
<!--        </tab>-->

      </div>

      <div v-if="zongliang == 1" style="height:40px;line-height:40px;background:#fff;width:100%;">

        <div style="font-size:14px;color:#170202;display: flex;align-items: center;justify-content: space-between;padding: 0 25px;">
          <div style="display: flex;align-items: center;"><span>一级人数&nbsp;</span><span style="color:rgb(142, 130, 239);font-size: 20px">{{shuju.length}}</span></div>
          <div style="display: flex;align-items: center;"><span>推广量&nbsp;</span><span style="color: rgb(142, 130, 239);font-size: 20px">{{zshu.miner_amount}}</span></div>
        </div>
      </div>
      <div v-if="zongliang == 3" style="height:60px;line-height:60px;background:#fff;width:100%;">
        <div style="font-size:14px;color:#170202;display: flex;align-items: center;justify-content: space-between;padding: 0 25px;">
          <div style="display: flex;align-items: center;"><span>直接推广矿主&nbsp;</span><span style="color: #9a55ff;font-size: 20px">{{zshu.miner_direct_num}}</span></div>
          <div style="display: flex;align-items: center;"><span>间接推广矿主&nbsp;</span><span style="color: #9a55ff;font-size: 20px">{{zshu.miner_num-zshu.miner_direct_num}}</span></div>
        </div>
      </div>
      <div v-if="zongliang == 2" style="height:41px;line-height:60px;background:#fff;width:100%;">
        <div class="buju" style="font-size:17px;color:#170202;">

          <div style="float: left;">45天内推广{{mingcheng}}总量：</div>
          <div style="float: left;"><span class="bzi1">{{miner_sum}}</span></div>
        </div>
      </div>
      <div v-if="zongliang == 2" style="height:30px;line-height:60px;background:#fff;width:100%;">
        <div class="buju" style="font-size:12px;font-weight: 200;color:#535353;">
          <div style="float: top;margin-top:-20px;position: fixed;">每天十点统计一次</div>
        </div>
      </div>
      <div v-if="zongliang == 1" style="width:100%;">
        <!--        <div style="height:12px;width:100%;background:#f5f5f5;"></div>-->
        <div style="padding: 0 30px 10px; box-sizing:border-box;font-size:12px;color:#999;line-height: 16px;background: #fff;
        border-bottom: 1px solid #f5f5f5">
          (每周一晚八点根据个人推广贡献值占总贡献值的比例瓜分矿池推广奖励)
<!--          <p style="font-size:12px;color:#000;margin-top:5px;">距离瓜分奖励还剩-->
<!--            <span style="color: #e20661" v-if="dtime">{{dtime}}</span>-->
<!--            <span v-else><inline-loading></inline-loading></span>-->
<!--          </p>-->
        </div>
      </div>
    </div>








    <div style="height: 104px"></div>
    <scroll class="main-content">
      <div>
        <div v-if="zongliang == 1" style="height:100px;"></div>
        <div v-if="zongliang == 2" style="height:40px;margin-top: 10%"></div>
        <div v-if="zongliang == 3" style="height: 60px"></div>


        <div v-if="zongliang == 1" v-for="(todo,index) in shuju" v-bind:key="todo.id" class="buju"
             style="font-size:14px;background:#f5f5f5;">
          <div>
            <div style="color:#7c7b7b;">
              <div style="margin-left:15px;height:40px;line-height:40px;"
                   v-if="index?goshow(todo.bi,shuju[index-1].bi):true">
                时间： {{todo.bi}}
              </div>
              <div v-else style="height:15px;"></div>
            </div>
            <div style="width:100%;padding:8px 10px;box-sizing: border-box;background:#fff;border-radius:6px;">
              <flexbox>
                <flexbox-item :span="3">
                  <div><img src="@/assets/tx.png" alt="" style="width:80%;"></div>
                </flexbox-item>
                <flexbox-item>
                  <div>
                    <p class="zhei">{{todo.label}}</p>
                    <p v-if="todo.miner_if==2" class="zhei" style="color: red">矿主</p>
                    <p class="hhei" style="padding: 3px 0;">推广量: <span class="zhei">{{todo.miner_amount}}</span></p>
                    <p class="hhei">手机号: <span class="zhei">{{todo.mobile}}</span></p>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>

        <div v-if="zongliang == 2" v-for="(todo,index) in shuju" v-bind:key="todo.id" class="buju"
             style="font-size:14px;background:#f5f5f5;">
          <div>
            <div style="width:120%;padding:15px;background:#fff;margin-left: -9%;margin-top: 1%">
              <flexbox>
                <flexbox-item>
                  <div>
                    <p class="hhei" style="float: left">日期: <span class="zhei">{{todo.bi}}</span></p>
                    <p class="hhei" style="float: left;padding: 7px 0">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp增加值: <span
                      class="zhei">{{todo.amount}}</span></p>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>

        <div v-if="zongliang == 3" v-for="(todo,index) in kuangzhu" v-bind:key="todo.id" class="buju"
             style="font-size:14px;background:#f5f5f5;">
          <div>
            <div style="color:#7c7b7b;">
              <div style="margin-left:15px;height:40px;line-height:40px;">
                时间： {{formatDateTime(todo.time)}}
              </div>
            </div>
            <div style="width:100%;padding:15px;box-sizing: border-box;background:#fff;border-radius:20px;">
              <flexbox>
                <flexbox-item :span="3">
                  <div><img src="@/assets/tx.png" alt="" style="width:80%;"></div>
                </flexbox-item>
                <flexbox-item>
                  <div>
                    <p class="zhei">{{todo.miner == 1?"矿池":"矿主"}}</p>
                    <!--                <p class="hhei">推广量: <span class="zhei">{{todo.miner}}</span></p>-->
                    <p class="hhei">手机号: <span class="zhei">{{todo.mobile}}</span></p>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>

        <div style="height: 20px"></div>
      </div>
    </scroll>


    <div style="height:60px;background:#f5f5f5;"></div>
    <loading :show="ss1" text="加载中.."></loading>
  </div>
</template>

<script>
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
        InlineLoading,
        Tab,
        TabItem
    } from 'vux'
    import scroll from "../base/scroll/scroll";

    export default {
        name: "OrgTreeNode",
        components: {
            scroll,
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
            InlineLoading,
            Tab,
            TabItem
        },
        data() {
            return {
                ss1: false, shu: '', url: '', users: '', menus2: {menu1: '横版显示', menu2: '竖版显示'},
                show2: false, bodyHeight: '', shuju: '', zshu: '',
                //false 横向 -竖向
                horizontal: false,
                //false 不能点击缩放 有+ - 号
                collapsable: true, expandAll: true, labelClassName: 'bg-orange', dian: '', dtime: '',
                miner_sum: '', zongliang: 1, mingcheng: '', kuangzhu: ''
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
        mounted() {
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }


            let that = this;

            that.bodyHeight = document.documentElement.clientHeight
            let message = localStorage.getItem('user');
            message = JSON.parse(message)
            if (!message) {
                //跳转登陆
                that.$router.push('/zhu')
                return
            }
            that.users = message
            that.ss1 = true
            that.login()
            that.countTime()

        },
        destroyed() {
            this.fanhui1()
        },
        methods: {
            //转换时间
            formatDateTime(inputTime) {
                var date = new Date(parseInt(inputTime) * 1000);
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
                return y + '/' + m + '/' + d ;
            },
            _getminerreward() {
                let that = this;
                that.axios.post(that.ull + '/miner_reward',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(res => {
                    console.log('直推狂主', res)
                    that.kuangzhu = res.data
                })
            },
            onItemClick(e) {
                let that = this
                if (e == 1) {
                    this.login()
                    this.zongliang = 1
                } else if (e == 2) {
                    this.login1()
                    this.mingcheng = '贡献值';
                    this.zongliang = 2
                } else if (e == 3) {
                    this.login2()
                    this.mingcheng = '矿主';
                    this.zongliang = 3;
                    this._getminerreward();
                }
            },
            countTime() {
                let that = this
                //获取当前时间
                let time = new Date();
                console.log(time.getDay())
                let nowTime = time.getTime()
                let week = time.getDay()
                let year = time.getFullYear(); //获取年份
                let day = time.getDate(); //获取几号
                let month = time.getMonth() + 1;
                let fullday = 0;//定义一个月多少天
                //判断是否是闰年
                if (!(year % 4)) {//可以整除，是闰年
                    //判断月份是30天还是31天
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        fullday = 31;
                    } else if (month == 2) {
                        fullday = 29;
                    } else {
                        fullday = 30;
                    }
                } else {//不可以整除，不是闰年
                    //判断月份是30天还是31天
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        fullday = 31;
                    } else if (month == 2) {
                        fullday = 28;
                    } else {
                        fullday = 30;
                    }
                }
                //根据今天周几来判断距离下一次周1还有几天
                let distance_day = 0;
                switch (week) {
                    case 1:
                        distance_day = 0;
                        break;
                    case 2:
                        distance_day = 6;
                        break;
                    case 3:
                        distance_day = 5;
                        break;
                    case 4:
                        distance_day = 4;
                        break;
                    case 5:
                        distance_day = 3;
                        break;
                    case 6:
                        distance_day = 2;
                        break;
                    case 0:
                        distance_day = 1;
                        break;
                }
                //计算下一个周1的年月日
                let end_time = '';
                if (day + distance_day > fullday) {
                    let next_distance = Math.abs(fullday - (day + distance_day)); //计算超过本月下周二是下个月的几号
                    end_time = year + '/' + (month + 1) + '/' + next_distance + ' 20:00:00';
                } else {
                    end_time = year + '/' + month + '/' + (day + distance_day) + ' 20:00:00';
                }

                //倒计时
                let endtime_sjc = Date.parse(end_time); //计算时间戳
                let time_distance = (endtime_sjc - nowTime) / 1000; //计算现在到结束时间的时间戳

                function countTime(time_distance) {
                    time_distance--;
                    if (time_distance > 0) {
                        let getDay = Math.floor(time_distance / (60 * 60 * 24));//天
                        let getHour = Math.floor((time_distance - getDay * 60 * 60 * 24) / (60 * 60));//小时
                        let getMinute = Math.floor((time_distance - getDay * 60 * 60 * 24 - getHour * 60 * 60) / 60);//分钟
                        let getSecond = Math.floor(time_distance - getDay * 60 * 60 * 24 - getHour * 60 * 60 - getMinute * 60);//秒

                        that.dtime = getDay + '天' + getHour + '时' + getMinute + '分' + getSecond + '秒'

                    } else {
                        that.dtime = '奖励正在发放中.';
                    }
                    setTimeout(function () {
                        countTime(time_distance);
                    }, 1000);
                }

                countTime(time_distance);
            },
            goshow(a, b) {
                // console.log(a,b)
                if (a == b) {
                    return false
                } else {
                    return true
                }
            },
            gotime(a, b) {
                let data = new Date(parseInt(a) * 1000).toLocaleString('chinese', {hour12: false})
                let new1 = data.substr(0, 10)
                b.bi = new1
                return new1
            },
            ding() {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            },
            xian1(a) {
                this.dian = a
            },
            xian2() {
                this.dian = ''
            },
            login() {
                let that = this;
                that.axios.post(that.ull + '/search_expand_new',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(response => {
                    console.log(response.data)
                    that.ss1 = false
                    //将个人矿机数据遍历
                    that.zshu = response.data
                    let bc = response.data.children
                    if (!bc) {
                        return
                    }
                    bc = bc.sort(function (a, b) {
                        return b.time_reg - a.time_reg
                    })
                    for (let i = 0; i < bc.length; i++) {
                        let data = new Date(parseInt(bc[i].time_reg) * 1000).toLocaleString('chinese', {hour12: false})
                        bc[i].bi = data.split(" ")[0]
                    }
                    that.shuju = bc
                    console.log(that.shuju, '@@@@@@@@@@@@@@@@@@@@@@@@@@')
                }).catch(function (error) {
                    that.ss1 = false
                    console.log(error);
                })
            },
            login1() {
                let that = this
                that.axios.post(that.ull + '/search_add',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(response => {
                    console.log(response.data)
                    that.ss1 = false
                    //将个人矿机数据遍历
                    that.miner_sum = response.data.miner_sum
                    let bc = response.data.data

                    if (!bc) {
                        return
                    }

                    for (let i = 0; i < bc.length; i++) {
                        let data = new Date(parseInt(bc[i].time_time) * 1000).toLocaleString('chinese', {hour12: false})
                        bc[i].bi = data.split(" ")[0]
                    }
                    that.shuju = bc
                    console.log("that.shuju.miner_sum")
                    console.log(bc)
                }).catch(function (error) {
                    that.ss1 = false
                    console.log(error);
                })
            },
            login2() {
                let that = this
                that.axios.post(that.ull + '/search_miner_num',
                    {
                        "mobile": parseInt(that.users.hu),
                        "password": that.users.mima
                    }
                ).then(response => {
                    console.log(response.data)
                    that.ss1 = false
                    //将个人矿机数据遍历
                    that.miner_sum = response.data.miner_sum
                    let bc = response.data.data

                    if (!bc) {
                        return
                    }

                    for (let i = 0; i < bc.length; i++) {
                        let data = new Date(parseInt(bc[i].time_time) * 1000).toLocaleString('chinese', {hour12: false})
                        bc[i].bi = data.split(" ")[0]
                    }
                    that.shuju = bc
                    console.log("that.shuju.miner_sum")
                    console.log(bc)
                }).catch(function (error) {
                    that.ss1 = false
                    console.log(error);
                })
            },
            fanhui1() {
                this.$router.push('/user')
            }
        }
    }
</script>

<style scoped>
  .main-content {
    height: 85vh;
    overflow: hidden;
    position: relative;
  }
  .title{
    color: rgb(136, 136, 136);
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    width: 100%;
    text-align: center;
  }
  .activetitle{
    font-size: 16px;
    color: rgb(154, 85, 255);
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid rgb(154, 85, 255);
  }
  .zhei {
    color: #030303;
  }

  .hhei {
    color: #7c7b7b;
  }

  .buju {
    padding: 0 20px;
    box-sizing: border-box;
  }

  .zi1 {
    color: #777575;
    font-size: 14px;
    margin-top: 10px;
  }

  .bzi1 {
    font-size: 28px;
    color: #9a55ff;
    margin-left: 8px;
  }

  .jiji {
    float: left;
    width: 50%;
    background: #fff;
    height: 70px;
    font-weight: 700;
    font-size: 17px;
  }

  .weiji {
    float: left;
    width: 50%;
    background: #fff;
    height: 70px;
    font-weight: 700;
    font-size: 17px;
  }

  .org-tree-node-label {
    white-space: nowrap;
  }

  .bg-white {
    background-color: white;
  }

  .bg-orange {
    background-color: orange;
  }

  .bg-gold {
    background-color: gold;
  }

  .bg-gray {
    background-color: gray;
  }

  .bg-lightpink {
    background-color: lightpink;
  }

  .bg-chocolate {
    background-color: chocolate;
  }

  .bg-tomato {
    background-color: tomato;
  }
</style>
