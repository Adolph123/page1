<template>
  <div style="background:#F5F5F5;" :style="{ height: bodyHeight + 'px' }">
    <div class="back1" style="background:#fff;">
      <img src="@/assets/back.png" alt="" class="back2" v-on:click="fanhui1">
    </div>
    <div style="height:70px;"></div>
    <div style="padding:18px;box-sizing:border-box;background:#fff;">
      <p style="font-size: 16px">意见 *</p>
      <div style="padding:12px;box-sizing:border-box;background:#F5F5F5;margin-top:8px;">
            <textarea placeholder="请输入您的宝贵的意见，我们将及时处理并优化产品，给您最好的体验"
                      class="dz_textarea zhu" rows="10" maxlength="120" v-model="yi">
        </textarea>
      </div>
      <div style="height:10px;"></div>
    </div>
    <div style="height:15px;"></div>
    <div style="padding:18px;box-sizing: border-box;background:#fff;font-size: 16px;">
      <p>联系方式 (选填)</p>
      <div style="padding:12px;box-sizing: border-box;background:#F5F5F5;margin-top:8px;">
        <input type="text" class="in2 input-test" v-model = "xi" placeholder="微信/QQ/邮箱">
      </div>
      <div style="height:10px;"></div>
    </div>
    <div style="padding:15px;box-sizing:border-box;">
      <div class="ti1 backcolors"  v-on:click="tijiao">
        提交
      </div>
    </div>
    <!--弹窗-->
    <toast v-model="ss1"  type="cancel" :time="1500" is-show-mask text="请填写相关信息!" width="18em"></toast>
    <toast v-model="ss2"  :time="1800" is-show-mask text="提交成功!感谢您的建议" width="12em"></toast>
  </div>
</template>

<script>
  import { Group, Cell,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,XTextarea} from 'vux'
  export default {
    name: "faad",
    components:{
      Cell,Group,XHeader, XInput, XButton,Toast,Confirm,Actionsheet,Loading,XTextarea
    },
    data(){
      return {
        bodyHeight:'',
        yi:"",
        xi:'',
        ss1:false,
        ss2:false,
      }
    },
    mounted(){
        if(window.plus){
            window.plus.navigator.setStatusBarStyle('dark')
        }
      let that = this
      that.bodyHeight=document.documentElement.clientHeight
      if(window.plus) {
        plus.navigator.setStatusBarBackground("#fff");
      }
    },
    methods:{
      fanhui1(){
        this.$router.push('/user')
      },
      tijiao(){
        let that = this
        if(!that.yi || !that.xi){
          that.ss1 = true
          return
        }
        that.ss2 = true
        that.yi = ''
        that.xi = ''
      }
    }
  }
</script>

<style scoped>
  .ti1{
    height:38px;width:100%;text-align:center;line-height:38px;color:white;border-radius:6px;margin-top:20px;
    font-size: 16px;
  }
  .input-test::-webkit-input-placeholder{
    color:#8C8B8B;font-weight: 400;font-size: 14px;
  }
  .input-text::-moz-placeholder{
    color:#8C8B8B;font-weight: 400;
  }
  .input-text:-ms-input-placeholder{
    color:#8C8B8B;font-weight: 400;
  }
  .in2{
    border:none;outline:none;color:#8C8B8B;width:100%;background:#F5F5F5;
  }
  .zhu{
    width:100%;
    font-size:14px;font-weight: 400;
    background:#F5F5F5;
    border:none;
    line-height:1.5;
    height:80px;outline:none;resize:none;
    color:#8C8B8B;
  }
  .dz_textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color:#8C8B8B;
  }
  .dz_textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color:#8C8B8B;
  }
  .dz_textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color:#8C8B8B;
  }
  .dz_textarea::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color:#8C8B8B;
  }
</style>

