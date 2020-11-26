<template>
    <div class="slide-drag-and-drop">
        <Canvas/>
        <p class="slide-drag-and-drop-feedback-icon">
            <ion-icon name="happy-outline" class="green" v-if="checkAnswer" key="happy-feedback"></ion-icon>
            <ion-icon name="close-outline" class="red-font" v-else key="bad-feedback"></ion-icon>
        </p>
        <p class="slide-drag-and-drop-feedback" v-bind:class="{green: checkAnswer}">{{checkAnswer ? 'Nice!' : 'Put the words/phrases in the correct order.'}}</p>
        <draggable v-bind="localList" key="draggable-list" class="drag-and-drop-list" :list="localList" group="words">
            <transition-group name="shuffle-list" tag="div" class="shuffle-list">
                <div class="list-group-item" v-for="item in localList" :key="item.id" :id="`list-group-item-${item.id}`">{{item.text}}</div>
            </transition-group>
        </draggable>
        <TranslationPopover
            v-for="item in localList" 
            :key="`translation-popover-${item.id}`"
            :item="item"
        />
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import TranslationPopover from './TranslationPopover';
import Canvas from './Canvas';

export default {
    name: 'SlideDragAndDrop',
    components: {
        draggable,
        TranslationPopover,
        Canvas
    },
    props: {
        randItems: Array,
        isCorrect: Boolean,
        answerItems: Array
    },
    data: function () {
        return {
            localList: this.randItems ? this.randItems.map(item => ({...item})) : null,
        }
    },
    computed: {
        checkAnswer: function () {

            let a = this.answerItems;
            let b = this.localList;

            // console.log(a, b);

            return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((item, index) => item.text === b[index].text);
        }
    },
    methods: {
    }
}
</script>

<style scoped>
    .slide-drag-and-drop {
        width: 95vw;
        height: 90%;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .slide-drag-and-drop-feedback {
        font-size: 18px;
        width: auto;
        height: auto;
    }
    .slide-drag-and-drop-feedback-icon {
        font-size: 30px;
        margin-top: 3%;
    }
    .drag-and-drop-list {
        width: auto;
        height: auto;
        max-height: 80%;
        margin: auto;
        align-self: center;
        align-items: center;
        justify-content: center;
        box-shadow: 5px 5px 8px 5px rgb(206, 206, 206);
        overflow: auto;
    }
    .shuffle-list {
        width: auto;
        height: 100%;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        overflow-y: auto;
        align-items: center;
        align-content: flex-start;
        padding: 15px;
    }
    .list-group-item {
        height: auto;
        width: auto;
        /* box-shadow: 5px 5px 8px 5px rgb(206, 206, 206); */
        font-size: 40px;
        background: none;
        display:inline-block;
        margin: 3px 3px;
        padding: 5px;
        border: none;
    }
    .green {
        color: green;
    }
    .red-font {
        color: red;
    }
    .shuffle-list-move {
        transition: transform .5s;
    }
</style>