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
        bottom: 2%;
        right: 2%;
        z-index: 2;
        display: flex;
        flex-direction: column;
        opacity: 0.3;
        transition: opacity, .2s;
    }
    .canvas-config-box:hover,
    .canvas-config-box:active,
    .canvas-config-box:focus {
        opacity: 1;
    }
    .pen-button {
        position: relative;
        border-radius: 1000px;
        width: 50px;
        height: 50px;
        padding: 0;
        background: white;
        box-shadow: 0 0 5px 2px rgb(192, 192, 192);
        margin: 5px auto;
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