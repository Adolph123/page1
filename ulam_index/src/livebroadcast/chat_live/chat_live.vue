<template>
  <div class="chat_live" :style="{height:heights+'px'}">


    <div style="height: 90%;display: flex;align-items: center;justify-content: center">
      正在开发，敬请期待
    </div>

    <!-- 底部导航 -->
    <div style="position: fixed;left: 0;bottom: -1px;border-top: 1px solid rgb(247, 244, 244);width: 100%;height: 50px;background: #fff;z-index: 100">
      <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;height: 48px">

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/livebroadcast')">
          <img src="@/assets/lives/1_1.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 7px">发现</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #9a55ff" >
          <img src="@/assets/lives/2.png" alt="" style="width: 20px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 8px">信息</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999;position: relative" @click="$router.push('/addLive')">
          <img src="@/assets/lives/3.png" alt=""
               style="
               width:98%;height: auto;display: block;margin: -19px auto 0;position: relative;z-index: 1">
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/followLive')">
          <img src="@/assets/lives/4_4.png" alt="" style="width: 21px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top:7px">关注</p>
        </div>

        <div style="width: 25%;text-align: center;font-size: 12px;color: #999" @click="$router.push('/myorderLive')">
          <img src="@/assets/lives/5_5.png" alt="" style="width: 19px;height: auto;display: block;margin: 0 auto">
          <p style="padding-top: 7px">我的</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "chat_live",
        data(){
          return{
              heights:0,
          }
        },
        created() {
            this.heights = document.documentElement.clientHeight;
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }
        }
    }
</script>

<style scoped>
  .chat_live{
    background: #fff;
    width: 100%;
  }
</style>
