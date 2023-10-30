import {bound, eventIsInside} from '../util.js';

export class PercentSlider extends HTMLElement {
    constructor() {
        super();

        this.sliding = false;
        const boundingClientRect = this.getBoundingClientRect();
        this.width = boundingClientRect.width;
        this.leftSide = boundingClientRect.x;
        this.x = this.leftSide + 0.5 * this.width;
        this.y = boundingClientRect.y + 0.5 * boundingClientRect.height;

        this.knob = document.createElement('div');
        this.knob.classList.add('percent-slider_knob');
        this.appendChild(this.knob);
        this.knobWidth = this.knob.getBoundingClientRect().width;
        this.knob.style.top = `-${this.knobWidth/2.5}px`;
        this.positionKnob(0.5);

        document.addEventListener('touchstart', event => {
            const touch = event.targetTouches[0];
            event.preventDefault();
            if (eventIsInside(touch, this.getBoundingClientRect(), 20)) {
                this.sliding = true;
            }
        }, false);

        document.addEventListener('touchmove', event => {
            const touch = event.touches[0];
            if (this.sliding) {
                const clientX = touch.clientX;
                const percent = bound((clientX - this.leftSide)/this.width, 0, 1);
                this.positionKnob(percent);
                const sliderEvent = new Event('percent-slider');
                sliderEvent.percent = percent;
                this.dispatchEvent(sliderEvent);
            }
        });

        document.addEventListener('touchend', event => {
            this.sliding = false;
        });

        document.addEventListener('touchcancel', event => {
            this.sliding = false;
        });

        document.addEventListener('mousedown', (event) => {
            if (eventIsInside(event, this.getBoundingClientRect(), 10)) {
                this.sliding = true;
            }
        });

        document.addEventListener('mouseup', () => {
            this.sliding = false;
        });

        document.addEventListener('mousemove', event => {
            if (this.sliding) {
                const clientX = event.clientX;
                const percent = bound((clientX - this.leftSide)/this.width, 0, 1);
                this.positionKnob(percent);
                const sliderEvent = new Event('percent-slider');
                sliderEvent.percent = percent;
                this.dispatchEvent(sliderEvent);
            }
        });
    }

    positionKnob(percent) {
        this.knob.style.left = `${percent * this.width}px`;
    }
}
