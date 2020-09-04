<template>
  <div class="addresss">
    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    <Pageheader :content="content" @taggbacks="taggbacks" @heidcomprehen="heidcomprehen"></Pageheader>




    <comprehensive v-if="iscomprehensive" :iscomprehen="iscomprehen" @showcomprehen="showcomprehen"></comprehensive>

    <div style="height:10px"></div>
    <div class="addressvontent" style="padding: 0 10px">
<!--    填写收货人  -->
      <div class="addressvontentItem">
        <input type="text" v-model="name" placeholder="填写收货人" class="addressvontentIteminp">
      </div>
      <div style="height:10px"></div>
<!--  填写手机号码    -->
      <div class="addressvontentItem">
        <input :style="{color:phone.length == 11?'#000':'red'}" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="number" v-model="phone" placeholder="填写手机号码" class="addressvontentIteminp">
      </div>

      <!--        // 省市区-->
      <div style="height:10px"></div>
      <!--        // 省市区-->
      <div style="display: flex;justify-content: center;width: 100%;" class="selectbox">
        <area-select v-model="selected" :data="$pcaa" :level="2" ></area-select>
      </div>

      <div style="height:10px"></div>

<!--填写详细地址-->
      <div class="addressvontentItem">
        <input type="text" v-model="xiangxi" placeholder="填写详细地址" class="addressvontentIteminp">
      </div>



      <div class="addressvontentItem" style="justify-content: space-between;margin-top: 1.1rem;display: flex;align-items: center" @click.prevent="dialogVisible = true">
        <div style="color: #656b79"><span>标签</span></div>
        <div style="display: flex;align-items: center;">
          <!--          标签列表-->
          <el-button round size="mini"  style="background: #f1d2ff;color: #9a55ff;border: none">
            {{remarks}}
          </el-button>

          <i class="el-icon-arrow-right" style="font-size: 17px" ></i>
        </div>
      </div>

      <div style="flex: 0.9">
        <!-- 添加标签-->
        <el-dialog
          :visible.sync="dialogVisible"
          width="90%"
          style="background: rgba(0,0,0,0.7)"
        >

          <div>
            <input type="text" v-model="addTextbq" placeholder="添加标签" class="addressvontentIteminp">
          </div>
          <div style="margin-top: 1rem">
            <div v-for="(item,index) in remark" :key="item.id" style="display: flex;justify-content: space-between;margin: 0.4rem 0">
              <el-button size="mini"  round  @click="butonisflag(index)"
                         :style="{background:item.isflag? '#f1d2ff':'#f5f5f5',color:item.isflag? '#9a55ff':'#bababa',borderColor:item.isflag? '#f1d2ff':'#ccc'} "
              >{{item.name}}</el-button>
              <i class="el-icon-delete" @click="removeaddBq(item.id)" style="color: #bababa;font-size: 0.65rem"></i>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="guanbitishi(false)" >确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="addressvontentItem" style="justify-content: space-between;margin-top: 1.1rem;display: flex;align-items: center">
        <div style="line-height: 1.5rem;">
          <div style="color: #656b79"><span>设置默认地址</span></div>
        </div>
        <div>
          <el-switch
            v-model="isflags"
            active-color="#9a55ff"
            inactive-color="#bababa">
          </el-switch>
        </div>
      </div>
    </div>
    <!--提示  弹窗 -->
    <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    <div class="paymentBotm">
      <div tag="div">
        <button class="paymentBotmbtn backcolors" @click="_getdislist"> 保存地址</button>
      </div>
    </div>
  </div>
</template>

