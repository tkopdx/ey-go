<template>
    <div v-if="!loading" class="slideshow">
        <p>{{ set.name }}</p>
        <SlideDragAndDrop
            :randItems="this.randomizedItems"
            :answerItems="this.curSlide.items"
            :key="this.curSlide.answer"
        />
        <div class="button-panel">
            <b-button v-on:click="prev" variant="primary" :disabled="btnStates.prev.isDisabled">Prev</b-button>
            <b-button v-on:click="next" variant="primary" :disabled="btnStates.next.isDisabled">Next</b-button>
        </div>
    </div>
    <div class="spinner" v-else>
        <b-spinner label="Spinning" variant="success"></b-spinner>
    </div>
</template>

<script>
import SlideDragAndDrop from './SlideDragAndDrop';

export default { 
    name: 'Slideshow',
    components: {
        SlideDragAndDrop,
    },
    props: {
        set: Object,
        loading: Boolean
    },
    data: function () {
        return {
            curSlideIndex: 0,
            answer: {
                state: false
            },
        }
    },
    computed: {
        curSlide: {
            get: function () {
                return this.set.slides[this.curSlideIndex]
            }
        },
        btnStates: {
            get: function () {
                let btns = {
                    prev: {
                        isDisabled: false
                    },
                    next: {
                        isDisabled: false
                    }
                }

                if (this.set.slides && this.curSlideIndex + 1 >= this.set.slides.length) {
                    btns.next.isDisabled = true;
                }

                if (this.set.slides && this.curSlideIndex - 1 < 0) {
                    btns.prev.isDisabled = true;
                }

                return btns;
            }
        },
        randomizedItems: {
            get: function () {
                if (!this.curSlide) {
                    return;
                }

                let shuffledItems;
                
                do {
                   shuffledItems = this.shuffle([...this.curSlide.items]);
                } while (this.curSlide.items.every((item, ind) => {
                    return item.text === shuffledItems[ind].text;
                }))

                return shuffledItems;
            }
        }
    },
    methods: {
        next: function () {
            if (this.curSlideIndex + 1 >= this.set.slides.length) {
                return;
            } else {
                // console.log(`displaying ${this.curSlideIndex + 1}`);
                this.curSlideIndex += 1;
            }
        },
        prev: function () {
            if (this.curSlideIndex - 1 < 0) {
                return;
            } else {
                // console.log(`displaying ${this.curSlideIndex - 1}`);
                this.curSlideIndex -= 1;
            }
        },
        shuffle: function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    },    
}
</script>

<style scoped>
    .slideshow {
        display:flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: center;
        height: 97vh;
        width: auto;
        margin: auto;
    }
    p {
        position: absolute;
        top: 5px;
        left: 5px;
    }
    .button-panel {
        position: absolute;
        bottom: 10px;
        display: flex;
        justify-content: space-evenly;
        width: 80vw;
        height: auto;
    }
    .spinner {
        height: 90vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>