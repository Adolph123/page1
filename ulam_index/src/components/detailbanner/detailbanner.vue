<template>
  <div>

    <Pageheader content="轮播详情"></Pageheader>
    <div class="title" v-if="istitles != 0">
      <div v-if="image.length" class="titleItem" :class="{active:istitle == 1}" @click="istitle = 1"><span>图片介绍</span>
      </div>
      <div v-if="audio.length" class="titleItem" :class="{active:istitle == 2}" @click="istitle = 2"><span>语音介绍</span>
      </div>
      <div v-if="vedio.length" class="titleItem" :class="{active:istitle == 3}" @click="istitle = 3"><span>视频介绍</span>
      </div>
    </div>
    <scroll class="main-content" :style="{height:istitle == 0?'89vh':'83vh'}">
      <div>
        <!--          图片区域-->
        <div v-if="istitle == 1">
          <div v-for="(item,index) in image" :key="index">
            <img :src="item" alt="" class="images">
          </div>
        </div>
        <!--          音频区域-->
        <div v-if="istitle == 2">
          <div v-for="(item,index) in audio" :key="index" @click="audiopaly = index"
               style='width: 100%;background-size: 100% 100%;height: 230px;position: relative;margin-bottom: 10px'
               :style="{background:`url(${item.image}) no-repeat 0 0`}">
            <div style="position: absolute;bottom: 5px;width: 90%;left: 5%;border-radius: 20px;overflow: hidden;">
              <audio :src="item.audio" controls  :autoplay="index == audiopaly" name="media" controlsList="nodownload"
                     class="audios"></audio>
            </div>
          </div>
        </div>
        <!--          视频区域-->
        <div v-if="istitle == 3">
          <div v-for="(item,index) in vedio" :key="index" @click="vediopaly = index">
            <video :poster="item.image" v-if="item" controls="" :pause="index == vediopaly" :autoplay="index == vediopaly" name="media"
                   class="videos" controlsList="nodownload">
              <source :src="item.video" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
    import {getdislist} from '@/api/index';
    import Pageheader from "@/base/pageheade/pageheader";
    import scroll from "@/base/scroll/scroll";

    export default {
        name: "detailbanner",
        components: {
            Pageheader, scroll
        },
        data() {
            return {
                audio: [],
                image: [],
                vedio: [],
                istitle: 1,
                istitles: 0,
                dvdtu: '',
                urlimg: '@/assets/newpage/bg1.png',
                audiopaly: 0,
                vediopaly: 0,
            }
        },
        created() {
            this._getdislist()
        },
        methods: {
            _getdislist() {
                let apiurl = this.apiurl+'/get_rotation_id';
                let data = {
                    "id": parseInt(this.$route.query.id)
                };
                this.axios.post(apiurl, data).then(res => {
                    console.log(res, '轮播详情');
                    let num = 0;
                    if (res.data.audio.length > 0) {
                        num += 1;
                    }
                    if (res.data.image.length > 0) {
                        num += 1;
                    }
                    if (res.data.vedio.length > 0) {
                        num += 1;
                    }

                    if (num >= 2) {
                        if (res.data.image.length > 0) {
                            this.istitle = 1;
                        } else if (res.data.audio.length > 0) {
                            this.istitle = 2;
                        }

                        this.istitles = 1;
                    } else {
                        this.istitles = 0;
                    }
                    console.log(this.istitle, ' this.istitle');

                    this.audio = res.data.audio;
                    this.image = res.data.image;
                    this.vedio = res.data.vedio;

                })
            }
        }
    }
</script>

<style scoped>
  .main-content {
    height: 83vh;
    overflow: hidden;
    background: #fff;
    position: relative;
  }

  .videos {
    width: 100%;
    height: auto;
  }

  .audios {
    width: 100%;
    height: 45px;
  }

  .images {
    width: 100%;
    height: auto;
    display: block;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .titleItem {
    text-align: center;
    margin: 0 15px 2px;
    padding: 2px 0 5px;
    font-size: 14px;
    border-bottom: 1.3px solid #fff;
  }

  .active {
    border-bottom: 1.3px solid #9a55ff;
    color: #9a55ff;
    font-weight: 600;
  }
</style>
