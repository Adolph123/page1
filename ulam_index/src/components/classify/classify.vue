<template>
  <div style="width: 100vw;background: #fff;">
    <header  class="header">
      <router-link to='/search' tag="div"class="header_input">
        <span><img src="@/assets/icon/商城_11.png" alt="" style="width: 6.5vw"></span>
        <span style="font-size: 0.65rem">搜索店内商品</span>
      </router-link>
    </header>

    <div style="padding: 0 20px;font-size: 0">
        <div v-for="(item,index) in dataList"  :key="item.id" style="display: inline-block;width: 50%;text-align: center;position: relative;"
             @click="toSubmenu(item.isHomeUrl)"
             :style="{width:bodywidth/2 -20+'px',marginBottom:(bodywidth-40)/2*0.1+'px'}"
          >
          <img :src="item.isHomeImg" alt="" style="width: 90%;height: auto;display: block;margin: 0 auto;border-radius: 8px">
          <div style="position: absolute;left: 0;top: 0;width: 100%;height:100%;display:flex;align-items: center;justify-content: center;">
            <span style="font-size: 14px;;color: #fff">{{item.label}}</span>
          </div>
        </div>
    </div>

    <div style="height: 50px"></div>
<!--    <Systematic></Systematic>-->

    <Bnavigation :flag="flag"></Bnavigation>
  </div>

</template>

<script>
    import Bnavigation from '../bnavigation/bnavigation';
  import Systematic from './systematic'
    export default {
        name: "classify",
        data(){
          return{
              flag:1,
             // 综合、女装、男装、内衣、母婴、食品、鞋包配饰、美妆个性、家居家装、数码家电、户外运动
              dataList:[

              ],
              bodywidth:0,
          }
        },
        created(){
          this._getdindlist();
          this.bodywidth = document.documentElement.clientWidth;
        },
        methods:{
            toSubmenu(str){
                let id = [];
                id.push(str)
                console.log(str,'str!!!!!!!!!!!!!!!!!!');
                this.$router.push({
                    path: `/submentus`,
                    query:{
                        id:JSON.stringify('['+str+']')
                    }
                })


            },
            //请求数据
          _getdindlist(){
              let tokens = localStorage.getItem('token');

             let head = {
                 headers: {
                     'content-type': 'application/json',
                     "token": tokens
                 }
             };
              this.axios.post('http://39.98.249.37:10017/api/v1/shop/goods/find-category',{},head).then(res=>{
                  console.log('列表',res.data.data)
                  this.dataList = res.data.data
              })
          }
        },
        components:{
            Systematic,
            Bnavigation
        }
    }
</script>

<style scoped>
  .header {
    width: 100%;
    padding: 40px 0 4%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .header_input {
    width: 94%;
    font-size: 14px;
    padding: 0.1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    border-radius: 1rem;
  }
  .header_input > span:nth-child(1) {
    width: 1.5rem;
  }
  .header_input > span {
    color: #b4b4b4;
    padding-top: 2px;
  }
</style>
