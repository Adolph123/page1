<template>
  <div class="comprehensive">
    <div style="height: 40px"></div>
    <div class="box">
      <div class="title">
        <span>功能直达</span>
        <span @click="showcompr" ><i class="el-icon-close" style="font-size: 18px"></i></span>
      </div>
      <div style="height: 20px"></div>
      <div class="comprebox">

        <div class="compreboxitem"  @click="tohome">
          <div><img src="@/assets/icon/home.png" alt="" class="images"></div>
          <div style="margin-top: 10px"><span class="text">资讯</span></div>
        </div>

        <div class="compreboxitem" v-if="iscomprehen" @click="topagehome">
          <div><img src="@/assets/icon/pag.png" alt="" class="images"></div>
          <div style="margin-top: 10px"><span class="text">商城</span></div>
        </div>

        <div class="compreboxitem" @click="towallet">
          <div><img src="@/assets/icon/qian.png" alt="" class="images"></div>
          <div style="margin-top: 10px"><span class="text">钱包</span></div>
        </div>

        <div class="compreboxitem" @click="touser">
          <div><img src="@/assets/icon/my.png" alt="" class="images"></div>
          <div style="margin-top: 10px"><span class="text">我的</span></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "comprehensive",
        props:{
          iscomprehen:{
              type:Boolean,
              default:true
          }
        },
        data() {
            return {}
        },
        methods:{
            //关闭
            showcompr(){
                this.$emit('showcomprehen');
            },
            //返回商城首页，
            topagehome(){
                this.$emit('showcomprehen');
                this.$router.push('/homepage');
            },
            //返回app首页
            tohome(){
                this.$emit('showcomprehen');
              this.$router.push('/index');
            },
            //返回钱包
            towallet(){
                this.$emit('showcomprehen');
                this.$router.push('/wallet');
            },
            //返回我的
            touser(){
                this.$emit('showcomprehen');
                this.$router.push('/user');
            }
        },
    }
</script>

<style scoped>
  .comprehensive {
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999999999999999;
  }
  .box{
    width: 100%;
    margin: 0 auto;
    padding-bottom: 35px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .title{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }
  .comprebox {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .compreboxitem {
    flex: 1;
    text-align: center;
  }

  .images {
    width: 6vw;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  .text {
    color: #fff;
    font-size: 12px;
  }
</style>
