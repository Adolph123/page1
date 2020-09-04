<template>
    <div style="background: #fff" :style="{height:heights+'px'}">
      <!--    顶部返回-->
      <div class="" >
        <div class="mheaderheader">
          <div style="position: absolute;left: 5px;z-index: 100" @click="backs">
            <img src="@/assets/back.png" alt="" style="width: 11px;height: auto;display: block">
          </div>
          <div style="height: 30px;">
          </div>
          <div style="position: absolute;width: 100%;left: 0;">
            <div style="display: flex;justify-content: center;font-size: 0.8rem;width: 100%">
              <span style="font-size: 16px;color: #fff"></span>
            </div>
          </div>

        </div>
      </div>

      <div style="padding: 0 20px">
<!--        <div style="height: 15px"></div>-->
<!--        简介-->
          <div class="item" >
            <div style="width: 100%">
              <div style="display: flex;align-items: center;justify-content: space-between">
                <div>简介</div>
                <div>
<!--                  <i class="el-icon-arrow-right" style="font-weight: 600;;color: #ccc"></i>-->
                </div>
              </div>
              <div style="height: 5px;"></div>

              <div>
                <textarea type="text" v-model="Abstract" class="texts" placeholder="请输入简介"></textarea>
              </div>
            </div>
          </div>
<!--        <div style="height: 15px"></div>-->
<!--  生日  -->
          <div class="item" @click="isBirthday = true">
            <div style="width: 100%">
              <div style="display: flex;justify-content: space-between;padding: 10px 0;align-items: center">
                <div>生日</div>
                <div>
                  <span style="color: rgb(212, 206, 206)">{{Birthday==''?'请填写生日':Birthday}}</span>
                  <i class="el-icon-arrow-right" style="font-weight: 600;;color: #ccc"></i>
<!--                  <div id="tomer" >-->
<!--                    <el-date-picker-->
<!--                      v-model="Birthday"-->
<!--                      type="datetime"-->
<!--                      format="yyyy-MM-dd hh:mm"-->
<!--                      value-format="yyyy-MM-dd hh:mm"-->
<!--                      placeholder="选择日期时间">-->
<!--                    </el-date-picker>-->
<!--                    &lt;!&ndash;                <input type="text" v-model="params">&ndash;&gt;-->

<!--                  </div>-->
                </div>
              </div>


            </div>
          </div>
<!--        <div style="height: 15px"></div>-->
<!--  地址    -->
          <div class="item">
            <div style="width: 100%;padding: 10px 0">
              <div style="display: flex;align-items: center;justify-content: space-between">
                <div>地址</div>
                <div>
<!--                  <i class="el-icon-arrow-right" style="font-weight: 600;;color: #ccc"></i>-->
                </div>
              </div>
              <div style="height:10px"></div>
              <div>
                <div style="display: flex;justify-content: center;width: 100%;" class="selectbox">
                  <area-select v-model="selected" :data="$pcaa" :level="2" ></area-select>
                </div>


              </div>
            </div>

          </div>
<!--        <div style="height: 15px"></div>-->
<!--    学校      -->
          <div class="item" style="border: 0;padding: 20px 0;display: flex;justify-content: space-between;align-items: center" @click="isSchool = true">
            <div>学校</div>
            <div>
              <span style="color: rgb(212, 206, 206)">{{School==''?'请填写学校':School}}</span>
              <i class="el-icon-arrow-right" style="font-weight: 600;;color: #ccc"></i>
            </div>
          </div>

<!--          <div class="item"></div>-->

          <div style="height: 100px"></div>
          <div class="botmOk" @click="addMydata">
            提交
          </div>
      </div>
