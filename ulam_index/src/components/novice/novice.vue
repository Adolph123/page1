<template>
    <div class="novicebox" >
      <!--    顶部返回-->
      <div style="background-color: #FFFFFF;">
        <div class="mheaderheader">
          <div style="position: absolute;left: 0;z-index: 100" @click="fanhui1">
            <img src="@/assets/back.png" alt="" style="width: 10px;height: auto;display: block">
          </div>
          <div style="height: 30px;">

          </div>
          <div style="position: absolute;width: 100%;left: 0;">
			  
            <div style="display: flex;justify-content: center;font-size:17px;background: #fff;width: 50%;margin:0 auto;font-weight: 550;">
				新手帮助
            
            </div>
          </div>
        </div>
      </div>
	  <div style="width: 100%;height: 10px;"></div>
	  <div style="width: 100%;height:40px;background-color: #FFFFFF;display: flex;flex-direction: row;align-items: flex-end;">
		  <div class="title" :class="{activetitle:istitle == 1}" @click="istitle = 1" style="width: 25%;background-color: #FFFFFF;font-size: 14px;height: 40px;display: flex;flex-direction: row;align-items:center;justify-content: center;" >新手指导</div>
		   <div class="title" :class="{activetitle:istitle == 2}" @click="istitle = 2" style="width: 25%;background-color: #FFFFFF;font-size: 14px;height: 40px;display: flex;flex-direction: row;align-items:center;justify-content: center;">常见问题</div>
	  </div>
     <div v-if="dvd" class="bao4" @touchmove.prevent v-on:click="dvds" id="vis" >
       <video width="98%" autoplay loop height="98%"
              x5-video-player-fullscreen="true"
              :x5-video-orientation="istitle == 2?'landscape':'portraint'"
              :poster="dvdtu"
              ref="video6"  controlsList="nodownload">
         <source :src="dvdsrc"/>
       </video>
     </div>
      <scroll class="main-content" style="background-color: #FFFFFF;">
        <div style="padding: 0 15px">
          <div style="height:10px;"></div>
            <div v-if="istitle == 1" v-for="(item,index) in poollist" :key="index" @click="taggleSrc(item.video_src,item.src)" class="boxflex">
              <img :src="item.src" alt="" class="images">
              <div style="font-size: 12px;width: 57%">
                <div style="line-height: 22px;font-size: 14px">APP-{{item.name}}</div>
                <div style="height: 5px;"></div>
                <div style="line-height: 22px;color: #777">视频出自:ULAM官方客服喵喵</div>
              </div>
            </div>

          <div v-if="istitle == 2"  v-for="(item,index) in scanlist" :key="index+100"

               @click="taggleSrc(item.video_src,item.src)" class="boxflex">
              <img :src="item.src" alt="" class="images">
              <div style="font-size: 12px;width: 57%">
                <div style="line-height: 22px;font-size: 14px">浏览器-{{item.name}}</div>
                <div style="height: 5px;"></div>
                <div style="line-height: 22px;color: #777">视频出自:ULAM官方客服喵喵</div>
              </div>
            </div>


          <div style="height: 100px"></div>
        </div>
      </scroll>
    </div>
</template>

<script>
    import scroll from "@/base/scroll/scroll";
    export default {
        name: "novice",
        components:{scroll},
        data(){
            return{
                poollist:[],
                scanlist:[],
                dvd:false,
                istitle:1,
                dvdsrc:'',
                dvdtu:'',
            }
        },
        created(){

            this.getnoiceList()
        },
        methods:{
            getnoiceList(){
                this.axios.get(this.apiurl+'/get_new_player_pool').then(res=>{
                    let poollist = res.data;
                    poollist.map(item=>{
                        let str = item.src.match(/_(\S*)/)[1];
                        item.name = str.match(/_(\S*).png/)[1];
                    })
                    this.poollist = poollist;
                })
                this.axios.get(this.apiurl+'/get_new_player_scan').then(res=>{
                    let scanlist = res.data;
                    scanlist.map(item=>{
                        let str = item.src.match(/_(\S*)/)[1];
                        item.name = str.match(/_(\S*).png/)[1];
                    })
                    this.scanlist = scanlist;
                })
            },
            //看视频
            taggleSrc(src,img){

                this.dvd = true;




                this.dvdsrc = src;
                this.dvdtu = img;

               setTimeout(()=>{
                   let vis = document.getElementById('vis');
                   if (this.istitle == 2){
                       vis.style.width = '100vw';
                       vis.style.height = '100vh';
                       vis.style.transform = 'rotate(90deg)';
                       vis.style.transformOrigin = 'top left';
                       vis.style.width = '100vh';
                       vis.style.height = '100vw';
                       vis.style.left = '100vw';
                   }else if (this.istitle == 1){
                       vis.style.transform = 'rotate(0deg)';
                       vis.style.width = '100vw';
                       vis.style.height = '100vh';
                   }
               },10)
            },
            //关闭视频
            dvds() {
                let that = this;
                that.dvd = false;
                that.dvdsrc = '';
                that.dvdtu = '';
            },
            fanhui1(){
                this.$router.push('/index')
            },
        }

    }
</script>

<style scoped>
  .novicebox{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top:0;
  }
  .title{
    font-size: 14px;
    font-weight: 600;
    line-height: 26px;
    color:#3D4655;;
    background: #f5f5f5;
    display: inline-block;
    width: 50%;
    text-align: center;
  }
  .activetitle{
    color:#1D65E3;
 /*   background: linear-gradient(rgb(118, 196, 255), rgb(116, 88, 253)) */
  }
  .images{
    width: 40%;
    height: auto;
    border-radius: 6px;
  }
  .bao4{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    z-index: 300;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-content{
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  .boxflex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f5f5f5;
  }
</style>
