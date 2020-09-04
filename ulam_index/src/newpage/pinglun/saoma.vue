<template>
  <div style="position:fixed;z-index: 30000;left: 0;top: 0;width: 100%">
    <div class="back1" style="background:#fff;text-align:center;">
      <div style="color:#171717;line-height:95px;">请扫描二维码</div>
      <img src="@/assets/back.png" alt="" v-on:click="fanhui1"
           style="height:20px;position:absolute;top:39px;left:15px;">
    </div>
    <div>
      <div id="bcid" :style="{height:bodyHeight+'px'}">
        <div></div>
        <p class="tip"> </p>
      </div>
      <!--<footer>-->
      <!--<x-button  @click.native="fanhui1" :style="{ background: quan.color,color:'#fff' }">返回</x-button>-->
      <!--</footer>-->
    </div>
    <loading :show="slo" text="加载中"></loading>
    <toast v-model="cuo1"  type="cancel" :time="2000" is-show-mask text="请识别正确格式的ULAM地址！" width="18em"></toast>
  </div>
</template>
<script>
    import {XButton,Toast,XHeader,Loading}from 'vux'
    let scan = null;
    export default {
        name: "saoma",
        components:{
            XButton,Toast,XHeader,Loading
        },
        data(){
            return {
                bodyHeight:'',
                cuo1:false,
                slo:false,
            }
        },
        computed:{
            quan(){
                return this.$store.state.zuli;
            }
        },

        mounted(){
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            if(window.plus){
                window.plus.navigator.setStatusBarStyle('dark')
            }
            this.slo = true
            this.bodyHeight=document.documentElement.clientHeight
            setTimeout(() => {
                this.startRecognize()
                this.startScan()
            },300)
        },
        destroyed(){
            window.removeEventListener('popstate', this.goBack, false);
            this.closeScan1()
        },
        methods:{
            goBack(){
                this.$emit('heidsaoma')
            },
            fanhui1(){
                this.$emit('heidsaoma')
            },
            //创建扫描控件
            startRecognize(){
                let that = this;
                if (!window.plus){
                    that.fanhui1()
                    return;
                }
                // let ws = plus.webview.currentWebview();
                scan = new plus.barcode.Barcode('bcid');
                scan.onmarked = onmarked;
                //创建一个子窗口
                // createSubview();
                function onmarked(type, result, file) {
                    switch (type) {
                        case plus.barcode.QR:
                            type = 'QR';
                            break;
                        case plus.barcode.EAN13:
                            type = 'EAN13';
                            break;
                        case plus.barcode.EAN8:
                            type = 'EAN8';
                            break;
                        default:
                            type = '其它' + type;
                            break;
                    }
                    //识别出二维码信息
                    result = result.replace(/\n/g, '');
                    //识别出信息后解密判断
                    // alert(result)
                    that.panulam(result)
                    //关闭扫码
                    that.closeScan1();
                }
                // let view = null;
                // function createSubview() {
                //   view = new plus.nativeObj.View('nbutton', {
                //     top: '28%',
                //     left: '30%',
                //     width: '40%',
                //     height: '44px'
                //   }, [{
                //     tag: 'font',
                //     id: 'text',
                //     text: '请扫描二维码',
                //     textStyles: {
                //       color: '#FFFFFF'
                //     }
                //   }]);
                //   ws.append(view);
                // }
            },
            //开始扫描
            startScan(){
                if (!window.plus) return;
                scan.start();
                this.slo = false
            },
            //关闭扫描
            cancelScan() {
                if (!window.plus) return;
                scan.cancel();
            },
            //关闭条码识别控件
            closeScan(){
                if (!window.plus) return;
                scan.close();
            },
            //关闭条码识别控件
            closeScan1() {
                if (!window.plus) return;
                scan.close();
            },
            //  判断是否为ulam 地址
            panulam(a){
                let that = this
                if(that.isUlamAddr(a)){
                    that.$router.push({ name: 'tibis',params:{ id: a } })
                }else{
                    that.cuo1 = true
                    setTimeout(() => {
                        that.$router.push('/user')
                    },2000)
                }
            },
            isUlamAddr(addr) {
                // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
                let patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');
                if(patt.test(addr)){
                    return true;
                }
                return false;
            },
        }
    }
</script>

<style scoped>
  #bcid {position:fixed;width:100%;top:70px;text-align:center;background:#fff;}
  footer{margin-top:10px;z-index: 2;padding: 10px;box-sizing: border-box;}
</style>