<!--      简介-->
      <backColor v-if="isAbstract">
        <div style="margin-top: 17vh">
          <div style="width: 80%;min-height: 200px;background: #fff;margin: 0 auto;padding: 6px 15px;border-radius: 7px">
            <div style="display: flex;justify-content: center;align-items: center;height: 50px;font-size: 16px;">简介</div>
            <div style="height: 20px"></div>
            <div>
              <input type="text"  v-model="Abstract"  class="inptext">
            </div>
            <div style="height: 40px"></div>
            <div style="display: flex;justify-content: center;align-items: center;">

              <div class="botmOk" @click="isAbstract = false">确定</div>
              <div style="width: 25px"></div>
              <div class="botmNO" @click="isAbstract = false">取消</div>

            </div>
          </div>
        </div>
      </backColor>
      <!--      生日    -->
      <backColor v-if="isBirthday">
        <div style="margin-top: 17vh">
          <div style="width: 80%;min-height: 200px;background: #fff;margin: 0 auto;padding: 6px 15px;border-radius: 7px">
            <div style="display: flex;justify-content: center;align-items: center;height: 50px;font-size: 16px;">生日</div>
            <div style="height: 20px"></div>
            <div>
              <input type="text"  v-model="Birthday" placeholder="请填写生日信息"  class="inptext">
            </div>
            <div style="height: 40px"></div>
            <div style="display: flex;justify-content: center;align-items: center;">

              <div class="botmOk" @click="isBirthday = false">确定</div>
              <div style="width: 25px"></div>
              <div class="botmNO" @click="isBirthday = false">取消</div>

            </div>

            <div style="height: 20px"></div>
          </div>
        </div>
      </backColor>
      <!--      地址    -->
      <backColor v-if="isArea">
        <div style="margin-top: 17vh">
          <div style="width: 80%;min-height: 200px;background: #fff;margin: 0 auto;padding: 6px 15px;border-radius: 7px">
            <div style="display: flex;justify-content: center;align-items: center;height: 50px;font-size: 16px;">地址</div>
            <div style="height: 20px"></div>
            <div>
              <input type="text"  v-model="Area"  class="inptext">
            </div>
            <div style="height: 40px"></div>
            <div style="display: flex;justify-content: center;align-items: center;">

              <div class="botmOk" @click="isArea = false">确定</div>
              <div style="width: 25px"></div>
              <div class="botmNO" @click="isArea = false">取消</div>

            </div>
          </div>
        </div>
      </backColor>
      <!--      学校    -->
      <backColor v-if="isSchool">
        <div style="margin-top: 17vh">
          <div style="width: 80%;min-height: 200px;background: #fff;margin: 0 auto;padding: 6px 15px;border-radius: 7px">
            <div style="display: flex;justify-content: center;align-items: center;height: 50px;font-size: 16px;">学校</div>
            <div style="height: 20px"></div>
            <div>
              <input type="text"  v-model="School"  placeholder="请填写学校信息" class="inptext">
            </div>
            <div style="height: 40px"></div>
            <div style="display: flex;justify-content: center;align-items: center;">

              <div class="botmOk" @click="isSchool = false">确定</div>
              <div style="width: 25px"></div>
              <div class="botmNO" @click="isSchool = false">取消</div>

            </div>

            <div style="height: 20px"></div>
          </div>
        </div>
      </backColor>

      <!--提示  弹窗 -->
      <Prompts v-show="isPrompt" :text="Prompttext" :msg="Promptmsg" :Promptimage="Promptimage"></Prompts>

    </div>
</template>

