<template>
  <div style="width: 100%;height: 100vh">
    <!--    顶部返回-->
    <div>
      <div class="backcolors" style="position: fixed;left: 0;top: 0;width: 100%;z-index: 10000">
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100" @click="backs">
            <img src="@/assets/2_03.png" alt="" style="width: 30px;height: auto;display: block">
          </div>
          <div style="height: 30px;">
          </div>
          <div style="position: absolute;width: 100%;left: 0;">
            <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
            <span style="font-size: 16px;color: #fff">
              实名认证
            </span>
            </div>
          </div>

        </div>
      </div>
      <div style="height: 20px"></div>


      <div v-if="isloading" style="display: flex;align-items: center;justify-content: center;height: 45vh;font-size: 16px;line-height: 20px;position: fixed;top: 0;width:100%">
        <i class="el-icon-loading" style="font-size: 16px"></i>  页面加载中
      </div>
<!--      <div v-if="isflag" style="padding: 0 15px">-->
<!--        <div style="height: 80px"></div>-->


<!--        <div style="height: 30px"></div>-->
<!--        <div style="font-size: 14px" v-if="confirm == 0 && $route.query.id == 1">-->
<!--          友情提示认证成功会收取 <span style="font-size: 16px;color: red">{{give_jifen}}ulam</span>-->
<!--          的保证金,请确保钱包余额，余额不足会造成认证失败,确定认证吗？(保证金可退还)-->
<!--        </div>-->


<!--        <div style="height: 40px"></div>-->
<!--        <div style="display: flex;justify-content: space-between">-->
<!--          <div @click="backs" class="botmNO" style="">取 消</div>-->
<!--          <div style="width: 40px;"></div>-->
<!--          <div @click="renzhengs" class="botmOk">确 定</div>-->
<!--        </div>-->
<!--      </div>-->

      <div v-show="!isflag" style="width: 100%;" :style="{height:heights-20+'px'}">


        <div v-show="!(errtext == '')" style="height: 500px;display: flex;align-items: center;justify-content: center;position: fixed;top: 0;width:100% ">
          {{errtext}}
        </div>

        <iframe id="looklive"  allow="microphone;camera;midi;encrypted-media;"   :src="url" style="width: 100%;border: 0;margin: 0;padding: 0"
                :style="{height:heights-20+'px'}"></iframe>

      </div>
    </div>


  </div>
</template>

<script>
    export default {
        name: "successful",

        data() {
            return {
                isflag: false,
                isloading: false,
                heights: 0,
                confirm: 0,
                give_jifen: 0,
                errtext: "",
                url: '',
                types: '',
                auth: 0,
                give_auth: 0,
            }
        },
        created() {
            this.heights = document.documentElement.clientHeight;
            this.auth = JSON.parse(localStorage.getItem('user')).auth;
            this.confirm = JSON.parse(localStorage.getItem('user')).confirm;
            if (this.$route.query.id == 1) {
                this.types = "shop"
            } else if (this.$route.query.id == 2) {
                this.types = "lives"
            }
            this.isloading = true;
            this._getinfo()
        },
        mounted(){
            let box = document.getElementById('looklive');
            if(box){
                box.allow = 'microphone;camera;midi;encrypted-media;'
            }

        },
        methods: {
            backs() {
                this.$router.push('/user')
            },
            _get_give_jifen() {
                let config = {};
                let param = {};
                this.axios.get(this.apiurl+'/get_give_jifen', param, config).then(res => {

                    console.log(res.data.give_jifen, '保证金');
                    this.give_jifen = res.data.give_jifen;
                })
                this.axios.get(this.apiurl+'/get_shiming_ulam', param, config).then(res => {

                    console.log(res.data.give_jifen, '扣除');
                    this.give_auth = res.data.data;
                })

            },
            renzhengs() {
                this.isflag = false;

                let box = document.getElementById('looklive');
                if(box){
                    box.allow = 'microphone;camera;midi;encrypted-media;'
                }
                this._getinfo();
            },
            _getinfo() {
                let user = JSON.parse(localStorage.getItem('user'));
                let data = {
                    "mobile": parseInt(user.hu),
                    "password": user.mima,
                    "type": this.types
                };
                this.axios.post(this.apiurl+'/renzheng_new_1', data).then(res => {
                    console.log(res.data.status, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                    this.isloading = false;
                    if (res.data.status == "error") {
                        console.log('!!!!!!!!!!!!!!!!!!!!!!,错误')
                        this.errtext = res.data.error;
                    } else {
                        console.log('正确@@@@@@@@@@@@@@@@@@')
                        this.url = res.data.data
                    }

                })
            }
        }
    }
</script>

<style scoped>
  iframe body {
    margin: 0;
    padding: 0;
  }

  iframe img {
    margin: 0 auto;
    width: 100%;
    height: auto;
  }
</style>
