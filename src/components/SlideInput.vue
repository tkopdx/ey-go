<template>
    <div class="slide-inputs">
        <h4 class="slide-number">{{ind + 1}}</h4>
        <b-list-group>
            <b-list-group-item>
                <b-input v-model="slide.input" @input="$emit('update:answer-items', $event)"></b-input>
                <b-list-group-item class="sentence-preview">
                    <h6>Your sentence will look like this: </h6>
                    <h4>{{ slide.answer }}</h4>
                </b-list-group-item>
                <b-list-group>
                    <div class="items-explanation">
                        <h5>Slide items</h5>
                        <h6>These will appear as draggable words and phrases during slideshow mode.</h6>
                    </div>
                    <slide-items-preview
                        :items="slide.items"
                    />
                </b-list-group>
                <b-button-group class="slide-input-btn-panel">
                    <b-button variant="secondary" v-on:click="$emit('delete-slide', ind)">Delete</b-button>
                </b-button-group>
            </b-list-group-item>
        </b-list-group>
    </div>
    
</template>

<script>
import SlideItemsPreview from './SlideItemsPreview';

export default {
    name: 'SlideInput',
    props: {
        slide: Object,
        ind: Number
    },
    components: {
        SlideItemsPreview
    }
}
</script>

<style scoped>
    h6 {
        font-size: 12px;
    }
    .slide-number {
        float:left;
        margin: auto 10px;
    }
    .items-explanation {
        text-align: left;
        margin-top: 10px;
    }
    .sentence-preview h6 {
        position: absolute;
        top: 2px;
        left: 5px;
    }
    .slide-inputs {
        margin: 10px auto;
        width: auto;
        height: auto;
    }
    .slide-input-btn-panel {
        margin: 10px auto auto auto;
    }
</style>