<script>
    import {getliveData} from '@/api/index';
    import backColor from "@/base/backColor/backColor";
    import {reminder} from '@/common/js/mixin.js';
    export default {
        name: "midata_live",
        mixins:[reminder],
        components:{backColor},
        data(){
            return{
                params :{
                    type: 2, // 2：年月；3：年月日；4：年月日时；5：年月日时分
                    showChinese: false, // 默认false，不显示中文格式
                    value: [], // 默认选择显示的日期，是一个数组
                    quarter: false, // 时间是否以刻度形式显示，默认false
                    min: [], // 设置日期的下限
                    max: [], // 设置日期的上限
                },
                selected: ['110000', '110100', '110101'],
                heights:0,
                Abstract:'',
                isAbstract:false,
                Birthday:'',
                isBirthday:false,
                Area:'',
                isArea:false,
                School:'',
                isSchool:false,
                xiangxi:'',
            }
        },
        created(){
            this.heights = document.documentElement.clientHeight;
        },
        methods:{
            showDatePicker() {
                var time = [2018,10,1];
                let init = JSON.parse(JSON.stringify(time));
                this.$datepicker(params).then((e) => {
                    // do something
                }).catch((e) => {
                    // console.log(e)
                })
            },
            clickBtn() {
                console.log(this.value1);
            },
            //返回
            backs(){
                this.$router.push('/myorderLive')
            },
            //提交
            addMydata(){
                let a = 86;
                let pcaa  = this.$pcaa;
                if(this.selected[0] == '110000'){ //北京市
                    this.Area = `${pcaa[a][this.selected[0]]} ${pcaa[this.selected[1]][this.selected[2]]}${this.xiangxi} `;
                }else if(this.selected[0] == '310000'){ //上海市
                    this.Area = `${pcaa[a][this.selected[0]]} ${pcaa[this.selected[1]][this.selected[2]]}${this.xiangxi} `;
                }else if(this.selected[0] == '120000'){//天津市
                    this.Area = `${pcaa[a][this.selected[0]]} ${pcaa[this.selected[1]][this.selected[2]]}${this.xiangxi} `;
                }else if(this.selected[0] == '500000'){//重庆市
                    this.Area = `${pcaa[a][this.selected[0]]} ${pcaa[this.selected[1]][this.selected[2]]}${this.xiangxi} `;
                }else {
                    this.Area = `${pcaa[a][this.selected[0]]} ${pcaa[this.selected[0]][this.selected[1]]} ${pcaa[this.selected[1]][this.selected[2]]}${this.xiangxi} `;
                }

                let user = JSON.parse(localStorage.getItem('user'))
                let apiurl = 'v1/live/user_edit';
                let data = {
                    "Uid":parseInt(user.hu),
                    "Abstract": this.Abstract,
                    "Birthday":this.Birthday.substr(0,10),
                    "Area":this.Area,
                    "School":this.School
                };

              if(this.Abstract == ''){
                  this.tagglePrompt(false,'请填写简介');
              }else if(this.School == ''){
                  this.tagglePrompt(false,'请填写学校');
              }else if(this.Birthday == ''){
                  this.tagglePrompt(false,'请填写生日');
              }else{
                  getliveData(apiurl,data).then(res=>{
                      console.log(res,'!!!!!!!!!!!!!!!')
                      if(res.status == "success"){
                          this.tagglePrompt(true,'编辑成功');
                          setTimeout(()=>{
                              this.$router.push('/myorderLive')
                          })
                      }else{
                          this.tagglePrompt(false,'编辑编辑失败',res.msg)
                      }
                  })
              }






            },


        }
    }
</script>



<style scoped>
    .item{
      width: 100%;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }
    .texts {
      width: 100%;
      height: 40px;
      line-height: 40px;
      outline: none;
      text-indent: 10px;
      border: 0;
      background: #f5f5f5;
      padding: 10px 0;
      border-radius: 6px;
      color: #000;
    }
    .texts::placeholder {
      color: #ccc;
    }
  .inptext{
    width: 100%;
    height: 45px;
    outline: none;
    border: 0;
    background: #f5f5f5;
    text-indent: 10px;
  }


</style>

<style>
  #tomer .el-input__inner{
    border:0;
  }
  #tomer .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 105px;
  }
  #tomer .el-date-picker__time-header{
    display: none !important;
  }
  #tomer .el-input__prefix{
    display: none;
  }

  #tomer .el-input--suffix .el-input__inner{
    padding-right: 0;
    padding-left:29px;
  }

  .selectbox .area-select-wrap{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .selectbox .area-select-wrap .area-select{
    margin-left: 0;
    border: 0;
    background: #f5f5f5;
  }
  .selectbox .area-select-wrap .area-select.medium{
    width: 33%;
  }
  .selectbox .area-select-wrap .area-select .area-selected-trigger{
    padding: 0 10px;
  }
  .selectbox .area-selectable-list-wrap{
      border: 0;
  }
  .selectbox .area-selectable-list .area-select-option.selected{
    background-color:rgb(232, 217, 255);
    color: #9a55ff;
  }
</style>
