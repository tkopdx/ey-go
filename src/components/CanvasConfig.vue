<template>
    <div class="canvas-config-box">
        <b-button class="pen-button" v-on:click="$emit('pen-click')" :config="config" variant="primary" v-bind:class="{selected: config.selected}"> <ion-icon v-if="config.selected" name="close-outline"></ion-icon> <ion-icon v-else name="pencil-outline"></ion-icon></b-button>
        <b-button-group>
            <b-button v-show="config.selected" v-for="color in config.colors" :key="color.id" v-bind:style="{backgroundColor: color.name}" v-bind:class="{selected: color.selected}" v-on:click="$emit('color-click', color.name)"></b-button>
        </b-button-group>
        <b-button class="pen-button" variant="secondary" v-on:click="$emit('clear-canvas')"><ion-icon name="trash-outline"></ion-icon></b-button>
    </div>
</template>

<script>
export default {
    name: 'CanvasConfig',
    props: {
        config: Object
    },
    methods: {
    }
}
</script>

<style scoped>
    .canvas-config-box {
        position: absolute;
        bottom: 7%;
        right: 5%;
        z-index: 2;
    }
    .pen-button {
        position: relative;
        border-radius: 1000px;
        width: 50px;
        height: 50px;
        padding: 0;
        background: white;
        box-shadow: 0 0 5px 2px rgb(192, 192, 192);
        margin: auto 20px;
    }
    .pen-button ion-icon {
        font-size: 30px;
        vertical-align: middle;
        color: black;
    }
    .selected {
        border: 6px solid grey;
    }
</style>