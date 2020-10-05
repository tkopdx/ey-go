<template>
    <div class="slide-items-flex">
        <div class="slide-item" v-for="item in items" :key="item.id">
            {{ item.text }}
        </div>
    </div>
</template>

<script>
export default {
    name:'SlideItemsPreview',
    props: {
        items: Array
    }
}
</script>

<style scoped>
    .slide-list-flex {
        display: flex;
        flex-direction: row;
        width: auto;
        height: auto;
        flex-wrap: wrap;
        justify-content: center;
        align-items:flex-start;
    }
    .slide-item {
        display: inline-block;
        border: 1px solid black;
        padding: 5px;
        width: auto;
        margin: 5px 10px;
    }
</style>