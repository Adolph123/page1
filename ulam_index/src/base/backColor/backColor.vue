<template>
    <div class="backColorbox" :style="{height:height+'px'}" @click.prevent="head">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "backColor",
        data(){
          return{
              height:0
          }
        },
        mounted(){
            this.height = document.documentElement.clientHeight;
        },
        methods:{
            head(){
                this.$emit('heidback')
            }
        }
    }
</script>

<style scoped>
  .backColorbox{
    background: rgba(0,0,0,0.4);
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index:10000;
  }
</style>