<script>
    import {getdislist} from '@/api/index'
    import Pageheader from "@/base/HeaderPage/HeaderPage"
    import Prompts from "@/base/prompt/prompt";
    import {tageshowcomprehen} from '@/common/js/mixin.js';
    export default {
        mixins: [tageshowcomprehen],
        name: "addresss",
        data(){
            return{
                show:false,
                isPrompt:false,//提示框的展示与隐藏
                Prompttext:'',//提示框成功或失败
                Promptmsg:'',//提示框成功或者失败原因
                Promptimage:'',//是否展示图片
                content:'新增地址',
                dialogVisible: false,
                addTextbq:'',
                dialogVisiblebq:false,
                remark:[
                    {
                        name:'公司',
                        isflag:false,
                    },
                    {
                        name:'学校',
                        isflag:false,
                    },
                    {
                        name:'家',
                        isflag:false,
                    },

                ],
                isflags:true,
                name:'',
                phone:'',
                xiangxi:'',
                input:'',
                selected: ['110000', '110100', '110101'],
                remarks:'公司',
                sheng:110000,
                shiji:110100,
                quji:110101,
            }
        },
        created(){
            let a = 86;

            //
            var t = setTimeout(() => {this.show = true},0);

            this.getlistaddBq();
            if(this.$route.query.id){
                this.toAddress(this.$route.query.id)
            }
        },
        methods:{
            taggbacks(){
                this.$router.push('/setup')
            },
            //修改地址  请求修改的地址信息
            toAddress(id){
                console.log(id);
                let apiurl = 'v1/shop/order/address-find';
                let data = {}
                getdislist(apiurl,data).then(res => {
                    console.log(res,'数据');
                    let reslist = res.data;
                    reslist.map(item=>{
                        if(item.id == id){
                            console.log(item);
                            this.name = item.name;
                            this.phone = item.phone;
                            this.xiangxi = item.detail;
                        }
                    })
                    this.addlist = reslist;
                })
            },


            //提示框出现
            tagglePrompt(isflag, text, msg) {
                if (isflag) {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.isPrompt = true;
                    this.Promptimage = isflag;
                } else {
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(() => {
                    this.isPrompt = false;
                }, 1500)
            },

            //删除标签
            removeaddBq(id){
                let apiurl =  'v1/shop/order/address-flag-del';
                let data = {
                    id
                };
                getdislist(apiurl,data).then(res=>{
                    console.log(res)
                    this.getlistaddBq();
                })
                this.dialogVisiblebq = false;
            },
            //提示框   //新建标签
            guanbitishi(flag){
                let apiurl = 'v1/shop/order/address-flag-add';
                let data = {
                    name:this.addTextbq,
                };
                if(this.addTextbq == ''){
                    this.dialogVisible = flag;
                    return
                }else{
                    getdislist(apiurl,data).then(res=>{
                        this.remarks = this.addTextbq;
                        this.addTextbq = '';
                        console.log(res);
                        this.getlistaddBq();
                        this.dialogVisible = flag;
                    })
                }


            },
           //获取标签
            getlistaddBq(){
                let apiurl = 'v1/shop/order/address-flag-find';
                let data={};
                getdislist(apiurl,data).then(res=>{
                    console.log(res);

                    if(res.status == "tokenFail") {
                        this.tagglePrompt(false, '登录状态失效请重新登录');

                        setTimeout(()=>{
                            localStorage.clear()
                            this.$router.push('/index');
                        },3000)

                    }else{
                        let reslist = res.data;
                        if (reslist){
                            reslist.map(item=>{
                                item.isflag = false;
                            });
                        }
                        this.remark  = reslist;
                    }




                })
            },
            //选择标签
            butonisflag(index){
                this.remark.map(item=>{
                    item.isflag = false;
                });
                this.remark[index].isflag = true;
                this.remarks = this.remark[index].name
            },
            //添加地址
            _getdislist(){
                console.log(this.isflags);


                let apiurl,text,istxt;
                let data;
                if(this.$route.query.id){//是修改地址
                    apiurl = 'v1/shop/order/address-edit';
                    text = '修改地址失败';
                    istxt= '修改地址成功';
                    data = {
                        name: this.name,
                        "phone": this.phone,
                        "remark": this.remarks,
                        "provinceId":parseInt(this.selected[0]),
                        "cityId":parseInt(this.selected[1]),
                        "areaId":parseInt(this.selected[2]),
                        "detail": this.xiangxi,
                        isDefault:this.isflags?1:0,
                        id:parseInt(this.$route.query.id)
                    };

                }else{//添加地址
                    apiurl = 'v1/shop/order/address-add';
                    text = '添加地址失败';
                    istxt= '添加地址成功';
                    data = {
                        name: this.name,
                        "phone": this.phone,
                        "remark": this.remarks,
                        "provinceId":parseInt(this.selected[0]),
                        "cityId":parseInt(this.selected[1]),
                        "areaId":parseInt(this.selected[2]),
                        "detail": this.xiangxi,
                        isDefault:this.isflags?1:0
                    };
                }

                console.log(this.phone.length ,'this.phone.length');


                if(this.name == ''){
                    this.tagglePrompt(false,text,',收货人不能为空');
                }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){

                        this.tagglePrompt(false,text,',手机号输入有误');
                        return false;


                }else if(this.xiangxi == ''){
                    this.tagglePrompt(false,text,',详细地址不能为空');
                }else{

                    getdislist(apiurl,data).then(res => {
                        console.log(res,'添加地址数据');
                        let reslist = res.data;
                        // this.addlist = reslist;

                        if(res.status == "success"){
                            this.tagglePrompt(true,istxt);
                            setTimeout(()=>{
                                this.$router.push('/modifyaddress')
                            },500)
                        }else{
                            this.tagglePrompt(false,res.msg)
                        }

                    })
                }

            },
            //提示框出现
            tagglePrompt(isflag,text,msg){
                if(isflag){
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.isPrompt = true;
                    this.Promptimage = isflag;
                }else{
                    this.Prompttext = text;
                    this.Promptmsg = msg;
                    this.Promptimage = isflag;
                    this.isPrompt = true;
                }
                setTimeout(()=>{
                    this.isPrompt = false;
                },1500)
            }

        },
        components:{
            Pageheader,Prompts
        }
    }
