<template>
    <div>
      <div style="height: 40vh;"></div>
      <div style="font-size: 30px;text-align: center;color: #999">
        即将开放
      </div>
      <!--固定底部按钮-->
      <tabbar style="position:fixed;">
        <tabbar-item link="/">
          <img slot="icon" src="@/assets/newpage/wen.png">
          <span slot="label" class="tabse">矿机</span>
        </tabbar-item>
        <tabbar-item link="/homepage">
          <img slot="icon" src="@/assets/sc1.png" />
          <span slot="label" style="color:#9a55ff;" >商城</span>
        </tabbar-item>
        <tabbar-item link="/wallet">
          <img slot="icon" src="@/assets/newpage/kj.png">
          <span slot="label" class="tabse">矿机</span>
        </tabbar-item>
        <tabbar-item  link="/user">
          <img slot="icon" src="@/assets/newpage/me.png">
          <span slot="label" class="tabse" >我的</span>
        </tabbar-item>
      </tabbar>
    </div>
</template>

<script>
    import {Rater,Flexbox, FlexboxItem,Group,Cell,XButton,Confirm,Icon,Loading,Popup,Divider,XInput,Toast,Alert,Tabbar,TabbarItem,InlineLoading}from 'vux'
    export default {
        name: "shangcheng",
        components:{Rater,Flexbox, FlexboxItem,Group,Cell,XButton,Confirm,Icon,Loading,Popup,Divider,XInput,Toast,Alert,Tabbar,TabbarItem,InlineLoading},
        mounted() {
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }
        }

    }
</script>

<style scoped>

</style>
