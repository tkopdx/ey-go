<template>
    <div class="set-editor">
        <b-form-group
            id="fieldset-1"
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            :state="state.name"
        >
            <p>{{ set.name }}</p>
            <b-input-group>
                <template v-slot:prepend>
                    <b-input-group-text >Set name</b-input-group-text>
                </template>
                <b-form-input :state="state.name" v-model="set.name"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group
            id="fieldset-1"
            description="Please choose a textbook."
            :valid-feedback="validFeedbackTextbook"
            :state="state.textbook"
        >
            <b-input-group prepend="Textbook" :state="state.textbook">
                <b-button-group title="Textbook">
                    <b-button
                    v-for="textbook in textbooks" :key="textbook.title" 
                    v-on:click="setTextbook(textbook.title)"
                    variant="primary"
                    :pressed="set.textbook === textbook.title ? true : false"
                    >
                    {{ textbook.title }}
                    </b-button>
                </b-button-group>
            </b-input-group>
        </b-form-group>
        <b-form-group
            id="fieldset-1"
            description="Please choose a program."
            :valid-feedback="validFeedbackProgram"
            :state="state.program"
        >   
            <b-input-group prepend="Program">
                <b-button-group :state="state.program" title="Program">
                    <b-button 
                    v-for="program in programs" 
                    :key="program.number" 
                    :pressed="set.program === program.number ? true : false"
                    v-on:click="setProgram(program.number)"
                    >
                    {{ program.number }}
                    </b-button>
                </b-button-group>
            </b-input-group>
        </b-form-group>
        <b-form-group
            id="fieldset-1"
            description="Please choose a lesson."
            :valid-feedback="validFeedbackLesson"
            :state="state.lesson"
        >       
            <b-input-group prepend="Lesson">
                <b-button-group :state="state.lesson" title="Lesson">
                    <b-button 
                    v-for="lesson in lessons" 
                    :key="lesson.number" 
                    :pressed="set.lesson === lesson.number ? true : false"
                    v-on:click="setLesson(lesson.number)"
                    >
                    {{ lesson.number }}
                    </b-button>
                </b-button-group>
            </b-input-group>
        </b-form-group>
        <div class="slides-box">
            <p>Use forward slashes (/) to divide your sentence into separate words and phrases.</p>
            <SlideInput
                v-for="(slide, index) in set.slides"
                :key="index"
                :slide="slide"
                :ind="index"
                v-on:delete-slide="deleteSlide(index)"
                @update:answer-items="setAnswerItems($event, index)"
                :input="set.slides[index].input"
                :state="state.slides"
            />
            <b-button class="add-slide-btn" v-on:click="addSlide">+ slide</b-button>
        </div>
        <div class="button-panel" v-if="loading">
            <b-spinner label="Spinning" variant="success" v-if="loading"></b-spinner>
        </div>
        <b-button-group v-else class="button-panel" vertical>
            <b-button variant="primary" :disabled="state.btn" v-on:click="$emit('save', 'slideshow')">Save and start</b-button>
            <b-button variant="secondary" :disabled="state.btn" v-on:click="$emit('save', null)">Save</b-button>
        </b-button-group>
    </div>
</template>

<script>
import SlideInput from './SlideInput';

export default {
    name: 'SetEditor',
    components: {
        SlideInput
    },
    props: {
        set: Object,
        loading: Boolean
    },
    mounted() {
        // window.onscroll = function() {sticky()};

        // const btns = document.querySelector('.button-panel');

        // const btnsOffset = btns.offsetTop;

        // function sticky() {
        //     console.log("page offset: ", window.pageYOffset, "btnsOffset: ", btnsOffset);

        //     if (window.pageYOffset > btnsOffset) {
        //         btns.classList.add('sticky');
        //     } else {
        //         btns.classList.remove('sticky')
        //     }
        // }
    },
    data: function () {
        return {
            textbooks: [
                {title: 'Junior Sunshine 5', pressed: false},
                {title: 'Junior Sunshine 6', pressed: false},
                {title: 'Sunshine 1', pressed: false},
                {title: 'Sunshine 2', pressed: false},
                {title: 'Sunshine 3', pressed: false},
            ],
            programs: [
                {number: 1, pressed: false},
                {number: 2, pressed: false},
                {number: 3, pressed: false},
                {number: 4, pressed: false},
                {number: 5, pressed: false},
                {number: 6, pressed: false},
                {number: 7, pressed: false},
                {number: 8, pressed: false},
                {number: 9, pressed: false},
            ],
            lessons: [
                {number: 1, pressed: false},
                {number: 2, pressed: false},
                {number: 3, pressed: false},
            ]
        }
    },
    computed: {
        state: {
            get: function () {
                const stateObj = {
                    name: false,
                    textbook: false,
                    program: false,
                    lesson: false,
                    btn: true
                }

                if (this.set.name.length >= 1) {
                    stateObj.name = true;
                }

                if (this.set.textbook) {
                    stateObj.textbook = true;
                }

                if (this.set.program) {
                    stateObj.program = true;
                }

                if (this.set.lesson) {
                    stateObj.lesson = true;
                }

                if (Object.values(stateObj).indexOf(false) === -1) {
                    stateObj.btn = false; 
                }

                return stateObj;
            }
        },
        invalidFeedback() {
            if (this.set.name.length >= 1) {
                return ''
            } else {
                return 'Please enter a name'
            }
        },
        validFeedback() {
            return this.state.name === true ? 'Great!' : ''
        },
        validFeedbackTextbook() {
            return this.state.textbook === true ? 'Awesome!' : ''
        },
        validFeedbackProgram() {
            return this.state.program === true ? 'Perfect!' : ''
        },
        validFeedbackLesson() {
            return this.state.lesson === true ? 'Solid!' : ''
        }
    },
    methods: {
        addSlide: function () {
            this.set.slides.push({
                input: '',
                answer: '',
                items: []
            });
        },
        deleteSlide: function (ind) {
            // console.log(ind);
            this.set.slides.splice(ind, 1);
        },
        setTextbook: function (textbook) {
            this.set.textbook = textbook;
        },
        setProgram: function (program) {
            this.set.program = program;
        },
        setLesson: function (lesson) {
            this.set.lesson = lesson;
        },
        setAnswerItems: function (value, index) {
            // value = "The/fat/dog/ran."

            let selectedSlide = this.set.slides[index];

            selectedSlide.answer = value.replaceAll('/', ' ');

            // console.log(value);

            //TODO: push all items to raw array then get them into separate objects with id and text keys
            const itemsRaw = value.split('/');
            const itemsArr = []; 

            itemsRaw.forEach((item, ind) => {
                itemsArr.push({id: `${index}-${ind}-${item}`, text: item})
            });
            // console.log(itemsArr);
            selectedSlide.items = itemsArr;

            // console.log(selectedSlide);
        }
    }
}
</script>

<style scoped>
    .set-editor {
        position: relative;
        height: auto;
        width: 90%;
        margin: auto;
    }
    .slides-box {
        border: 1px solid black;
        padding: 15px;
        width: 80vw;
        margin: 10px auto 30px 0;
    }
    .add-slide-btn {
        margin: 10px auto auto auto;
    }
    .button-panel {
        position: fixed;
        bottom: 2%;
        right: 2%;
        display: flex;
        margin: 5px auto;
        background: white;
        width: auto;
        height: auto;
        justify-content: space-evenly;
    }
</style>