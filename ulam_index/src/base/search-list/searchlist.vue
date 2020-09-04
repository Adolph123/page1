<template>
    <div class="search-list" :data='historylist'>
        <ul>
            <li v-for="(item,index) in historylist" :key="index" @click.prevent="togglevaluers(item)" class="search-item">
              <div class="itembox">
                <span>{{item.name}}</span>
              </div>
            </li>
        </ul>
    </div>
</template>

<script>

    import {goBackpushState} from '@/common/js/mixin';
    export default {
        mixins: [goBackpushState],
    props:{
        historylist:{
            type:Array,
            default:[]
        }
    },
    methods:{
        togglevaluers(){

        }

    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'
    .search-list
        width 100vw
        overflow hidden
        ul
          width 100%
          .search-item
            width 44%
            display inline-block
            font-size 0.65rem
            margin 4vh 3% 0.3rem
            border-radius 8px
          .itembox
            position relative
            display flex
            justify-content space-between
            .itemRight
              position absolute
              top -40%
              left 45%
              img
                display block
                width 82%
                height auto
            .itemLeft
                line-height 1.4rem
                padding-left 0.5rem
                .huise
                  color #ccc
                  font-size 0.6


</style>>
