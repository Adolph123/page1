<template>
    <div style="position: fixed;bottom: 0;width: 100%;background: #fff;text-align: center;color: #999;font-size: 12px">
      <div style="margin-top: -35px">
        <img :src="mydetails.Header" alt="" style="width: 70px;height: auto;display: block;margin: 0 auto;border-radius: 50%">
      </div>
      <div style="height: 10px"></div>
      <div style="color: #000;font-weight: 600">
        {{mydetails.Nick}}
      </div>
      <div style="height: 30px"></div>
      <div>
        这个家伙很懒，什么都没留下...
      </div>

      <div style="height: 50px"></div>
      <div style="display: flex;justify-content: space-between;padding: 0 10px">
        <div style="flex: 1;border-right: 1px solid #eee">
          <div style="color: #000;font-weight: 500;font-size: 14px">{{mydetails.Follow}}</div>
          <div>关注</div>
        </div>
        <div  style="flex: 1;border-right: 1px solid #eee;">
          <div style="color: #000;font-weight: 500;font-size: 14px">{{mydetails.Fans}}</div>
          <div>粉丝</div>
        </div>
        <div  style="flex: 1;border-right: 1px solid #eee">
          <div style="color: #000;font-weight: 500;font-size: 14px">{{mydetails.Send}}</div>
          <div>收到打赏</div>
        </div>
        <div  style="flex: 1;">
          <div style="color: #000;font-weight: 500;font-size: 14px">{{mydetails.Receive}}</div>
          <div>送礼</div>
        </div>
      </div>
      <div style="height: 30px"></div>

    </div>
</template>

<script>
    export default {
        name: "mydetail",
        props:{
            mydetails:{
                type:Object,
                default:()=>{
                    return{}
                }
            }
        }
    }
</script>

<style scoped>

</style>
