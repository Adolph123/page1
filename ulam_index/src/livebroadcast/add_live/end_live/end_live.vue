<template>
    <div class="end_live" >
      <div style="height: 70px"></div>
<!--      头像-->
      <div style="display: flex;justify-content: center;align-items: center">
        <img :src="userIetm.Header" alt="" style="border-radius: 50%;display: block;width: 70px;height: 70px;background: #fff;padding: 2px;">
      </div>
      <div style="height: 15px"></div>
<!--     主播名    -->
      <div style="display: flex;justify-content: center;align-items: center">
        <span>{{userIetm.Nick}}</span>
      </div>
      <div style="height: 15px"></div>
      <!--     主播名    -->
      <div style="display: flex;justify-content: center;align-items: center">
<!--        <span>直播时长{{timers}}</span>-->
      </div>
      <div style="height: 15px"></div>
<!--      收益    -->
      <div style="text-align: center">
        <div style="font-size: 12px;color: #888;line-height: 35px">本场收益</div>
        <div style="font-size: 30px;color: rgb(211, 135, 255);font-weight: 700">{{item.TotalGift}}<span style="font-size: 12px;font-weight: 500;color: #9a55ff;">ULAM</span> </div>
      </div>
      <div style="height: 35px"></div>
<!--      人数   粉丝   评论    -->
      <div style="display: flex;justify-content: center;align-items: center;font-size: 12px;line-height: 30px">
        <div  style="padding: 0 40px;" >
          <span style="font-size: 20px;font-weight: 700">{{item.Count}}</span>
          <div>人数</div>
        </div>
        <div style="width: 1px;background: #888;height: 50px;transform:rotate(20deg)">

        </div>
        <div style="padding: 0 40px;">
          <span style="font-size: 20px;font-weight: 700">{{item.NewFans}}</span>
          <div>粉丝</div>
        </div>
        <div style="width: 1px;background: #888;height: 50px;transform:rotate(20deg)">

        </div>
        <div style="padding: 0 40px;">
          <span style="font-size: 20px;font-weight: 700">{{item.TalkCount}}</span>
          <div>评论</div>
        </div>

      </div>
      <div style="height: 65px"></div>
<!--      完成    -->
      <div style="display: flex;justify-content: center;align-items: center">
          <div class="botmOk" style="width: 70%;" @click="tolivebroadcast">直播完成</div>
      </div>
    </div>
</template>

<script>
    import {getliveData} from '@/api/index';
    export default {
        name: "end_live",
        components:{},
        data(){
            return{
                item:{},
                userIetm:{},
                timers:0
            }
        },
        mounted(){
          this._getliveData(this.$route.query.Name);

            this.timer = this.$route.query.timer;//直播总时长
          this.userIetm = {
              Nick: JSON.parse(localStorage.getItem('user')).name,
              Header: localStorage.getItem('tellertx'),
          }
        },
        methods:{
            //直播时长
            timersadd(set) {
                let xianzai = Date.parse(new Date());
                console.log(xianzai,'xianzai/this.set',set);
                let micro_second = parseInt(xianzai) - parseInt(set);
                var second = Math.floor(micro_second / 1000);
                var day = Math.floor(second / 3600 / 24);
                var hr = Math.floor(second / 3600 % 24);
                var min = Math.floor(second / 60 % 60);
                var sec = Math.floor(second % 60);
                hr = hr < 10 ? ("0" + hr) : hr;
                min = min < 10 ? ("0" + min) : min;
                sec = sec < 10 ? ("0" + sec) : sec;
                this.timers = parseInt(hr) > 0 ? hr + ':' + min + ":" + sec : min + ":" + sec;
            },
            //跳转直播首页
            tolivebroadcast(){
                this.$router.push('/livebroadcast');
            },
            //直播结束数据
            _getliveData(Name){
                let apiurl = 'v1/live/live-info';
                let data = {Name};
                getliveData(apiurl, data).then(res => {

                    this.item = res.data;

                    console.log(JSON.stringify(res), '直播结束数据');
                })
            }

        }
    }
</script>

<style scoped>
  .end_live{
    width: 100%;height: 100%;
    position: fixed;left: 0;top: 0;
    z-index: 3100;color: #fff;text-align: center;
	  background: linear-gradient(to bottom right, #595353 , #000);
  }

</style>
