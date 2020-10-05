<template>
    <div class="canvas-box">
        <canvas @mousemove="draw" @mousedown="beginDrawing" @mouseup="endDrawing" id="myCanvas"></canvas>
        <CanvasConfig
            :config="this.config"
            v-on:pen-click="togglePen"
            v-on:clear-canvas="clearCanvas"
            v-on:color-click="setStrokeColor($event)"
        />
    </div>
</template>

<script>
import CanvasConfig from './CanvasConfig';

export default {
    name: 'Canvas',
    components: {
        CanvasConfig,
    },
    data: function () {
        return {
            vueCanvas: null,
            drawing: false,
            canvas: null,
            ctx: null,
            config: {
                selected: false,
                colors: [
                    {id: 1, name: 'black', selected: true},
                    {id: 2, name: 'red', selected: false},
                    {id: 3, name: 'orange', selected: false},
                    {id: 4, name: 'yellow', selected: false},
                    {id: 5, name: 'green', selected: false},
                    {id: 6, name: 'blue', selected: false},
                    {id: 7, name: 'purple', selected: false},
                ]
            }
        }
    },
    mounted() {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.height = window.innerHeight * .8;
        this.canvas.width = window.innerWidth * .9;
        this.ctx = this.canvas.getContext("2d");  
        this.vueCanvas = this.ctx;
    },
    methods: {
        beginDrawing(e) {
            if (!this.config.selected) {
                return;
            }
            this.drawing = true;
            this.draw(e);
        },
        endDrawing() {
            this.drawing = false;
            this.ctx.beginPath();
        },
        draw(e) {
            if (!this.drawing) {
                return;
            } else {
                // console.log("x:", e.offsetX, "y:", e.offsetY)

                this.ctx.lineWidth = 10;
                this.ctx.lineCap = "round";
                this.ctx.lineTo(e.offsetX,e.offsetY);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(e.offsetX,e.offsetY);
            }
        },
        togglePen() {
            this.config.selected = !this.config.selected;
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        setStrokeColor(clicked) {
            // console.log(clicked);

            let newInd = this.config.colors.findIndex(color => {
                return color.name === clicked;
            });

            let oldInd = this.config.colors.findIndex(color => {
                // console.log(color);
                return color.selected === true;
            });

            // console.log(newInd, oldInd);

            // console.log(this.config.colors[newInd].selected, this.config.colors[oldInd].selected)

            this.config.colors[newInd].selected = true;
            this.config.colors[oldInd].selected = false;

            this.ctx.strokeStyle = clicked;
        }
    }
}
</script>

<style scoped>
    .canvas-box {
        width: auto;
        height: auto;
        margin: 0;
    }
    #myCanvas {
        position: absolute;
        top: 10vh;
        left: 5vw;
        margin: auto;
        max-width: 90vw;
    }
</style>