</script>


<style scoped lang="stylus">
  @import 'vue-area-linkage/dist/index.css'
  .addresss
    width 100vw
    position absolute
    background #f5f5f5
    z-index 10000
    height 100vh
    font-size 14px
    .addressvontent
      width 90%
      margin 0 auto
      text-align left

      .addressvontentItem
        display flex
        align-items center
        margin 0.35rem 0
        .area-select.medium
          width 30vw
        .addressvontentIteminp
          background #ffffff
          height 0.7rem
          line-height 0.7rem
          width 100%
          padding 0.4rem
          outline 0
          border-radius 6px
          color #000
        .el-input{
          width 60%
          height 0.7rem
        }

  .paymentBotm
    width 100%
    height 5vh
    z-index 1000
    background #fff
    position fixed
    bottom 10vh
    .paymentBotmbtn
      width 80%
      margin 0 auto
      border 0
      outline 0
      display block
      font-size 0.75rem
      padding 0.3rem 1.2rem
      border-radius 30px
      color #fff
</style>



<style>
  .el-dialog__header{
    padding: 20px 20px 40px;
  }
  .input_el .el-input__inner{
    border: 0 none;
  }
  .area-select.medium{
  }
  .area-select-wrap{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .area-select .area-selected-trigger{
    color: #656b79;
    line-height: 22px;
  }
  .selectbox .area-select-wrap .area-select{
    margin-left: 0;
    border: 0;
    background: #f5f5f5;
  }
  .selectbox .area-select-wrap:nth-child(1){
    margin-top:0.6rem
  }

  .area-selectable-list> .selected{
    color: #9a55ff;
    font-weight: 300;
  }

  .area-selectable-list .area-select-option{
    font-weight: 300;
    color: #bababa;

  }

  .el-dialog__wrapper .el-dialog{
    border-radius: 6px;
  }
  .el-dialog__wrapper .el-dialog, .el-pager li{
    background: #f5f5f5;
  }
  .el-dialog__footer{
    width: 100%;
  }
  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  el-dialog__footer .dialog-footer .el-button{
    width: 80%;
    margin: 0 auto;
    color: #fff;
  }
  .el-button--primary{
    width: 80%;
    background: #9a55ff !important;
    border:1px solid #9a55ff !important;
    border-radius: 25px !important;
  }
  .addressvontentIteminp{
    width: 100%;
    background: #f0f0f0;
    height: 0.7rem;
    line-height: 0.7rem;
    text-indent: 15px;
    padding: 0.4rem 0;
    outline: 0;
    border-radius: 6px;
    color: #000;
  }
  .el-button>span{
    font-size: 0.7rem;
  }
  .area-selectable-list-wrap {
    width: 92%;
  }

  .area-selectable-list-wrap{
    border: 0;
  }
  .area-select .area-select-icon{
    left: 0px;
    border: 5px solid transparent;
  }

  .area-select .area-selected-trigger{
    text-align: center;
  }


</style>
