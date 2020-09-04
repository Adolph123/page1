<template>
    <div>
      <iframe :src="itemurl" ></iframe>
    </div>
</template>

<script>
    export default {
        name: "iframes",
        props:{
            itemurl:{
                type:String,
                default:''
            }
        }
    }
</script>

<style scoped>

</style>
